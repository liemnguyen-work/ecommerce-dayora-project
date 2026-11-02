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



## 4b. Quy tắc nghiệp vụ Kit Builder

Mã R01–R07 dùng trong code, test và báo cáo. Định mức cụ thể: [KIT-RULES-PROPOSAL](docs/catalog/KIT-RULES-PROPOSAL.md) (D01).

### R01. Định lượng nhu cầu theo người và sức chứa dùng chung

Hệ thống tính nhu cầu theo hai loại vật dụng: (1) Vật dụng cá nhân: tổng số lượng cần có = định mức trên một người × số người tham gia; (2) Vật dụng dùng chung: số sản phẩm cần có = làm tròn lên (số người tham gia / sức chứa hợp lệ của một sản phẩm). Ví dụ, nhóm 5 người cần 2 thảm có sức chứa 4 người/thảm. Chỉ sử dụng sức chứa đã được xác nhận trong dữ liệu sản phẩm, không tự suy đoán từ kích thước. Nếu các mẫu có sức chứa khác nhau, việc lựa chọn phải dựa trên tổng sức chứa thực tế.

### R02. Đối chiếu và khấu trừ vật dụng khách đã có

Hệ thống chỉ trừ những vật dụng khách đã có thuộc đúng nhóm công dụng và còn sử dụng được. Với vật dụng cá nhân: số lượng cần mua = max(0, tổng số lượng cần có − số lượng đã có hợp lệ). Với vật dụng dùng chung: sức chứa còn thiếu = max(0, số người tham gia − tổng sức chứa hợp lệ của đồ đã có); số sản phẩm cần mua từ mẫu có sức chứa C = làm tròn lên (sức chứa còn thiếu / C). Ví dụ nhóm 5 người có thảm đủ cho 2 người thì còn thiếu sức chứa cho 3 người; nếu mẫu thảm đang bán chứa 4 người, cần bổ sung 1 thảm. Không lấy số sản phẩm dự kiến trừ thẳng số sản phẩm đã có khi sức chứa khác nhau.

### R03. Phân loại thiết yếu – tùy chọn và điều kiện sản phẩm hợp lệ

Mỗi tình huống sử dụng quy định rõ các hạng mục thiết yếu (bắt buộc phải có để đảm bảo mục đích cơ bản của chuyến đi) và các hạng mục tùy chọn (bổ sung tiện ích). Bộ đồ dùng do Kit Builder gợi ý chỉ được phép lấy từ các sản phẩm đang ở trạng thái kinh doanh hợp lệ và có số lượng tồn kho khả dụng lớn hơn hoặc bằng số lượng cần mua. Nếu bất kỳ hạng mục thiết yếu nào không có sản phẩm đủ tồn kho đáp ứng, hệ thống thông báo chưa thể tạo bộ kit đầy đủ thay vì trả về một bộ thiếu món thiết yếu mà không cảnh báo.

### R04. Kiểm soát ngân sách và minh bạch cấu trúc chi phí

Tổng thực trả dự kiến = tiền hàng − khoản giảm hợp lệ + phí giao hàng. Trước khi có địa chỉ nhận hàng, phí giao và tổng có bao gồm phí giao chỉ là tạm tính; chưa thể khẳng định bộ nằm trong ngân sách cuối cùng. Nếu vượt mức khách nhập, hệ thống thông báo khoản chênh lệch và cho khách điều chỉnh, không tự tăng ngân sách hoặc bỏ món thiết yếu.

### R05. Ràng buộc khi thay thế sản phẩm và gắn nhãn bộ kit đầy đủ

Khi khách đổi món hoặc chỉnh số lượng, hệ thống kiểm tra công dụng, sức chứa, tồn kho và ngân sách. Nếu thay đổi không còn đáp ứng điều kiện tạo bộ, hệ thống giải thích và giữ kết quả hợp lệ trước đó để khách lựa chọn lại. Nếu khách chủ động bỏ món thiết yếu, những món còn lại vẫn có thể chuyển sang giỏ như hàng mua lẻ, nhưng phải gỡ nhãn “bộ kit đầy đủ” và cảnh báo rõ hạng mục thiếu.

### R06. Quản lý phiên bản quy tắc và bảo toàn lịch sử đơn hàng

Mọi chỉnh sửa đối với bảng quy tắc Kit Builder do quản trị viên thực hiện đều phải qua bước kiểm tra cấu trúc (validation), được cấp mã phiên bản mới khi phát hành và ghi nhận vào nhật ký thay đổi. Mỗi bộ kit được tạo cần gắn với mã phiên bản quy tắc đã dùng để giải thích kết quả. Khi đơn hàng được xác nhận đặt mua, hệ thống lưu bản chụp (snapshot) toàn bộ thông tin sản phẩm, đơn giá, thành phần bộ kit và phiên bản quy tắc vào bản ghi đơn hàng để dữ liệu lịch sử không bị thay đổi khi giá bán hoặc quy tắc được cập nhật trong tương lai.

