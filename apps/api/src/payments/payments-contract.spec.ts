import 'reflect-metadata';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { JwtAuthGuard } from '../auth/auth.guard.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { PaymentsController } from './payments.controller.js';
import { PaymentsService } from './payments.service.js';
import { vnpSign } from './vnpay.js';

describe('VNPay HTTP routes', () => {
  let app: INestApplication;
  const prisma = { order: { findUnique: vi.fn().mockResolvedValue({ id: 'order-a', code: 'ORDER-A', total: 100 }) } };
  const secret = 'test-secret';
  beforeAll(async () => {
    vi.stubEnv('VNP_HASH_SECRET', secret);
    const module = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [PaymentsService, { provide: PrismaService, useValue: prisma }],
    }).overrideGuard(JwtAuthGuard).useValue({ canActivate: () => false }).compile();
    app = module.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });
  afterAll(async () => { await app.close(); vi.unstubAllEnvs(); });

  it('return validates signature and does not change the order', async () => {
    const params = { vnp_TxnRef: 'ORDER-A', vnp_Amount: '10000', vnp_ResponseCode: '00', vnp_TransactionStatus: '00' };
    const result = await request(app.getHttpServer()).get('/api/payments/vnpay/return')
      .query({ ...params, vnp_SecureHash: vnpSign(params, secret) }).expect(200);
    expect(result.body).toMatchObject({ valid: true, success: true, orderId: 'order-a' });
    expect(prisma.order.findUnique).toHaveBeenCalledWith({ where: { code: 'ORDER-A' }, select: { id: true, code: true, total: true } });
    await request(app.getHttpServer()).get('/api/payments/vnpay/return')
      .query({ ...params, vnp_SecureHash: '0'.repeat(128) }).expect(200).expect(({ body }) => {
        expect(body).toMatchObject({ valid: false, success: false });
      });
  });

  it('requires authentication to create a payment URL', async () => {
    await request(app.getHttpServer()).post('/api/payments/vnpay/order-a').expect(403);
  });
});
