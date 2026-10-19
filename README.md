# DAYORA



Gói gọn đồ dùng, mở trọn cuộc vui.



## 1. Giới thiệu



DAYORA là website thương mại điện tử B2C của một cửa hàng bán đồ dùng picnic và chuyến đi trong ngày.



Dự án hướng đến hỗ trợ khách hàng lựa chọn đủ đồ dùng, hạn chế mua trùng và kiểm soát tổng chi phí. Các lợi ích này cần được kiểm chứng qua khảo sát và thử nghiệm người dùng.



Khách hàng có thể mua từng sản phẩm hoặc sử dụng Kit Builder để nhận gợi ý bộ đồ dùng theo bốn thông tin: tình huống sử dụng, số người, ngân sách và đồ đã có.



Danh mục dự kiến khoảng 30 SKU thuộc sáu nhóm: thảm picnic, bình nước và ly, hộp đựng thực phẩm, túi giữ nhiệt, vật dụng vệ sinh và phụ kiện tiện ích.



Kit Builder phục vụ nhóm từ 1 đến 8 người với ba tình huống: picnic ăn nhẹ, hẹn hò buổi chiều và đi biển trong ngày.



Dự án không kinh doanh thực phẩm chế biến, cho thuê đồ hoặc cung cấp dịch vụ đặt tour, địa điểm và phương tiện.



## 2. Khách hàng mục tiêu



Sinh viên, các cặp đôi trẻ, nhóm bạn và người đi làm trẻ có nhu cầu chuẩn bị đồ dùng cho chuyến đi trong ngày.



Khách hàng mục tiêu quan tâm đến tính tiện dụng, số lượng phù hợp và ngân sách, đồng thời muốn tận dụng những vật dụng đã có.



## 3. Chức năng chính



### Khách hàng



* Xem danh mục, chi tiết, biến thể và sản phẩm liên quan.

* Tìm kiếm, lọc và sắp xếp sản phẩm.

* Đăng ký, đăng nhập và quản lý hồ sơ.

* Sử dụng Kit Builder, xem lý do gợi ý và điều chỉnh bộ.

* Quản lý giỏ hàng, áp dụng voucher và đặt hàng.

* Thanh toán thử nghiệm qua VNPay Sandbox.

* Xem phí giao hàng, lịch sử và trạng thái đơn của mình.

* Xem sản phẩm đã xem và đánh giá sau mua khi đủ điều kiện.



### Quản trị viên



* Quản lý sản phẩm, danh mục, nhóm hàng và người dùng.

* Quản lý đơn hàng, tồn kho, khuyến mãi và voucher.

* Quản lý cấu hình, phiên bản và nhật ký quy tắc Kit Builder.

* Xem dashboard doanh thu, số đơn, sản phẩm bán chạy, chờ giao và số khách hàng.



### Nguyên tắc của Kit Builder



Kit Builder sử dụng quy tắc nghiệp vụ xác định trước để tính phần còn thiếu theo công dụng, số lượng và sức chứa.



Hệ thống phân biệt món thiết yếu với tùy chọn, chỉ gợi ý sản phẩm còn bán và đủ tồn, đồng thời giải thích lý do đề xuất.



Tổng thực trả gồm tiền hàng trừ giảm giá cộng phí giao. Khi chưa có địa chỉ, phí giao và tổng liên quan được ghi rõ là tạm tính.



Nếu không tìm được bộ phù hợp, hệ thống thông báo nguyên nhân, không tự tăng ngân sách hoặc bỏ món thiết yếu.



### Phát triển nâng cao



Checklist chuẩn bị và email nhắc là phần nâng cao có điều kiện, chỉ triển khai khi chức năng cốt lõi đạt kiểm thử và nhóm còn nguồn lực.



Các chức năng trên là phạm vi phát triển, chưa phải danh sách đã triển khai thành công.



## 4. Thành viên



* Liêm: Trưởng nhóm kiêm BA.

