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

## 2. Thanh toán `/thanh-toan`

### 2.1. Phạm vi khảo sát

- **Ngày kiểm tra:** 19/11/2026
- **Commit kiểm tra:** `eedcb2c`
- **Trạng thái:** người dùng đã đăng nhập, giỏ có sản phẩm và truy cập từ trang giỏ hàng.
- **Viewport:** desktop 1366 × 768 px và mobile 390 × 844 px.

Trang thanh toán được kiểm tra với thông tin người nhận hợp lệ, khả năng tự tính phí giao hàng và sự thay đổi tổng tiền khi đổi tỉnh/thành. Không thực hiện thao tác đặt đơn thật trong bước khảo sát này.

### 2.2. Ảnh minh chứng

| Trạng thái | Desktop 1366 px | Mobile 390 px |
|---|---|---|
| Form đã nhập và phí giao đã được tính | [checkout-1366.png](../images/p2/checkout-1366.png) | [checkout-390.png](../images/p2/checkout-390.png) |

### 2.3. Thống kê thao tác

Bảng dưới đây đếm theo luồng kiểm tra thực tế từ giỏ hàng đến khi người dùng sẵn sàng bấm đặt hàng. Mỗi lần chọn trường và nhập nội dung được tính là một thao tác.

| # | Thao tác | Số lần chạm / gõ | Ghi chú |
|---|---|---:|---|
| 1 | Bấm CTA thanh toán từ giỏ hàng | 1 | Điều hướng sang `/thanh-toan` |
| 2 | Nhập họ và tên | 0 | Được điền sẵn từ tài khoản |
| 3 | Nhập số điện thoại | 1 | Trường bắt buộc |
| 4 | Nhập địa chỉ chi tiết | 1 | Trường bắt buộc, đang gộp cả phường/xã |
| 5 | Nhập tỉnh/thành phố | 1 | Trường bắt buộc |
| 6 | Nhập quận/huyện | 1 | Không bắt buộc nhưng được dùng trong luồng kiểm tra |
| 7 | Bấm nút “Đặt hàng” | 1 | Thao tác cuối, chỉ thống kê và không thực hiện khi chụp ảnh |
| | **Tổng thao tác của luồng kiểm tra** | **6** | Không tính checkbox nội thành vì chỉ áp dụng trong một số trường hợp |

Nếu địa chỉ thuộc nội thành Hồ Chí Minh, người dùng cần thêm một thao tác tích checkbox, nâng tổng số thao tác của luồng đó lên **7**.

### 2.4. Kiểm tra cập nhật phí giao hàng

| Trường hợp | Tạm tính | Phí vận chuyển | Tổng thanh toán | Cập nhật không tải lại |
|---|---:|---:|---:|---|
| Hồ Chí Minh, chọn nội thành | 348.000 đ | 20.000 đ | 368.000 đ | Có |
| Hà Nội, Ba Đình | 348.000 đ | 40.000 đ | 388.000 đ | Có |

Khi đổi tỉnh/thành từ Hồ Chí Minh sang Hà Nội, giao diện tự gửi yêu cầu tính lại chi phí và cập nhật phí vận chuyển từ 20.000 đ lên 40.000 đ. Tổng thanh toán đồng thời thay đổi từ 368.000 đ thành 388.000 đ mà không cần tải lại trang.

### 2.5. Kết quả đối chiếu

| # | Phần tử | K11 hoặc tiêu chí UX | Thực tế tại 1366 px và 390 px | Mức độ | Người xử lý đề xuất | Ảnh |
|---|---|---|---|---|---|---|
| 1 | Tiêu đề trang trên desktop | Tiêu đề cần có độ rộng và ngắt dòng hợp lý theo không gian hiển thị | “Thông tin người nhận” bị tách thành hai dòng dù phần bên phải còn nhiều khoảng trống | Nên sửa | FD1 Thành | `checkout-1366.png` |
| 2 | Nhập tỉnh/thành và quận/huyện | Dữ liệu địa chỉ nên được chuẩn hóa bằng danh sách chọn để giảm lỗi nhập liệu | Hai trường đang là ô nhập văn bản tự do, người dùng có thể nhập nhiều cách viết khác nhau | Nên sửa | FD1 Thành | `checkout-1366.png`, `checkout-390.png` |
| 3 | Checkbox nội thành Hồ Chí Minh | Điều khiển chỉ nên xuất hiện khi phù hợp với tỉnh/thành đã chọn | Khi tỉnh/thành là Hà Nội, checkbox “Địa chỉ thuộc khu vực nội thành Hồ Chí Minh” vẫn xuất hiện | Nên sửa | FD1 Thành | `checkout-1366.png`, `checkout-390.png` |
| 4 | Cấu trúc địa chỉ | Các thành phần địa chỉ cần rõ ràng và hạn chế việc người dùng phải tự gộp thông tin | Không có trường phường/xã riêng; người dùng phải nhập phường/xã chung trong ô địa chỉ chi tiết | Nên sửa | FD1 Thành | `checkout-1366.png`, `checkout-390.png` |

