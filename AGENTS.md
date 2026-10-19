\# Project Instructions for AI



\## 1. Project context



DAYORA là dự án website thương mại điện tử B2C của nhóm 8 sinh viên, bán đồ dùng picnic và chuyến đi trong ngày.



Khách hàng có thể mua lẻ hoặc sử dụng Kit Builder theo tình huống, số người, ngân sách và đồ đã có.



Công nghệ sử dụng:



\* Backend: Node.js, NestJS, TypeScript và Express.

\* Frontend: React, TypeScript, Tailwind CSS và Vite.

\* Database: PostgreSQL trên Supabase.

\* Lưu ảnh: Supabase Storage.

\* Thanh toán thử nghiệm: VNPay Sandbox.

\* Quản lý mã nguồn và công việc: Git, GitHub và GitHub Issues.



Frontend kết nối REST API của Backend. Các nghiệp vụ quan trọng được kiểm tra tại Backend.



AI hỗ trợ phân tích, giải thích, viết mã, sửa lỗi, kiểm thử và tài liệu. Thành viên phụ trách phải kiểm tra, hiểu và giải thích được đầu ra đã sử dụng.



\## 2. Scope



Chỉ triển khai chức năng đã được nhóm thống nhất trong REQUIREMENTS.md và công việc đang được giao.



Đọc PROJECT\_PLAN.md và GitHub Issue liên quan để xác định người phụ trách, đầu ra và tiêu chí hoàn thành.



Không tự bổ sung chức năng, dịch vụ hoặc thay đổi phạm vi.



FR01 đến FR17 thuộc phiên bản đầu. FR18 chỉ thực hiện khi nhóm xác nhận đủ điều kiện.



Giữ các nguyên tắc Kit Builder:



\* Tính phần còn thiếu theo công dụng, số lượng và sức chứa.

\* Phân biệt món theo người, dùng chung, thiết yếu và tùy chọn.

\* Chỉ gợi ý sản phẩm còn bán và đủ tồn.

\* Giải thích số lượng và lý do đề xuất.

\* Không tự tăng ngân sách hoặc bỏ món thiết yếu để hiển thị bộ là phù hợp.

\* Tổng thực trả gồm tiền hàng trừ giảm giá cộng phí giao.

\* Ghi rõ tạm tính khi chưa xác định được phí giao.



Backend kiểm tra lại giá, tồn kho, voucher và phí trước khi hoàn tất đơn.



Đơn đã chốt không thay đổi theo giá hoặc quy tắc tương lai.



Các chính sách chưa rõ phải được nhóm xác nhận trước khi triển khai phần liên quan.



\## 3. Coding principles



Giữ mã nguồn dễ đọc, có cấu trúc và phù hợp khả năng bảo trì của nhóm.



Tuân theo quy ước đang sử dụng trong dự án.



Frontend tổ chức thành các thành phần phù hợp, có trạng thái tải, lỗi và không có dữ liệu.



Backend tổ chức theo module NestJS. Tách xử lý yêu cầu, nghiệp vụ và truy cập dữ liệu; tránh lặp logic giữa khách hàng và quản trị.



Thống nhất cấu trúc API, dữ liệu gửi nhận và thông báo lỗi trước khi kết nối.



Không tự thay đổi kiến trúc lớn, công nghệ, cơ chế xác thực hoặc cấu trúc dữ liệu quan trọng khi chưa được nhóm đồng ý.



Không xóa chức năng đang hoạt động hoặc sửa phần không liên quan.



Ưu tiên thay đổi nhỏ, có thể kiểm tra.



Thay đổi cơ sở dữ liệu phải có cách áp dụng và quản lý phiên bản rõ ràng. Không tự xóa dữ liệu hoặc chạy thao tác phá hủy dữ liệu.



Khi thêm thư viện, nêu mục đích, nguồn, quyền sử dụng và tác động.



Bổ sung hoặc cập nhật kiểm thử phù hợp với thay đổi nghiệp vụ.



Không coi mã AI tạo ra là đúng khi chưa kiểm tra.



\## 4. Workflow



\### Trước khi sửa mã nguồn



1\. Đọc tài liệu, Issue và các tệp liên quan.

2\. Phân tích hiện trạng, dữ liệu, quyền và phần có thể bị ảnh hưởng.

