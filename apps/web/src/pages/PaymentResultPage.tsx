import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api } from '../lib/api';
import '../catalog.css';

interface ReturnResult {
  valid: boolean;
  orderId?: string;
  orderCode?: string;
  success: boolean;
  message: string;
}

const paymentResultError =
  'Không đọc được kết quả thanh toán. Vui lòng kiểm tra lại trạng thái trong Đơn hàng của tôi.';

export default function PaymentResultPage() {
  const { search } = useLocation();
  const [result, setResult] = useState<ReturnResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;

    api<ReturnResult>(`/payments/vnpay/return${search}`)
      .then((data) => {
        if (active) setResult(data);
      })
      .catch(() => {
        if (!active) return;
        setError(paymentResultError);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [attempt, search]);

  function retryCheck() {
    setResult(null);
    setError('');
    setLoading(true);
    setAttempt((value) => value + 1);
  }

  if (loading) {
    return (
      <main className="payment-result-page">
        <section className="payment-result-card payment-result-loading" role="status">
          <span className="payment-result-spinner" aria-hidden="true" />
          <p className="payment-result-eyebrow">DAYORA · ĐANG ĐỐI CHIẾU</p>
          <h1>Đang kiểm tra thanh toán</h1>
          <p>Vui lòng giữ nguyên trang trong giây lát.</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="payment-result-page">
        <section className="payment-result-card is-invalid" role="alert">
          <span className="payment-result-icon" aria-hidden="true">!</span>
          <p className="payment-result-eyebrow">DAYORA · CHƯA THỂ KIỂM TRA</p>
          <h1>Không thể tải kết quả</h1>
          <p className="payment-result-message">{error}</p>
          <div className="payment-result-actions">
            <button type="button" className="payment-result-primary" onClick={retryCheck}>Thử lại</button>
            <Link className="payment-result-secondary" to="/tai-khoan">Đơn hàng của tôi</Link>
          </div>
        </section>
      </main>
    );
  }

  const valid = result?.valid === true;
  const success = valid && result.success;
  const title = !valid ? 'Kết quả không hợp lệ' : success ? 'Thanh toán thành công' : 'Thanh toán chưa thành công';
  const statusClass = success ? 'is-success' : valid ? 'is-failed' : 'is-invalid';

  return (
    <main className="payment-result-page">
      <section className={`payment-result-card ${statusClass}`} aria-live="polite">
        <span className="payment-result-icon" aria-hidden="true">{success ? '✓' : '!'}</span>
        <p className="payment-result-eyebrow">DAYORA · KẾT QUẢ THANH TOÁN</p>
        <h1>{title}</h1>
        <p className="payment-result-message">{result?.message || 'DAYORA chưa nhận được kết quả từ VNPay.'}</p>

        {result?.orderCode && (
          <div className="payment-result-order">
            <span>Mã đơn hàng</span>
            <strong>{result.orderCode}</strong>
          </div>
        )}

        <p className="payment-result-note">
          Trạng thái chính thức của đơn sẽ được DAYORA đối chiếu trực tiếp với hệ thống VNPay.
        </p>

        <div className="payment-result-actions">
          {result?.orderId && (
            <Link className="payment-result-primary" to={`/don-hang/${result.orderId}`}>
              {success ? 'Xem đơn hàng' : 'Thử thanh toán lại'}
            </Link>
          )}
          <Link className="payment-result-secondary" to="/">Về trang chủ</Link>
        </div>
      </section>
    </main>
  );
}
