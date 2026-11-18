import 'reflect-metadata';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { JwtAuthGuard, RolesGuard } from '../auth/auth.guard.js';
import { AdminPromotionsController } from './admin-promotions.controller.js';
import { AdminPromotionsService } from './admin-promotions.service.js';

describe('PATCH /api/admin/promotions/:id/active', () => {
  let app: INestApplication;
  let role = 'ADMIN';
  const update = vi.fn().mockImplementation((id: string, dto: { isActive: boolean }) => ({ id, ...dto }));

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AdminPromotionsController],
      providers: [RolesGuard, { provide: AdminPromotionsService, useValue: { update } }],
    }).overrideGuard(JwtAuthGuard).useValue({ canActivate: (ctx: { switchToHttp: () => { getRequest: () => { user: { role: string } } } }) => {
      ctx.switchToHttp().getRequest().user = { role };
      return true;
    } }).compile();
    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });
  beforeEach(() => { role = 'ADMIN'; update.mockClear(); });
  afterAll(async () => { await app.close(); });

  it('cho phép ADMIN bật và tắt qua service cập nhật', async () => {
    for (const isActive of [true, false]) {
      await request(app.getHttpServer()).patch('/api/admin/promotions/p1/active').send({ isActive }).expect(200).expect(({ body }) => {
        expect(body).toEqual({ id: 'p1', isActive });
      });
      expect(update).toHaveBeenLastCalledWith('p1', expect.objectContaining({ isActive }));
    }
  });

  it('từ chối CUSTOMER và không cập nhật', async () => {
    role = 'CUSTOMER';
    await request(app.getHttpServer()).patch('/api/admin/promotions/p1/active').send({ isActive: false }).expect(403);
    expect(update).not.toHaveBeenCalled();
  });

  it('từ chối body thiếu, sai kiểu hoặc có trường lạ', async () => {
    for (const body of [{}, { isActive: null }, { isActive: 'false' }, { isActive: 0 }, { isActive: true, title: 'Khác' }]) {
      await request(app.getHttpServer()).patch('/api/admin/promotions/p1/active').send(body).expect(400);
    }
    expect(update).not.toHaveBeenCalled();
  });

  it('giữ route cập nhật cũ', async () => {
    await request(app.getHttpServer()).patch('/api/admin/promotions/p1').send({ isActive: true }).expect(200);
    expect(update).toHaveBeenCalledWith('p1', expect.objectContaining({ isActive: true }));
  });
});
