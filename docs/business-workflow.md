# Quy trình nghiệp vụ DAYORA

## 1. Tổng quan

DAYORA có hai luồng chính: tạo bộ và mua bằng Kit Builder; mua từng sản phẩm. Hai luồng dùng chung giỏ hàng, checkout, thanh toán và xử lý đơn.

Các bên tham gia: khách chưa đăng nhập hoặc khách hàng, hệ thống DAYORA, VNPay Sandbox và quản trị viên. Quyền truy cập theo [user-roles.md](user-roles.md); phạm vi và tiêu chí nghiệm thu theo [REQUIREMENTS.md](../REQUIREMENTS.md).

Khách chưa đăng nhập được xem sản phẩm và dùng Builder, cần đăng nhập trước khi thêm giỏ và đặt hàng. Hệ thống giữ lựa chọn qua đăng nhập và kiểm tra lại dữ liệu trước thao tác tiếp theo.

Các quy trình dưới đây là đặc tả dự kiến, không phải minh chứng chức năng đã chạy thành công.

## 2. Tạo bộ và mua hàng bằng Kit Builder

1. Khách chọn picnic ăn nhẹ, hẹn hò buổi chiều hoặc đi biển trong ngày.
2. Khách nhập số người từ 1 đến 8, ngân sách và lượng hoặc sức chứa của đồ đã có.
3. DAYORA kiểm tra đầu vào; nếu sai hoặc thiếu thì báo trường cần sửa.
4. Builder xác định nhu cầu theo tình huống, tính phần còn thiếu theo công dụng và sức chứa. Phân biệt món theo người, dùng chung, thiết yếu và tùy chọn.
5. Hệ thống lựa chọn sản phẩm còn bán và đủ tồn, hiển thị số lượng, lý do, thành phần chi phí và tình trạng phù hợp ngân sách. Phí chưa có địa chỉ được ghi tạm tính.
6. Khách xem và thay món. Hệ thống tính lại số lượng, sức chứa, tồn và chi phí; cảnh báo vượt ngân sách hoặc thiếu món thiết yếu, không tự tăng ngân sách.
7. Nếu chưa đăng nhập, khách đăng nhập hoặc đăng ký. Hệ thống khôi phục lựa chọn và kiểm tra lại trước khi thêm sản phẩm vào giỏ.
8. Khách thêm bộ vào giỏ, điều chỉnh số lượng, xóa món hoặc dùng voucher. Bộ được hiển thị đúng tình trạng sau thay đổi, không tiếp tục gọi là đầy đủ khi đã bỏ món thiết yếu.
9. Khách tiếp tục checkout và xử lý đơn theo mục 4.

Nếu không có bộ đáp ứng điều kiện, hệ thống giải thích nguyên nhân như thiếu hàng hoặc ngân sách chưa đủ; cho khách điều chỉnh đầu vào hoặc mua lẻ. Không tự bỏ món thiết yếu để tạo kết quả có vẻ phù hợp.

## 3. Mua lẻ

1. Khách truy cập trang chủ, danh mục hoặc tìm kiếm, lọc, sắp xếp sản phẩm.
2. Khách xem chi tiết, chọn biến thể và số lượng.
3. Nếu cần, khách đăng nhập; lựa chọn liên quan được giữ và kiểm tra lại.
4. Khách thêm sản phẩm vào giỏ, có thể quay lại mua thêm.
5. Khách điều chỉnh giỏ, sử dụng voucher và xem tổng tiền.
6. Khách tiếp tục checkout và xử lý đơn theo mục 4.

## 4. Checkout, thanh toán và xử lý đơn dùng chung

### 4.1. Xác nhận thông tin

Khách nhập người nhận, liên hệ và địa chỉ. Backend kiểm tra dữ liệu, tính phí theo bảng quy tắc và kiểm tra điều kiện voucher.

Backend tự xác định lại giá, tồn, ưu đãi và tổng, không tin tổng tiền do React gửi lên. Giỏ trống hoặc dữ liệu không hợp lệ không được tạo đơn.

Nếu có thay đổi, hệ thống hiển thị và yêu cầu khách xác nhận lại. Với bộ từ Builder, thông báo rõ nếu tổng sau phí vượt ngân sách hoặc thành phần không còn đủ.

### 4.2. Tạo đơn

Sau xác nhận, hệ thống tạo đơn và lưu dữ liệu đã chốt: sản phẩm, biến thể, số lượng, đơn giá, giảm giá, phí, tổng và thông tin Builder liên quan.

Kiểm tra và cập nhật tồn, voucher theo chính sách được thống nhất, có cơ chế ngăn hai đơn cùng sử dụng lượng hàng cuối hoặc vượt giới hạn voucher. Thao tác xác nhận lặp không tạo nhiều đơn ngoài ý muốn.

Thời điểm giữ, trừ, hoàn tồn và thời hạn đơn chờ phải được chốt trước khi lập trình; tài liệu này không tự đặt giá trị thời hạn.

### 4.3. Thanh toán VNPay Sandbox

Backend tạo yêu cầu thanh toán gắn đúng đơn và số tiền, sau đó chuyển khách sang VNPay Sandbox.

Khi nhận kết quả, Backend kiểm tra chữ ký, thông tin đơn, số tiền và trạng thái trước khi cập nhật. Kết quả chuyển hướng trên trình duyệt không được dùng như căn cứ duy nhất để ghi nhận tiền hoặc hủy đơn.

