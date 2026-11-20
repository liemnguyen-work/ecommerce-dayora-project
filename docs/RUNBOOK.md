## Cấu hình cổng thanh toán VNPay Sandbox

| Nội dung | Return URL | IPN URL |
| --- | --- | --- |
| Ai gọi | Trình duyệt của khách | Máy chủ VNPay |
| Local | `http://localhost:5173/thanh-toan/ket-qua` | Cần địa chỉ public để VNPay gọi được |
| Deploy | `https://<mien-vercel>/thanh-toan/ket-qua` | `https://<mien-render>/api/payments/vnpay/ipn` |
| Mục đích | Hiển thị kết quả thanh toán cho khách | Xác minh kết quả và cập nhật thanh toán trong DB |
| Cấu hình ở đâu | Biến `VNP_RETURN_URL` của API | Cấu hình IPN trên cổng VNPay Sandbox |

Các miền trong dấu `<...>` là giá trị mẫu, cần thay bằng địa chỉ triển khai của nhóm trước khi cấu hình Sandbox.

### Return URL

Sau khi thanh toán, trình duyệt chuyển khách về trang `/thanh-toan/ket-qua`. Trang web hiển thị kết quả dựa trên thông tin đã được API kiểm tra.

API có route `GET /api/payments/vnpay/return` để kiểm tra và trả kết quả. Route này chỉ đọc dữ liệu. Trạng thái thanh toán được cập nhật qua IPN vì khách có thể đóng tab trước khi quay về web và tham số trên URL có thể bị sửa.

### IPN URL

VNPay gọi `GET /api/payments/vnpay/ipn` qua địa chỉ public của API. API kiểm tra chữ ký HMAC-SHA512, đơn hàng và số tiền trước khi cập nhật kết quả thanh toán.

IPN hợp lệ được xử lý thành công trả mã `00`. Giao dịch đã xử lý nhận lại IPN trả mã `02`, đồng thời bảo đảm trừ tồn một lần.

VNPay cần truy cập được IPN từ Internet. Khi thử trên máy cá nhân, nhóm cần tunnel public hoặc API đã deploy để nhận callback.