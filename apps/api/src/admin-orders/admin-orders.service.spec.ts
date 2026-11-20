
import 'reflect-metadata';
import { beforeEach, describe, expect, it, vi } from 'vitest';

type OrderRecord = {
  id: string;
  status: string;
  paymentStatus: string;
  shippingStatus: string;
  items: Array<{
    id: string;
    skuId: string;
    quantity: number;
  }>;
};

type AdminOrdersContract = {
  listOrders: (filter?: Record<string, unknown>) => Promise<unknown>;
  updateShippingStatus: (
    orderId: string,
    nextStatus: string,
  ) => Promise<unknown>;
  cancelOrder: (
    orderId: string,
    note?: string,
  ) => Promise<unknown>;
};

const tx = {
  order: {
    findUnique: vi.fn(),
    update: vi.fn(),
    updateMany: vi.fn(),
  },
  sku: {
    updateMany: vi.fn(),
  },
  orderStatusLog: {
    create: vi.fn(),
  },
};

const prisma = {
  order: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn(),
    updateMany: vi.fn(),
  },
  sku: {
    updateMany: vi.fn(),
  },
  orderStatusLog: {
    create: vi.fn(),
  },
  $transaction: vi.fn(),
};

function mockOrder(
  overrides: Partial<OrderRecord> = {},
): OrderRecord {
  return {
    id: 'order-a',
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    shippingStatus: 'NOT_SHIPPED',
    items: [
      {
        id: 'item-a',
        skuId: 'sku-a',
        quantity: 2,
      },
    ],
    ...overrides,
  };
}

async function getService(): Promise<AdminOrdersContract> {
  // Không import tĩnh để Vitest vẫn thu thập test
  // khi service chưa được viết ở giai đoạn TDD RED.
  const modulePath = './admin-orders.service.js';

  let module: Record<string, unknown>;

  try {
    module = await vi.importActual<Record<string, unknown>>(
      modulePath,
    );
  } catch {
    throw new Error(
      'AdminOrdersService chưa được triển khai - TDD RED',
    );
  }

  const ServiceClass = module.AdminOrdersService as
    | (new (prismaClient: unknown) => AdminOrdersContract)
    | undefined;

  if (!ServiceClass) {
    throw new Error(
      'Chưa export AdminOrdersService - TDD RED',
    );
  }

  return new ServiceClass(prisma);
}

