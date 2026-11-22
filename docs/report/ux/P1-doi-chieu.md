# PRJ-P1-PD-2 — Đối chiếu giao diện P1 với DESIGN-SYSTEM

## 1. Thông tin kiểm tra

- **Ngày kiểm tra:** 16/11/2026
- **Nhánh:** `prj/p1-pd-2`
- **Commit nhóm:** `31b0451`
- **Code mẫu:** https://github.com/NguyenTienMinh2510/dayora
- **Người thực hiện:** Đạt (PD)
- **Reviewer:** Thành (FD1)
- **Phạm vi:** Trang chủ, Sản phẩm, Chi tiết sản phẩm, Đăng nhập và Về chúng tôi
- **Viewport:** desktop 1366 × 768 px; mobile 390 × 844 px
- **Nguồn đối chiếu:** `design/DESIGN-SYSTEM.md`, `REQUIREMENTS.md`, `docs/DECISIONS.md`, bản nhóm tại `http://localhost:5173` và bản mẫu tại `http://localhost:5174`

> Báo cáo ghi nhận kết quả quan sát trực tiếp từ 20 ảnh chụp giao diện. Các trạng thái hover, focus bàn phím, validation, disabled, dark mode, reduced motion, zoom 200% và font thực tế trong Firefox Fonts chưa được kiểm thử nên không được đánh dấu đạt.

## 2. Minh chứng

Có 20 ảnh: 5 trang × 2 kích thước × 2 phiên bản.

| Trang | Nhóm 1366 px | Mẫu 1366 px | Nhóm 390 px | Mẫu 390 px |
|---|---|---|---|---|
| Trang chủ | [group](../images/p1/home-desktop-group.png) | [sample](../images/p1/home-desktop-sample.png) | [group](../images/p1/home-mobile-group.png) | [sample](../images/p1/home-mobile-sample.png) |
| Sản phẩm | [group](../images/p1/catalog-desktop-group.png) | [sample](../images/p1/catalog-desktop-sample.png) | [group](../images/p1/catalog-mobile-group.png) | [sample](../images/p1/catalog-mobile-sample.png) |
| Chi tiết sản phẩm | [group](../images/p1/product-detail-desktop-group.png) | [sample](../images/p1/product-detail-desktop-sample.png) | [group](../images/p1/product-detail-mobile-group.png) | [sample](../images/p1/product-detail-mobile-sample.png) |
| Đăng nhập | [group](../images/p1/login-desktop-group.png) | [sample](../images/p1/login-desktop-sample.png) | [group](../images/p1/login-mobile-group.png) | [sample](../images/p1/login-mobile-sample.png) |
| Về chúng tôi | [group](../images/p1/about-desktop-group.png) | [sample](../images/p1/about-desktop-sample.png) | [group](../images/p1/about-mobile-group.png) | [sample](../images/p1/about-mobile-sample.png) |

## 3. Quy ước phân loại

| Mức độ | Tiêu chí |
|---|---|
| **Chặn** | Giao diện bị vỡ, nội dung hoặc CTA quan trọng bị che, hoặc người dùng không thể tiếp tục thao tác cốt lõi |
| **Nên sửa** | Giao diện vẫn sử dụng được nhưng khác bản mẫu về bố cục, nội dung, khoảng cách hoặc cách trình bày |
| **Chấp nhận** | Khác biệt nhỏ hoặc là cải tiến có chủ đích, không ảnh hưởng khả năng sử dụng |

Trong phạm vi ảnh chụp, không quan sát thấy giao diện bị vỡ, tràn ngang hoặc CTA cốt lõi bị che. Vì vậy, không ghi nhận khác biệt mức **Chặn**.

## 4. Đối chiếu tổng quát

