# Kiểm tra kiến thức PRJ-P3-BD1-2

- [x] Mỗi `it(...)` trong `payments.spec.ts` kiểm tra điều gì? Viết một dòng cho mỗi ca.

  1. Chủ đơn tạo được URL với số tiền, mã đơn và chữ ký đúng định dạng; người khác và đơn hết hạn bị từ chối.
  2. IPN sai chữ ký trả `97` và không truy cập database.
  3. IPN thành công xác nhận đơn, trừ tồn một lần; IPN lặp trả `02` và không trừ thêm.
  4. IPN sai số tiền trả `04`, không cập nhật đơn hoặc tồn.
  5. IPN không tìm thấy đơn trả `01`.
  6. IPN muộn sau khi đơn hủy, nếu còn hàng khả dụng thì xác nhận đơn và trừ tồn.
  7. IPN muộn khi hết hàng giữ đơn `CANCELLED`, thanh toán `PAID` và ghi log hoàn tiền thủ công.
  8. Thiếu cấu hình VNPay trả `503`; Return hợp lệ trả kết quả nhưng không cập nhật đơn hay thanh toán.

- [x] Bước 1: Tạo URL cho chủ đơn, không cho người khác hoặc đơn hết hạn để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Tôi kiểm tra người yêu cầu là chủ đơn và đơn còn thời hạn trước khi tạo URL thanh toán. Nếu bỏ, người khác có thể tạo URL cho đơn không thuộc mình hoặc khách thanh toán cho đơn đã hết hạn; test về quyền sở hữu và thời hạn sẽ hỏng.

- [x] Bước 2: Sai chữ ký trả 97, không truy cập DB để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Tôi kiểm tra chữ ký IPN trước khi truy cập database để từ chối dữ liệu không hợp lệ ngay từ đầu. Nếu bỏ, thông báo giả hoặc bị sửa có thể được xử lý và làm sai trạng thái thanh toán; test chữ ký sai sẽ hỏng.

- [x] Bước 3: Xác nhận thành công, trừ tồn một lần và trả 02 khi IPN lặp để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Khi nhận IPN thành công, hệ thống xác nhận thanh toán và trừ tồn kho một lần. Nếu VNPay gửi lại cùng IPN, hệ thống trả `02` để báo giao dịch đã được xử lý; nếu bỏ kiểm tra này, tồn kho có thể bị trừ nhiều lần.

- [x] Bước 4: IPN muộn hết tồn giữ PAID và ghi log hoàn tiền thủ công để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Nếu khách đã thanh toán nhưng IPN đến muộn và hàng giữ không còn, hệ thống vẫn ghi nhận `PAID`, giữ đơn `CANCELLED` và ghi log để xử lý hoàn tiền thủ công. Nếu bỏ, nhóm có thể không phát hiện đơn cần hoàn tiền hoặc ghi nhận sai tình trạng thanh toán.

- [x] Bước 5: Thiếu cấu hình trả 503 và Return không cập nhật để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Thiếu cấu hình VNPay thì API trả `503` để báo chức năng thanh toán chưa sẵn sàng. Return URL chỉ phục vụ điều hướng hoặc hiển thị kết quả, còn việc cập nhật trạng thái dựa vào IPN; nếu bỏ, hệ thống có thể tạo thanh toán lỗi hoặc cập nhật trạng thái không đúng.

- [x] Chọn một chỗ khó nhất trong task: lúc đầu bạn sai ở đâu, sửa thế nào?

  Trong task này, tôi không gặp lỗi hay vướng mắc đáng kể. Các bước triển khai và kiểm thử diễn ra bình thường, nên tôi không có tình huống sai và sửa cụ thể để trình bày.

## Câu hỏi bổ sung

1. Không nên coi đơn là `PAID` chỉ dựa vào Return. Return URL đưa khách về trang kết quả; hệ thống cần xử lý IPN hợp lệ để cập nhật trạng thái, tránh chỉ dựa vào dữ liệu đi qua trình duyệt.
2. `stock` là tổng hàng trong kho, trong đó có thể đã được giữ cho khách khác. Cần xét tồn khả dụng `stock - reserved`; chỉ nhìn `stock` có thể lấy nhầm hàng đã giữ và gây bán vượt tồn.
