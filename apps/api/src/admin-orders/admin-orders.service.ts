import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type {
  OrdersQueryDto,
  UpdateStatusDto,
} from './admin-orders.dto.js';
const ALLOWED_SHIPPING_TRANSITIONS: Record<string, string[]> = {
  NOT_SHIPPED: ['PREPARING'],
  PREPARING: ['SHIPPING'],
  SHIPPING: ['DELIVERED', 'RETURNED'],
  DELIVERED: [],
  RETURNED: [],
};

type D08Order = {
  id: string;
  status: string;
  paymentStatus: string;
  shippingStatus: string;
};

function getAllowedTransitions(
  order: D08Order,
  field: 'status' | 'shippingStatus',
): string[] {
  if (field === 'status') {
    if (order.status === 'PENDING_PAYMENT') {
      return order.paymentStatus === 'PAID'
        ? ['CONFIRMED', 'CANCELLED']
        : ['CANCELLED'];
    }

    if (order.status === 'CONFIRMED') {
      if (
        order.shippingStatus === 'NOT_SHIPPED' ||
        order.shippingStatus === 'PREPARING'
      ) {
        return ['CANCELLED'];
      }

      return [];
    }

    return [];
  }

  if (order.status !== 'CONFIRMED') {
    return [];
  }

  return ALLOWED_SHIPPING_TRANSITIONS[order.shippingStatus] ?? [];
}
@Injectable()
export class AdminOrdersService {
  constructor(private readonly prisma: PrismaService) {}
async list(query: OrdersQueryDto = {}) {
  const page = query.page ?? 1;
  const skip = (page - 1) * 10;

  const where = {
    ...(query.status ? { status: query.status } : {}),
    ...(query.paymentStatus
      ? { paymentStatus: query.paymentStatus }
      : {}),
    ...(query.shippingStatus
      ? { shippingStatus: query.shippingStatus }
      : {}),
    ...(query.q?.trim()
      ? {
          OR: [
            {
              code: {
                contains: query.q.trim(),
                mode: 'insensitive' as const,
              },
            },
            {
              recipientName: {
                contains: query.q.trim(),
                mode: 'insensitive' as const,
              },
            },
            {
              user: {
                is: {
                  email: {
                    contains: query.q.trim(),
                    mode: 'insensitive' as const,
                  },
                },
              },
            },
          ],
        }
      : {}),
  };

const [items, total] = await Promise.all([
  this.prisma.order.findMany({
    where,
    skip,
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  }),
  this.prisma.order.count({ where }),
]);
  return {
    items,
    total,
    page,
    pageSize: 10,
    totalPages: Math.ceil(total / 10),
  };
}

async detail(id: string) {
  const order = await this.prisma.order.findUnique({
    where: { id },
    include: {
      items: true,
      statusLogs: {
        orderBy: { createdAt: 'desc' },
      },
      payments: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!order) {
    throw new NotFoundException('Không tìm thấy đơn hàng');
  }

  return order;
}
async update(
  id: string,
  dto: UpdateStatusDto,
  actorId: string,
) {
  return this.prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }

    const allowed = getAllowedTransitions(order, dto.field);

    if (!allowed.includes(dto.to)) {
      throw new UnprocessableEntityException({
        message: 'Chuyển trạng thái không hợp lệ',
        allowed,
      });
    }

    const isCancel =
      dto.field === 'status' && dto.to === 'CANCELLED';

    if (isCancel && !['UNPAID', 'PAID'].includes(order.paymentStatus)) {
      throw new UnprocessableEntityException({
        message: 'Trạng thái thanh toán không hỗ trợ hủy đơn',
        allowed: allowed.filter((value) => value !== 'CANCELLED'),
      });
    }

    const currentValue = order[dto.field];

    const isDelivered =
      dto.field === 'shippingStatus' &&
      dto.to === 'DELIVERED';

    const updated = await tx.order.updateMany({
      where: {
        id,
        status: order.status,
        paymentStatus: order.paymentStatus,
        shippingStatus: order.shippingStatus,
      },
      data:
        dto.field === 'status'
          ? {
              status: dto.to as typeof order.status,
            }
          : {
              shippingStatus: dto.to as typeof order.shippingStatus,
              ...(isDelivered
                ? { status: 'COMPLETED' as const }
                : {}),
            },
    });
    if (updated.count !== 1) {
      throw new ConflictException(
        'Đơn hàng đã được cập nhật bởi yêu cầu khác',
      );
    }

    if (isCancel) {
      for (const item of order.items) {
        if (order.paymentStatus === 'PAID') {
          await tx.sku.update({
            where: { id: item.skuId },
            data: {
              stock: {
                increment: item.quantity,
              },
            },
          });
        } else if (
          order.paymentStatus === 'UNPAID' &&
          order.status === 'PENDING_PAYMENT'
        ) {
          const released = await tx.sku.updateMany({
            where: {
              id: item.skuId,
              reserved: {
                gte: item.quantity,
              },
            },
            data: {
              reserved: {
                decrement: item.quantity,
              },
            },
          });

          if (released.count !== 1) {
            throw new ConflictException(
              'Không thể giải phóng tồn giữ chỗ',
            );
          }
        } else {
          throw new UnprocessableEntityException({
            message: 'Không thể hủy đơn ở trạng thái hiện tại',
            allowed: [],
          });
        }
      }
      await tx.voucherUsage.deleteMany({
        where: { orderId: id },
      });
    }

    const note = [
      `${dto.field}: ${currentValue} -> ${dto.to}`,
      `actorId: ${actorId}`,
      dto.note,
      isCancel && order.paymentStatus === 'PAID'
        ? 'Cần hoàn tiền thủ công'
        : null,
    ]
      .filter(Boolean)
      .join(' | ');

    await tx.orderStatusLog.create({
      data: {
        orderId: id,
        status: isDelivered
          ? 'COMPLETED'
          : dto.field === 'status'
            ? (dto.to as typeof order.status)
            : order.status,
        paymentStatus: order.paymentStatus,
        shippingStatus:
          dto.field === 'shippingStatus'
            ? (dto.to as typeof order.shippingStatus)
            : order.shippingStatus,
        note,
      },
    });

    return {
      ...order,
      [dto.field]: dto.to,
      ...(isDelivered ? { status: 'COMPLETED' } : {}),
    };
  });
}
}

