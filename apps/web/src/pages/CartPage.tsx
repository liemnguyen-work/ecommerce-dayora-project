import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getCart,
  previewOrder,
  removeCartItem,
  savedVoucher,
  saveVoucher,
  updateCartItem,
  type Cart,
  type CartWarning,
  type Preview,
} from '../lib/cart';
import { useAuth } from '../lib/auth';
import { formatPrice } from '../lib/catalog';
import '../catalog.css';

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Không thể cập nhật giỏ hàng.';
}

function warningLabel(warning: CartWarning | undefined): string | null {
  if (warning?.type === 'OUT_OF_STOCK') return 'Sản phẩm hiện đã hết hàng.';
  if (warning?.type === 'INSUFFICIENT_STOCK') return 'Số lượng trong giỏ vượt tồn kho khả dụng.';
  return null;
}

async function cartWithPreview(code: string) {
  const nextCart = await getCart();
  if (!nextCart.items.length) return { nextCart, nextPreview: null, previewError: null };
  try {
    return {
      nextCart,
      nextPreview: await previewOrder(nextCart, code),
      previewError: null,
    };
  } catch (previewError) {
    return { nextCart, nextPreview: null, previewError };
  }
}

export default function CartPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [voucher, setVoucher] = useState(savedVoucher);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [pendingRemoval, setPendingRemoval] = useState<{ id: string; productName: string } | null>(null);
  const removeDialogRef = useRef<HTMLDialogElement>(null);

  const refresh = useCallback(async (code = voucher) => {
    try {
      const { nextCart, nextPreview, previewError } = await cartWithPreview(code);
      setCart(nextCart);
      setPreview(nextPreview);
      setError(previewError ? errorMessage(previewError) : '');
    } catch (requestError) {
      setCart(null);
      setError(errorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, [voucher]);

  useEffect(() => {
    if (!user) return;

    let active = true;
    cartWithPreview(savedVoucher())
      .then(({ nextCart, nextPreview, previewError }) => {
        if (!active) return;
        setCart(nextCart);
        setPreview(nextPreview);
        setError(previewError ? errorMessage(previewError) : '');
      })
      .catch((requestError: unknown) => {
        if (!active) return;
        setCart(null);
        setError(errorMessage(requestError));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [user]);

  async function change(id: string, quantity: number) {
    if (quantity < 1) return;
    setBusy(true);
    setError('');
    try {
      await updateCartItem(id, quantity);
      await refresh(voucher);
    } catch (requestError) {
      setError(errorMessage(requestError));
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    setBusy(true);
    setError('');
    try {
      await removeCartItem(id);
      await refresh(voucher);
    } catch (requestError) {
      setError(errorMessage(requestError));
    } finally {
      setBusy(false);
    }
  }

  function askBeforeRemoving(id: string, productName: string) {
    setPendingRemoval({ id, productName });
    removeDialogRef.current?.showModal();
  }

  function closeRemoveDialog() {
    removeDialogRef.current?.close();
  }

  async function confirmRemoval() {
    if (!pendingRemoval) return;
    const id = pendingRemoval.id;
    closeRemoveDialog();
    await remove(id);
  }

  async function applyVoucher() {
    if (!cart) return;
    const code = voucher.trim().toUpperCase();
    setVoucher(code);
    saveVoucher(code);
    setBusy(true);
    setError('');
    try {
      setPreview(await previewOrder(cart, code));
    } catch (requestError) {
      setError(errorMessage(requestError));
    } finally {
      setBusy(false);
    }
  }

  function retry() {
    setLoading(true);
    setError('');
    void refresh();
  }

  if (authLoading) return <main className="cart-page"><p role="status">Đang kiểm tra đăng nhập…</p></main>;

  if (!user) {
    return (
      <main className="cart-page page-empty">
        <p className="cart-eyebrow">DAYORA · GIỎ HÀNG</p>
        <h1>Đăng nhập để xem giỏ hàng</h1>
        <p>Giỏ hàng được lưu theo tài khoản để bạn tiếp tục trên mọi thiết bị.</p>
        <div className="cart-empty-actions">
          <Link className="cart-button cart-button-primary" to="/dang-nhap?next=/gio-hang">Đăng nhập</Link>
          <Link className="cart-button" to="/san-pham">Xem sản phẩm</Link>
        </div>
      </main>
    );
  }

  if (loading) return <main className="cart-page"><p role="status">Đang tải giỏ hàng…</p></main>;

  if (error && !cart) {
    return (
      <main className="cart-page page-empty">
        <h1>Chưa tải được giỏ hàng</h1>
        <p role="alert">{error}</p>
        <button className="cart-button cart-button-primary" type="button" onClick={retry}>Thử lại</button>
      </main>
    );
  }

  if (!cart?.items.length) {
    return (
      <main className="cart-page page-empty">
        <p className="cart-eyebrow">DAYORA · GIỎ HÀNG</p>
        <h1>Giỏ hàng đang trống</h1>
        <p>Chọn vài món phù hợp để chuyến đi trong ngày thêm trọn vẹn.</p>
        <div className="cart-empty-actions">
          <Link className="cart-button cart-button-primary" to="/san-pham">Xem sản phẩm</Link>
          <Link className="cart-button" to="/tao-bo">Tạo bộ cho chuyến đi</Link>
        </div>
      </main>
    );
  }

  const hasOutOfStock = cart.warnings.some((warning) => warning.type === 'OUT_OF_STOCK');

  return (
    <main className="cart-page">
      <header className="cart-heading">
        <p className="cart-eyebrow">DAYORA · CHUYẾN ĐI TRONG NGÀY</p>
        <h1>Giỏ hàng</h1>
        <p>Kiểm tra lại sản phẩm và số lượng trước khi tiếp tục.</p>
      </header>
      {error && <p className="cart-error" role="alert">{error}</p>}
      {hasOutOfStock && (
        <p className="cart-stock-alert" role="alert">
          Giỏ hàng có sản phẩm đã hết hàng. Vui lòng xóa hoặc điều chỉnh sản phẩm trước khi thanh toán.
        </p>
      )}
      <div className="cart-layout">
        <ul className="cart-lines" aria-busy={busy}>
          {cart.items.map((item) => {
            const warning = warningLabel(cart.warnings.find((entry) => entry.skuId === item.sku.id));
            const productName = item.sku.product.name;
            const productUrl = `/san-pham/${encodeURIComponent(item.sku.product.slug)}`;
            return (
              <li className="cart-line" key={item.id}>
                <Link className="cart-line-image" to={productUrl}>
                  {item.sku.imageUrl ? <img src={item.sku.imageUrl} alt={productName} /> : <span aria-hidden="true">DAYORA</span>}
                </Link>
                <div className="cart-line-info">
                  <Link className="cart-line-name" to={productUrl}>{productName}</Link>
                  <p>Màu: {item.sku.color}</p>
                  <p>Đơn giá: {formatPrice(item.sku.effectivePrice)}</p>
                  {warning && <p className="cart-warning" role="status">{warning}</p>}
                </div>
                <div className="cart-line-actions">
                  <div className="product-qty" aria-label={`Số lượng ${productName}`}>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => item.quantity === 1
                        ? askBeforeRemoving(item.id, productName)
                        : void change(item.id, item.quantity - 1)}
                      aria-label={`Giảm số lượng ${productName}`}
                    >−</button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button type="button" disabled={busy || !item.sku.inStock} onClick={() => void change(item.id, item.quantity + 1)} aria-label={`Tăng số lượng ${productName}`}>+</button>
                  </div>
                  <button className="cart-remove" type="button" disabled={busy} onClick={() => void remove(item.id)}>Xóa</button>
                </div>
                <strong className="cart-line-total">{formatPrice(item.lineTotal)}</strong>
              </li>
            );
          })}
        </ul>
        <aside className="cart-summary" aria-label="Tóm tắt giỏ hàng">
          <h2>Tạm tính</h2>
          <form className="voucher-form" onSubmit={(event) => { event.preventDefault(); void applyVoucher(); }}>
            <label htmlFor="voucher-code">Mã voucher</label>
            <div>
              <input id="voucher-code" value={voucher} onChange={(event) => setVoucher(event.target.value)} placeholder="Ví dụ: DAYORA10" autoComplete="off" />
              <button type="submit" disabled={busy}>Áp dụng</button>
            </div>
          </form>
          {preview?.voucher && (
            <p className={preview.voucher.valid ? 'voucher-result voucher-result-valid' : 'voucher-result voucher-result-invalid'} role="status">
              {preview.voucher.valid
                ? <><strong>Áp dụng thành công</strong><span>Mã {preview.voucher.code ?? voucher}{preview.voucher.percentOff != null ? ` giảm ${preview.voucher.percentOff}%` : ''} · Tiết kiệm {formatPrice(preview.voucher.discount ?? 0)}</span></>
                : preview.voucher.reason}
            </p>
          )}
          <div className="cart-price-breakdown">
            <p><span>Tiền hàng</span><strong>{formatPrice(preview?.subtotal ?? cart.subtotal)}</strong></p>
            {preview?.voucher?.valid && <p className="cart-discount"><span>Voucher {preview.voucher.percentOff != null ? `(${preview.voucher.percentOff}%)` : ''}</span><strong>−{formatPrice(preview.voucher.discount ?? 0)}</strong></p>}
            {preview && <p><span>Phí giao {preview.shippingIsEstimate ? 'tạm tính' : ''}</span><strong>+{formatPrice(preview.shippingFee)}</strong></p>}
          </div>
          <p className="cart-summary-total"><span>Tổng dự kiến</span><strong>{formatPrice(preview?.total ?? cart.subtotal)}</strong></p>
          <small>Đã gồm phí giao tạm tính. Giá trị được server kiểm tra và tính toán.</small>
          <button
            type="button"
            className="catalog-button cta-glow cart-checkout"
            disabled={busy || hasOutOfStock}
            onClick={() => navigate('/thanh-toan')}
          >
            Thanh toán {preview ? formatPrice(preview.total) : ''} <span aria-hidden="true">→</span>
          </button>
        </aside>
      </div>
      <dialog
        ref={removeDialogRef}
        className="cart-remove-dialog"
        aria-label="Xoá sản phẩm khỏi giỏ?"
        onClose={() => setPendingRemoval(null)}
      >
        <div className="cart-remove-dialog-content">
          <p className="cart-eyebrow">DAYORA · GIỎ HÀNG</p>
          <h2>Xoá sản phẩm khỏi giỏ?</h2>
          <p>
            Bạn đang giảm số lượng <strong>{pendingRemoval?.productName ?? 'sản phẩm'}</strong> về 0.
            Bạn có chắc muốn xoá món này không?
          </p>
          <div className="cart-remove-dialog-actions">
            <button className="cart-button cart-button-keep" type="button" autoFocus onClick={closeRemoveDialog}>Giữ lại</button>
            <button className="cart-button cart-button-danger" type="button" onClick={() => void confirmRemoval()}>Xoá</button>
          </div>
        </div>
      </dialog>
    </main>
  );
}
