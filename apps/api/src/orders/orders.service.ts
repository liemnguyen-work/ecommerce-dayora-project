import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CartService } from '../cart/cart.service.js';
import type { PreviewDto } from './orders.dto.js';
import {
  calculatePricing,
  PricingError,
  type PricingInput,
} from '../pricing/pricing.js';
type PreviewWarning = {
  skuId: string;
  type: string;
  message?: string;
  oldPrice?: number;
  newPrice?: number;
};

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cart: CartService,
  ) {}

  async preview(userId: string, dto: PreviewDto) {
    // Đọc giỏ hàng thuộc đúng người dùng.
    const cart = await this.cart.get(userId);

    if (cart.items.length === 0) {
      throw new BadRequestException('Giỏ hàng trống');
    }

    // Giữ các cảnh báo tồn kho có sẵn.
    const warnings: PreviewWarning[] = [...cart.warnings];

    // Giá từ trình duyệt chỉ dùng để đối chiếu.
    const expectedPrices = new Map(
      (dto.expected ?? []).map((entry) => [
        entry.skuId,
        entry.unitPrice,
      ]),
    );

    const checkedSkus = new Set<string>();

    for (const item of cart.items) {
      if (checkedSkus.has(item.skuId)) {
        continue;
      }

      checkedSkus.add(item.skuId);

      const oldPrice = expectedPrices.get(item.skuId);
      const newPrice = item.sku.effectivePrice;

      if (
        oldPrice !== undefined &&
        oldPrice !== newPrice
      ) {
        warnings.push({
          skuId: item.skuId,
          type: 'PRICE_CHANGED',
          message: 'Giá sản phẩm đã thay đổi',
          oldPrice,
          newPrice,
        });
      }
    }
const lines = cart.items;

const items = lines.map((item) => ({
  price: item.sku.price,
  salePrice: item.sku.salePrice,
  quantity: item.quantity,
}));
const province = (dto.address?.province ?? '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/đ/g, 'd')
  .trim()
  .toLowerCase()
  .replace(/[.\s-]+/g, ' ');

const isHcm = [
  'ho chi minh',
  'tp ho chi minh',
  'thanh pho ho chi minh',
  'hcm',
  'tphcm',
].includes(province);

const zone: PricingInput['zone'] = !dto.address
  ? null
  : isHcm
    ? dto.address.isInnerHcm
      ? 'HCM_INNER'
      : 'HCM_OUTER'
    : 'OTHER';

const base: PricingInput = {
  items,
  zone,
  now: new Date(),
};

let pricing = calculatePricing(base);

let voucher: {
  valid: boolean;
  code?: string;
  percentOff?: number | null;
  reason?: string;
  discount?: number;
} | null = null;

if (dto.voucherCode) {
  const found = await this.prisma.voucher.findUnique({
    where: { code: dto.voucherCode },
  });

  if (!found) {
    voucher = {
      valid: false,
      code: dto.voucherCode,
      reason: 'Không tìm thấy voucher',
    };
  } else {
 const [usedCount, userUsedCount] = await Promise.all([
  this.prisma.voucherUsage.count({
    where: {
      voucherId: found.id,
    },
  }),
  this.prisma.voucherUsage.count({
    where: {
      voucherId: found.id,
      userId,
    },
  }),
]);
    try {
  pricing = calculatePricing({
  ...base,
  voucher: {
    ...found,
    usedCount,
    userUsedCount,
  },
});
      voucher = {
        valid: true,
        code: found.code,
        percentOff: found.percentOff,
        discount: pricing.discount,
      };
    } catch (error) {
      if (!(error instanceof PricingError)) {
        throw error;
      }

      if (!error.code.startsWith('VOUCHER_')) {
        throw error;
      }

      voucher = {
        valid: false,
        code: found.code,
        percentOff: found.percentOff,
        reason: error.message,
      };
    }
  }
}

const subtotal = pricing.subtotal;
const saleDiscount = 0;
const shippingFee = pricing.shippingFee;
const shippingIsEstimate = pricing.shippingEstimated;
const total = pricing.total;

    return {
      lines,
      subtotal,
      saleDiscount,
      voucher,
      shippingFee,
      shippingIsEstimate,
      total,
      warnings,
    };
  }
}
