# Kế hoạch bài tập nhóm Buổi 3 — DAYORA

## 1. Mục tiêu

Tích hợp các chức năng JavaScript thuần vào giao diện DAYORA đã thực hiện ở Buổi 2. Nhóm giữ lại cấu trúc và phong cách hiện có, làm việc trong thư mục `session3/` và kiểm tra các chức năng trước khi nộp bài.

## 2. Phân công nhiệm vụ

| Thành viên | Nhiệm vụ | Sản phẩm bàn giao | Phụ thuộc | Tiêu chí hoàn thành |
|---|---|---|---|---|
| Liêm (PM) | Lập kế hoạch, thống nhất quy ước, tổng hợp README và kịch bản trình bày. | `docs/ke-hoach.md`, `docs/quy-uoc.md`, `README.md`, `docs/trinh-bay.md` | Kiệt tạo thư mục `session3/` trước. Nội dung README và phần nộp bài cần đối chiếu với kết quả thực tế của cả nhóm. | Kế hoạch đủ 8 người và lịch làm việc; quy ước rõ ràng; README đủ 10 mục; kịch bản trình bày có phân vai. |
| Kiệt (DO) | Tạo cấu trúc Buổi 3, chuẩn bị khung giỏ hàng, mẫu PR và kiểm tra tích hợp GitHub. | Cấu trúc `session3/`, khung `cart.html`, thẻ nạp script, mẫu PR, `docs/github.md` | Cần thư mục `session2/` làm nền. Kiểm tra tích hợp cuối sau khi các thành viên hoàn thành và bàn giao phần việc. | Cấu trúc và đường dẫn đúng; các file script được nạp theo thứ tự; có tài liệu kiểm tra GitHub. |
| Châu (BD2) | Xây dựng dữ liệu sản phẩm dùng chung và logic giỏ hàng. | `js/data/products.js`, `js/modules/cart.js` | Kiệt tạo cấu trúc trước; thực hiện theo quy ước dữ liệu và tên hàm chung của nhóm. | Có 8 sản phẩm; các hàm dữ liệu hoạt động; giỏ hàng được lưu và đọc bằng `localStorage`, xử lý được dữ liệu rỗng hoặc lỗi. |
| Phúc (FD2) | Hiển thị danh sách sản phẩm động và nút thêm vào giỏ. | `js/modules/render-products.js`, vùng danh sách trong `products.html` | Chờ `products.js` của Châu để hiển thị dữ liệu; nút thêm giỏ cần logic trong `cart.js`. Phối hợp với Thành ở trang danh sách. | Hiển thị đủ sản phẩm từ dữ liệu dùng chung; có thông báo danh sách rỗng; nút thêm giỏ hoạt động. |
| Thành (FD1) | Làm chức năng tìm kiếm, lọc danh mục và sắp xếp giá. | `js/modules/search-filter.js`, thanh công cụ trong `products.html`, CSS khu 10 | Cần dữ liệu sản phẩm của Châu; phối hợp với Phúc về vùng hiển thị danh sách. | Tìm kiếm, lọc và sắp xếp hoạt động kết hợp; không làm thay đổi mảng sản phẩm gốc. |
| Hoàn (BD1) | Hiển thị chi tiết sản phẩm theo ID và thêm sản phẩm vào giỏ. | `js/modules/product-detail.js`, `product-detail.html` | Cần `products.js` của Châu để lấy thông tin; nút thêm giỏ cần `cart.js`. | Trang hiển thị đúng sản phẩm theo ID; xử lý ID không hợp lệ hoặc không tồn tại; nút thêm giỏ hoạt động. |
| Đạt (PD) | Xây dựng giao diện giỏ hàng và hiển thị số lượng trên biểu tượng giỏ. | `js/modules/cart-page.js`, phần nội dung `cart.html`, CSS khu 9 | Cần khung `cart.html` của Kiệt và dữ liệu, logic giỏ hàng của Châu. | Hiển thị sản phẩm, số lượng và tổng tiền; tăng, giảm, xóa hoạt động; có trạng thái giỏ rỗng; giao diện phù hợp màn hình nhỏ. |
| Ngọc (QA) | Lập và thực hiện kiểm thử, chụp ảnh giao diện, theo dõi lỗi. | `docs/kiem-thu.md`, thư mục `docs/screenshots/` | Có thể chuẩn bị ca kiểm thử sớm; chạy kiểm thử tích hợp sau khi các chức năng được bàn giao. | Có 16 ca kiểm thử với kết quả thực tế, 15 ảnh của 5 trang ở 3 kích thước và danh sách lỗi để theo dõi, kiểm tra lại. |

## 3. Lịch thực hiện

| Ngày | Công việc dự kiến |
|---|---|
| 05/11/2026 | Kiệt sao chép `session2/` sang `session3/`, tạo cấu trúc JS và gắn thẻ script. |
| 06/11/2026 | Liêm lập kế hoạch và quy ước; Kiệt chuẩn bị khung `cart.html` và mẫu PR. |
| 07/11/2026 | Châu làm dữ liệu sản phẩm và các hàm đọc, lưu giỏ hàng; Ngọc chuẩn bị 16 ca kiểm thử. |
| 08/11/2026 | Châu hoàn thiện các thao tác giỏ hàng; Phúc làm danh sách sản phẩm; Hoàn làm trang chi tiết. |
| 09/11/2026 | Phúc và Hoàn làm nút thêm giỏ; Thành làm tìm kiếm, lọc, sắp xếp; Đạt làm giao diện giỏ hàng. |
| 10/11/2026 | Ngọc chạy kiểm thử, chụp ảnh, kiểm tra tích hợp và báo lỗi; các thành viên sửa lỗi thuộc phần mình. |
| 11/11/2026 | Liêm hoàn thiện README, kịch bản trình bày và bảng nộp bài; Kiệt kiểm tra tích hợp cuối; cả nhóm rà soát và nộp bài. |

Lịch trên là kế hoạch theo hướng dẫn Buổi 3. Kết quả thực tế và các thay đổi tiến độ cần được nhóm đối chiếu, cập nhật khi thực hiện.