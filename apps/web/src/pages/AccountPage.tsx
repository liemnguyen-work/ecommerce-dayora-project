import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../lib/auth.tsx';
import { api } from '../lib/api';
import ProductCard from '../components/catalog/ProductCard';
import type { Product } from '../lib/catalog';

type Tab = 'don-hang' | 'danh-gia' | 'ho-so' | 'da-xem';
const tabs: [Tab, string][] = [
  ['don-hang', 'Đơn hàng'], ['danh-gia', 'Chờ đánh giá'],
  ['ho-so', 'Hồ sơ'], ['da-xem', 'Đã xem'],
];

type ReviewableItem = {
  orderId: string;
  productId: string;
  product: { id: string; name: string; slug: string };
};

function ReviewForm({ item, onSubmitted }: { item: ReviewableItem; onSubmitted: (item: ReviewableItem) => void }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const locked = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (locked.current) return;
    locked.current = true;
    setSubmitting(true);
    setError('');
    try {
      await api('/reviews', {
        method: 'POST',
        body: JSON.stringify({
          orderId: item.orderId,
          productId: item.productId,
          rating,
          ...(comment.trim() ? { comment: comment.trim() } : {}),
        }),
      });
      onSubmitted(item);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Chưa gửi được đánh giá.');
    } finally {
      locked.current = false;
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={(event) => void submit(event)} className="space-y-4 rounded-2xl border border-leaf bg-paper p-5">
      <div>
        <h2 className="font-bold">{item.product.name}</h2>
        <Link className="text-sm underline" to={`/san-pham/${item.product.slug}`}>Xem sản phẩm</Link>
      </div>
      <fieldset disabled={submitting}>
        <legend className="font-semibold">Số sao</legend>
        <div className="mt-2 flex flex-wrap gap-2">{[1, 2, 3, 4, 5].map(value => (
          <label key={value} className="inline-flex min-h-11 cursor-pointer items-center gap-1 rounded-xl border border-ink/30 px-2">
            <input type="radio" name="rating" value={value} checked={rating === value} onChange={() => setRating(value)} required />
            <span aria-hidden="true">★</span><span>{value} sao</span>
          </label>
        ))}</div>
      </fieldset>
      <label className="block font-semibold">Nhận xét (không bắt buộc)
        <textarea value={comment} disabled={submitting} maxLength={1000} onChange={(event) => setComment(event.target.value)} rows={3} className="mt-2 block w-full resize-y rounded-xl border border-ink/30 bg-white p-3 font-normal" />
      </label>
      {error && <p role="alert" className="rounded-xl bg-berry/10 p-3">{error}</p>}
      <button disabled={submitting} className="min-h-11 rounded-full bg-berry px-6 py-3 font-semibold text-white disabled:opacity-60" type="submit">
        {submitting ? 'Đang gửi…' : 'Gửi đánh giá'}
      </button>
    </form>
  );
}


function useAccountLoad<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState('');
  const version = useRef(0);
  const load = useCallback(() => {
    const current = ++version.current;
    return api<T>(path).then(result => {
      if (current === version.current) { setData(result); setError(''); }
    }).catch((error: unknown) => {
      if (current === version.current) setError(error instanceof Error ? error.message : 'Chưa tải được dữ liệu.');
    });
  }, [path]);
  useEffect(() => {
    void load();
    const invalidate = () => { version.current++; };
    return invalidate;
  }, [load]);
  const reload = () => { setData(null); setError(''); return load(); };
  return { data, error, loading: data === null && !error, reload };
}

type AccountOrder = {
  id: string; code: string; createdAt: string; status: string; paymentStatus: string; total: number;
};
const orderLabels: Record<string, string> = {
  PENDING_PAYMENT: 'Chờ thanh toán', CONFIRMED: 'Đã xác nhận', CANCELLED: 'Đã hủy', COMPLETED: 'Hoàn tất',
};
const paymentLabels: Record<string, string> = {
  UNPAID: 'Chưa thanh toán', PAID: 'Đã thanh toán', FAILED: 'Thanh toán thất bại', EXPIRED: 'Hết hạn thanh toán',
};

