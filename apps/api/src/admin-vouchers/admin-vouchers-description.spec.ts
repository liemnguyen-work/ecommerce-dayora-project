import { describe, expect, it, vi } from 'vitest';
import { AdminVouchersService } from './admin-vouchers.service.js';

describe('Voucher description', () => {
  it('từ chối mô tả rỗng và lưu mô tả hợp lệ', async () => {
    const create = vi.fn().mockResolvedValue({ id: 'v1' });
    const service = new AdminVouchersService({ voucher: { create } } as never);
    const input = {
      code: 'DAYORA10', startsAt: new Date('2026-01-01'), endsAt: new Date('2027-01-01'),
      percentOff: 10,
    };
    await expect(service.create({ ...input, description: '  ' })).rejects.toMatchObject({ status: 400 });
    expect(create).not.toHaveBeenCalled();
    await service.create({ ...input, description: ' Giảm 10% ' });
    expect(create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ description: 'Giảm 10%' }),
    }));
  });
});
