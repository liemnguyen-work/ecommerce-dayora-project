---
name: responsive-css
description: Dùng khi trang Buổi 2 vỡ bố cục, tràn ngang hoặc cần chỉnh cho máy tính 1366 px, máy tính bảng 768 px, điện thoại 390 px; hoặc khi thành viên hỏi về @media, Grid/Flexbox co giãn, ảnh co theo màn hình.
---

# Responsive bằng CSS thuần

## 1. Mốc màn hình của nhóm

| Mốc | `@media` | Lưới sản phẩm | Ghi chú |
|---|---|---|---|
| Máy tính 1366 px | (mặc định) | 4 cột | Menu ngang đầy đủ |
| ≤ 1024 px | `@media (max-width: 1024px)` | 3 cột | Thu ô tìm kiếm |
| Máy tính bảng ≤ 768 px | `@media (max-width: 768px)` | 2 cột | Trang chi tiết và giới thiệu về 1 cột; ô tìm kiếm xuống hàng riêng |
| Điện thoại ≤ 480 px (thử ở 390) | `@media (max-width: 480px)` | 2 cột hẹp hoặc 1 cột | Khoảng cách section 40 px; nút rộng đủ ngón tay (≥ 44 px) |

Tất cả `@media` đặt trong khu 7 của `style.css`, xếp từ lớn tới nhỏ.

## 2. Kỹ thuật cơ bản (giải thích, ví dụ ngắn)

- Lưới đổi số cột: chỉ đổi `grid-template-columns` trong `@media`, giữ nguyên HTML.
- Hai cột thành một: `grid-template-columns: 1fr` trong `@media (max-width: 768px)`.
- Cỡ chữ tự co: `font-size: clamp(28px, 4vw, 44px)` (nhỏ nhất, theo màn hình, lớn nhất).
- Khung nội dung: `width: min(100% - 32px, 1200px)` thay cho `width: 1200px` (nguyên nhân tràn ngang hay gặp nhất).
- Ảnh: `img { max-width: 100%; height: auto; }`.
- Header nhiều thành phần: `flex-wrap: wrap` để xuống hàng thay vì chồng lên nhau.

## 3. Quy trình tìm lỗi tràn ngang (làm theo thứ tự)

1. DevTools → Ctrl+Shift+M → nhập 390. Kéo ngang được là có tràn.
2. Console: `document.documentElement.scrollWidth > innerWidth` → `true` là tràn.
3. Tìm thủ phạm, dán vào Console:
   ```js
   [...document.querySelectorAll('*')].filter(e => e.getBoundingClientRect().right > innerWidth).map(e => e.className || e.tagName)
   ```
   (Chỉ chạy trong Console để tìm lỗi, không đưa JavaScript vào bài.)
4. Thủ phạm thường gặp: `width` cố định bằng px, ảnh không có `max-width: 100%`, `grid-template-columns` cố định nhiều cột, chữ dài không ngắt (`overflow-wrap: anywhere`), `margin` âm.
5. Sửa trong khu của người sở hữu thành phần đó (hoặc báo họ), rồi kiểm lại cả 1366, 768, 390.

## 4. Cách hướng dẫn

- Hỏi ảnh chụp hoặc mô tả lỗi, đọc CSS liên quan trước khi đoán.
- Giải thích nguyên nhân bằng một câu, chỉ ra thuộc tính cần đổi; để thành viên tự sửa.
- Không nói "đã sửa xong" khi chưa có kết quả kiểm trên trình duyệt ở cả 3 mốc.
- Ghi lỗi và cách xử lý vào `session2/docs/test-report.md` (người, trang, kích thước, nguyên nhân, cách sửa, kết quả kiểm lại).
