# Requirements



## 1. Mục tiêu dự án



DAYORA là website thương mại điện tử B2C bán đồ dùng picnic và chuyến đi trong ngày.



Dự án hướng đến giúp khách hàng lựa chọn đồ phù hợp với tình huống, số người, ngân sách và vật dụng đã có; hạn chế mua thiếu, mua trùng và theo dõi tổng chi phí trước khi đặt hàng.



Khách hàng có thể mua lẻ hoặc sử dụng Kit Builder để nhận bộ gợi ý có giải thích và điều chỉnh được.



Cửa hàng có thể quản lý sản phẩm, khách hàng, đơn hàng, tồn kho, ưu đãi và quy tắc Kit Builder.



Các lợi ích dự kiến cần được kiểm chứng qua khảo sát và thử nghiệm người dùng.



## 2. Phạm vi



### Trong phạm vi



Danh mục dự kiến khoảng 30 SKU thuộc sáu nhóm: thảm picnic, bình nước và ly, hộp đựng thực phẩm, túi giữ nhiệt, vật dụng vệ sinh và phụ kiện tiện ích.



Kit Builder phục vụ nhóm từ 1 đến 8 người với ba tình huống: picnic ăn nhẹ, hẹn hò buổi chiều và đi biển trong ngày.



Phiên bản đầu bao gồm FR01 đến FR17: sản phẩm, tài khoản, đánh giá sau mua, Kit Builder, giỏ hàng, checkout, thanh toán, giao hàng, ưu đãi, quản trị và dashboard.



FR18 về checklist và email nhắc chỉ được triển khai sau khi phần cốt lõi đạt kiểm thử, nhóm đủ nguồn lực và đã xác nhận tiêu chí với giảng viên.



### Ngoài phạm vi



* Sàn thương mại điện tử nhiều người bán.

* Thực phẩm chế biến, cho thuê đồ, đặt tour, địa điểm hoặc phương tiện.

* Chatbot, gợi ý bằng học máy, thời tiết trực tiếp và bản đồ.

* Trải nghiệm 3D/AR hoặc ứng dụng di động riêng.

* Đồng bộ tồn kho với hệ thống bên ngoài.

* Tự động chuyển tiền hoàn trả.

* Cam kết giao hàng trong ngày hoặc trước ngày sử dụng.



## 3. Người dùng



### Khách chưa đăng nhập



Được xem thông tin công khai, tìm kiếm, lọc, xem chi tiết và sử dụng Kit Builder.



Cần đăng nhập trước khi sử dụng giỏ hàng và đặt hàng. Lựa chọn đang tạo phải được giữ qua bước đăng nhập.



### Khách hàng



Được quản lý hồ sơ, giỏ hàng, áp dụng voucher, đặt hàng, thanh toán, xem lịch sử và trạng thái đơn của mình.



Được xem sản phẩm đã xem và đánh giá khi đáp ứng điều kiện sau mua.



Không được truy cập dữ liệu khách hàng khác hoặc chức năng quản trị.



### Quản trị viên



Được quản lý sản phẩm, danh mục, nhóm hàng, người dùng, đơn hàng, tồn kho, khuyến mãi, voucher và quy tắc Kit Builder.



Được xem dashboard và nhật ký thay đổi theo quyền.



Backend phải kiểm tra quyền cho từng thao tác cần bảo vệ.



## 4. Yêu cầu chức năng



### FR01. Trang chủ và điều hướng



**Mô tả:** Hiển thị danh mục, sản phẩm nổi bật, bán chạy, ưu đãi và lối vào mua lẻ, Kit Builder.



**Người sử dụng:** Khách chưa đăng nhập, khách hàng.



**Mức độ ưu tiên:** Bắt buộc.



**Tiêu chí nghiệm thu:** Liên kết dẫn đúng nội dung; giá và thông tin ưu đãi đúng dữ liệu; điều hướng sử dụng được trên máy tính và điện thoại.



### FR02. Tìm kiếm, lọc và sắp xếp



**Mô tả:** Tìm theo từ khóa; lọc giá, nhóm hàng, tình huống, sức chứa, kích thước và chất liệu; sắp xếp theo giá.



**Người sử dụng:** Khách chưa đăng nhập, khách hàng.



