/* eslint-disable react-refresh/only-export-components -- issue yêu cầu export bảng nhãn trạng thái từ OrderPage */
import { useCallback, useEffect, useState } from 'react';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../lib/auth';
import { formatPrice } from '../lib/catalog';
import '../catalog.css';

type OrderStatus = 'PENDING_PAYMENT' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
type PaymentStatus = 'UNPAID' | 'PAID' | 'FAILED' | 'EXPIRED';
type ShippingStatus = 'NOT_SHIPPED' | 'PREPARING' | 'SHIPPING' | 'DELIVERED' | 'RETURNED';

export interface OrderItem {
  id: string;
  productName: string;
  skuCode: string;
  colorSnapshot?: string | null;
  unitSnapshot?: string | null;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface Order {
  id: string;
  code: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingStatus: ShippingStatus;
  recipientName: string;
  recipientPhone: string;
  address: string;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  voucherCode?: string | null;
  items: OrderItem[];
}

export const statusLabel: Record<Order['status'], string> = {
  PENDING_PAYMENT: 'Chờ thanh toán',
  CONFIRMED: 'Đã xác nhận',
  CANCELLED: 'Đã hủy',
  COMPLETED: 'Hoàn tất',
};

export const paymentLabel: Record<Order['paymentStatus'], string> = {
  UNPAID: 'Chưa thanh toán',
  PAID: 'Đã thanh toán',
  FAILED: 'Thanh toán lỗi',
  EXPIRED: 'Quá hạn thanh toán',
};

const shippingSteps: [Order['shippingStatus'], string][] = [
  ['NOT_SHIPPED', 'Chờ xử lý'],
  ['PREPARING', 'Đang chuẩn bị'],
  ['SHIPPING', 'Đang giao'],
  ['DELIVERED', 'Đã giao'],
];

const orderNotFoundMessage =
  'Không tìm thấy đơn hàng. Đơn có thể không tồn tại hoặc bạn không có quyền xem đơn này.';

function getResponseStatus(error: unknown) {
  if (!error || typeof error !== 'object' || !('body' in error)) return undefined;
  const body = error.body;
  if (!body || typeof body !== 'object' || !('statusCode' in body)) return undefined;
  return typeof body.statusCode === 'number' ? body.statusCode : undefined;
}

function OrderDetails({ id }: { id: string }) {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [error, setError] = useState('');
  const [missingOrder, setMissingOrder] = useState(false);

  const load = useCallback(async () => {
    if (!id) {
      setError('Mã đơn hàng không hợp lệ.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    setMissingOrder(false);
    try {
      setOrder(await api<Order>(`/orders/${encodeURIComponent(id)}`));
    } catch (requestError) {
      setOrder(null);
      const status = getResponseStatus(requestError);
      if (status === 403 || status === 404) {
        setMissingOrder(true);
        setError(orderNotFoundMessage);
      } else {
        setError(requestError instanceof Error ? requestError.message : 'Chưa tải được đơn hàng.');
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  async function pay() {
    setBusy(true);
    setError('');
    try {
      const { paymentUrl } = await api<{ paymentUrl: string }>(`/payments/vnpay/${encodeURIComponent(id)}`, {
        method: 'POST',
      });
      if (!paymentUrl) throw new Error('Chưa nhận được đường dẫn thanh toán VNPay.');
      window.location.assign(paymentUrl);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Chưa tạo được thanh toán.');
      setBusy(false);
    }
  }

  async function confirmCancel() {
    setBusy(true);
    setError('');
    try {
      await api(`/orders/${encodeURIComponent(id)}/cancel`, { method: 'POST' });
      setCancelDialogOpen(false);
      await load();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Chưa hủy được đơn.');
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    let active = true;
    api<Order>(`/orders/${encodeURIComponent(id)}`)
      .then((nextOrder) => {
        if (active) setOrder(nextOrder);
      })
      .catch((requestError: unknown) => {
        if (!active) return;
        setOrder(null);
        const status = getResponseStatus(requestError);
        if (status === 403 || status === 404) {
          setMissingOrder(true);
          setError(orderNotFoundMessage);
        } else {
          setError(requestError instanceof Error ? requestError.message : 'Chưa tải được đơn hàng.');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [id]);

  if (loading) return <main className="order-page"><p className="order-state" role="status">Đang tải thông tin đơn hàng…</p></main>;

  if (!order) {
    return (
      <main className="order-page">
        <section className="order-state order-state-error" role="alert">
          <p className="order-eyebrow">DAYORA · ĐƠN HÀNG</p>
          <h1>{missingOrder ? 'Không tìm thấy đơn hàng' : 'Chưa thể hiển thị đơn hàng'}</h1>
          <p>{error || 'Không tìm thấy đơn hàng.'}</p>
          <div className="order-state-actions">
            {!missingOrder && <button className="cart-button cart-button-primary" type="button" onClick={() => void load()}>Thử lại</button>}
            <Link className="cart-button" to="/tai-khoan">Về tài khoản</Link>
          </div>
        </section>
      </main>
    );
  }

  const stepIndex = shippingSteps.findIndex(([status]) => status === order.shippingStatus);
  const isStopped = order.status === 'CANCELLED' || order.shippingStatus === 'RETURNED';

  return (
    <main className="order-page">
      <header className="order-heading">
        <div>
          <p className="order-eyebrow">DAYORA · THEO DÕI ĐƠN HÀNG</p>
          <h1>Chi tiết đơn hàng</h1>
          <p>Mã đơn <strong>{order.code}</strong></p>
        </div>
        <div className="order-badges" aria-label="Trạng thái đơn hàng">
          <span>{statusLabel[order.status]}</span>
          <span>{paymentLabel[order.paymentStatus]}</span>
        </div>
      </header>

      {searchParams.get('moi') === '1' && <p className="order-new-notice" role="status">Đã tạo đơn thành công. DAYORA đang giữ hàng cho bạn.</p>}

      {error && <p className="order-action-error" role="alert">{error}</p>}

      {order.status === 'PENDING_PAYMENT' && order.paymentStatus === 'UNPAID' && (
        <section className="order-actions" aria-label="Thao tác đơn hàng">
          <div>
            <strong>Hoàn tất đơn hàng của bạn</strong>
            <span>Thanh toán trong thời gian giữ hàng hoặc hủy để trả sản phẩm về kho.</span>
          </div>
          <div className="order-action-buttons">
            <button className="catalog-button order-pay-button" type="button" disabled={busy} onClick={() => void pay()}>
              {busy ? 'Đang xử lý…' : 'Thanh toán qua VNPay'}
            </button>
            <button className="catalog-button order-cancel-button" type="button" disabled={busy} onClick={() => setCancelDialogOpen(true)}>
              Hủy đơn
            </button>
          </div>
        </section>
      )}

      {cancelDialogOpen && (
        <div className="order-dialog-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget && !busy) setCancelDialogOpen(false);
        }}>
          <section className="order-dialog" role="dialog" aria-modal="true" aria-labelledby="cancel-dialog-title" aria-describedby="cancel-dialog-description">
            <span className="order-dialog-icon" aria-hidden="true">!</span>
            <p className="order-eyebrow">XÁC NHẬN HỦY ĐƠN</p>
            <h2 id="cancel-dialog-title">Bạn muốn hủy đơn này?</h2>
            <p id="cancel-dialog-description">Các sản phẩm đang giữ sẽ được trả lại kho. Thao tác này không thể hoàn tác.</p>
            <div className="order-dialog-actions">
              <button className="catalog-button order-dialog-back" type="button" disabled={busy} onClick={() => setCancelDialogOpen(false)}>Giữ lại đơn</button>
              <button className="catalog-button order-dialog-confirm" type="button" disabled={busy} onClick={() => void confirmCancel()}>
                {busy ? 'Đang hủy…' : 'Xác nhận hủy'}
              </button>
            </div>
          </section>
        </div>
      )}

      <section className="order-card order-progress" aria-labelledby="shipping-title">
        <div className="order-section-heading"><p className="order-eyebrow">HÀNH TRÌNH ĐƠN HÀNG</p><h2 id="shipping-title">Tiến trình giao hàng</h2></div>
        {isStopped && <p className="order-progress-note">{order.status === 'CANCELLED' ? 'Đơn hàng đã được hủy.' : 'Đơn hàng đã được hoàn trả.'}</p>}
        <ol className="order-timeline">
          {shippingSteps.map(([status, label], index) => {
            const reached = !isStopped && index <= stepIndex;
            const current = !isStopped && index === stepIndex;
            return <li className={reached ? 'is-reached' : ''} aria-current={current ? 'step' : undefined} key={status}><span aria-hidden="true">{reached ? '✓' : index + 1}</span><strong>{label}</strong></li>;
          })}
        </ol>
      </section>

      <div className="order-layout">
        <section className="order-card order-items" aria-labelledby="items-title">
          <div className="order-section-heading"><p className="order-eyebrow">SẢN PHẨM</p><h2 id="items-title">Các món trong đơn</h2></div>
          <div className="order-item-list">
            {order.items.map((item) => (
              <article className="order-item" key={item.id}>
                <div><h3>{item.productName}</h3><p>{[item.colorSnapshot, item.unitSnapshot, item.skuCode].filter(Boolean).join(' · ')}</p><small>{formatPrice(item.unitPrice)} × {item.quantity}</small></div>
                <strong>{formatPrice(item.lineTotal)}</strong>
              </article>
            ))}
          </div>
        </section>

        <aside className="order-sidebar">
          <section className="order-card order-recipient" aria-labelledby="recipient-title">
            <div className="order-section-heading"><p className="order-eyebrow">NGƯỜI NHẬN</p><h2 id="recipient-title">Thông tin giao hàng</h2></div>
            <dl><div><dt>Họ và tên</dt><dd>{order.recipientName}</dd></div><div><dt>Số điện thoại</dt><dd>{order.recipientPhone}</dd></div><div><dt>Địa chỉ</dt><dd>{order.address}</dd></div></dl>
          </section>

          <section className="order-card order-summary" aria-labelledby="summary-title">
            <div className="order-section-heading"><p className="order-eyebrow">THANH TOÁN</p><h2 id="summary-title">Tổng đơn hàng</h2></div>
            <dl>
              <div><dt>Tạm tính</dt><dd>{formatPrice(order.subtotal)}</dd></div>
              <div><dt>Giảm giá</dt><dd>−{formatPrice(order.discount)}</dd></div>
              <div><dt>Phí vận chuyển</dt><dd>+{formatPrice(order.shippingFee)}</dd></div>
              {order.voucherCode && <div><dt>Voucher</dt><dd>{order.voucherCode}</dd></div>}
              <div className="order-total"><dt>Tổng cộng</dt><dd>{formatPrice(order.total)}</dd></div>
            </dl>
          </section>
        </aside>
      </div>
    </main>
  );
}

export default function OrderPage() {
  const { id = '' } = useParams();
  const { user, loading } = useAuth();
  if (loading) return <main className="order-page"><p className="order-state" role="status">Đang kiểm tra đăng nhập…</p></main>;
  if (!user) return <Navigate to={`/dang-nhap?next=${encodeURIComponent(`/don-hang/${id}`)}`} replace />;
  return <OrderDetails id={id} />;
}
