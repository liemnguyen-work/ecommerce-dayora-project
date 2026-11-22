# Project Plan



## 1. Thành viên và vai trò



### Liêm: Trưởng nhóm kiêm BA



Điều phối, theo dõi tiến độ, làm rõ yêu cầu và quản lý GitHub Issues.



Phụ trách kế hoạch, ghi nhận quyết định, thay đổi phạm vi và kiểm tra tính thống nhất của tài liệu.



Đầu ra: Bộ yêu cầu và kế hoạch cập nhật, danh sách công việc, biên bản thống nhất và tài liệu tổng hợp.



### Đạt: Product Designer, UI/UX



Thiết kế luồng sử dụng, giao diện khách hàng và quản trị trên máy tính, điện thoại.



Chuẩn bị bộ thành phần, tài nguyên có nguồn và hỗ trợ Frontend triển khai.



Đầu ra: Thiết kế Figma, bộ thành phần, tài nguyên và kết quả kiểm tra giao diện thực tế.



### Thành: Frontend khách hàng



Xây dựng giao diện React cho sản phẩm, tài khoản, Kit Builder, giỏ hàng, checkout và theo dõi đơn.



Phối hợp Hoàn kết nối REST API; xử lý trạng thái tải, lỗi và kết quả giao dịch.



Đầu ra: Các màn hình khách hàng hoạt động và đáp ứng trên máy tính, điện thoại.



### Phúc: Frontend quản trị



Xây dựng giao diện React cho dashboard, quản lý dữ liệu, đơn hàng, ưu đãi, voucher và quy tắc Builder.



Phối hợp Châu kết nối REST API và kiểm tra biểu mẫu, bảng dữ liệu.



Đầu ra: Các màn hình quản trị hoạt động, có kiểm tra đầu vào và thông báo kết quả.



### Hoàn: Backend khách hàng và giao dịch



Phát triển module NestJS cho tài khoản, phân quyền dùng chung, truy xuất sản phẩm, Builder, giỏ hàng, checkout và thanh toán.



Phối hợp Châu thống nhất cơ sở dữ liệu, quy tắc đơn, tồn kho và voucher.



Đầu ra: API khách hàng, luồng giao dịch, thanh toán sandbox và logic Builder có kiểm thử phù hợp.



### Châu: Backend quản trị và dữ liệu



Phát triển module NestJS cho quản trị, đơn hàng, tồn kho, ưu đãi, voucher, quy tắc Builder và dashboard.



Điều phối thay đổi cấu trúc PostgreSQL sau khi thống nhất với Hoàn.



Đầu ra: Cấu trúc dữ liệu, dữ liệu mẫu, API quản trị và thống kê chính xác.



### Ngọc: QA/Tester



Lập ca kiểm thử theo yêu cầu, kiểm tra chức năng, giao diện, quyền truy cập, dữ liệu biên và ngoại lệ.



Ghi nhận lỗi, kiểm tra lại sau sửa và phối hợp thử nghiệm người dùng.



Đầu ra: Bộ ca kiểm thử, danh sách lỗi, kết quả kiểm tra lại và minh chứng.



### Kiệt: DevOps Engineer



Thiết lập môi trường, phối hợp tích hợp Frontend, Backend, Supabase và thanh toán.



Triển khai bản demo, quản lý cấu hình mẫu và hướng dẫn vận hành.



Đầu ra: Bản tích hợp, website HTTPS, hướng dẫn cài đặt, cập nhật, sao lưu và khôi phục.



Mỗi công việc có một người chịu trách nhiệm chính. Người phối hợp và phần hỗ trợ cụ thể được ghi trong GitHub Issues.



## 2. Các giai đoạn

Lịch 8 phase, mỗi phase 1 tuần, chi tiết ở [PHASES](phases/PHASES.md). Phase nào có bài tập trên lớp thì làm bài tập trước ([ASSIGNMENTS](docs/ASSIGNMENTS.md)).

