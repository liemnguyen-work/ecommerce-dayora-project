import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { JwtAuthGuard } from '../auth/auth.guard.js';
import { CheckoutService } from './checkout.service.js';
import { OrdersController } from './orders.controller.js';
import { OrdersService } from './orders.service.js';

describe('POST /api/orders validates body', () => {
  let app: INestApplication;
  const create = vi.fn().mockResolvedValue({ id: 'order-1' });
  const valid = {
    recipient: { name: 'Hoàn', phone: '0901234567', address: '123 Đường A', province: 'Hồ Chí Minh', district: 'Quận 1', isInnerHcm: true },
    expected: [{ skuId: 'sku-1', unitPrice: 100000 }],
    expectedTotal: 100000,
    voucherCode: 'DAYORA10',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        { provide: CheckoutService, useValue: { create } },
        { provide: OrdersService, useValue: { preview: vi.fn() } },
      ],
    }).overrideGuard(JwtAuthGuard).useValue({ canActivate: (ctx: { switchToHttp: () => { getRequest: () => { user: { id: string } } } }) => {
      ctx.switchToHttp().getRequest().user = { id: 'user-1' };
      return true;
    } }).compile();
    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));
    await app.init();
  });
  beforeEach(() => create.mockClear());
  afterAll(async () => { await app.close(); });

  it('rejects missing required fields and expected array', async () => {
    await request(app.getHttpServer()).post('/api/orders').send({}).expect(400);
    const withoutExpected = { recipient: valid.recipient, expectedTotal: valid.expectedTotal, voucherCode: valid.voucherCode };
    await request(app.getHttpServer()).post('/api/orders').send(withoutExpected).expect(400);
    expect(create).not.toHaveBeenCalled();
  });

  it('rejects invalid phone and unknown fields at every level', async () => {
    for (const body of [
      { ...valid, recipient: { ...valid.recipient, phone: 123 } },
      { ...valid, recipient: { ...valid.recipient, phone: '123' } },
      { ...valid, unexpected: true },
      { ...valid, recipient: { ...valid.recipient, unexpected: true } },
      { ...valid, expected: [{ ...valid.expected[0], unexpected: true }] },
    ]) await request(app.getHttpServer()).post('/api/orders').send(body).expect(400);
    expect(create).not.toHaveBeenCalled();
  });

  it('rejects invalid quantities, lengths and nested values', async () => {
    for (const body of [
      { ...valid, expected: [] },
      { ...valid, expected: Array.from({ length: 51 }, () => valid.expected[0]) },
      { ...valid, expected: [{ skuId: 'sku-1', unitPrice: -1 }] },
      { ...valid, expectedTotal: '100000' },
      { ...valid, recipient: { ...valid.recipient, name: '' } },
      { ...valid, recipient: { ...valid.recipient, address: 'x'.repeat(301) } },
      { ...valid, voucherCode: 'x'.repeat(31) },
    ]) await request(app.getHttpServer()).post('/api/orders').send(body).expect(400);
    expect(create).not.toHaveBeenCalled();
  });

  it('accepts checkout body and forwards authenticated user', async () => {
    await request(app.getHttpServer()).post('/api/orders').send(valid).expect(201).expect({ id: 'order-1' });
    expect(create).toHaveBeenCalledOnce();
    expect(create).toHaveBeenCalledWith('user-1', expect.objectContaining({ ...valid }));
  });
});
