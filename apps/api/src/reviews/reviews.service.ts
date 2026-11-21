import { ConflictException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

type CreateReviewInput = {
  orderId: string;
  productId: string;
  rating: number;
  comment?: string;
};

@Injectable()
export class ReviewsService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateReviewInput) {
    const order = await this.prisma.order.findFirst({
      where: {
        id: dto.orderId,
        userId,
        paymentStatus: 'PAID',
        shippingStatus: 'DELIVERED',
        items: { some: { sku: { productId: dto.productId } } },
      },
      select: { id: true },
    });
    if (!order) throw new ForbiddenException('Đơn hàng không đủ điều kiện đánh giá');
    try {
      return await this.prisma.review.create({
        data: { userId, orderId: dto.orderId, productId: dto.productId, rating: dto.rating, comment: dto.comment },
      });
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
        throw new ConflictException('Đã đánh giá sản phẩm trong đơn này');
      }
      throw error;
    }
  }

  async reviewable(userId: string) {
    const [orders, reviews] = await Promise.all([
      this.prisma.order.findMany({
        where: { userId, paymentStatus: 'PAID', shippingStatus: 'DELIVERED' },
        select: { id: true, items: { select: { sku: { select: { productId: true, product: { select: { id: true, name: true, slug: true } } } } } } },
      }),
      this.prisma.review.findMany({ where: { userId }, select: { orderId: true, productId: true } }),
    ]);
    const reviewed = new Set(reviews.map(({ orderId, productId }) => JSON.stringify([orderId, productId])));
    const seen = new Set<string>();
    const items: { orderId: string; productId: string; product: { id: string; name: string; slug: string } }[] = [];
    for (const order of orders) {
      for (const item of order.items) {
        const key = JSON.stringify([order.id, item.sku.productId]);
        if (reviewed.has(key) || seen.has(key)) continue;
        seen.add(key);
        items.push({ orderId: order.id, productId: item.sku.productId, product: item.sku.product });
      }
    }
    return items;
  }
}
