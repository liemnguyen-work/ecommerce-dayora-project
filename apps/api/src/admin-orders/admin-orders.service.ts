import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { OrdersQueryDto } from './admin-orders.dto.js';

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
}
