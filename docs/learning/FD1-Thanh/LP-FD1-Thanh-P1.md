---
tags: [learning, member/FD1, phase/P1]
---
# P1 · FD1 Thành

> P1 Catalog, tài khoản, giao diện nền (04/11–10/11) · Tổng quan của bạn: [LP-FD1-Thanh](LP-FD1-Thanh.md) · Hướng dẫn phase: [P1-FD1-Thanh](../../../phases/P1-catalog-accounts/FD1-Thanh/P1-FD1-Thanh.md) · Log của bạn: `docs/ai-logs/thanh.md`

**Mục tiêu:** Hiểu khung web: route, gọi API, đăng nhập, trang chủ có intro, catalog có bộ lọc trên URL.

Thời lượng gợi ý: cả phase (1 tuần). **Thứ tự làm:**
1. Mục 2 + bước 1 (khái niệm) · đọc issue và tiêu chí xong của task ở mục 6.
2. **Mục 6: viết test hoặc ca kiểm thử trước, rồi tự xây task PRJ** (bước 5). Kẹt quá 1 buổi: hỏi reviewer hoặc PM.
3. Khi kiểm chứng đạt: bước 2 đọc lại code của chính bạn, giải thích được từng file ở mục 1.
4. Mục 3, 4, bước 3, 4, 6, 7: kiểm hiểu biết, tình huống, luyện bảo vệ, AI-LOG.

## 1. File bạn sẽ viết hoặc sửa
1. `apps/web/src/main.tsx`
2. `apps/web/src/App.tsx`
3. `apps/web/src/lib/api.ts`
4. `apps/web/src/lib/auth.tsx`
5. `apps/web/src/pages/HomePage.tsx`
6. `apps/web/src/components/home/HomeMotion.tsx`
7. `apps/web/src/pages/CatalogPage.tsx`
8. `apps/web/src/pages/ProductPage.tsx`
9. `apps/web/src/components/SiteHeader.tsx`

## 2. Kiến thức cần nắm
| # | Khái niệm | Vì sao cần | Thấy ở đâu trong code |
|---|---|---|---|
| 1 | Component, props, `useState`, `useEffect` | Mọi trang đều dùng | mọi file `pages/` |
| 2 | React Router: `Routes`, `Link`, `useNavigate`, `useSearchParams` | Đổi trang không tải lại; bộ lọc trên URL | `App.tsx`, `CatalogPage.tsx` |
| 3 | Context cho đăng nhập (`useAuth`) | Mọi trang biết ai đang đăng nhập | `lib/auth.tsx` |
| 4 | `fetch` với `credentials: include` | Gửi cookie đăng nhập | `lib/api.ts` |
| 5 | Motion: `AnimatePresence`, `initial`, `useReducedMotion` | Chuyển trang, intro, tôn trọng người giảm chuyển động | `App.tsx`, `HomePage.tsx` |
| 6 | Biến cấp module vs state vs sessionStorage | Dữ liệu sống bao lâu | `introSeenThisLoad` |
| 7 | `key` làm component tạo lại | Header nhấp nháy (D1) | `App.tsx` |

## 3. Tiêu chí đạt (tự đánh dấu, có bằng chứng)
- [ ] Giải thích luồng tải trang Catalog: URL → state → gọi API → hiển thị.
- [ ] Giải thích vì sao intro chạy khi tải lại trang nhưng không chạy khi bấm menu.
- [ ] Giải thích lỗi `initial={false}` và cách sửa (A4).
- [ ] Giải thích vì sao header phải nằm ngoài khối có `key`.
- [ ] Giải thích `scrollbar-gutter: stable` và `100svh` sửa lỗi gì.
- [ ] Chỉ ra tất cả chỗ tôn trọng `prefers-reduced-motion`.
- [ ] Tự sửa `<a href>` thành `Link` (bài tập).

Đạt khi: mọi ô được đánh dấu **và** mỗi ô có bằng chứng trong AI-LOG hoặc PR (lệnh đã chạy, ảnh, link commit).

## 4. Lỗi hay gặp trong phần này
Đọc tình huống, **tự đoán nguyên nhân trước** rồi mới đọc lời giải.

