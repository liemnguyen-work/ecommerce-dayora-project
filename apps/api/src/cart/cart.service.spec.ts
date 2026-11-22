import 'reflect-metadata';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import type { PrismaService } from '../prisma/prisma.service.js';
import { CartService } from './cart.service.js';

const skuA = {
  id: 'sku-a',
  price: 100000,
  salePrice: 80000,
  stock: 3,
  reserved: 0,
  status: 'ACTIVE',
  product: { id: 'product-a', status: 'ACTIVE' },
};

const skuB = {
  id: 'sku-b',
  price: 50000,
  salePrice: null,
  stock: 0,
  reserved: 0,
  status: 'ACTIVE',
  product: { id: 'product-b', status: 'ACTIVE' },
};

const prisma = {
  cart: {
    upsert: vi.fn(),
  },
  sku: {
    findUnique: vi.fn(),
  },
  cartItem: {
    findFirst: vi.fn(),
    findMany: vi.fn(),
    update: vi.fn(),
    create: vi.fn(),
    deleteMany: vi.fn(),
  },
  ruleSet: {
    findFirst: vi.fn(),
  },
  $transaction: vi.fn(),
};

let service: CartService;

describe('CartService - PRJ-P2-BD2-1', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    service = new CartService(
      prisma as unknown as PrismaService,
    );

    prisma.$transaction.mockImplementation(
      async (callback: (tx: typeof prisma) => Promise<unknown>) => {
        return callback(prisma);
      },
    );
  });

  it('cảnh báo hết hàng và thiếu tồn dựa trên tổng các dòng cùng SKU', async () => {
    prisma.cart.upsert.mockResolvedValue({
      id: 'cart-a',
      userId: 'user-a',
      items: [
        {
          id: 'item-1',
          cartId: 'cart-a',
          skuId: 'sku-a',
          kitGroupId: 'SINGLE',
          quantity: 2,
          sku: skuA,
        },
        {
          id: 'item-2',
          cartId: 'cart-a',
          skuId: 'sku-a',
          kitGroupId: 'kit-1',
          quantity: 2,
          sku: skuA,
        },
        {
          id: 'item-3',
          cartId: 'cart-a',
          skuId: 'sku-b',
          kitGroupId: 'SINGLE',
          quantity: 1,
          sku: skuB,
        },
      ],
    });

    const result = await service.get('user-a');

    expect(prisma.cart.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { userId: 'user-a' },
      }),
    );

    expect(result.items).toHaveLength(3);

    expect(result.warnings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          skuId: 'sku-a',
          type: 'INSUFFICIENT_STOCK',
        }),
        expect.objectContaining({
          skuId: 'sku-b',
          type: 'OUT_OF_STOCK',
        }),
      ]),
    );

    expect(result.subtotal).toBe(370000);
  });

  it('thêm cùng SKU và cùng kitGroupId thì cộng dồn số lượng thay vì tạo dòng mới', async () => {
    prisma.cart.upsert.mockResolvedValue({
      id: 'cart-a',
      userId: 'user-a',
      items: [],
    });

    prisma.sku.findUnique.mockResolvedValue({
      ...skuA,
      stock: 10,
    });

    prisma.cartItem.findMany.mockResolvedValue([
      {
        id: 'item-existing',
        cartId: 'cart-a',
        skuId: 'sku-a',
        kitGroupId: 'kit-1',
        quantity: 1,
      },
    ]);

    prisma.cartItem.update.mockResolvedValue({
      id: 'item-existing',
      quantity: 2,
    });

    await service.add('user-a', {
      items: [{ skuId: 'sku-a', quantity: 1 }],
      kitId: 'kit-1',
    });

    expect(prisma.$transaction).toHaveBeenCalledOnce();

    expect(prisma.cartItem.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'item-existing' },
        data: expect.objectContaining({
          quantity: 2,
        }),
      }),
    );

    expect(prisma.cartItem.create).not.toHaveBeenCalled();
  });

  it('không sửa hoặc xóa item của người khác', async () => {
    prisma.cartItem.findFirst.mockResolvedValue(null);
    prisma.cartItem.deleteMany.mockResolvedValue({
      count: 0,
    });

    await expect(
      service.update('user-b', 'item-a', 1),
    ).rejects.toBeInstanceOf(NotFoundException);

    expect(prisma.cartItem.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          id: 'item-a',
          cart: { userId: 'user-b' },
        },
      }),
    );

    await expect(
      service.remove('user-b', 'item-a'),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
