---
name: hover-focus-a11y
description: Dùng khi thêm hiệu ứng hover, trạng thái focus, transition cho link, nút, thẻ sản phẩm ở Buổi 2; hoặc khi kiểm trang dùng được bằng bàn phím, độ tương phản màu, alt ảnh, HTML semantic.
---

# Hover, focus và khả năng sử dụng

## 1. Hover và focus khác nhau thế nào

- `:hover`: chuột đang đè lên. Điện thoại không có hover, nên hover chỉ là "thêm", không được chứa thông tin bắt buộc.
- `:focus-visible`: phần tử đang được chọn bằng bàn phím (Tab). Người không dùng chuột chỉ biết mình đang ở đâu nhờ viền này.
- Không bao giờ `outline: none` mà không có viền thay thế (script kiểm của nhóm sẽ báo lỗi).

## 2. Mẫu tham khảo (đổi màu theo biến của nhóm)

```css
.btn,
.product-card {
  transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-3px);           /* nhấc nhẹ, không đổi kích thước nên không xô bố cục */
}

a:focus-visible,
button:focus-visible,
input:focus-visible {
  outline: 3px solid var(--mau-nang);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; }     /* người bật giảm chuyển động */
}
```

Quy tắc: hiệu ứng dùng `transform`, `box-shadow`, `background-color`, `color`; không đổi `width`, `height`, `margin`, `padding` (làm các thẻ bên cạnh nhảy).

## 3. Kiểm bằng bàn phím (2 phút mỗi trang)

1. Bấm vào thanh địa chỉ, rồi Tab liên tục.
2. Lần nào cũng phải thấy rõ đang ở link/nút nào.
3. Thứ tự Tab đi từ trên xuống, trái sang phải; không nhảy lung tung.
4. Shift+Tab đi ngược được.

## 4. Kiểm nhanh khác

- Tương phản: chữ thường cần tỉ lệ ≥ 4,5:1 với nền. DevTools → chọn phần tử → bảng Styles → bấm ô màu để xem "Contrast ratio".
- `alt` mô tả ảnh; ảnh trang trí thuần túy dùng `alt=""`.
- Mỗi trang có `<header>`, `<nav>`, `<main>`, `<footer>`, đúng một `<h1>`, các `<h2>` theo section.
- Ô tìm kiếm có `<label>` (có thể ẩn bằng class `visually-hidden`).
- Nút là `<button type="button">`, link chuyển trang là `<a href>`; không dùng `<div>` giả làm nút.

## 5. Cách hướng dẫn

Giải thích khác biệt hover/focus bằng ví dụ thực tế trên trang của thành viên. Chỉ ra phần tử còn thiếu trạng thái, để thành viên tự thêm vào khu 8 (hoặc báo Đạt nếu không phải khu của mình).
