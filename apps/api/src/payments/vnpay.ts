import { createHmac, timingSafeEqual } from 'node:crypto';

export type VnpParams = Record<string, string>;

export function vnpQuery(params: VnpParams): string {
  const encode = (value: string) => encodeURIComponent(value).replace(/%20/g, '+');
  return Object.keys(params)
    .filter((key) => key.startsWith('vnp_') && key !== 'vnp_SecureHash' && key !== 'vnp_SecureHashType')
    .sort()
    .map((key) => `${encode(key)}=${encode(params[key])}`)
    .join('&');
}

export function vnpSign(params: VnpParams, secret: string): string {
  return createHmac('sha512', secret).update(vnpQuery(params), 'utf8').digest('hex');
}

export function vnpVerify(query: Record<string, unknown>, secret: string): query is VnpParams {
  if (Object.entries(query).some(([key, value]) => key.startsWith('vnp_') && typeof value !== 'string')) {
    return false;
  }
  const supplied = query.vnp_SecureHash;
  if (typeof supplied !== 'string' || !/^[a-fA-F0-9]{128}$/.test(supplied)) return false;
  const expected = Buffer.from(vnpSign(query as VnpParams, secret), 'hex');
  return timingSafeEqual(expected, Buffer.from(supplied, 'hex'));
}

export function vnpDate(date: Date): string {
  const vietnamTime = new Date(date.getTime() + 7 * 3600_000);
  return vietnamTime.toISOString().replace(/[-:T]/g, '').slice(0, 14);
}
