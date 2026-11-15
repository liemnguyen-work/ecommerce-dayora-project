export type ProductSku = {
  price: number;
  salePrice: number | null;
  imageUrl: string | null;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  skus: ProductSku[];
};

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}
