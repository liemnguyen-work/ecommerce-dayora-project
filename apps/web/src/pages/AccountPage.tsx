import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth.tsx';
import { api } from '../lib/api';
import ProductCard from '../components/catalog/ProductCard';
import type { Product } from '../lib/catalog';

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [loggedOut, setLoggedOut] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'viewed'>('profile');
  const [viewed, setViewed] = useState<Product[]>([]);
  const [viewedLoading, setViewedLoading] = useState(false);
  const [viewedError, setViewedError] = useState('');
  const pending = useRef(false);

  useEffect(() => {
    if (!user || activeTab !== 'viewed') return;
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
  }, [activeTab, user]);

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
        <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Quản lý tài khoản">
          <button type="button" role="tab" aria-selected={activeTab === 'profile'} onClick={() => setActiveTab('profile')} className="rounded-full border border-ink px-5 py-2 font-semibold aria-selected:bg-ink aria-selected:text-paper">Hồ sơ</button>
          <button type="button" role="tab" aria-selected={activeTab === 'viewed'} onClick={() => { setViewedLoading(true); setViewedError(''); setActiveTab('viewed'); }} className="rounded-full border border-ink px-5 py-2 font-semibold aria-selected:bg-ink aria-selected:text-paper">Sản phẩm đã xem</button>
        </div>
        {activeTab === 'profile' ? <section role="tabpanel" aria-label="Thông tin tài khoản" aria-busy={sending} className="mt-4 space-y-5 rounded-3xl border border-ink/20 bg-paper p-5 sm:p-8">
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
        </section> : <section role="tabpanel" aria-label="Sản phẩm đã xem" aria-busy={viewedLoading} className="mt-4">
          {viewedLoading && <p role="status" className="rounded-2xl border border-leaf bg-paper p-5">Đang tải sản phẩm đã xem…</p>}
          {viewedError && <p role="alert" className="rounded-2xl border border-berry/30 bg-berry/10 p-5">{viewedError}</p>}
          {!viewedLoading && !viewedError && viewed.length === 0 && <p className="rounded-2xl border border-leaf bg-paper p-5">Bạn chưa xem sản phẩm nào.</p>}
          {!viewedLoading && !viewedError && viewed.length > 0 && <div className="catalog-grid">{viewed.map((product) => <ProductCard key={product.id} product={product} />)}</div>}
        </section>}
      </> : (
        <div className="mt-6 space-y-5">
          <p role="status">{loggedOut ? 'Đã đăng xuất.' : 'Bạn chưa đăng nhập.'}</p>
          <Link to="/dang-nhap?next=%2Ftai-khoan" className="inline-flex min-h-11 items-center rounded-full bg-ink px-6 py-3 font-semibold text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">Đăng nhập</Link>
        </div>
      )}
    </main>
  );
}