describe('AdminOrdersService - PRJ-P3-BD2-1', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    prisma.order.findMany.mockResolvedValue([]);
    prisma.order.findUnique.mockResolvedValue(mockOrder());
    prisma.order.update.mockResolvedValue(mockOrder());
    prisma.order.updateMany.mockResolvedValue({ count: 1 });

    prisma.orderStatusLog.create.mockResolvedValue({
      id: 'log-a',
      orderId: 'order-a',
    });

    prisma.sku.updateMany.mockResolvedValue({ count: 1 });

    tx.order.findUnique.mockResolvedValue(mockOrder());
    tx.order.update.mockResolvedValue(mockOrder());
    tx.order.updateMany.mockResolvedValue({ count: 1 });
    tx.sku.updateMany.mockResolvedValue({ count: 1 });
    tx.orderStatusLog.create.mockResolvedValue({
      id: 'log-a',
      orderId: 'order-a',
    });

    prisma.$transaction.mockImplementation(
      async (callback: (client: typeof tx) => Promise<unknown>) => {
        return callback(tx);
      },
    );
  });

  it('admin xem được danh sách đơn hàng', async () => {
    const order = mockOrder();

    prisma.order.findMany.mockResolvedValue([order]);

    const service = await getService();
    const result = await service.listOrders();

    expect(prisma.order.findMany).toHaveBeenCalled();
    expect(result).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: 'order-a' }),
    ]));
  });

  it('cho phép chuyển PREPARING sang SHIPPING', async () => {
    const order = mockOrder({
      shippingStatus: 'PREPARING',
    });

    prisma.order.findUnique.mockResolvedValue(order);
    tx.order.findUnique.mockResolvedValue(order);

    const service = await getService();

    const result = await service.updateShippingStatus(
      'order-a',
      'SHIPPING',
    );

    expect(result).toEqual(
      expect.objectContaining({
        shippingStatus: 'SHIPPING',
      }),
    );
  });

  it('cho phép chuyển SHIPPING sang DELIVERED', async () => {
    const order = mockOrder({
      shippingStatus: 'SHIPPING',
    });

    prisma.order.findUnique.mockResolvedValue(order);
    tx.order.findUnique.mockResolvedValue(order);

    const service = await getService();

    const result = await service.updateShippingStatus(
      'order-a',
      'DELIVERED',
    );

    expect(result).toEqual(
      expect.objectContaining({
        shippingStatus: 'DELIVERED',
      }),
    );
  });

  it('chuyển trạng thái sai trả 422 kèm allowed', async () => {
    const order = mockOrder({
      shippingStatus: 'NOT_SHIPPED',
    });

    prisma.order.findUnique.mockResolvedValue(order);
    tx.order.findUnique.mockResolvedValue(order);

    const service = await getService();

    await expect(
      service.updateShippingStatus('order-a', 'DELIVERED'),
    ).rejects.toMatchObject({
      status: 422,
      response: expect.objectContaining({
        allowed: expect.arrayContaining(['PREPARING']),
      }),
    });
  });

  it('chuyển trạng thái thành công phải ghi OrderStatusLog', async () => {
    const order = mockOrder({
      shippingStatus: 'PREPARING',
    });

    prisma.order.findUnique.mockResolvedValue(order);
    tx.order.findUnique.mockResolvedValue(order);

    const service = await getService();

    await service.updateShippingStatus(
      'order-a',
      'SHIPPING',
    );

    const calls = [
      ...prisma.orderStatusLog.create.mock.calls,
      ...tx.orderStatusLog.create.mock.calls,
    ];

    expect(calls).toEqual(
      expect.arrayContaining([
        [
          expect.objectContaining({
            data: expect.objectContaining({
              orderId: 'order-a',
              shippingStatus: 'SHIPPING',
            }),
          }),
        ],
      ]),
    );
  });

  it('hủy đơn chưa thanh toán phải giải phóng reserved', async () => {
    const order = mockOrder({
      status: 'PENDING_PAYMENT',
      paymentStatus: 'UNPAID',
      shippingStatus: 'NOT_SHIPPED',
    });

    prisma.order.findUnique.mockResolvedValue(order);
    tx.order.findUnique.mockResolvedValue(order);

    const service = await getService();

    await service.cancelOrder('order-a', 'Khách yêu cầu hủy');

    expect(tx.sku.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          id: 'sku-a',
        }),
        data: expect.objectContaining({
          reserved: expect.objectContaining({
            decrement: 2,
          }),
        }),
      }),
    );

    expect(tx.orderStatusLog.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          orderId: 'order-a',
          status: 'CANCELLED',
        }),
      }),
    );
  });

  it('hủy đơn đã thanh toán phải hoàn stock và ghi log', async () => {
    const order = mockOrder({
      status: 'CONFIRMED',
      paymentStatus: 'PAID',
      shippingStatus: 'NOT_SHIPPED',
    });

    prisma.order.findUnique.mockResolvedValue(order);
    tx.order.findUnique.mockResolvedValue(order);

    const service = await getService();

    await service.cancelOrder('order-a', 'Hủy đơn đã thanh toán');

    expect(tx.sku.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          id: 'sku-a',
        }),
        data: expect.objectContaining({
          stock: expect.objectContaining({
            increment: 2,
          }),
        }),
      }),
    );

    expect(tx.orderStatusLog.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          orderId: 'order-a',
          status: 'CANCELLED',
        }),
      }),
    );
  });

  it('không hoàn tồn kho hai lần khi đơn đã CANCELLED', async () => {
    const order = mockOrder({
      status: 'CANCELLED',
      paymentStatus: 'UNPAID',
    });

    prisma.order.findUnique.mockResolvedValue(order);
    tx.order.findUnique.mockResolvedValue(order);

    const service = await getService();

    await expect(
      service.cancelOrder('order-a'),
    ).rejects.toThrow();

    expect(tx.sku.updateMany).not.toHaveBeenCalled();
    expect(prisma.sku.updateMany).not.toHaveBeenCalled();
  });
  it('guard không cho khách vào admin', async () => {
  const { Reflector } = await import('@nestjs/core');
const { RolesGuard } =
  await import('../auth/auth.guard.js');
  const { AdminOrdersController } =
    await import('./admin-orders.controller.js');
  const guard = new RolesGuard(new Reflector());
  const context = {
    getClass: () => AdminOrdersController,
    getHandler: () => AdminOrdersController.prototype.list,
    switchToHttp: () => ({
      getRequest: () => ({
        user: { id: 'customer-a', role: 'CUSTOMER' },
      }),
    }),
  };

  expect(guard.canActivate(context as never)).toBe(false);
});
});
