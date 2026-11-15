import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../lib/api';
import { formatPrice, type Category, type Sku } from '../lib/catalog';

type ProductDetail = {
  id: string;
  name: string;
  description: string | null;
  category: Category;
  skus: (Sku & { unit: string })[];
};

function ProductDetails({ product }: { product: ProductDetail }) {
  const [selectedId, setSelectedId] = useState(product.skus[0]?.id);
  const [notice, setNotice] = useState('');
  const sku = product.skus.find((item) => item.id === selectedId);
  const available = Boolean(sku?.inStock && sku.availableStock > 0);
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
        <fieldset className="space-y-3">
          <legend className="font-bold">Chọn biến thể</legend>
          <div className="flex flex-wrap gap-2">{product.skus.map((item) => (
            <button key={item.id} type="button" aria-pressed={item.id === selectedId} onClick={() => { setSelectedId(item.id); setNotice(''); }} className="rounded-full border border-ink px-4 py-2 aria-pressed:bg-ink aria-pressed:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-berry">
              {item.color || item.code}{(!item.inStock || item.availableStock <= 0) && ' · Hết hàng'}
            </button>
          ))}</div>
        </fieldset>
        <p>{available ? `Còn ${sku?.availableStock} ${sku?.unit}` : 'Tạm hết hàng'}</p>
        <button type="button" disabled={!available} onClick={() => setNotice('Chức năng thêm vào giỏ đang được phát triển.')} className="rounded-full bg-berry px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">{available ? 'Thêm vào giỏ' : 'Tạm hết hàng'}</button>
        {notice && <p role="status" className="text-sm">{notice}</p>}
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
