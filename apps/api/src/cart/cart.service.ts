import { Injectable } from '@nestjs/common';
import type { PrismaService } from '../prisma/prisma.service.js';

type AddCartDto = {
  items: Array<{ skuId: string; quantity: number }>;
  kitId?: string;
  ruleSetVersion?: number;
};

type CartWarning = {
  skuId: string;
  type: 'OUT_OF_STOCK' | 'INSUFFICIENT_STOCK';
};

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}
  async get(userId: string) {
    const cart = await this.prisma.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
      include: {
        items: {
          include: {
            sku: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    const items = cart.items.map((item) => {
      const availableStock = Math.max(
        0,
        item.sku.stock - item.sku.reserved,
      );

      const effectivePrice =
        item.sku.salePrice ?? item.sku.price;

      const inStock =
        availableStock > 0 &&
        item.sku.status === 'ACTIVE' &&
        item.sku.product.status === 'ACTIVE';

      const lineTotal = effectivePrice * item.quantity;

      return {
        ...item,
        sku: {
          ...item.sku,
          availableStock,
          effectivePrice,
          inStock,
        },
        lineTotal,
      };
    });
    const quantityBySku = new Map<string, number>();

    for (const item of items) {
      quantityBySku.set(
        item.skuId,
        (quantityBySku.get(item.skuId) ?? 0) + item.quantity,
      );
    }

    const warnings: CartWarning[] = [];
    const checkedSkus = new Set<string>();

    for (const item of items) {
      if (checkedSkus.has(item.skuId)) {
        continue;
      }

      checkedSkus.add(item.skuId);

      if (!item.sku.inStock) {
        warnings.push({
          skuId: item.skuId,
          type: 'OUT_OF_STOCK',
        });
        continue;
      }

      const totalQuantity =
        quantityBySku.get(item.skuId) ?? 0;

      if (totalQuantity > item.sku.availableStock) {
        warnings.push({
          skuId: item.skuId,
          type: 'INSUFFICIENT_STOCK',
        });
      }
    }

    const subtotal = items.reduce(
      (sum, item) => sum + item.lineTotal,
      0,
    );

    return {
      items,
      subtotal,
      warnings,
    };
  }

  async add(userId: string, dto: AddCartDto) {
    void userId;
    void dto;

    return {
      items: [],
      subtotal: 0,
      warnings: [] as CartWarning[],
    };
  }
  async update(
    userId: string,
    id: string,
    quantity: number,
  ) {
    void userId;
    void id;
    void quantity;

    return {};
  }
  async remove(userId: string, id: string) {
    void userId;
    void id;

    return {};
  }

  async clear(userId: string) {
    void userId;

    return {};
  }
}
