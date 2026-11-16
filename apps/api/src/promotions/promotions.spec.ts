import 'reflect-metadata';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { PrismaService } from '../prisma/prisma.service.js';

// Thay PrismaService bằng bản giả để kiểm tra HTTP không kết nối database.
vi.mock('../prisma/prisma.service.js', () => ({
  PrismaService: class {
    promotion = { findMany: vi.fn() };
  },
}));

describe('Promotions', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('lọc active, dùng cùng thời điểm, chọn trường công khai và thứ tự ổn định', async () => {
    const { PromotionsService } = await import('./promotions.service.js');
    const findMany = vi.fn().mockResolvedValue([]);
    const prisma = { promotion: { findMany } } as unknown as PrismaService;
    const service = new PromotionsService(prisma);
    vi.useFakeTimers();
    const now = new Date('2026-11-15T03:00:00Z');
    vi.setSystemTime(now);

    await service.list();
    expect(findMany).toHaveBeenCalledOnce();
    const options = findMany.mock.calls[0][0];
    expect(options.where).toEqual({
      isActive: true,
      AND: [
        { OR: [{ startsAt: null }, { startsAt: { lte: now } }] },
        { OR: [{ endsAt: null }, { endsAt: { gt: now } }] },
      ],
    });
    expect(options.select).toEqual({
      id: true, title: true, imageUrl: true, linkUrl: true,
      startsAt: true, endsAt: true,
    });
    expect(options.orderBy).toEqual([{ startsAt: 'desc' }, { id: 'asc' }]);
  });

  it('lấy thời gian mới mỗi request và truyền lỗi DB cho Nest xử lý', async () => {
    const { PromotionsService } = await import('./promotions.service.js');
    const findMany = vi.fn().mockResolvedValue([]);
    const service = new PromotionsService({ promotion: { findMany } } as unknown as PrismaService);
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-11-15T03:00:00Z'));
    await service.list();
    vi.setSystemTime(new Date('2026-11-15T04:00:00Z'));
    await service.list();
    const first = findMany.mock.calls[0][0].where.AND;
    const second = findMany.mock.calls[1][0].where.AND;
    expect(first[0].OR[1].startsAt.lte).toEqual(new Date('2026-11-15T03:00:00Z'));
    expect(second[0].OR[1].startsAt.lte).toEqual(new Date('2026-11-15T04:00:00Z'));
    expect(second[1].OR[1].endsAt.gt).toEqual(new Date('2026-11-15T04:00:00Z'));
    const error = new Error('database unavailable');
    findMany.mockRejectedValueOnce(error);
    await expect(service.list()).rejects.toBe(error);
  });

  it('DI thật và GET /api/promotions dùng Prisma mock, không kết nối DB', async () => {
    const { NestFactory } = await import('@nestjs/core');
    const { PrismaService: Prisma } = await import('../prisma/prisma.service.js');
    const { PromotionsModule } = await import('./promotions.module.js');
    const expected = [{ id: 'promo-1', title: 'Ưu đãi', imageUrl: 'banner.jpg', linkUrl: null, startsAt: null, endsAt: null }];
    const app = await NestFactory.create(PromotionsModule, { logger: false, abortOnError: false });
    try {
      const prisma = app.get(Prisma);
      vi.spyOn(prisma.promotion, 'findMany').mockResolvedValue(expected as never);
      app.setGlobalPrefix('api');
      await app.listen(0, '127.0.0.1');
      const address = app.getHttpServer().address();
      if (!address || typeof address === 'string') throw new Error('Không xác định được cổng test');
      const response = await fetch(`http://127.0.0.1:${address.port}/api/promotions`);
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual(expected);
    } finally {
      await app.close();
    }
  });
});
