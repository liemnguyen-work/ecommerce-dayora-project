# PRJ-P1-PD-1.5 — Kiểm tra kiến thức

**Người thực hiện:** Đạt (PD)  
**Task:** PRJ-P1-PD-1 — Trang Về chúng tôi

### Câu 1. Chuẩn bị nội dung trang Về chúng tôi để làm gì? Nếu bỏ đi thì ảnh hưởng gì?

Bước này giúp xác định nội dung cần có trên trang, gồm câu chuyện thương hiệu, đội ngũ và câu hỏi thường gặp. Nếu bỏ qua, trang có thể vẫn chạy nhưng thiếu thông tin, không truyền tải được hình ảnh DAYORA và không đạt yêu cầu về nội dung.

### Câu 2. Xây dựng AboutPage.tsx để làm gì? Nếu bỏ đi thì ảnh hưởng gì?

Đây là bước tạo cấu trúc và hiển thị các phần nội dung của trang Về chúng tôi bằng React. Nếu thiếu file hoặc chưa kết nối route, người dùng không thể truy cập trang About hoàn chỉnh và việc kiểm tra chức năng điều hướng sẽ không đạt.

### Câu 3. Viết CSS .about-* và responsive để làm gì? Nếu bỏ đi thì ảnh hưởng gì?

CSS giúp trang có bố cục, màu sắc, khoảng cách và các khung nội dung rõ ràng. Responsive giúp giao diện tự điều chỉnh trên điện thoại. Nếu bỏ qua, nội dung sẽ thiếu tính thẩm mỹ, dễ bị dồn hoặc tràn ngang ở màn hình nhỏ và không đạt yêu cầu giao diện 390px.

### Câu 4. Chụp ảnh màn hình 1366px và 390px để làm gì? Nếu bỏ đi thì ảnh hưởng gì?

Việc chụp ảnh giúp chứng minh giao diện hoạt động trên cả máy tính và điện thoại, đồng thời đối chiếu với bản mẫu để nhận ra điểm giống và khác. Nếu bỏ qua, website vẫn hoạt động nhưng reviewer thiếu minh chứng trực quan để đánh giá và nghiệm thu.

### Câu 5. Khó khăn lớn nhất khi thực hiện task là gì? Đã khắc phục như thế nào?

Khó khăn mình gặp là trang About ban đầu đã có nội dung nhưng giao diện còn giống văn bản thuần, thiếu khung thẻ và khoảng cách. Sau khi kiểm tra các class trong React và CSS, mình bổ sung kiểu dáng, xử lý CSS trùng lặp rồi kiểm tra lại. Kết quả lint, build đều PASS và trang không bị tràn ngang ở 390px.