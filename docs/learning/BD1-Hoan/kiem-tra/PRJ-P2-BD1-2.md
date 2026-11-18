# Kiểm tra kiến thức — PRJ-P2-BD1-2

Người thực hiện: Hoàn

Tự trả lời bằng lời của mình, không xem lại code và không nhờ AI viết hộ. Mỗi câu 1–3 dòng; riêng câu 1 ghi một dòng cho mỗi ca. Đánh dấu [x] khi tự hoàn thành.

## 1. Các ca kiểm thử

- [x] Mỗi `it(...)` trong `checkout.service.spec.ts` kiểm điều gì? Viết một dòng cho mỗi ca.

  Trả lời:

1. Tạo đơn với snapshot giá sale, giữ tồn và xóa dòng giỏ: Kiểm tra hệ thống tạo đơn trong transaction, lưu giá sale 80.000đ, số lượng 2 và thành tiền 160.000đ; đồng thời gọi thao tác giữ tồn và xóa dòng sản phẩm khỏi giỏ.
2. Hai yêu cầu tranh tồn cuối chỉ một cập nhật thành công: Giả lập hai yêu cầu cùng đặt hàng, trong đó một lần giữ tồn thành công và một lần thất bại; kiểm tra chỉ có một yêu cầu thành công và một đơn được tạo.
3. Bắt xác nhận khi giá đổi hoặc tổng lệch: Giả lập tổng tiền mới là 190.000đ, khác với 180.000đ khách dự kiến; kiểm tra hệ thống trả lỗi 409 với mã CONFIRM_REQUIRED và chưa bắt đầu transaction tạo đơn.
4. Ghi lượt voucher trong transaction: Kiểm tra hệ thống gọi transaction, truy vấn voucher và tạo lượt sử dụng gắn với voucher, người dùng và đơn hàng.
5. Hủy trả tồn và ghi log: Kiểm tra đơn chưa thanh toán được chuyển sang CANCELLED, giảm số lượng đang giữ đi 2 và ghi log có ghi chú Khách hủy.
6. Hết hạn trả tồn và đánh dấu payment EXPIRED: Kiểm tra hệ thống tìm các đơn chưa thanh toán đã hết thời gian giữ hàng, chuyển đơn sang CANCELLED, đặt paymentStatus thành EXPIRED và giảm số lượng đang giữ đi 2.
7. Không xem hoặc hủy đơn của người khác: Kiểm tra yêu cầu xem hoặc hủy đơn không thuộc người dùng trả về 404, đồng thời không cập nhật đơn hoặc số lượng tồn đang giữ.



## 2. Tạo đơn và giữ tồn

- [x] Tạo đơn với snapshot giá sale, giữ tồn và xóa dòng giỏ để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời:

Việc tạo đơn với snapshot giá sale giúp lưu lại giá tại thời điểm khách đặt hàng. Trong test, sản phẩm có giá gốc 100.000đ, giá sale 80.000đ; mua 2 sản phẩm thì đơn cần lưu đơn giá 80.000đ và thành tiền 160.000đ.

Giữ tồn giúp dành số lượng hàng cho đơn đang chờ thanh toán, hạn chế nhiều người đặt vượt số hàng có thể bán. Sau khi tạo đơn, hệ thống xóa các dòng sản phẩm đã đặt khỏi giỏ để khách không vô tình đặt lại.

Nếu bỏ các bước này, đơn có thể không lưu đúng giá đã mua, hàng có thể bị đặt vượt số lượng hoặc sản phẩm đã đặt vẫn còn trong giỏ. Trong file này, ca “tạo đơn với snapshot giá sale, giữ tồn và xóa dòng giỏ” sẽ không đạt nếu các thao tác được test yêu cầu không còn được thực hiện.



## 3. Xác nhận thay đổi

- [x] Bắt xác nhận khi giá đổi hoặc tổng lệch để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời:

Bước xác nhận giúp khách biết giá hoặc tổng tiền đã thay đổi trước khi đồng ý đặt hàng. Trong test, khách dự kiến trả 180.000đ nhưng kết quả tính lại là 190.000đ, nên hệ thống yêu cầu xác nhận bằng lỗi CONFIRM_REQUIRED.

Nếu bỏ bước này, đơn có thể được tạo với số tiền khác với số tiền khách dự kiến mà chưa có xác nhận. Ca “bắt xác nhận khi giá đổi hoặc tổng lệch” sẽ không đạt vì test yêu cầu trả lỗi 409 và không bắt đầu transaction.

