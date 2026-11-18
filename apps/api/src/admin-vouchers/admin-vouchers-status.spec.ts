import { afterEach, describe, expect, it, vi } from 'vitest';
import { AdminVouchersService } from './admin-vouchers.service.js';

describe('lọc trạng thái voucher', () => {
  afterEach(() => vi.useRealTimers());

  it.each([
    ['disabled', { isActive: false }],
    ['expired', { isActive: true, endsAt: { lte: new Date('2026-11-18T00:00:00Z') } }],
    ['scheduled', { isActive: true, startsAt: { gt: new Date('2026-11-18T00:00:00Z') }, endsAt: { gt: new Date('2026-11-18T00:00:00Z') } }],
    ['active', { isActive: true, startsAt: { lte: new Date('2026-11-18T00:00:00Z') }, endsAt: { gt: new Date('2026-11-18T00:00:00Z') } }],
  ] as const)('gửi bộ lọc %s', async (status, where) => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-11-18T00:00:00Z'));
    const findMany = vi.fn().mockResolvedValue([]);
    const count = vi.fn().mockResolvedValue(0);
    const service = new AdminVouchersService({ voucher: { findMany, count } } as never);
    await service.list({ status, page: 1 });
    expect(findMany).toHaveBeenCalledWith(expect.objectContaining({ where, take: 20, skip: 0 }));
    expect(count).toHaveBeenCalledWith({ where });
  });

  it('tính trạng thái đúng tại biên thời gian', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-11-18T00:00:00Z'));
    const now = new Date();
    const earlier = new Date(now.getTime() - 1);
    const later = new Date(now.getTime() + 1);
    const findMany = vi.fn().mockResolvedValue([
      { isActive: false, startsAt: earlier, endsAt: later },
      { isActive: true, startsAt: earlier, endsAt: now },
      { isActive: true, startsAt: later, endsAt: later },
      { isActive: true, startsAt: now, endsAt: later },
    ]);
    const service = new AdminVouchersService({ voucher: { findMany, count: vi.fn().mockResolvedValue(4) } } as never);
    const result = await service.list({});
    expect(result.items.map((item) => item.status)).toEqual(['disabled', 'expired', 'scheduled', 'active']);
  });
});
