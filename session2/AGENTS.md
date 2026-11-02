# Quy tắc AI cho thư mục session2/ (Bài tập nhóm Buổi 2: HTML5 & CSS3)

Áp dụng thêm cho mọi file trong `session2/`. Phần nào khác với `AGENTS.md` ở gốc repo thì theo file này. Hướng dẫn đầy đủ: `docs/SESSION2-GUIDE.md`.

## Phạm vi (không đi vượt)

- Chỉ HTML5 và CSS3 viết tay: Flexbox, CSS Grid, `@media`, `:hover`, `:focus-visible`, `transition`, biến CSS.
- KHÔNG: JavaScript (kể cả `<script>`, `onclick`), Bootstrap, Tailwind hay framework CSS nào, React, Vite, npm, backend, database.
- Nút mua và ô tìm kiếm chỉ là giao diện: `<button type="button">`, `<input type="search">` không có `action`.
- Công nghệ React/NestJS trong `AGENTS.md` gốc là kế hoạch các phase sau, không dùng ở Buổi 2.
- Font Be Vietnam Pro qua `<link>` Google Fonts được phép.

## Cấu trúc

- 4 trang: `index.html`, `products.html`, `product-detail.html`, `about.html`.
- Một file CSS chung `css/style.css`, chia 8 khu bằng chú thích; mỗi khu có một người sở hữu (bảng ở mục 2 của `docs/SESSION2-GUIDE.md`). Chỉ sửa khu của người đang prompt; cần đổi khu khác thì báo người sở hữu.
- Header và footer giống hệt ở 4 trang; chỉ người phụ trách header (Thành) sửa, và sửa đồng thời cả 4 trang.
- Đường dẫn tương đối (`images/product-1.jpg`, `css/style.css`). Tên file, class: chữ thường, không dấu, gạch ngang.
- Màu dùng biến trong khu 1 (`var(--mau-chinh)`…), không gõ mã màu rời.

## Cách hỗ trợ thành viên (đây là bài học, không phải dự án cần chạy nhanh)

1. Hỏi tên thành viên và bước đang làm nếu chưa biết. Đối chiếu file họ được sở hữu trong bảng phân công.
2. Giải thích trước, gợi ý sau. Ưu tiên chỉ ra thẻ/thuộc tính cần dùng và vì sao; để thành viên tự gõ. Chỉ đưa đoạn mã ngắn khi được yêu cầu rõ, kèm giải thích từng thuộc tính.
3. Không viết hộ cả trang. Không trả lời hộ 6 câu hỏi kiến thức (Bước 10) hay câu hỏi kiểm tra cuối mỗi bước; có thể hỏi gợi mở.
4. Không khẳng định đã sửa xong lỗi giao diện khi chưa kiểm trên trình duyệt ở 1366, 768, 390 px.
5. Sau mỗi việc đáng kể: nối mục vào `docs/ai-logs/<ten>.md` theo `docs/ai-logs/ai-logging-rules.md`.

## Skill dùng khi hướng dẫn

Trước khi hướng dẫn phần tương ứng, đọc file skill (Claude Code tự nạp; Codex và công cụ khác đọc file trực tiếp):

| Việc | Skill |
|---|---|
| Bố cục, màu, chữ, thẻ sản phẩm, banner, header, footer | `.claude/skills/ui-design/SKILL.md` |
| `@media`, tràn ngang, 1366/768/390 px | `.claude/skills/responsive-css/SKILL.md` |
| Hover, focus, bàn phím, tương phản, alt, semantic | `.claude/skills/hover-focus-a11y/SKILL.md` |
| Review PR hoặc tự kiểm trước khi mở PR | `.claude/skills/review-session2/SKILL.md` |

## Tên class bắt buộc (script kiểm dựa vào)

- Banner trang chủ: phần tử bao có `class="banner"`.
- Mỗi sản phẩm: `<article class="product-card">` chứa `<img>`, tên, giá dạng `149.000 ₫`, link `product-detail.html`.

## Kiểm tra trước khi báo xong
- `python tools/check-session2.py session2` không còn dòng `[LOI]` (CI chạy lại trên mỗi PR).

- `grep -rn --include=*.html --include=*.css "<script\|onclick\|bootstrap\|tailwind" session2/` không in gì.
- Mọi link giữa 4 trang mở đúng; ảnh không lỗi 404 (DevTools → Network).
- 390 px: Console `document.documentElement.scrollWidth > innerWidth` trả `false`.