Lưu ý: Dù tên ca nhắc đến cả giá đổi và tổng lệch, dữ liệu trong ca này trực tiếp giả lập tổng tiền bị lệch.



## 4. Lượt voucher

- [x] Ghi lượt voucher trong transaction để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời:

Ghi lượt voucher trong transaction giúp liên kết việc sử dụng voucher với người dùng và đơn hàng ngay trong quá trình tạo đơn. Việc xử lý cùng transaction giúp các thay đổi được thực hiện thống nhất khi có lỗi, đồng thời tạo dữ liệu để theo dõi số lượt sử dụng voucher.

Nếu bỏ việc ghi lượt voucher, hệ thống có thể không ghi nhận được người dùng đã sử dụng voucher cho đơn nào, làm ảnh hưởng đến việc kiểm soát giới hạn sử dụng. Ca “ghi lượt voucher trong transaction” sẽ không đạt vì test yêu cầu gọi voucherUsage.create với mã voucher, người dùng và đơn hàng tương ứng.



## 5. Hủy đơn

- [x] Hủy trả tồn và ghi log để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời:

Khi khách hủy đơn chưa thanh toán, hệ thống chuyển đơn sang CANCELLED và giảm số lượng đang giữ để số hàng đó có thể tiếp tục được bán. Log với ghi chú Khách hủy giúp ghi nhận lý do hoặc ngữ cảnh của lần thay đổi trạng thái.

Nếu không trả lại phần hàng đang giữ, hàng có thể tiếp tục bị giữ dù đơn đã hủy. Nếu không ghi log theo yêu cầu, lịch sử thay đổi sẽ thiếu thông tin. Ca “hủy trả tồn và ghi log” sẽ không đạt nếu thiếu một trong các thao tác mà test kiểm tra.



## 6. Hết hạn

- [x] Hết hạn trả tồn và đánh dấu payment EXPIRED để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời:

Đơn chưa thanh toán chỉ được giữ hàng trong một khoảng thời gian. Khi hết hạn, hệ thống hủy đơn và giảm số lượng đang giữ để hàng có thể được bán cho người khác. Đồng thời, hệ thống cập nhật paymentStatus của đơn thành EXPIRED để thể hiện trạng thái thanh toán đã hết hạn.

Nếu bỏ bước này, hàng có thể tiếp tục bị giữ và trạng thái đơn không phản ánh đúng việc hết hạn. Ca “hết hạn trả tồn và đánh dấu payment EXPIRED” sẽ không đạt nếu đơn không được cập nhật hoặc số lượng giữ không được giảm như test yêu cầu.

Ở đây, test kiểm tra trường paymentStatus trên đơn hàng; ca này không xác nhận trực tiếp việc cập nhật một bản ghi trong bảng payment.



## 7. Quyền sở hữu đơn

- [x] Không xem hoặc hủy đơn của người khác để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời:

Kiểm tra quyền sở hữu giúp người dùng chỉ xem và hủy đơn của chính mình, qua đó bảo vệ thông tin và tránh việc người khác tự ý hủy đơn.

Trong test, khi user-b xem hoặc hủy order-a nhưng không tìm thấy đơn thuộc quyền của mình, hệ thống phải trả về 404. Nếu bỏ kiểm tra này, người dùng có thể truy cập hoặc tác động đến đơn của người khác. Ca “không xem hoặc hủy đơn của người khác” yêu cầu trả 404 và không gọi cập nhật đơn hay số lượng hàng đang giữ.



## 8. Điều khó nhất

- [x] Chọn một chỗ khó nhất trong task: lúc đầu bạn sai ở đâu, sửa thế nào?

  Trả lời:

Điều khó nhất đối với tôi là xử lý yêu cầu ghi log khi hủy đơn. Ban đầu, tôi nhận thấy cấu trúc dữ liệu trong schema chưa có các trường log hủy đơn cụ thể như cách nhóm mong muốn theo dõi.

Sau khi trao đổi, nhóm quyết định tạm giữ cấu trúc schema hiện tại và sử dụng thêm phần ghi chú để thể hiện thông tin hủy đơn. Trong phạm vi bài kiểm thử này, test kiểm tra việc tạo orderStatusLog với ghi chú Khách hủy, nên nhóm chọn cách xử lý đó thay vì thay đổi schema ngay. Nếu cần quản lý chi tiết hơn trong tương lai, nhóm sẽ xem xét bổ sung cấu trúc phù hợp.
