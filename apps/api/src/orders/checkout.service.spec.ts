import 'reflect-metadata';
import { describe, expect, it, vi } from 'vitest';

const userId = 'user-a';
const skuId = 'sku-a';
const item = {
  id: 'cart-item-a',
  skuId,
  quantity: 2,
  kitGroupId: 'SINGLE',
  lineTotal: 160_000,
  sku: {
    id: skuId,
    code: 'SKU-A',
    price: 100_000,
    salePrice: 80_000,
    effectivePrice: 80_000,
    status: 'ACTIVE',
    stock: 5,
    reserved: 0,
    product: { id: 'product-a', name: 'Thảm', status: 'ACTIVE' },
  },
};
const preview = () => ({
  lines: [structuredClone(item)],
  subtotal: 160_000,
  saleDiscount: 0,
  voucher: null,
  shippingFee: 20_000,
  shippingIsEstimate: false,
  zone: 'HCM_INNER',
  total: 180_000,
  warnings: [],
});
const request = () => ({
  recipient: {
    name: 'Khách thử',
    phone: '0900000000',
    address: 'Địa chỉ thử',
    province: 'Hồ Chí Minh',
    isInnerHcm: true,
  },
  expected: [{ skuId, unitPrice: 80_000 }],
  expectedTotal: 180_000,
});

function fixture() {
  const order = {
    id: 'order-a',
    userId,
    status: 'PENDING_PAYMENT',
    paymentStatus: 'UNPAID',
    reserveExpiresAt: new Date('2026-11-18T05:15:00Z'),
    items: [{ skuId, quantity: 2 }],
  };
  const tx = {
    cartItem: {
      findMany: vi.fn().mockResolvedValue([structuredClone(item)]),
      deleteMany: vi.fn().mockResolvedValue({ count: 1 }),
    },
    sku: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
    order: {
      findFirst: vi.fn().mockResolvedValue(order),
      create: vi.fn().mockResolvedValue(order),
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
    },
    orderStatusLog: { create: vi.fn().mockResolvedValue({}) },
    voucher: {
      findUnique: vi.fn().mockResolvedValue({
        id: 'voucher-a', code: 'SALE10', isActive: true,
        startsAt: new Date('2020-01-01Z'), endsAt: new Date('2099-01-01Z'),
        minOrderValue: 0, usageLimit: 10, perUserLimit: 1,
        percentOff: 10, amountOff: null, maxDiscount: null,
      }),
      update: vi.fn().mockResolvedValue({}),
    },
    voucherUsage: { count: vi.fn().mockResolvedValue(0), create: vi.fn().mockResolvedValue({}), deleteMany: vi.fn().mockResolvedValue({ count: 0 }) },
    payment: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
    $executeRaw: vi.fn().mockResolvedValue(1),
    $queryRaw: vi.fn().mockResolvedValue([{ id: 'voucher-a' }]),
  };
  const prisma = {
    ...tx,
    order: { ...tx.order, findMany: vi.fn().mockResolvedValue([]) },
    $transaction: vi.fn(async (callback: (client: typeof tx) => unknown) => callback(tx)),
  };
  const orders = { preview: vi.fn().mockResolvedValue(preview()) };
  return { tx, prisma, orders, order };
}

async function makeService() {
  const { CheckoutService } = await import('./checkout.service.js');
  const data = fixture();
  const service = new CheckoutService(data.prisma as never, data.orders as never);
  return { ...data, service };
}

