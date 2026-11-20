
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
  list: (query?: Record<string, unknown>) => Promise<{
    items: Array<{ id: string }>;
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }>;
  update: (
    id: string,
    dto: {
      field: 'status' | 'shippingStatus';
      to: string;
      note?: string;
    },
    actorId: string,
  ) => Promise<unknown>;
};
const tx = {
  order: {
    findUnique: vi.fn(),
    update: vi.fn(),
    updateMany: vi.fn(),
  },
  sku: {
    update: vi.fn(),
    updateMany: vi.fn(),
  },
  orderStatusLog: {
    create: vi.fn(),
  },
};

const prisma = {
  order: {
    findMany: vi.fn(),
    count: vi.fn(),
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
  const { AdminOrdersService } = await import('./admin-orders.service.js');
  return new AdminOrdersService(prisma as never) as unknown as AdminOrdersContract;
}

describe('AdminOrdersService - PRJ-P3-BD2-1', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    prisma.order.count.mockResolvedValue(1);
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
    tx.sku.update.mockResolvedValue({
      id: 'sku-a',
      stock: 12,
    });
    tx.sku.updateMany.mockResolvedValue({ count: 1 });
  });
  it('admin xem được danh sách đơn hàng', async () => {
    const order = mockOrder();

    prisma.order.findMany.mockResolvedValue([order]);

    const service = await getService();
    const result = await service.list();

    expect(prisma.order.findMany).toHaveBeenCalled();
    expect(result.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'order-a' }),
      ]),
    );
    expect(result.total).toBe(1);
    expect(result.page).toBe(1);
    expect(result.pageSize).toBe(10);
  });

  it('cho phép chuyển PREPARING sang SHIPPING', async () => {
    const order = mockOrder({
      shippingStatus: 'PREPARING',
    });

    prisma.order.findUnique.mockResolvedValue(order);
    tx.order.findUnique.mockResolvedValue(order);

    const service = await getService();

    const result = await service.update(
      'order-a',
      { field: 'shippingStatus', to: 'SHIPPING' },
      'admin-a',
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

    const result = await service.update(
      'order-a',
      { field: 'shippingStatus', to: 'DELIVERED' },
      'admin-a',
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
      service.update(
        'order-a',
        { field: 'shippingStatus', to: 'DELIVERED' },
        'admin-a',
      ),
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

    await service.update(
      'order-a',
      { field: 'shippingStatus', to: 'SHIPPING' },
      'admin-a',
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

    await service.update(
      'order-a',
      { field: 'status', to: 'CANCELLED', note: 'Khách yêu cầu hủy' },
      'admin-a',
    );

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

    await service.update(
      'order-a',
      { field: 'status', to: 'CANCELLED', note: 'Hủy đơn đã thanh toán' },
      'admin-a',
    );

    expect(tx.sku.update).toHaveBeenCalledWith(
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

    expect(tx.sku.updateMany).not.toHaveBeenCalled();

    expect(tx.orderStatusLog.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          orderId: 'order-a',
          status: 'CANCELLED',
          note: expect.stringContaining('Cần hoàn tiền thủ công'),
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
      service.update(
        'order-a',
        { field: 'status', to: 'CANCELLED' },
        'admin-a',
      ),
    ).rejects.toThrow();

    expect(tx.order.updateMany).not.toHaveBeenCalled();
    expect(tx.sku.update).not.toHaveBeenCalled();
    expect(tx.sku.updateMany).not.toHaveBeenCalled();
    expect(tx.orderStatusLog.create).not.toHaveBeenCalled();
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
it('chỉ xác nhận khi đã thanh toán', async () => {
  const service = (await getService()) as AdminOrdersContract & {
    update: (
      id: string,
      dto: { field: 'status'; to: string },
      actorId: string,
    ) => Promise<unknown>;
  };

  const unpaidOrder = mockOrder({
    status: 'PENDING_PAYMENT',
    paymentStatus: 'UNPAID',
  });

  tx.order.findUnique.mockResolvedValue(unpaidOrder);

  await expect(
    service.update(
      'order-a',
      { field: 'status', to: 'CONFIRMED' },
      'admin-a',
    ),
  ).rejects.toMatchObject({
    status: 422,
    response: expect.objectContaining({
      allowed: ['CANCELLED'],
    }),
  });

  expect(tx.order.updateMany).not.toHaveBeenCalled();

  const paidOrder = mockOrder({
    status: 'PENDING_PAYMENT',
    paymentStatus: 'PAID',
  });

  tx.order.findUnique.mockResolvedValue(paidOrder);

  const result = await service.update(
    'order-a',
    { field: 'status', to: 'CONFIRMED' },
    'admin-a',
  );

  expect(result).toEqual(
    expect.objectContaining({
      status: 'CONFIRMED',
    }),
  );

  expect(tx.orderStatusLog.create).toHaveBeenCalled();
});
it('đúng sơ đồ giao hàng và chỉ hoàn tất khi đã giao', async () => {
  const service = (await getService()) as AdminOrdersContract & {
    update: (
      id: string,
      dto: {
        field: 'status' | 'shippingStatus';
        to: string;
      },
      actorId: string,
    ) => Promise<unknown>;
  };

  const order = mockOrder({
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    shippingStatus: 'NOT_SHIPPED',
  });

  tx.order.findUnique.mockResolvedValue(order);

  await expect(
    service.update(
      'order-a',
      { field: 'status', to: 'COMPLETED' },
      'admin-a',
    ),
  ).rejects.toMatchObject({
    status: 422,
  });

  await expect(
    service.update(
      'order-a',
      { field: 'shippingStatus', to: 'DELIVERED' },
      'admin-a',
    ),
  ).rejects.toMatchObject({
    status: 422,
    response: expect.objectContaining({
      allowed: ['PREPARING'],
    }),
  });

  let current = order;

  for (const next of [
    'PREPARING',
    'SHIPPING',
    'DELIVERED',
  ] as const) {
    tx.order.findUnique.mockResolvedValue(current);

    const result = await service.update(
      'order-a',
      { field: 'shippingStatus', to: next },
      'admin-a',
    );

    expect(result).toEqual(
      expect.objectContaining({
        shippingStatus: next,
      }),
    );

    current = {
      ...current,
      shippingStatus: next,
    };
  }

  tx.order.findUnique.mockResolvedValue(current);

  const completed = await service.update(
    'order-a',
    { field: 'status', to: 'COMPLETED' },
    'admin-a',
  );

  expect(completed).toEqual(
    expect.objectContaining({
      status: 'COMPLETED',
    }),
  );

  expect(tx.orderStatusLog.create).toHaveBeenCalledTimes(4);
}); 
it('hủy pending trả reserved', async () => {
  const order = mockOrder({
    status: 'PENDING_PAYMENT',
    paymentStatus: 'UNPAID',
    shippingStatus: 'NOT_SHIPPED',
  });

  tx.order.findUnique.mockResolvedValue(order);

  const service = (await getService()) as AdminOrdersContract & {
    update: (
      id: string,
      dto: {
        field: 'status';
        to: string;
        note?: string;
      },
      actorId: string,
    ) => Promise<unknown>;
  };

  const result = await service.update(
    'order-a',
    {
      field: 'status',
      to: 'CANCELLED',
      note: 'Khách yêu cầu hủy',
    },
    'admin-a',
  );

  expect(result).toEqual(
    expect.objectContaining({
      status: 'CANCELLED',
    }),
  );

  expect(tx.order.updateMany).toHaveBeenCalledWith(
    expect.objectContaining({
      where: expect.objectContaining({
        id: 'order-a',
        status: 'PENDING_PAYMENT',
        paymentStatus: 'UNPAID',
      }),
      data: {
        status: 'CANCELLED',
      },
    }),
  );

  expect(tx.sku.updateMany).toHaveBeenCalledWith({
    where: {
      id: 'sku-a',
      reserved: {
        gte: 2,
      },
    },
    data: {
      reserved: {
        decrement: 2,
      },
    },
  });

  expect(tx.sku.update).not.toHaveBeenCalled();

  expect(tx.orderStatusLog.create).toHaveBeenCalledWith(
    expect.objectContaining({
      data: expect.objectContaining({
        orderId: 'order-a',
        status: 'CANCELLED',
      }),
    }),
  );
});
it('hủy đơn PAID cộng stock và ghi cần hoàn tiền', async () => {
  const order = mockOrder({
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    shippingStatus: 'NOT_SHIPPED',
  });

  tx.order.findUnique.mockResolvedValue(order);

  const service = (await getService()) as AdminOrdersContract & {
    update: (
      id: string,
      dto: {
        field: 'status';
        to: string;
        note?: string;
      },
      actorId: string,
    ) => Promise<unknown>;
  };

  const result = await service.update(
    'order-a',
    {
      field: 'status',
      to: 'CANCELLED',
    },
    'admin-a',
  );

  expect(result).toEqual(
    expect.objectContaining({
      status: 'CANCELLED',
    }),
  );

  expect(tx.sku.update).toHaveBeenCalledWith({
    where: {
      id: 'sku-a',
    },
    data: {
      stock: {
        increment: 2,
      },
    },
  });

  expect(tx.sku.updateMany).not.toHaveBeenCalled();

  expect(tx.orderStatusLog.create).toHaveBeenCalledWith(
    expect.objectContaining({
      data: expect.objectContaining({
        orderId: 'order-a',
        status: 'CANCELLED',
        note: expect.stringContaining(
          'Cần hoàn tiền thủ công',
        ),
      }),
    }),
  );

  expect(tx.order.updateMany).toHaveBeenCalledWith(
    expect.objectContaining({
      data: {
        status: 'CANCELLED',
      },
    }),
  );
});
});
