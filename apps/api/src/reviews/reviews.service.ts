import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
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
    return this.prisma.review.create({
      data: { userId, orderId: dto.orderId, productId: dto.productId, rating: dto.rating, comment: dto.comment },
    });
  }
}
