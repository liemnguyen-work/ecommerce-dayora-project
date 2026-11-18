import 'reflect-metadata';
import { describe, expect, it, vi } from 'vitest';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { JwtAuthGuard, RolesGuard } from '../auth/auth.guard.js';

const base = {
  id: 'voucher-a', code: 'DAYORA10', description: 'Giảm giá 10%', isActive: true,
  startsAt: new Date('2026-01-01T00:00:00Z'),
  endsAt: new Date('2027-01-01T00:00:00Z'),
  percentOff: 10, amountOff: null, maxDiscount: null,
  minOrderValue: 0, usageLimit: 10, perUserLimit: 1,
};

function fixture() {
  const tx = {
    voucher: {
      findUnique: vi.fn().mockResolvedValue(base),
      create: vi.fn().mockResolvedValue(base),
      update: vi.fn().mockResolvedValue(base),
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      findMany: vi.fn().mockResolvedValue([base]),
      count: vi.fn().mockResolvedValue(1),
    },
    voucherUsage: { count: vi.fn().mockResolvedValue(0) },
    promotion: {
      findUnique: vi.fn().mockResolvedValue({ id: 'promo-a', title: 'Ưu đãi', imageUrl: '/banner.jpg', linkUrl: '/products', isActive: true }),
      findMany: vi.fn().mockResolvedValue([]),
      create: vi.fn().mockImplementation(({ data }) => Promise.resolve({ id: 'promo-a', ...data })),
      update: vi.fn().mockImplementation(({ data }) => Promise.resolve({ id: 'promo-a', ...data })),
    },
    $queryRaw: vi.fn().mockResolvedValue([{ id: 'voucher-a' }]),
  };
  return { ...tx, $transaction: vi.fn(async (callback: (client: typeof tx) => unknown) => callback(tx)) };
}

async function voucherService() {
  const { AdminVouchersService } = await import('./admin-vouchers.service.js');
  const prisma = fixture();
  return { prisma, service: new AdminVouchersService(prisma as never) };
}

describe('Admin vouchers và promotions - PRJ-P2-BD1-3', () => {
  it('khách bị chặn cả hai route', async () => {
    const { AdminVouchersController } = await import('./admin-vouchers.controller.js');
    const { AdminVouchersService } = await import('./admin-vouchers.service.js');
    const { AdminPromotionsController } = await import('../promotions/admin-promotions.controller.js');
    const { AdminPromotionsService } = await import('../promotions/admin-promotions.service.js');
    const moduleRef = await Test.createTestingModule({
      controllers: [AdminVouchersController, AdminPromotionsController],
      providers: [
        RolesGuard,
        { provide: AdminVouchersService, useValue: { list: vi.fn() } },
        { provide: AdminPromotionsService, useValue: { list: vi.fn() } },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: (ctx: { switchToHttp: () => { getRequest: () => { user: { role: string } } } }) => {
        ctx.switchToHttp().getRequest().user = { role: 'CUSTOMER' };
        return true;
      } })
      .compile();
    const app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
    try {
      await request(app.getHttpServer()).get('/api/admin/vouchers').expect(403);
      await request(app.getHttpServer()).get('/api/admin/promotions').expect(403);
    } finally {
      await app.close();
    }
  });

  it('tạo voucher và báo trùng mã 409', async () => {
    const { prisma, service } = await voucherService();
    await expect(service.create(base)).resolves.toMatchObject({ code: 'DAYORA10' });
    prisma.voucher.create.mockRejectedValueOnce({ code: 'P2002' });
    await expect(service.create(base)).rejects.toMatchObject({ status: 409, message: 'Mã voucher đã tồn tại' });
  });

  it('không hạ giới hạn dưới lượt dùng kể cả khi có thay đổi đồng thời', async () => {
    const { prisma, service } = await voucherService();
    prisma.voucherUsage.count.mockResolvedValue(5);
    await expect(service.update('voucher-a', { usageLimit: 4 })).rejects.toMatchObject({ status: 400 });
    expect(prisma.voucher.update).not.toHaveBeenCalled();
    expect(prisma.voucher.updateMany).not.toHaveBeenCalled();
  });

  it('bật tắt voucher và lọc trạng thái', async () => {
    const { prisma, service } = await voucherService();
    await service.update('voucher-a', { isActive: false });
    expect(prisma.$transaction.mock.calls.length + prisma.voucher.update.mock.calls.length + prisma.voucher.updateMany.mock.calls.length).toBeGreaterThan(0);
    await service.list({ status: 'disabled', page: 1 });
    expect(prisma.voucher.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ isActive: false }),
      take: 20,
    }));
  });

  it('tạo, sửa và bật tắt khuyến mãi với link nội bộ', async () => {
    const { AdminPromotionsService } = await import('../promotions/admin-promotions.service.js');
    const prisma = fixture();
    const service = new AdminPromotionsService(prisma as never);
    await expect(service.create({ title: 'Ưu đãi', imageUrl: '/banner.jpg', linkUrl: '/products' })).resolves.toMatchObject({ linkUrl: '/products' });
    await expect(service.update('promo-a', { isActive: false })).resolves.toMatchObject({ isActive: false });
    for (const linkUrl of ['https://evil.example', '//evil.example']) {
      await expect(service.create({ title: 'Ưu đãi', imageUrl: '/banner.jpg', linkUrl })).rejects.toMatchObject({ status: 400 });
    }
  });
});
