import { useEffect, useState, type FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth, type User } from '../lib/auth';
import { getCart, previewOrder, savedVoucher, type Cart, type Preview } from '../lib/cart';
import { formatPrice } from '../lib/catalog';
import '../catalog.css';

type RecipientErrors = Partial<Record<'name' | 'phone' | 'address' | 'province', string>>;

function CheckoutForm({ user }: { user: User }) {
  const [name, setName] = useState(user.fullName);
  const [phone, setPhone] = useState(user.phone ?? '');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [isInnerHcm, setIsInnerHcm] = useState(false);
  const [errors, setErrors] = useState<RecipientErrors>({});
  const [ready, setReady] = useState(false);
  const [cart, setCart] = useState<Cart | null>(null);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [loadingCart, setLoadingCart] = useState(true);
  const [previewing, setPreviewing] = useState(false);
  const [requestError, setRequestError] = useState('');
  const voucher = savedVoucher();

  useEffect(() => {
    let active = true;
    getCart()
      .then((nextCart) => {
        if (active) setCart(nextCart);
      })
      .catch((error: unknown) => {
        if (active) setRequestError(error instanceof Error ? error.message : 'Chưa tải được giỏ hàng.');
      })
      .finally(() => {
        if (active) setLoadingCart(false);
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!cart?.items.length || !province.trim()) {
      return;
    }

    let active = true;
    const normalizedProvince = province.trim().toLocaleLowerCase('vi');
    const isHcm = ['hồ chí minh', 'tp hồ chí minh', 'thành phố hồ chí minh', 'hcm', 'tphcm'].includes(normalizedProvince);
    const zone = {
      province: province.trim(),
      district: district.trim() || '-',
      ...(isHcm ? { isInnerHcm } : {}),
    };

    Promise.resolve()
      .then(() => {
        if (!active) return null;
        setPreviewing(true);
        setRequestError('');
        return previewOrder(cart, voucher, zone);
      })
      .then((nextPreview) => {
        if (active && nextPreview) setPreview(nextPreview);
      })
      .catch((error: unknown) => {
        if (!active) return;
        setPreview(null);
        setRequestError(error instanceof Error ? error.message : 'Chưa tính được tổng tiền.');
      })
      .finally(() => {
        if (active) setPreviewing(false);
      });
    return () => { active = false; };
  }, [cart, district, isInnerHcm, province, voucher]);

  function validate() {
    const next: RecipientErrors = {};
    if (!name.trim()) next.name = 'Vui lòng nhập họ tên người nhận.';
    if (!/^(0|\+84)\d{9}$/.test(phone.replace(/\s/g, ''))) next.phone = 'Số điện thoại phải có 10 chữ số và bắt đầu bằng 0.';
    if (!address.trim()) next.address = 'Vui lòng nhập địa chỉ giao hàng.';
    if (!province.trim()) next.province = 'Vui lòng nhập tỉnh hoặc thành phố.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReady(validate());
  }

  const inputProps = (field: keyof RecipientErrors) => ({
    'aria-invalid': Boolean(errors[field]),
    'aria-describedby': errors[field] ? `checkout-${field}-error` : undefined,
  });

  return (
    <main className="checkout-page">
      <header className="checkout-heading">
        <p>DAYORA · THANH TOÁN</p>
        <h1>Thông tin người nhận</h1>
        <span>Điền thông tin giao hàng để DAYORA tính phí và tổng tiền chính xác ở bước tiếp theo.</span>
      </header>

      <div className="checkout-layout">
        <form className="checkout-form-card" onSubmit={submit} noValidate>
          <div className="checkout-section-title">
            <span>1</span>
            <div><h2>Người nhận hàng</h2><p>Thông tin dùng để liên hệ khi giao hàng.</p></div>
          </div>

          <div className="checkout-fields">
            <label className="checkout-field">
              <span>Họ và tên *</span>
              <input {...inputProps('name')} autoComplete="name" value={name} onChange={(event) => { setName(event.target.value); setReady(false); }} />
              {errors.name && <small id="checkout-name-error">{errors.name}</small>}
            </label>
            <label className="checkout-field">
              <span>Số điện thoại *</span>
              <input {...inputProps('phone')} autoComplete="tel" inputMode="tel" value={phone} onChange={(event) => { setPhone(event.target.value); setReady(false); }} placeholder="0901234567" />
              {errors.phone && <small id="checkout-phone-error">{errors.phone}</small>}
            </label>
            <label className="checkout-field checkout-field-wide">
              <span>Địa chỉ *</span>
              <input {...inputProps('address')} autoComplete="street-address" value={address} onChange={(event) => { setAddress(event.target.value); setReady(false); }} placeholder="Số nhà, tên đường, phường/xã" />
              {errors.address && <small id="checkout-address-error">{errors.address}</small>}
            </label>
            <label className="checkout-field">
              <span>Tỉnh / Thành phố *</span>
              <input {...inputProps('province')} autoComplete="address-level1" value={province} onChange={(event) => { setProvince(event.target.value); setReady(false); }} placeholder="Ví dụ: Hồ Chí Minh" />
              {errors.province && <small id="checkout-province-error">{errors.province}</small>}
            </label>
            <label className="checkout-field">
              <span>Quận / Huyện</span>
              <input autoComplete="address-level2" value={district} onChange={(event) => { setDistrict(event.target.value); setReady(false); }} placeholder="Ví dụ: Quận 1" />
            </label>
          </div>

          <label className="checkout-checkbox">
            <input type="checkbox" checked={isInnerHcm} onChange={(event) => { setIsInnerHcm(event.target.checked); setReady(false); }} />
            <span>Địa chỉ thuộc khu vực nội thành Hồ Chí Minh</span>
          </label>

          {ready && <p className="checkout-ready" role="status">Thông tin người nhận hợp lệ. Bạn đã sẵn sàng sang bước tính phí giao hàng.</p>}

          <div className="checkout-actions">
            <Link className="cart-button" to="/gio-hang">← Quay lại giỏ hàng</Link>
            <button className="cart-button cart-button-primary" type="submit">Kiểm tra thông tin</button>
          </div>
        </form>

        <aside className="checkout-sidebar">
          <section className="checkout-summary" aria-label="Tóm tắt thanh toán" aria-busy={previewing}>
            <p className="checkout-summary-eyebrow">ĐƠN HÀNG CỦA BẠN</p>
            <h2>Tóm tắt chi phí</h2>
            {requestError && <p className="checkout-preview-error" role="alert">{requestError}</p>}
            {loadingCart && <p role="status">Đang tải giỏ hàng…</p>}
            {!loadingCart && !cart?.items.length && <p>Giỏ hàng chưa có sản phẩm.</p>}
            {cart?.items.length && !province.trim() ? <p>Nhập tỉnh/thành để server tính phí giao.</p> : null}
            {previewing && <p className="checkout-previewing" role="status">Đang cập nhật chi phí…</p>}
            {preview && province.trim() && (
              <div className="checkout-price-breakdown">
                <p><span>Tạm tính</span><strong>{formatPrice(preview.subtotal)}</strong></p>
                <p><span>Giảm giá sản phẩm</span><strong>−{formatPrice(preview.saleDiscount)}</strong></p>
                <p><span>Giảm giá voucher</span><strong>−{formatPrice(preview.voucher?.discount ?? 0)}</strong></p>
                <p><span>Phí vận chuyển</span><strong>+{formatPrice(preview.shippingFee)}</strong></p>
                <p className="checkout-summary-total"><span>Tổng thanh toán</span><strong>{formatPrice(preview.total)}</strong></p>
              </div>
            )}
            {voucher && <small>Voucher đang áp dụng: <strong>{voucher}</strong></small>}
          </section>
          <section className="checkout-help">
            <p>GIAO HÀNG DAYORA</p>
            <h2>Giao đúng nơi,<br />đi đúng lúc.</h2>
            <ul>
              <li>Phí giao và tổng tiền đều do server tính.</li>
              <li>Đổi tỉnh/thành sẽ tự cập nhật chi phí.</li>
            </ul>
          </section>
        </aside>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  const { user, loading } = useAuth();
  if (loading) return <main className="checkout-page"><p role="status">Đang kiểm tra đăng nhập…</p></main>;
  if (!user) return <Navigate to="/dang-nhap?next=/thanh-toan" replace />;
  return <CheckoutForm key={user.id} user={user} />;
}
