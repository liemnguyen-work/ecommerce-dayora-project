export interface Category {
  id: string;
  code: string;
  name: string;
}

export interface Sku {
  id: string;
  code: string;
  color: string | null;
  price: number;
  salePrice: number | null;
  effectivePrice: number;
  availableStock: number;
  inStock: boolean;
  imageUrl: string | null;
}

export type ProductSku = Sku;

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  material: string | null;
  scenarios: string[];
  category: Category;
  skus: Sku[];
  minPrice: number;
}

export interface CatalogResult {
  items: Product[];
  total: number;
}

export const filterNames = ['q', 'category', 'scenario', 'material', 'minPrice', 'maxPrice', 'capacity', 'size', 'sort'] as const;

export function catalogQuery(values: FormData | URLSearchParams): URLSearchParams {
  const query = new URLSearchParams();
  for (const name of filterNames) {
    const value = String(values.get(name) ?? '').trim();
    if (value) query.set(name, value);
  }
  return query;
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency', currency: 'VND', maximumFractionDigits: 0,
  }).format(value);
}
