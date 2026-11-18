import 'reflect-metadata';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { JwtAuthGuard, RolesGuard } from '../auth/auth.guard.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { AdminPromotionsController } from './admin-promotions.controller.js';
import { AdminPromotionsService } from './admin-promotions.service.js';

describe('hợp đồng API quản trị khuyến mãi', () => {
  let app: INestApplication;
  const existing = { id: 'p1', title: 'Ưu đãi', subtitle: 'Nội dung', imageUrl: null, linkUrl: '/products', startsAt: new Date('2026-01-01'), endsAt: new Date('2027-01-01') };
  const prisma = { promotion: {
    findMany: vi.fn().mockResolvedValue([existing]),
    findUnique: vi.fn().mockResolvedValue(existing),
    create: vi.fn().mockImplementation(({ data }) => Promise.resolve({ id: 'p2', subtitle: null, imageUrl: null, linkUrl: null, ...Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined)) })),
    update: vi.fn().mockImplementation(({ data }) => Promise.resolve({ ...existing, ...Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined)) })),
  } };
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AdminPromotionsController],
      providers: [AdminPromotionsService, RolesGuard, { provide: PrismaService, useValue: prisma }],
    }).overrideGuard(JwtAuthGuard).useValue({ canActivate: (ctx: { switchToHttp: () => { getRequest: () => { user: { role: string } } } }) => {
      ctx.switchToHttp().getRequest().user = { role: 'ADMIN' };
      return true;
    } }).compile();
    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });
  afterAll(async () => { await app.close(); });

  it('tạo không ảnh với subtitle và link, danh sách trả link và linkUrl', async () => {
    const response = await request(app.getHttpServer()).post('/api/admin/promotions').send({
      title: ' Mùa hè ', subtitle: 'Ưu đãi mới', link: '/products', startsAt: '2026-01-01T00:00:00Z', endsAt: '2027-01-01T00:00:00Z',
    }).expect(201);
    expect(response.body).toMatchObject({ title: 'Mùa hè', subtitle: 'Ưu đãi mới', imageUrl: null, link: '/products', linkUrl: '/products' });
    expect(prisma.promotion.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ linkUrl: '/products', subtitle: 'Ưu đãi mới' }) }));
    const list = await request(app.getHttpServer()).get('/api/admin/promotions').expect(200);
    expect(list.body).toEqual([expect.objectContaining({ subtitle: 'Nội dung', imageUrl: null, link: '/products', linkUrl: '/products' })]);
  });

  it('giữ tương thích imageUrl và linkUrl khi tạo và sửa', async () => {
    await request(app.getHttpServer()).post('/api/admin/promotions').send({ title: 'Banner', imageUrl: '/banner.jpg', linkUrl: '/old' }).expect(201).expect(({ body }) => {
      expect(body).toMatchObject({ imageUrl: '/banner.jpg', link: '/old', linkUrl: '/old' });
    });
    await request(app.getHttpServer()).patch('/api/admin/promotions/p1').send({ link: '/new', subtitle: 'Đã sửa' }).expect(200).expect(({ body }) => {
      expect(body).toMatchObject({ link: '/new', linkUrl: '/new', subtitle: 'Đã sửa' });
    });
    await request(app.getHttpServer()).patch('/api/admin/promotions/p1').send({ linkUrl: '/legacy', imageUrl: '/new.jpg' }).expect(200).expect(({ body }) => {
      expect(body).toMatchObject({ link: '/legacy', linkUrl: '/legacy', imageUrl: '/new.jpg' });
    });
  });

  it('từ chối link ngoài, dấu gạch ngược, khoảng trắng và hai link mâu thuẫn', async () => {
    for (const link of ['//example.com', '/\\example.com', 'https://example.com', '/hello world', '/bad\npath']) {
      await request(app.getHttpServer()).post('/api/admin/promotions').send({ title: 'Test', link }).expect(400);
      await request(app.getHttpServer()).post('/api/admin/promotions').send({ title: 'Test', linkUrl: link }).expect(400);
    }
    await request(app.getHttpServer()).post('/api/admin/promotions').send({ title: 'Test', link: '/one', linkUrl: '/two' }).expect(400);
  });
});
