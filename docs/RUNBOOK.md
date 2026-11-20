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

## Kiểm tra thanh toán VNPay Sandbox

### Chuẩn bị

- API đã có cấu hình Sandbox trong `.env` cục bộ hoặc biến môi trường trên server.
- IPN URL public đã được cấu hình trên cổng VNPay Sandbox.
- Xác nhận đúng DB thử nghiệm. Đối chiếu migration trước khi demo và báo Liêm nếu có migration chưa áp.
- Chuẩn bị tài khoản khách và đơn còn hạn thanh toán, tổng tiền từ 5.000 VNĐ theo hướng dẫn bài tập.

### Thử giao dịch thành công

Thông tin thẻ thử nghiệm theo hướng dẫn task:

| Thông tin | Giá trị |
| --- | --- |
| Ngân hàng | NCB |
| Số thẻ | 9704198526191432198 |
| Chủ thẻ | NGUYEN VAN A |
| Ngày phát hành | 07/15 |
| OTP | 123456 |

1. Đăng nhập DAYORA, chọn sản phẩm còn hàng và thêm vào giỏ.
2. Tạo đơn, chọn VNPay và mở trang thanh toán Sandbox.
3. Chọn ngân hàng NCB, nhập thông tin thẻ thử nghiệm và OTP.
4. Sau thanh toán, kiểm tra trình duyệt trở về `/thanh-toan/ket-qua`.
5. Kiểm tra API đã nhận IPN hợp lệ, phản hồi `RspCode` là `00`.
6. Với đơn thông thường còn hạn, đối chiếu DB có trạng thái đơn `CONFIRMED`, thanh toán `PAID` và tồn kho được cập nhật đúng số lượng mua.
7. Lưu kết quả thực tế. Nếu thiếu cấu hình hoặc callback chưa tới, ghi rõ bước đang vướng.

### Thử IPN có chữ ký sai

Khi API local đang chạy, thực hiện:

```bash
curl -i -G "http://localhost:3000/api/payments/vnpay/ipn" \
  --data-urlencode "vnp_TxnRef=TEST" \
  --data-urlencode "vnp_SecureHash=sai"
```

Kết quả mong đợi trong JSON:

```json
{"RspCode":"97","Message":"Invalid signature"}
```

Theo phần xử lý hiện tại, thiếu `VNP_HASH_SECRET` cũng trả mã `97`. Cần kiểm tra cấu hình để xác định đúng điều kiện thử.

### Thử gửi lại IPN hợp lệ

1. Lấy URL IPN đầy đủ từ lần Sandbox thanh toán thành công đã được API xử lý.
2. Ghi lại trạng thái đơn, trạng thái thanh toán, tồn kho và tồn đang giữ của các SKU liên quan.
3. Dùng Postman gửi GET tới đúng URL đó, giữ nguyên toàn bộ query string và chữ ký.
4. Kiểm tra phản hồi:

```json
{"RspCode":"02","Message":"Order already confirmed"}
```

5. Đối chiếu DB sau lần gửi lại. Tồn kho và tồn đang giữ giữ nguyên so với trước lần gửi lại, đồng thời không có thêm cập nhật thanh toán hoặc nhật ký trạng thái do IPN lặp.

URL IPN dùng để gửi lại phải được lưu cục bộ phục vụ kiểm tra. Tài liệu chỉ ghi quy trình và kết quả đã che thông tin giao dịch. Khóa thật được lưu trong cấu hình bí mật.

### Ghi kết quả thực hiện

Sau khi chạy, ghi ngày kiểm tra, môi trường, commit, mã đơn thử, phản hồi thực tế và kết quả đối chiếu DB. Các bước chưa thực hiện để trạng thái “Chưa kiểm tra”.
