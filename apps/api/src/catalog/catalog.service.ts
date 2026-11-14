import { Injectable, NotFoundException } from '@nestjs/common';
import type { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CatalogQuery } from './catalog-query.pipe.js';

const productSelect = {
  id: true,
  slug: true,
  name: true,
  description: true,
  guide: true,
  material: true,
  scenarios: true,
  isFeatured: true,
  category: { select: { id: true, code: true, name: true } },
  skus: {
    where: { status: 'ACTIVE' },
    orderBy: { code: 'asc' },
    select: {
      id: true,
      code: true,
      color: true,
      price: true,
      salePrice: true,
      stock: true,
      reserved: true,
      unit: true,
      unitQty: true,
      lengthCm: true,
      widthCm: true,
      heightCm: true,
      volumeMl: true,
      capacityPeople: true,
      useType: true,
      imageUrl: true,
      imageSource: true,
    },
  },
} satisfies Prisma.ProductSelect;

type CatalogProduct = Prisma.ProductGetPayload<{ select: typeof productSelect }>;
type CatalogSku = CatalogProduct['skus'][number];

function matchesSku(sku: CatalogSku, query: CatalogQuery): boolean {
  const price = sku.salePrice ?? sku.price;
  if (query.minPrice !== undefined && price < query.minPrice) return false;
  if (query.maxPrice !== undefined && price > query.maxPrice) return false;
  if (query.capacity !== undefined &&
      (sku.capacityPeople === null || sku.capacityPeople < query.capacity)) return false;
  if (query.size !== undefined) {
    const dimensions = [sku.lengthCm, sku.widthCm, sku.heightCm];
    for (let index = 0; index < query.size.length; index += 1) {
      const actual = dimensions[index];
      if (actual === null || actual === undefined || Number(actual) < query.size[index]) {
        return false;
      }
    }
  }
  return true;
}

@Injectable()
export class CatalogService {
  constructor(private readonly prisma: PrismaService) {}

  async detail(slug: string) {
    if (slug.length > 200 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      throw new NotFoundException('Không tìm thấy sản phẩm');
    }

    const product = await this.prisma.product.findFirst({
      where: { slug, status: 'ACTIVE', skus: { some: { status: 'ACTIVE' } } },
      select: productSelect,
    });
    if (!product) {
      throw new NotFoundException('Không tìm thấy sản phẩm');
    }

    const related = await this.prisma.product.findMany({
      where: {
        categoryId: product.category.id,
        id: { not: product.id },
        status: 'ACTIVE',
        skus: { some: { status: 'ACTIVE' } },
      },
      select: productSelect,
      orderBy: [{ isFeatured: 'desc' }, { name: 'asc' }],
      take: 4,
    });

    const publicSkus = (skus: CatalogSku[]) => skus.map(({ stock, reserved, ...sku }) => {
      const availableStock = Math.max(0, stock - reserved);
      return {
        ...sku,
        lengthCm: sku.lengthCm === null ? null : Number(sku.lengthCm),
        widthCm: sku.widthCm === null ? null : Number(sku.widthCm),
        heightCm: sku.heightCm === null ? null : Number(sku.heightCm),
        effectivePrice: sku.salePrice ?? sku.price,
        availableStock,
        inStock: availableStock > 0,
      };
    });

    return {
      ...product,
      skus: publicSkus(product.skus),
      related: related.map((item) => ({ ...item, skus: publicSkus(item.skus) })),
    };
  }

  async list(query: CatalogQuery) {
    const where: Prisma.ProductWhereInput = {
      status: 'ACTIVE',
      skus: { some: { status: 'ACTIVE' } },
    };

    if (query.q !== undefined) {
      where.OR = [
        { name: { contains: query.q, mode: 'insensitive' } },
        { description: { contains: query.q, mode: 'insensitive' } },
      ];
    }
    if (query.category !== undefined) where.category = { code: query.category };
    if (query.scenario !== undefined) where.scenarios = { has: query.scenario };
    if (query.material !== undefined) {
      where.material = { contains: query.material, mode: 'insensitive' };
    }

    const products = await this.prisma.product.findMany({
      where,
      select: productSelect,
      orderBy: [{ name: 'asc' }, { id: 'asc' }],
    });

    const items = products
      .map((product) => ({
        ...product,
        skus: product.skus
          .filter((sku) => matchesSku(sku, query))
          .map(({ stock, reserved, ...sku }) => {
            const availableStock = Math.max(0, stock - reserved);
            const effectivePrice = sku.salePrice ?? sku.price;
            return { ...sku, effectivePrice, availableStock, inStock: availableStock > 0 };
          }),
      }))
      .filter((product) => product.skus.length > 0)
      .map((product) => ({
        ...product,
        minPrice: Math.min(...product.skus.map((sku) => sku.effectivePrice)),
      }));

    if (query.sort) {
      const direction = query.sort === 'price_asc' ? 1 : -1;
      items.sort((a, b) =>
        direction * (a.minPrice - b.minPrice) || a.id.localeCompare(b.id),
      );
    }

    return { items, total: items.length };
  }
}
