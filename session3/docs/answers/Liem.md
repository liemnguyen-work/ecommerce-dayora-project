
# Kiểm tra kiến thức Buổi 3 — Liêm

## 1. Thêm chức năng mới
Nhóm xác định những thành phần cần sửa như thế nào?
Xác định chức năng tác động đến trang nào, dữ liệu nào, phần giao diện và xử lý nào. Sau đó đối chiếu phần việc của từng người, thống nhất cách các phần kết nối và cách kiểm thử.

## 2. Tích hợp GitHub
Nhóm xử lý xung đột mã nguồn và tích hợp bằng GitHub như thế nào?
Mỗi người làm trên nhánh riêng, đưa thay đổi vào PR. Khi có xung đột, những người liên quan cùng xem các phần khác nhau, thống nhất nội dung cần giữ, giải quyết xung đột và kiểm tra lại trước khi merge.

## 3. Quy ước chung
Vì sao phải thống nhất tên hàm và khóa `cart` trước khi code? Nếu không thì có thể xảy ra lỗi gì?
Tên hàm và khóa cart là cách các phần của các thành viên giao tiếp với nhau. Nếu một bên lưu dưới tên khác hoặc gọi sai tên hàm, trang khác có thể không đọc được giỏ hoặc gặp lỗi khi gọi hàm.

## 4. Kế hoạch
`docs/ke-hoach.md` dùng để làm gì? Nếu bỏ qua thì ảnh hưởng gì?
Giúp biết ai làm gì, bàn giao gì và phải chờ ai. Nếu không có, nhóm dễ chồng chéo hoặc làm sai thứ tự; bản thân việc thiếu file kế hoạch không nhất thiết làm website bị hỏng.

## 5. Quy ước
`docs/quy-uoc.md` dùng để làm gì? Nếu bỏ qua thì ảnh hưởng gì?
Ghi lại cách các phần JavaScript dùng chung dữ liệu, tên hàm và sự kiện. Nếu không thống nhất, lúc ghép code có thể xảy ra lỗi không nhận dữ liệu hoặc gọi sai hàm.

## 6. README
`session3/README.md` dùng để làm gì? Nếu bỏ qua thì ảnh hưởng gì?
Giới thiệu sản phẩm, cách chạy, cách kiểm tra và các minh chứng. Nếu thiếu, người xem khó hiểu và chạy lại bài; website không nhất thiết bị lỗi chỉ vì thiếu README.

## 7. Kịch bản trình bày
`docs/trinh-bay.md` dùng để làm gì? Nếu bỏ qua thì ảnh hưởng gì?
Giúp chia thời gian, phân vai và sắp xếp thứ tự demo. Nếu không chuẩn bị, nhóm có thể nói thiếu, chuyển màn hình lúng túng hoặc quá giờ; đây không phải lỗi chức năng của website.

## 8. Bảng nộp bài
Bảng nộp bài dùng để làm gì? Nếu bỏ qua thì ảnh hưởng gì?
Giúp rà từng hạng mục và dẫn đến minh chứng trước khi nộp. Nếu bỏ qua, nhóm dễ bỏ sót file, ảnh hoặc link lỗi.

## 9. Lỗi đã gặp
Chọn một lỗi bạn gặp: nguyên nhân là gì và bạn đã xử lý như thế nào?
Lúc kiểm tra bảng, đã tích [x] nhưng git diff còn hiện [ ] vì file chưa được lưu; sau đó lưu bằng Ctrl + S rồi chạy lại git diff để kiểm tra thì thành công.