# Kiểm tra kiến thức — PRJ-P2-FD1-3

Người thực hiện: Thành

## 1. Chọn SKU trong `ProductPage.tsx`

- [x] Bước 1 làm vậy để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Product chỉ là mặt hàng chung, còn SKU mới đại diện cho biến thể vật lý có giá, ảnh và tồn kho riêng. Nếu không lưu `selectedId`, trang không biết biến thể nào đang được xem và không thể thêm đúng SKU vào giỏ.

## 2. Thêm SKU và số lượng vào giỏ

- [x] Bước 2 làm vậy để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Frontend gửi `{ skuId, quantity }`; backend xác định người dùng bằng cookie đăng nhập. Phải gửi `sku.id` thay vì `product.id` để backend kiểm tra đúng giá và tồn kho của màu/biến thể khách đã chọn; nếu bỏ thì khách không thêm được món cụ thể vào giỏ.

## 3. Ghi sản phẩm đã xem

- [x] Bước 3 làm vậy để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Khi người dùng đã đăng nhập và mở chi tiết sản phẩm, effect gọi `POST /me/viewed` để lưu lịch sử ở cấp Product. Effect chỉ phụ thuộc `user` và `product.id`; phụ thuộc SKU sẽ gửi request thừa mỗi lần đổi màu. Nếu bỏ, tab sản phẩm đã xem không có dữ liệu mới.

## 4. Hoàn thiện phản hồi thao tác mua

- [x] Bước 4 làm vậy để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Trạng thái đang thêm khóa nút để tránh gửi lặp; thành công xác nhận món đã vào giỏ, lỗi cho biết cần thử lại và hết hàng khóa thao tác không hợp lệ. Nếu bỏ, khách không biết request đang chạy hay đã thành công và có thể bấm nhiều lần làm tăng số lượng ngoài ý muốn.

## 5. Chỗ khó nhất

- [x] Lúc đầu sai ở đâu và sửa thế nào?

  Trả lời: Khó nhất là nối dữ liệu từ `POST /me/viewed` sang phần hiển thị. Backend đã ghi lịch sử nhưng AccountPage thiếu tab đọc danh sách; khi bổ sung tab còn gặp import component/type bị trùng. Tôi xóa import lặp, thêm tab gọi `GET /me/viewed` và hiển thị các ProductCard.

## 6. Câu hỏi vặn: mức độ quan trọng của lỗi

- [x] Vì sao lỗi ghi lịch sử được bỏ qua nhưng lỗi thêm giỏ phải hiển thị?

  Trả lời: Ghi lịch sử là tác vụ nền, lỗi không được cản khách xem sản phẩm. Thêm giỏ là hành động khách chủ động yêu cầu; nếu thất bại mà im lặng, khách sẽ hiểu nhầm món đã được thêm.

## 7. Câu hỏi vặn: đổi SKU khi số lượng đang lớn

- [x] Nếu đang chọn 5 rồi đổi sang SKU chỉ còn 2, code hiện tại xử lý thế nào?

  Trả lời: Khi đổi SKU, code luôn reset `quantity` và `quantityInput` về `1`, đồng thời xóa notice cũ; không giữ 5 và không clamp thành 2. Sau đó nút tăng và ô nhập giới hạn theo `maxQty = min(99, availableStock)` của SKU mới.

## Trạng thái kiểm tra

Thành đã tự trả lời, sửa các điểm chưa khớp code và hoàn thành hai câu hỏi vặn. Phần reviewer hỏi ngẫu nhiên hai câu và xác nhận khả năng giải thích không mở code vẫn đang chờ thực hiện.