### 2.6. Điểm phù hợp

- Các ô nhập liệu trên mobile có chiều cao quan sát được phù hợp cho thao tác chạm.
- Nút “Đặt hàng” dùng màu Berry, dễ phân biệt với nút quay lại giỏ hàng.
- Bảng tóm tắt hiển thị rõ tạm tính, giảm giá, phí vận chuyển và tổng thanh toán.
- Phí giao và tổng tiền được server tính lại ngay khi tỉnh/thành thay đổi.
- Bố cục desktop chia form và tóm tắt thành hai cột; mobile chuyển thành một cột.
- Không quan sát thấy tràn ngang, nội dung bị cắt hoặc CTA bị che ở hai viewport.

### 2.7. Giới hạn kiểm tra

- Không bấm hoàn tất đặt hàng để tránh tạo đơn không cần thiết trong dữ liệu.
- Chưa kiểm tra hộp xác nhận khi giá hoặc tồn kho thay đổi; nội dung này thuộc bước PRJ-P2-PD-1.3.
- Chưa kiểm tra focus bàn phím, trình đọc màn hình, zoom 200% và thông báo validation của từng trường.
- Chưa đo riêng kích thước checkbox và vùng bấm bằng DevTools.

### 2.8. Kết luận bước 2

Trang thanh toán hiển thị và tự cập nhật phí giao đúng ở desktop và mobile. Luồng kiểm tra cần sáu thao tác từ giỏ hàng đến nút đặt hàng, hoặc bảy thao tác nếu chọn nội thành Hồ Chí Minh. Báo cáo ghi nhận bốn điểm mức **Nên sửa**, nổi bật là trường địa chỉ nhập tự do và checkbox nội thành Hồ Chí Minh vẫn xuất hiện khi tỉnh/thành là Hà Nội. Không ghi nhận khác biệt mức **Chặn** trong phạm vi kiểm tra.

## 3. Câu chữ thông báo và hộp đối chiếu NFR02

### 3.1. Phạm vi kiểm tra

- **Ngày kiểm tra:** 19/11/2026
- **Các trường hợp:** voucher không tồn tại, voucher chưa đạt giá trị tối thiểu, `CONFIRM_REQUIRED` và `OUT_OF_STOCK`.
- Hai thông báo voucher được kiểm tra trực tiếp trên giao diện.
- Hộp đối chiếu và lỗi hết hàng được đánh giá dựa trên implementation hiện tại; không thay đổi dữ liệu giá hoặc tồn kho trên hệ thống để cưỡng ép lỗi.

### 3.2. Ảnh minh chứng voucher

| Tình huống | Ảnh |
|---|---|
| Voucher không tồn tại `SAIMAKY` | [voucher-invalid-1366.png](../images/p2/voucher-invalid-1366.png) |
| Voucher `PICNIC50K` chưa đạt đơn tối thiểu | [voucher-minimum-1366.png](../images/p2/voucher-minimum-1366.png) |

### 3.3. Đánh giá câu chữ voucher

| Tình huống | Câu hiện tại | Nhận xét | Câu đề xuất | Lý do |
|---|---|---|---|---|
| Voucher không tồn tại | “Không tìm thấy voucher” | Ngắn gọn nhưng chưa cho biết người dùng nên làm gì tiếp theo | “Mã voucher không tồn tại hoặc đã được nhập sai. Vui lòng kiểm tra mã và thử lại.” | Giải thích được nguyên nhân có thể xảy ra và hướng dẫn hành động tiếp theo |
| Voucher chưa đạt giá trị tối thiểu | “Chưa đạt đơn tối thiểu” | Không nêu mức tối thiểu hoặc số tiền còn thiếu | “Đơn hàng của bạn còn thiếu 152.000đ để áp dụng mã PICNIC50K. Mã áp dụng cho đơn từ 500.000đ.” | Cung cấp số liệu cụ thể để người dùng biết cần bổ sung bao nhiêu |
| Voucher hết hạn | “Voucher ngoài hạn hiệu lực” | Đúng nguyên nhân nhưng cách diễn đạt còn mang tính hệ thống | “Mã voucher này đã hết hạn. Vui lòng chọn ưu đãi khác hoặc tiếp tục thanh toán không dùng mã.” | Dùng tiếng Việt tự nhiên và đưa ra lựa chọn tiếp theo |
| Voucher hết lượt | “Voucher hết lượt sử dụng” | Dễ hiểu nhưng chưa có hướng xử lý | “Mã voucher đã hết lượt sử dụng. Vui lòng thử mã khác hoặc tiếp tục thanh toán.” | Giúp người dùng không bị dừng luồng mua hàng |

