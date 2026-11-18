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

  const inputClass = 'admin-input';
  const buttonClass = 'admin-button';

  return (
    <div className="mt-4 space-y-4" aria-busy={loading || saving}>
      {msg && <p role="status">{msg}</p>}
      {actionError && <p role="alert" className="text-berry">{actionError}</p>}
      {loading && <p role="status">Đang tải…</p>}
      {error && <p role="alert" className="text-berry">{error}</p>}
      {data && (data.length === 0
        ? <p>Chưa có sản phẩm.</p>
        : <div className="admin-table-wrap" tabIndex={0}>
          <table className="admin-table">
            <caption className="sr-only">Sản phẩm và các biến thể SKU; giá tính bằng đồng Việt Nam</caption>
            <thead><tr>{['Sản phẩm / SKU', 'Giá (đ)', 'Giá giảm (đ)', 'Tồn kho', 'Đang giữ', 'Hành động'].map(label => <th key={label} scope="col" className="border-b border-ink/20 p-3">{label}</th>)}</tr></thead>
            <tbody>
              {data.map(product => <Fragment key={product.id}>
                <tr className="admin-group">
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
                    <td className="p-3"><div className="sku-stock"><input form={formId} name="stock" type="number" min={sku.reserved} max={2147483647} step={1} required defaultValue={sku.stock} disabled={saving} aria-label={`Tồn kho ${sku.code}`} aria-describedby={`reserved-${sku.id}`} className={inputClass} /><small id={`reserved-${sku.id}`}>Đang giữ: {sku.reserved}</small></div></td>
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
        className="admin-button"
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
          <div className="admin-table-wrap" tabIndex={0}>
            <table className="admin-table">
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
      <button type="button" disabled={loading || saving} onClick={() => { void reload(); }} className="admin-button">
        {loading ? 'Đang tải…' : error ? 'Thử lại' : 'Tải lại'}
      </button>
    </div>
  );
}

type VoucherItem = {
  id: string;
  code: string;
  description: string | null;
  percentOff: number | null;
  amountOff: number | null;
  maxDiscount: number | null;
  minOrderValue: number | null;
  usageLimit: number | null;
  usedCount: number;
  endsAt: string;
  isActive: boolean;
  status: string;
};

const formatPrice = (value: number) => `${value.toLocaleString('vi-VN')} đ`;

function Vouchers() {
  const { data, error, loading, reload } = useLoad<{ items: VoucherItem[]; total: number; page: number }>('/admin/vouchers');
  const [kind, setKind] = useState('percent');
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState('');
  const [actionError, setActionError] = useState('');
  const pending = useRef(false);

  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const now = new Date();
    const endsAt = new Date(`${String(values.get('endsAt'))}T00:00:00`);
    setMsg('');
    setActionError('');
    if (!Number.isFinite(endsAt.getTime()) || endsAt <= now) {
      setActionError('Ngày hết hạn phải sau thời điểm hiện tại.');
      return;
    }
    const code = String(values.get('code') ?? '').trim().toUpperCase();
    const description = String(values.get('description') ?? '').trim();
    if (!/^[A-Z0-9_-]{3,30}$/.test(code) || !description) {
      setActionError('Nhập mã 3–30 ký tự chữ, số, gạch dưới hoặc gạch ngang và mô tả không rỗng.');
      return;
    }
    const value = Number(values.get('value'));
    if (!Number.isSafeInteger(value) || value <= 0 || (kind === 'percent' && value > 100)) {
      setActionError('Giá trị giảm phải là số nguyên dương; phần trăm không vượt quá 100.');
      return;
    }
    const optional: Record<string, number> = {};
    for (const field of ['maxDiscount', 'minOrderValue', 'usageLimit']) {
      if (field === 'maxDiscount' && kind !== 'percent') continue;
      const raw = String(values.get(field) ?? '').trim();
      if (!raw) continue;
      const number = Number(raw);
      if (!Number.isSafeInteger(number) || number < (field === 'minOrderValue' ? 0 : 1)) {
        setActionError('Trần giảm và tổng lượt phải là số nguyên dương; đơn tối thiểu không được âm.');
        return;
      }
      optional[field] = number;
    }
    pending.current = true;
    setSending(true);
    try {
      await api('/admin/vouchers', {
        method: 'POST',
        body: JSON.stringify({ code, description, ...optional,
          ...(kind === 'percent' ? { percentOff: value } : { amountOff: value }),
          perUserLimit: 1, startsAt: now.toISOString(), endsAt: endsAt.toISOString(),
        }),
      });
      form.reset();
      setKind('percent');
      setMsg(`Đã tạo voucher ${code}.`);
      await reload();
    } catch (error: unknown) {
      setActionError(errText(error));
    } finally {
      pending.current = false;
      setSending(false);
    }
  }

  async function toggle(id: string, isActive: boolean) {
    if (pending.current) return;
    pending.current = true;
    setSending(true);
    setMsg('');
    setActionError('');
    try {
      await api(`/admin/vouchers/${encodeURIComponent(id)}/active`, {
        method: 'PATCH', body: JSON.stringify({ isActive }),
      });
      setMsg(isActive ? 'Đã bật voucher.' : 'Đã tắt voucher.');
      await reload();
    } catch (error: unknown) {
      setActionError(errText(error));
    } finally {
      pending.current = false;
      setSending(false);
    }
  }
  const statusLabels: Record<string, string> = {
    active: 'Đang hiệu lực',
    scheduled: 'Chưa bắt đầu',
    expired: 'Đã hết hạn',
    disabled: 'Đã tắt',
  };

  return (
    <div className="mt-4 space-y-4" aria-busy={loading || sending}>
      <form className="admin-form" onSubmit={event => { void create(event); }}>
        <fieldset disabled={sending || loading} className="grid min-w-0 gap-4 rounded-2xl border border-ink/20 p-4 sm:grid-cols-2">
          <legend className="px-2 font-semibold">Tạo voucher</legend>
          <label className="grid gap-1">Mã voucher<input className="admin-input !w-full" name="code" required pattern="[A-Za-z0-9_-]{3,30}" minLength={3} maxLength={30} placeholder="VD: TEST2026" /></label>
          <label className="grid gap-1">Mô tả<input className="admin-input !w-full" name="description" required /></label>
          <label className="grid gap-1">Loại giảm<select className="admin-input !w-full" name="kind" value={kind} onChange={event => setKind(event.target.value)}><option value="percent">Giảm %</option><option value="amount">Giảm số tiền</option></select></label>
          <label className="grid gap-1">{kind === 'percent' ? 'Giá trị giảm (%)' : 'Giá trị giảm (đ)'}<input className="admin-input !w-full" name="value" type="number" min={1} max={kind === 'percent' ? 100 : undefined} step={1} required /></label>
          {kind === 'percent' && <label className="grid gap-1">Trần giảm (đ, tùy chọn)<input className="admin-input !w-full" name="maxDiscount" type="number" min={1} step={1} /></label>}
          <label className="grid gap-1">Đơn tối thiểu (đ, tùy chọn)<input className="admin-input !w-full" name="minOrderValue" type="number" min={0} step={1} /></label>
          <label className="grid gap-1">Tổng lượt dùng (trống: không giới hạn)<input className="admin-input !w-full" name="usageLimit" type="number" min={1} step={1} /></label>
          <label className="grid gap-1">Ngày hết hạn<input className="admin-input !w-full" name="endsAt" type="date" required aria-describedby="voucher-date-help" /></label>
          <p id="voucher-date-help" className="text-sm sm:col-span-2">Bắt đầu ngay; hết hạn lúc 00:00 ngày đã chọn theo múi giờ trên máy. Mỗi tài khoản tối đa 1 lượt sử dụng.</p>
          <button type="submit" className="admin-button sm:col-span-2">{sending ? 'Đang xử lý…' : 'Tạo voucher'}</button>
        </fieldset>
      </form>
      {msg && <p role="status">{msg}</p>}
      {actionError && <p role="alert" className="text-berry">{actionError}</p>}
      {loading && <p role="status" className="shop-muted">Đang tải…</p>}
      {error && <p role="alert" className="text-berry">{error}</p>}
      {data && <>
        <p>Tổng số: {data.total} voucher. Trang {data.page}, hiển thị {data.items.length} voucher.</p>
        {data.items.length === 0 ? <p>Chưa có voucher.</p> : (
          <div className="admin-table-wrap" tabIndex={0} role="region" aria-label="Danh sách voucher, cuộn ngang để xem thêm">
            <table className="admin-table admin-cards">
              <caption className="sr-only">Mã giảm giá, điều kiện và trạng thái từ hệ thống</caption>
              <thead><tr>{['Mã', 'Giảm', 'Điều kiện', 'Đã dùng', 'Hết hạn', 'Trạng thái'].map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
              <tbody>{data.items.map(voucher => (
                <tr key={voucher.id}>
                  <th scope="row" data-label="Mã"><span className="block font-semibold">{voucher.code}</span><span className="block text-sm font-normal">{voucher.description}</span></th>
                  <td data-label="Giảm">{voucher.percentOff !== null
                    ? <>{voucher.percentOff}%{voucher.maxDiscount !== null && <span className="block">Tối đa {formatPrice(voucher.maxDiscount)}</span>}</>
                    : formatPrice(voucher.amountOff ?? 0)}</td>
                  <td data-label="Điều kiện">{voucher.minOrderValue === null ? 'Không yêu cầu đơn tối thiểu' : `Đơn tối thiểu ${formatPrice(voucher.minOrderValue)}`}</td>
                  <td data-label="Đã dùng">{voucher.usedCount}/{voucher.usageLimit ?? '∞'}</td>
                  <td data-label="Hết hạn"><time dateTime={voucher.endsAt}>{new Date(voucher.endsAt).toLocaleDateString('vi-VN')}</time></td>
                  <td data-label="Trạng thái"><span className="block">{statusLabels[voucher.status] ?? voucher.status}</span><label className="inline-flex min-h-11 items-center gap-2"><input type="checkbox" checked={voucher.isActive} disabled={sending || loading} onChange={event => { void toggle(voucher.id, event.target.checked); }} aria-label={`Bật hoặc tắt voucher ${voucher.code}`} className="h-5 w-5 accent-ink" /></label></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </>}
      <button type="button" disabled={loading || sending} onClick={() => { void reload(); }} className="admin-button">
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
      <main className="admin-page">
        <h1 className="text-3xl font-extrabold">Quản trị</h1>
        <p role="status" className="mt-4">Đang tải…</p>
      </main>
    );
  }

  // Chỉ mount nội dung quản trị sau khi xác nhận quyền.
  if (user?.role !== 'ADMIN') {
    return (
      <main className="admin-page">
        <h1 className="text-3xl font-extrabold">Khu quản trị</h1>
        <p className="my-6">Chỉ tài khoản quản trị mới truy cập được trang này.</p>
        <Link className="catalog-button inline-flex min-h-11 items-center rounded-full bg-berry px-6 py-3 font-semibold text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink" to="/dang-nhap?next=%2Fadmin">
          Đăng nhập
        </Link>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-layout">
        <nav className="admin-nav" aria-label="Mục quản trị">
          {sections.map(([key, label]) => (
            <button
              key={key}
              type="button"
              aria-current={section === key ? 'page' : undefined}
              onClick={() => setParams({ muc: key })}
              className="admin-nav-button"
            >
              {label}
            </button>
          ))}
        </nav>
        <section className="admin-main" aria-labelledby="admin-section-title">
          <h1 id="admin-section-title" className="text-3xl font-extrabold">{title}</h1>
          {section === 'san-pham'
            ? <Products />
            : section === 'tai-khoan'
              ? <Users />
              : section === 'voucher'
                ? <Vouchers />
                : <p className="mt-4">Mục {title} đang được xây dựng.</p>}
        </section>
      </div>
    </main>
  );
}
