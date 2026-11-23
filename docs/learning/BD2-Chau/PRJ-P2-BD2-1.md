# PRJ-P2-BD2-1 — Kiểm tra kiến thức API giỏ hàng
**Người thực hiện:** BD2 Châu

## Checklist kiến thức

### 1. Giải thích các ca kiểm thử trong `cart.service.spec.ts`

File `cart.service.spec.ts` gồm 3 ca kiểm thử:

1. **`cảnh báo hết hàng và thiếu tồn dựa trên tổng các dòng cùng SKU`:** Kiểm tra hệ thống cộng tổng số lượng của các dòng giỏ hàng có cùng SKU để phát hiện sản phẩm hết hàng hoặc không đủ tồn kho.
2. **`thêm cùng SKU và cùng kitGroupId thì cộng dồn số lượng thay vì tạo dòng mới`:** Kiểm tra khi thêm sản phẩm đã tồn tại trong cùng nhóm kit, hệ thống tăng số lượng thay vì tạo thêm dòng trùng.
3. **`không sửa hoặc xóa item của người khác`:** Kiểm tra người dùng chỉ được cập nhật hoặc xóa sản phẩm trong giỏ hàng của chính mình.

### 2. Viết `CartService.get()` đọc giỏ hàng và cảnh báo tồn kho

Xây dựng hàm `get()` để lấy giỏ hàng theo người dùng, trả thông tin sản phẩm, số lượng, giá và kiểm tra tồn kho theo tổng các dòng cùng SKU.

Nếu bỏ bước này thì không thể hiển thị chính xác giỏ hàng và không phát hiện trường hợp tổng số lượng đặt vượt quá tồn kho khả dụng.

### 3. Viết `CartService.add()` thêm SKU trong transaction và gom số lượng

Xây dựng hàm `add()` để thêm sản phẩm vào giỏ hàng trong transaction, cộng dồn số lượng nếu trùng SKU và `kitGroupId`, tránh tạo những dòng giỏ hàng không cần thiết.

Nếu bỏ bước này thì chức năng thêm vào giỏ hàng không hoạt động đúng; nếu không kiểm soát transaction và dữ liệu trùng, số lượng sản phẩm có thể bị sai khi có nhiều yêu cầu cập nhật.

### 4. Viết `CartService.update()`, `remove()`, `clear()` giới hạn theo người dùng

Xây dựng các hàm cập nhật số lượng, xóa từng sản phẩm và xóa toàn bộ giỏ hàng, đồng thời kiểm tra quyền sở hữu để chỉ thao tác trên dữ liệu của người dùng hiện tại.

Nếu bỏ bước này thì người dùng không thể chỉnh sửa hoặc làm trống giỏ hàng; nếu không kiểm tra quyền sở hữu có thể sửa hoặc xóa giỏ hàng của người khác.

### 5. Kết nối `CartController`, DTO và `CartModule` vào backend

Tạo Controller để cung cấp các endpoint giỏ hàng, DTO để kiểm tra dữ liệu đầu vào và Module để đăng ký Controller, Service vào hệ thống NestJS.

Nếu bỏ bước này thì API giỏ hàng không được kết nối đầy đủ vào backend, khiến frontend không thể gọi chức năng thêm, xem, cập nhật hoặc xóa sản phẩm.

## 6. Chỗ khó nhất trong task: Lúc đầu sai ở đâu, sửa thế nào?

Phần khó nhất là xử lý nhiều dòng giỏ hàng có cùng SKU nhưng khác nhóm kit, vì nếu chỉ kiểm tra tồn kho theo từng dòng thì tổng số lượng có thể vượt quá tồn kho thực tế.

Cách xử lý là cộng tổng số lượng theo SKU trước khi đối chiếu với tồn kho khả dụng, đồng thời chỉ gộp dòng khi cả SKU và `kitGroupId` giống nhau. Kiểm tra lại bằng các ca test về thiếu tồn và cộng dồn số lượng.

## Kết luận

Qua task này, hiểu cách xây dựng API giỏ hàng bằng NestJS và Prisma, sử dụng transaction để bảo đảm tính nhất quán, kiểm tra tồn kho theo SKU và giới hạn thao tác theo đúng người dùng.

Ngoài việc thêm sản phẩm thành công, cần kiểm tra các trường hợp trùng SKU, thiếu tồn kho và truy cập giỏ hàng của người khác để bảo đảm dữ liệu chính xác và an toàn.
