# Kiểm tra kiến thức — PRJ-P2-FD1-2

Người thực hiện: Thành

## 1. Hiển thị thông tin người nhận

- [x] Bước 1 làm vậy để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Giao diện thu thập họ tên, số điện thoại và địa chỉ giao hàng; dữ liệu địa lý còn là đầu vào tính phí vận chuyển. Nếu bỏ, khách không thể cung cấp đủ dữ liệu bắt buộc để preview và tạo đơn.

## 2. Nối preview theo địa chỉ và voucher

- [x] Bước 2 làm vậy để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Khi tỉnh/thành hoặc khu vực nội thành thay đổi, frontend gọi lại preview để server cập nhật phí giao và tổng tiền. Frontend không tự tính vì dữ liệu trình duyệt có thể bị sửa và chính sách phí hoặc miễn phí vận chuyển có thể thay đổi ở server.

## 3. Gửi đơn trong `CheckoutPage.tsx`

- [x] Bước 3 làm vậy để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Frontend gửi recipient, voucher nếu có, `expected` gồm `skuId` và `unitPrice`, cùng `expectedTotal`; backend tự đọc giỏ và đối chiếu lại dữ liệu. Nếu bỏ, không thể tạo đơn, giữ tồn, xóa giỏ hoặc phát hiện giá và tổng tiền đã thay đổi.

## 4. Hiển thị đối chiếu 409

- [x] Bước 4 làm vậy để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Khi nhận `409 CONFIRM_REQUIRED`, giao diện phải dừng tạo đơn, hiển thị preview mới và yêu cầu khách xem rồi xác nhận lại. Không được tự chốt theo số tiền mới vì khách chỉ đồng ý với tổng tiền đã nhìn thấy trước khi bấm đặt hàng.

  Trạng thái triển khai: bước 2.4 chưa thực hiện tại thời điểm ghi file này; câu trả lời trên mới là hiểu biết về yêu cầu và phải được đối chiếu lại sau khi hoàn thành code.

## 5. Chỗ khó nhất

- [x] Lúc đầu sai ở đâu và sửa thế nào?

  Trả lời của Thành: Khó nhất là đồng bộ preview theo địa chỉ và xử lý 409 khi dữ liệu thay đổi. Ban đầu dependency chưa bao quát đủ khu vực giao, còn lỗi 409 chỉ hiện lỗi chung; hướng sửa là cập nhật preview theo vùng và tách nhánh lấy preview mới để khách xác nhận lại.

  Ghi chú phản biện: phần preview theo vùng đã được triển khai; phần hộp đối chiếu và xác nhận lại của bước 2.4 vẫn đang chờ thực hiện nên chưa được ghi nhận là kết quả đã kiểm thử.

## 6. Câu hỏi vặn: xác nhận tổng tiền mới

- [x] Sau 409, lần xác nhận tiếp theo gửi `expectedTotal` nào và vì sao?

  Trả lời: Gửi `expectedTotal` từ preview mới nhất mà server trả về sau khi khách đã xem. Nếu tiếp tục gửi tổng cũ, server hiểu rằng client vẫn dựa trên dữ liệu lỗi thời và tiếp tục chặn bằng 409.

## 7. Câu hỏi vặn: hợp đồng recipient

- [x] Vì sao không gửi toàn bộ object `user` làm recipient?

  Trả lời: Chỉ gửi đúng tên, điện thoại và địa chỉ giúp hợp đồng API gọn, tránh dữ liệu tài khoản thừa hoặc nhạy cảm và cho phép người đặt khác người nhận. Với DTO runtime cùng `whitelist`/`forbidNonWhitelisted`, trường thừa có thể bị từ chối; endpoint hiện tại còn cần DTO class để cơ chế này kiểm tra đầy đủ lúc chạy.

## Trạng thái kiểm tra

Thành đã tự trả lời và hoàn thành hai câu hỏi vặn. File được commit sớm theo yêu cầu của Thành; bước 2.4 và phần reviewer hỏi ngẫu nhiên vẫn đang chờ, vì vậy chưa đủ căn cứ đánh dấu toàn bộ task #43 hoàn thành.