| Tiêu chí | Bản nhóm | Bản mẫu | Kết luận |
|---|---|---|---|
| Màu nhận diện | Paper, Ink, Berry và Leaf được sử dụng nhất quán | Sử dụng cùng nhóm màu nhận diện | Chấp nhận theo ảnh |
| Chữ và dấu tiếng Việt | Hiển thị rõ, không thấy mất dấu | Hiển thị rõ, không thấy mất dấu | Chấp nhận về hiển thị |
| CTA | CTA chính dùng màu Berry, hình dạng dễ nhận biết | CTA chính dùng màu Berry, một số nút có hiệu ứng và biểu tượng khác | Nên sửa nếu cần bám sát mẫu |
| Responsive | Năm trang đều chuyển được sang bố cục mobile | Năm trang đều có bố cục mobile riêng | Chấp nhận về khả năng hiển thị |
| Tràn ngang hoặc nội dung bị che | Không quan sát thấy qua ảnh | Không quan sát thấy qua ảnh | Không ghi nhận lỗi Chặn |
| Hover, focus, disabled và bàn phím | Chưa kiểm thử | Chưa kiểm thử | Chưa kết luận |
| Validation và thông báo lỗi | Chưa kiểm thử | Chưa kiểm thử | Chưa kết luận |
| Dark mode, reduced motion và zoom 200% | Chưa kiểm thử | Chưa kiểm thử | Chưa kết luận |

## 5. Đối chiếu theo từng trang

### 5.1. Trang chủ `/`

| Phần tử | Điểm giống | Điểm khác | Mức độ | Người phụ trách | Issue |
|---|---|---|---|---|---|
| Hero và CTA | Đều có ảnh phong cách picnic, tiêu đề lớn và CTA tạo bộ | Bản mẫu bổ sung số liệu, thẻ nổi và cách đặt CTA khác; bản nhóm dùng bố cục Hero đơn giản hơn | Nên sửa | FD1 Thành; PD Đạt kiểm tra | — |
| Danh mục và sản phẩm | Đều giới thiệu nhóm hàng và sản phẩm nổi bật | Số lượng nội dung, cách cuộn và cấu trúc thẻ khác nhau | Nên sửa | FD1 Thành | — |
| Tạo bộ chuyến đi | Đều có lối vào chức năng tạo bộ | Bản mẫu hiển thị quy trình, lộ trình, tổng tiền và phí; bản nhóm chỉ có CTA dẫn vào chức năng | Nên sửa | FD1 Thành | — |
| Nội dung bổ trợ | Đều có khu chuyến đi và footer | Thứ tự section, ưu đãi và FAQ khác nhau giữa hai phiên bản | Nên sửa | FD1 Thành; PD Đạt rà nội dung | — |
| Responsive | Nội dung chuyển thành các khối dọc, CTA không bị che | Cách thu gọn section và mật độ nội dung khác bản mẫu | Chấp nhận | FD1 Thành xác minh thêm | — |

### 5.2. Trang Sản phẩm `/san-pham`

| Phần tử | Điểm giống | Điểm khác | Mức độ | Người phụ trách | Issue |
|---|---|---|---|---|---|
| Danh sách sản phẩm | Đều hiển thị 26 sản phẩm với ảnh, tên và giá | Bản nhóm sử dụng thẻ có viền và bố cục khác; bản mẫu có thêm loại hàng, giá “Từ” và CTA thêm vào giỏ | Nên sửa | FD1 Thành | — |
| Bộ lọc desktop | Đều có chức năng lọc sản phẩm | Bản nhóm mở sẵn bộ lọc chi tiết ở cột trái; bản mẫu dùng bộ lọc thu gọn và thanh gợi ý chuyến đi | Nên sửa | FD1 Thành | — |
| Bộ lọc mobile | Đều có nút mở bộ lọc và lưới hai cột | Vị trí nút, thanh gợi ý và cách trình bày thẻ khác nhau | Nên sửa | FD1 Thành | — |
| Responsive | Không thấy tràn ngang; tên dài được xuống dòng | Mật độ chữ và khoảng cách giữa các thẻ khác bản mẫu | Chấp nhận | FD1 Thành xác minh thêm | — |
| Tương tác lọc | Ảnh xác nhận giao diện mặc định hiển thị | Chưa kiểm thử áp dụng, xóa bộ lọc và trạng thái không có kết quả | Chưa kết luận | FD1 Thành kiểm thử | — |