Với giỏ hàng 348.000đ, mã `PICNIC50K` yêu cầu tối thiểu 500.000đ nên còn thiếu 152.000đ. Giao diện hiện chỉ trả về điều kiện chung thay vì số tiền cụ thể.

### 3.4. Đánh giá hộp đối chiếu và lỗi tồn kho

| Tình huống | Có nêu giá cũ – mới? | Có nêu món hoặc số lượng bị ảnh hưởng? | Nút rõ nghĩa? | Nhận xét và đề xuất |
|---|---|---|---|---|
| `CONFIRM_REQUIRED` — giá hoặc phí thay đổi | Có; hộp thoại hiển thị tiền hàng, phí giao và tổng tiền ở cột “Trước” và “Sau” | Không; không hiển thị tên sản phẩm có giá thay đổi | Một phần; “Đồng ý thay đổi & Đặt hàng” rõ, nhưng “Hủy đơn” chưa chính xác vì đơn chưa được tạo | Bổ sung tên sản phẩm và giá cũ – mới theo từng món; đổi “Hủy đơn” thành “Quay lại giỏ hàng” hoặc “Tiếp tục chỉnh sửa” |
| `CONFIRM_REQUIRED` — tồn hoặc voucher thay đổi | Có hiển thị tổng tiền trước – sau | Không nêu sản phẩm bị giảm số lượng; voucher không hợp lệ chỉ được hiển thị dưới dạng cảnh báo chung | Một phần | Hiển thị tên món, số lượng yêu cầu và số lượng còn lại; giải thích voucher nào bị loại và ảnh hưởng bao nhiêu tiền |
| `OUT_OF_STOCK` | — | Không; câu hiện tại chỉ ghi “Một số món vừa hết hàng” | Không có nút hành động trực tiếp | Hiển thị tên sản phẩm hết hàng và nút “Quay lại giỏ hàng để điều chỉnh” |

### 3.5. Câu chữ hiện tại của hộp đối chiếu

Các nội dung đang được sử dụng:

- Tiêu đề: **“Xác nhận tổng tiền mới”**.
- Giải thích: **“Giá hoặc phí của đơn đã thay đổi. Vui lòng đối chiếu trước khi tiếp tục đặt hàng.”**
- Nút phụ: **“Hủy đơn”**.
- Nút chính: **“Đồng ý thay đổi & Đặt hàng”**.
- Lỗi hết hàng: **“Một số món vừa hết hàng. Hãy quay lại giỏ để điều chỉnh.”**

Hộp thoại không hiển thị thuật ngữ kỹ thuật như “Conflict 409” hoặc “Payload invalid”, phù hợp với người dùng phổ thông. Tuy nhiên, nội dung mới chỉ so sánh các khoản tổng hợp và chưa trả lời rõ sản phẩm nào đã thay đổi.

### 3.6. Mẫu câu chữ đề xuất

**Khi giá thay đổi:**

> Giá của “{tên sản phẩm}” đã thay đổi từ {giá cũ} thành {giá mới}. Vui lòng kiểm tra tổng tiền mới trước khi tiếp tục.

**Khi số lượng tồn kho không đủ:**

> “{tên sản phẩm}” chỉ còn {số lượng còn lại} sản phẩm, thấp hơn số lượng bạn đã chọn. Vui lòng quay lại giỏ hàng để điều chỉnh.

**Khi tổng tiền hoặc phí giao thay đổi:**

> Phí giao hoặc tổng tiền của đơn hàng vừa thay đổi. Vui lòng kiểm tra các khoản trước và sau rồi xác nhận để tiếp tục.

**Nhãn nút đề xuất:**

- Nút phụ: **“Quay lại giỏ hàng”**.
- Nút chính: **“Xác nhận thay đổi và đặt hàng”**.

### 3.7. Kết luận bước 3

Các thông báo hiện tại không sử dụng mã lỗi kỹ thuật và nhìn chung có thể hiểu được. Tuy nhiên, thông báo voucher còn thiếu số liệu và hướng dẫn khắc phục; hộp đối chiếu chưa nêu sản phẩm hoặc số lượng bị ảnh hưởng; lỗi hết hàng chưa có nút quay lại giỏ trực tiếp. Các câu đề xuất bổ sung nguyên nhân, số tiền hoặc số lượng cụ thể và hành động tiếp theo để giảm gián đoạn trong luồng thanh toán.