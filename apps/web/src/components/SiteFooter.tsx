import { Link } from 'react-router-dom';
import './SiteFooter.css';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Link to="/" className="site-footer__logo" aria-label="DAYORA — Trang chủ">
            <img src="/brand/logo-badge-128.png" alt="" /><span>DAYORA</span>
          </Link>
          <p className="site-footer__slogan">Gói gọn đồ dùng,<br />mở trọn cuộc vui.</p>
          <p className="site-footer__description">Cùng DAYORA chuẩn bị cho những chuyến đi trong ngày.</p>
        </div>
        <div className="site-footer__navigation">
          <nav aria-label="Khám phá DAYORA">
            <h2>Khám phá</h2>
            <ul>
              <li><Link to="/">Trang chủ</Link></li>
              <li><Link to="/san-pham">Sản phẩm</Link></li>
              <li><Link to="/tao-bo">Tạo bộ</Link></li>
            </ul>
          </nav>
          <nav aria-label="Thông tin DAYORA">
            <h2>Thông tin</h2>
            <ul>
              <li><Link to="/ve-chung-toi">Về chúng tôi</Link></li>
              <li><Link to="/gio-hang">Giỏ hàng</Link></li>
              <li><Link to="/tai-khoan">Tài khoản</Link></li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} DAYORA. Mọi quyền được bảo lưu.</span>
        <span>Cho những chuyến đi thật trọn vẹn.</span>
      </div>
    </footer>
  );
}