### R07. Xác thực lại tại máy chủ ở bước Checkout và bảo vệ tồn kho

Trước khi tạo đơn, Backend kiểm tra lại trạng thái sản phẩm, giá, tồn kho, voucher và phí giao. Nếu có thay đổi so với thông tin đã hiển thị, yêu cầu khách xác nhận trước khi chốt đơn. Việc giữ/trừ/hoàn tồn kho phải nhất quán trong giao dịch cơ sở dữ liệu để tránh hai đơn cùng dùng đơn vị tồn cuối; thời điểm giữ/trừ tồn được chốt theo Bảng 2.6.

## 5. Yêu cầu phi chức năng

Mã NFR01–NFR09 dùng trong phase, test và báo cáo.

### NFR01. Giao diện đáp ứng (Responsive)

Các màn hình chính của website hoạt động ổn định và hiển thị đầy đủ thông tin ở tối thiểu hai kích thước màn hình đại diện là máy tính (độ rộng 1366 px) và điện thoại (độ rộng 390 px), không xảy ra lỗi tràn bố cục hoặc che khuất nút thao tác quan trọng (AC08).

### NFR02. Tương tác trải nghiệm người dùng (UX)

Triển khai tối thiểu ba tương tác có mục đích hỗ trợ người dùng rõ ràng, gồm: kiểm tra và báo lỗi trực tiếp tại biểu mẫu đầu vào Kit Builder; cập nhật lại tổng chi phí kèm cảnh báo ngay khi khách thay món hoặc điều chỉnh số lượng; hiển thị thông báo đối chiếu và yêu cầu xác nhận khi giá, tồn kho hoặc phí giao hàng thay đổi ở bước checkout (AC08).

### NFR03. Kiểm tra dữ liệu đầu vào (Validation)

Dữ liệu do người dùng gửi lên phải được kiểm tra ở cả phía trình duyệt (Frontend React) và phía máy chủ (Backend NestJS). Máy chủ tuyệt đối không tin tưởng trực tiếp vào đơn giá, mức giảm giá, phí giao hàng, tổng tiền hoặc quyền hạn do trình duyệt truyền lên mà phải tính toán và xác thực lại từ cơ sở dữ liệu.

### NFR04. Phân quyền và bảo mật hệ thống

Kiểm soát truy cập theo vai trò tại tầng Backend; khách hàng không thể xem hoặc can thiệp đơn hàng và hồ sơ của người dùng khác; người dùng thông thường không thể gọi các API quản trị. Không lưu mật khẩu dạng văn bản thuần; không đưa khóa bí mật (API key, chuỗi kết nối cơ sở dữ liệu, khóa bí mật VNPay, khóa đặc quyền Supabase) vào mã nguồn Frontend hoặc kho lưu trữ GitHub công khai (AC07).

Có biện pháp phù hợp với XSS, SQL injection, CSRF theo cơ chế xác thực được lựa chọn. Hình ảnh tải lên phải được kiểm tra quyền, loại và dung lượng theo giới hạn cấu hình.

### NFR05. Tính nhất quán và toàn vẹn dữ liệu

Ngăn số lượng mua, giá bán hoặc tồn kho âm; lưu bản chụp đơn giá, sản phẩm và phiên bản quy tắc khi tạo đơn; xử lý yêu cầu đặt hàng/thanh toán trùng lặp một cách nhất quán. Cơ chế giữ, trừ và hoàn tồn kho cần được chốt trước khi lập trình và kiểm thử trường hợp hai đơn cùng tranh đơn vị tồn cuối (AC03–AC05).

### NFR06. Kiểm thử nghiệp vụ và tích hợp

Xây dựng bộ ca kiểm thử có kết quả mong đợi, kết quả thực tế và minh chứng, bao gồm tối thiểu 24 ca kiểm thử cho Kit Builder (xét đủ các trường hợp biên về số người, đồ đã có, sức chứa, vượt ngân sách và hết tồn kho) cùng các ca kiểm thử trọng yếu cho luồng checkout, voucher, thanh toán sandbox, phân quyền và cạnh tranh đơn vị tồn kho cuối (AC01–AC07).

### NFR07. Khả năng sử dụng (Usability)

Tổ chức thử nghiệm tác vụ với tối thiểu 8 người dùng thuộc nhóm mục tiêu trên hai kịch bản tương đương (tự chọn mua lẻ và dùng Kit Builder), luân phiên thứ tự thực hiện; hướng tới mục tiêu tối thiểu 6/8 người hoàn tất tác vụ mà không cần hướng dẫn trực tiếp, đồng thời ghi nhận khách quan cả các trường hợp chưa đạt và hạn chế cỡ mẫu.