### 5.3. Trang Chi tiết sản phẩm `/san-pham/:slug`

| Phần tử | Điểm giống | Điểm khác | Mức độ | Người phụ trách | Issue |
|---|---|---|---|---|---|
| Thông tin sản phẩm | Đều có ảnh, tên, giá, biến thể, tồn kho, thông số và sản phẩm liên quan | Vị trí breadcrumb, cách trình bày thông số và bố cục nội dung khác nhau | Nên sửa | FD1 Thành | — |
| Mô tả sản phẩm | Hai phiên bản đều hiển thị nội dung mô tả đang cập nhật | Khác câu chữ và vị trí hiển thị, nhưng không phải khác biệt Chặn giữa hai phiên bản | Chấp nhận | FD1 Thành xác minh khi dữ liệu hoàn thiện | — |
| CTA và số lượng | Đều có bộ tăng/giảm số lượng và nút thêm vào giỏ | Kích thước, vị trí CTA và nội dung bổ trợ quanh CTA khác nhau | Nên sửa | FD1 Thành | — |
| Sản phẩm liên quan | Đều hiển thị ba sản phẩm liên quan | Bản mẫu có loại hàng, giá “Từ”, nhãn biến thể và nút thêm vào giỏ; bản nhóm dùng thẻ đơn giản hơn | Nên sửa | FD1 Thành | — |
| Responsive | Bố cục desktop hai cột chuyển thành một cột trên mobile, CTA không bị che | Thứ tự nội dung và khoảng cách section khác bản mẫu | Chấp nhận | FD1 Thành xác minh thêm | — |
| Tương tác | Các điều khiển hiển thị đầy đủ trong ảnh | Chưa kiểm thử giới hạn số lượng, tồn kho, disabled và thêm vào giỏ thật | Chưa kết luận | FD1 Thành; BD1 Hoàn kiểm thử | — |

### 5.4. Trang Đăng nhập `/dang-nhap`

| Phần tử | Điểm giống | Điểm khác | Mức độ | Người phụ trách | Issue |
|---|---|---|---|---|---|
| Form đăng nhập | Đều có Email, Mật khẩu, CTA đăng nhập và liên kết tạo tài khoản | Bản nhóm dùng form dạng thẻ và có footer; bản mẫu dùng bố cục ảnh lớn bên trái trên desktop | Nên sửa | FD2 Phúc; PD Đạt kiểm tra | — |
| CTA | Đều sử dụng CTA Berry nổi bật | Bản mẫu có biểu tượng mũi tên và hiệu ứng bao quanh khác bản nhóm | Nên sửa | FD2 Phúc | — |
| Mobile | Form nằm gọn trong viewport, các trường và CTA không bị che | Khoảng trắng, kích thước tiêu đề và vị trí form khác bản mẫu | Nên sửa | FD2 Phúc | — |
| Validation | Trạng thái mặc định hiển thị rõ | Chưa kiểm thử email sai, mật khẩu ngắn, thông báo lỗi, focus và đăng nhập thật | Chưa kết luận | FD2 Phúc; BD1 Hoàn kiểm thử | — |

### 5.5. Trang Về chúng tôi `/ve-chung-toi`

