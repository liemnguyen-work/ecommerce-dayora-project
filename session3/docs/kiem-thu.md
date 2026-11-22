# Kiểm thử website DAYORA – Buổi 3

**Bước 1 · HW-P1-QA-1.1**

Phạm vi gồm danh sách và chi tiết sản phẩm, tìm kiếm, lọc, sắp xếp, giỏ hàng và lưu giỏ bằng localStorage.

## Chuẩn bị

- Khi chạy kiểm thử ở bước 2, mở `session3/index.html` bằng Live Server. Dùng cùng địa chỉ và cổng cho các trang.
- Mở tab Console trong Chrome DevTools để quan sát lỗi khi chạy từng ca.
- Đối chiếu tên, ID, danh mục và giá với `session3/js/data/products.js`.
- Với ca yêu cầu giỏ trống, xóa riêng khóa `cart` trong localStorage của website ở phiên thử nghiệm. Với ca cần giỏ có sẵn, chuẩn bị giỏ theo dữ liệu đầu vào.
- Điền cột **Kết quả thực tế** sau khi chạy từng ca ở bước 2.

## Ca kiểm thử chức năng

| Mã ca | Chức năng | Dữ liệu đầu vào | Các bước thực hiện | Kết quả mong đợi | Kết quả thực tế |
| --- | --- | --- | --- | --- | --- |
| TC-01 | Hiển thị danh sách ban đầu | 8 sản phẩm ID 1–8 trong `products.js` | 1. Mở `products.html`. 2. Để trống ô tìm kiếm, chọn tất cả danh mục và giữ sắp xếp mặc định. 3. Đếm thẻ và đối chiếu tên với dữ liệu. | Hiện đủ 8 sản phẩm. Mỗi sản phẩm xuất hiện một lần và tên khớp dữ liệu. |Đạt|
| TC-02 | Hiển thị giá VND | ID 1 có giá `149000`. ID 8 có giá `19000`. | 1. Mở `products.html`. 2. Tìm thẻ Thảm picnic gấp gọn 2 người và Khăn giấy khô gói 100 tờ. 3. Đọc giá trên hai thẻ. | Giá lần lượt là `149.000 ₫` và `19.000 ₫`, có dấu chấm phân cách hàng nghìn và ký hiệu `₫`. |Đạt|
| TC-03 | Tìm theo tên | Lượt 1 dùng `Bình nước cá nhân`. Lượt 2 dùng `BÌNH NƯỚC CÁ NHÂN` với hai dấu cách ở đầu và hai dấu cách ở cuối. | 1. Mở `products.html` và chọn tất cả danh mục. 2. Nhập từ khóa lượt 1. 3. Thay bằng từ khóa lượt 2, thêm khoảng trắng như mô tả. 4. Đối chiếu kết quả từng lượt. | Cả hai lượt chỉ hiện Bình nước cá nhân 750 ml, ID 3. |Đạt|
| TC-04 | Lọc theo danh mục | Lượt 1 chọn Túi giữ nhiệt, từ khóa trống. Lượt 2 chọn Thảm picnic, từ khóa `4 người`, giá tăng dần. | 1. Mở `products.html`, để ô tìm kiếm trống và chọn Túi giữ nhiệt. 2. Đối chiếu các thẻ hiển thị. 3. Chuyển sang Thảm picnic, nhập `4 người`, rồi chọn giá tăng dần. 4. Đối chiếu lần nữa. | Lượt 1 chỉ hiện túi giữ nhiệt ID 6 và 7. Lượt 2 chỉ hiện Thảm picnic gấp gọn 4 người, ID 2. |Đạt|
| TC-05 | Sắp xếp giá | Cả 8 sản phẩm, ô tìm kiếm trống và tất cả danh mục | 1. Mở `products.html`. 2. Chọn giá tăng dần rồi giá giảm dần. Ghi thứ tự thẻ theo tên và giá ở mỗi lượt. 3. Tra tên trong `products.js` để đối chiếu thứ tự ID. 4. Chạy `products.map(p => p.id).join(",")` trong Console để kiểm tra riêng thứ tự mảng gốc. | Thẻ hiển thị theo ID `8 → 4 → 5 → 1 → 3 → 7 → 2 → 6` khi tăng dần và `6 → 2 → 7 → 3 → 1 → 5 → 4 → 8` khi giảm dần. Mỗi lượt có đủ 8 thẻ. Lệnh Console trả về `1,2,3,4,5,6,7,8`. |Đạt|
| TC-06 | Mở chi tiết với ID hợp lệ | ID `3`, Bình nước cá nhân 750 ml, danh mục Bình nước và ly, giá `159000` | 1. Mở `products.html`. 2. Bấm Xem chi tiết trên thẻ Bình nước cá nhân 750 ml. 3. Kiểm tra URL, tiêu đề tab, tên, danh mục và giá. 4. Đối chiếu ảnh và mô tả với các trường `image` và `description` của ID 3 trong `products.js`. | Mở `product-detail.html?id=3`. Tiêu đề tab có tên Bình nước cá nhân 750 ml. Trang hiện đúng tên, danh mục Bình nước và ly, giá `159.000 ₫`, ảnh `images/product-3.jpg` và mô tả của ID 3. |Đạt|
| TC-07 | Thêm vào giỏ từ danh sách | Giỏ trống, ID 1 | 1. Mở `products.html`. 2. Bấm Thêm vào giỏ một lần trên thẻ ID 1. 3. Kiểm tra số trên biểu tượng giỏ rồi mở `cart.html`. | Số trên biểu tượng giỏ tăng 1. Giỏ có một dòng cho ID 1, số lượng 1, thành tiền `149.000 ₫`. |Đạt|
| TC-08 | Thêm số lượng chọn từ trang chi tiết | Giỏ trống, ID 4, số lượng 3 | 1. Mở `product-detail.html?id=4`. 2. Chọn số lượng 3. 3. Bấm Thêm vào giỏ một lần và quan sát biểu tượng giỏ. 4. Mở `cart.html`. | Số trên biểu tượng giỏ tăng 3. Giỏ có một dòng Ly picnic có nắp 350 ml, số lượng 3, thành tiền `237.000 ₫`. |Đạt|
| TC-09 | Tăng và giảm số lượng trong giỏ | Giỏ chỉ có ID 1, số lượng ban đầu 2 | 1. Mở `cart.html`. 2. Bấm tăng một lần. 3. Bấm giảm một lần. 4. Giảm tiếp đến 1 rồi thử giảm thêm một lần. 5. Sau mỗi thao tác, kiểm tra số lượng, thành tiền của dòng và tổng tiền giỏ. | Ở số lượng 3, thành tiền và tổng giỏ đều là `447.000 ₫`. Khi giảm về 2, cả hai là `298.000 ₫`. Khi giảm về 1, cả hai là `149.000 ₫`. Thử giảm thêm vẫn giữ số lượng 1 và tổng `149.000 ₫`. |Đạt|
| TC-10 | Xóa sản phẩm khỏi giỏ | ID 1 × 1 và ID 4 × 1 | 1. Mở `cart.html`. 2. Bấm nút xóa ở dòng ID 1. 3. Kiểm tra dòng còn lại, tổng số lượng và tổng tiền. | Dòng ID 1 biến mất. Giỏ còn đúng một dòng ID 4. Tổng số lượng còn 1 và tổng tiền là `79.000 ₫`. |Đạt|
| TC-11 | Tính tổng giỏ hàng | ID 1 × 2 và ID 4 × 1 | 1. Từ giỏ trống, thêm 2 sản phẩm ID 1 và 1 sản phẩm ID 4. 2. Mở `cart.html`. 3. Đối chiếu từng dòng và phần tổng giỏ. | Có 2 dòng sản phẩm, tổng số lượng 3. Thành tiền hai dòng là `298.000 ₫` và `79.000 ₫`. Tổng tiền là `377.000 ₫`. |Đạt|
| TC-12 | Lưu giỏ và khôi phục sau tải lại | Giỏ trống trước khi thêm ID 4 × 2, khóa `cart` | 1. Thêm 2 sản phẩm ID 4 rồi mở `cart.html`. 2. Trong DevTools → Application → Local Storage, chọn đúng địa chỉ web và xem khóa `cart`. 3. Tải lại trang rồi đối chiếu giao diện và dữ liệu đã lưu. | Khóa `cart` chứa mảng JSON với một phần tử có đúng hai trường `id: 4` và `quantity: 2`. Sau khi tải lại, giỏ vẫn có ID 4, số lượng 2, tổng `158.000 ₫`. |Đạt|
| TC-13 | Tìm kiếm không có kết quả | Từ khóa `zz-khong-co-999`, tất cả danh mục | 1. Mở `products.html` và chọn tất cả danh mục. 2. Nhập từ khóa rồi quan sát danh sách. 3. Xóa từ khóa và kiểm tra lại. | Hiện thông báo không có kết quả và không có thẻ sản phẩm. Khi xóa từ khóa, danh sách hiện lại đủ 8 sản phẩm. |Đạt|
| TC-14 | ID không tồn tại | `product-detail.html?id=999` | 1. Mở đường dẫn với `?id=999`. 2. Quan sát vùng chi tiết và Console. 3. Bấm liên kết quay lại danh sách. | Hiện “Sản phẩm không tồn tại”, không hiển thị nhầm sản phẩm và Console không có lỗi đỏ. Liên kết mở `products.html`. |Đạt|
| TC-15 | ID sai định dạng hoặc bị thiếu | `product-detail.html?id=abc` và `product-detail.html` | 1. Mở đường dẫn với `?id=abc` rồi quan sát trang và Console. 2. Mở lại sau khi bỏ tham số `id`. 3. Kiểm tra liên kết quay lại danh sách ở mỗi lượt. | Cả hai lượt hiện “Sản phẩm không tồn tại” kèm liên kết quay lại `products.html`. Không hiển thị nhầm sản phẩm và Console không có lỗi đỏ. |Đạt|
| TC-16 | Khóa giỏ hàng bị thiếu hoặc dữ liệu hỏng | Lượt A xóa riêng khóa `cart`. Lượt B đặt giá trị của khóa `cart` thành `{bad-json`. | 1. Mở `cart.html` trong phiên thử nghiệm. 2. Trong Application → Local Storage, chuẩn bị dữ liệu lượt A, tải lại trang và quan sát. 3. Quay về `cart.html` nếu đã bấm liên kết mua sắm, rồi lặp lại với lượt B. 4. Ở mỗi lượt, kiểm tra `loadCart()` trong Console, trạng thái giỏ và liên kết quay lại mua sắm. 5. Xóa khóa thử sau khi hoàn tất. | Cả hai lượt đều hiển thị giỏ trống, tổng số lượng bằng 0 và có liên kết mở `products.html`. `loadCart()` trả về `[]` và không có ngoại lệ JavaScript chưa được xử lý. Đối chiếu giá trị trả về của hàm riêng với giá trị đang lưu của khóa `cart`. |Đạt|
## Kiểm tra giao diện – HW-P1-QA-1.3