describe('CheckoutService - PRJ-P2-BD1-2', () => {
  it('tạo đơn với snapshot giá sale, giữ tồn và xóa dòng giỏ', async () => {
    const { service, prisma, tx } = await makeService();
    await service.create(userId, request());
    expect(prisma.$transaction).toHaveBeenCalled();
    expect(tx.$executeRaw).toHaveBeenCalled();
    expect(tx.order.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        status: 'PENDING_PAYMENT',
        items: expect.objectContaining({
          create: expect.arrayContaining([expect.objectContaining({
            skuId, quantity: 2, unitPrice: 80_000, lineTotal: 160_000,
          })]),
        }),
      }),
    }));
    expect(tx.cartItem.deleteMany).toHaveBeenCalled();
  });

  it('hai yêu cầu tranh tồn cuối chỉ một cập nhật thành công', async () => {
    const { service, tx } = await makeService();
    tx.$executeRaw.mockResolvedValueOnce(1).mockResolvedValueOnce(0);
    const results = await Promise.allSettled([
      service.create(userId, request()),
      service.create('user-b', request()),
    ]);
    expect(results.filter((result) => result.status === 'fulfilled')).toHaveLength(1);
    expect(results.filter((result) => result.status === 'rejected')).toHaveLength(1);
    expect(tx.order.create).toHaveBeenCalledTimes(1);
  });

  it('bắt xác nhận khi giá đổi hoặc tổng lệch', async () => {
    const { service, prisma, orders } = await makeService();
    orders.preview.mockResolvedValue({ ...preview(), total: 190_000 });
    await expect(service.create(userId, request())).rejects.toMatchObject({
      status: 409,
      response: expect.objectContaining({ code: 'CONFIRM_REQUIRED' }),
    });
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it('ghi lượt voucher trong transaction', async () => {
    const { service, tx, orders, prisma } = await makeService();
    orders.preview.mockResolvedValue({ ...preview(), voucher: { valid: true, discount: 16_000 }, total: 164_000 });
    await service.create(userId, { ...request(), voucherCode: 'SALE10', expectedTotal: 164_000 });
    expect(prisma.$transaction).toHaveBeenCalled();
    expect(tx.$queryRaw).toHaveBeenCalled();
    expect(tx.voucherUsage.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ voucherId: 'voucher-a', userId, orderId: 'order-a' }),
    }));
  });

  it('chuẩn hóa mã voucher khi tạo đơn', async () => {
    const { service, tx, orders } = await makeService();
    orders.preview.mockResolvedValue({ ...preview(), voucher: { valid: true, discount: 16_000 }, total: 164_000 });
    await service.create(userId, { ...request(), voucherCode: ' sale10 ', expectedTotal: 164_000 });
    expect(orders.preview).toHaveBeenCalledWith(userId, expect.objectContaining({ voucherCode: 'SALE10' }));
    expect(tx.voucher.findUnique).toHaveBeenCalledWith({ where: { code: 'SALE10' } });
    expect(tx.voucherUsage.create).toHaveBeenCalled();
  });

  it('hủy trả tồn và ghi log', async () => {
    const { service, tx } = await makeService();
    await service.cancel(userId, 'order-a');
    expect(tx.order.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ status: 'PENDING_PAYMENT', paymentStatus: 'UNPAID' }),
      data: expect.objectContaining({ status: 'CANCELLED' }),
    }));
    expect(tx.sku.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ id: skuId, reserved: { gte: 2 } }),
      data: expect.objectContaining({ reserved: { decrement: 2 } }),
    }));
    expect(tx.orderStatusLog.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
      field: 'status',
      fromValue: 'PENDING_PAYMENT',
      toValue: 'CANCELLED',
      actorId: userId,
    }),
  }),
);
  });

  it('hết hạn trả tồn và đánh dấu payment EXPIRED', async () => {
    const { service, prisma, tx } = await makeService();
    prisma.order.findMany.mockResolvedValue([{ id: 'order-a' }]);
    await service.expireStaleOrders();
    expect(prisma.order.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        status: 'PENDING_PAYMENT', paymentStatus: 'UNPAID',
        reserveExpiresAt: expect.objectContaining({ lte: expect.any(Date) }),
      }),
    }));
    expect(tx.order.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ status: 'CANCELLED', paymentStatus: 'EXPIRED' }),
    }));
    expect(tx.sku.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ reserved: { decrement: 2 } }),
    }));
    expect(tx.orderStatusLog.create).toHaveBeenCalledTimes(2);

expect(tx.orderStatusLog.create).toHaveBeenNthCalledWith(
  1,
  expect.objectContaining({
    data: expect.objectContaining({
      field: 'status',
      fromValue: 'PENDING_PAYMENT',
      toValue: 'CANCELLED',
      actorId: null,
    }),
  }),
);

expect(tx.orderStatusLog.create).toHaveBeenNthCalledWith(
  2,
  expect.objectContaining({
    data: expect.objectContaining({
      field: 'paymentStatus',
      fromValue: 'UNPAID',
      toValue: 'EXPIRED',
      actorId: null,
    }),
  }),
);
  });

  it.each(['hủy', 'hết hạn'] as const)(
    '%s đơn có voucher rồi tạo lại đơn cùng voucher perUserLimit = 1',
    async (action) => {
      const { service, prisma, tx, orders } = await makeService();
      let uses = 1;
      tx.voucherUsage.count.mockImplementation(async () => uses);
      tx.voucherUsage.deleteMany.mockImplementation(async ({ where }: { where: { orderId: string } }) => {
        if (where.orderId === 'order-a') uses = 0;
        return { count: 1 };
      });
      tx.voucherUsage.create.mockImplementation(async () => { uses++; return {}; });
      orders.preview.mockResolvedValue({ ...preview(), voucher: { valid: true, discount: 16_000 }, total: 164_000 });

      if (action === 'hủy') {
        await service.cancel(userId, 'order-a');
      } else {
        prisma.order.findMany.mockResolvedValue([{ id: 'order-a' }]);
        await service.expireStaleOrders();
      }

      expect(tx.voucherUsage.deleteMany).toHaveBeenCalledWith({ where: { orderId: 'order-a' } });
      expect(uses).toBe(0);
      await expect(service.create(userId, { ...request(), voucherCode: 'SALE10', expectedTotal: 164_000 })).resolves.toMatchObject({ id: 'order-a' });
      expect(tx.voucherUsage.create).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({ voucherId: 'voucher-a', userId, orderId: 'order-a' }),
      }));
      expect(uses).toBe(1);
    },
  );
  it('không xem hoặc hủy đơn của người khác', async () => {
    const { service, prisma, tx } = await makeService();
    prisma.order.findFirst.mockResolvedValue(null);
    tx.order.findFirst.mockResolvedValue(null);
    await expect(service.detail('user-b', 'order-a')).rejects.toMatchObject({ status: 404 });
    await expect(service.cancel('user-b', 'order-a')).rejects.toMatchObject({ status: 404 });
    expect(tx.order.updateMany).not.toHaveBeenCalled();
    expect(tx.sku.updateMany).not.toHaveBeenCalled();
  });

  it('returns an owned order with the frontend detail contract', async () => {
    const { service, prisma } = await makeService();
    prisma.order.findFirst.mockResolvedValue({
      id: 'order-a',
      userId,
      address: '1 Duong DAYORA',
      items: [{ id: 'order-item-a' }],
      voucherCode: 'DAYORA10',
      voucherUsage: { voucher: { code: 'DAYORA10' } },
    });

    await expect(service.detail(userId, 'order-a')).resolves.toMatchObject({
      id: 'order-a',
      address: '1 Duong DAYORA',
      voucherCode: 'DAYORA10',
      items: [{ id: 'order-item-a' }],
    });
    expect(prisma.order.findFirst).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: 'order-a', userId },
    }));
  });
});
