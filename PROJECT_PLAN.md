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



Thời gian dự kiến là 8 tuần. Tuần 1 tính từ ngày nhóm bắt đầu triển khai chính thức; ngày bắt đầu và hạn nộp thực tế sẽ được cập nhật khi thống nhất.



### Giai đoạn 1: Khảo sát và xác định yêu cầu



Thời gian: Tuần 1.



Rà soát đề tài, kết quả khảo sát và phản biện; thống nhất phạm vi, chính sách nghiệp vụ, công nghệ và công việc.



Kết quả: Yêu cầu làm căn cứ triển khai và danh sách Issues.



### Giai đoạn 2: Thiết kế giao diện



Thời gian: Tuần 1 đến tuần 2.



Thiết kế luồng mua lẻ, Builder, checkout và quản trị; chuẩn bị giao diện máy tính, điện thoại và các trạng thái quan trọng.



Kết quả: Thiết kế đủ rõ để Frontend triển khai.



### Giai đoạn 3: Xây dựng Frontend



Thời gian: Tuần 3 đến tuần 6.



Phát triển React, TypeScript và Tailwind CSS cho khách hàng, quản trị; kết nối API theo từng nhóm chức năng.



Kết quả: Giao diện sử dụng được và kết nối dữ liệu thực tế.



### Giai đoạn 4: Phát triển Backend và cơ sở dữ liệu



Thời gian: Tuần 2 đến tuần 6.



Thiết kế PostgreSQL trên Supabase, dữ liệu mẫu và các module NestJS; triển khai phân quyền, giao dịch, Builder và quản trị.



Kết quả: Backend và cơ sở dữ liệu hoạt động, có kiểm tra dữ liệu và nghiệp vụ.



Frontend và Backend thực hiện song song sau khi thống nhất cấu trúc API.



### Giai đoạn 5: Tích hợp và kiểm thử



Thời gian: Kiểm thử từng phần từ tuần 2; tập trung toàn hệ thống trong tuần 6 đến tuần 7.



Tích hợp, kiểm tra chức năng, xử lý lỗi và thử nghiệm người dùng.



Kết quả: Kết quả kiểm thử, lỗi đã xử lý và danh sách giới hạn còn tồn.



### Giai đoạn 6: Triển khai và hoàn thiện



Thời gian: Chuẩn bị môi trường từ tuần 1; bàn giao trong tuần 8.



Triển khai HTTPS, kiểm tra trên môi trường thực tế, hoàn thiện tài liệu và chuẩn bị demo.



Kết quả: Website, hướng dẫn chạy, dữ liệu demo và minh chứng truy cập được.



## 3. Công việc



Các công việc triển khai dưới đây có trạng thái ban đầu là Dự kiến. Trạng thái thực tế được cập nhật khi bắt đầu thực hiện.



Trạng thái sử dụng: Dự kiến, Đang thực hiện, Chờ kiểm tra, Hoàn thành, Đang vướng mắc.



| Mã | Công việc | Người phụ trách | Kết quả cần đạt | Thời hạn dự kiến | Trạng thái |

| :--- | :--- | :--- | :--- | :--- | :--- |

| CV01 | Rà soát và chốt yêu cầu | Liêm | Phạm vi, chính sách và quyết định được ghi rõ trong REQUIREMENTS.md. | Tuần 1 | Dự kiến |

| CV02 | Hoàn thiện tài liệu và phân công | Liêm | Các tệp tài liệu thống nhất; Issues có người phụ trách, đầu ra và tiêu chí hoàn thành. | Tuần 1; cập nhật xuyên suốt | Dự kiến |

| CV03 | Thiết kế UI/UX | Đạt | Luồng sử dụng, màn hình máy tính và điện thoại, bộ thành phần và tài nguyên có nguồn. | Cuối tuần 2 | Dự kiến |

| CV04 | Thiết lập môi trường | Kiệt | Frontend Vite, Backend NestJS và kết nối Supabase chạy được; có cấu hình mẫu, hướng dẫn và bản triển khai thử. | Tuần 1 đến tuần 2 | Dự kiến |