### NFR08. Triển khai và khả năng bảo trì

Kiến trúc tách biệt giữa Frontend (React, TypeScript, Tailwind CSS) và Backend (NestJS, TypeScript, REST API) kết nối cơ sở dữ liệu PostgreSQL trên Supabase; triển khai bản chạy thử nghiệm qua giao thức HTTPS kèm hướng dẫn cài đặt (setup guide), cấu hình mẫu không chứa khóa bí mật và tài khoản demo hoạt động ổn định đến thời điểm đánh giá cuối kỳ (AC09).

### NFR09. Quản lý nguồn tài nguyên và nhật ký AI

Mọi hình ảnh, biểu tượng, thư viện hoặc mã nguồn tham khảo đều phải ghi rõ nguồn gốc và quyền sử dụng hợp lệ. Quá trình ứng dụng công cụ AI trong phân tích, phản biện và hỗ trợ phát triển phải được ghi chép trung thực vào nhật ký sử dụng AI của nhóm và từng thành viên (`docs/ai-logs/`).

Các mục tiêu kiểm thử và usability trên là mục tiêu, chưa phải kết quả đã đạt được.

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

## 7. Tiêu chí nghiệm thu

Mã AC01–AC10 dùng trong `docs/testing/` và [RELEASE-CHECKLIST](docs/RELEASE-CHECKLIST.md).

### AC01
Luồng chọn hàng, checkout, thanh toán và theo dõi đơn chạy từ đầu đến cuối; đơn, tiền và kho khớp. Bằng chứng: kịch bản demo và dữ liệu CSDL.

### AC02
Builder có 3 tình huống, khoảng 30 SKU và tối thiểu 24 ca kiểm thử; có đồ đã có, số người biên, sức chứa, vượt tiền và không có kết quả. Bằng chứng: bảng quy tắc, expected/actual.

### AC03
Admin phát hành quy tắc mới; bộ gợi ý mới thay đổi theo đó, đơn đã đặt không đổi. Bằng chứng: log phiên bản và test hồi quy.

### AC04
Hết SKU cuối hoặc đổi giá lúc checkout được báo rõ; không có hai đơn hợp lệ cùng tiêu thụ một tồn cuối. Bằng chứng: test đồng thời, snapshot đơn.

### AC05
Payment thành công, thất bại, hủy, sai chữ ký, sai tiền và lặp được xử lý đúng; giao dịch không cập nhật nhiều lần. Bằng chứng: sandbox, log và test tích hợp.

### AC06
Voucher hiệu lực, hết hạn, đơn dưới ngưỡng, hết lượt và mức giảm trần cho đúng tiền; phí giao lưu đúng. Bằng chứng: test server và bản ghi đơn.

### AC07
Khách không xem/sửa đơn người khác; sửa giá từ client không được tin; secret không lộ trong source. Bằng chứng: test phân quyền và bảo mật.

### AC08
Trang chính dùng được ở 1366 px và 390 px; ≥ 5 thuộc tính lọc và 3 tương tác có mục đích. Bằng chứng: ảnh, video và thử tác vụ.

### AC09
Báo cáo, source, phân công, AI log, setup và link demo đủ; không còn lỗi chặn mua hoặc lỗi bảo mật nghiêm trọng đã biết. Bằng chứng: checklist phát hành và commit.

### AC10
Nếu có Innovation (FR18): email được gửi một lần theo đăng ký; đổi ngày và hủy đơn xử lý đúng. Ngày đi không là bảo đảm giao hàng. Bằng chứng: log scheduler, email thử, test.

## 8. Yêu cầu bắt buộc của môn học (đối chiếu)

Các điểm dễ mất điểm:
- Mỗi chức năng trong Chương 3 phải có: mô tả, requirement, design, database, flow, source code, giải thích, before, after, testing, AI sử dụng.
- Bảng đánh giá mức độ tham gia từng thành viên phải chi tiết.
- Phụ lục: GitHub, website, database, setup guide, demo account, screenshots, test cases, nhật ký AI ([docs/ai-logs](docs/ai-logs/AI_USAGE_LOG.md)), nguồn tài nguyên ([SOURCE-INVENTORY](docs/SOURCE-INVENTORY.md)).
- Link phải truy cập được lúc chấm. Commit dồn cuối kỳ không hợp lệ.
- Bảo vệ: GV yêu cầu sửa code trực tiếp (1 chức năng đơn giản + 1 nâng cao).
- Bài tập trên lớp có hạn riêng, làm trước task đồ án ([ASSIGNMENTS](docs/ASSIGNMENTS.md)).