**Mức độ ưu tiên:** Bắt buộc.



**Tiêu chí nghiệm thu:** Có tối thiểu năm thuộc tính lọc phù hợp trên hệ thống; kết quả đúng điều kiện; có xóa bộ lọc và thông báo khi không có kết quả.



### FR03. Chi tiết sản phẩm



**Mô tả:** Hiển thị ảnh, mô tả, SKU, biến thể, giá, tồn kho, thông số và sản phẩm liên quan.



**Người sử dụng:** Khách chưa đăng nhập, khách hàng.



**Mức độ ưu tiên:** Bắt buộc.



**Tiêu chí nghiệm thu:** Giá, SKU và tồn khớp biến thể; thông số có đơn vị; hiển thị giá giảm khi có; sức chứa sử dụng cho Builder có dữ liệu xác định.



### FR04. Tài khoản và hồ sơ



**Mô tả:** Đăng ký, đăng nhập, đăng xuất, quản lý hồ sơ, lịch sử mua và sản phẩm đã xem.



**Người sử dụng:** Khách chưa đăng nhập, khách hàng.



**Mức độ ưu tiên:** Bắt buộc.



**Tiêu chí nghiệm thu:** Kiểm tra đầu vào và tài khoản trùng; mật khẩu được băm; khách chỉ truy cập dữ liệu của mình; đăng xuất kết thúc phiên hợp lệ.



### FR05. Đánh giá sau mua



**Mô tả:** Khách hàng chấm điểm và nhận xét sản phẩm đã mua.



**Người sử dụng:** Khách hàng.



**Mức độ ưu tiên:** Bắt buộc.



**Tiêu chí nghiệm thu:** Backend kiểm tra quyền từ dữ liệu mua hàng và điều kiện trạng thái đơn; nhận điểm từ 1 đến 5; hiển thị đúng đánh giá và điểm tổng hợp.



### FR06. Nhập nhu cầu tạo bộ



**Mô tả:** Nhận tình huống, số người, ngân sách và số lượng hoặc sức chứa đồ đã có.



**Người sử dụng:** Khách chưa đăng nhập, khách hàng.



**Mức độ ưu tiên:** Bắt buộc.



**Tiêu chí nghiệm thu:** Chỉ nhận ba tình huống trong phạm vi, số người nguyên từ 1 đến 8, ngân sách dương và lượng đồ đã có không âm; báo lỗi rõ khi dữ liệu sai.



### FR07. Tạo và giải thích bộ



**Mô tả:** Tính phần còn thiếu theo quy tắc và đề xuất sản phẩm phù hợp.



**Người sử dụng:** Khách chưa đăng nhập, khách hàng.



**Mức độ ưu tiên:** Bắt buộc.



**Tiêu chí nghiệm thu:** Trừ đồ đã có đúng công dụng; phân biệt món theo người, dùng chung, thiết yếu và tùy chọn; chỉ chọn hàng đủ tồn; giải thích số lượng và nguyên nhân khi không tạo được bộ.



### FR08. Thay món và kiểm soát ngân sách



**Mô tả:** Điều chỉnh bộ gợi ý và theo dõi chi phí.



**Người sử dụng:** Khách chưa đăng nhập, khách hàng.



**Mức độ ưu tiên:** Bắt buộc.



**Tiêu chí nghiệm thu:** Tính lại số lượng theo sức chứa khi thay món; cập nhật chi phí; cảnh báo thiếu món thiết yếu hoặc vượt ngân sách; không tự tăng ngân sách hoặc hiển thị bộ thiếu là đầy đủ.



### FR09. Giỏ hàng



**Mô tả:** Quản lý sản phẩm mua lẻ và bộ từ Kit Builder.



**Người sử dụng:** Khách hàng.



**Mức độ ưu tiên:** Bắt buộc.



**Tiêu chí nghiệm thu:** Thêm đúng sản phẩm, biến thể, số lượng; cho sửa hoặc xóa; cập nhật tiền hàng; không tự thêm sản phẩm gợi ý; chỉ truy cập giỏ của mình.



### FR10. Checkout và tạo đơn



**Mô tả:** Nhận thông tin giao hàng, xác nhận chi phí và tạo đơn.



