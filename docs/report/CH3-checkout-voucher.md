# Chương 3 · Giỏ hàng, checkout và voucher

## 1. Luồng đặt hàng (Checkout Flow)

Luồng dưới đây mô tả yêu cầu của bước PRJ-P2-PM-1.1 và đối chiếu với mã nguồn hiện có. D04 và D06 hiện vẫn có trạng thái **đề xuất** trong [DECISIONS.md](../DECISIONS.md); việc sử dụng chúng ở đây không có nghĩa nhóm đã chính thức chốt.

1. **Xem giỏ hàng:** Khách kiểm tra sản phẩm, số lượng và đơn giá tạm tính. Giỏ hàng và checkout yêu cầu đăng nhập theo phương án D04.
2. **Nhập thông tin giao hàng:** Khách nhập thông tin người nhận, địa chỉ và chọn khu vực giao hàng: nội thành TP.HCM, ngoại thành TP.HCM hoặc tỉnh/thành khác. Thông tin được dùng để xác định phí giao.
3. **Áp dụng mã ưu đãi:** Khách có thể nhập một mã voucher, ví dụ `DAYORA10` hoặc `PICNIC50K`. Máy chủ kiểm tra mã và điều kiện áp dụng; tên mã trong ví dụ không xác nhận mã đang có hiệu lực.
4. **Xem trước đơn:** Trình duyệt gửi `POST /api/orders/preview` (đường dẫn `/orders/preview` dưới tiền tố `/api`). Máy chủ đọc dữ liệu cần thiết, tính lại tiền hàng, mức giảm, phí giao và tổng tiền rồi trả kết quả cùng cảnh báo nếu có. Nếu thông tin thay đổi, khách cần xem và xác nhận lại trước khi chốt đơn.
5. **Xác nhận đặt đơn:** Khách bấm đặt hàng, trình duyệt gửi `POST /api/orders`. Máy chủ tính và kiểm tra lại giỏ hàng, giá, voucher, phí giao và số lượng khả dụng. Nếu hợp lệ, trong giao dịch cơ sở dữ liệu, hệ thống kiểm tra `stock - reserved >= quantity`, tăng `reserved`, tạo đơn trạng thái `PENDING_PAYMENT`, lưu thông tin đơn đã chốt và đặt thời hạn giữ tồn 15 phút theo phương án D06. Nếu dữ liệu thay đổi hoặc hàng không đủ, hệ thống báo lỗi thay vì xác nhận thành công.

### Sơ đồ luồng

```mermaid
sequenceDiagram
    actor Khach as Khách hàng
    participant Web as Trình duyệt (Frontend)
    participant API as Máy chủ (NestJS API)
    participant DB as Cơ sở dữ liệu (PostgreSQL)
    Khach->>Web: Đăng nhập, kiểm tra giỏ hàng
    Khach->>Web: Nhập địa chỉ và mã voucher (nếu có)
    Web->>API: POST /api/orders/preview
    API->>DB: Đọc giỏ hàng, giá, tồn kho và voucher
    DB-->>API: Trả dữ liệu hiện có
    API-->>Web: Tiền hàng, giảm giá, phí giao, tổng và cảnh báo
    Web-->>Khach: Hiển thị kết quả và yêu cầu xác nhận nếu thay đổi
    Khach->>Web: Xác nhận đặt hàng
    Web->>API: POST /api/orders
    API->>DB: Đọc lại giỏ hàng, giá, tồn kho và voucher
    DB-->>API: Trả dữ liệu để đối chiếu
    alt Thông tin thay đổi
        API-->>Web: Yêu cầu khách xác nhận lại
        Web-->>Khach: Hiển thị thông báo
    else Thông tin hợp lệ
        API->>DB: Kiểm tra và giữ tồn trong giao dịch
        alt Đủ hàng
            DB-->>API: Tạo đơn PENDING_PAYMENT, giữ tồn 15 phút
            API-->>Web: Trả thông tin đơn đã tạo
            Web-->>Khach: Hiển thị kết quả đặt đơn
        else Không đủ hàng
            DB-->>API: Không hoàn tất giao dịch
            API-->>Web: Báo lỗi
            Web-->>Khach: Hiển thị thông báo
        end
    end
```

Đối chiếu mã nguồn: [orders.controller.ts](../../apps/api/src/orders/orders.controller.ts), [orders.service.ts](../../apps/api/src/orders/orders.service.ts), [checkout.service.ts](../../apps/api/src/orders/checkout.service.ts) và [CheckoutPage.tsx](../../apps/web/src/pages/CheckoutPage.tsx). Đây là tài liệu mô tả; chưa xác nhận kết quả chạy hoặc nghiệm thu thực tế trong lượt soạn thảo này.

## 2. Quy tắc voucher và phí giao

Sẽ bổ sung ở bước PRJ-P2-PM-1.2.

## 3. Bảo mật định giá và tranh chấp tồn kho

Sẽ bổ sung ở bước tiếp theo của task.
