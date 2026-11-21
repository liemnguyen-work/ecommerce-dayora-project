
import 'reflect-metadata';

import {
  beforeAll,
  afterAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { Test } from '@nestjs/testing';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from '../app.module.js';
import { AuthService } from '../auth/auth.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

// Mock Prisma: không kết nối database thật.
const prisma = {
  user: {
    findUnique: vi.fn(),
  },
  category: {
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
  product: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
  sku: {
    findUnique: vi.fn(),
    findUniqueOrThrow: vi.fn(),
    create: vi.fn(),
    updateMany: vi.fn(),
  },
};

// Dữ liệu SKU dùng cho các ca kiểm thử.
const sku = {
  id: 's1',
  productId: 'p1',
  code: 'DAY-TM-001',
  price: 100,
  salePrice: 80,
  stock: 10,
  reserved: 3,
  status: 'ACTIVE',
};

// Dữ liệu tạo SKU.
const newSku = {
  productId: 'p1',
  code: 'DAY-TM-002',
  price: 100,
  stock: 10,
};

// Dữ liệu tạo Product.
const product = {
  categoryId: 'c1',
  slug: 'item',
  name: 'San pham test',
};

let app: INestApplication;
let auth: AuthService;
let currentRole: 'ADMIN' | 'CUSTOMER' = 'ADMIN';

function cookie() {
  return `access_token=${auth.signToken('test-user')}`;
}

describe('admin catalog HTTP', () => {
  it('returns products with SKU relations for the admin editor', async () => {
    const products = [{ id: 'p1', ...product, status: 'ACTIVE', skus: [sku] }];
    prisma.product.findMany.mockResolvedValue(products);
    const response = await request(app.getHttpServer())
      .get('/api/admin/products')
      .set('Cookie', cookie())
      .expect(200);
    expect(response.body).toEqual(products);
    expect(prisma.product.findMany).toHaveBeenCalledWith({ include: { skus: true } });
  });
  beforeAll(async () => {
    process.env.JWT_SECRET = 'dayora-admin-catalog-test-secret';

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleRef.createNestApplication();

    app.setGlobalPrefix('api');

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    await app.init();

    auth = app.get(AuthService);

    vi.spyOn(auth, 'getUser').mockImplementation(async (id) => ({
      id,
      email: 'test@example.com',
      fullName: 'Test User',
      phone: null,
      role: currentRole,
      isActive: true,
      createdAt: new Date(),
    }));
  });

  beforeEach(() => {
    vi.clearAllMocks();
    currentRole = 'ADMIN';
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  // TEST 1 — Xác thực và phân quyền ADMIN.
  it('requires authentication and admin role', async () => {
    await request(app.getHttpServer())
      .get('/api/admin/products')
      .expect(401);

    currentRole = 'CUSTOMER';

    await request(app.getHttpServer())
      .get('/api/admin/products')
      .set('Cookie', cookie())
      .expect(403);

    currentRole = 'ADMIN';

    prisma.product.findMany.mockResolvedValueOnce([
      { status: 'INACTIVE' },
    ]);

    const response = await request(app.getHttpServer())
      .get('/api/admin/products')
      .set('Cookie', cookie())
      .expect(200);

    expect(response.body).toEqual([
      { status: 'INACTIVE' },
    ]);

    expect(prisma.product.findMany.mock.calls[0][0])
      .not.toHaveProperty('where');
  });

  // TEST 2 — Giá không hợp lệ và mã SKU bất biến.
  it('rejects invalid prices and immutable SKU codes', async () => {
    for (const price of [-1, 1.5, '100']) {
      await request(app.getHttpServer())
        .post('/api/admin/skus')
        .set('Cookie', cookie())
        .send({ ...newSku, price })
        .expect(400);
    }

    await request(app.getHttpServer())
      .post('/api/admin/skus')
      .set('Cookie', cookie())
      .send({ ...newSku, code: 'bad' })
      .expect(400);

    await request(app.getHttpServer())
      .post('/api/admin/skus')
      .set('Cookie', cookie())
      .send({ ...newSku, salePrice: 100 })
      .expect(400);

    await request(app.getHttpServer())
      .patch('/api/admin/skus/s1')
      .set('Cookie', cookie())
      .send({ code: 'DAY-TM-002' })
      .expect(400);

    expect(prisma.sku.create).not.toHaveBeenCalled();
  });

  // TEST 3 — Giá, tồn kho và số lượng đã đặt giữ.
  it('validates updates against existing price and reservations', async () => {
    prisma.sku.findUnique.mockResolvedValue(sku);

    await request(app.getHttpServer())
      .patch('/api/admin/skus/s1')
      .set('Cookie', cookie())
      .send({ stock: 2 })
      .expect(400);

    await request(app.getHttpServer())
      .patch('/api/admin/skus/s1')
      .set('Cookie', cookie())
      .send({ price: 80 })
      .expect(400);

    await request(app.getHttpServer())
      .patch('/api/admin/skus/s1')
      .set('Cookie', cookie())
      .send({ salePrice: 101 })
      .expect(400);

    expect(prisma.sku.updateMany).not.toHaveBeenCalled();

    prisma.sku.updateMany.mockResolvedValueOnce({ count: 1 });

    prisma.sku.findUniqueOrThrow.mockResolvedValueOnce({
      ...sku,
      stock: 3,
      salePrice: null,
    });

    await request(app.getHttpServer())
      .patch('/api/admin/skus/s1')
      .set('Cookie', cookie())
      .send({ stock: 3, salePrice: null })
      .expect(200);

    expect(prisma.sku.updateMany).toHaveBeenCalledWith({
      where: {
        id: 's1',
        price: 100,
        salePrice: 80,
        stock: 10,
        reserved: 3,
      },
      data: {
        stock: 3,
        salePrice: null,
      },
    });

    prisma.sku.updateMany.mockResolvedValueOnce({ count: 0 });

    await request(app.getHttpServer())
      .patch('/api/admin/skus/s1')
      .set('Cookie', cookie())
      .send({ stock: 4 })
      .expect(409);
  });

  // TEST 4 — Ẩn Product/SKU thay vì xóa.
  it('hides product and SKU by setting inactive', async () => {
    prisma.product.update.mockResolvedValue({
      id: 'p1',
      status: 'INACTIVE',
    });

    await request(app.getHttpServer())
      .patch('/api/admin/products/p1/hide')
      .set('Cookie', cookie())
      .expect(200);

    expect(prisma.product.update).toHaveBeenCalledWith({
      where: { id: 'p1' },
      data: { status: 'INACTIVE' },
    });

    prisma.sku.findUnique.mockResolvedValue(sku);

    prisma.sku.updateMany.mockResolvedValue({ count: 1 });

    prisma.sku.findUniqueOrThrow.mockResolvedValue({
      ...sku,
      status: 'INACTIVE',
    });

    await request(app.getHttpServer())
      .patch('/api/admin/skus/s1/hide')
      .set('Cookie', cookie())
      .expect(200);

    expect(prisma.sku.updateMany.mock.calls[0][0].data)
      .toEqual({ status: 'INACTIVE' });
  });

  // TEST 5 — Trùng slug phải trả HTTP 409.
  it('returns conflict for duplicate slug on create and update', async () => {
    prisma.product.create.mockRejectedValueOnce({
      code: 'P2002',
    });

    await request(app.getHttpServer())
      .post('/api/admin/products')
      .set('Cookie', cookie())
      .send(product)
      .expect(409);

    prisma.product.update.mockRejectedValueOnce({
      code: 'P2002',
    });

    await request(app.getHttpServer())
      .patch('/api/admin/products/p1')
      .set('Cookie', cookie())
      .send({ slug: 'item' })
      .expect(409);
  });
  it('creates product with scenarios', async () => {
  prisma.product.create.mockResolvedValueOnce({
    id: 'p-new',
    ...product,
    scenarios: ['PICNIC', 'DATE', 'BEACH'],
  });

  const response = await request(app.getHttpServer())
    .post('/api/admin/products')
    .set('Cookie', cookie())
    .send({
      ...product,
      scenarios: ['PICNIC', 'DATE', 'BEACH'],
    })
    .expect(201);

  expect(response.body.scenarios).toEqual([
    'PICNIC',
    'DATE',
    'BEACH',
  ]);

  expect(prisma.product.create).toHaveBeenCalledWith(
    expect.objectContaining({
      data: expect.objectContaining({
        scenarios: ['PICNIC', 'DATE', 'BEACH'],
      }),
    }),
  );
});
it('updates scenarios and preserves omitted field', async () => {
  prisma.product.update.mockResolvedValueOnce({
    id: 'p1',
    scenarios: ['BEACH'],
  });

  await request(app.getHttpServer())
    .patch('/api/admin/products/p1')
    .set('Cookie', cookie())
    .send({ scenarios: ['BEACH'] })
    .expect(200);

  expect(prisma.product.update).toHaveBeenLastCalledWith(
    expect.objectContaining({
      where: { id: 'p1' },
      data: expect.objectContaining({
        scenarios: { set: ['BEACH'] },
      }),
    }),
  );

  prisma.product.update.mockResolvedValueOnce({
    id: 'p1',
    name: 'Tên mới',
    scenarios: ['BEACH'],
  });

  await request(app.getHttpServer())
    .patch('/api/admin/products/p1')
    .set('Cookie', cookie())
    .send({ name: 'Tên mới' })
    .expect(200);

  const preserveCall =
    prisma.product.update.mock.lastCall?.[0];

  expect(preserveCall?.data).not.toHaveProperty('scenarios');

  prisma.product.update.mockResolvedValueOnce({
    id: 'p1',
    scenarios: [],
  });

  await request(app.getHttpServer())
    .patch('/api/admin/products/p1')
    .set('Cookie', cookie())
    .send({ scenarios: [] })
    .expect(200);

  expect(prisma.product.update).toHaveBeenLastCalledWith(
    expect.objectContaining({
      data: expect.objectContaining({
        scenarios: { set: [] },
      }),
    }),
  );
});
it('rejects invalid scenarios before Prisma', async () => {
  await request(app.getHttpServer())
    .post('/api/admin/products')
    .set('Cookie', cookie())
    .send({
      ...product,
      scenarios: ['INVALID'],
    })
    .expect(400);

  await request(app.getHttpServer())
    .patch('/api/admin/products/p1')
    .set('Cookie', cookie())
    .send({
      scenarios: ['BEACH', 'INVALID'],
    })
    .expect(400);

  expect(prisma.product.create).not.toHaveBeenCalled();
  expect(prisma.product.update).not.toHaveBeenCalled();
});
it('returns 404 when hiding a missing product', async () => {
  prisma.product.update.mockRejectedValueOnce({
    code: 'P2025',
  });

  const response = await request(app.getHttpServer())
    .patch('/api/admin/products/missing/hide')
    .set('Cookie', cookie())
    .expect(404);

  expect(response.body.statusCode).toBe(404);

  expect(prisma.product.update).toHaveBeenCalledWith({
    where: { id: 'missing' },
    data: { status: 'INACTIVE' },
  });
});
});