- **Trang và kích thước:** Giỏ hàng (`cart.html`), 768 × 1024 px.
- **Cách tái hiện:** Thêm 1 Thảm picnic gấp gọn 2 người vào giỏ, mở trang Giỏ hàng và đặt khung Responsive ở 768 × 1024 px.
- **Thực tế:** Chữ “Xóa” bị ngắt giữa từ. Ký hiệu ₫ xuống dòng ở cột Đơn giá và Thành tiền. Hai nút − và + hiển thị lệch quanh số lượng.
- **Mong đợi:** Chữ “Xóa” và giá tiền hiển thị trọn trên một dòng. Hai nút − và + nằm cùng hàng với số lượng.
- **Minh chứng:** [Giỏ hàng ở 768 px](screenshots/cart-768px.png).

## Kiểm tra tích hợp hệ thống – HW-P1-QA-1.4

| Mục kiểm tra | Kết quả | Ghi nhận thực tế | Người phụ trách sửa |
| --- | --- | --- | --- |
| Trùng tên hàm hoặc biến | Đạt | Mỗi tên trong 5 tên dùng chung đã đối chiếu có đúng một khai báo. Trên `products.html`, `products` có kiểu `object`, còn `formatPrice`, `getProductById`, `loadCart` và `addToCart` đều có kiểu `function`. Console không hiện lỗi khai báo trùng. | — |
| Sự kiện `cart:changed` chạy lặp | Đạt | Bấm **Thêm vào giỏ** đúng một lần trên trang Sản phẩm. Console ghi `cart:changed: 1` và số trên menu Giỏ hàng tăng từ 1 lên 2. | — |
| Đường dẫn JavaScript và ảnh | Đạt | Kiểm tra Network trên Trang chủ, Sản phẩm, Chi tiết sản phẩm, Giới thiệu và Giỏ hàng. Bộ lọc `status-code:404` hiển thị `0 / 226 requests`. | — |
| Đồng bộ giỏ hàng giữa hai tab | Đạt | Sau khi thêm sản phẩm ở tab Sản phẩm, tab Giỏ hàng đã mở sẵn tự cập nhật số trên menu và số lượng trong giỏ trước khi tải lại trang. | — |