| Phase | Tên | Thời gian | Bài tập trên lớp |
| :--- | :--- | :--- | :--- |
| P0 | Khởi động và nền móng | 28/10 – 03/11/2026 | Buổi 2, hạn 04/11 |
| P1 | Catalog, tài khoản và giao diện nền | 04/11 – 10/11/2026 | chưa có |
| P2 | Giỏ hàng, voucher, phí giao, checkout | 11/11 – 17/11/2026 | chưa có |
| P3 | Thanh toán VNPay, đơn hàng, tồn kho, đánh giá | 18/11 – 24/11/2026 | chưa có |
| P4 | Kit Builder | 25/11 – 01/12/2026 | chưa có |
| P5 | Quản trị quy tắc, dashboard, bảo mật | 02/12 – 08/12/2026 | chưa có |
| P6 | Kiểm thử tổng, usability, Innovation có điều kiện | 09/12 – 15/12/2026 | chưa có |
| P7 | Đóng gói, báo cáo và bảo vệ | 16/12 – 22/12/2026 | chưa có |

Frontend và Backend thực hiện song song sau khi thống nhất cấu trúc API. Kiểm thử chạy trong từng phase, tập trung toàn hệ thống ở P6.

## 3. Công việc

Công việc chi tiết theo phase và từng người nằm trong [ROADMAP](docs/ROADMAP.md): task bài tập `HW-*` và task đồ án `PRJ-*`, mỗi task một GitHub Issue. Tiến độ tổng hợp: [PROGRESS](docs/PROGRESS.md) (`npm run roadmap:report`).

Trạng thái: todo (dự kiến), doing (đang thực hiện), review (chờ kiểm tra), done (hoàn thành). Task bị vướng ghi lý do trong issue.

Chỉ chuyển sang done khi có đầu ra được kiểm tra. Không xem một chức năng là hoàn thành chỉ vì đã có giao diện hoặc mã nguồn.

FR18 chưa nằm trong lịch bắt buộc. Nếu thực hiện, nhóm chốt ở D11 ([DECISIONS](docs/DECISIONS.md)), ghi [CHANGELOG](docs/CHANGELOG.md) và thêm task vào ROADMAP.

## 4. Rủi ro



### Quá tải hoặc phân công không đều



Rà soát hằng tuần, chia nhỏ công việc và điều phối hỗ trợ. Đạt, Kiệt nhận thêm đầu việc cụ thể khi cần. Hoãn phần nâng cao nếu phần cốt lõi còn lỗi.



### Chưa quen bộ công nghệ mới



Dành thời gian đầu để chạy thử React, NestJS và Supabase; xây một luồng kết nối đơn giản trước khi mở rộng. Đánh giá lại kế hoạch theo kết quả thực tế.



### Frontend và Backend kết nối không thống nhất



Thống nhất đường dẫn API, dữ liệu gửi nhận, quyền và lỗi trước khi triển khai. Dùng Postman để kiểm tra và tích hợp từng phần từ sớm.



### Quy tắc Builder sai hoặc thiếu căn cứ



Chuẩn hóa công dụng, định lượng và sức chứa; ghi rõ dữ liệu giả định. Kiểm thử biên, đồ đã có và trường hợp không tìm được bộ.



### Sai đơn, thanh toán, tồn kho hoặc voucher



Kiểm tra nghiệp vụ tại Backend; sử dụng cơ chế giao dịch và kiểm soát đồng thời phù hợp. Kiểm thử thao tác lặp, thanh toán muộn và cạnh tranh sản phẩm cuối.



### Lộ cấu hình hoặc thiếu kiểm tra quyền



Không đưa khóa bí mật lên GitHub hoặc Frontend. Kiểm tra quyền tại Backend, quyền tải ảnh và chính sách truy cập Supabase theo cách sử dụng.



### Dịch vụ ngoài hoặc triển khai gặp lỗi



Thử VNPay và môi trường triển khai sớm; kiểm tra kết nối, HTTPS và cấu hình. Theo dõi giới hạn dịch vụ, chuẩn bị dữ liệu sao lưu và hướng khôi phục.



### Yêu cầu thay đổi hoặc tài liệu không đồng bộ



Ghi lý do, người thống nhất và tác động trước thay đổi lớn. Cập nhật yêu cầu, quy trình, API và ca kiểm thử liên quan.



### Thiếu minh chứng hoặc không giải thích được đầu ra AI



Mỗi thành viên ghi nhận đóng góp, nguồn tham khảo và AI log theo đầu việc. Kiểm tra mã trước tích hợp, giải thích luồng và thực hành sửa, kiểm thử phần phụ trách.

