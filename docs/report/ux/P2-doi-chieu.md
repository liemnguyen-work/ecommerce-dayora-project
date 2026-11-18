# P2 · Đối chiếu giao diện giỏ hàng và thanh toán

## Thông tin kiểm tra

- **Ngày kiểm tra:** 18/11/2026
- **Người thực hiện:** Đạt (PD)
- **Reviewer:** Thành (FD1)
- **Nhánh:** `prj/p2-pd-1`
- **Commit nền:** `ce8258a`
- **Tài liệu đối chiếu:** `design/DESIGN-SYSTEM.md`
- **Viewport:** desktop 1366 × 768 px và mobile 390 × 844 px
- **Trình duyệt:** Chrome, chế độ thiết bị trong DevTools

> Báo cáo được lập từ giao diện chạy thật và ảnh chụp toàn trang. Những nội dung chưa đo trực tiếp bằng DevTools được ghi rõ là chưa kết luận.

## 1. Giỏ hàng `/gio-hang`

### 1.1. Phạm vi khảo sát

Trang giỏ hàng được kiểm tra ở hai trạng thái:

- Giỏ có hai sản phẩm khác nhau, mỗi sản phẩm có số lượng bằng 1.
- Giỏ hàng rỗng sau khi xóa toàn bộ sản phẩm.

Các thành phần được quan sát gồm thẻ sản phẩm, biến thể, giá, điều chỉnh số lượng, thao tác xóa, voucher, tóm tắt đơn hàng, CTA thanh toán và trạng thái giỏ rỗng.

### 1.2. Ảnh minh chứng

| Trạng thái | Desktop 1366 px | Mobile 390 px |
|---|---|---|
| Giỏ có hai sản phẩm | [cart-1366.png](../images/p2/cart-1366.png) | [cart-390.png](../images/p2/cart-390.png) |
| Giỏ hàng rỗng | [cart-empty-1366.png](../images/p2/cart-empty-1366.png) | [cart-empty-390.png](../images/p2/cart-empty-390.png) |

### 1.3. Kết quả đối chiếu

| # | Phần tử | K11 hoặc tiêu chí UX | Thực tế tại 1366 px và 390 px | Mức độ | Người xử lý đề xuất | Ảnh |
|---|---|---|---|---|---|---|
| 1 | Số lượng trên biểu tượng giỏ hàng | Sau thao tác thêm sản phẩm, giao diện cần phản hồi rõ để người dùng nhận biết giỏ đã được cập nhật | Giỏ có hai sản phẩm nhưng biểu tượng giỏ trên header không hiển thị số lượng ở cả desktop và mobile | Nên sửa | FD1 Thành | `cart-1366.png`, `cart-390.png` |
| 2 | Tiêu đề “Tạm tính” | Chữ và nền cần đủ tương phản, sử dụng màu Ink hoặc Paper đúng vai trò | Tiêu đề dùng màu tối trên nền xanh đậm nên gần như không đọc được ở cả hai viewport | Nên sửa | FD1 Thành | `cart-1366.png`, `cart-390.png` |
| 3 | CTA trong trạng thái giỏ rỗng | Nhãn CTA phải rõ, dễ đọc và thể hiện được hành động chính/phụ | Chữ trắng và xanh rất nhạt trên nền xanh nhạt khiến hai nút “Xem sản phẩm” và “Tạo bộ cho chuyến đi” có độ tương phản thấp | Nên sửa | FD1 Thành | `cart-empty-1366.png`, `cart-empty-390.png` |
| 4 | Ô voucher trên desktop | Nội dung gợi ý trong biểu mẫu cần đọc được, không bị phần tử bên cạnh che hoặc cắt bất hợp lý | Placeholder bị cắt còn “VÍ DỤ: DAYORA1…” do nút “Áp dụng” chiếm nhiều chiều rộng trong khung tóm tắt | Nên sửa | FD1 Thành | `cart-1366.png` |
| 5 | Nút tăng/giảm số lượng | Theo K11, vùng bấm tương tác cần cao tối thiểu 44 px | Ảnh cho thấy cụm điều chỉnh số lượng hiển thị đầy đủ, nhưng chưa đo riêng vùng bấm của nút `−` và `+` bằng DevTools | Chưa kết luận | PD Đạt đo lại; FD1 Thành xác minh | `cart-1366.png`, `cart-390.png` |

### 1.4. Điểm phù hợp

- Giỏ hiển thị đúng hai sản phẩm, hình ảnh, tên, màu sắc, đơn giá và thành tiền.
- Nút tăng, giảm và xóa xuất hiện ở cả desktop và mobile.
- Khung tóm tắt có voucher, tiền hàng, phí giao tạm tính và tổng dự kiến.
- CTA thanh toán nổi bật bằng màu Berry và có hiệu ứng đổ sáng.
- Bố cục desktop chia danh sách sản phẩm và tóm tắt đơn hàng thành hai cột.
- Bố cục mobile chuyển thành một cột, không quan sát thấy tràn ngang.
- Trạng thái giỏ rỗng có thông báo và hai hướng điều hướng quay lại mua hàng.

### 1.5. Giới hạn kiểm tra

- Chưa đo kích thước từng vùng bấm `−`, `+` và xóa bằng DevTools.
- Chưa đo tỷ lệ tương phản bằng công cụ kiểm tra màu.
- Chưa kiểm tra thao tác bằng bàn phím, focus, zoom 200% và trình đọc màn hình.
- Chưa đánh giá nội dung lỗi voucher; nội dung này thuộc bước PRJ-P2-PD-1.3.

### 1.6. Kết luận bước 1

Trang giỏ hàng hoạt động ở cả hai viewport, hiển thị được trạng thái có sản phẩm và trạng thái rỗng, không quan sát thấy giao diện bị vỡ hoặc CTA thanh toán bị che. Báo cáo ghi nhận bốn điểm mức **Nên sửa** gồm thiếu số lượng trên biểu tượng giỏ, tương phản thấp ở tiêu đề tóm tắt, tương phản thấp ở CTA giỏ rỗng và placeholder voucher bị cắt trên desktop. Không ghi nhận khác biệt mức **Chặn** trong phạm vi ảnh chụp.