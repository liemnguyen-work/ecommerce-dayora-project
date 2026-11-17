import { describe, expect, it } from 'vitest';

const now = new Date('2026-11-18T05:00:00Z');

function voucher(overrides: Record<string, unknown> = {}) {
  return {
    isActive: true,
    startsAt: new Date('2026-11-01T00:00:00Z'),
    endsAt: new Date('2026-12-01T00:00:00Z'),
    minOrderValue: 0,
    usageLimit: null,
    usedCount: 0,
    perUserLimit: 1,
    userUsedCount: 0,
    percentOff: 10,
    amountOff: null,
    maxDiscount: null,
    ...overrides,
  };
}

describe('calculatePricing', () => {
  it('ví dụ charter: giá hàng và voucher đúng, phí theo chính sách hiện hành', async () => {
    const { calculatePricing } = await import('./pricing.js');
    const result = calculatePricing({
      items: [
        { price: 100_000, quantity: 2 },
        { price: 20_000, quantity: 5 },
        { price: 30_000, quantity: 1 },
        { price: 15_000, quantity: 1 },
      ],
      voucher: voucher(), zone: 'HCM_INNER', now,
    });
    expect(result).toMatchObject({ subtotal: 345_000, discount: 34_500, merchandiseTotal: 310_500, shippingFee: 20_000, shippingEstimated: false, total: 330_500 });
    expect(calculatePricing({ items: [{ price: 500_000, quantity: 1 }], zone: 'HCM_INNER', now }).shippingFee).toBe(0);
    expect(calculatePricing({ items: [{ price: 500_000, quantity: 1 }], zone: 'HCM_OUTER', now }).shippingFee).toBe(0);
    expect(calculatePricing({ items: [{ price: 500_000, quantity: 1 }], zone: 'OTHER', now }).shippingFee).toBe(40_000);
    expect(calculatePricing({ items: [{ price: 499_999, quantity: 1 }], zone: 'HCM_OUTER', now }).shippingFee).toBe(30_000);
  });

  it('dùng sale, nhân số lượng, voucher sau sale, phí ngoài voucher; không sửa input', async () => {
    const { calculatePricing } = await import('./pricing.js');
    const input = { items: [{ price: 200_000, salePrice: 100_009, quantity: 3 }], voucher: voucher(), now };
    const original = structuredClone(input);
    expect(calculatePricing(input)).toMatchObject({ subtotal: 300_027, discount: 30_002, merchandiseTotal: 270_025, shippingFee: 30_000, shippingEstimated: true, total: 300_025 });
    expect(input).toEqual(original);
  });

  it('áp trần, giảm cố định không vượt tiền hàng, chấp nhận sale 0', async () => {
    const { calculatePricing } = await import('./pricing.js');
    const input = { items: [{ price: 100_000, quantity: 1 }], now };
    expect(calculatePricing({ ...input, voucher: voucher({ percentOff: 50, maxDiscount: 20_000 }) }).discount).toBe(20_000);
    expect(calculatePricing({ ...input, voucher: voucher({ maxDiscount: 0 }) }).discount).toBe(0);
    expect(calculatePricing({ ...input, voucher: voucher({ percentOff: null, amountOff: 150_000 }) })).toMatchObject({ discount: 100_000, merchandiseTotal: 0 });
    expect(calculatePricing({ items: [{ price: 100_000, salePrice: 0, quantity: 1 }], now }).subtotal).toBe(0);
  });

  it('hiệu lực gồm thời điểm bắt đầu, loại thời điểm kết thúc; đơn tối thiểu gồm biên', async () => {
    const { calculatePricing } = await import('./pricing.js');
    const input = { items: [{ price: 100_000, quantity: 1 }], voucher: voucher({ startsAt: now, minOrderValue: 100_000 }), now };
    expect(calculatePricing(input).discount).toBe(10_000);
    expect(() => calculatePricing({ ...input, now: new Date(now.getTime() - 1) })).toThrowError(expect.objectContaining({ code: 'VOUCHER_TIME' }));
    expect(() => calculatePricing({ ...input, voucher: voucher({ endsAt: now }) })).toThrowError(expect.objectContaining({ code: 'VOUCHER_TIME' }));
    expect(() => calculatePricing({ ...input, voucher: voucher({ minOrderValue: 100_001 }) })).toThrowError(expect.objectContaining({ code: 'VOUCHER_MINIMUM' }));
    expect(() => calculatePricing({ ...input, voucher: voucher({ isActive: false }) })).toThrowError(expect.objectContaining({ code: 'VOUCHER_INACTIVE' }));
    expect(() => calculatePricing({ ...input, voucher: voucher({ usageLimit: 5, usedCount: 5 }) })).toThrowError(expect.objectContaining({ code: 'VOUCHER_LIMIT' }));
    expect(() => calculatePricing({ ...input, voucher: voucher({ perUserLimit: 1, userUsedCount: 1 }) })).toThrowError(expect.objectContaining({ code: 'VOUCHER_LIMIT' }));
  });

  it('phát hiện overflow từng dòng, cộng giỏ và tổng; phần trăm không mất chính xác', async () => {
    const { calculatePricing } = await import('./pricing.js');
    const max = Number.MAX_SAFE_INTEGER;
    expect(() => calculatePricing({ items: [{ price: max, quantity: 2 }], now })).toThrowError(expect.objectContaining({ code: 'OVERFLOW' }));
    expect(() => calculatePricing({ items: [{ price: max, quantity: 1 }, { price: 1, quantity: 1 }], now })).toThrowError(expect.objectContaining({ code: 'OVERFLOW' }));
    expect(() => calculatePricing({ items: [{ price: max, quantity: 1 }], zone: 'OTHER', now })).toThrowError(expect.objectContaining({ code: 'OVERFLOW' }));
    expect(() => calculatePricing({ items: [{ price: 1.5, quantity: 1 }], now })).toThrowError(expect.objectContaining({ code: 'INVALID_INPUT' }));
    const result = calculatePricing({ items: [{ price: max, quantity: 1 }], voucher: voucher({ percentOff: 99 }), zone: 'HCM_INNER', now });
    expect(result.discount).toBe(Number(BigInt(max) * 99n / 100n));
  });
});
