import { ConflictException, Inject, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service.js';
import { vnpDate, vnpQuery, vnpSign, vnpVerify } from './vnpay.js';
import type { VnpParams } from './vnpay.js';

@Injectable()
export class PaymentsService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async ipn(query: Record<string, unknown>) {
    const secret = process.env.VNP_HASH_SECRET;
    if (!secret || !vnpVerify(query, secret)) {
      return { RspCode: '97', Message: 'Invalid signature' };
    }
    if (!query.vnp_TxnRef || !query.vnp_TransactionNo || !query.vnp_ResponseCode || !query.vnp_TransactionStatus) {
      return { RspCode: '99', Message: 'Invalid data' };
    }
    try {
      return await this.prisma.$transaction(async (tx) => {
        await tx.$queryRaw`SELECT "id" FROM "Order" WHERE "code" = ${query.vnp_TxnRef} FOR UPDATE`;
        const order = await tx.order.findUnique({ where: { code: query.vnp_TxnRef }, include: { items: true } });
        if (!order) return { RspCode: '01', Message: 'Order not found' };
        if (query.vnp_Amount !== String(order.total * 100)) return { RspCode: '04', Message: 'Invalid amount' };
        if (order.paymentStatus === 'PAID' || order.paymentStatus === 'FAILED') {
          return { RspCode: '02', Message: 'Order already confirmed' };
        }
        const held = order.status === 'PENDING_PAYMENT' && order.paymentStatus === 'UNPAID';
        const released = order.status === 'CANCELLED' &&
          (order.paymentStatus === 'UNPAID' || order.paymentStatus === 'EXPIRED');
        if (query.vnp_ResponseCode !== '00' || query.vnp_TransactionStatus !== '00' || (!held && !released)) {
          return { RspCode: '99', Message: 'Processing unavailable' };
        }

        const payment = await tx.payment.findFirst({
          where: { orderId: order.id, provider: 'VNPAY', status: { in: released ? ['UNPAID', 'EXPIRED'] : ['UNPAID'] } },
          orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        });
        if (!payment) return { RspCode: '99', Message: 'Payment not found' };

        const quantities = new Map<string, number>();
        for (const item of order.items) {
          quantities.set(item.skuId, (quantities.get(item.skuId) ?? 0) + item.quantity);
        }
        const lines = [...quantities].sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0);
        for (const [skuId] of lines) {
          await tx.$queryRaw`SELECT "id" FROM "Sku" WHERE "id" = ${skuId} FOR UPDATE`;
        }
        let canFulfill = true;
        if (released) {
          const stock = await tx.sku.findMany({ where: { id: { in: lines.map(([id]) => id) } } });
          const byId = new Map(stock.map((sku) => [sku.id, sku]));
          canFulfill = lines.every(([id, quantity]) => {
            const sku = byId.get(id);
            return sku != null && sku.stock - sku.reserved >= quantity;
          });
        }
        if (canFulfill) {
          for (const [skuId, quantity] of lines) {
            const updated = await tx.sku.updateMany({
              where: held ? { id: skuId, stock: { gte: quantity }, reserved: { gte: quantity } } : { id: skuId, stock: { gte: quantity } },
              data: held ? { stock: { decrement: quantity }, reserved: { decrement: quantity } } : { stock: { decrement: quantity } },
            });
            if (updated.count !== 1) throw new Error('Insufficient stock');
          }
        }
        const updatedPayment = await tx.payment.updateMany({
          where: { id: payment.id, status: { in: released ? ['UNPAID', 'EXPIRED'] : ['UNPAID'] } },
          data: { status: 'PAID', txnNo: query.vnp_TransactionNo, paidAt: new Date() },
        });
        if (updatedPayment.count !== 1) throw new Error('Payment update failed');
const previousStatus = order.status;
const previousPaymentStatus = order.paymentStatus;

const status = canFulfill ? 'CONFIRMED' : 'CANCELLED';

await tx.order.update({
  where: { id: order.id },
  data: { status, paymentStatus: 'PAID' },
});

const paymentNote = canFulfill
  ? 'VNPay thanh toán thành công'
  : 'Thanh toán muộn, hết tồn: cần hoàn tiền thủ công';

await tx.orderStatusLog.create({
  data: {
    orderId: order.id,
    field: 'paymentStatus',
    fromValue: previousPaymentStatus,
    toValue: 'PAID',
    actorId: null,
    note: paymentNote,
  },
});

if (previousStatus !== status) {
  await tx.orderStatusLog.create({
    data: {
      orderId: order.id,
      field: 'status',
      fromValue: previousStatus,
      toValue: status,
      actorId: null,
      note: paymentNote,
    },
  });
}
        return { RspCode: '00', Message: 'Confirm Success' };
      });
    } catch {
      return { RspCode: '99', Message: 'Processing error' };
    }
  }

  async returnUrl(query: Record<string, unknown>) {
    const secret = process.env.VNP_HASH_SECRET;
    if (!secret || !vnpVerify(query, secret)) {
      return { valid: false, success: false, message: 'Chữ ký không hợp lệ' };
    }
    if (!query.vnp_TxnRef) {
      return { valid: false, success: false, message: 'Không tìm thấy mã đơn hàng' };
    }
    const order = await this.prisma.order.findUnique({
      where: { code: query.vnp_TxnRef },
      select: { id: true, code: true, total: true },
    });
    if (!order) return { valid: false, success: false, message: 'Không tìm thấy đơn hàng' };
    const success = query.vnp_Amount === String(order.total * 100) &&
      query.vnp_ResponseCode === '00' && query.vnp_TransactionStatus === '00';
    return {
      valid: true, orderId: order.id, orderCode: order.code, success,
      message: success ? 'Giao dịch thành công' : 'Giao dịch không thành công',
    };
  }

  async create(userId: string, id: string, ip: string) {
    const tmnCode = process.env.VNP_TMN_CODE;
    const secret = process.env.VNP_HASH_SECRET;
    const paymentUrl = process.env.VNP_URL;
    const returnUrl = process.env.VNP_RETURN_URL;
    if (!tmnCode || !secret || !paymentUrl || !returnUrl) {
      throw new ServiceUnavailableException('Chưa cấu hình VNPay');
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT "id" FROM "Order" WHERE "id" = ${id} AND "userId" = ${userId} FOR UPDATE`;
      const order = await tx.order.findFirst({ where: { id, userId } });
      if (!order) throw new NotFoundException('Không tìm thấy đơn hàng');

      const now = new Date();
      if (order.status !== 'PENDING_PAYMENT' || order.paymentStatus !== 'UNPAID' || !order.reserveExpiresAt || order.reserveExpiresAt <= now) {
        throw new ConflictException('Đơn hàng không thể thanh toán');
      }
      const amount = order.total * 100;
      if (!Number.isSafeInteger(amount) || amount <= 0) {
        throw new ConflictException('Số tiền thanh toán không hợp lệ');
      }

      const params: VnpParams = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: tmnCode,
        vnp_CurrCode: 'VND',
        vnp_Locale: 'vn',
        vnp_OrderType: 'other',
        vnp_Amount: String(amount),
        vnp_TxnRef: order.code,
        vnp_OrderInfo: `Thanh toan don ${order.code}`,
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: ip,
        vnp_CreateDate: vnpDate(now),
        vnp_ExpireDate: vnpDate(order.reserveExpiresAt),
      };
      await tx.payment.create({
        data: { orderId: order.id, referenceCode: randomUUID(), provider: 'VNPAY', amount: order.total, status: 'UNPAID' },
      });
      return { paymentUrl: `${paymentUrl}?${vnpQuery(params)}&vnp_SecureHash=${vnpSign(params, secret)}` };
    });
  }
}
