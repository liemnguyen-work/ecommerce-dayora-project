# Kịch bản trình bày DAYORA — Buổi 3

**Tổng thời lượng:** 5 phút (300 giây)  
**Mục tiêu:** Giới thiệu cách nhóm phối hợp, demo các chức năng JavaScript và trình bày kết quả kiểm thử.

## Chuẩn bị trước khi trình bày

- Mở `session3/index.html` bằng Live Server; kiểm tra đường dẫn, ảnh và Console.
- Chuẩn bị sẵn các tab: trang Sản phẩm, trang Giỏ hàng, `docs/kiem-thu.md` và PR của nhóm.
- Đưa giỏ hàng về trạng thái phù hợp để dễ quan sát khi demo; dùng cùng địa chỉ và cổng Live Server cho các trang.
- Kiểm tra máy chiếu, kích thước chữ và kết nối. Chọn một người điều khiển màn hình hoặc thống nhất cách chuyển quyền điều khiển.
- Các thành viên tập trước theo mốc thời gian; nội dung bên dưới là kịch bản dự kiến, không thay thế kiểm tra thực tế.

## Kịch bản 5 phút

### 0:00–0:45 — Liêm: Giới thiệu và phân công

**Lời mở đầu:**

> Nhóm em thực hiện DAYORA, website giới thiệu đồ dùng cho các chuyến đi ngắn. Ở Buổi 3, nhóm tiếp tục phát triển giao diện bằng JavaScript thuần để bổ sung danh sách sản phẩm, tìm kiếm, chi tiết và giỏ hàng.

**Thao tác:**

1. Mở trang chủ `index.html`, giới thiệu ngắn cấu trúc website.
2. Mở `docs/ke-hoach.md`, chỉ bảng phân công 8 thành viên.
3. Nói ngắn về cách nhóm làm việc trên nhánh riêng và tạo PR để review.

**Chuyển tiếp:**

> Tiếp theo, Phúc và Thành sẽ demo phần danh sách và tìm kiếm sản phẩm.

### 0:45–1:15 — Phúc: Danh sách sản phẩm

**Lời mở đầu:**

> Phần của em là hiển thị danh sách sản phẩm từ dữ liệu JavaScript thay vì viết cố định từng thẻ trong HTML.

**Thao tác:**

1. Mở `products.html`.
2. Cho thấy danh sách sản phẩm và giá được hiển thị.
3. Chỉ vị trí nút thêm vào giỏ trên một thẻ sản phẩm.

### 1:15–2:00 — Thành: Tìm kiếm, lọc và sắp xếp

**Lời mở đầu:**

> Em phụ trách thanh công cụ giúp người dùng tìm kiếm, lọc danh mục và sắp xếp theo giá.

**Thao tác:**

1. Nhập `Bình nước cá nhân` vào ô tìm kiếm và quan sát kết quả.
2. Xóa từ khóa, chọn một danh mục để lọc.
3. Chọn sắp xếp giá tăng dần; giải thích kết quả được hiển thị lại theo lựa chọn.

**Chuyển tiếp:**

> Hoàn sẽ giới thiệu trang chi tiết và cách xử lý khi mã sản phẩm không hợp lệ.

### 2:00–2:30 — Hoàn: Chi tiết sản phẩm

**Lời mở đầu:**

> Trang chi tiết dùng ID trên URL để xác định sản phẩm cần hiển thị.

**Thao tác:**

1. Mở `product-detail.html?id=3`, chỉ tên và giá sản phẩm.
2. Đổi URL thành `product-detail.html?id=999` để demo thông báo sản phẩm không tồn tại.
3. Quay lại trang sản phẩm để chuyển cho Châu.

### 2:30–3:00 — Châu: Dữ liệu và lưu giỏ hàng

**Lời mở đầu:**

> Em phụ trách dữ liệu sản phẩm dùng chung và phần xử lý giỏ hàng.

**Thao tác:**

1. Mở `js/data/products.js`, chỉ ngắn gọn các trường như `id`, `name`, `price` và `category`.
2. Giải thích giỏ hàng lưu `id` và `quantity` trong Local Storage với khóa `cart`.
3. Chuyển lại trình duyệt để Đạt demo giỏ hàng.

### 3:00–3:30 — Đạt: Giao diện giỏ hàng

**Lời mở đầu:**

> Phần của em là giao diện giỏ hàng và số lượng hiển thị trên biểu tượng giỏ.

**Thao tác:**

1. Thêm một sản phẩm vào giỏ và mở `cart.html`.
2. Bấm tăng, giảm số lượng; chỉ thành tiền và tổng tiền thay đổi.
3. Xóa sản phẩm và cho thấy trạng thái giỏ trống hoặc số trên biểu tượng giỏ.

### 3:30–4:00 — Ngọc: Kiểm thử và minh chứng

**Lời mở đầu:**

> Em phụ trách kiểm thử chức năng, giao diện và ghi nhận các lỗi phát hiện được.

**Thao tác:**

1. Mở `docs/kiem-thu.md`, chỉ bảng TC-01 đến TC-16 và cột kết quả thực tế.
2. Mở thư mục `docs/screenshots/`, giới thiệu ảnh minh chứng kiểm tra giao diện.
3. Nêu ngắn BUG-01 ở giỏ hàng 768 px và kết quả kiểm tra lại đã ghi trong báo cáo.

### 4:00–4:30 — Kiệt: Tích hợp GitHub

**Lời mở đầu:**

> Em phụ trách cấu trúc dự án và hỗ trợ nhóm tích hợp công việc qua GitHub.

**Thao tác:**

1. Mở một PR của nhóm trên GitHub.
2. Chỉ nhánh làm việc, phần thay đổi và phần review.
3. Giải thích ngắn nhóm kiểm tra trước khi đưa thay đổi vào `main`.

### 4:30–5:00 — Liêm: Kết luận

**Lời kết:**

> Nhóm em đã trình bày cách phân công, các chức năng chính và kết quả kiểm thử được ghi nhận. Sản phẩm là bài tập học tập, chưa thực hiện thanh toán thật. Nhóm em xin kết thúc phần trình bày và sẵn sàng trả lời câu hỏi của giảng viên.

**Thao tác:** Quay về trang chủ hoặc để màn hình ở trang giảng viên muốn xem lại.

## Kiểm tra sau khi tập

- [ ] Đủ 8 thành viên có phần trình bày.
- [ ] Đã thử các đường dẫn và thao tác demo trên bản sẽ nộp.
- [ ] Mỗi người biết thời điểm nhận và chuyển màn hình.
- [ ] Đọc và demo thử trong không quá 5 phút.
- [ ] Điều chỉnh kịch bản theo kết quả thực tế; không khẳng định chức năng chưa kiểm chứng.