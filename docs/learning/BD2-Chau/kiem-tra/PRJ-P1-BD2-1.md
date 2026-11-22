# PRJ-P1-BD2-1 — Kiểm tra kiến thức Seed Catalog 
**Người thực hiện:** BD2 Châu  

## Checklist kiến thức

### 1. Khởi tạo PrismaClient và cấu trúc hàm `main()` trong `seed.ts`

Sử dụng `PrismaClient` để kết nối và thao tác với CSDL, hàm `main()` giúp thực hiện các bước seed theo đúng thứ tự. 
Nếu bỏ phần này thì chương trình không thể tạo dữ liệu thông qua Prisma, dẫn đến các chức năng cần dữ liệu ban đầu không hoạt động đúng.

### 2. Seed 6 nhóm hàng Category và 3 mức phí giao ShippingRate bằng `upsert`

Seed 6 nhóm hàng để phân loại sản phẩm và 3 mức phí giao để hệ thống tính phí theo từng khu vực bằng `upsert` để khi chạy seed nhiều lần không bị trùng dữ liệu
Nếu bỏ bước này thì danh mục thiếu nhóm hàng và chức năng tính phí giao hàng có thể không tìm được mức phí phù hợp.

### 3. Seed 26 Product và 30 Sku có kiểm tra validation

Tạo 26 sản phẩm và 30 SKU để hệ thống có đủ dữ liệu danh mục, giá, màu sắc và biến thể sản phẩm. 
Hàm `validateCatalog()` giúp kiểm tra số lượng, mã SKU và dữ liệu trước khi lưu; nếu bỏ bước này thì API danh mục có thể thiếu sản phẩm hoặc dữ liệu không đúng yêu cầu.

### 4. Seed tài khoản Admin từ biến môi trường và mã hóa mật khẩu bằng `scrypt`

Lấy email và mật khẩu Admin từ biến môi trường để không ghi trực tiếp thông tin đăng nhập vào code. 
Mật khẩu được mã hóa bằng `scrypt` trước khi lưu vào CSDL; nếu bỏ bước này thì không có tài khoản Admin được khởi tạo để đăng nhập và quản lý hệ thống.

### 5. Seed bộ quy tắc Kit Builder RuleSet phiên bản 1 ở trạng thái `PUBLISHED`

Tạo RuleSet v1 gồm 21 quy tắc để Kit Builder có cơ sở lựa chọn và tính số lượng sản phẩm theo nhu cầu. Trạng thái `PUBLISHED` giúp xác định bộ quy tắc đã được công bố để sử dụng; nếu không seed thì Kit Builder có thể không tìm được bộ quy tắc phù hợp để tính toán.

### 6. Đối chiếu số liệu CSDL và kiểm tra API danh mục sản phẩm

Kiểm tra số lượng dữ liệu sau khi seed và đối chiếu với yêu cầu gồm 6 Category, 3 ShippingRate, 26 Product và 30 SKU, kiểm tra dữ liệu trả về từ API danh mục. 
Bước này giúp phát hiện trường hợp seed chạy thành công nhưng dữ liệu bị thiếu hoặc API hiển thị chưa đúng; nếu bỏ qua thì khó xác nhận kết quả thực tế.

## 7. Chỗ khó nhất trong task: Lúc đầu sai ở đâu, sửa thế nào?

Phần khó nhất: xử lý `upsert` khi chạy seed lại, vì nếu cập nhật cả `stock` thì số lượng tồn kho đang có có thể bị đưa về giá trị ban đầu. 
Cách kiểm tra: đổi tồn kho của SKU `DAY-TM-001` xuống 35 rồi chạy seed lại; sau đó giữ `stock` và `reserved` chỉ trong phần `create`, không đưa vào `update` để tránh ghi đè tồn kho.

## Kết luận

Qua task này, hiểu cách sử dụng Prisma để khởi tạo dữ liệu, kiểm tra tính hợp lệ và tránh tạo dữ liệu trùng khi chạy seed nhiều lần, ngoài việc seed thành công, cần kiểm tra dữ liệu trong CSDL và API để bảo đảm hệ thống hoạt động đúng yêu cầu.