| Phần tử | Điểm giống | Điểm khác | Mức độ | Người phụ trách | Issue |
|---|---|---|---|---|---|
| Câu chuyện thương hiệu | Đều có Hero, câu chuyện DAYORA và ảnh picnic | Trật tự nội dung, kích thước logo, tiêu đề và cách chia cột khác nhau | Nên sửa | PD Đạt | — |
| Lời hứa thương hiệu | Đều có ba nội dung: vừa đủ, minh bạch và tự do đổi món | Cách trình bày thẻ, màu nền và khoảng cách khác bản mẫu | Nên sửa | PD Đạt | — |
| Đội ngũ | Đều hiển thị tám thành viên | Desktop của bản nhóm dùng bốn cột; mẫu dùng khu giới thiệu bên trái và lưới thành viên bên phải | Nên sửa | PD Đạt | — |
| FAQ mobile | Bản nhóm và bản mẫu đều hiển thị FAQ | Bản nhóm có hai câu FAQ, trong khi bản mẫu có bốn câu; cách trình bày accordion khác nhau | Nên sửa | PD Đạt rà nội dung; FD1 Thành hỗ trợ | — |
| Responsive | Không thấy tràn ngang; lưới thành viên chuyển thành hai cột trên mobile | Khoảng cách và mật độ nội dung khác bản mẫu nhưng không làm mất khả năng sử dụng | Chấp nhận | PD Đạt kiểm tra lại | — |

## 6. Danh sách khác biệt và hướng xử lý

| Mã | Khác biệt | Mức độ | Người phụ trách | Issue / trạng thái |
|---|---|---|---|---|
| UX-P1-01 | Bố cục và số lượng section trên Trang chủ khác bản mẫu | Nên sửa | FD1 Thành | Chờ reviewer xác nhận |
| UX-P1-02 | Bộ lọc và thẻ sản phẩm khác cách trình bày của bản mẫu | Nên sửa | FD1 Thành | Chờ reviewer xác nhận |
| UX-P1-03 | Trang Chi tiết sản phẩm khác bố cục thông số, CTA và thẻ sản phẩm liên quan | Nên sửa | FD1 Thành | Chờ reviewer xác nhận |
| UX-P1-04 | Trang Đăng nhập dùng thẻ form thay cho bố cục chia đôi của bản mẫu | Nên sửa | FD2 Phúc | Chờ reviewer xác nhận |
| UX-P1-05 | Trang Về chúng tôi khác bố cục và số lượng câu FAQ trên mobile | Nên sửa | PD Đạt | Chờ reviewer xác nhận |
| UX-P1-06 | Chưa đo contrast, radius và kích thước vùng bấm bằng DevTools | Nên sửa | FD1 Thành; PD Đạt | Chờ kiểm tra |
| UX-P1-07 | Chưa kiểm thử hover, focus, disabled, validation, zoom 200%, dark mode và reduced motion | Nên sửa | Người phụ trách từng trang | Chờ kiểm thử bổ sung |

Không ghi nhận khác biệt mức **Chặn** trong phạm vi 20 ảnh. Vì vậy, bước này không phát sinh issue bắt buộc dành cho lỗi Chặn.

## 7. Kết luận

Qua 20 ảnh minh chứng, năm trang P1 của bản nhóm và bản mẫu đều hiển thị được ở 1366 × 768 px và 390 × 844 px. Không quan sát thấy tràn ngang, CTA quan trọng bị che hoặc giao diện bị vỡ.

Các khác biệt ghi nhận chủ yếu thuộc mức **Nên sửa**, tập trung vào cấu trúc section, bố cục, số lượng nội dung và cách trình bày thành phần. Không có khác biệt mức **Chặn**, do đó không cần tạo issue Chặn ở bước này.

Kết luận chỉ áp dụng cho trạng thái giao diện được thể hiện trong ảnh. Các trạng thái tương tác, accessibility và hành vi chức năng cần được kiểm thử riêng trước khi nghiệm thu toàn bộ Phase 1.

## 8. Xác nhận reviewer

- [ ] FD1 Thành đã đọc báo cáo và kiểm tra ảnh.
- [x] Không ghi nhận khác biệt mức Chặn cần tạo issue.
- [ ] Các khác biệt mức Nên sửa đã được reviewer xác nhận.
- [ ] PRJ-P1-PD-2 đủ điều kiện chuyển sang bước kiểm tra kiến thức.