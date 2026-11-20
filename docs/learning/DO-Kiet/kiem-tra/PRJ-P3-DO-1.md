# Kiểm tra kiến thức — PRJ-P3-DO-1

## 1. Khai báo biến Sandbox

Kiệt thêm các biến mẫu để mọi người biết cần cấu hình gì khi chạy VNPay. Nếu API thiếu cấu hình thật thì không tạo được URL thanh toán và trả lỗi 503.

## 2. Ghi địa chỉ callback

Kiệt ghi rõ Return đưa khách về trang kết quả, còn IPN gửi kết quả đến API để xác minh và cập nhật đơn. Nếu cấu hình sai, khách có thể không quay về được web hoặc API không nhận được IPN.

## 3. Ghi cách kiểm tra

Kiệt ghi cách thử thanh toán, chữ ký sai và IPN lặp để nhóm kiểm tra theo từng bước. Nếu bỏ qua, nhóm dễ sót lỗi trừ tồn nhiều lần khi VNPay gửi lại thông báo.

## 4. Chỗ khó nhất

Lúc thêm biến VNPay, Kiệt chèn nhầm vào giữa dòng DIRECT_URL nên hai đường dẫn bị dính với nhau. Kiệt xem git diff, sửa lại từng dòng và kiểm tra trước khi commit.