function Orders() {
  const { data, error, loading, reload } = useAccountLoad<AccountOrder[] | { items: AccountOrder[] }>('/orders');
  const orders = Array.isArray(data) ? data : data?.items ?? [];
  if (loading) return <p role="status">Đang tải đơn hàng…</p>;
  if (error) return <div><p role="alert">{error}</p><button className="catalog-button mt-3" type="button" onClick={() => { void reload(); }}>Thử lại</button></div>;
  if (orders.length === 0) return <div className="space-y-4"><p>Bạn chưa có đơn nào.</p><Link to="/san-pham" className="inline-flex min-h-11 items-center rounded-full bg-ink px-6 py-3 font-semibold text-paper">Mua sắm ngay</Link></div>;
  return <ul className="order-list space-y-4">{orders.map(order => (
    <li key={order.id} className="space-y-3 rounded-2xl border border-leaf p-4">
      <Link to={`/don-hang/${encodeURIComponent(order.id)}`} className="inline-flex min-h-11 items-center break-all font-bold underline">Đơn #{order.code}</Link>
      <p>Ngày đặt: <time dateTime={order.createdAt}>{new Date(order.createdAt).toLocaleString('vi-VN')}</time></p>
      <div className="flex flex-wrap gap-2"><span className="rounded-full bg-leaf px-3 py-1">{orderLabels[order.status] ?? 'Chưa xác định trạng thái'}</span><span className="rounded-full border border-ink/30 px-3 py-1">{paymentLabels[order.paymentStatus] ?? 'Chưa xác định thanh toán'}</span></div>
      <p className="font-semibold">Tổng tiền: {order.total.toLocaleString('vi-VN')} đ</p>
    </li>
  ))}</ul>;
}

function Reviews() {
  const { data, error, loading, reload } = useAccountLoad<ReviewableItem[]>('/reviews/reviewable');
  const [reviewedProduct, setReviewedProduct] = useState<ReviewableItem['product'] | null>(null);
  return <div className="space-y-4" aria-busy={loading}>
    {reviewedProduct && <p role="status">Cảm ơn bạn đã đánh giá. <Link className="font-semibold underline" to={`/san-pham/${reviewedProduct.slug}`}>Xem đánh giá công khai →</Link></p>}
    {loading && <p role="status">Đang tải sản phẩm chờ đánh giá…</p>}
    {error && <div><p role="alert">{error}</p><button className="catalog-button mt-3" type="button" onClick={() => { void reload(); }}>Thử lại</button></div>}
    {!loading && !error && data?.length === 0 && <p>Bạn chưa có sản phẩm nào chờ đánh giá.</p>}
    {!loading && !error && data?.map(item => <ReviewForm key={`${item.orderId}:${item.productId}`} item={item} onSubmitted={submitted => {
      setReviewedProduct(submitted.product);
      void reload();
    }} />)}
  </div>;
}

type AccountProfile = { id: string; email: string; fullName: string; phone: string | null };

