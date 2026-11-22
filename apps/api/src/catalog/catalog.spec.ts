import 'reflect-metadata';
import { BadRequestException, NotFoundException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { describe, expect, it, vi } from 'vitest';
import type { PrismaService } from '../prisma/prisma.service.js';
import { CatalogQueryPipe } from './catalog-query.pipe.js';
import { CatalogService } from './catalog.service.js';
import { CatalogController } from './catalog.controller.js';
import { CatalogModule } from './catalog.module.js';

// Thay PrismaService trong kiểm thử module, không mở kết nối database.
vi.mock('../prisma/prisma.service.js', () => ({
  PrismaService: class PrismaService {},
}));

function sku(overrides: Record<string, unknown> = {}) {
  return {
    id: 'sku-1', code: 'SKU-1', color: 'green', price: 100000,
    salePrice: null, stock: 10, reserved: 3, unit: 'cái', unitQty: 1,
    lengthCm: 200, widthCm: 150, heightCm: 100, volumeMl: null,
    capacityPeople: 4, useType: 'shared', imageUrl: null, imageSource: null,
    ...overrides,
  };
}

function product(overrides: Record<string, unknown> = {}) {
  return {
    id: 'product-1', slug: 'leu-cam-trai', name: 'Lều cắm trại',
    description: 'Lều dùng ngoài trời', guide: 'Dựng lều', material: 'vải',
    scenarios: ['PICNIC'], isFeatured: false,
    category: { id: 'category-1', code: 'LEU', name: 'Lều' },
    skus: [sku()],
    ...overrides,
  };
}

function setup() {
  const prisma = {
    product: { findMany: vi.fn(), findFirst: vi.fn() },
    category: { findMany: vi.fn() },
  };
  return { prisma, service: new CatalogService(prisma as unknown as PrismaService) };
}

describe('CatalogQueryPipe', () => {
  it('nhận query mặc định và chuyển query hợp lệ thành kiểu dữ liệu rõ ràng', () => {
    const pipe = new CatalogQueryPipe();
    expect(pipe.transform({})).toEqual({});
    expect(pipe.transform({
      minPrice: '50000', scenario: 'PICNIC', size: '200x150',
    })).toEqual({ minPrice: 50000, scenario: 'PICNIC', size: [200, 150] });
  });

  it('giữ query để pipe riêng kiểm tra dưới ValidationPipe toàn cục', async () => {
    const validation = new ValidationPipe({
      transform: true, whitelist: true, forbidNonWhitelisted: true,
    });
    const pipe = new CatalogQueryPipe();
    const cases = [
      { scenario: 'XYZ' },
      { minPrice: '10abc' },
      { minPrice: '100', maxPrice: '50' },
      { unknown: 'value' },
      { minPrice: ['10', '20'] },
    ];
    for (const raw of cases) {
      const passed = await validation.transform(raw, { type: 'query', metatype: Object });
      expect(() => pipe.transform(passed)).toThrow(BadRequestException);
    }
  });
});

describe('CatalogService', () => {
  it('filters size per SKU and excludes missing dimensions', async () => {
    const { service, prisma } = setup();
    prisma.product.findMany.mockResolvedValue([product({ skus: [sku({ id: 'ok', lengthCm: 220, widthCm: 160 }), sku({ id: 'small', lengthCm: 190 }), sku({ id: 'missing', widthCm: null })] })]);
    const result = await service.list({ size: [200, 150] });
    expect(result.items[0].skus.map((item) => item.id)).toEqual(['ok']);
  });

  it('sorts descending by price and uses stable IDs for ties', async () => {
    const { service, prisma } = setup();
    prisma.product.findMany.mockResolvedValue([product({ id: 'b', skus: [sku({ price: 200 })] }), product({ id: 'a', skus: [sku({ price: 200 })] }), product({ id: 'c', skus: [sku({ price: 100 })] })]);
    const result = await service.list({ sort: 'price_desc' });
    expect(result.items.map((item) => item.id)).toEqual(['a', 'b', 'c']);
  });
  it('passes SQL-looking search text as a Prisma filter value', async () => {
    const { service, prisma } = setup();
    prisma.product.findMany.mockResolvedValue([]);
    const search = "'; DROP TABLE";
    await service.list({ q: search });
    expect(prisma.product.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        OR: expect.arrayContaining([
          expect.objectContaining({ name: expect.objectContaining({ contains: search }) }),
          expect.objectContaining({ description: expect.objectContaining({ contains: search }) }),
        ]),
      }),
    }));
  });

  it('gửi bộ lọc từ khóa, nhóm, tình huống, chất liệu và điều kiện ACTIVE cho Prisma', async () => {
    const { service, prisma } = setup();
    prisma.product.findMany.mockResolvedValue([]);
    await service.list({ q: 'lều', category: 'LEU', scenario: 'PICNIC', material: 'vải' });
    expect(prisma.product.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        status: 'ACTIVE',
        skus: { some: { status: 'ACTIVE' } },
        category: expect.objectContaining({ code: 'LEU' }),
        scenarios: { has: 'PICNIC' },
        material: expect.objectContaining({ contains: 'vải', mode: 'insensitive' }),
      }),
      select: expect.objectContaining({
        skus: expect.objectContaining({ where: { status: 'ACTIVE' } }),
      }),
    }));
  });

  it('không ghép giá của SKU nhỏ với sức chứa hoặc kích thước của SKU lớn', async () => {
    const { service, prisma } = setup();
    prisma.product.findMany.mockResolvedValue([product({
      skus: [
        sku({ id: 'small', price: 500000, capacityPeople: 2, lengthCm: 100, widthCm: 100 }),
        sku({ id: 'large', price: 1200000, capacityPeople: 4, lengthCm: 200, widthCm: 150 }),
      ],
    })]);
    const result = await service.list({ maxPrice: 700000, capacity: 4 });
    expect(result.items).toEqual([]);
    expect(result.total).toBe(0);
  });

  // Ca bổ sung: task yêu cầu sản phẩm phải còn SKU hoạt động.
  it('không hiển thị sản phẩm không có SKU đang hoạt động', async () => {
    const { service, prisma } = setup();
    prisma.product.findMany.mockResolvedValue([product({ skus: [] })]);
    const result = await service.list({});
    expect(result.items).toEqual([]);
    expect(result.total).toBe(0);
  });

  it('dùng giá giảm (kể cả 0) để lọc và sắp xếp theo SKU khớp', async () => {
    const { service, prisma } = setup();
    prisma.product.findMany.mockResolvedValue([
      product({ id: 'free', skus: [sku({ price: 50000, salePrice: 0 })] }),
      product({ id: 'paid', skus: [sku({ price: 100000, salePrice: null })] }),
    ]);
    const result = await service.list({ maxPrice: 0, sort: 'price_asc' });
    expect(result.items.map((item) => item.id)).toEqual(['free']);
    expect(result.items[0].minPrice).toBe(0);
  });

  it('sắp xếp theo giá nhỏ nhất của các biến thể khớp, xử lý giá bằng nhau ổn định', async () => {
    const { service, prisma } = setup();
    prisma.product.findMany.mockResolvedValue([
      product({ id: 'b', skus: [sku({ price: 400000, capacityPeople: 2 }), sku({ price: 900000, capacityPeople: 4 })] }),
      product({ id: 'a', skus: [sku({ price: 900000, capacityPeople: 4 })] }),
      product({ id: 'c', skus: [sku({ price: 800000, capacityPeople: 4 })] }),
    ]);
    const result = await service.list({ capacity: 4, sort: 'price_asc' });
    expect(result.items.map((item) => item.id)).toEqual(['c', 'a', 'b']);
    expect(result.items.map((item) => item.minPrice)).toEqual([800000, 900000, 900000]);
  });

  it('chi tiết trả thông số, tồn khả dụng theo biến thể và sản phẩm liên quan cùng nhóm', async () => {
    const { service, prisma } = setup();
    prisma.product.findFirst.mockResolvedValue(product({
      skus: [sku({ stock: 10, reserved: 3 }), sku({ id: 'sku-2', stock: 1, reserved: 3 })],
    }));
    prisma.product.findMany.mockResolvedValue([]);
    const result = await service.detail('leu-cam-trai');
    expect(result.skus[0]).toEqual(expect.objectContaining({ availableStock: 7, inStock: true }));
    expect(result.skus[1]).toEqual(expect.objectContaining({ availableStock: 0, inStock: false }));
    expect(result.skus[0]).not.toHaveProperty('stock');
    expect(result.skus[0]).not.toHaveProperty('reserved');
    expect(prisma.product.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ categoryId: 'category-1', id: { not: 'product-1' } }),
      take: 4,
    }));
  });

  it('slug không tồn tại hoặc đã ẩn trả 404, không truy vấn hàng liên quan', async () => {
    const { service, prisma } = setup();
    prisma.product.findFirst.mockResolvedValue(null);
    await expect(service.detail('khong-ton-tai')).rejects.toBeInstanceOf(NotFoundException);
    expect(prisma.product.findFirst).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        slug: 'khong-ton-tai', status: 'ACTIVE', skus: { some: { status: 'ACTIVE' } },
      }),
    }));
    expect(prisma.product.findMany).not.toHaveBeenCalled();
  });

  // Ca bổ sung: slug sai phải bị từ chối trước khi truy vấn.
  it('từ chối slug sai định dạng trước khi truy vấn database', async () => {
    const { service, prisma } = setup();
    for (const slug of ['Leu 4 nguoi', 'leu--4', 'a'.repeat(201)]) {
      await expect(service.detail(slug)).rejects.toBeInstanceOf(NotFoundException);
    }
    expect(prisma.product.findFirst).not.toHaveBeenCalled();
    expect(prisma.product.findMany).not.toHaveBeenCalled();
  });

  it('nhóm hàng chỉ chứa sản phẩm và SKU hoạt động, không trả quan hệ nội bộ', async () => {
    const { service, prisma } = setup();
    const categories = [{ id: 'category-1', code: 'LEU', name: 'Lều' }];
    prisma.category.findMany.mockResolvedValue(categories);
    await expect(service.categories()).resolves.toEqual(categories);
    expect(prisma.category.findMany).toHaveBeenCalledWith({
      where: { products: { some: { status: 'ACTIVE', skus: { some: { status: 'ACTIVE' } } } } },
      select: { id: true, code: true, name: true },
      orderBy: [{ sortOrder: 'asc' }, { code: 'asc' }],
    });
  });
});