* Đạt: Product Designer, phụ trách UI/UX.

* Thành: Frontend khách hàng.

* Phúc: Frontend quản trị.

* Hoàn: Backend khách hàng và giao dịch.

* Châu: Backend quản trị và dữ liệu.

* Ngọc: QA/Tester.

* Kiệt: DevOps Engineer, phụ trách tích hợp và triển khai.



Mỗi thành viên có đầu việc, đầu ra và điều kiện hoàn thành cụ thể. Nhóm phối hợp qua GitHub Issues và kiểm tra thay đổi trước khi tích hợp.



## 5. Công nghệ dự kiến



Nhóm lựa chọn bộ công nghệ sau để triển khai DAYORA.



### Backend



Node.js và NestJS với TypeScript, sử dụng Express làm nền tảng xử lý HTTP.



Backend được chia thành các module, cung cấp REST API và xử lý nghiệp vụ tài khoản, phân quyền, sản phẩm, Kit Builder, giao dịch và quản trị.



### Frontend



React với TypeScript để xây dựng giao diện khách hàng và quản trị.



HTML, CSS và Tailwind CSS phục vụ cấu trúc, định dạng và giao diện responsive. Vite được sử dụng để phát triển và build Frontend.



Frontend kết nối Backend qua REST API.



### Database



PostgreSQL được triển khai trên Supabase để lưu trữ dữ liệu và các quan hệ của hệ thống.



Các nghiệp vụ quan trọng về giá, voucher, đơn hàng, thanh toán và tồn kho được kiểm tra, xử lý tại Backend.



### API / Services



VNPay Sandbox phục vụ tích hợp và kiểm thử thanh toán, xác thực kết quả và cập nhật trạng thái giao dịch.



Supabase Storage lưu hình ảnh sản phẩm, có kiểm tra quyền và dữ liệu tải lên.



Phí giao hàng được tính theo bảng quy tắc trong Backend. Dịch vụ email được bổ sung khi triển khai chức năng nhắc chuẩn bị.



### Version Control



Git quản lý phiên bản; GitHub lưu mã nguồn, tài liệu và lịch sử đóng góp.



GitHub Issues phục vụ phân công, theo dõi công việc và ghi nhận lỗi.



### Công cụ bổ sung



Figma phục vụ thiết kế UI/UX. Postman phục vụ kiểm tra API.



Môi trường triển khai cần hỗ trợ Frontend React, Backend Node.js, kết nối Supabase và HTTPS.



## 6. Kế hoạch thực hiện



1. Khảo sát và thống nhất yêu cầu.

2. Thiết kế giao diện.

3. Phát triển Frontend.

4. Phát triển Backend và cơ sở dữ liệu.

5. Tích hợp và kiểm thử.

6. Triển khai và hoàn thiện.



Frontend và Backend phối hợp song song, thống nhất cách kết nối và tích hợp theo từng phần. Kiểm thử được thực hiện trong quá trình phát triển.



Thời gian dự kiến 8 tuần. Lịch cụ thể, người phụ trách, đầu ra và trạng thái được quản lý trong kế hoạch dự án và GitHub Issues.



## 7. Liên kết

* [Yêu cầu dự án](REQUIREMENTS.md)
* [Kế hoạch thực hiện](PROJECT_PLAN.md)
* [Nguyên tắc hỗ trợ AI](AGENTS.md)
* [Nhật ký sử dụng AI và log từng thành viên](AI_USAGE_LOG.md)
* [Phân tích ba website tham khảo](docs/competitor-analysis.md)
* [Vai trò và quyền người dùng](docs/user-roles.md)
* [Quy trình nghiệp vụ](docs/business-workflow.md)
* [Quy tắc ghi nhật ký AI](docs/ai-logging-rules.md)

Hướng dẫn chạy và đường dẫn website demo sẽ được bổ sung khi có bản triển khai được kiểm tra.