| Vấn đề | Cách tránh | Đọc thêm |
|---|---|---|
| Video giật khi kết thúc | Hero 100svh + scrollbar-gutter. | [A3](../PITFALLS.md#a3) |
| Intro lúc có hiệu ứng lúc không | Bỏ `initial={false}`. | [A4](../PITFALLS.md#a4) |
| Khi nào xem lại intro | Biến cấp module. | [A5](../PITFALLS.md#a5) |
| Watermark | Tính vị trí theo khung. | [A6](../PITFALLS.md#a6) |
| Header nhấp nháy | Đưa ra layout chung. | [D1](../PITFALLS.md#d1) |
| Chữ thành "?" | Khôi phục chuỗi. | [D2](../PITFALLS.md#d2) |
| Dấu bị cắt | padding-top 0.22em. | [D4](../PITFALLS.md#d4) |

## 5. Lộ trình prompt (làm lần lượt, mỗi bước một phiên AI)
Mở đầu mỗi phiên bằng prompt "Khởi động phiên" trong [P1-FD1-Thanh](../../../phases/P1-catalog-accounts/FD1-Thanh/P1-FD1-Thanh.md) mục 4.1. **Không dán `.env`, mật khẩu, khóa.** Mỗi bước xong ghi một mục AI-LOG theo mã gợi ý.

### Bước 1 — Hiểu khái niệm (AI-P1-FD1-01)
```text
Tôi là Thành (FD1) trong dự án DAYORA. Giải thích lần lượt các khái niệm sau bằng ví dụ đời thường, mỗi lần MỘT khái niệm, hỏi tôi 1 câu kiểm tra rồi mới sang khái niệm tiếp theo:
1. Component, props, `useState`, `useEffect`
2. React Router: `Routes`, `Link`, `useNavigate`, `useSearchParams`
3. Context cho đăng nhập (`useAuth`)
4. `fetch` với `credentials: include`
5. Motion: `AnimatePresence`, `initial`, `useReducedMotion`
6. Biến cấp module vs state vs sessionStorage
7. `key` làm component tạo lại
Không viết code. Nếu tôi trả lời sai, giải thích lại theo cách khác.
```
Tự kiểm: đóng AI, viết lại mỗi khái niệm 1 câu bằng lời của bạn.

### Bước 2 — Đọc lại code của bạn (AI-P1-FD1-02)
Dán **từng file** theo thứ tự mục 1 (file dài thì dán từng hàm).
```text
Đây là <tên file> của DAYORA:
<dán code>
1) Tóm tắt file làm gì trong 3 câu.
2) Đi qua từng hàm: đầu vào, đầu ra, bước quan trọng; chỉ số dòng.
3) Khái niệm nào trong danh sách sau xuất hiện ở đâu: Component, props, `useState`, `useEffect`; React Router: `Routes`, `Link`, `useNavigate`, `useSearchParams`; Context cho đăng nhập (`useAuth`); `fetch` với `credentials: include`; Motion: `AnimatePresence`, `initial`, `useReducedMotion`; Biến cấp module vs state vs sessionStorage; `key` làm component tạo lại.
4) Hỏi tôi 3 câu. Chỉ khi tôi trả lời đúng mới sang file tiếp.
```
Tự kiểm: mở file trong VS Code, tìm đúng dòng AI chỉ. **AI có thể chỉ sai dòng hoặc bịa hàm**: ghi lại nếu gặp.

### Bước 3 — Dự đoán rồi thử (AI-P1-FD1-03)
Viết dự đoán **trước** khi chạy, rồi mới chạy.
```text
Tôi đổi `INTRO_SPEED` thành 2 và dự đoán <điều xảy ra>; sau đó đổi lại 1. Tôi đổi biến `introSeenThisLoad` sang `sessionStorage` và dự đoán hành vi khi tải lại trang sẽ <dự đoán>.
Đừng nói kết quả. Hãy hỏi tôi vì sao tôi dự đoán vậy, rồi hướng dẫn tôi cách chạy và cách đọc kết quả.
```
Ghi vào AI-LOG: dự đoán, kết quả thật, giải thích chỗ khác nhau.

### Bước 4 — Học từ tình huống thật (AI-P1-FD1-04)
Chọn 1 tình huống ở mục 4, dán phần **Dấu hiệu** (chưa dán lời giải).
```text
Đây là một lỗi hay gặp khi làm phần này của DAYORA:
<dán phần Dấu hiệu>
Đừng nói lời giải. Hỏi tôi từng câu gợi ý để tôi tự tìm ra nguyên nhân gốc. Sau đó tôi sẽ dán phần Nguyên nhân và Cách tránh trong tài liệu để bạn so với suy luận của tôi.
```
Ghi AI-LOG: suy luận của bạn khác lời giải thật ở đâu.

### Bước 5 — Tự xây phần của bạn (AI-P1-FD1-05, mỗi task PRJ một mục log)
Xem mục 6. AI chỉ **hướng dẫn và review**, bạn tự gõ code. Làm task PRJ trước, bài tập mở rộng sau.
```text
Tôi đang tự viết PRJ-P1-FD1-1 "Router, layout, header, footer, gọi API" của dự án DAYORA.
File tôi phải viết: apps/web/src/App.tsx; apps/web/src/components/SiteHeader.tsx, SiteFooter.tsx; apps/web/src/lib/api.ts; apps/web/src/motion.css.
1) Giúp tôi liệt kê các bước làm theo thứ tự.
Đừng viết code thay tôi. Chờ tôi làm xong mỗi bước. Khi tôi dán lỗi test hoặc git diff, chỉ ra chỗ sai và vì sao, gợi ý hướng sửa chứ không đưa code hoàn chỉnh.
```
Khi kiểm chứng đạt hoặc kẹt quá 1 buổi: ghi vào log cá nhân việc đã làm, chỗ kẹt và cách gỡ (xem [ROADMAP](../../ROADMAP.md)).

### Bước 6 — Luyện bảo vệ (AI-P1-FD1-06)
```text
Đóng vai giảng viên chấm đồ án. Phần tôi phụ trách ở P1: Hiểu khung web: route, gọi API, đăng nhập, trang chủ có intro, catalog có bộ lọc trên URL.
Hỏi tôi lần lượt (mỗi câu tôi trả lời trong 30 giây, không xem code):
1. Thêm bộ lọc "màu" vào Catalog thì cần web và API sửa gì?
2. Vì sao bộ lọc nằm trên URL?
3. Tắt hết motion cho người dùng reduced motion ở đâu?
Sau đó hỏi thêm 2 câu vặn dựa trên câu trả lời của tôi, ra 1 yêu cầu sửa code nhỏ. Chấm từng câu và nói tôi cần học lại gì.
```

### Bước 7 — Ghi nhật ký AI
Nối thêm một mục vào log cá nhân `docs/ai-logs/<tên>.md` theo [quy tắc ghi log](../../ai-logs/ai-logging-rules.md) (đủ 7 trường, có mã phiên và mã mục, chỉ nối thêm). Phần **Phản biện**, **Quyết định của nhóm**, **Người kiểm tra** phải tự viết.

## 6. Nhiệm vụ xây dựng (commit đứng tên bạn)
Quy trình chung: [ROADMAP](../../ROADMAP.md).

### PRJ-P1-FD1-1 — Router, layout, header, footer, gọi API
- **File phải viết:** `apps/web/src/App.tsx`; `apps/web/src/components/SiteHeader.tsx, SiteFooter.tsx`; `apps/web/src/lib/api.ts`; `apps/web/src/motion.css`
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** PRJ-P0-PD-1
- **Kiểm chứng:** ca kiểm thử tay trong `docs/testing/TEST-CASES.md` (QA duyệt); ảnh 1366 px và 390 px trong PR; PD duyệt theo `docs/DESIGN-SYSTEM.md`.
- **Nhánh:** `prj/p1-fd1-1` · **Reviewer:** PD Đạt
- **Các bước:**
  - [ ] 1. `lib/api.ts`: một hàm `api<T>(path, init)` duy nhất: `BASE` từ `VITE_API_URL`, `credentials: 'include'` (gửi cookie), lỗi ném `Error(body.message)` — Xong khi: gọi `api('/health')` in `{ status: 'ok' }` trong console
  - [ ] 2. `App.tsx`: `<Routes>` cho `/`, `/products`, `/products/:slug`, `/login`, `/register`, `/about`, trang 404 (trang chưa làm thì để chữ tạm) — Xong khi: gõ từng đường dẫn đều ra trang, đường dẫn lạ ra 404
  - [ ] 3. `SiteHeader.tsx`: logo, menu ngang (Sản phẩm, Tạo bộ, Về chúng tôi), nút giỏ và tài khoản; dưới 768 px thành nút menu — Xong khi: ảnh header 1366 px và 390 px trong PR, PD duyệt
  - [ ] 4. `SiteFooter.tsx` và `motion.css` (hiệu ứng dùng chung, tắt khi `prefers-reduced-motion`) — Xong khi: bật Reduce motion trong DevTools → Rendering thì không còn chuyển động
  - [ ] 5. Cuộn về đầu trang khi đổi route, bấm link nội bộ không tải lại trang — Xong khi: Network không có request tải lại `index.html` khi bấm menu

### PRJ-P1-FD1-2 — Trang chủ: intro video, chữ hiện từng từ, các section
- **File phải viết:** `apps/web/src/pages/HomePage.tsx`; `apps/web/src/components/home/`; `apps/web/src/index.css` (phần trang chủ)
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** PRJ-P1-FD1-1, PRJ-P1-BD1-2
- **Kiểm chứng:** ca kiểm thử tay trong `docs/testing/TEST-CASES.md` (QA duyệt); ảnh 1366 px và 390 px trong PR; PD duyệt theo `docs/DESIGN-SYSTEM.md`.
- **Nhánh:** `prj/p1-fd1-2` · **Reviewer:** PD Đạt
- **Các bước:**
  - [ ] 1. Vẽ sơ đồ trang chủ trước khi code: intro video toàn màn hình → chữ hiện từng từ trên khung cuối → các section — Xong khi: vẽ được thứ tự section trên giấy
  - [ ] 2. Hero: video intro (`public/`), nút Bỏ qua, phát lại khi tải lại trang nhưng không phát khi điều hướng về `/`; hero cao cố định `100svh` để không giật — Xong khi: tải lại thấy intro, bấm logo từ trang khác thì không
  - [ ] 3. `components/home/StaggeredText.tsx`: chữ hiện từng từ từ trái sang — Xong khi: quay màn hình chậm thấy từng từ hiện lần lượt
  - [ ] 4. `HomeSections.tsx`: kể chuyện 4 bước, kệ sản phẩm (gọi `GET /products`), ba chuyến đi, ưu đãi (gọi `GET /promotions`), FAQ, CTA — Xong khi: dữ liệu thật từ API của nhóm hiện đúng
  - [ ] 5. 390 px: các hàng thành vuốt ngang, không tràn ngang trang — Xong khi: `document.documentElement.scrollWidth === innerWidth` trong console
  - [ ] 6. Ảnh 1366 px và 390 px trong PR — Xong khi: PD duyệt

### PRJ-P1-FD1-3 — Danh mục: bộ lọc trái, URL, thẻ sản phẩm
- **File phải viết:** `apps/web/src/pages/CatalogPage.tsx`; `apps/web/src/components/catalog/`; `apps/web/src/lib/catalog.ts`; `apps/web/src/catalog.css` (phần catalog)
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** PRJ-P1-FD1-1, PRJ-P1-BD1-2
- **Kiểm chứng:** ca kiểm thử tay trong `docs/testing/TEST-CASES.md` (QA duyệt); ảnh 1366 px và 390 px trong PR; PD duyệt theo `docs/DESIGN-SYSTEM.md`.
- **Nhánh:** `prj/p1-fd1-3` · **Reviewer:** PD Đạt
- **Các bước:**
  - [ ] 1. `lib/catalog.ts`: kiểu `Product`, `Sku`, `Category`; `filterNames`, `catalogQuery()` đổi form/URL thành query; `formatPrice` — Xong khi: `catalogQuery(new URLSearchParams('q=thảm&sort=price_asc'))` ra chuỗi đúng
  - [ ] 2. `CatalogPage.tsx`: đọc bộ lọc từ URL (`useSearchParams`), đổi bộ lọc thì cập nhật URL, gọi `GET /products?…` — Xong khi: copy link có bộ lọc sang tab mới ra cùng kết quả
  - [ ] 3. Bộ lọc trái: nhóm hàng, tình huống, khoảng giá, chất liệu, sức chứa, cỡ + sắp xếp; dưới 1024 px gập lại — Xong khi: đủ ≥ 5 thuộc tính lọc (FR02)
  - [ ] 4. `components/catalog/ProductCard.tsx`: ảnh, tên 2 dòng, giá (giá giảm gạch giá gốc); lưới 4/3/2 cột theo màn hình — Xong khi: thẻ cùng hàng cao bằng nhau
  - [ ] 5. Trạng thái tải, rỗng ("Không có sản phẩm phù hợp"), lỗi — Xong khi: tắt API thì trang báo lỗi, không trắng

### PRJ-P1-FD1-4 — Chi tiết sản phẩm: biến thể, giá, tồn
- **File phải viết:** `apps/web/src/pages/ProductPage.tsx` (phần xem)
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** PRJ-P1-FD1-3
- **Kiểm chứng:** ca kiểm thử tay trong `docs/testing/TEST-CASES.md` (QA duyệt); ảnh 1366 px và 390 px trong PR; PD duyệt theo `docs/DESIGN-SYSTEM.md`.
- **Nhánh:** `prj/p1-fd1-4` · **Reviewer:** PD Đạt
- **Các bước:**
  - [ ] 1. `ProductPage.tsx`: lấy `slug` từ URL, gọi `GET /products/:slug`; 404 → trang "Không tìm thấy" — Xong khi: slug sai ra trang báo
  - [ ] 2. Chọn biến thể (màu/cỡ): đổi giá, ảnh và tồn khả dụng theo SKU đang chọn; SKU hết hàng thì nút mua bị khóa — Xong khi: đổi biến thể thấy giá đổi
  - [ ] 3. Số lượng: không cho vượt tồn khả dụng, không dưới 1 — Xong khi: bấm + tới giới hạn thì dừng
  - [ ] 4. Thông số + sản phẩm liên quan cùng nhóm (dùng lại `ProductCard`) — Xong khi: bấm sản phẩm liên quan sang đúng trang
  - [ ] 5. 390 px: 1 cột, không tràn ngang; ảnh 1366/390 trong PR — Xong khi: PD duyệt

### Bài tập mở rộng (sau khi xong task PRJ): Link trong menu mở rộng: `<a href>` → `Link`
- **File:** `apps/web/src/components/SiteHeader.tsx`
- **Các bước:**
  1. Tìm `<a href={href} onClick={closeDrawer}>` trong menu.
  2. Đổi sang `Link` cho route nội bộ; giữ `<a>` cho link `#...` (ví dụ "Đến nội dung chính").
  3. Mở DevTools tab Network: bấm menu không còn tải lại trang.
  4. `npm run build -w web`, `npm run lint -w web`.
- **Xong khi:** Bấm menu không tải lại trang, giỏ/đăng nhập không mất, PD duyệt.
- **Quy trình git:** nhánh `study/fd1-p1` → PR → **PD Đạt** review → merge.

## 7. Bằng chứng cần có trước khi sang phase sau
- [ ] Tối thiểu 4 mục AI-LOG thật (AI-P1-FD1-01 … AI-P1-FD1-06), mỗi mục có phần kiểm tra và tự giải thích.
- [ ] Mọi task PRJ của phase đã merge: test nghiệm thu pass, ảnh/diff đối chiếu trong PR; link PR ghi vào [LP-FD1-Thanh](LP-FD1-Thanh.md).
- [ ] Trả lời được các câu ở bước 6 không cần xem code.
- [ ] Cập nhật bảng tiến độ trong [LP-FD1-Thanh](LP-FD1-Thanh.md).