describe('CatalogModule', () => {
  it('validates catalog routes over HTTP with Prisma mocked', async () => {
    const { Test } = await import('@nestjs/testing');
    const { PrismaService: Prisma } = await import('../prisma/prisma.service.js');
    const { default: request } = await import('supertest');
    const prisma = { product: { findMany: vi.fn(), findFirst: vi.fn().mockResolvedValue(null) }, category: { findMany: vi.fn().mockResolvedValue([]) } };
    const module = await Test.createTestingModule({ imports: [CatalogModule] }).overrideProvider(Prisma).useValue(prisma).compile();
    const app = module.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));
    await app.init();
    try {
      await request(app.getHttpServer()).get('/api/products?minPrice=abc').expect(400);
      await request(app.getHttpServer()).get('/api/products/khong-co').expect(404);
      await request(app.getHttpServer()).get('/api/categories').expect(200);
    } finally { await app.close(); }
  });
  it('module khởi tạo được với Prisma mock và controller chuyển đúng tham số', async () => {
    const app = await NestFactory.createApplicationContext(CatalogModule, {
      logger: false,
      abortOnError: false,
    });
    try {
      const controller = app.get(CatalogController);
      const service = app.get(CatalogService);
      const list = vi.spyOn(service, 'list').mockResolvedValue({ items: [], total: 0 });
      const detail = vi.spyOn(service, 'detail').mockRejectedValue(new NotFoundException());
      const categories = vi.spyOn(service, 'categories').mockResolvedValue([]);
      await controller.list({ category: 'LEU' });
      await expect(controller.detail('leu-cam-trai')).rejects.toBeInstanceOf(NotFoundException);
      await controller.categories();
      expect(list).toHaveBeenCalledWith({ category: 'LEU' });
      expect(detail).toHaveBeenCalledWith('leu-cam-trai');
      expect(categories).toHaveBeenCalledOnce();
    } finally {
      await app.close();
    }
  });
});
