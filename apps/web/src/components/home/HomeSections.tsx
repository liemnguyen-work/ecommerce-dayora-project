import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../catalog/ProductCard';
import { api } from '../../lib/api';
import type { Product } from '../../lib/catalog';
import { selectFeaturedProducts } from './featured-products';
import { FaqItem } from './FaqItem';
import { faqs } from './faqs';
import './home-sections.css';

type Promotion = { id: string; title: string; imageUrl: string | null };
type Category = { id: string; code: string; name: string };
type FeaturedProduct = Product & { isFeatured: boolean };
type Result<T> = { data: T | null; loading: boolean; error: boolean };

function useHomeData<T>(path: string) {
  const [retry, setRetry] = useState(0);
  const [result, setResult] = useState<Result<T>>({ data: null, loading: true, error: false });
  useEffect(() => {
    let active = true;
    api<T>(path).then((data) => { if (active) setResult({ data, loading: false, error: false }); })
      .catch(() => { if (active) setResult({ data: null, loading: false, error: true }); });
    return () => { active = false; };
  }, [path, retry]);
  return { ...result, retry: () => { setResult({ data: null, loading: true, error: false }); setRetry((value) => value + 1); } };
}

const steps = [
  ['01', 'Chọn ngày', 'Chọn một ngày để cùng nhau ra ngoài.'],
  ['02', 'Chọn món đồ', 'Chuẩn bị những món phù hợp với chuyến đi.'],
  ['03', 'Nhận hàng gọn gàng', 'Sắp xếp đồ dùng trước khi khởi hành.'],
  ['04', 'Tận hưởng', 'Dành thời gian cho những khoảnh khắc bên nhau.'],
];
const trips = [
  { title: 'Picnic ăn nhẹ', image: '/home/trip-picnic.jpg' },
  { title: 'Hẹn hò buổi chiều', image: '/home/trip-date.jpg' },
  { title: 'Đi biển trong ngày', image: '/home/trip-beach.jpg' },
];

export default function HomeSections() {
  const products = useHomeData<{ items: FeaturedProduct[] }>('/products');
  const categories = useHomeData<Category[]>('/categories');
  const promotions = useHomeData<Promotion[]>('/promotions');
  const featured = selectFeaturedProducts(products.data?.items ?? []);

  return (
    <div className="home-sections">
      <nav className="home-section home-categories" aria-label="Nhóm hàng">
        <p className="home-kicker">KHÁM PHÁ NHÓM HÀNG</p>
        {categories.loading ? <p role="status">Đang tải nhóm hàng...</p> : categories.error ? <p role="alert">Chưa tải được nhóm hàng. <button type="button" onClick={categories.retry}>Thử lại</button></p> : !categories.data?.length ? <p>Hiện chưa có nhóm hàng.</p> : <ul className="home-category-list">{categories.data.map((category) => <li key={category.id}><Link to={`/san-pham?category=${encodeURIComponent(category.code)}`}>{category.name} <span aria-hidden="true">→</span></Link></li>)}</ul>}
      </nav>
      <section className="home-section home-story" id="story">
        <p className="home-kicker">CHUẨN BỊ THẬT NHẸ NHÀNG</p><h2>Một chuyến đi, bốn bước đơn giản.</h2>
        <div className="home-story-grid">{steps.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>
      <section className="home-section" id="products">
        <div className="home-section-head"><div><p className="home-kicker">CỬA HÀNG</p><h2>Chọn món cho chuyến đi</h2></div><Link to="/san-pham">Xem tất cả →</Link></div>
        {products.loading ? <p role="status">Đang tải sản phẩm...</p> : products.error ? <p role="alert">Chưa tải được sản phẩm. <button type="button" onClick={products.retry}>Thử lại</button></p> : !featured.length ? <p>Hiện chưa có sản phẩm nổi bật.</p> : <div className="catalog-grid" role="region" aria-label="Danh sách sản phẩm" tabIndex={0}>{featured.map((product) => <ProductCard key={product.id} product={product} />)}</div>}
      </section>
      <section className="home-section" id="trips-title">
        <p className="home-kicker">BA CHUYẾN ĐI</p><h2>Mỗi cuộc hẹn, một niềm vui.</h2>
        <div className="home-trip-grid" role="region" aria-label="Danh sách chuyến đi" tabIndex={0}>{trips.map((trip) => <article className="home-trip" key={trip.title}><img src={trip.image} alt="" loading="lazy" /><h3>{trip.title}</h3></article>)}</div>
      </section>
      <section className="home-section home-offers" id="promotions">
        <p className="home-kicker">ƯU ĐÃI</p><h2>Thêm niềm vui cho chuyến đi.</h2>
        {promotions.loading ? <p role="status">Đang tải ưu đãi...</p> : promotions.error ? <p role="alert">Chưa tải được ưu đãi. <button type="button" onClick={promotions.retry}>Thử lại</button></p> : !promotions.data?.length ? <p>Hiện chưa có ưu đãi đang áp dụng.</p> : <div className="home-offer-grid">{promotions.data.map((promotion) => <article key={promotion.id}>{promotion.imageUrl && <img src={promotion.imageUrl} alt="" loading="lazy" />}<h3>{promotion.title}</h3></article>)}</div>}
      </section>
      <section className="home-section home-faq" id="faq">
        <p className="home-kicker">CÂU HỎI THƯỜNG GẶP</p><h2>Chuẩn bị chuyến đi cùng DAYORA.</h2>
        {faqs.map((faq) => <FaqItem key={faq.question} {...faq} />)}
      </section>
      <section className="home-cta" id="cta"><p className="home-kicker">SẴN SÀNG LÊN ĐƯỜNG?</p><h2>Gói gọn đồ dùng,<br />mở trọn cuộc vui.</h2><Link to="/tao-bo">Tạo bộ cho chuyến đi →</Link></section>
    </div>
  );
}
