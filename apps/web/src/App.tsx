
import { useEffect } from 'react';
import AccountPage from './pages/AccountPage';
import { Route, Routes, useLocation } from 'react-router-dom';
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
import CheckoutPage from './pages/CheckoutPage';
import OrderCreatedPage from './pages/OrderCreatedPage';
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
        <Route path="/thanh-toan" element={<CheckoutPage />} />
        <Route path="/don-hang/:id" element={<OrderCreatedPage />} />
        <Route path="/tai-khoan" element={<AccountPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<main className="p-8"><h1>404 - Không tìm thấy trang</h1></main>} />
      </Routes>
      <SiteFooter />
    </>
  );
}
