
import { useEffect } from 'react';
import AccountPage from './pages/AccountPage';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import AdminPage from './pages/AdminPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import './motion.css';

function ScrollOnNavigation() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    let id: string;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }

    let frame = 0;
    let attempts = 0;
    const findTarget = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView();
      } else if (++attempts < 30) {
        frame = requestAnimationFrame(findTarget);
      }
    };
    frame = requestAnimationFrame(findTarget);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

function Placeholder({ title }: { title: string }) {
  return (
    <main className="min-h-screen bg-paper p-8 text-ink">
      <h1>{title}</h1>
      <p>Trang đang xây dựng.</p>
    </main>
  );
}

function CheckoutHandoff() {
  return (
    <main className="checkout-handoff">
      <section className="checkout-handoff-card">
        <p className="checkout-handoff-eyebrow">DAYORA · THANH TOÁN AN TOÀN</p>
        <h1>Tiếp tục chuyến đi của bạn</h1>
        <p className="checkout-handoff-lead">
          Giỏ hàng đã sẵn sàng. Bước nhập địa chỉ giao hàng và xác nhận đơn sẽ được hoàn thiện ở luồng checkout tiếp theo.
        </p>
        <ol className="checkout-steps" aria-label="Tiến trình đặt hàng">
          <li className="is-complete"><span>1</span><strong>Giỏ hàng</strong></li>
          <li className="is-current"><span>2</span><strong>Thanh toán</strong></li>
          <li><span>3</span><strong>Hoàn tất</strong></li>
        </ol>
        <div className="checkout-handoff-note">
          <span aria-hidden="true">✓</span>
          <p><strong>Thông tin giỏ đã được giữ lại</strong><small>Bạn có thể quay lại điều chỉnh sản phẩm mà không mất voucher đã nhập.</small></p>
        </div>
        <div className="checkout-handoff-actions">
          <Link className="cart-button cart-button-primary" to="/gio-hang">← Quay lại giỏ hàng</Link>
          <Link className="cart-button" to="/san-pham">Tiếp tục mua sắm</Link>
        </div>
      </section>
      <aside className="checkout-handoff-visual" aria-hidden="true">
        <span>DAYORA</span>
        <strong>Chuyến đi trong ngày,<br />chuẩn bị thật nhẹ nhàng.</strong>
      </aside>
    </main>
  );
}

export default function App() {
  return (
    <>
      <ScrollOnNavigation />
      <SiteHeader />
      <Routes>
<Route path="/" element={<HomePage />} />
        <Route path="/san-pham" element={<CatalogPage />} />
        <Route path="/san-pham/:slug" element={<ProductPage />} />
        <Route path="/dang-nhap" element={<LoginPage />} />
        <Route path="/dang-ky" element={<RegisterPage />} />
        <Route path="/ve-chung-toi" element={<AboutPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/tao-bo" element={<Placeholder title="Tạo bộ" />} />
        <Route path="/gio-hang" element={<CartPage />} />
        <Route path="/thanh-toan" element={<CheckoutHandoff />} />
        <Route path="/tai-khoan" element={<AccountPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<main className="p-8"><h1>404 - Không tìm thấy trang</h1></main>} />
      </Routes>
      <SiteFooter />
    </>
  );
}
