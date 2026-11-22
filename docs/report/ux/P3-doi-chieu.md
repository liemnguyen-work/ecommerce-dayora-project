# P3 · Đối chiếu giao diện đơn hàng và tài khoản

- **Ngày kiểm tra:** 22/11/2026
- **Nhánh:** `prj/p3-pd-1`
- **Commit nhóm:** `7912ae8`
- **Người thực hiện:** Đạt (PD)
- **Reviewer:** Thành (FD1)
- **Viewport kiểm tra:** desktop 1366 px; mobile 390 px
- **Phạm vi bước này:** Chi tiết đơn hàng `/don-hang/:id`
- **Nguồn đối chiếu:** `design/DESIGN-SYSTEM.md`, yêu cầu PRJ-P3-PD-1.1 và giao diện chạy tại `http://localhost:5173`

> Ảnh toàn trang có kích thước pixel vật lý lớn hơn viewport do Windows Display Scaling. Việc kiểm tra dựa trên viewport đã đặt trong chế độ Responsive Design Mode.

## 1. Chi tiết đơn `/don-hang/:id`

### 1.1. Minh chứng

| Trạng thái | Desktop 1366 px | Mobile 390 px |
|---|---|---|
| Chi tiết đơn chờ thanh toán | [order-1366](../images/p3/order-1366.png) | [order-390](../images/p3/order-390.png) |
| Điều hướng tới VNPay Sandbox | [vnpay-1366](../images/p3/vnpay-1366.png) | [vnpay-390](../images/p3/vnpay-390.png) |

### 1.2. Kết quả đối chiếu

| # | Phần tử | K11 / yêu cầu | Thực tế 1366 px và 390 px | Mức độ | Đề xuất |
|---|---|---|---|---|---|
| 1 | Huy hiệu `status` và `paymentStatus` | Ba trục trạng thái cần dễ phân biệt trong thời gian ngắn; màu sắc và câu chữ phải rõ nghĩa | Hai huy hiệu “Chờ thanh toán” và “Chưa thanh toán” có màu khác nhau, dễ nhìn. Tuy nhiên chưa có nhãn cho biết huy hiệu nào là trạng thái đơn và huy hiệu nào là trạng thái thanh toán | **Nên sửa** | Thêm nhãn ngắn “Đơn hàng” và “Thanh toán”, hoặc thêm icon phù hợp trước từng huy hiệu |
| 2 | Tiến trình giao hàng | Có đủ 4 mốc `NOT_SHIPPED` → `PREPARING` → `SHIPPING` → `DELIVERED`; mốc hiện tại phải nổi bật | Có đủ “Chờ xử lý”, “Đang chuẩn bị”, “Đang giao”, “Đã giao”. Mốc hiện tại dùng nền xanh đậm và dấu kiểm; desktop trình bày ngang, mobile chuyển thành dọc | **Chấp nhận** | Giữ cách làm hiện tại; có thể bổ sung icon riêng cho từng mốc để nhận biết nhanh hơn |
| 3 | Thời gian giữ hàng | Đơn chưa thanh toán cần cho người mua biết thời hạn giữ tồn và hành động tiếp theo | Giao diện thông báo DAYORA đang giữ hàng và yêu cầu thanh toán trong thời gian giữ hàng, nhưng không hiển thị thời điểm hết hạn hoặc đồng hồ đếm ngược | **Nên sửa** | Hiển thị “Giữ hàng đến HH:mm dd/mm” hoặc đồng hồ đếm ngược gần nút thanh toán |
| 4 | Nút thanh toán và hủy đơn | CTA chính nổi bật, vùng bấm rõ; thao tác hủy phải giải thích hậu quả hoàn tồn | “Thanh toán qua VNPay” dùng màu Berry và nổi bật hơn “Hủy đơn”. Nút VNPay điều hướng thành công đến trang chọn phương thức thanh toán của VNPay Sandbox ở cả desktop và mobile | **Chấp nhận có điều kiện** | Giữ thứ bậc CTA; cần kiểm tra thêm hộp xác nhận và thông báo sau khi hủy đơn |
| 5 | Sản phẩm, người nhận và tổng tiền | Thông tin phải được nhóm rõ ràng, dễ quét và không che khuất dữ liệu quan trọng | Tên sản phẩm, phân loại, SKU, số lượng, giá, người nhận, phí vận chuyển và tổng cộng đều hiển thị rõ. Trên desktop, bảng tổng tiền nằm dưới khung người nhận và tạo khoảng trắng lớn bên trái | **Nên sửa** | Cân nhắc đặt người nhận và tổng tiền trong cùng một khối, hoặc cân bằng hai cột để giảm khoảng trắng |
| 6 | Responsive mobile | Không tràn ngang; nội dung và CTA không bị cắt; các khối chuyển thành một cột | Không quan sát thấy tràn ngang. Mã đơn tự xuống dòng, hai CTA xếp dọc, timeline chuyển dọc và các khối sản phẩm/người nhận/tổng tiền lần lượt xếp một cột | **Chấp nhận** | Giữ bố cục hiện tại; kiểm tra thêm zoom 200% và thiết bị có chiều rộng nhỏ hơn |

### 1.3. Kiểm tra VNPay Sandbox

- Nút **Thanh toán qua VNPay** tạo đường dẫn thanh toán và chuyển sang tên miền `sandbox.vnpayment.vn`.
- Trang VNPay hiển thị hai lựa chọn: “Thẻ nội địa và tài khoản ngân hàng” và “Thẻ thanh toán quốc tế”.
- Giao diện VNPay hiển thị được ở 1366 px và 390 px.
- Phiên kiểm tra dừng tại trang chọn phương thức, không nhập thông tin thẻ và không hoàn tất giao dịch thử nghiệm.

### 1.4. Giới hạn kiểm tra

- Chỉ kiểm tra trực tiếp một đơn ở trạng thái **Chờ thanh toán / Chưa thanh toán / Chờ xử lý**.
- Chưa kiểm tra trực tiếp các trạng thái Đã xác nhận, Đang chuẩn bị, Đang giao, Đã giao, Hoàn tất hoặc Đã hủy.
- Chưa thực hiện hủy đơn vì thao tác có thể thay đổi tồn kho dùng chung.
- Chưa kiểm tra focus bàn phím, trình đọc màn hình, dark mode, reduced motion và zoom 200%.
- Chưa đo chính xác kích thước vùng bấm và độ tương phản bằng DevTools.

### 1.5. Kết luận bước 1

Trang chi tiết đơn hiển thị đầy đủ ba nhóm thông tin chính gồm trạng thái, tiến trình giao hàng và dữ liệu đơn. Bố cục responsive không quan sát thấy tràn ngang, mốc giao hàng hiện tại được làm nổi bật và nút thanh toán điều hướng thành công đến VNPay Sandbox.

Ba điểm nên cải thiện là bổ sung nhãn phân biệt hai huy hiệu trạng thái, hiển thị thời hạn giữ hàng và cân bằng lại khu vực người nhận/tổng tiền trên desktop. Không ghi nhận lỗi mức Chặn trong phạm vi trạng thái đã kiểm tra.