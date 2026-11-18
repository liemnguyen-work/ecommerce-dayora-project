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
      { isActive: false, startsAt: earlier, endsAt: later, _count: { usages: 0 } },
      { isActive: true, startsAt: earlier, endsAt: now, _count: { usages: 0 } },
      { isActive: true, startsAt: later, endsAt: later, _count: { usages: 0 } },
      { isActive: true, startsAt: now, endsAt: later, _count: { usages: 0 } },
    ]);
    const service = new AdminVouchersService({ voucher: { findMany, count: vi.fn().mockResolvedValue(4) } } as never);
    const result = await service.list({});
    expect(result.items.map((item) => item.status)).toEqual(['disabled', 'expired', 'scheduled', 'active']);
  });
  it('trả số lượt sử dụng và không lộ _count, giữ phân trang và bộ lọc', async () => {
    const startsAt = new Date('2026-01-01T00:00:00Z');
    const endsAt = new Date('2027-01-01T00:00:00Z');
    const findMany = vi.fn().mockResolvedValue([
      { id: 'used', code: 'USED', isActive: false, startsAt, endsAt, _count: { usages: 2 } },
      { id: 'unused', code: 'UNUSED', isActive: false, startsAt, endsAt, _count: { usages: 0 } },
    ]);
    const count = vi.fn().mockResolvedValue(22);
    const service = new AdminVouchersService({ voucher: { findMany, count } } as never);
    const result = await service.list({ status: 'disabled', page: 2 });
    expect(findMany).toHaveBeenCalledWith({
      where: { isActive: false }, orderBy: [{ code: 'asc' }, { id: 'asc' }],
      skip: 20, take: 20, include: { _count: { select: { usages: true } } },
    });
    expect(count).toHaveBeenCalledWith({ where: { isActive: false } });
    expect(result).toMatchObject({ total: 22, page: 2, items: [
      { id: 'used', usedCount: 2, status: 'disabled' },
      { id: 'unused', usedCount: 0, status: 'disabled' },
    ] });
    expect(result.items.every((item) => !('_count' in item))).toBe(true);
  });
});
