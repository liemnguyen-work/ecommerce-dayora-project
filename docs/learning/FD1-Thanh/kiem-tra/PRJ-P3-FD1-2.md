# PRJ-P3-FD1-2 — Kiểm tra kiến thức

> Tôi tự trả lời trước khi hoàn tất bước 2.3 và 2.4. Nội dung này chứng minh phần kiến thức tôi đã nắm; trạng thái triển khai và nghiệm thu hai bước đó vẫn còn chờ.

- [x] Bước 1 — Hiển thị danh sách trong `ProductReviews`
- [x] Bước 2 — Hiển thị điểm và nội dung đánh giá
- [x] Bước 3 — Nối tải đánh giá công khai
- [x] Bước 4 — Hoàn thiện bố cục đánh giá
- [x] Chỗ khó nhất trong task

## 1. Hiển thị danh sách trong ProductReviews

Component `ProductReviews` nhận `slug`, gọi API lấy đánh giá và xử lý đủ trạng thái đang tải, lỗi, rỗng hoặc có dữ liệu. Nếu bỏ phần này thì khách không xem được review và các ca kiểm thử tương ứng cũng không đạt.

## 2. Hiển thị điểm và nội dung đánh giá

Điểm trung bình giúp nhìn nhanh mức hài lòng; sao, tên, ngày và bình luận cho biết chi tiết. Khách có thể chỉ chấm sao nên `comment` dễ là `null` và phải ẩn để tránh khoảng trắng thừa; điểm lẻ như 4.5 được làm tròn để vẽ sao nhưng vẫn giữ số thực khi hiển thị.

## 3. Nối tải đánh giá công khai

Truyền `slug` vào API công khai để lấy đúng review của sản phẩm cho cả khách chưa đăng nhập. Khi tải lại, mở lại hoặc đổi `slug` sang sản phẩm khác thì danh sách được tải mới; luồng gửi từ trang tài khoản chưa xong nên tôi vẫn đang chờ xác nhận phạm vi phần này.

## 4. Hoàn thiện bố cục đánh giá

Giao diện cần hoạt động từ desktop đến màn hình 390px, không tràn ngang; thẻ xếp dọc trên mobile, chữ dài tự xuống dòng, màu sao đủ tương phản và có `aria-label`. Tôi đã nắm yêu cầu nhưng chưa triển khai xong bước này.

## 5. Chỗ khó nhất thực tế

Database chưa có sẵn review nên tôi tạo tạm dữ liệu giả gồm trường hợp có bình luận và `comment = null` để kiểm tra ở 390px, rồi xóa sạch trước khi commit. Sang bước 2.3, tôi phát hiện trang tài khoản chưa có tab “Chờ đánh giá” trong khi task chỉ nêu `ProductPage.tsx`, nên dừng lại hỏi reviewer thay vì tự làm lấn phạm vi.

## Câu hỏi bổ sung

### Vì sao không truyền trực tiếp `average = 4.5` vào `String.repeat()`?

`String.repeat()` chuyển số thập phân 4.5 thành số nguyên 4 nên sẽ vẽ thiếu sao. Code dùng `Math.round(data.average)` để vẽ sao, còn dùng giá trị gốc với `toFixed(1)` để hiển thị `4.5/5`.

### Điều gì xảy ra nếu chuyển sản phẩm nhưng không tải lại theo slug?

Component có thể giữ state cũ và hiển thị review, trạng thái rỗng hoặc lỗi của sản phẩm A trên sản phẩm B. Trong code hiện tại, `path` được tạo từ `slug` và là dependency của `useEffect`; đổi `slug` làm `path` đổi nên request chạy lại.
