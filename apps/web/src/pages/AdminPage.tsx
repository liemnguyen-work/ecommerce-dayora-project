import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../lib/auth.tsx';
import '../catalog.css';

type Section = 'tong-quan' | 'don-hang' | 'san-pham' | 'voucher' | 'khuyen-mai' | 'quy-tac' | 'tai-khoan';

const sections: [Section, string][] = [
  ['tong-quan', 'Tổng quan'],
  ['don-hang', 'Đơn hàng'],
  ['san-pham', 'Sản phẩm'],
  ['voucher', 'Voucher'],
  ['khuyen-mai', 'Khuyến mãi'],
  ['quy-tac', 'Quy tắc Kit'],
  ['tai-khoan', 'Tài khoản'],
];

export default function AdminPage() {
  const { user, loading } = useAuth();
  const [params, setParams] = useSearchParams();
  const [section, title] = sections.find(([key]) => key === params.get('muc')) ?? sections[0];

  if (loading) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-10 text-ink">
        <h1 className="text-3xl font-extrabold">Quản trị</h1>
        <p role="status" className="mt-4">Đang tải…</p>
      </main>
    );
  }

  // Chỉ mount nội dung quản trị sau khi xác nhận quyền.
  if (user?.role !== 'ADMIN') {
    return (
      <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-10 text-ink">
        <h1 className="text-3xl font-extrabold">Khu quản trị</h1>
        <p className="my-6">Chỉ tài khoản quản trị mới truy cập được trang này.</p>
        <Link className="catalog-button inline-flex min-h-11 items-center rounded-full bg-berry px-6 py-3 font-semibold text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink" to="/dang-nhap?next=%2Fadmin">
          Đăng nhập
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-10 text-ink">
      <div className="admin-layout grid gap-6 md:grid-cols-[14rem_1fr]">
        <nav className="admin-nav flex flex-col gap-2" aria-label="Mục quản trị">
          {sections.map(([key, label]) => (
            <button
              key={key}
              type="button"
              aria-current={section === key ? 'page' : undefined}
              onClick={() => setParams({ muc: key })}
              className={`min-h-11 rounded-xl px-4 py-3 text-left font-semibold hover:bg-leaf focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${section === key ? 'bg-leaf' : ''}`}
            >
              {label}
            </button>
          ))}
        </nav>
        <section className="admin-main min-w-0" aria-labelledby="admin-section-title">
          <h1 id="admin-section-title" className="text-3xl font-extrabold">{title}</h1>
          <p className="mt-4">Mục {title} đang được xây dựng.</p>
        </section>
      </div>
    </main>
  );
}
