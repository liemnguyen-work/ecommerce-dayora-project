import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth.tsx';
import { api } from '../lib/api';
import ProductCard from '../components/catalog/ProductCard';
import type { Product } from '../lib/catalog';

type ReviewableItem = {
  orderId: string;
  productId: string;
  product: { id: string; name: string; slug: string };
};

function ReviewForm({ item, onSubmitted }: { item: ReviewableItem; onSubmitted: (item: ReviewableItem) => void }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await api('/reviews', {
        method: 'POST',
        body: JSON.stringify({
          orderId: item.orderId,
          productId: item.productId,
          rating,
          ...(comment.trim() ? { comment: comment.trim() } : {}),
        }),
      });
      onSubmitted(item);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Chưa gửi được đánh giá.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={(event) => void submit(event)} className="space-y-4 rounded-2xl border border-leaf bg-paper p-5">
      <div>
        <h2 className="font-bold">{item.product.name}</h2>
        <Link className="text-sm underline" to={`/san-pham/${item.product.slug}`}>Xem sản phẩm</Link>
      </div>
      <label className="block font-semibold">Số sao
        <select value={rating} onChange={(event) => setRating(Number(event.target.value))} className="mt-2 block min-h-11 w-full rounded-xl border border-ink/30 bg-white px-3">
          {[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} sao</option>)}
        </select>
      </label>
      <label className="block font-semibold">Nhận xét (không bắt buộc)
        <textarea value={comment} maxLength={1000} onChange={(event) => setComment(event.target.value)} rows={3} className="mt-2 block w-full resize-y rounded-xl border border-ink/30 bg-white p-3 font-normal" />
      </label>
      {error && <p role="alert" className="rounded-xl bg-berry/10 p-3">{error}</p>}
      <button disabled={submitting} className="min-h-11 rounded-full bg-berry px-6 py-3 font-semibold text-white disabled:opacity-60" type="submit">
        {submitting ? 'Đang gửi…' : 'Gửi đánh giá'}
      </button>
    </form>
  );
}

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [loggedOut, setLoggedOut] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'viewed' | 'reviews'>('profile');
  const [viewed, setViewed] = useState<Product[]>([]);
  const [viewedLoading, setViewedLoading] = useState(false);
  const [viewedError, setViewedError] = useState('');
  const [reviewable, setReviewable] = useState<ReviewableItem[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState('');
  const [reviewedProduct, setReviewedProduct] = useState<ReviewableItem['product'] | null>(null);
  const pending = useRef(false);

  useEffect(() => {
    if (!user || activeTab !== 'viewed') return;
    let active = true;
    api<Product[]>('/me/viewed')
      .then((products) => {
        if (active) setViewed(products);
      })
      .catch((requestError: unknown) => {
        if (active) setViewedError(requestError instanceof Error ? requestError.message : 'Chưa tải được sản phẩm đã xem.');
      })
      .finally(() => {
        if (active) setViewedLoading(false);
      });
    return () => { active = false; };
  }, [activeTab, user]);

  useEffect(() => {
    if (!user || activeTab !== 'reviews') return;
    let active = true;
    api<ReviewableItem[]>('/reviews/reviewable')
      .then((items) => { if (active) setReviewable(items); })
      .catch((requestError: unknown) => {
        if (active) setReviewsError(requestError instanceof Error ? requestError.message : 'Chưa tải được sản phẩm chờ đánh giá.');
      })
      .finally(() => { if (active) setReviewsLoading(false); });
    return () => { active = false; };
  }, [activeTab, user]);

  async function handleLogout() {
    if (pending.current) return;
    pending.current = true;
    setSending(true);
    setError('');
    try {
      await logout();
      setLoggedOut(true);
    } catch {
      setError('Chưa thể đăng xuất. Vui lòng kiểm tra kết nối và thử lại.');
    } finally {
      pending.current = false;
      setSending(false);
    }
  }

  return (
    <main className="mx-auto min-h-[60vh] max-w-3xl px-4 py-10 text-ink sm:px-6">
      <h1 className="text-3xl font-extrabold">Tài khoản</h1>
      {loading ? <p role="status" className="mt-6">Đang tải…</p> : user ? <>
        <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Quản lý tài khoản">
          <button type="button" role="tab" aria-selected={activeTab === 'profile'} onClick={() => setActiveTab('profile')} className="rounded-full border border-ink px-5 py-2 font-semibold aria-selected:bg-ink aria-selected:text-paper">Hồ sơ</button>
          <button type="button" role="tab" aria-selected={activeTab === 'viewed'} onClick={() => { setViewedLoading(true); setViewedError(''); setActiveTab('viewed'); }} className="rounded-full border border-ink px-5 py-2 font-semibold aria-selected:bg-ink aria-selected:text-paper">Sản phẩm đã xem</button>
          <button type="button" role="tab" aria-selected={activeTab === 'reviews'} onClick={() => { setReviewsLoading(true); setReviewsError(''); setReviewedProduct(null); setActiveTab('reviews'); }} className="rounded-full border border-ink px-5 py-2 font-semibold aria-selected:bg-ink aria-selected:text-paper">Chờ đánh giá</button>
        </div>
        {activeTab === 'profile' ? <section role="tabpanel" aria-label="Thông tin tài khoản" aria-busy={sending} className="mt-4 space-y-5 rounded-3xl border border-ink/20 bg-paper p-5 sm:p-8">
          <dl className="space-y-4">
            <div><dt className="font-semibold">Họ và tên</dt><dd className="break-words">{user.fullName}</dd></div>
            <div><dt className="font-semibold">Email</dt><dd className="break-all">{user.email}</dd></div>
          </dl>
          {error && <p role="alert" className="rounded-xl border border-berry/30 bg-berry/10 p-3">{error}</p>}
          <button
            type="button"
            disabled={sending}
            onClick={() => { void handleLogout(); }}
            className="min-h-11 w-full rounded-full bg-ink px-6 py-3 font-semibold text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink disabled:cursor-wait disabled:opacity-60 sm:w-auto"
          >
            {sending ? 'Đang đăng xuất…' : 'Đăng xuất'}
          </button>
        </section> : activeTab === 'viewed' ? <section role="tabpanel" aria-label="Sản phẩm đã xem" aria-busy={viewedLoading} className="mt-4">
          {viewedLoading && <p role="status" className="rounded-2xl border border-leaf bg-paper p-5">Đang tải sản phẩm đã xem…</p>}
          {viewedError && <p role="alert" className="rounded-2xl border border-berry/30 bg-berry/10 p-5">{viewedError}</p>}
          {!viewedLoading && !viewedError && viewed.length === 0 && <p className="rounded-2xl border border-leaf bg-paper p-5">Bạn chưa xem sản phẩm nào.</p>}
          {!viewedLoading && !viewedError && viewed.length > 0 && <div className="catalog-grid">{viewed.map((product) => <ProductCard key={product.id} product={product} />)}</div>}
        </section> : <section role="tabpanel" aria-label="Chờ đánh giá" aria-busy={reviewsLoading} className="mt-4 space-y-4">
          {reviewsLoading && <p role="status" className="rounded-2xl border border-leaf bg-paper p-5">Đang tải sản phẩm chờ đánh giá…</p>}
          {reviewsError && <p role="alert" className="rounded-2xl border border-berry/30 bg-berry/10 p-5">{reviewsError}</p>}
          {reviewedProduct && <p role="status" className="rounded-2xl bg-leaf p-5">Đã gửi đánh giá. <Link className="font-semibold underline" to={`/san-pham/${reviewedProduct.slug}`}>Xem đánh giá công khai →</Link></p>}
          {!reviewsLoading && !reviewsError && reviewable.length === 0 && <p className="rounded-2xl border border-leaf bg-paper p-5">Bạn chưa có sản phẩm nào chờ đánh giá.</p>}
          {reviewable.map((item) => <ReviewForm key={`${item.orderId}:${item.productId}`} item={item} onSubmitted={(submitted) => {
            setReviewable((items) => items.filter((candidate) => candidate.orderId !== submitted.orderId || candidate.productId !== submitted.productId));
            setReviewedProduct(submitted.product);
          }} />)}
        </section>}
      </> : (
        <div className="mt-6 space-y-5">
          <p role="status">{loggedOut ? 'Đã đăng xuất.' : 'Bạn chưa đăng nhập.'}</p>
          <Link to="/dang-nhap?next=%2Ftai-khoan" className="inline-flex min-h-11 items-center rounded-full bg-ink px-6 py-3 font-semibold text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">Đăng nhập</Link>
        </div>
      )}
    </main>
  );
}
