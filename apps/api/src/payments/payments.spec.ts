import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { vnpSign } from './vnpay.js';

const secret = 'fake-test-secret';
const now = new Date('2026-11-20T03:00:00Z');
const initialOrder = () => ({
  id: 'order-a', code: 'ORDER-A', userId: 'user-a', total: 180_000,
  status: 'PENDING_PAYMENT', paymentStatus: 'UNPAID',
  reserveExpiresAt: new Date('2026-11-20T03:15:00Z'),
  items: [{ skuId: 'sku-a', quantity: 2 }],
});

function signed(overrides: Record<string, string> = {}) {
  const params = { vnp_TxnRef: 'ORDER-A', vnp_TransactionNo: 'TX-1', vnp_Amount: '18000000', vnp_ResponseCode: '00', vnp_TransactionStatus: '00', ...overrides };
  return { ...params, vnp_SecureHash: vnpSign(params, secret) };
}

function fixture() {
  const order = initialOrder();
  const sku = { id: 'sku-a', stock: 5, reserved: 2 };
  const apply = (target: Record<string, unknown>, data: Record<string, unknown>) => {
    for (const [key, value] of Object.entries(data)) {
      if (value && typeof value === 'object' && 'decrement' in value) {
        target[key] = Number(target[key]) - Number(value.decrement);
      } else if (value !== undefined) target[key] = value;
    }
  };
  const tx = {
    order: {
      findFirst: vi.fn().mockImplementation(async ({ where }: { where: { id?: string; userId?: string } }) => where.id === order.id && where.userId === order.userId ? order : null),
      findUnique: vi.fn().mockImplementation(async ({ where }: { where: { code?: string; id?: string } }) => where.code === order.code || where.id === order.id ? order : null),
      update: vi.fn().mockImplementation(async ({ data }: { data: Record<string, unknown> }) => { apply(order, data); return order; }),
      updateMany: vi.fn().mockImplementation(async ({ data }: { data: Record<string, unknown> }) => { apply(order, data); return { count: 1 }; }),
    },
    sku: {
      findMany: vi.fn().mockImplementation(async () => [sku]),
      findUnique: vi.fn().mockImplementation(async () => sku),
      update: vi.fn().mockImplementation(async ({ data }: { data: Record<string, unknown> }) => { apply(sku, data); return sku; }),
      updateMany: vi.fn().mockImplementation(async ({ data }: { data: Record<string, unknown> }) => { apply(sku, data); return { count: 1 }; }),
    },
    payment: { create: vi.fn().mockResolvedValue({ id: 'payment-a' }), update: vi.fn().mockResolvedValue({}), updateMany: vi.fn().mockResolvedValue({ count: 1 }), findFirst: vi.fn().mockResolvedValue({ id: 'payment-a' }), findUnique: vi.fn().mockResolvedValue({ id: 'payment-a' }) },
    orderStatusLog: { create: vi.fn().mockResolvedValue({}) },
    $queryRaw: vi.fn().mockImplementation(async (parts: TemplateStringsArray) => parts.join('?').includes('"Sku"') ? [sku] : [{ id: order.id }]),
    $executeRaw: vi.fn().mockResolvedValue(1),
  };
  const prisma = { ...tx, $transaction: vi.fn(async (fn: (client: typeof tx) => unknown) => fn(tx)) };
  return { order, sku, tx, prisma };
}

async function makeService() {
  const { PaymentsService } = await import('./payments.service.js');
  const data = fixture();
  return { ...data, service: new PaymentsService(data.prisma as never) };
}

