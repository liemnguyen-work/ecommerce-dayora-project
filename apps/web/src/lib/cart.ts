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
