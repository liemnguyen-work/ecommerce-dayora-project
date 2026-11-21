import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { JwtAuthGuard, RolesGuard } from '../auth/auth.guard.js';

describe('HTTP đánh giá sau mua', () => {
  it('rating ngoài khoảng trả 400 và khách gọi admin trả 403', async () => {
    const { ReviewsController } = await import('./reviews.controller.js');
    const { ReviewsService } = await import('./reviews.service.js');
    const service = { create: vi.fn().mockResolvedValue({ id: 'review-1' }), list: vi.fn(), reviewable: vi.fn() };
    const module = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [{ provide: ReviewsService, useValue: service }, RolesGuard],
    }).overrideGuard(JwtAuthGuard).useValue({ canActivate: (ctx: { switchToHttp: () => { getRequest: () => { user: { id: string; role: string } } } }) => {
      ctx.switchToHttp().getRequest().user = { id: 'user-1', role: 'CUSTOMER' };
      return true;
    } }).compile();
    const app = module.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));
    await app.init();
    try {
      for (const rating of [0, 6]) {
        await request(app.getHttpServer()).post('/api/reviews').send({ orderId: 'order-1', productId: 'product-1', rating }).expect(400);
      }
      expect(service.create).not.toHaveBeenCalled();
      await request(app.getHttpServer()).get('/api/admin/reviews').expect(403);
    } finally {
      await app.close();
    }
  });
});
