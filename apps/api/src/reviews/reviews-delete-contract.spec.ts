import 'reflect-metadata';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { Test } from '@nestjs/testing';
import type { ExecutionContext, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { JwtAuthGuard, RolesGuard } from '../auth/auth.guard.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ReviewsController } from './reviews.controller.js';
import { ReviewsService } from './reviews.service.js';

describe('Xóa đánh giá của admin', () => {
  let app: INestApplication;
  const prisma = { review: { deleteMany: vi.fn() } };
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [ReviewsService, RolesGuard, { provide: PrismaService, useValue: prisma }],
    }).overrideGuard(JwtAuthGuard).useValue({ canActivate: (ctx: ExecutionContext) => {
      const req = ctx.switchToHttp().getRequest<{ headers: Record<string, string>; user: { id: string; role: string } }>();
      req.user = { id: 'user-1', role: req.headers['x-test-role'] ?? 'CUSTOMER' };
      return true;
    } }).compile();
    app = module.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });
  afterAll(async () => { await app.close(); });

  it('khách bị chặn, admin xóa hẳn, đánh giá không tồn tại trả 404', async () => {
    await request(app.getHttpServer()).delete('/api/admin/reviews/r1').expect(403);
    expect(prisma.review.deleteMany).not.toHaveBeenCalled();
    prisma.review.deleteMany.mockResolvedValueOnce({ count: 1 });
    await request(app.getHttpServer()).delete('/api/admin/reviews/r1').set('x-test-role', 'ADMIN').expect(200).expect({ deleted: true });
    expect(prisma.review.deleteMany).toHaveBeenCalledWith({ where: { id: 'r1' } });
    prisma.review.deleteMany.mockResolvedValueOnce({ count: 0 });
    await request(app.getHttpServer()).delete('/api/admin/reviews/missing').set('x-test-role', 'ADMIN').expect(404);
  });
});
