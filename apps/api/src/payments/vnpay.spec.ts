import { describe, expect, it } from 'vitest';

describe('VNPay query, chữ ký và thời gian', () => {
  it('mã hóa sắp xếp và ký đúng vector cố định', async () => {
    const { vnpQuery, vnpSign, vnpVerify } = await import('./vnpay.js');
    const params = {
      vnp_TxnRef: 'ABC', vnp_OrderInfo: 'Thanh toan', vnp_Amount: '10000',
      vnp_SecureHash: 'ignored', vnp_SecureHashType: 'SHA512', other: 'ignored',
    };
    const query = 'vnp_Amount=10000&vnp_OrderInfo=Thanh+toan&vnp_TxnRef=ABC';
    const signature = '1e3f52ee5db2f41f0b87665d8c79d89125bca225bad10e73aae88a00efd4fa6330d66fe0dca6e01998524cff4b27baf88f0f961d8a25966a4b6e3867b330764c';
    expect(vnpQuery(params)).toBe(query);
    expect(vnpSign(params, 'test-secret')).toBe(signature);
    expect(vnpVerify({ ...params, vnp_SecureHash: signature }, 'test-secret')).toBe(true);
    expect(vnpVerify({ ...params, vnp_SecureHash: signature.toUpperCase() }, 'test-secret')).toBe(true);
    expect(vnpVerify({ ...params, vnp_Amount: '10001', vnp_SecureHash: signature }, 'test-secret')).toBe(false);
    expect(vnpVerify({ ...params, vnp_SecureHash: signature }, 'wrong-secret')).toBe(false);
  });

  it('từ chối chữ ký sai định dạng và tham số VNPay không phải chuỗi', async () => {
    const { vnpVerify } = await import('./vnpay.js');
    const signature = '1e3f52ee5db2f41f0b87665d8c79d89125bca225bad10e73aae88a00efd4fa6330d66fe0dca6e01998524cff4b27baf88f0f961d8a25966a4b6e3867b330764c';
    const valid = { vnp_Amount: '10000', vnp_OrderInfo: 'Thanh toan', vnp_TxnRef: 'ABC' };
    for (const hash of [undefined, '', 'abc', 'z'.repeat(128), '0'.repeat(127), '0'.repeat(129), 123]) {
      expect(vnpVerify({ ...valid, vnp_SecureHash: hash }, 'test-secret')).toBe(false);
    }
    for (const value of [10000, null, ['10000'], { value: '10000' }]) {
      expect(vnpVerify({ ...valid, vnp_Amount: value, vnp_SecureHash: signature }, 'test-secret')).toBe(false);
    }
  });

  it('dùng giờ Việt Nam độc lập múi giờ máy chủ', async () => {
    const { vnpDate } = await import('./vnpay.js');
    expect(vnpDate(new Date('2026-01-01T18:30:00Z'))).toBe('20260102013000');
    expect(vnpDate(new Date('2026-12-31T17:00:00Z'))).toBe('20270101000000');
    expect(vnpDate(new Date('2026-01-01T00:00:09Z'))).toBe('20260101070009');
  });
});
