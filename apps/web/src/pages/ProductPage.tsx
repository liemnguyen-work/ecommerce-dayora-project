import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../lib/api';
import { formatPrice, type Category, type Sku } from '../lib/catalog';

type ProductDetail = {
  id: string;
  name: string;
  description: string | null;
  category: Category;
  skus: Sku[];
};

function ProductDetails({ product }: { product: ProductDetail }) {
  const sku = product.skus[0];
  return (
    <article className="grid gap-8 md:grid-cols-2">
      <div className="overflow-hidden rounded-3xl bg-leaf">
        {sku?.imageUrl ? <img className="h-full w-full object-cover" src={sku.imageUrl} alt={product.name} /> : <p className="p-8">Ảnh sản phẩm đang cập nhật.</p>}
      </div>
      <div className="space-y-4">
        <p className="font-semibold text-berry">{product.category.name}</p>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        {sku && <p className="text-2xl font-bold text-berry">{formatPrice(sku.effectivePrice)}</p>}
        <p>{product.description || 'Thông tin sản phẩm đang cập nhật.'}</p>
        <Link className="inline-block underline" to="/san-pham">← Về danh mục</Link>
      </div>
    </article>
  );
}

function ProductContent({ slug }: { slug: string }) {
  const [retryCount, setRetryCount] = useState(0);
  const [state, setState] = useState<{ loading: boolean; data: ProductDetail | null }>({ loading: true, data: null });

  useEffect(() => {
    let active = true;
    api<ProductDetail>(`/products/${encodeURIComponent(slug)}`)
      .then((data) => { if (active) setState({ loading: false, data }); })
      .catch(() => { if (active) setState({ loading: false, data: null }); });
    return () => { active = false; };
  }, [slug, retryCount]);

  if (state.loading) return <p role="status" aria-busy="true">Đang tải chi tiết sản phẩm…</p>;
  if (!state.data) return (
    <div role="alert" className="space-y-4 rounded-3xl border border-leaf bg-white p-8">
      <h1 className="text-2xl font-bold">Sản phẩm chưa khả dụng</h1>
      <p>Sản phẩm có thể không còn hiển thị hoặc kết nối đang gián đoạn.</p>
      <button className="rounded-full bg-berry px-5 py-3 font-semibold text-white" type="button" onClick={() => { setState({ loading: true, data: null }); setRetryCount((count) => count + 1); }}>Thử lại</button>
      <div><Link className="underline" to="/san-pham">← Về danh mục</Link></div>
    </div>
  );
  return <ProductDetails key={state.data.id} product={state.data} />;
}

export default function ProductPage() {
  const { slug = '' } = useParams();
  return <main className="mx-auto min-h-screen max-w-6xl px-4 py-12 text-ink sm:px-8"><ProductContent key={slug} slug={slug} /></main>;
}