**Người sử dụng:** Khách hàng.



**Mức độ ưu tiên:** Bắt buộc.



**Tiêu chí nghiệm thu:** Backend kiểm tra lại giá, tồn, voucher và phí; yêu cầu xác nhận nếu thay đổi; lưu thông tin đã chốt; không tạo đơn từ giỏ trống hoặc tạo trùng do gửi lặp.



### FR11. Thanh toán sandbox



**Mô tả:** Tạo giao dịch VNPay Sandbox, tiếp nhận và xác thực kết quả.



**Người sử dụng:** Khách hàng.



**Mức độ ưu tiên:** Bắt buộc.



**Tiêu chí nghiệm thu:** Kiểm tra chữ ký, đơn, số tiền và trạng thái; xử lý thành công, thất bại, hủy; không ghi nhận tiền hoặc cập nhật tồn nhiều lần khi nhận thông báo lặp.



### FR12. Phí và trạng thái giao hàng



**Mô tả:** Tính phí theo địa chỉ, bảng quy tắc; theo dõi và cập nhật giao hàng.



**Người sử dụng:** Khách hàng, quản trị viên.



**Mức độ ưu tiên:** Bắt buộc.



**Tiêu chí nghiệm thu:** Phí được tính và lưu đúng vào đơn; ghi tạm tính khi thiếu địa chỉ; khách xem đơn của mình; chỉ quản trị viên được cập nhật trạng thái hợp lệ.



### FR13. Khuyến mãi và voucher



**Mô tả:** Quản lý giảm giá sản phẩm, voucher đơn hàng và điều kiện áp dụng.



**Người sử dụng:** Quản trị viên, khách hàng.



**Mức độ ưu tiên:** Bắt buộc.



**Tiêu chí nghiệm thu:** Kiểm tra thời hạn, ngưỡng đơn, mức giảm, giảm trần, lượt dùng và đối tượng nếu có; tính đúng tổng theo quy tắc kết hợp ưu đãi; báo rõ mã không hợp lệ.



### FR14. Quản trị dữ liệu cửa hàng



**Mô tả:** Quản lý sản phẩm, danh mục, nhóm hàng và người dùng.



**Người sử dụng:** Quản trị viên.



**Mức độ ưu tiên:** Bắt buộc.



**Tiêu chí nghiệm thu:** Thêm, xem, sửa, ngừng sử dụng theo quyền; kiểm tra dữ liệu bắt buộc, mã trùng, giá và tồn âm; không làm mất lịch sử đơn khi thay đổi sản phẩm.



### FR15. Quản lý đơn và tồn kho



**Mô tả:** Xử lý trạng thái đơn và số lượng hàng khả dụng.



**Người sử dụng:** Quản trị viên.



**Mức độ ưu tiên:** Bắt buộc.



**Tiêu chí nghiệm thu:** Chỉ chuyển trạng thái hợp lệ; giữ, trừ và hoàn tồn nhất quán; hai đơn cạnh tranh sản phẩm cuối không làm vượt tồn; thao tác lặp không cập nhật tồn nhiều lần.



### FR16. Quản trị quy tắc Builder



**Mô tả:** Cấu hình nhu cầu, công dụng, sức chứa, mức ưu tiên và phiên bản quy tắc.



**Người sử dụng:** Quản trị viên.



**Mức độ ưu tiên:** Bắt buộc.



**Tiêu chí nghiệm thu:** Kiểm tra quy tắc trước khi phát hành; lưu mã phiên bản và nhật ký thay đổi; đơn đã chốt không đổi theo phiên bản mới.



### FR17. Dashboard



**Mô tả:** Thống kê hoạt động cửa hàng.



**Người sử dụng:** Quản trị viên.



**Mức độ ưu tiên:** Bắt buộc.



**Tiêu chí nghiệm thu:** Có doanh thu, số đơn, sản phẩm bán chạy, chờ giao và số khách; định nghĩa rõ trạng thái, thời gian tính; kết quả khớp dữ liệu kiểm thử.



### FR18. Checklist và email nhắc



**Mô tả:** Tạo danh sách chuẩn bị và gửi email theo ngày khách đăng ký.



**Người sử dụng:** Khách hàng.



**Mức độ ưu tiên:** Nâng cao có điều kiện.