| CV05 | Thiết kế dữ liệu | Châu | Phối hợp Hoàn chốt sơ đồ, ràng buộc, cách quản lý thay đổi và dữ liệu mẫu khoảng 30 SKU. | Cuối tuần 2 | Dự kiến |

| CV06 | Tài khoản và phân quyền | Hoàn | Đăng ký, đăng nhập, hồ sơ và cơ chế kiểm tra quyền; phối hợp Châu kiểm tra quyền quản trị. | Cuối tuần 3 | Dự kiến |

| CV07 | Frontend khách hàng | Thành | Các màn hình khách hàng kết nối API, xử lý tải, lỗi và giao diện responsive. | Bàn giao từng phần, hoàn thiện tuần 6 | Dự kiến |

| CV08 | Frontend quản trị | Phúc | Dashboard và các màn hình quản trị kết nối API; biểu mẫu, bảng dữ liệu hoạt động đúng. | Bàn giao từng phần, hoàn thiện tuần 6 | Dự kiến |

| CV09 | Backend mua hàng và thanh toán | Hoàn | API sản phẩm, giỏ, checkout, voucher, phí giao và VNPay; kiểm tra giá, quyền và xử lý lặp. | Thử sandbox tuần 2; luồng chính tuần 5 | Dự kiến |

| CV10 | Backend quản trị | Châu | API quản lý dữ liệu, đơn, tồn kho, khuyến mãi, voucher và dashboard. | Bàn giao từng phần, hoàn thiện tuần 6 | Dự kiến |

| CV11 | Logic Kit Builder | Hoàn | Tính phần còn thiếu, sức chứa, lựa chọn, giải thích và thay món theo ngân sách. | Bản thử tuần 3; hoàn thiện tuần 6 | Dự kiến |

| CV12 | Quản trị quy tắc Builder | Châu | Cấu hình, kiểm tra, phát hành phiên bản và lưu nhật ký; đơn cũ giữ thông tin đã chốt. | Cuối tuần 6 | Dự kiến |

| CV13 | Chuẩn bị và kiểm thử từng phần | Ngọc | Bộ ca theo yêu cầu, tối thiểu 24 ca Builder; có lỗi, kết quả thực tế và kiểm tra lại. | Bản đầu tuần 2; cập nhật xuyên suốt | Dự kiến |

| CV14 | Tích hợp hệ thống | Kiệt | Hai luồng mua lẻ, mua bằng Builder chạy xuyên suốt; Frontend, Backend, lưu trữ và thanh toán kết nối đúng. | Từ tuần 3; bản đầy đủ tuần 6 | Dự kiến |

| CV15 | Kiểm thử toàn hệ thống | Ngọc | Kiểm tra giao dịch, quyền, dữ liệu biên; thử với ít nhất 8 người mục tiêu và ghi nhận kết quả. | Cuối tuần 7 | Dự kiến |

| CV16 | Triển khai bàn giao | Kiệt | Website HTTPS, dữ liệu demo, hướng dẫn cài đặt, cấu hình, cập nhật và sao lưu. | Tuần 8 | Dự kiến |

| CV17 | Hoàn thiện tài liệu và demo | Liêm | Tổng hợp đóng góp, AI log, nguồn tài nguyên, minh chứng; thành viên giải thích được phần phụ trách. | Cuối tuần 8 | Dự kiến |



Các công việc lớn được tách thành Issues nhỏ trước khi triển khai. Người phụ trách xác định các yêu cầu FR liên quan, bước thực hiện và điều kiện nghiệm thu.



Chỉ chuyển sang Hoàn thành khi có đầu ra được kiểm tra. Không xem một chức năng là hoàn thành chỉ vì đã có giao diện hoặc mã nguồn.



FR18 chưa nằm trong lịch bắt buộc. Nếu thực hiện, nhóm tạo công việc riêng và cập nhật nguồn lực, thời hạn.



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

