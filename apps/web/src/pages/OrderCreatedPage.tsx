import { Link, useParams, useSearchParams } from 'react-router-dom';
import '../catalog.css';

export default function OrderCreatedPage() {
  const { id = '' } = useParams();
  const [searchParams] = useSearchParams();
  const isNew = searchParams.get('moi') === '1';

  return (
    <main className="order-success-page">
      <section className="order-success-card">
        <span className="order-success-icon" aria-hidden="true">✓</span>
        <p className="order-success-eyebrow">DAYORA · ĐẶT HÀNG THÀNH CÔNG</p>
        <h1>{isNew ? 'Đã tạo đơn thành công' : 'Thông tin đơn hàng'}</h1>
        <div className="order-success-code">
          <span>Mã đơn hàng</span>
          <strong>{id}</strong>
        </div>
        <div className="order-success-actions">
          <Link className="cart-button cart-button-primary" to="/san-pham">Tiếp tục mua sắm</Link>
          <Link className="cart-button" to="/">Về trang chủ</Link>
        </div>
      </section>
    </main>
  );
}
