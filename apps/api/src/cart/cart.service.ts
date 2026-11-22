import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

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
  if (!dto.items?.length) {
    throw new BadRequestException('Danh sách sản phẩm trống');
  }

  const kitGroupId = dto.kitId ?? 'SINGLE';

  await this.prisma.$transaction(async (tx) => {
    const cart = await tx.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    if (dto.ruleSetVersion !== undefined) {
      const ruleSet = await tx.ruleSet.findFirst({
        where: { version: dto.ruleSetVersion },
      });

      if (!ruleSet) {
        throw new BadRequestException(
          'Không tìm thấy phiên bản quy tắc',
        );
      }
    }

    for (const entry of dto.items) {
      if (
        !entry.skuId ||
        !Number.isInteger(entry.quantity) ||
        entry.quantity < 1 ||
        entry.quantity > 99
      ) {
        throw new BadRequestException(
          'Số lượng sản phẩm không hợp lệ',
        );
      }

      const sku = await tx.sku.findUnique({
        where: { id: entry.skuId },
        include: { product: true },
      });

      if (
        !sku ||
        sku.status !== 'ACTIVE' ||
        sku.product.status !== 'ACTIVE'
      ) {
        throw new BadRequestException(
          'Sản phẩm không còn được bán',
        );
      }

      const existingItems = await tx.cartItem.findMany({
        where: {
          cartId: cart.id,
          skuId: entry.skuId,
        },
      });

      const sameGroup = existingItems.find(
        (item) => item.kitGroupId === kitGroupId,
      );

      const newLineQuantity =
        (sameGroup?.quantity ?? 0) + entry.quantity;

      if (newLineQuantity > 99) {
        throw new BadRequestException(
          'Mỗi dòng giỏ hàng tối đa 99 sản phẩm',
        );
      }

      const currentTotal = existingItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );

      const availableStock = Math.max(
        0,
        sku.stock - sku.reserved,
      );

      if (currentTotal + entry.quantity > availableStock) {
        throw new BadRequestException(
          'Số lượng vượt quá tồn kho khả dụng',
        );
      }
      if (sameGroup) {
        await tx.cartItem.update({
          where: { id: sameGroup.id },
          data: { quantity: newLineQuantity },
        });
      } else {
        await tx.cartItem.create({
          data: {
            cartId: cart.id,
            skuId: entry.skuId,
            kitGroupId,
            quantity: entry.quantity,
          },
        });
      }
    }
  });

  return this.get(userId);
}

  async update(userId: string, id: string, quantity: number) {
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      throw new BadRequestException('Số lượng phải từ 1 đến 99');
    }

    const item = await this.prisma.cartItem.findFirst({
      where: {
        id,
        cart: { userId },
      },
      include: {
        sku: {
          include: { product: true },
        },
      },
    });

    if (!item) {
      throw new NotFoundException('Không tìm thấy mục giỏ hàng');
    }

    const sku = item.sku;

    if (
      sku.status !== 'ACTIVE' ||
      sku.product.status !== 'ACTIVE'
    ) {
      throw new BadRequestException('Sản phẩm không còn được bán');
    }

    const otherItems = await this.prisma.cartItem.findMany({
      where: {
        cartId: item.cartId,
        skuId: item.skuId,
      },
    });

    const otherQuantity = otherItems.reduce(
      (sum, row) => sum + (row.id === item.id ? 0 : row.quantity),
      0,
    );

    const availableStock = Math.max(0, sku.stock - sku.reserved);

    if (otherQuantity + quantity > availableStock) {
      throw new BadRequestException(
        'Số lượng vượt quá tồn kho khả dụng',
      );
    }

    await this.prisma.cartItem.update({
      where: {
        id: item.id,
      },
      data: { quantity },
    });

    return this.get(userId);
  }

  async remove(userId: string, id: string) {
    const result = await this.prisma.cartItem.deleteMany({
      where: {
        id,
        cart: { userId },
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Không tìm thấy mục giỏ hàng');
    }

    return this.get(userId);
  }

  async clear(userId: string) {
    await this.prisma.cartItem.deleteMany({
      where: {
        cart: { userId },
      },
    });

    return this.get(userId);
  }
}
