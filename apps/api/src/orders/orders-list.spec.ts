import 'reflect-metadata';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AuthService } from '../auth/auth.service.js';
import { JwtAuthGuard } from '../auth/auth.guard.js';
import { CartService } from '../cart/cart.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CheckoutService } from './checkout.service.js';
import { OrdersController } from './orders.controller.js';
import { OrdersService } from './orders.service.js';

describe('GET /api/orders', () => {
  let app: INestApplication;
  const rows = [
    { id: 'order-a', code: 'A', userId: 'user-a', createdAt: new Date('2026-01-02T00:00:00Z'), status: 'CONFIRMED', paymentStatus: 'PAID', total: 100, recipientPhone: 'private' },
    { id: 'order-b', code: 'B', userId: 'user-b', createdAt: new Date('2026-01-01T00:00:00Z'), status: 'CANCELLED', paymentStatus: 'UNPAID', total: 200, recipientPhone: 'private' },
  ];
  const findMany = vi.fn(async (query: { where: { userId: string }; select: Record<string, boolean> }) => rows
    .filter((row) => row.userId === query.where.userId)
    .map((row) => Object.fromEntries(Object.entries(row).filter(([key]) => query.select[key]))));
  const auth = {
    verifyToken: vi.fn((token: string) => token),
    getUser: vi.fn(async (id: string) => ({ id, role: 'CUSTOMER', isActive: true })),
  };
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService, JwtAuthGuard, { provide: AuthService, useValue: auth },
        { provide: PrismaService, useValue: { order: { findMany } } },
        { provide: CartService, useValue: {} }, { provide: CheckoutService, useValue: {} }],
    }).compile();
    app = module.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  }, 20000);
  beforeEach(() => { findMany.mockClear(); });
  afterAll(async () => { await app.close(); });

  it('requires authentication without querying orders', async () => {
    await request(app.getHttpServer()).get('/api/orders').expect(401);
    expect(findMany).not.toHaveBeenCalled();
  });

  it('returns only the authenticated user orders and the requested fields', async () => {
    const response = await request(app.getHttpServer()).get('/api/orders')
      .set('Cookie', 'access_token=user-a').expect(200);
    expect(response.body).toEqual([{ id: 'order-a', code: 'A', createdAt: '2026-01-02T00:00:00.000Z', status: 'CONFIRMED', paymentStatus: 'PAID', total: 100 }]);
    expect(findMany).toHaveBeenCalledWith({
      where: { userId: 'user-a' },
      select: { id: true, code: true, createdAt: true, status: true, paymentStatus: true, total: true },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    });
    const empty = await request(app.getHttpServer()).get('/api/orders')
      .set('Cookie', 'access_token=user-empty').expect(200);
    expect(empty.body).toEqual([]);
  });
});
