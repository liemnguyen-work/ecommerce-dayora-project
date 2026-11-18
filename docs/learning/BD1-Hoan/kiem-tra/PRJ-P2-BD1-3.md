# Kiểm tra kiến thức — PRJ-P2-BD1-3

Người thực hiện: Hoàn

## 1. Các ca kiểm thử

- [x] Mỗi it(...) trong admin-vouchers.spec.ts kiểm tra điều gì?

1. Khách bị chặn cả hai route: CUSTOMER truy cập danh sách quản trị voucher và khuyến mãi đều nhận lỗi 403.
2. Tạo voucher và báo trùng mã 409: tạo voucher thành công; khi database báo P2002, hệ thống trả lỗi 409 với thông báo “Mã voucher đã tồn tại”.
3. Không hạ giới hạn dưới lượt dùng: giả lập voucher đã dùng 5 lần, từ chối giảm giới hạn xuống 4, trả 400 và không cập nhật voucher.
4. Bật tắt voucher và lọc trạng thái: kiểm tra gọi cập nhật khi tắt voucher; truy vấn danh sách disabled có isActive: false và lấy tối đa 20 kết quả.
5. Tạo, sửa và bật tắt khuyến mãi với link nội bộ: tạo với /products, cập nhật isActive: false, từ chối link ngoài hoặc dạng //... bằng lỗi 400.

## 2. Phân quyền quản trị

- [x] Khách bị chặn cả hai route để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

Việc chặn khách hàng truy cập cả hai route quản trị giúp bảo đảm chỉ người có quyền quản trị mới có thể thao tác với voucher và khuyến mãi. Nếu bỏ kiểm tra quyền, khách có thể truy cập những chức năng quản trị mà mình không được phép sử dụng; các ca kiểm thử yêu cầu chặn khách có thể không đạt.

## 3. Tạo voucher

- [x] Tạo voucher và báo trùng mã 409 để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

Chức năng tạo voucher giúp quản trị viên thiết lập mã ưu đãi cho khách hàng. Việc báo lỗi 409 khi trùng mã giúp hệ thống không tạo hai voucher có cùng mã, tránh nhầm lẫn khi khách áp dụng. Nếu bỏ chức năng tạo voucher, quản trị viên không thể thêm mã mới; nếu không kiểm tra mã trùng, hệ thống có thể xử lý không rõ ràng. Các ca kiểm thử tương ứng có thể không đạt.

## 4. Giới hạn lượt dùng

- [x] Không hạ giới hạn dưới số lượt đã dùng để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

Không cho hạ giới hạn lượt dùng xuống thấp hơn số lượt voucher đã được sử dụng giúp dữ liệu nhất quán. Ví dụ, voucher đã được dùng 10 lần thì không nên chỉnh giới hạn xuống còn 5 lần. Nếu bỏ kiểm tra này, giới hạn có thể mâu thuẫn với lịch sử sử dụng và ca kiểm thử tương ứng có thể không đạt.

## 5. Trạng thái voucher

- [x] Bật tắt voucher và lọc trạng thái để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

Bật, tắt voucher giúp quản trị viên chủ động cho phép hoặc ngừng sử dụng mã ưu đãi. Lọc trạng thái giúp tìm và quản lý voucher thuận tiện hơn. Nếu bỏ, quản trị viên khó kiểm soát và tìm voucher; các ca kiểm thử tương ứng có thể không đạt.

## 6. Quản lý khuyến mãi

- [x] Tạo, sửa và bật tắt khuyến mãi để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

Chức năng này giúp quản trị viên thiết lập chương trình mới, điều chỉnh thông tin và kiểm soát trạng thái hoạt động. Nếu bỏ, quản trị viên không thể quản lý khuyến mãi đầy đủ và các ca kiểm thử tương ứng có thể không đạt.

## 7. Điều khó nhất

- [x] Chọn một chỗ khó nhất trong task: lúc đầu bạn sai ở đâu, sửa thế nào?

Điều khó nhất đối với tôi là bổ sung cột description cho voucher để quản trị viên mô tả rõ nội dung hoặc điều kiện. Ban đầu schema chưa có trường này nên chưa thể lưu thông tin mô tả. Tôi bổ sung trường description và điều chỉnh các phần liên quan; migration đã được chuẩn bị nhưng chưa áp dụng vào database đang cấu hình.
