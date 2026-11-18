import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCart, removeCartItem, updateCartItem, type Cart, type CartWarning } from '../lib/cart';
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

export default function CartPage() {
  const { user, loading: authLoading } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    try {
      const nextCart = await getCart();
      setCart(nextCart);
      setError('');
    } catch (requestError) {
      setCart(null);
      setError(errorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    let active = true;
    getCart()
      .then((nextCart) => {
        if (!active) return;
        setCart(nextCart);
        setError('');
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
    setBusy(true);
    setError('');
    try {
      if (quantity > 0) await updateCartItem(id, quantity);
      else await removeCartItem(id);
      await refresh();
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

  return (
    <main className="cart-page">
      <header className="cart-heading">
        <p className="cart-eyebrow">DAYORA · CHUYẾN ĐI TRONG NGÀY</p>
        <h1>Giỏ hàng</h1>
        <p>Kiểm tra lại sản phẩm và số lượng trước khi tiếp tục.</p>
      </header>
      {error && <p className="cart-error" role="alert">{error}</p>}
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
                    <button type="button" disabled={busy} onClick={() => void change(item.id, item.quantity - 1)} aria-label={`Giảm số lượng ${productName}`}>−</button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button type="button" disabled={busy || !item.sku.inStock} onClick={() => void change(item.id, item.quantity + 1)} aria-label={`Tăng số lượng ${productName}`}>+</button>
                  </div>
                  <button className="cart-remove" type="button" disabled={busy} onClick={() => void change(item.id, 0)}>Xóa</button>
                </div>
                <strong className="cart-line-total">{formatPrice(item.lineTotal)}</strong>
              </li>
            );
          })}
        </ul>
        <aside className="cart-summary" aria-label="Tóm tắt giỏ hàng">
          <h2>Tạm tính</h2>
          <p><span>Tiền hàng</span><strong>{formatPrice(cart.subtotal)}</strong></p>
          <small>Phí giao hàng và giảm giá sẽ được xác định ở bước tiếp theo.</small>
        </aside>
      </div>
    </main>
  );
}
