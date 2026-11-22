import { useEffect, useRef, useState } from 'react';
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
        {tab === 'don-hang' && <p>Danh sách đơn hàng đang được xây dựng.</p>}
        {tab === 'danh-gia' && <p>Danh sách sản phẩm chờ đánh giá đang được xây dựng.</p>}
        {tab === 'ho-so' && <div aria-busy={sending} className="space-y-5">
          <dl className="space-y-4">
            <div><dt className="font-semibold">Họ và tên</dt><dd className="break-words">{user.fullName}</dd></div>
            <div><dt className="font-semibold">Email</dt><dd className="break-all">{user.email}</dd></div>
          </dl>
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
