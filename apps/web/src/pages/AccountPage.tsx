import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth.tsx';

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [loggedOut, setLoggedOut] = useState(false);
  const pending = useRef(false);

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
      {loading ? <p role="status" className="mt-6">Đang tải…</p> : user ? (
        <section aria-label="Thông tin tài khoản" aria-busy={sending} className="mt-6 space-y-5 rounded-3xl border border-ink/20 bg-paper p-5 sm:p-8">
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
        </section>
      ) : (
        <div className="mt-6 space-y-5">
          <p role="status">{loggedOut ? 'Đã đăng xuất.' : 'Bạn chưa đăng nhập.'}</p>
          <Link to="/dang-nhap?next=%2Ftai-khoan" className="inline-flex min-h-11 items-center rounded-full bg-ink px-6 py-3 font-semibold text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">Đăng nhập</Link>
        </div>
      )}
    </main>
  );
}
