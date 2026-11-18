import { api } from './api';

export interface CartSku {
  id: string;
  code: string;
  color: string;
  price: number;
  salePrice: number | null;
  effectivePrice: number;
  availableStock: number;
  inStock: boolean;
  imageUrl: string | null;
  product: {
    id: string;
    slug: string;
    name: string;
  };
}

export interface CartItem {
  id: string;
  sku: CartSku;
  quantity: number;
  kitGroupId: string;
  lineTotal: number;
}

export interface CartWarning {
  skuId: string;
  type: 'OUT_OF_STOCK' | 'INSUFFICIENT_STOCK';
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  warnings: CartWarning[];
}

export interface PreviewVoucher {
  valid: boolean;
  code?: string;
  percentOff?: number | null;
  reason?: string;
  discount?: number;
}

export interface Preview {
  subtotal: number;
  saleDiscount: number;
  voucher: PreviewVoucher | null;
  shippingFee: number;
  shippingIsEstimate: boolean;
  total: number;
  warnings: CartWarning[];
}

export interface ShippingAddress {
  province: string;
  district: string;
  isInnerHcm?: boolean;
}

export const expectedOf = (cart: Cart) =>
  cart.items.map((item) => ({
    skuId: item.sku.id,
    unitPrice: item.sku.effectivePrice,
  }));

export function previewOrder(cart: Cart, voucherCode?: string, address?: ShippingAddress): Promise<Preview> {
  return api<Preview>('/orders/preview', {
    method: 'POST',
    body: JSON.stringify({
      voucherCode: voucherCode || undefined,
      address,
      expected: expectedOf(cart),
    }),
  });
}

const VOUCHER_KEY = 'dayora:voucher';

export function savedVoucher(): string {
  try {
    return sessionStorage.getItem(VOUCHER_KEY) ?? '';
  } catch {
    return '';
  }
}

export function saveVoucher(code: string): void {
  try {
    if (code) sessionStorage.setItem(VOUCHER_KEY, code);
    else sessionStorage.removeItem(VOUCHER_KEY);
  } catch {
    // Storage can be unavailable in private or restricted browser contexts.
  }
}

export function getCart(): Promise<Cart> {
  return api<Cart>('/cart');
}

export function addToCart(skuId: string, quantity: number): Promise<Cart> {
  return api<Cart>('/cart/items', {
    method: 'POST',
    body: JSON.stringify({ skuId, quantity }),
  });
}

export function updateCartItem(id: string, quantity: number): Promise<Cart> {
  return api<Cart>(`/cart/items/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
  });
}

export function removeCartItem(id: string): Promise<Cart> {
  return api<Cart>(`/cart/items/${id}`, { method: 'DELETE' });
}
