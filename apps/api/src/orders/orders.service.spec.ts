
import 'reflect-metadata';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const cart = {
  get: vi.fn(),
};

const prisma = {
  voucher: {
    findUnique: vi.fn(),
  },
  voucherUsage: {
    count: vi.fn(),
  },
  shippingRate: {
    findUnique: vi.fn(),
  },
};

function mockCart(price: number, warnings: unknown[] = []) {
  cart.get.mockResolvedValue({
    subtotal: price,
    warnings,
    items: [
      {
        id: 'item-1',
        skuId: 'sku-a',
        quantity: 1,
        sku: {
          id: 'sku-a',
          price,
          salePrice: null,
          effectivePrice: price,
          stock: 10,
          reserved: 0,
          status: 'ACTIVE',
          product: { status: 'ACTIVE' },
        },
        lineTotal: price,
      },
    ],
  });
}

async function preview(dto: Record<string, unknown>) {
  // Import khi chạy test để test vẫn được thu thập
  // ngay cả khi OrdersService chưa được tạo.
  let module: typeof import('./orders.service.js');

  try {
    module = await import('./orders.service.js');
  } catch {
    throw new Error('OrdersService chưa được triển khai');
  }

  const service = new module.OrdersService(
    prisma as never,
    cart as never,
  );

  return service.preview('user-a', dto);
}

describe('OrdersService - PRJ-P2-BD2-2', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    prisma.shippingRate.findUnique.mockResolvedValue({
      zone: 'HCM_INNER',
      fee: 20000,
      freeFromValue: 500000,
    });

    prisma.voucherUsage.count.mockResolvedValue(0);
  });

  // =====================================================
  // 3 TEST GỐC - ISSUE #332
  // =====================================================

  it('áp trần phần trăm và cảnh báo giá, tồn', async () => {
    mockCart(200000, [
      { skuId: 'sku-a', type: 'INSUFFICIENT_STOCK' },
    ]);

    prisma.voucher.findUnique.mockResolvedValue({
      id: 'voucher-a',
      code: 'SALE20',
      isActive: true,
      startsAt: new Date('2020-01-01'),
      endsAt: new Date('2099-01-01'),
      usageLimit: 100,
      usedCount: 0,
      perUserLimit: 5,
      minOrderValue: 0,
      percentOff: 20,
      amountOff: null,
      maxDiscount: 10000,
    });

    const result = await preview({
      voucherCode: 'SALE20',
      expected: [
        { skuId: 'sku-a', unitPrice: 100000 },
      ],
    });

    expect(cart.get).toHaveBeenCalledWith('user-a');
    expect(result.subtotal).toBe(200000);

    // 20% của 200000 = 40000,
    // nhưng mức giảm tối đa là 10000.
    expect(result.total).toBe(220000);

    expect(result.warnings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          skuId: 'sku-a',
          type: 'PRICE_CHANGED',
          oldPrice: 100000,
          newPrice: 200000,
          message: 'Giá sản phẩm đã thay đổi',
        }),
        expect.objectContaining({
          skuId: 'sku-a',
          type: 'INSUFFICIENT_STOCK',
        }),
      ]),
    );
  });

  it('miễn phí HCM khi đủ 500.000 sau giảm', async () => {
    mockCart(500000);

    const result = await preview({
      address: {
        province: 'Hồ Chí Minh',
        isInnerHcm: true,
      },
    });

    expect(result.subtotal).toBe(500000);
    expect(result.shippingFee).toBe(0);
    expect(result.shippingIsEstimate).toBe(false);
    expect(result.total).toBe(500000);
  });

  it('rejects a voucher before its start date and after the user limit', async () => {
    mockCart(200000);

    const voucher = {
      id: 'voucher-a',
      code: 'SALE20',
      isActive: true,
      startsAt: new Date('2099-01-01'),
      endsAt: new Date('2099-12-31'),
      usageLimit: 100,
      usedCount: 0,
      perUserLimit: 1,
      minOrderValue: 0,
      percentOff: 20,
      amountOff: null,
      maxDiscount: 10000,
    };

    prisma.voucher.findUnique.mockResolvedValue({
      ...voucher,
    });

    const beforeStart = await preview({
      voucherCode: 'SALE20',
    });

    expect(beforeStart.voucher).toEqual(
      expect.objectContaining({
        valid: false,
      }),
    );
    expect(beforeStart.voucher?.reason).toBeTruthy();

    prisma.voucher.findUnique.mockResolvedValue({
      ...voucher,
      startsAt: new Date('2020-01-01'),
      endsAt: new Date('2099-12-31'),
    });

    prisma.voucherUsage.count.mockResolvedValue(1);

    const overLimit = await preview({
      voucherCode: 'SALE20',
    });

    expect(overLimit.voucher).toEqual(
      expect.objectContaining({
        valid: false,
      }),
    );
    expect(overLimit.voucher?.reason).toBeTruthy();
  });

  // =====================================================
  // 4 TEST BỔ SUNG - ISSUE #347
  // =====================================================

  it('tính phí 30000 khi HCM chưa đủ ngưỡng miễn phí', async () => {
    mockCart(499999);

    const result = await preview({
      address: {
        province: 'TP. Hồ Chí Minh',
        isInnerHcm: false,
      },
    });

    expect(result.shippingFee).toBe(30000);
    expect(result.shippingIsEstimate).toBe(false);
    expect(result.total).toBe(529999);
  });

  it('ngoài HCM vẫn tính phí 40000 khi đơn trên 500000', async () => {
    mockCart(600000);

    const result = await preview({
      address: {
        province: 'Hà Nội',
      },
    });

    expect(result.shippingFee).toBe(40000);
    expect(result.total).toBe(640000);
  });

  it('chưa có địa chỉ thì phí giao chỉ là tạm tính', async () => {
    mockCart(200000);

    const result = await preview({});

    expect(result.shippingFee).toBe(30000);
    expect(result.shippingIsEstimate).toBe(true);
    expect(result.total).toBe(230000);
  });

  it('voucher không tồn tại không làm giảm tổng tiền', async () => {
    mockCart(200000);
    prisma.voucher.findUnique.mockResolvedValue(null);

    const result = await preview({
      voucherCode: 'NOTFOUND',
    });

    expect(result.voucher).toEqual(
      expect.objectContaining({
        valid: false,
        reason: expect.any(String),
      }),
    );

    expect(result.total).toBe(230000);
  });
});