3\. Đề xuất phương án, các tệp dự kiến sửa và cách kiểm tra.

4\. Chờ nhóm xác nhận phương án.



Nếu yêu cầu giao việc đã xác nhận rõ phương án và phạm vi, thực hiện trong phạm vi đó. Xin xác nhận lại khi phát sinh thay đổi ngoài phạm vi.



\### Trong quá trình thực hiện



1\. Chỉ sửa phần liên quan đến công việc.

2\. Giữ nguyên thay đổi của thành viên khác, không tự ghi đè hoặc hoàn tác.

3\. Kiểm tra từng phần và phối hợp khi thay đổi ảnh hưởng API, dữ liệu hoặc tích hợp.

4\. Báo trở ngại cần nhóm quyết định.



\### Sau khi sửa mã nguồn



1\. Giải thích thay đổi và lý do.

2\. Liệt kê tệp đã sửa.

3\. Hướng dẫn chạy và kiểm thử.

4\. Nêu kiểm tra đã thực hiện, kết quả và phần chưa kiểm tra.

5\. Báo giới hạn hoặc lỗi còn tồn.

6\. Cập nhật tài liệu, Issue và AI\_USAGE\_LOG.md khi liên quan.



Không ghi công việc hoàn thành hoặc kiểm thử thành công khi chưa có kết quả xác minh.



Chỉ commit các tệp liên quan. Không tự force push, viết lại lịch sử hoặc đẩy thay đổi chưa được phép lên nhánh dùng chung.



\## 5. Security



Không đưa mật khẩu, token, khóa VNPay, khóa Supabase có quyền cao hoặc chuỗi kết nối vào mã nguồn công khai.



Thông tin bí mật được quản lý bằng biến môi trường. Tệp cấu hình mẫu chỉ chứa giá trị minh họa.



Không đưa khóa đặc quyền hoặc thông tin kết nối PostgreSQL vào Frontend, kể cả qua biến môi trường được đóng gói vào bản build.



Không tự vô hiệu hóa kiểm tra bảo mật để làm chức năng chạy được.



Kiểm tra đăng nhập, quyền quản trị và quyền sở hữu tài nguyên tại Backend. Ẩn nút trên giao diện không thay thế phân quyền.



Không tin giá, mức giảm, tồn kho hoặc trạng thái thanh toán gửi từ trình duyệt.



Xác thực kết quả VNPay và kiểm tra đơn, số tiền, trạng thái trước khi ghi nhận thanh toán. Không chỉ dựa vào trang chuyển hướng trình duyệt.



Xử lý sự kiện lặp và cập nhật đồng thời để tránh đơn, tiền, tồn kho hoặc lượt voucher bị ghi nhận sai.



Kiểm tra dữ liệu, loại và dung lượng ảnh tải lên. Cấu hình quyền Supabase Storage phù hợp, không cho người không có quyền ghi hoặc xóa ảnh.



Áp dụng chính sách truy cập dữ liệu phù hợp với cách kết nối Supabase. Không bỏ qua kiểm tra quyền chỉ vì dữ liệu được lưu trên dịch vụ quản lý sẵn.



Không sử dụng dữ liệu cá nhân thật hoặc tài khoản thanh toán thật khi chưa được phép.



Không đưa thông tin bí mật vào log, ảnh minh chứng hoặc prompt gửi AI.



Nếu phát hiện lộ khóa hoặc lỗ hổng, báo nhóm, đề xuất khắc phục và không công khai giá trị bí mật trong báo cáo lỗi.



\## 6. Communication



Trao đổi bằng tiếng Việt rõ ràng, giải thích thuật ngữ khi cần.



Nếu yêu cầu chưa rõ, hỏi lại trước khi triển khai phần phụ thuộc thông tin đó.



Phân biệt thông tin đã xác nhận, giả định và đề xuất mới.



Không tự quyết định chính sách nghiệp vụ chưa được nhóm thống nhất.



Không bịa kết quả khảo sát, kiểm thử, triển khai hoặc đóng góp.



Đầu ra AI phải được thành viên phụ trách kiểm tra và ghi nhận trung thực trong AI\_USAGE\_LOG.md.



Cập nhật tài liệu này khi nhóm thống nhất thay đổi công nghệ, kiến trúc hoặc quy trình.

