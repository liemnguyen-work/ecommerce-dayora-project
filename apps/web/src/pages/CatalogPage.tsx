import { useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/catalog/ProductCard';
import { api } from '../lib/api';
import { catalogQuery, type CatalogResult } from '../lib/catalog';

export default function CatalogPage() {
  const [params, setParams] = useSearchParams();
  const query = catalogQuery(params).toString();
  const [result, setResult] = useState<CatalogResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    api<CatalogResult>(`/products${query ? `?${query}` : ''}`)
      .then((data) => { if (active) { setResult(data); setError(false); } })
      .catch(() => { if (active) { setResult(null); setError(true); } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [query]);

  function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = catalogQuery(new FormData(event.currentTarget));
    if (next.toString() !== query) setLoading(true);
    setParams(next);
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 text-ink sm:px-8">
      <h1 className="mb-6 text-3xl font-bold">Sản phẩm</h1>
      <form key={query} onSubmit={applyFilters} className="mb-8 flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-2">Tìm kiếm<input className="rounded border border-ink/30 bg-white p-2" name="q" defaultValue={params.get('q') ?? ''} /></label>
        <label className="flex flex-col gap-2">Mã danh mục<input className="rounded border border-ink/30 bg-white p-2" name="category" defaultValue={params.get('category') ?? ''} placeholder="Ví dụ: TM" /></label>
        <button className="rounded bg-berry px-5 py-2 font-semibold text-white" type="submit">Lọc</button>
      </form>
      {loading ? <p role="status">Đang tải sản phẩm...</p> : error ? <p role="alert">Chưa tải được sản phẩm. Vui lòng thử lại.</p> : !result?.items.length ? <p>Không tìm thấy sản phẩm phù hợp.</p> : <><p className="mb-4">{result.total} sản phẩm</p><div className="catalog-grid">{result.items.map((product) => <ProductCard key={product.id} product={product} search={query ? `?${query}` : ''} />)}</div></>}
    </main>
  );
}
