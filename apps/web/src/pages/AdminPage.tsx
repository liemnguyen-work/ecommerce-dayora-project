import { Fragment, useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../lib/auth.tsx';
import { api } from '../lib/api.ts';
import '../catalog.css';

type Section = 'tong-quan' | 'don-hang' | 'san-pham' | 'voucher' | 'khuyen-mai' | 'quy-tac' | 'tai-khoan';

const sections: [Section, string][] = [
  ['tong-quan', 'Tổng quan'],
  ['don-hang', 'Đơn hàng'],
  ['san-pham', 'Sản phẩm'],
  ['voucher', 'Voucher'],
  ['khuyen-mai', 'Khuyến mãi'],
  ['quy-tac', 'Quy tắc Kit'],
  ['tai-khoan', 'Tài khoản'],
];

const errText = (error: unknown): string =>
  error instanceof Error ? error.message : 'Có lỗi xảy ra.';

function useLoad<T>(path: string) {
  const [result, setResult] = useState<{
    path: string;
    data: T | null;
    error: string;
    loading: boolean;
  }>({ path, data: null, error: '', loading: true });
  const version = useRef(0);

  const load = useCallback(() => {
    const current = ++version.current;
    return api<T>(path)
      .then(data => {
        if (version.current === current) {
          setResult({ path, data, error: '', loading: false });
        }
      })
      .catch((error: unknown) => {
        if (version.current === current) {
          setResult({ path, data: null, error: errText(error), loading: false });
        }
      });
  }, [path]);

  const reload = useCallback(() => {
    setResult({ path, data: null, error: '', loading: true });
    return load();
  }, [path, load]);

  useEffect(() => {
    void load();
    // Vô hiệu hóa phản hồi đang chờ khi đổi path hoặc rời mục.
    const invalidate = () => { version.current++; };
    return invalidate;
  }, [load]);

  // Không hiển thị dữ liệu endpoint cũ trong lúc effect của path mới chưa chạy.
  const state = result.path === path
    ? result
    : { data: null, error: '', loading: true };
  return { data: state.data, error: state.error, loading: state.loading, reload };
}

type AdminProduct = {
  id: string;
  slug: string;
  name: string;
  status: string;
  skus: {
    id: string;
    code: string;
    color: string | null;
    price: number;
    salePrice: number | null;
    stock: number;
    reserved: number;
    status: string;
  }[];
};

function Products() {
  const { data, error, loading, reload } = useLoad<AdminProduct[]>('/admin/products');
  const [msg, setMsg] = useState('');
  const [actionError, setActionError] = useState('');
  const [saving, setSaving] = useState(false);
  const locked = useRef(false);

  async function mutate(path: string, body?: object) {
    if (locked.current) return;
    locked.current = true;
    setSaving(true);
    setMsg('');
    setActionError('');
    try {
      await api(path, { method: 'PATCH', ...(body ? { body: JSON.stringify(body) } : {}) });
      setMsg('Đã lưu.');
      await reload();
    } catch (error: unknown) {
      setActionError(errText(error));
    } finally {
      locked.current = false;
      setSaving(false);
    }
  }

  async function saveSku(event: FormEvent<HTMLFormElement>, sku: AdminProduct['skus'][number]) {
    event.preventDefault();
    if (locked.current) return;
    const form = new FormData(event.currentTarget);
    const rawPrice = String(form.get('price') ?? '').trim();
    const rawSale = String(form.get('salePrice') ?? '').trim();
    const rawStock = String(form.get('stock') ?? '').trim();
    const price = Number(rawPrice);
    const stock = Number(rawStock);
    const salePrice = rawSale === '' ? null : Number(rawSale);
    const validInt = (value: number) => Number.isInteger(value) && value >= 0 && value <= 2147483647;
    setMsg('');
    if (!rawPrice || !rawStock || !validInt(price) || !validInt(stock) || (salePrice !== null && !validInt(salePrice))) {
      setActionError('Giá và tồn kho phải là số nguyên không âm, tối đa 2.147.483.647.');
      return;
    }
    if (salePrice !== null && salePrice >= price) {
      setActionError('Giá giảm phải nhỏ hơn giá niêm yết.');
      return;
    }
    if (stock < sku.reserved) {
      setActionError('Tồn kho không được nhỏ hơn số lượng đang giữ.');
      return;
    }
    await mutate(`/admin/skus/${encodeURIComponent(sku.id)}`, { price, salePrice, stock });
  }

  async function toggle(product: AdminProduct) {
    const path = `/admin/products/${encodeURIComponent(product.id)}`;
    await mutate(product.status === 'ACTIVE' ? `${path}/hide` : path,
      product.status === 'ACTIVE' ? undefined : { status: 'ACTIVE' });
  }

  const inputClass = 'w-32 rounded-lg border border-ink/30 bg-paper px-3 py-2 focus-visible:outline-2 focus-visible:outline-ink';
  const buttonClass = 'min-h-11 rounded-full border border-ink/30 px-4 py-2 font-semibold hover:bg-leaf focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-wait disabled:opacity-60';

  return (
    <div className="mt-4 space-y-4" aria-busy={loading || saving}>
      {msg && <p role="status">{msg}</p>}
      {actionError && <p role="alert" className="text-berry">{actionError}</p>}
      {loading && <p role="status">Đang tải…</p>}
      {error && <p role="alert" className="text-berry">{error}</p>}
      {data && (data.length === 0
        ? <p>Chưa có sản phẩm.</p>
        : <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Sản phẩm và các biến thể SKU; giá tính bằng đồng Việt Nam</caption>
            <thead><tr>{['Sản phẩm / SKU', 'Giá (đ)', 'Giá giảm (đ)', 'Tồn kho', 'Đang giữ', 'Hành động'].map(label => <th key={label} scope="col" className="border-b border-ink/20 p-3">{label}</th>)}</tr></thead>
            <tbody>
              {data.map(product => <Fragment key={product.id}>
                <tr className="bg-leaf/40">
                  <th scope="rowgroup" colSpan={5} className="p-3">
                    <Link to={`/san-pham/${encodeURIComponent(product.slug)}`} className="underline underline-offset-4">{product.name}</Link>
                    <span className="ml-3 text-sm font-normal">{product.status === 'ACTIVE' ? 'Đang bán' : 'Đã ẩn'}</span>
                  </th>
                  <td className="p-3"><button type="button" disabled={saving || loading} onClick={() => { void toggle(product); }} className={buttonClass}>{product.status === 'ACTIVE' ? 'Ẩn' : 'Hiện lại'}<span className="sr-only"> {product.name}</span></button></td>
                </tr>
                {product.skus.length === 0 && <tr><td colSpan={6} className="p-3">Chưa có SKU.</td></tr>}
                {product.skus.map(sku => {
                  const formId = `sku-${sku.id}`;
                  return <tr key={sku.id} className="border-b border-ink/15">
                    <th scope="row" className="p-3 font-normal"><form id={formId} onSubmit={event => { void saveSku(event, sku); }} />{sku.code} · {sku.color || 'Không phân màu'}<span className="block text-sm">{sku.status === 'ACTIVE' ? 'Đang bán' : 'Đã ẩn'}</span></th>
                    <td className="p-3"><input form={formId} name="price" type="number" min={0} max={2147483647} step={1} required defaultValue={sku.price} disabled={saving} aria-label={`Giá ${sku.code}`} className={inputClass} /></td>
                    <td className="p-3"><input form={formId} name="salePrice" type="number" min={0} max={2147483647} step={1} defaultValue={sku.salePrice ?? ''} disabled={saving} aria-label={`Giá giảm ${sku.code}`} className={inputClass} /></td>
                    <td className="p-3"><input form={formId} name="stock" type="number" min={sku.reserved} max={2147483647} step={1} required defaultValue={sku.stock} disabled={saving} aria-label={`Tồn kho ${sku.code}`} className={inputClass} /></td>
                    <td className="p-3">{sku.reserved}</td>
                    <td className="p-3"><button form={formId} type="submit" disabled={saving || loading} className={buttonClass}>Lưu<span className="sr-only"> {sku.code}</span></button></td>
                  </tr>;
                })}
              </Fragment>)}
            </tbody>
          </table>
        </div>)}
      <button
        type="button"
        disabled={loading || saving}
        onClick={() => { void reload(); }}
        className="min-h-11 rounded-full border border-ink/30 px-5 py-2 font-semibold hover:bg-leaf focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-wait disabled:opacity-60"
      >
        {loading ? 'Đang tải…' : error ? 'Thử lại' : 'Tải lại'}
      </button>
    </div>
  );
}

type AdminUser = {
  id: string;
  email: string;
  fullName: string;
  role: 'ADMIN' | 'CUSTOMER';
  isActive: boolean;
  orderCount: number;
  createdAt: string;
};

function Users() {
  const { user: actor } = useAuth();
  const { data, error, loading, reload } = useLoad<{
    items: AdminUser[];
    total: number;
    page: number;
  }>('/admin/users');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [actionError, setActionError] = useState('');
  const locked = useRef(false);

  async function toggle(id: string, isActive: boolean) {
    if (locked.current) return;
    locked.current = true;
    setSaving(true);
    setMsg('');
    setActionError('');
    try {
      await api(`/admin/users/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        body: JSON.stringify({ isActive }),
      });
      setMsg(isActive ? 'Đã mở tài khoản.' : 'Đã khóa tài khoản.');
      await reload();
    } catch (error: unknown) {
      setActionError(errText(error));
    } finally {
      locked.current = false;
      setSaving(false);
    }
  }

  return (
    <div className="mt-4 space-y-4" aria-busy={loading || saving}>
      {msg && <p role="status">{msg}</p>}
      {actionError && <p role="alert" className="text-berry">{actionError}</p>}
      {loading && <p role="status">Đang tải…</p>}
      {error && <p role="alert" className="text-berry">{error}</p>}
      {data && <>
        <p>Tổng số: {data.total} tài khoản. Trang {data.page}, hiển thị {data.items.length} tài khoản.</p>
        {data.items.length === 0 ? <p>Chưa có tài khoản.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Danh sách tài khoản và trạng thái hoạt động</caption>
              <thead><tr>{['Họ tên và email', 'Vai trò', 'Số đơn hàng', 'Ngày tạo', 'Hoạt động'].map(label => <th key={label} scope="col" className="border-b border-ink/20 p-3">{label}</th>)}</tr></thead>
              <tbody>{data.items.map(account => (
                <tr key={account.id} className="border-b border-ink/15">
                  <th scope="row" className="p-3 text-left font-normal"><span className="block font-semibold">{account.fullName}</span><span className="break-all text-sm">{account.email}</span></th>
                  <td className="p-3"><span className="whitespace-nowrap rounded-full bg-leaf px-3 py-1 text-sm">{account.role === 'ADMIN' ? 'Quản trị' : 'Khách'}</span></td>
                  <td className="p-3">{account.orderCount}</td>
                  <td className="whitespace-nowrap p-3"><time dateTime={account.createdAt}>{new Date(account.createdAt).toLocaleDateString('vi-VN')}</time></td>
                  <td className="p-3">
                    <label className="inline-flex min-h-11 cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={account.isActive}
                        disabled={saving || loading || account.id === actor?.id}
                        onChange={event => { void toggle(account.id, event.target.checked); }}
                        aria-label={`Khóa hoặc mở tài khoản ${account.email}`}
                        aria-describedby={account.id === actor?.id ? 'admin-self-lock-help' : undefined}
                        className="h-5 w-5 accent-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                      />
                      <span className="whitespace-nowrap">{account.isActive ? 'Đang mở' : 'Đã khóa'}</span>
                    </label>
                    {account.id === actor?.id && <p id="admin-self-lock-help" className="text-sm">Không thể tự khóa tài khoản đang đăng nhập.</p>}
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </>}
      <button type="button" disabled={loading || saving} onClick={() => { void reload(); }} className="min-h-11 rounded-full border border-ink/30 px-5 py-2 font-semibold hover:bg-leaf focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-wait disabled:opacity-60">
        {loading ? 'Đang tải…' : error ? 'Thử lại' : 'Tải lại'}
      </button>
    </div>
  );
}

export default function AdminPage() {
  const { user, loading } = useAuth();
  const [params, setParams] = useSearchParams();
  const [section, title] = sections.find(([key]) => key === params.get('muc')) ?? sections[0];

  if (loading) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-10 text-ink">
        <h1 className="text-3xl font-extrabold">Quản trị</h1>
        <p role="status" className="mt-4">Đang tải…</p>
      </main>
    );
  }

  // Chỉ mount nội dung quản trị sau khi xác nhận quyền.
  if (user?.role !== 'ADMIN') {
    return (
      <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-10 text-ink">
        <h1 className="text-3xl font-extrabold">Khu quản trị</h1>
        <p className="my-6">Chỉ tài khoản quản trị mới truy cập được trang này.</p>
        <Link className="catalog-button inline-flex min-h-11 items-center rounded-full bg-berry px-6 py-3 font-semibold text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink" to="/dang-nhap?next=%2Fadmin">
          Đăng nhập
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-10 text-ink">
      <div className="admin-layout grid gap-6 md:grid-cols-[14rem_1fr]">
        <nav className="admin-nav flex flex-col gap-2" aria-label="Mục quản trị">
          {sections.map(([key, label]) => (
            <button
              key={key}
              type="button"
              aria-current={section === key ? 'page' : undefined}
              onClick={() => setParams({ muc: key })}
              className={`min-h-11 rounded-xl px-4 py-3 text-left font-semibold hover:bg-leaf focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${section === key ? 'bg-leaf' : ''}`}
            >
              {label}
            </button>
          ))}
        </nav>
        <section className="admin-main min-w-0" aria-labelledby="admin-section-title">
          <h1 id="admin-section-title" className="text-3xl font-extrabold">{title}</h1>
          {section === 'san-pham'
            ? <Products />
            : section === 'tai-khoan'
              ? <Users />
              : <p className="mt-4">Mục {title} đang được xây dựng.</p>}
        </section>
      </div>
    </main>
  );
}
