# Vai trò và quyền người dùng DAYORA

## 1. Tổng quan

DAYORA có ba nhóm truy cập: khách chưa đăng nhập, khách hàng có tài khoản và quản trị viên. Khách chưa đăng nhập là trạng thái truy cập công khai; quyền khách hàng và quản trị được kiểm tra theo tài khoản.

Tài liệu này thống nhất với [REQUIREMENTS.md](../REQUIREMENTS.md). Vai trò người dùng website khác với vai trò thành viên phát triển trong [PROJECT_PLAN.md](../PROJECT_PLAN.md).

## 2. Bảng vai trò

| Vai trò | Nhiệm vụ chính | Quyền dự kiến |
| :--- | :--- | :--- |
| Khách chưa đăng nhập | Tìm hiểu sản phẩm và chuẩn bị bộ đồ dùng. | Xem nội dung công khai, tìm kiếm, lọc, sắp xếp, xem chi tiết và sử dụng Kit Builder; đăng ký hoặc đăng nhập. |
| Khách hàng | Mua hàng, quản lý thông tin và theo dõi đơn của mình. | Quản lý hồ sơ, giỏ, voucher, checkout, thanh toán, lịch sử, trạng thái đơn, sản phẩm đã xem và đánh giá đủ điều kiện. |
| Quản trị viên | Quản lý dữ liệu và hoạt động cửa hàng. | Quản lý sản phẩm, danh mục, nhóm hàng, user, đơn, tồn, ưu đãi, voucher, quy tắc Builder và dashboard. |

## 3. Khách chưa đăng nhập

Được xem trang chủ, danh mục, giá, biến thể, thông số, đánh giá công khai và sản phẩm liên quan; tìm kiếm, lọc, sắp xếp.

Được nhập nhu cầu, xem và điều chỉnh bộ gợi ý từ Kit Builder. Không được truy cập dữ liệu riêng của khách hàng hoặc chức năng quản trị.

Theo phạm vi hiện tại, phải đăng nhập trước khi dùng giỏ hàng và đặt hàng. Bộ đang tạo được giữ qua bước đăng nhập và được kiểm tra lại trước khi thêm vào giỏ. Chưa áp dụng guest checkout.

## 4. Khách hàng có tài khoản

Được dùng chức năng công khai và:

* Đăng nhập, đăng xuất và cập nhật hồ sơ của mình.
* Xem sản phẩm đã xem, lịch sử mua và trạng thái đơn của mình.
* Thêm sản phẩm mua lẻ hoặc bộ từ Builder vào giỏ; sửa số lượng và xóa.
* Áp dụng voucher đủ điều kiện, nhập địa chỉ, xem phí và tổng tiền.
* Đặt hàng, thanh toán thử nghiệm và xem kết quả của đơn mình.
* Đánh giá sản phẩm khi đáp ứng điều kiện sau mua đã được xác định.

Không được xem hoặc sửa hồ sơ, giỏ, đơn của người khác; không tự sửa giá, mức giảm, tồn kho, quyền hoặc trạng thái thanh toán/giao hàng.

Chưa mặc định có quyền hủy đơn ở mọi trạng thái. Chính sách hủy và đánh giá phải được chốt trong yêu cầu trước khi triển khai.

FR18 về checklist và email nhắc chỉ khả dụng nếu được nhóm xác nhận triển khai; không được coi là đã có trong phiên bản đầu.

## 5. Quản trị viên

Được thực hiện các nghiệp vụ thuộc quyền:

* Quản lý sản phẩm, biến thể, danh mục, nhóm hàng và tồn kho.
* Quản lý người dùng và quyền truy cập theo quy trình được phép.
* Xem, xử lý đơn và cập nhật trạng thái hợp lệ.
* Quản lý khuyến mãi, voucher và điều kiện áp dụng.
* Cấu hình, kiểm tra, phát hành phiên bản quy tắc Builder và xem nhật ký.
* Xem dashboard theo công thức, trạng thái và khoảng thời gian đã xác định.

Quản trị viên không được bỏ qua kiểm tra nghiệp vụ, làm thay đổi dữ liệu đơn đã chốt theo giá/quy tắc mới hoặc tùy ý ghi nhận thanh toán khi thiếu căn cứ xác minh.

Mật khẩu gốc không được hiển thị. Dữ liệu khách hàng chỉ được truy cập trong phạm vi cần cho nghiệp vụ được giao.

## 6. Nguyên tắc thực hiện phân quyền

React có thể điều chỉnh menu theo quyền, nhưng việc ẩn nút hoặc bảo vệ route phía Frontend không thay thế kiểm tra tại NestJS.

Backend xác minh danh tính, quyền và quyền sở hữu tài nguyên ở các API cần bảo vệ. Không tin user ID, vai trò, giá, tổng tiền hoặc trạng thái giao dịch do trình duyệt tự khai.

Việc lưu trên PostgreSQL/Supabase không tự bảo đảm quyền ứng dụng. Cấu hình truy cập dữ liệu và Storage phải phù hợp cách sử dụng, không đưa khóa đặc quyền vào Frontend.

Khách được xem ảnh sản phẩm công khai; quyền tải lên, thay hoặc xóa ảnh sản phẩm chỉ dành cho thao tác quản trị được cấp quyền, có kiểm tra loại và dung lượng tệp.

Mọi thay đổi quyền phải cập nhật yêu cầu, API, giao diện và ca kiểm thử liên quan. Hiện chưa tách thêm vai trò nhân viên kho hoặc bán hàng khi chưa có nhu cầu được xác nhận.

## 7. Tình huống kiểm tra dự kiến

* Khách chưa đăng nhập xem được nội dung công khai nhưng không gọi được API quản trị.
* Khách phải đăng nhập trước thao tác giỏ/đặt hàng; lựa chọn Builder được khôi phục và kiểm tra lại.
* Khách A xem, sửa được dữ liệu của mình nhưng không truy cập dữ liệu khách B bằng cách đổi mã trên URL hoặc request.
* Tài khoản khách không thực hiện được thao tác admin dù gửi yêu cầu trực tiếp.
* Request tự sửa vai trò, giá hoặc trạng thái thanh toán không được tin cậy.
* Quản trị viên thực hiện được tác vụ được phép; chuyển trạng thái trái quy trình bị từ chối.
* Tải/xóa ảnh không đủ quyền bị từ chối và không làm thay đổi dữ liệu.

Đây là tình huống dùng để thiết kế kiểm thử, chưa phải kết quả kiểm thử đã đạt.