function ProfileForms({ profile }: { profile: AccountProfile }) {
  const { refreshUser } = useAuth();
  const [fullName, setFullName] = useState(profile.fullName);
  const [phone, setPhone] = useState(profile.phone ?? '');
  const [saving, setSaving] = useState(false);
  const [changing, setChanging] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [saveError, setSaveError] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const saveLocked = useRef(false);
  const passwordLocked = useRef(false);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saveLocked.current) return;
    setSaveMessage('');
    setSaveError('');
    const name = fullName.trim();
    const number = phone.trim();
    if (name.length < 2 || name.length > 100 || (number && !/^\d{9,11}$/.test(number))) {
      setSaveError('Họ tên cần từ 2–100 ký tự; số điện thoại cần 9–11 chữ số.');
      return;
    }
    saveLocked.current = true;
    setSaving(true);
    try {
      const updated = await api<AccountProfile>('/me/profile', {
        method: 'PATCH', body: JSON.stringify({ fullName: name, ...(number ? { phone: number } : {}) }),
      });
      setFullName(updated.fullName);
      setPhone(updated.phone ?? '');
      setSaveMessage('Đã lưu hồ sơ.');
      try { await refreshUser(); }
      catch { setSaveError('Hồ sơ đã lưu nhưng chưa đồng bộ được lời chào. Hãy tải lại trang.'); }
    } catch (error: unknown) {
      setSaveError(error instanceof Error ? error.message : 'Chưa lưu được hồ sơ.');
    } finally {
      saveLocked.current = false;
      setSaving(false);
    }
  }

  async function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (passwordLocked.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    passwordLocked.current = true;
    setChanging(true);
    setPasswordMessage('');
    setPasswordError('');
    try {
      await api('/me/password', { method: 'POST', body: JSON.stringify({
        currentPassword: String(data.get('currentPassword') ?? ''),
        newPassword: String(data.get('newPassword') ?? ''),
      }) });
      form.reset();
      setPasswordMessage('Đã đổi mật khẩu.');
    } catch (error: unknown) {
      setPasswordError(error instanceof Error ? error.message : 'Chưa đổi được mật khẩu.');
    } finally {
      passwordLocked.current = false;
      setChanging(false);
    }
  }

  const inputClass = 'mt-2 block min-h-11 w-full rounded-xl border border-ink/30 bg-paper px-3 py-2 font-normal disabled:opacity-60';
  const buttonClass = 'min-h-11 rounded-full bg-ink px-6 py-3 font-semibold text-paper disabled:cursor-wait disabled:opacity-60';
  return <div className="profile-grid grid gap-6 md:grid-cols-2">
    <form className="checkout-form min-w-0 space-y-4" onSubmit={event => { void save(event); }} aria-busy={saving}>
      <h2 className="text-xl font-bold">Thông tin</h2>
      <label className="block font-semibold">Email<input type="email" value={profile.email} disabled className={inputClass} /></label>
      <fieldset disabled={saving} className="space-y-4">
        <legend className="sr-only">Thông tin có thể chỉnh sửa</legend>
        <label className="block font-semibold">Họ và tên<input name="fullName" autoComplete="name" required minLength={2} maxLength={100} value={fullName} onChange={event => setFullName(event.target.value)} className={inputClass} /></label>
        <label className="block font-semibold">Số điện thoại<input type="tel" name="phone" autoComplete="tel" inputMode="numeric" pattern="[0-9]{9,11}" maxLength={11} value={phone} onChange={event => setPhone(event.target.value)} aria-describedby="profile-phone-hint" className={inputClass} /></label>
        <p id="profile-phone-hint" className="text-sm">Bỏ trống để giữ nguyên số điện thoại hiện tại.</p>
        <button type="submit" className={buttonClass}>{saving ? 'Đang lưu…' : 'Lưu hồ sơ'}</button>
      </fieldset>
      {saveMessage && <p role="status" className="text-green-800">{saveMessage}</p>}
      {saveError && <p role="alert" className="text-red-700">{saveError}</p>}
    </form>
    <form className="checkout-form min-w-0 space-y-4" onSubmit={event => { void changePassword(event); }} aria-busy={changing}>
      <h2 className="text-xl font-bold">Đổi mật khẩu</h2>
      <fieldset disabled={changing} className="space-y-4">
        <legend className="sr-only">Mật khẩu hiện tại và mật khẩu mới</legend>
        <label className="block font-semibold">Mật khẩu hiện tại<input type="password" name="currentPassword" autoComplete="current-password" required maxLength={200} className={inputClass} /></label>
        <label className="block font-semibold">Mật khẩu mới<input type="password" name="newPassword" autoComplete="new-password" required minLength={8} maxLength={128} className={inputClass} /></label>
        <button type="submit" className={buttonClass}>{changing ? 'Đang đổi…' : 'Đổi mật khẩu'}</button>
      </fieldset>
      {passwordMessage && <p role="status" className="text-green-800">{passwordMessage}</p>}
      {passwordError && <p role="alert" className="text-red-700">{passwordError}</p>}
    </form>
  </div>;
}

function Profile() {
  const { data, loading, error, reload } = useAccountLoad<AccountProfile>('/me/profile');
  if (loading) return <p role="status">Đang tải hồ sơ…</p>;
  if (error) return <div><p role="alert">{error}</p><button type="button" className="catalog-button mt-3" onClick={() => { void reload(); }}>Thử lại</button></div>;
  return data ? <ProfileForms key={data.id} profile={data} /> : null;
}