**Tiêu chí nghiệm thu nếu triển khai:** Checklist khớp dữ liệu; chỉ gửi cho khách đăng ký; cho đổi hoặc hủy lịch; xử lý hủy đơn; không gửi trùng; không dùng lịch nhắc để cam kết thời điểm giao hàng.



## 5. Yêu cầu phi chức năng



### Giao diện



Các trang chính sử dụng được ở độ rộng 1366 px và 390 px, không che nút hoặc mất thông tin quan trọng.



Có ít nhất ba tương tác có mục đích UX: báo lỗi đầu vào Builder, cập nhật tổng khi thay món và hiển thị thay đổi cần xác nhận tại checkout.



### Kiến trúc và kết nối



Frontend React kết nối REST API của Backend NestJS.



Backend tổ chức theo module, kiểm tra quyền và nghiệp vụ trước khi truy cập PostgreSQL trên Supabase.



Không để Frontend tự quyết định giá, mức giảm, tồn kho hoặc trạng thái thanh toán.



### Bảo mật



Kiểm tra dữ liệu ở cả Frontend và Backend; kiểm tra quyền sở hữu tài nguyên.



Có biện pháp phù hợp với XSS, SQL injection, CSRF theo cơ chế xác thực được lựa chọn.



Không công khai mật khẩu, token, khóa VNPay, khóa Supabase có quyền cao hoặc chuỗi kết nối cơ sở dữ liệu.



Hình ảnh tải lên phải được kiểm tra quyền, loại và dung lượng theo giới hạn cấu hình.



### Nhất quán dữ liệu



Không tồn âm, không ghi nhận đơn hoặc thanh toán trùng.



Đơn đã chốt lưu thông tin sản phẩm, giá, ưu đãi, phí và quy tắc liên quan tại thời điểm mua.



### Kiểm thử



Có ca kiểm thử chức năng chính, quyền truy cập, dữ liệu biên và ngoại lệ giao dịch.



Mục tiêu dự kiến gồm tối thiểu 24 ca Kit Builder và thử với ít nhất 8 người dùng; hướng đến ít nhất 6 người hoàn thành tác vụ không cần hướng dẫn trực tiếp.



Lưu kết quả mong đợi, thực tế, lỗi và minh chứng. Các mục tiêu trên chưa phải kết quả đã đạt được.



### Triển khai và bảo trì



Bản demo sử dụng HTTPS, có hướng dẫn chạy, cấu hình mẫu và dữ liệu demo.



Mã nguồn có cấu trúc, lịch sử đóng góp, nguồn tài nguyên và nhật ký sử dụng AI.



## 6. Giới hạn và giả định



Nhóm có 8 thành viên, thời gian phát triển dự kiến 8 tuần. Lịch thực tế được cập nhật trong PROJECT\_PLAN.md.



Công nghệ sử dụng: Node.js, NestJS, Express, TypeScript, React, Tailwind CSS, Vite và PostgreSQL trên Supabase.



VNPay Sandbox phục vụ thử nghiệm. Phí giao tính bằng bảng quy tắc, chưa tích hợp API vận chuyển.



Kit Builder dùng quy tắc xác định trước, không cam kết tìm được phương án tối ưu toàn cục.



Dữ liệu sức chứa và định lượng phải có căn cứ hoặc được ghi rõ là giả định demo.



Các chính sách cần chốt trước khi triển khai phần liên quan:



* Cách đếm SKU, biến thể và định lượng từng tình huống.

* Cách chọn sản phẩm và xử lý thay món vượt ngân sách.

* Cơ chế đăng nhập, thời hạn phiên và giữ lựa chọn Builder.

* Điều kiện đánh giá sau mua và số lần chỉnh sửa.

* Bảng phí, cách làm tròn và kết hợp ưu đãi.

* Thời điểm giữ tồn, thời hạn thanh toán, hủy đơn và kết quả thanh toán muộn.

* Quy trình trạng thái đơn và công thức dashboard.

* Cách xử lý bộ đang tạo khi quy tắc được cập nhật.



Thay đổi lớn sau khi chốt phạm vi phải ghi lý do, người thống nhất và tác động đến tiến độ, dữ liệu, kiểm thử.

