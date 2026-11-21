import { BadRequestException, ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
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

  async list(slug: string, page: number) {
    if (!Number.isSafeInteger(page) || page < 1) throw new BadRequestException('Trang không hợp lệ');
    const product = await this.prisma.product.findUnique({ where: { slug }, select: { id: true } });
    if (!product) throw new NotFoundException('Không tìm thấy sản phẩm');
    const where = { productId: product.id };
    const [rows, aggregate] = await Promise.all([
      this.prisma.review.findMany({
        where,
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        skip: (page - 1) * 10,
        take: 10,
        select: { id: true, rating: true, comment: true, createdAt: true, user: { select: { fullName: true } } },
      }),
      this.prisma.review.aggregate({ where, _avg: { rating: true }, _count: { _all: true } }),
    ]);
    const items = rows.map(({ user, ...review }) => {
      const names = user.fullName.trim().split(/\s+/).filter(Boolean);
      const last = names.pop() ?? '';
      const initial = Array.from(last)[0] ?? '';
      const fullName = [...names, initial ? `${initial}.` : ''].filter(Boolean).join(' ');
      return { ...review, user: { fullName } };
    });
    return { items, average: aggregate._avg.rating ?? 0, count: aggregate._count._all, page };
  }

  async deleteReview(id: string) {
    const result = await this.prisma.review.deleteMany({ where: { id } });
    if (result.count !== 1) throw new NotFoundException('Không tìm thấy đánh giá');
    return { deleted: true };
  }

  async adminList() {
    return this.prisma.review.findMany({
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      select: { id: true, productId: true, orderId: true, rating: true, comment: true, createdAt: true },
    });
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
