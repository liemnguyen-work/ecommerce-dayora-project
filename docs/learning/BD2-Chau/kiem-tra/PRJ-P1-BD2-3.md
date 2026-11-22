# PRJ-P1-BD2-3 — Kiểm tra kiến thức API Admin danh mục, sản phẩm, SKU
**Người thực hiện:** BD2 Châu

## Checklist kiến thức

### 1. Giải thích các ca kiểm thử trong `admin-catalog.spec.ts`

File `admin-catalog.spec.ts` gồm 10 ca kiểm thử, dùng để kiểm tra chức năng quản lý danh mục, sản phẩm và SKU của Admin.

1. **`returns products with SKU relations for the admin editor`:** Kiểm tra API trả danh sách sản phẩm kèm thông tin SKU để Admin có đủ dữ liệu xem và chỉnh sửa.
2. **`requires authentication and admin role`:** Kiểm tra người chưa đăng nhập hoặc không có quyền Admin sẽ không được truy cập API quản lý danh mục.
3. **`rejects invalid prices and immutable SKU codes`:** Kiểm tra hệ thống từ chối giá không hợp lệ và không cho phép thay đổi mã SKU đã tạo.
4. **`validates updates against existing price and reservations`:** Kiểm tra giá cập nhật hợp lệ và tồn kho không được thấp hơn số lượng đã giữ chỗ (`reserved`).
5. **`hides product and SKU by setting inactive`:** Kiểm tra chức năng ẩn sản phẩm và SKU bằng cách chuyển trạng thái sang `INACTIVE` thay vì xóa khỏi CSDL.
6. **`returns conflict for duplicate slug on create and update`:** Kiểm tra khi tạo hoặc cập nhật sản phẩm bị trùng `slug`, API trả về HTTP `409 Conflict`.
7. **`creates product with scenarios`:** Kiểm tra tạo sản phẩm thành công khi có danh sách `scenarios` hợp lệ.
8. **`updates scenarios and preserves omitted field`:** Kiểm tra cập nhật `scenarios` đúng dữ liệu và giữ nguyên giá trị cũ nếu không truyền trường này.
9. **`rejects invalid scenarios before Prisma`:** Kiểm tra API từ chối giá trị `scenarios` không hợp lệ bằng HTTP `400` trước khi thực hiện thao tác với Prisma.
10. **`returns 404 when hiding a missing product`:** Kiểm tra khi ẩn sản phẩm không tồn tại, hệ thống trả HTTP `404 Not Found`.

### 2. Viết DTO tạo và sửa Category, Product, Sku trong `admin-catalog.dto.ts`

Tạo DTO để quy định và kiểm tra dữ liệu đầu vào khi thêm hoặc sửa Category, Product và SKU, như tên, mã, giá, tồn kho và các trường bắt buộc.

Nếu bỏ bước này thì API có thể nhận dữ liệu sai kiểu, giá không hợp lệ hoặc thiếu thông tin, làm dữ liệu danh mục không đúng và các test validation thất bại.

### 3. Viết `AdminCatalogController` với `JwtAuthGuard`, `RolesGuard`

Tạo Controller để định nghĩa các API quản lý danh mục, sản phẩm và SKU; sử dụng `JwtAuthGuard` để xác thực đăng nhập và `RolesGuard` để kiểm tra quyền Admin.

Nếu bỏ Controller thì các endpoint không hoạt động; nếu bỏ Guard thì người dùng không có quyền Admin có thể truy cập hoặc thay đổi dữ liệu quản lý.

### 4. Viết hàm update SKU kiểm tra ràng buộc giá và số lượng giữ chỗ

Kiểm tra dữ liệu trước khi cập nhật SKU, bảo đảm giá bán hợp lệ, mã SKU không bị thay đổi và tồn kho không nhỏ hơn số lượng đã giữ chỗ (`reserved`).

Nếu bỏ bước này thì có thể cập nhật giá sai hoặc giảm tồn kho xuống dưới lượng đã được giữ cho đơn hàng, gây sai lệch dữ liệu khi bán hàng.

### 5. Viết các endpoint ẩn sản phẩm và SKU

Xây dựng endpoint để Admin ẩn Product hoặc SKU bằng cách chuyển trạng thái sang `INACTIVE`, thay vì xóa trực tiếp dữ liệu trong CSDL.

Nếu bỏ bước này thì Admin không thể ngừng bán những sản phẩm không còn phù hợp; nếu xóa trực tiếp có thể ảnh hưởng dữ liệu liên quan và lịch sử đơn hàng.

### 6. Bắt lỗi Prisma `P2002` chuyển thành HTTP `409 Conflict`

Xử lý lỗi `P2002` của Prisma khi tạo hoặc cập nhật sản phẩm có giá trị `slug` bị trùng, sau đó chuyển thành HTTP `409 Conflict` để thông báo đúng nguyên nhân.

Nếu bỏ bước này thì lỗi trùng dữ liệu có thể bị trả về như lỗi máy chủ, khiến frontend khó xác định và hiển thị thông báo phù hợp cho người dùng.

## 7. Chỗ khó nhất trong task: Lúc đầu sai ở đâu, sửa thế nào?

Phần khó nhất là kiểm tra dữ liệu `scenarios` khi tạo sản phẩm. Ban đầu test truyền `['BEACH', 'INVALID']` nhưng API vẫn trả HTTP `200` thay vì `400`, nghĩa là giá trị không hợp lệ chưa được chặn trước khi gọi Prisma.

Hướng xử lý là bổ sung kiểm tra `scenarios` theo các giá trị enum được cho phép trong DTO, đồng thời rà soát cách khai báo để không phát sinh lỗi lint. Sau khi điều chỉnh, chạy lại `admin-catalog.spec.ts` để xác nhận API từ chối dữ liệu sai và các ca kiểm thử đều đạt.

## Kết luận

Qua task này, hiểu rõ hơn cách xây dựng API quản lý danh mục, sản phẩm và SKU bằng NestJS, từ kiểm tra dữ liệu đầu vào bằng DTO, phân quyền bằng Guard đến xử lý nghiệp vụ trong Service.

Ngoài việc tạo và cập nhật dữ liệu thành công, cần kiểm tra các trường hợp ngoại lệ như giá không hợp lệ, tồn kho nhỏ hơn `reserved`, trùng `slug` và dữ liệu `scenarios` sai để bảo đảm API hoạt động đúng và dữ liệu CSDL nhất quán.
