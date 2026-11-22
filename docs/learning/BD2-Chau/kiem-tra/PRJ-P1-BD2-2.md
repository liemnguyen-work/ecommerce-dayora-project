# PRJ-P1-BD2-2 — Kiểm tra kiến thức API Admin tài khoản
**Người thực hiện:** BD2 Châu  

## Checklist kiến thức

### 1. Viết DTO phân trang và trạng thái tài khoản trong `admin-users.dto.ts`

Tạo DTO để kiểm tra và giới hạn dữ liệu đầu vào như từ khóa tìm kiếm `q`, số trang `page` và trạng thái `isActive`, tránh nhận dữ liệu sai kiểu hoặc không hợp lệ.
Nếu bỏ bước này thì API có thể nhận số trang âm, từ khóa quá dài hoặc trạng thái không đúng kiểu, làm sai kết quả truy vấn và ảnh hưởng đến các test validation.

### 2. Viết hàm `list()` trong `AdminUsersService` hỗ trợ tìm kiếm và phân trang

Xây dựng hàm `list()` để admin tìm kiếm tài khoản theo email hoặc họ tên, không phân biệt chữ hoa/thường, phân trang 20 tài khoản và thống kê số đơn hàng `orderCount`.
Nếu bỏ bước này thì admin không thể xem, tìm kiếm và phân trang danh sách người dùng; API cũng có nguy cơ trả về thông tin nhạy cảm như `passwordHash` nếu không giới hạn dữ liệu bằng `select`.

### 3. Viết hàm `update()` chặn admin tự khóa tài khoản của chính mình

Xây dựng hàm `update()` để admin thay đổi trạng thái hoạt động của tài khoản, đồng thời kiểm tra tài khoản có tồn tại và không cho phép admin tự khóa chính mình.
Nếu bỏ kiểm tra này thì admin có thể tự vô hiệu hóa tài khoản đang đăng nhập, gây khó khăn khi quản trị; các trường hợp tài khoản không tồn tại cũng không được xử lý đúng lỗi `404`.

### 4. Tạo `AdminUsersController` với `JwtAuthGuard`, `RolesGuard` và khai báo module

Tạo Controller để cung cấp các API quản lý tài khoản và sử dụng `JwtAuthGuard`, `RolesGuard` nhằm kiểm tra đăng nhập và quyền `ADMIN` trước khi cho phép truy cập.
Nếu bỏ Controller hoặc không khai báo module thì API không hoạt động; nếu bỏ Guard thì người chưa đăng nhập hoặc không có quyền admin có thể truy cập chức năng quản lý tài khoản.

### 5. Chạy thử nghiệm thực tế API admin tài khoản và chuẩn bị nghiệm thu

Kiểm tra API với các trường hợp đăng nhập bằng admin, truy cập bằng tài khoản thường, tìm kiếm, phân trang, khóa/mở khóa tài khoản và chặn admin tự khóa chính mình.
Bước này giúp đối chiếu kết quả thực tế với yêu cầu và phát hiện lỗi phân quyền hoặc xử lý dữ liệu; nếu bỏ qua thì dù code build thành công vẫn chưa thể xác nhận API hoạt động đúng.

## 6. Chỗ khó nhất trong task: Lúc đầu sai ở đâu, sửa thế nào?

Phần khó nhất là tách đúng phạm vi xử lý giữa hàm `list()` và `update()`. Ban đầu phần triển khai bước 2 có đưa thêm logic `update()` dù chức năng này thuộc bước 3, chưa đúng yêu cầu mỗi bước là một commit riêng.
Cách sửa: tách phần `update()` ra khỏi bước 2, chỉ giữ logic tìm kiếm, phân trang và dữ liệu trả về trong `list()`, sau đó triển khai `update()` ở bước 3 để dễ kiểm tra và quản lý từng commit.

## Kết luận

Qua task này, hiểu rõ hơn cách xây dựng API quản lý tài khoản bằng NestJS, sử dụng DTO để kiểm tra dữ liệu đầu vào, Service để xử lý nghiệp vụ và Guard để phân quyền truy cập. Ngoài việc xây dựng chức năng, cần kiểm tra các trường hợp ngoại lệ và bảo vệ thông tin nhạy cảm để bảo đảm API hoạt động đúng yêu cầu và an toàn.
