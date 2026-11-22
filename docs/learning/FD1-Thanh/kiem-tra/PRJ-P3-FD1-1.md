# Kiểm tra kiến thức — PRJ-P3-FD1-1

Người thực hiện: Thành

## 1. Hiển thị chi tiết trong `OrderPage.tsx`

- [x] Bước 1 làm vậy để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Trang chi tiết đơn hàng lấy đúng dữ liệu từ server theo ID để hiện thông tin sản phẩm, người nhận, tổng tiền và tiến trình giao hàng. Nếu bỏ thì khách không theo dõi được đơn và phần kiểm tra quyền sở hữu cũng bị hỏng.

## 2. Nối thao tác thanh toán và hủy đơn

- [x] Bước 2 làm vậy để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Khi thanh toán, frontend gọi backend lấy link để chuyển qua VNPay; khi hủy thì gọi API để backend kiểm tra điều kiện và hoàn lại tồn kho. Frontend không tự đổi trạng thái vì dữ liệu trên trình duyệt dễ bị sửa, chỉ backend mới đủ quyền cập nhật database.

## 3. Hiển thị kết quả thanh toán

- [x] Bước 3 làm vậy để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Trang kết quả gửi các tham số trên URL về backend để kiểm tra chữ ký rồi mới báo thành công hay thất bại. Trang Return đi qua trình duyệt nên có thể bị giả mạo hoặc khách tắt ngang; IPN do VNPay gọi thẳng về backend mới là nguồn cập nhật trạng thái chính thức.

## 4. Kiểm trạng thái lỗi và bố cục

- [x] Bước 4 làm vậy để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Lỗi 404 là đơn không tồn tại, còn 403 là đơn của người khác; frontend báo chung là không tồn tại hoặc không có quyền để tránh lộ thông tin. Backend mới chống IDOR chính bằng cách kiểm tra chủ sở hữu. Ở màn hình 390 px, nội dung cần xếp dọc và ngắt chuỗi dài để không tràn giao diện.

## 5. Chỗ khó nhất

- [x] Lúc đầu sai ở đâu và sửa thế nào?

  Trả lời: Khó nhất là sau khi thanh toán VNPay thành công, trang đơn vẫn báo chưa thanh toán vì VNPay không gọi được IPN vào localhost để cập nhật database. Khi test local, tôi gửi lại query có chữ ký hợp lệ vào endpoint IPN, chờ backend xác nhận rồi tải lại trang. Khi triển khai thật phải dùng IPN URL công khai.

## 6. Câu hỏi vặn: trạng thái đơn và trạng thái thanh toán

- [x] `Order.status` và `Order.paymentStatus` khác nhau thế nào, và giao diện dựa vào chúng ra sao?

  Trả lời: `Order.status` là tiến trình nghiệp vụ của đơn như chờ thanh toán hay đã xác nhận, còn `paymentStatus` là trạng thái tiền đã trả hay chưa. Trong luồng VNPay hiện tại, nút thanh toán chỉ hiện khi đơn là `PENDING_PAYMENT` và `UNPAID`; khi đơn chuyển sang `CONFIRMED` và `PAID`, tiền đã được xác nhận và đơn bắt đầu được xử lý.

## 7. Câu hỏi vặn: IPN gửi lặp

- [x] Backend phải làm gì nếu VNPay gửi cùng một IPN thành công nhiều lần?

  Trả lời: Backend kiểm tra nếu đơn đã `PAID` thì dừng và trả thành công; dùng database transaction kết hợp khóa dòng để hai request đồng thời không cùng cập nhật; đồng thời đặt ràng buộc unique cho mã giao dịch VNPay để database chặn bản ghi trùng lọt qua.

## Trạng thái kiểm tra

Thành đã tự trả lời năm câu của sub-issue, sửa phần giải thích trạng thái cho khớp luồng VNPay hiện tại và hoàn thành hai câu hỏi vặn. Phần reviewer hỏi ngẫu nhiên hai câu và xác nhận khả năng giải thích không mở code vẫn đang chờ thực hiện.
