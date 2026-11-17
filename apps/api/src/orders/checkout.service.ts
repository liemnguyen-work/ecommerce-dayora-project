import { ConflictException, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { PrismaService } from '../prisma/prisma.service.js';
import { calculatePricing, PricingError } from '../pricing/pricing.js';
import { OrdersService } from './orders.service.js';
import type { ExpectedDto, AddressDto } from './orders.dto.js';

type Recipient = AddressDto & {
  name: string;
  phone: string;
  address: string;
};

export type CreateOrderInput = {
  recipient: Recipient;
  expected: ExpectedDto[];
  expectedTotal: number;
  voucherCode?: string;
};

@Injectable()
export class CheckoutService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly orders: OrdersService,
  ) {}

  async create(userId: string, dto: CreateOrderInput) {
    const preview = await this.orders.preview(userId, {
      voucherCode: dto.voucherCode,
      address: dto.recipient,
      expected: dto.expected,
    });
    const expectedPrices = new Map(dto.expected.map((entry) => [entry.skuId, entry.unitPrice]));
    if (
      preview.warnings.length > 0 ||
      preview.total !== dto.expectedTotal ||
      (dto.voucherCode != null && !preview.voucher?.valid) ||
      expectedPrices.size !== dto.expected.length ||
      preview.lines.some((line) => expectedPrices.get(line.skuId) !== line.sku.effectivePrice) ||
      expectedPrices.size !== new Set(preview.lines.map((line) => line.skuId)).size
    ) {
      throw new ConflictException({ code: 'CONFIRM_REQUIRED', preview });
    }


    return this.prisma.$transaction(async (tx) => {
      const cartItems = await tx.cartItem.findMany({
        where: { cart: { userId } },
        include: { sku: { include: { product: true } } },
      });
      const previewById = new Map(preview.lines.map((line) => [line.id, line]));
      if (
        cartItems.length !== preview.lines.length ||
        cartItems.some((item) => {
          const line = previewById.get(item.id);
          return !line || item.skuId !== line.skuId ||
            item.quantity !== line.quantity || item.kitGroupId !== line.kitGroupId;
        })
      ) {
        throw new ConflictException({ code: 'CONFIRM_REQUIRED', preview });
      }

      let voucherId: string | undefined;
      let discount = 0;
      if (dto.voucherCode) {
        await tx.$queryRaw`SELECT "id" FROM "Voucher" WHERE "code" = ${dto.voucherCode} FOR UPDATE`;
        const voucher = await tx.voucher.findUnique({ where: { code: dto.voucherCode } });
        if (!voucher) {
          throw new ConflictException({ code: 'CONFIRM_REQUIRED', preview });
        }
        const usedCount = await tx.voucherUsage.count({ where: { voucherId: voucher.id } });
        const userUsedCount = await tx.voucherUsage.count({ where: { voucherId: voucher.id, userId } });
        try {
          const pricing = calculatePricing({
            items: preview.lines.map((line) => ({
              price: line.sku.price,
              salePrice: line.sku.salePrice,
              quantity: line.quantity,
            })),
            voucher: { ...voucher, usedCount, userUsedCount },
            now: new Date(),
          });
          if (
            pricing.subtotal !== preview.subtotal ||
            pricing.discount !== preview.voucher?.discount ||
            pricing.merchandiseTotal + preview.shippingFee !== preview.total
          ) {
            throw new ConflictException({ code: 'CONFIRM_REQUIRED', preview });
          }
          discount = pricing.discount;
          voucherId = voucher.id;
        } catch (error) {
          if (error instanceof PricingError && error.code.startsWith('VOUCHER_')) {
            throw new ConflictException({ code: 'CONFIRM_REQUIRED', preview });
          }
          throw error;
        }
      }

      const quantities = new Map<string, number>();
      for (const line of preview.lines) {
        quantities.set(line.skuId, (quantities.get(line.skuId) ?? 0) + line.quantity);
      }
      for (const [skuId, quantity] of [...quantities].sort(([a], [b]) => a.localeCompare(b))) {
        const line = preview.lines.find((entry) => entry.skuId === skuId)!;
        const changed = await tx.$executeRaw`
          UPDATE "Sku" SET "reserved" = "reserved" + ${quantity}
          WHERE "id" = ${skuId} AND "status" = 'ACTIVE'
          AND "stock" - "reserved" >= ${quantity}
          AND "price" = ${line.sku.price}
          AND "salePrice" IS NOT DISTINCT FROM ${line.sku.salePrice}
          AND EXISTS (SELECT 1 FROM "Product" WHERE "Product"."id" = "Sku"."productId" AND "Product"."status" = 'ACTIVE')
        `;
        if (changed !== 1) {
          throw new ConflictException({ code: 'OUT_OF_STOCK' });
        }
      }

      const order = await tx.order.create({
        data: {
          code: randomUUID(),
          userId,
          status: 'PENDING_PAYMENT',
          recipientName: dto.recipient.name,
          recipientPhone: dto.recipient.phone,
          recipientAddress: dto.recipient.address,
          subtotal: preview.subtotal,
          discount,
          shippingFee: preview.shippingFee,
          total: preview.total,
          reserveExpiresAt: new Date(Date.now() + 15 * 60_000),
          items: {
            create: preview.lines.map((line) => ({
              skuId: line.skuId,
              productName: line.sku.product.name,
              skuCode: line.sku.code,
              colorSnapshot: line.sku.color,
              unitSnapshot: line.sku.unit,
              unitPrice: line.sku.effectivePrice,
              quantity: line.quantity,
              lineTotal: line.lineTotal,
              kitGroupId: line.kitGroupId,
            })),
          },
        },
        include: { items: true },
      });
      if (voucherId) {
        await tx.voucherUsage.create({
          data: { voucherId, userId, orderId: order.id },
        });
      }
      await tx.orderStatusLog.create({
        data: { orderId: order.id, status: 'PENDING_PAYMENT', note: 'Tạo đơn' },
      });
      for (const item of cartItems) {
        const deleted = await tx.cartItem.deleteMany({
          where: { id: item.id, cart: { userId }, quantity: item.quantity },
        });
        if (deleted.count !== 1) {
          throw new ConflictException({ code: 'CONFIRM_REQUIRED', preview });
        }
      }
      return order;
    });
  }
}