Thông báo lặp phải được xử lý nhất quán, không ghi nhận tiền hoặc cập nhật tồn nhiều lần. Các trường hợp thất bại, khách hủy, mất kết nối, không quay lại website hoặc kết quả đến muộn được xử lý theo trạng thái thực tế và chính sách đã chốt.

### 4.4. Xử lý và giao hàng

Quản trị viên xem và xử lý đơn theo trạng thái hợp lệ, cập nhật tiến độ giao hàng. Không tự bỏ qua các điều kiện nghiệp vụ hoặc ghi nhận đã thanh toán khi thiếu căn cứ.

Trạng thái thanh toán được quản lý riêng với trạng thái giao hàng. Phí giao được lưu vào đơn; hiện chưa tích hợp API vận chuyển.

### 4.5. Theo dõi và đánh giá

Khách xem chi tiết, lịch sử và trạng thái đơn của mình. Backend kiểm tra quyền sở hữu ở mỗi thao tác cần bảo vệ.

Khách được đánh giá sản phẩm khi đủ điều kiện sau mua. Điều kiện trạng thái, số lần và quyền chỉnh sửa được xác định trong yêu cầu trước khi triển khai.

## 5. Quy tắc số lượng và ngân sách

Món theo người được tính từ định lượng còn thiếu. Món dùng chung được tính từ sức chứa còn thiếu và làm tròn lên theo sức chứa mỗi sản phẩm; không tạo số lượng mua âm.

Ví dụ dữ liệu giả định: nhóm 5 người, một thảm đủ cho 4 người thì cần 2 thảm khi chưa có. Nếu đã có một thảm cùng công dụng cho 4 người, cần thêm 1 thảm. Sức chứa phải có căn cứ hoặc nhãn giả định, không suy số người chỉ từ kích thước.

**Tổng thực trả = Tiền hàng - Giảm giá + Phí giao hàng.**

Ngân sách là mục tiêu tổng thực trả, không tự chuyển thành ngân sách chỉ tính tiền hàng. Chưa có địa chỉ thì phí và tổng liên quan là tạm tính; sau đó phải tính lại.

Quy tắc chọn SKU, ưu tiên món và hành vi khi khách chủ động vượt ngân sách phải được chốt. Không coi thuật toán tham lam không tìm thấy phương án là bằng chứng chắc chắn không tồn tại bộ phù hợp nếu chưa kiểm chứng khả năng tìm kiếm của thuật toán.

## 6. Ngoại lệ chính

| Tình huống | Cách xử lý |
| :--- | :--- |
| Đầu vào không hợp lệ | Báo rõ trường sai; chưa tính bộ hoặc tạo đơn từ dữ liệu không hợp lệ. |
| Đồ đã có đủ nhu cầu | Thông báo phù hợp; không buộc khách mua thêm hoặc tạo số lượng âm. |
| Không tìm được bộ | Nêu điều kiện chưa đáp ứng và giới hạn kết quả tìm; không tự tăng ngân sách hoặc bỏ món thiết yếu. |
| Thiếu tồn | Báo món thiếu hoặc thay thế phù hợp; kiểm tra lại trước chốt đơn. |
| Xóa món thiết yếu | Có thể mua các món riêng, nhưng không hiển thị bộ là đầy đủ. |
| Giá, tồn, voucher hoặc phí đổi | Tính lại, thông báo và yêu cầu xác nhận trước hoàn tất. |
| Voucher không hợp lệ | Không áp dụng; báo nguyên nhân và cập nhật tổng. |
| Thanh toán lỗi, hủy hoặc không hợp lệ | Không tự ghi nhận đã thanh toán; xử lý đơn, tồn và voucher theo chính sách. |
| Thông báo hoặc thao tác lặp | Không tạo đơn, ghi nhận tiền, trừ hoặc hoàn tồn nhiều lần. |
| Kết quả thanh toán đến muộn | Xác minh với trạng thái đơn hiện tại và chính sách xử lý; không tự đổi về thành công chỉ từ màn hình khách. |
| Truy cập dữ liệu người khác | Từ chối tại Backend, không thay đổi dữ liệu. |

## 7. Sơ đồ và minh chứng thiết kế

Tài liệu nhóm đã có hai sơ đồ BPMN cho mua bằng Builder và mua lẻ:

[Bản sơ đồ nhóm cung cấp](https://drive.google.com/file/d/1ZsrXA9Tg8GIWAY6LCSLZQuAWME2325tv/view?usp=sharing).

Cần đối chiếu bản sơ đồ với chính sách đăng nhập, giỏ hàng và thanh toán hiện tại trước dùng làm thiết kế cuối. Trong đợt này chưa xác minh lại quyền truy cập và chưa sao chép ảnh sơ đồ vào repository; mô tả bước ở trên là căn cứ đọc trực tiếp.

## 8. Chính sách còn cần chốt

* Cách giữ bộ nháp và xử lý khi đăng nhập thất bại hoặc quy tắc thay phiên bản.
* Cách nhóm các dòng giỏ từ Builder và cảnh báo sau khi sửa hoặc xóa.
* Bảng định lượng, chọn SKU, ưu tiên món và giới hạn thuật toán.
* Bảng phí, làm tròn, điều kiện và thứ tự áp dụng ưu đãi.
* Trạng thái đơn, thời điểm giữ/trừ/hoàn tồn, hạn thanh toán, hủy và thanh toán đến muộn.
* Điều kiện đánh giá sau mua và quyền hủy đơn của khách.

Sau khi xác nhận, cập nhật đồng bộ REQUIREMENTS.md, tài liệu này, sơ đồ, API và ca kiểm thử. Không tự coi các chính sách còn mở là đã được nhóm phê duyệt.
