# PRJ-P2-BD2-2 — Kiểm tra kiến thức Xem trước đơn hàng
**Người thực hiện:** BD2 Châu

## Checklist kiến thức

### 1. Giải thích các ca kiểm thử trong `orders.service.spec.ts`

File `orders.service.spec.ts` gồm 8 ca kiểm thử:

1. **`áp dụng mã voucher nhập chữ thường`:** Kiểm tra hệ thống có thể chuẩn hóa mã voucher để nhận diện đúng mã dù người dùng nhập bằng chữ thường.
2. **`áp trần phần trăm và cảnh báo giá, tồn`:** Kiểm tra mức giảm phần trăm không vượt trần quy định và hệ thống cảnh báo khi giá sản phẩm thay đổi hoặc tồn kho không đủ.
3. **`miễn phí HCM khi đủ 500.000 sau giảm`:** Kiểm tra đơn hàng tại khu vực đủ điều kiện được miễn phí giao hàng khi đạt ngưỡng 500.000đ theo quy tắc tính tiền.
4. **`rejects a voucher before its start date and after the user limit`:** Kiểm tra voucher chưa đến thời gian sử dụng hoặc vượt giới hạn lượt dùng của người dùng sẽ bị từ chối.
5. **`tính phí 30000 khi HCM chưa đủ ngưỡng miễn phí`:** Kiểm tra hệ thống tính phí giao hàng 30.000đ khi đơn ở khu vực tương ứng chưa đạt điều kiện miễn phí.
6. **`ngoài HCM vẫn tính phí 40000 khi đơn trên 500000`:** Kiểm tra đơn hàng ngoài TP.HCM vẫn áp dụng phí giao hàng 40.000đ theo quy tắc khu vực, dù giá trị đơn vượt 500.000đ.
7. **`chưa có địa chỉ thì phí giao chỉ là tạm tính`:** Kiểm tra khi chưa cung cấp địa chỉ giao hàng, hệ thống đánh dấu phí giao là ước tính và chưa xác nhận mức phí cuối cùng.
8. **`voucher không tồn tại không làm giảm tổng tiền`:** Kiểm tra mã voucher không tồn tại được thông báo không hợp lệ và không làm thay đổi số tiền phải thanh toán.

### 2. Khai báo `PreviewDto` nhận địa chỉ, voucher và danh sách giá dự kiến

Tạo `PreviewDto` để nhận và kiểm tra thông tin địa chỉ giao hàng, mã voucher và danh sách giá sản phẩm mà frontend gửi lên để đối chiếu.

Nếu bỏ bước này thì API không có cơ chế kiểm tra dữ liệu đầu vào đầy đủ, dễ nhận địa chỉ sai cấu trúc hoặc thông tin giá không hợp lệ.

### 3. Viết `OrdersService.preview()` lấy giỏ hàng và cảnh báo thay đổi

Xây dựng hàm `preview()` để lấy giỏ hàng hiện tại, tính tổng tiền sản phẩm và so sánh giá thực tế với giá dự kiến từ frontend, đồng thời giữ các cảnh báo thiếu tồn kho.

Nếu bỏ bước này thì người dùng không thể xem trước đơn hàng chính xác và có thể không nhận được cảnh báo khi giá thay đổi hoặc số lượng sản phẩm không đủ.

### 4. Tính giảm giá voucher và phí giao hàng phía server

Sử dụng dữ liệu và quy tắc tính tiền phía server để kiểm tra voucher, giới hạn sử dụng, mức giảm tối đa và tính phí giao theo khu vực, sau đó trả tổng tiền dự kiến.

Nếu bỏ bước này thì frontend có thể hiển thị số tiền không đúng; việc tin trực tiếp vào giá hoặc mức giảm từ trình duyệt còn có nguy cơ làm sai giá trị thanh toán.

## 5. Chỗ khó nhất trong task: Lúc đầu sai ở đâu, sửa thế nào?

Phần khó nhất là đồng bộ giá dự kiến từ frontend với giá thực tế trong CSDL, đồng thời tính đúng voucher và phí giao hàng vì các yếu tố này có thể thay đổi trong quá trình mua sắm.

Cách xử lý là sử dụng giá phía server để tính tiền, chỉ dùng giá frontend để phát hiện thay đổi và tạo cảnh báo `PRICE_CHANGED`. Việc tính voucher và phí giao được xử lý bằng hàm `calculatePricing()` để thống nhất quy tắc.

## Kết luận

Qua task này, hiểu cách xây dựng chức năng xem trước đơn hàng bằng NestJS, kiểm tra dữ liệu đầu vào, đối chiếu giá sản phẩm và tính toán voucher, phí giao hàng theo quy tắc phía server.

Việc xem trước đơn hàng không chỉ hiển thị tổng tiền mà còn giúp phát hiện thay đổi về giá, tồn kho và điều kiện khuyến mãi trước khi người dùng xác nhận đặt hàng.
