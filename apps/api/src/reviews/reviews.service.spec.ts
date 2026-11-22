import { describe, expect, it, vi } from 'vitest';

function fixture() {
  const prisma = {
    order: { findFirst: vi.fn().mockResolvedValue({ id: 'order-1' }), findMany: vi.fn() },
    review: { create: vi.fn().mockResolvedValue({ id: 'review-1' }), findMany: vi.fn(), aggregate: vi.fn() },
    product: { findUnique: vi.fn() },
  };
  return prisma;
}
async function makeService() {
  const { ReviewsService } = await import('./reviews.service.js');
  const prisma = fixture();
  return { prisma, service: new ReviewsService(prisma as never) };
}
const dto = { orderId: 'order-1', productId: 'product-1', rating: 5, comment: 'Tốt' };

describe('Đánh giá sau mua — PRJ-P3-BD1-3', () => {
  it('từ chối đơn chưa thanh toán, chưa giao hoặc đơn của người khác', async () => {
    const { service, prisma } = await makeService();
    prisma.order.findFirst.mockResolvedValue(null);
    await expect(service.create('user-1', dto)).rejects.toMatchObject({ status: 403 });
    expect(prisma.order.findFirst).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ id: dto.orderId, userId: 'user-1', paymentStatus: 'PAID', shippingStatus: 'DELIVERED', items: { some: { sku: { productId: dto.productId } } } }),
    }));
    expect(prisma.review.create).not.toHaveBeenCalled();
  });

  it('trả 409 khi trùng', async () => {
    const { service, prisma } = await makeService();
    prisma.review.create.mockRejectedValue({ code: 'P2002' });
    await expect(service.create('user-1', dto)).rejects.toMatchObject({ status: 409 });
  });

  it('kiểm tra rating 1–5 và comment tối đa 1000', async () => {
    const { CreateReviewDto } = await import('./reviews.dto.js');
    const { plainToInstance } = await import('class-transformer');
    const { validate } = await import('class-validator');
    for (const rating of [0, 6, 4.5]) {
      expect((await validate(plainToInstance(CreateReviewDto, { ...dto, rating }))).length).toBeGreaterThan(0);
    }
    expect((await validate(plainToInstance(CreateReviewDto, { ...dto, comment: 'a'.repeat(1001) }))).length).toBeGreaterThan(0);
    expect(await validate(plainToInstance(CreateReviewDto, { ...dto, rating: 1, comment: 'a'.repeat(1000) }))).toHaveLength(0);
    expect(await validate(plainToInstance(CreateReviewDto, { ...dto, rating: 5 }))).toHaveLength(0);
  });

  it('chỉ liệt kê cặp chưa đánh giá và loại SKU trùng sản phẩm', async () => {
    const { service, prisma } = await makeService();
    prisma.order.findMany.mockResolvedValue([{ id: 'order-1', items: [{ sku: { productId: 'product-1', product: { id: 'product-1', name: 'A' } } }, { sku: { productId: 'product-1', product: { id: 'product-1', name: 'A' } } }, { sku: { productId: 'product-2', product: { id: 'product-2', name: 'B' } } }] }]);
    prisma.review.findMany.mockResolvedValue([{ orderId: 'order-1', productId: 'product-2' }]);
    const result = await service.reviewable('user-1');
    expect(result).toHaveLength(1);
    expect(JSON.stringify(result)).toContain('product-1');
    expect(JSON.stringify(result)).not.toContain('product-2');
    expect(prisma.order.findMany).toHaveBeenCalledWith(expect.objectContaining({ where: expect.objectContaining({ userId: 'user-1', paymentStatus: 'PAID', shippingStatus: 'DELIVERED' }) }));
  });

  it('trả trung bình, số lượng và tên rút gọn', async () => {
    const { service, prisma } = await makeService();
    prisma.product.findUnique.mockResolvedValue({ id: 'product-1' });
    prisma.review.findMany.mockResolvedValue([{ id: 'r1', rating: 5, user: { fullName: 'Nguyễn Văn An' } }, { id: 'r2', rating: 3, user: { fullName: 'An' } }]);
    prisma.review.aggregate.mockResolvedValue({ _avg: { rating: 4 }, _count: { _all: 2 } });
    const result = await service.list('product-slug', 1);
    expect(result).toMatchObject({ average: 4, count: 2, page: 1 });
    expect(JSON.stringify(result)).toContain('Nguyễn Văn A.');
    expect(JSON.stringify(result)).toContain('A.');
    expect(JSON.stringify(result)).not.toContain('Nguyễn Văn An');
    expect(prisma.review.findMany).toHaveBeenCalledWith(expect.objectContaining({ skip: 0, take: 10 }));
  });
});