function ViewedList() {
  const [viewed, setViewed] = useState<Product[]>([]);
  const [viewedLoading, setViewedLoading] = useState(true);
  const [viewedError, setViewedError] = useState('');

  useEffect(() => {
    let active = true;
    api<Product[]>('/me/viewed')
      .then((products) => {
        if (active) setViewed(products);
      })
      .catch((requestError: unknown) => {
        if (active) setViewedError(requestError instanceof Error ? requestError.message : 'Chưa tải được sản phẩm đã xem.');
      })
      .finally(() => {
        if (active) setViewedLoading(false);
      });
    return () => { active = false; };
  }, []);

  return <div aria-busy={viewedLoading}>
    {viewedLoading && <p role="status">Đang tải sản phẩm đã xem…</p>}
    {viewedError && <p role="alert">{viewedError}</p>}
    {!viewedLoading && !viewedError && viewed.length === 0 && <p>Bạn chưa xem sản phẩm nào.</p>}
    {!viewedLoading && !viewedError && viewed.length > 0 && <div className="catalog-grid">{viewed.map(product => <ProductCard key={product.id} product={product} />)}</div>}
  </div>;
}

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [loggedOut, setLoggedOut] = useState(false);
  const [params, setParams] = useSearchParams();
  const tab = tabs.find(([key]) => key === params.get('tab'))?.[0] ?? 'don-hang';
  const pending = useRef(false);

  function selectTab(key: Tab) {
    setParams(previous => {
      const next = new URLSearchParams(previous);
      next.set('tab', key);
      return next;
    });
  }

  async function handleLogout() {
    if (pending.current) return;
    pending.current = true;
    setSending(true);
    setError('');
    try {
      await logout();
      setLoggedOut(true);
    } catch {
      setError('Chưa thể đăng xuất. Vui lòng kiểm tra kết nối và thử lại.');
    } finally {
      pending.current = false;
      setSending(false);
    }
  }

  return (
    <main className="mx-auto min-h-[60vh] max-w-3xl px-4 py-10 text-ink sm:px-6">
      <h1 className="text-3xl font-extrabold">Tài khoản</h1>
      {loading ? <p role="status" className="mt-6">Đang tải…</p> : user ? <>
        <p className="mt-4 break-words">Xin chào, {user.fullName}</p>
        <div className="chips account-tabs mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Quản lý tài khoản">
          {tabs.map(([key, label], index) => (
            <button key={key} id={`account-tab-${key}`} type="button" role="tab" aria-selected={tab === key}
              aria-controls="account-panel" tabIndex={tab === key ? 0 : -1}
              onClick={() => selectTab(key)}
              onKeyDown={event => {
                let nextIndex: number;
                if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
                else if (event.key === 'ArrowLeft') nextIndex = (index + tabs.length - 1) % tabs.length;
                else if (event.key === 'Home') nextIndex = 0;
                else if (event.key === 'End') nextIndex = tabs.length - 1;
                else return;
                event.preventDefault();
                selectTab(tabs[nextIndex][0]);
                document.getElementById(`account-tab-${tabs[nextIndex][0]}`)?.focus();
              }}
              className="min-h-11 rounded-full border border-ink px-5 py-2 font-semibold aria-selected:bg-ink aria-selected:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">{label}</button>
          ))}
        </div>
        <section id="account-panel" role="tabpanel" aria-labelledby={`account-tab-${tab}`} tabIndex={0} className="account-panel mt-4 space-y-5 rounded-3xl border border-ink/20 bg-paper p-5 sm:p-8">
        {tab === 'don-hang' && <Orders key={user.id} />}
        {tab === 'danh-gia' && <Reviews key={user.id} />}
        {tab === 'ho-so' && <div aria-busy={sending} className="space-y-5">
          <Profile key={user.id} />
          {error && <p role="alert" className="rounded-xl border border-berry/30 bg-berry/10 p-3">{error}</p>}
          <button
            type="button"
            disabled={sending}
            onClick={() => { void handleLogout(); }}
            className="min-h-11 w-full rounded-full bg-ink px-6 py-3 font-semibold text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink disabled:cursor-wait disabled:opacity-60 sm:w-auto"
          >
            {sending ? 'Đang đăng xuất…' : 'Đăng xuất'}
          </button>
        </div>}
        {tab === 'da-xem' && <ViewedList key={user.id} />}
        </section>
      </> : (
        <div className="mt-6 space-y-5">
          <p role="status">{loggedOut ? 'Đã đăng xuất.' : 'Đăng nhập để xem đơn hàng và hồ sơ.'}</p>
          <Link to="/dang-nhap?next=%2Ftai-khoan" className="inline-flex min-h-11 items-center rounded-full bg-ink px-6 py-3 font-semibold text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">Đăng nhập</Link>
        </div>
      )}
    </main>
  );
}
