export type VnpParams = Record<string, string>;

export function vnpQuery(params: VnpParams): string {
  const encode = (value: string) => encodeURIComponent(value).replace(/%20/g, '+');
  return Object.keys(params)
    .filter((key) => key.startsWith('vnp_') && key !== 'vnp_SecureHash' && key !== 'vnp_SecureHashType')
    .sort()
    .map((key) => `${encode(key)}=${encode(params[key])}`)
    .join('&');
}
