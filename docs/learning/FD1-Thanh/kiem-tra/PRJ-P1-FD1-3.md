# Kiểm tra kiến thức — PRJ-P1-FD1-3

Người trả lời: Thành. Codex ghi lại câu trả lời Thành cung cấp; các câu được Thành chỉnh lại sau khi Codex góp ý và đưa dàn ý.

## 1. lib/catalog.ts

File này định nghĩa kiểu dữ liệu sản phẩm và hỗ trợ tạo query từ bộ lọc, định dạng giá tiền. Nếu bỏ đi, phần danh mục sử dụng các kiểu và hàm này sẽ bị lỗi biên dịch và không thể xử lý tham số lọc hay hiển thị đúng định dạng giá.

## 2. CatalogPage.tsx

Thành phần này đóng vai trò điều phối chính, có nhiệm vụ đọc các tham số từ khóa hay bộ lọc trên URL để lấy dữ liệu tương ứng và đổ ra giao diện danh sách sản phẩm. Nếu bỏ đi, trang danh mục sẽ mất khung giao diện tổng thể và đứt gãy kết nối giữa thanh địa chỉ trình duyệt với danh sách hàng hóa hiển thị.

## 3. Bộ lọc trái

Giúp khách lọc theo danh mục, khoảng giá, chất liệu. Nếu bỏ đi, khách sẽ phải cuộn trang thủ công qua toàn bộ danh sách sản phẩm mới tìm được món ưng ý.

## 4. ProductCard.tsx

Dùng để hiển thị hình ảnh, tên sản phẩm, giá bán và liên kết đến trang chi tiết sản phẩm. Nếu bỏ đi, danh sách sẽ mất đi giao diện từng thẻ sản phẩm và khách không thể bấm vào xem chi tiết.

## 5. Trạng thái tải, rỗng và lỗi

Giúp khách biết trang đang tải dữ liệu, không tìm thấy sản phẩm phù hợp hoặc gặp lỗi kết nối. Nếu bỏ đi, khách khó biết hệ thống đang hoạt động bình thường hay đã bị treo.

## 6. Khó khăn thực tế

Web chạy ở cổng 5175 nhưng API chỉ cho phép cổng 5174, nên trình duyệt chặn yêu cầu gọi dữ liệu do lỗi chính sách CORS. Mình xử lý bằng cách đặt tạm biến môi trường `WEB_ORIGIN` thành `http://localhost:5175` rồi khởi động lại API.
