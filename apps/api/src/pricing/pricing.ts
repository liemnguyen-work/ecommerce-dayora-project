export interface PricingItem {
  price: number;
  salePrice?: number | null;
  quantity: number;
}
export interface PricingVoucher {
  isActive: boolean;
  startsAt: Date;
  endsAt: Date;
  minOrderValue: number | null;
  usageLimit: number | null;
  usedCount: number;
  perUserLimit: number | null;
  userUsedCount: number;
  percentOff?: number | null;
  amountOff?: number | null;
  maxDiscount?: number | null;
}
export interface PricingInput {
  items: readonly PricingItem[];
  voucher?: PricingVoucher | null;
  zone?: 'HCM_INNER' | 'HCM_OUTER' | 'OTHER' | null;
  now: Date;
}
export class PricingError extends Error {
  constructor(
    public readonly code: 'INVALID_INPUT' | 'OVERFLOW' | 'VOUCHER_INACTIVE' | 'VOUCHER_TIME' | 'VOUCHER_MINIMUM' | 'VOUCHER_LIMIT',
    message: string,
  ) {
    super(message);
    this.name = 'PricingError';
  }
}
function safeNumber(value: bigint): number {
  if (value > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new PricingError('OVERFLOW', 'Số tiền vượt giới hạn integer an toàn');
  }
  return Number(value);
}
function integer(value: unknown, field: string, minimum = 0): asserts value is number {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < minimum) {
    throw new PricingError('INVALID_INPUT', `Đầu vào không hợp lệ: ${field}`);
  }
}

export function calculatePricing(input: PricingInput) {
  if (!input.items.length) {
    throw new PricingError('INVALID_INPUT', 'Giỏ hàng không được rỗng');
  }
  let sum = 0n;
  for (const item of input.items) {
    integer(item.price, 'price');
    integer(item.quantity, 'quantity', 1);
    if (item.salePrice != null) integer(item.salePrice, 'salePrice');
    const price = item.salePrice ?? item.price;
    if (price > item.price) {
      throw new PricingError('INVALID_INPUT', 'Giá sale vượt giá gốc');
    }
    const lineTotal = BigInt(price) * BigInt(item.quantity);
    safeNumber(lineTotal);
    sum += lineTotal;
    safeNumber(sum);
  }
  const subtotal = safeNumber(sum);
  const voucher = input.voucher;
  if (voucher) {
    integer(voucher.usedCount, 'usedCount');
    integer(voucher.userUsedCount, 'userUsedCount');
    for (const [field, value] of Object.entries({
      minOrderValue: voucher.minOrderValue,
      usageLimit: voucher.usageLimit,
      perUserLimit: voucher.perUserLimit,
      percentOff: voucher.percentOff,
      amountOff: voucher.amountOff,
      maxDiscount: voucher.maxDiscount,
    })) {
      if (value != null) integer(value, field);
    }
    if (voucher.percentOff != null && voucher.percentOff > 100) {
      throw new PricingError('INVALID_INPUT', 'Phần trăm giảm không được vượt quá 100');
    }
    if (!voucher.isActive) {
      throw new PricingError('VOUCHER_INACTIVE', 'Voucher không hoạt động');
    }
    if (input.now < voucher.startsAt || input.now >= voucher.endsAt) {
      throw new PricingError('VOUCHER_TIME', 'Voucher ngoài hạn hiệu lực');
    }
    if (subtotal < (voucher.minOrderValue ?? 0)) {
      throw new PricingError('VOUCHER_MINIMUM', 'Chưa đạt đơn tối thiểu');
    }
    if ((voucher.usageLimit != null && voucher.usedCount >= voucher.usageLimit) ||
        (voucher.perUserLimit != null && voucher.userUsedCount >= voucher.perUserLimit)) {
      throw new PricingError('VOUCHER_LIMIT', 'Voucher hết lượt sử dụng');
    }
  }
  const raw = voucher?.percentOff != null
    ? safeNumber(sum * BigInt(voucher.percentOff) / 100n)
    : (voucher?.amountOff ?? 0);
  const discount = Math.min(raw, voucher?.maxDiscount ?? subtotal, subtotal);
  const merchandiseTotal = subtotal - discount;
  const shippingEstimated = input.zone == null;
  let shippingFee = input.zone === 'HCM_INNER' ? 20_000 : input.zone === 'OTHER' ? 40_000 : 30_000;
  if ((input.zone === 'HCM_INNER' || input.zone === 'HCM_OUTER') && merchandiseTotal >= 500_000) {
    shippingFee = 0;
  }
  const shippingLabel = shippingEstimated ? 'Phí giao hàng tạm tính' : 'Phí giao hàng';
  const total = safeNumber(BigInt(merchandiseTotal) + BigInt(shippingFee));
  return { subtotal, discount, merchandiseTotal, shippingFee, shippingEstimated, shippingLabel, total };
}
