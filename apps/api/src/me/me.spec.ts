import 'reflect-metadata';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';
import type { PrismaService } from '../prisma/prisma.service.js';
import { hashPassword, verifyPassword } from '../auth/password.js';

function fakeDatabase() {
  return {
    user: { findUnique: vi.fn(), update: vi.fn(), updateMany: vi.fn() },
    product: { findFirst: vi.fn() },
    viewedProduct: { upsert: vi.fn(), findMany: vi.fn() },
  };
}

describe('Me', () => {
  it('yêu cầu đăng nhập, khách không được vào admin', async () => {
    const { Test } = await import('@nestjs/testing');
    const { AuthService } = await import('../auth/auth.service.js');
    const { AdminUsersModule } = await import('../admin-users/admin-users.module.js');
    const { PrismaService: Prisma } = await import('../prisma/prisma.service.js');
    const { MeModule } = await import('./me.module.js');
    const auth = {
      verifyToken: vi.fn().mockReturnValue('khach-1'),
      getUser: vi.fn().mockResolvedValue({ id: 'khach-1', role: 'CUSTOMER', isActive: true }),
    };
    const testingModule = await Test.createTestingModule({ imports: [MeModule, AdminUsersModule] })
      .overrideProvider(Prisma).useValue(fakeDatabase())
      .overrideProvider(AuthService).useValue(auth)
      .compile();
    const app = testingModule.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
    const { default: request } = await import('supertest');
    try {
      await request(app.getHttpServer()).get('/api/me/profile').expect(401);
      await request(app.getHttpServer()).get('/api/admin/users')
        .set('Cookie', 'access_token=token-test').expect(403);
    } finally {
      await app.close();
    }
  });

  it('xem và sửa hồ sơ, không chọn passwordHash', async () => {
    const { MeService } = await import('./me.service.js');
    const db = fakeDatabase();
    const service = new MeService(db as unknown as PrismaService);
    const user = { id: 'u1', email: 'u@example.com', fullName: 'Hoàn', phone: '0123456789', createdAt: new Date() };
    db.user.findUnique.mockResolvedValueOnce(user).mockResolvedValueOnce(null);
    db.user.update.mockResolvedValue(user);
    await expect(service.profile('u1')).resolves.toEqual(user);
    expect(db.user.findUnique).toHaveBeenCalledWith({ where: { id: 'u1' }, select: { id: true, email: true, fullName: true, phone: true, createdAt: true } });
    await expect(service.profile('missing')).rejects.toBeInstanceOf(NotFoundException);
    await expect(service.updateProfile('u1', { fullName: 'Hoàn', phone: '0123456789' })).resolves.toEqual(user);
    expect(db.user.update).toHaveBeenCalledWith({ where: { id: 'u1' }, data: { fullName: 'Hoàn', phone: '0123456789' }, select: { id: true, email: true, fullName: true, phone: true, createdAt: true } });
  });

  it('đổi mật khẩu kiểm mật khẩu cũ và lưu hash', async () => {
    const { MeService } = await import('./me.service.js');
    const db = fakeDatabase();
    const service = new MeService(db as unknown as PrismaService);
    const oldHash = await hashPassword('mat-khau-cu');
    db.user.findUnique.mockResolvedValue({ passwordHash: oldHash });
    await expect(service.password('u1', { currentPassword: 'sai', newPassword: 'mat-khau-moi' })).rejects.toBeInstanceOf(BadRequestException);
    expect(db.user.updateMany).not.toHaveBeenCalled();
    db.user.updateMany.mockResolvedValue({ count: 1 });
    await expect(service.password('u1', { currentPassword: 'mat-khau-cu', newPassword: 'mat-khau-moi' })).resolves.toEqual({ message: 'Đã đổi mật khẩu' });
    const args = db.user.updateMany.mock.calls[0][0];
    expect(args.where).toEqual({ id: 'u1', passwordHash: oldHash });
    expect(args.data.passwordHash).not.toBe('mat-khau-moi');
    expect(await verifyPassword('mat-khau-moi', args.data.passwordHash)).toBe(true);
  });

  it('không ghi đè khi mật khẩu đã thay đổi đồng thời', async () => {
    const { MeService } = await import('./me.service.js');
    const db = fakeDatabase();
    const service = new MeService(db as unknown as PrismaService);
    db.user.findUnique.mockResolvedValue({ passwordHash: await hashPassword('mat-khau-cu') });
    db.user.updateMany.mockResolvedValue({ count: 0 });
    await expect(service.password('u1', { currentPassword: 'mat-khau-cu', newPassword: 'mat-khau-moi' })).rejects.toThrow('Mật khẩu hiện tại đã thay đổi');
  });

  it('upsert lượt xem, bỏ qua sản phẩm ẩn hoặc không tồn tại', async () => {
    const { MeService } = await import('./me.service.js');
    const db = fakeDatabase();
    const service = new MeService(db as unknown as PrismaService);
    db.product.findFirst.mockResolvedValueOnce(null).mockResolvedValueOnce({ id: 'p1' });
    await expect(service.recordViewed('u1', 'hidden')).resolves.toEqual({ recorded: false });
    expect(db.viewedProduct.upsert).not.toHaveBeenCalled();
    await expect(service.recordViewed('u1', 'p1')).resolves.toEqual({ recorded: true });
    expect(db.product.findFirst).toHaveBeenLastCalledWith({ where: { id: 'p1', status: 'ACTIVE', skus: { some: { status: 'ACTIVE' } } }, select: { id: true } });
    expect(db.viewedProduct.upsert).toHaveBeenCalledWith({ where: { userId_productId: { userId: 'u1', productId: 'p1' } }, create: { userId: 'u1', productId: 'p1' }, update: { viewedAt: expect.any(Date) } });
  });

  it('lấy tối đa 12 lượt xem hiển thị mới nhất dạng thẻ', async () => {
    const { MeService } = await import('./me.service.js');
    const db = fakeDatabase();
    const service = new MeService(db as unknown as PrismaService);
    db.viewedProduct.findMany.mockResolvedValue([{
      productId: 'p1', viewedAt: new Date('2026-11-15T00:00:00Z'),
      product: { id: 'p1', name: 'Lều', skus: [{ id: 's1', price: 100, salePrice: 0, stock: 5, reserved: 2 }] },
    }]);
    const result = await service.viewed('u1');
    expect(result).toEqual(expect.arrayContaining([expect.objectContaining({
      id: 'p1', minPrice: 0, skus: expect.arrayContaining([expect.objectContaining({
        id: 's1', effectivePrice: 0, availableStock: 3,
      })]),
    })]));
    expect(result[0].skus[0]).not.toHaveProperty('stock');
    expect(result[0].skus[0]).not.toHaveProperty('reserved');
    expect(db.viewedProduct.findMany).toHaveBeenCalledWith(expect.objectContaining({ where: expect.objectContaining({ userId: 'u1', product: { status: 'ACTIVE', skus: { some: { status: 'ACTIVE' } } } }), orderBy: [{ viewedAt: 'desc' }, { productId: 'asc' }], take: 12 }));
  });
});
