1. Nhóm xử lý xung đột mã nguồn và tích hợp bằng GitHub thế nào?
Mỗi người làm trên nhánh riêng, commit rồi mở PR để nhóm xem trước khi gộp vào main. Nếu có xung đột, nhóm đối chiếu phần bị sửa trùng, giữ nội dung cần thiết của cả hai bên và kiểm tra lại sau khi giải quyết.
2. Vì sao thứ tự thẻ <script> quan trọng? defer làm gì?
File dùng dữ liệu và hàm chung phải được nạp trước file gọi chúng; đảo thứ tự có thể khiến hàm hoặc dữ liệu chưa tồn tại. defer cho trình duyệt tải script trong lúc đọc HTML và chạy chúng sau khi đọc xong, theo thứ tự các thẻ.
3. Đường dẫn JS hoặc ảnh sai thì thấy dấu hiệu gì trong DevTools?
Trong tab Network, file sai đường dẫn thường báo 404 hoặc không tải được. Với JS, Console có thể báo lỗi và chức năng không chạy; với ảnh, trên trang sẽ thấy ảnh bị hỏng hoặc không hiển thị.
4. Bước 1: Chép session2/ sang session3/ để làm gì?
Nhóm lấy giao diện HTML, CSS và ảnh đã làm làm nền cho bài JavaScript, đồng thời giữ nguyên bài Buổi 2. Nếu bỏ bước này, các chức năng mới không có đầy đủ trang và phần tử giao diện để gắn vào.
5. Bước 2: Tạo sáu file JS khung để làm gì?
Các file được chia theo dữ liệu sản phẩm và từng chức năng để thành viên làm đúng phần của mình, còn các trang biết cần nạp file nào. Nếu thiếu file hoặc nạp sai đường dẫn, trình duyệt báo lỗi tải file và chức năng tương ứng không hoạt động.
6. Bước 3: Tạo cart.html để làm gì?
Trang này tạo chỗ để hiển thị giỏ hàng và liên kết từ menu đến giỏ. Nếu không có trang hoặc vùng chứa phù hợp, người dùng không mở được giỏ và mã hiển thị giỏ không có nơi để đưa nội dung vào.
7. Bước 4: Cập nhật mẫu PR để làm gì?
Mẫu PR nhắc mỗi người ghi rõ thay đổi, cách kiểm tra và minh chứng giao diện để reviewer dễ đối chiếu. Bỏ mẫu này không làm website hỏng, nhưng dễ thiếu thông tin kiểm thử và khiến việc review mất thời gian hơn.
8. Bước 5: Tích hợp cuối để làm gì?
Mình kiểm tra mã có vi phạm quy ước về inline JavaScript, thư viện ngoài không, rồi tổng hợp commit và PR của tám thành viên. Nếu bỏ qua, nhóm có thể nộp bài còn lỗi quy ước hoặc thiếu minh chứng đóng góp; chức năng không nhất thiết hỏng ngay.
9. Một lỗi đã gặp: nguyên nhân và cách sửa
Lúc kiểm tra cuối, lệnh grep trong hướng dẫn in ra các thẻ <script src="..."> hợp lệ vì nó khớp cả </script>; lệnh tìm thư viện còn khớp nhầm dữ liệu trong ảnh PNG. Mình dùng biểu thức chỉ tìm script thiếu src và thêm -I để bỏ qua file nhị phân, rồi chạy lại: cả hai lệnh không in kết quả.
