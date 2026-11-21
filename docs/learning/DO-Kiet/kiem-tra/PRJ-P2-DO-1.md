# Kiểm tra kiến thức — PRJ-P2-DO-1
## 1. Ghi dữ liệu cần có
Bước này để làm gì? Bỏ đi thì test hoặc chức năng nào bị ảnh hưởng?
Ghi dữ liệu cần có. Bước này giúp nhóm biết cần chuẩn bị SKU đủ tồn, tài khoản demo, voucher, khuyến mãi và đơn mẫu. Nếu bỏ qua, nhóm có thể thiếu dữ liệu để chạy ca áp voucher hoặc tạo đơn qua checkout.
## 2. Ghi cách chuẩn bị
Bước này để làm gì? Bỏ đi thì test hoặc chức năng nào bị ảnh hưởng?
Ghi cách chuẩn bị. Bước này giúp người khác biết cần dùng DB nào, chạy seed ra sao và chuẩn bị tài khoản, đơn mẫu theo thứ tự nào. Nếu bỏ qua, mỗi người có thể chuẩn bị dữ liệu khác nhau, khiến ca demo khó chạy lại với cùng điều kiện.
## 3. Ghi cách xác nhận
Bước này để làm gì? Bỏ đi thì test hoặc chức năng nào bị ảnh hưởng?
Ghi cách xác nhận. Bước này giúp kiểm tra dữ liệu đã dùng được, chẳng hạn voucher áp đúng mức giảm và đơn mẫu lưu đúng tổng tiền. Nếu bỏ qua, nhóm có thể thấy voucher xuất hiện trong DB nhưng không phát hiện nó không áp được khi checkout.
## 4. Chỗ khó nhất
Lúc đầu tôi sai ở đâu? Tôi đã sửa thế nào?
Lúc đầu tôi để thừa dấu cách ở cuối dòng 16 nên Git báo trailing whitespace. Tôi vẫn chạy lệnh commit riêng nên thay đổi có lỗi vẫn được commit. Sau đó tôi xóa dấu cách thừa, kiểm tra lại và nối các lệnh bằng && để khi kiểm tra báo lỗi thì lệnh commit phía sau dừng lại.
