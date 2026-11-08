
export default function App() {
  return (
    <main className="min-h-screen bg-paper px-4 py-8 text-left text-ink sm:px-8">
      <div className="mx-auto max-w-4xl space-y-8">

        {/* Tiêu đề trang mẫu */}
        <p className="text-center font-display text-3xl font-extrabold">
          DAYORA — UI Styleguide
        </p>

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
