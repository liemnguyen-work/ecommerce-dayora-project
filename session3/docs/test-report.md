# Báo cáo kiểm thử Buổi 2 — HW-P0-QA-1

Người phụ trách: Ngọc (QA). Reviewer theo phân công: Liêm. Bảng dưới là kế hoạch kiểm; chỉ cập nhật kết quả sau khi kiểm tra thực tế.

## Bảng kiểm giao diện

Mỗi ô ghi Đạt, Lỗi (kèm mã lỗi), Chưa kiểm hoặc Không áp dụng; không áp dụng chỉ khi trang thực sự không có đối tượng tương ứng. Ghi ảnh minh chứng vào `screenshots/` khi đã chụp.

| Trang | Chiều rộng | Link | Ảnh | Tràn ngang | Menu | Lưới | Nút ≥ 44 px | Focus | Ảnh minh chứng |
|---|---:|---|---|---|---|---|---|---|---|
| index.html | 1366 px | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa chụp |
| index.html | 768 px | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa chụp |
| index.html | 390 px | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa chụp |
| products.html | 1366 px | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa chụp |
| products.html | 768 px | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa chụp |
| products.html | 390 px | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa chụp |
| product-detail.html | 1366 px | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa chụp |
| product-detail.html | 768 px | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa chụp |
| product-detail.html | 390 px | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa chụp |
| about.html | 1366 px | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa chụp |
| about.html | 768 px | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa chụp |
| about.html | 390 px | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa kiểm | Chưa chụp |

## Cách kiểm

1. Mở từng trang bằng trình duyệt; dùng DevTools đặt chiều rộng 1366, 768 và 390 px; chụp một ảnh cho mỗi tổ hợp, tổng cộng 12 ảnh.
2. Bấm các link; kiểm ảnh tải và không méo; quan sát menu, banner, lưới và nội dung có bị khuất hoặc tràn ngang không. Đo kích thước vùng bấm nút trong DevTools; đối chiếu ngưỡng 44 px của bài.
3. Dùng Tab và Shift+Tab qua các link, nút, ô nhập; quan sát dấu focus và thứ tự di chuyển. Ghi điều kiện kiểm và lỗi thực tế nếu có.
4. Với mỗi lỗi, ghi theo mẫu bên dưới, báo người phụ trách phần liên quan; sau khi sửa, lặp lại bước tái hiện và kiểm các kích thước bị ảnh hưởng. Chỉ ghi đã sửa khi đã kiểm lại.

## Mẫu ghi lỗi

- Mã lỗi: chưa cấp
- Trang và chiều rộng: chưa xác định
- Môi trường (trình duyệt, hệ điều hành): chưa xác định
- Bước tái hiện: chưa ghi
- Kết quả mong đợi: chưa ghi
- Kết quả thực tế: chưa ghi
- Ảnh minh chứng: chưa có
- Người được đề nghị sửa: chưa xác định; người thực sự sửa: chưa xác định
- Cách sửa: chưa có
- Kết quả kiểm lại (ngày, người kiểm, chiều rộng): chưa kiểm lại

## Kiểm tra tự động

Ngày 03/11/2026, Codex chạy `python3 tools/check-session2.py session2` trước khi tạo báo cáo: **2 lỗi, 7 cảnh báo; chưa đạt**. Kết quả cần chạy lại sau thay đổi:

- Script báo `index.html`: ảnh banner thiếu alt; mã hiện tại có `alt=""`, nên cần Thành/Đạt xem ảnh có thuần trang trí không và đối chiếu cách script kiểm trước khi quyết định sửa.
- Script báo `style.css`: chưa khai báo biến màu trong `:root`; phần biến và nền thuộc Đạt.
- Script cảnh báo `product-detail.html` chưa đánh dấu `aria-current="page"`, cùng các tài liệu và ảnh nộp bài chưa đủ. Cảnh báo cần đối chiếu tình huống thực tế trước khi sửa.

Kết quả script không chứng minh giao diện đạt trên trình duyệt. Chưa kiểm tra 12 tổ hợp, chưa có ảnh và chưa kiểm lại lỗi.

## Ghi chú cần phối hợp

- Trong mã `products.html`, các ảnh dùng đường dẫn `../assets/images/` dù hướng dẫn Buổi 2 nêu đường dẫn trong `session2/images/`. Các tệp tương ứng có trong `assets/images/` tại bản đang đọc; chưa kiểm việc tải ảnh trên trình duyệt. Báo Phúc đối chiếu yêu cầu đường dẫn.
- Mã `products.html` dùng `product-grid`; hiện không thấy quy tắc CSS cho class này trong `style.css`. Cần kiểm trên trình duyệt và phối hợp Phúc về phần danh sách trước khi kết luận lỗi hiển thị.

## Ảnh chụp thử bằng Chrome

Ngày 03/11/2026, Codex chạy Chrome chế độ không hiện cửa sổ và tạo 12 ảnh trong `anh-thu/`. Đây là ảnh chụp vùng nhìn ban đầu, chưa xác minh được chiều rộng vùng hiển thị thực tế; ảnh `index-390.png` có nội dung bị cắt ở mép phải. Không thể kết luận nguyên nhân hoặc kết quả responsive từ ảnh này. Các ảnh chưa thay thế 12 minh chứng trong `screenshots/`, chưa chứng minh kiểm hết trang, link hoặc focus. Cần đo lại viewport và kiểm tương tác thực tế.

## Cập nhật sửa mã ngày 03/11/2026

Ngọc yêu cầu Codex sửa các vấn đề đã nêu. Đã bổ sung biến màu và CSS lưới sản phẩm, đổi đường dẫn tám ảnh sang `images/`, và sửa script kiểm để chấp nhận `alt=""` cho ảnh trang trí nhưng vẫn báo ảnh thiếu thuộc tính `alt`. Chưa kiểm các thay đổi trên trình duyệt; các ảnh trong `anh-thu/` chụp trước khi sửa và không dùng để kiểm lại.

Chạy lại `python3 tools/check-session2.py session2`: 0 lỗi, 6 cảnh báo. Cảnh báo `aria-current="page"` ở trang chi tiết được giữ lại: menu không có liên kết tới chính trang chi tiết; không đánh dấu nhầm liên kết trang danh sách là trang hiện tại. Các cảnh báo còn lại liên quan tài liệu và ảnh chưa đủ. Chưa kiểm lại 12 tổ hợp và chưa xác nhận lỗi hiển thị đã hết.
