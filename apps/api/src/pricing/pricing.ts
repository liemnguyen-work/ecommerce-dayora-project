export interface PricingItem {
  price: number;
  salePrice?: number | null;
  quantity: number;
}
export interface PricingVoucher {
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
    throw new PricingError('OVERFLOW', 'Giá trị vượt giới hạn an toàn');
  }
  return Number(value);
}
export function calculatePricing(input: PricingInput) {
  if (!input.items.length) {
    throw new PricingError('INVALID_INPUT', 'Giỏ hàng không được rỗng');
  }
  let sum = 0n;
  for (const item of input.items) {
    const price = item.salePrice ?? item.price;
    if (!Number.isSafeInteger(item.price) || item.price < 0 ||
        !Number.isSafeInteger(price) || price < 0 || price > item.price ||
        !Number.isSafeInteger(item.quantity) || item.quantity < 1) {
      throw new PricingError('INVALID_INPUT', 'Giá hoặc số lượng không hợp lệ');
    }
    sum += BigInt(price) * BigInt(item.quantity);
  }
  const subtotal = safeNumber(sum);
  const voucher = input.voucher;
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