## Danh sách lỗi phát hiện (Bug Tracker)

| Mã lỗi | Mô tả lỗi | Mức độ | Người phụ trách | Trạng thái |
| --- | --- | --- | --- | --- |
| BUG-01 | Bố cục dòng sản phẩm trong bảng giỏ hàng bị lệch ở 768 × 1024 px. | Thấp | Đạt (`Dattran-ueh`) | Đã sửa |

### BUG-01 — Bố cục bảng giỏ hàng ở 768 × 1024 px

**Môi trường kiểm thử**

Chrome DevTools ở chế độ Responsive, kích thước 768 × 1024 px.

**Các bước tái hiện**

1. Từ giỏ hàng trống, thêm 1 sản phẩm **Thảm picnic gấp gọn 2 người** (ID 1).
2. Mở `cart.html` và đặt kích thước Responsive thành **768 × 1024 px**.
3. Quan sát các cột **Đơn giá**, **Số lượng**, **Thành tiền** và **Xóa**.

**Kết quả trước khi sửa**

- Chữ **Xóa** bị ngắt giữa từ thành `Xó` và `a`.
- Ký hiệu `₫` xuống dòng ở cả cột **Đơn giá** và **Thành tiền**.
- Hai nút `−` và `+` hiển thị trên hai dòng khác nhau.

**Kết quả mong đợi**

Chữ **Xóa** hiển thị trọn trên một dòng. Ký hiệu `₫` nằm cùng dòng với giá ở cả hai cột. Hai nút `−` và `+` nằm cùng hàng với số lượng.

**Minh chứng trước khi sửa**

[Ảnh giỏ hàng ở 768 × 1024 px](screenshots/cart-768px.png)

**Kết quả kiểm tra lại — 10/11/2026**

Kiểm tra `cart.html` trên commit `bbf1d100957e19282971b2eee9c9e0150a1957c9` ở **768 × 1024 px**. Cả giỏ có ba sản phẩm và giỏ chỉ có một sản phẩm ID 1 đều hiển thị chữ **Xóa** trên một dòng, giữ ký hiệu `₫` cùng dòng với giá và căn hai nút `−`, `+` cùng hàng với số lượng. Kết quả **Đạt**.