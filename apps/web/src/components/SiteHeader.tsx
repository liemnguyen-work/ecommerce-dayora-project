import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navigation = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Sản phẩm', href: '/san-pham' },
  { label: 'Tạo bộ', href: '/tao-bo' },
  { label: 'Ba chuyến đi', href: '/#trips-title' },
  { label: 'Về chúng tôi', href: '/ve-chung-toi' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const drawer = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = drawer.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper text-ink shadow-sm">
      <div className="mx-auto flex min-h-18 max-w-[1440px] items-center gap-2 px-4 sm:px-6 lg:gap-6 lg:px-10">
        <Link to="/" aria-label="DAYORA — Trang chủ" className="flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
          <img src="/brand/logo-badge-128.png" alt="" className="h-10 w-10 object-contain sm:h-12 sm:w-12" />
          <span className="text-base font-extrabold tracking-[0.05em]">DAYORA</span>
        </Link>
        <nav aria-label="Điều hướng chính" className="mx-auto hidden items-center gap-0.5 md:flex lg:gap-2">
          {navigation.map(item => <NavLink key={item.href} to={item.href} end={item.href === '/'} className={({ isActive }) => `whitespace-nowrap rounded-full px-2 py-2 text-xs font-semibold transition-colors hover:bg-leaf focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:px-3 lg:text-sm ${isActive && !item.href.includes('#') ? 'bg-leaf' : ''}`}>{item.label}</NavLink>)}
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-1 md:ml-0 lg:gap-2">
          <Link to="/gio-hang" aria-label="Giỏ hàng" className="flex min-h-11 items-center gap-1.5 rounded-full px-2 text-xs font-semibold hover:bg-leaf focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:px-3 lg:text-sm">
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 4h2l2 11h10l3-8H6"/><circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/></svg><span className="hidden lg:inline">Giỏ hàng</span>
          </Link>
          <Link to="/tai-khoan" aria-label="Tài khoản" className="flex min-h-11 items-center gap-1.5 rounded-full px-2 text-xs font-semibold hover:bg-leaf focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:px-3 lg:text-sm">
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-4 3-6 7-6s7 2 7 6"/></svg><span className="hidden lg:inline">Tài khoản</span>
          </Link>
          <button type="button" aria-label="Mở menu" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(true)} className="grid min-h-11 min-w-11 place-items-center rounded-full border border-ink/20 hover:bg-leaf focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:hidden">
            <span aria-hidden="true" className="text-xl leading-none">☰</span>
          </button>
        </div>
      </div>
      <dialog ref={drawer} id="site-menu" aria-label="Menu điều hướng" onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) setOpen(false); }} className="m-0 ml-auto h-full max-h-none w-80 max-w-[85vw] border-0 bg-paper p-6 text-ink shadow-xl backdrop:bg-ink/50">
        <div className="flex items-center justify-between">
          <strong className="text-lg">Khám phá DAYORA</strong>
          <button type="button" aria-label="Đóng menu" onClick={() => setOpen(false)} className="min-h-11 min-w-11 rounded-full border border-ink/20 text-xl hover:bg-leaf focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">×</button>
        </div>
        <nav aria-label="Điều hướng di động" className="mt-6 flex flex-col gap-1 border-t border-ink/10 pt-4">
          {navigation.map(item => <Link key={item.href} to={item.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 font-semibold hover:bg-leaf focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">{item.label}</Link>)}
          <Link to="/gio-hang" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 font-semibold hover:bg-leaf focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">Giỏ hàng</Link>
          <Link to="/tai-khoan" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 font-semibold hover:bg-leaf focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">Tài khoản</Link>
        </nav>
      </dialog>
    </header>
  );
}
