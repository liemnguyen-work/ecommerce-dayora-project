# Kiểm tra kiến thức PRJ-P3-BD1-3

- [x] Mỗi `it(...)` trong `reviews.service.spec.ts` kiểm tra điều gì? Viết một dòng cho mỗi ca.

  1. Kiểm tra truy vấn yêu cầu đơn thuộc người dùng, đã thanh toán, đã giao và chứa sản phẩm; nếu không tìm thấy đơn phù hợp thì từ chối đánh giá.
  2. Kiểm tra đánh giá trùng bị từ chối với lỗi `409` khi database báo lỗi `P2002`.
  3. Kiểm tra rating phải là số nguyên từ 1–5 và bình luận không vượt quá 1.000 ký tự.
  4. Kiểm tra danh sách chỉ gồm cặp đơn hàng – sản phẩm chưa đánh giá và không lặp sản phẩm khi đơn có nhiều SKU cùng sản phẩm.
  5. Kiểm tra danh sách trả điểm trung bình, số lượng, tên rút gọn và phân trang 10 đánh giá mỗi trang.

- [x] Mỗi `it(...)` trong `reviews.http.spec.ts` kiểm tra điều gì? Viết một dòng cho mỗi ca.

  Kiểm tra gửi rating `0` hoặc `6` trả `400`; khách hàng gọi `GET /api/admin/reviews` nhận `403`. Test giả lập người dùng đã đăng nhập.

- [x] Bước 1: Từ chối đơn chưa thanh toán, chưa giao hoặc không phải của mình để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Tôi kiểm tra đơn phải thuộc người đánh giá, đã thanh toán, đã giao và có chứa sản phẩm trước khi cho đăng đánh giá. Nếu bỏ, người chưa mua hoặc chưa nhận hàng có thể đánh giá; test từ chối đơn không hợp lệ sẽ hỏng.

- [x] Bước 2: Trả 409 khi trùng để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Tôi trả lỗi `409 Conflict` khi người dùng đánh giá trùng cặp đơn hàng – sản phẩm. Ràng buộc database ngăn bản ghi trùng, còn service báo rõ xung đột; nếu bỏ xử lý lỗi, test `P2002` có thể hỏng hoặc hệ thống trả lỗi không phù hợp.

- [x] Bước 3: Trả trung bình, số lượng và tên rút gọn để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Điểm trung bình và số lượng giúp khách nhận biết mức đánh giá chung của sản phẩm; tên rút gọn giúp hạn chế công khai đầy đủ danh tính người đánh giá. Nếu bỏ, thông tin hiển thị thiếu hoặc lộ họ tên đầy đủ và test tương ứng sẽ hỏng.

- [x] Bước 4: Rating ngoài khoảng trả 400 và khách gọi admin trả 403 để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Tôi kiểm tra rating là số nguyên hợp lệ từ 1–5 để tránh lưu điểm sai; đồng thời chỉ cho tài khoản admin gọi chức năng quản trị. Nếu bỏ, đánh giá có thể sai dữ liệu hoặc khách thường có thể truy cập chức năng admin; các test HTTP tương ứng sẽ hỏng.

- [x] Chọn một chỗ khó nhất trong task: lúc đầu bạn sai ở đâu, sửa thế nào?

  Điều khó nhất là yêu cầu chưa mô tả cụ thể cách hoạt động của route duyệt và xóa đánh giá. Sau khi trao đổi, tôi chọn đánh giá hiển thị ngay sau khi đăng, không cần chờ admin duyệt; admin có thể xóa hẳn đánh giá. Xóa hẳn có thể cho phép khách đánh giá lại.

## Câu hỏi bổ sung

1. Hệ thống nên từ chối đánh giá nếu sản phẩm không nằm trong đơn khách đã mua. Điều này giúp bảo đảm đánh giá gắn với đúng sản phẩm của đơn đã thanh toán và giao.
2. Khi đánh giá bị xóa hẳn, bản ghi cho cặp đơn hàng – sản phẩm không còn trong database. Nếu đơn vẫn đủ điều kiện và không có quy tắc cấm riêng, khách có thể tạo lại đánh giá mà không bị báo trùng.
