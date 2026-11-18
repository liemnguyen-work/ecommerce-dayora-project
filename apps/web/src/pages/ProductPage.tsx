import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../lib/auth';
import { addToCart } from '../lib/cart';
import { formatPrice, type Category, type Product, type Sku } from '../lib/catalog';
import ProductCard from '../components/catalog/ProductCard';

type ProductDetail = {
  id: string;
  name: string;
  description: string | null;
  material: string | null;
  category: Category;
  skus: (Sku & { unit: string; lengthCm: number | null; widthCm: number | null; heightCm: number | null; volumeMl: number | null; capacityPeople: number | null })[];
  related: Product[];
};

type CartNotice = {
  ok: boolean;
  text: string;
};

function ProductDetails({ product }: { product: ProductDetail }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { search } = location;
  const [selectedId, setSelectedId] = useState(product.skus[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const [quantityInput, setQuantityInput] = useState('1');
  const [notice, setNotice] = useState<CartNotice | null>(null);
  const [adding, setAdding] = useState(false);
  const sku = product.skus.find((item) => item.id === selectedId);
  const available = Boolean(sku?.inStock && sku.availableStock > 0);
  const maxQty = Math.max(1, Math.min(99, sku?.availableStock ?? 1));
  const specs: [string, string | number | null | undefined][] = [
    ['Mã biến thể', sku?.code], ['Màu sắc', sku?.color], ['Chất liệu', product.material],
    ['Dài (cm)', sku?.lengthCm], ['Rộng (cm)', sku?.widthCm], ['Cao (cm)', sku?.heightCm],
    ['Dung tích (ml)', sku?.volumeMl], ['Sức chứa (người)', sku?.capacityPeople],
  ];

  useEffect(() => {
    if (!user) return;
    void api('/me/viewed', {
      method: 'POST',
      body: JSON.stringify({ productId: product.id }),
    }).catch(() => undefined);
  }, [user, product.id]);

  function updateQuantity(value: number) {
    const next = Math.max(1, Math.min(maxQty, value));
    setQuantity(next);
    setQuantityInput(String(next));
  }

  async function handleAddToCart() {
    if (!sku || !available) return;
    if (!user) {
      const next = `${location.pathname}${location.search}`;
      navigate(`/dang-nhap?next=${encodeURIComponent(next)}`);
      return;
    }

    setAdding(true);
    setNotice(null);
    try {
      await addToCart(sku.id, quantity);
      setNotice({ ok: true, text: `Đã thêm ${quantity} × ${product.name} (${sku.color}) vào giỏ.` });
    } catch (error) {
      setNotice({ ok: false, text: error instanceof Error ? error.message : 'Chưa thêm được vào giỏ.' });
    } finally {
      setAdding(false);
    }
  }
  return (
    <>
    <article className="grid min-w-0 gap-8 md:grid-cols-2">
      <div className="min-w-0 overflow-hidden rounded-3xl bg-leaf">
        {sku?.imageUrl ? <img className="h-full w-full object-cover" src={sku.imageUrl} alt={product.name} /> : <p className="p-8">Ảnh sản phẩm đang cập nhật.</p>}
      </div>
      <div className="min-w-0 space-y-4 break-words">
        <p className="font-semibold text-berry">{product.category.name}</p>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        {sku && <p className="text-2xl font-bold text-berry">{formatPrice(sku.effectivePrice)}</p>}
        <p>{product.description || 'Thông tin sản phẩm đang cập nhật.'}</p>
        <fieldset className="space-y-3">
          <legend className="font-bold">Chọn biến thể</legend>
          <div className="flex flex-wrap gap-2">{product.skus.map((item) => (
            <button key={item.id} type="button" aria-pressed={item.id === selectedId} onClick={() => { setSelectedId(item.id); setQuantity(1); setQuantityInput('1'); setNotice(null); }} className="rounded-full border border-ink px-4 py-2 aria-pressed:bg-ink aria-pressed:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-berry">
              {item.color || item.code}{(!item.inStock || item.availableStock <= 0) && ' · Hết hàng'}
            </button>
          ))}</div>
        </fieldset>
        <p className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${available ? 'bg-leaf text-ink' : 'bg-red-50 text-red-800'}`}><span aria-hidden="true" className={`h-2 w-2 rounded-full ${available ? 'bg-green-700' : 'bg-red-700'}`} />{available ? `Còn ${sku?.availableStock} ${sku?.unit}` : 'Tạm hết hàng'}</p>
        <div className="space-y-2">
          <p className="font-bold">Số lượng</p>
          <div className="inline-flex items-center overflow-hidden rounded-full border border-ink/30" aria-label="Chọn số lượng">
            <button type="button" aria-label="Giảm số lượng" disabled={!available || quantity <= 1} onClick={() => updateQuantity(quantity - 1)} className="h-11 w-11 text-xl disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-berry">−</button>
            <input type="text" inputMode="numeric" aria-label="Số lượng" disabled={!available} value={quantityInput} onChange={(event) => { const value = event.target.value; if (/^\d*$/.test(value)) { setQuantityInput(value); if (value) setQuantity(Math.max(1, Math.min(maxQty, Number(value) || 1))); } }} onBlur={() => updateQuantity(quantityInput ? Number(quantityInput) || 1 : 1)} className="w-14 bg-transparent text-center font-semibold focus-visible:outline-2 focus-visible:outline-berry" />
            <button type="button" aria-label="Tăng số lượng" disabled={!available || quantity >= maxQty} onClick={() => updateQuantity(quantity + 1)} className="h-11 w-11 text-xl disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-berry">+</button>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button type="button" disabled={!available || adding} onClick={() => void handleAddToCart()} className="min-h-11 rounded-full bg-berry px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">{adding ? 'Đang thêm…' : available ? 'Thêm vào giỏ hàng' : 'Tạm hết hàng'}</button>
          <Link className="rounded-full px-3 py-2 font-semibold text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-berry" to="/san-pham">← Về danh mục</Link>
        </div>
        {notice && <p role="status" className={`rounded-xl px-4 py-3 text-sm font-medium ${notice.ok ? 'bg-green-50 text-green-900' : 'bg-red-50 text-red-800'}`}>{notice.text} {notice.ok && <Link className="font-semibold underline" to="/gio-hang">Xem giỏ hàng</Link>}</p>}
      </div>
    </article>
    <section aria-labelledby="product-specs" className="mt-16">
      <h2 id="product-specs" className="mb-5 text-2xl font-bold">Thông số sản phẩm</h2>
      <dl className="overflow-hidden rounded-2xl border border-leaf bg-white">
        {specs.filter(([, value]) => value !== null && value !== undefined && value !== '').map(([label, value]) => (
          <div key={label} className="grid grid-cols-2 gap-4 border-b border-leaf px-5 py-3 last:border-b-0"><dt className="font-semibold">{label}</dt><dd>{value}</dd></div>
        ))}
      </dl>
    </section>
    {product.related?.length > 0 && <section aria-labelledby="related-products" className="mt-16"><h2 id="related-products" className="mb-6 text-2xl font-bold">Cùng bạn ra ngoài</h2><div className="catalog-grid">{product.related.map((item) => <ProductCard key={item.id} product={item} search={search} />)}</div></section>}
    </>
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
