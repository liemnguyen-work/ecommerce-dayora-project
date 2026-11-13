
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Styleguide() {
  return (
    <main className="min-h-screen bg-paper px-4 py-8 text-left text-ink sm:px-8">
      <div className="mx-auto max-w-4xl space-y-8">

        {/* Tiêu đề trang mẫu */}
        <h1 className="text-center font-display text-3xl font-extrabold">
  DAYORA — UI Styleguide
</h1>

        {/* 1. Bảng màu DAYORA */}
        <section aria-label="Bảng màu DAYORA">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-ink bg-paper p-6 text-center">
              Paper — #FFFDF7
            </div>

            <div className="rounded-3xl bg-ink p-6 text-center text-paper">
              Ink — #23412E
            </div>

            <div className="rounded-3xl bg-butter p-6 text-center text-ink">
              Butter — #F2C14E
            </div>

            <div className="rounded-3xl bg-berry p-6 text-center text-paper">
              Berry — #C8483C
            </div>

            <div className="rounded-3xl bg-leaf p-6 text-center text-ink">
              Leaf — #DDE8C9
            </div>
          </div>
        </section>

        {/* 2. Kiểm tra font và cỡ chữ */}
        <section className="space-y-4" aria-label="Kiểm tra kiểu chữ">
          <p className="font-display text-4xl font-extrabold">
            Gói trọn cuộc vui, mở trọn hành trình
          </p>

          <p className="text-2xl font-semibold">
            Gói trọn cuộc vui, mở trọn hành trình
          </p>

          <p className="text-base font-normal">
            Gói trọn cuộc vui, mở trọn hành trình
          </p>
        </section>

        {/* 3. Nút chính Berry */}
        <section aria-label="Nút bấm mẫu">
          <button
            type="button"
            className="min-h-11 rounded-full bg-berry px-8 py-4 font-semibold text-paper transition-colors hover:bg-[#A93A30] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Tạo bộ cho chuyến đi
          </button>
        </section>

      </div>
    </main>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <main className="min-h-screen bg-paper p-8 text-ink">
      <h1>{title}</h1>
      <p>Trang đang xây dựng.</p>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Styleguide />} />
        <Route path="/san-pham" element={<Placeholder title="Sản phẩm" />} />
        <Route path="/san-pham/:slug" element={<Placeholder title="Chi tiết sản phẩm" />} />
        <Route path="/dang-nhap" element={<Placeholder title="Đăng nhập" />} />
        <Route path="/dang-ky" element={<Placeholder title="Đăng ký" />} />
        <Route path="/ve-chung-toi" element={<Placeholder title="Về chúng tôi" />} />
        <Route path="*" element={<main className="p-8"><h1>404 - Không tìm thấy trang</h1></main>} />
      </Routes>
    </BrowserRouter>
  );
}
