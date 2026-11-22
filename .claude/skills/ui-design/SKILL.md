---
name: ui-design
description: Dùng khi thành viên dựng hoặc chỉnh giao diện trang HTML/CSS của Buổi 2 (header, banner, thẻ sản phẩm, trang chi tiết, trang giới thiệu) và muốn trang trông gọn, đẹp, thống nhất. Hướng dẫn bằng nguyên tắc và ví dụ ngắn, không viết hộ cả trang.
---

# Thiết kế giao diện cửa hàng bằng HTML/CSS thuần

Vai trò của AI: người hướng dẫn. Chỉ ra nguyên tắc, thuộc tính, ví dụ 3–8 dòng; thành viên tự gõ vào file của mình. Không viết lại cả trang, không đụng khu CSS của người khác.

## 1. Năm quy tắc làm trang "trông có thiết kế"

1. **Một hệ khoảng cách.** Chỉ dùng bội số của 8: `8, 16, 24, 32, 48, 56 px`. Khoảng cách trong thẻ nhỏ hơn khoảng cách giữa các thẻ, khoảng cách giữa các section lớn nhất (48–56 px).
2. **Ba cỡ chữ là đủ cho một trang.** Tiêu đề trang (32–44 px, đậm 800), tiêu đề section (26–36 px), chữ thường (16 px, line-height 1.6). Dùng `clamp(26px, 3vw, 36px)` để tiêu đề tự co trên điện thoại.
3. **Màu lấy từ biến, không gõ mã rời.** Khu 1 trong `style.css` có `--mau-nen`, `--mau-chu`, `--mau-nhan`, `--mau-nang`, `--mau-la`. Nút chính dùng `--mau-nhan`; chữ dùng `--mau-chu`; mảng nền nhẹ dùng `--mau-la`. Không đặt chữ `--mau-nang` (vàng) trên nền sáng: không đọc được.
4. **Một điểm nhấn mỗi màn hình.** Mỗi màn chỉ một nút nổi bật nhất (nút đặc màu nhấn). Nút phụ dùng viền (`btn--outline`) hoặc link.
5. **Căn theo một lề.** Mọi section dùng chung một khung `.wrap` (`width: min(100% - 32px, 1200px); margin-inline: auto`) để mép trái thẳng hàng từ header tới footer.

## 2. Mẫu cho từng thành phần (giải thích trước, đưa ví dụ ngắn khi được hỏi)

| Thành phần | Bố cục gợi ý | Điểm hay sai |
|---|---|---|
| Header | Flexbox: `justify-content: space-between; align-items: center`; logo trái, menu giữa, ô tìm kiếm phải | Menu dính vào logo vì thiếu `gap`; quên đánh dấu trang hiện tại (`aria-current="page"`) |
| Banner | Ảnh nền bằng `<img>` + `position: absolute; inset: 0; object-fit: cover`, lớp phủ tối dần bằng `linear-gradient` để chữ trắng đọc được | Chữ nằm trên vùng ảnh sáng nên không đọc được; ảnh bị méo vì thiếu `object-fit` |
| Thẻ sản phẩm | `<article class="product-card">`: ảnh vuông (`aspect-ratio: 1; object-fit: cover`), tên tối đa 2 dòng, giá màu nhấn, link "Xem chi tiết" đẩy xuống đáy bằng `margin-top: auto` trong flex cột | Thẻ cao lệch vì tên dài; ảnh kích thước khác nhau |
| Lưới sản phẩm | CSS Grid `repeat(4, 1fr)` rồi giảm cột theo `@media` | Dùng `width: 25%` + `float` làm vỡ khi có khoảng cách |
| Chi tiết sản phẩm | Grid 2 cột: ảnh trái, thông tin phải; thông số trong `<table>` có `<th scope="row">` | Nút mua bị lẫn vì cùng màu với chữ khác |
| Giới thiệu | Mỗi ý một `<section>` có `<h2>`; xen kẽ ảnh trái/phải; đoạn văn không quá 5 dòng | Một khối chữ dài; tự bịa số liệu không có trong tài liệu Buổi 1 |
| Footer | Nền `--mau-chu`, chữ `--mau-nen`, Grid 3 cột → 1 cột trên điện thoại | Link trong footer mất gạch chân và không có trạng thái focus |

## 3. Ảnh

- Mọi `<img>` có `alt` mô tả nội dung ("Thảm picnic caro cho bốn người"), không ghi "ảnh 1".
- Ghi `width`/`height` trong HTML để trang không giật khi ảnh tải, và đặt `img { height: auto; }` trong CSS để `aspect-ratio` vẫn quyết định chiều cao.
- Ảnh trong thẻ cùng tỉ lệ: `aspect-ratio: 1; object-fit: cover; width: 100%`.

## 4. Dấu hiệu trang "do AI làm vội", tránh

- Gradient tím xanh, bóng đổ đậm khắp nơi, bo góc mỗi chỗ một kiểu.
- Emoji làm biểu tượng menu; chữ căn giữa toàn trang.
- Năm màu nhấn khác nhau; cỡ chữ mỗi section một kiểu.
- Nội dung giả kiểu "Lorem ipsum", "Sản phẩm tuyệt vời nhất".

## 5. Cách hướng dẫn

1. Hỏi thành viên đang làm thành phần nào, file nào, đã có HTML/CSS gì (đọc file thay vì đoán).
2. So với bảng trên, chỉ ra 1–3 điểm cần sửa quan trọng nhất, giải thích vì sao.
3. Đưa thuộc tính cần dùng và ví dụ ngắn. Để thành viên tự gõ, rồi đọc lại file và nhận xét.
4. Nhắc mở trình duyệt kiểm ở 1366 px và 390 px trước khi coi là xong.
