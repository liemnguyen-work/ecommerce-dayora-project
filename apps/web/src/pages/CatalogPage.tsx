import { useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/catalog/ProductCard';
import { api } from '../lib/api';
import { catalogQuery, type CatalogResult, type Category } from '../lib/catalog';
import '../catalog.css';

export default function CatalogPage() {
  const [params, setParams] = useSearchParams();
  const query = catalogQuery(params).toString();
  const [result, setResult] = useState<CatalogResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryError, setCategoryError] = useState(false);
  const [formError, setFormError] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(() => window.matchMedia('(min-width: 1024px)').matches);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const onChange = (event: MediaQueryListEvent) => setFiltersOpen(event.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    let active = true;
    api<Category[]>('/categories')
      .then((data) => { if (active) setCategories(data); })
      .catch(() => { if (active) setCategoryError(true); });
    return () => { active = false; };
  }, []);

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
    const min = next.get('minPrice');
    const max = next.get('maxPrice');
    if (min !== null && max !== null && Number(min) > Number(max)) {
      setFormError('Giá tối thiểu không được lớn hơn giá tối đa.');
      return;
    }
    setFormError('');
    if (next.toString() !== query) setLoading(true);
    setParams(next);
  }

  return (
    <main className="catalog-page">
      <header className="catalog-heading"><p className="catalog-eyebrow">DAYORA · CHUYẾN ĐI TRONG NGÀY</p><h1>Sản phẩm</h1><p>Chọn những món đồ phù hợp cho cuộc vui của bạn.</p></header>
      <div className="catalog-layout">
        <aside aria-label="Tìm kiếm và bộ lọc">
          <details className="catalog-filters" open={filtersOpen} onToggle={(event) => setFiltersOpen(event.currentTarget.open)}>
            <summary>Bộ lọc <span aria-hidden="true">⌄</span></summary>
            <form key={query} onSubmit={applyFilters} className="catalog-filter-form">
              <label>Tìm kiếm<input name="q" type="search" defaultValue={params.get('q') ?? ''} placeholder="Tìm sản phẩm..." /></label>
              <label>Nhóm hàng<select name="category" defaultValue={params.get('category') ?? ''}><option value="">Tất cả nhóm hàng</option>{categories.map((category) => <option key={category.id} value={category.code}>{category.name}</option>)}</select></label>
              {categoryError && <p role="alert">Chưa tải được nhóm hàng. Vui lòng tải lại trang.</p>}
              <label>Chuyến đi<select name="scenario" defaultValue={params.get('scenario') ?? ''}><option value="">Tất cả chuyến đi</option><option value="PICNIC">Picnic</option><option value="DATE">Hẹn hò</option><option value="BEACH">Đi biển</option></select></label>
              <fieldset><legend>Khoảng giá (₫)</legend><div className="catalog-price-inputs"><label>Tối thiểu<input name="minPrice" type="number" min="0" step="1" defaultValue={params.get('minPrice') ?? ''} placeholder="0" /></label><label>Tối đa<input name="maxPrice" type="number" min="0" step="1" defaultValue={params.get('maxPrice') ?? ''} placeholder="Không giới hạn" /></label></div></fieldset>
              <label>Chất liệu<input name="material" defaultValue={params.get('material') ?? ''} placeholder="Ví dụ: cotton" /></label>
              <label>Sức chứa<select name="capacity" defaultValue={params.get('capacity') ?? ''}><option value="">Tất cả</option>{[2, 4, 6, 8].map((n) => <option key={n} value={n}>{n} người</option>)}</select></label>
              <label>Kích thước (cm)<input name="size" pattern="[0-9]+x[0-9]+(x[0-9]+)?" defaultValue={params.get('size') ?? ''} placeholder="Ví dụ: 200x150" title="Nhập kích thước dạng 200x150 hoặc 200x150x10" /></label>
              <label>Sắp xếp<select name="sort" defaultValue={params.get('sort') ?? ''}><option value="">Mặc định</option><option value="price_asc">Giá thấp đến cao</option><option value="price_desc">Giá cao đến thấp</option></select></label>
              {formError && <p className="catalog-filter-error" role="alert">{formError}</p>}
              <button type="submit">Áp dụng bộ lọc</button>
            </form>
          </details>
        </aside>
        <section aria-label="Danh sách sản phẩm">{loading ? <p role="status">Đang tải sản phẩm...</p> : error ? <p role="alert">Chưa tải được sản phẩm. Vui lòng thử lại.</p> : !result?.items.length ? <p>Không tìm thấy sản phẩm phù hợp.</p> : <><p className="catalog-count">{result.total} sản phẩm</p><div className="catalog-grid">{result.items.map((product) => <ProductCard key={product.id} product={product} search={query ? `?${query}` : ''} />)}</div></>}</section>
      </div>
    </main>
  );
}