describe('Payments VNPay — PRJ-P3-BD1-2', () => {
  beforeEach(() => {
    vi.useFakeTimers(); vi.setSystemTime(now);
    vi.stubEnv('VNP_TMN_CODE', 'TESTCODE'); vi.stubEnv('VNP_HASH_SECRET', secret);
    vi.stubEnv('VNP_URL', 'https://sandbox.example.test/pay'); vi.stubEnv('VNP_RETURN_URL', 'https://example.test/return');
  });
  afterEach(() => { vi.useRealTimers(); vi.unstubAllEnvs(); vi.restoreAllMocks(); });

  it('tạo URL cho chủ đơn, không cho người khác hoặc đơn hết hạn', async () => {
    const { service, order, tx } = await makeService();
    const result = await service.create('user-a', order.id, '127.0.0.1');
    const url = new URL(result.paymentUrl);
    expect(url.origin + url.pathname).toBe('https://sandbox.example.test/pay');
    expect(url.searchParams.get('vnp_Amount')).toBe('18000000');
    expect(url.searchParams.get('vnp_TxnRef')).toBe(order.code);
    expect(url.searchParams.get('vnp_SecureHash')).toMatch(/^[a-f0-9]{128}$/i);
    expect(tx.payment.create).toHaveBeenCalledOnce();
    await expect(service.create('other-user', order.id, '127.0.0.1')).rejects.toMatchObject({ status: 404 });
    order.reserveExpiresAt = new Date(now);
    await expect(service.create('user-a', order.id, '127.0.0.1')).rejects.toMatchObject({ status: 409 });
  });

  it('sai chữ ký trả 97 không truy cập DB', async () => {
    const { service, prisma } = await makeService();
    await expect(service.ipn({ ...signed(), vnp_SecureHash: '0'.repeat(128) })).resolves.toMatchObject({ RspCode: '97' });
    expect(prisma.$transaction).not.toHaveBeenCalled();
    expect(prisma.order.findUnique).not.toHaveBeenCalled();
  });

  it('thành công xác nhận và trừ tồn một lần, IPN lặp trả 02', async () => {
    const { service, order, sku } = await makeService();
    await expect(service.ipn(signed())).resolves.toMatchObject({ RspCode: '00' });
    expect(order).toMatchObject({ status: 'CONFIRMED', paymentStatus: 'PAID' });
    expect(sku).toMatchObject({ stock: 3, reserved: 0 });
    await expect(service.ipn(signed())).resolves.toMatchObject({ RspCode: '02' });
    expect(sku).toMatchObject({ stock: 3, reserved: 0 });
  });

  it('sai tiền trả 04 không cập nhật', async () => {
    const { service, order, sku, tx } = await makeService();
    await expect(service.ipn(signed({ vnp_Amount: '1' }))).resolves.toMatchObject({ RspCode: '04' });
    expect(order.paymentStatus).toBe('UNPAID'); expect(sku.stock).toBe(5);
    expect(tx.order.update).not.toHaveBeenCalled(); expect(tx.order.updateMany).not.toHaveBeenCalled();
  });

  it('không có đơn trả 01', async () => {
    const { service, tx } = await makeService();
    tx.order.findUnique.mockResolvedValueOnce(null);
    await expect(service.ipn(signed())).resolves.toMatchObject({ RspCode: '01' });
  });

  it('IPN muộn còn tồn khả dụng xác nhận đơn', async () => {
    const { service, order, sku } = await makeService();
    order.status = 'CANCELLED'; sku.reserved = 0;
    await expect(service.ipn(signed())).resolves.toMatchObject({ RspCode: '00' });
    expect(order).toMatchObject({ status: 'CONFIRMED', paymentStatus: 'PAID' });
    expect(sku.stock).toBe(3);
  });

  it('IPN muộn hết tồn giữ PAID và log hoàn tiền thủ công', async () => {
    const { service, order, sku, tx } = await makeService();
    order.status = 'CANCELLED'; sku.stock = 1; sku.reserved = 0;
    await expect(service.ipn(signed())).resolves.toMatchObject({ RspCode: '00' });
    expect(order).toMatchObject({ status: 'CANCELLED', paymentStatus: 'PAID' });
    expect(sku.stock).toBe(1);
    expect(tx.orderStatusLog.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ note: 'Thanh toán muộn, hết tồn: cần hoàn tiền thủ công' }) }));
  });

  it('thiếu cấu hình trả 503 và return không cập nhật', async () => {
    const { service, prisma, tx } = await makeService();
    vi.stubEnv('VNP_TMN_CODE', '');
    await expect(service.create('user-a', 'order-a', '127.0.0.1')).rejects.toMatchObject({ status: 503 });
    vi.stubEnv('VNP_TMN_CODE', 'TESTCODE');
    await expect(service.returnUrl(signed())).resolves.toMatchObject({ valid: true, orderId: 'order-a', orderCode: 'ORDER-A', success: true });
    expect(tx.order.update).not.toHaveBeenCalled(); expect(tx.order.updateMany).not.toHaveBeenCalled();
    expect(tx.payment.update).not.toHaveBeenCalled(); expect(tx.payment.updateMany).not.toHaveBeenCalled();
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });
});
