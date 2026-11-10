# 1. DAYORA — Bài tập nhóm Buổi 3

DAYORA là website giới thiệu và bán đồ dùng cho các chuyến đi ngắn trong ngày như picnic, hẹn hò và đi biển.

Trong bài tập Buổi 3, nhóm tiếp tục phát triển giao diện Buổi 2 bằng JavaScript thuần, tập trung vào danh sách sản phẩm, tìm kiếm, lọc, sắp xếp, chi tiết sản phẩm và giỏ hàng.

# 2. Thành viên và nhiệm vụ

Bảng dưới đây ghi nhận **phân công theo kế hoạch** của nhóm. Phân công không tự chứng minh từng nhiệm vụ đã hoàn thành; kết quả thực tế cần đối chiếu với file, kiểm thử và lịch sử công việc.

| Thành viên | Vai trò | Nhiệm vụ chính trong Buổi 3 |
|---|---|---|
| Liêm | PM | Lập kế hoạch, thống nhất quy ước, tổng hợp README và kịch bản trình bày. |
| Đạt | Product Designer | Xây dựng giao diện giỏ hàng và phần hiển thị số lượng trên biểu tượng giỏ. |
| Thành | Frontend | Tìm kiếm, lọc danh mục và sắp xếp sản phẩm theo giá. |
| Phúc | Frontend | Hiển thị danh sách sản phẩm động và nút thêm vào giỏ. |
| Hoàn | Backend | Hiển thị chi tiết sản phẩm theo ID và thêm sản phẩm từ trang chi tiết vào giỏ. |
| Châu | Backend | Xây dựng dữ liệu sản phẩm dùng chung và logic giỏ hàng. |
| Ngọc | QA | Chuẩn bị và thực hiện kiểm thử, ghi nhận lỗi và minh chứng. |
| Kiệt | DevOps | Chuẩn bị cấu trúc Buổi 3, khung giỏ hàng và hỗ trợ kiểm tra tích hợp GitHub. |

Chi tiết: [Kế hoạch nhóm](docs/ke-hoach.md).

# 3. Công nghệ sử dụng

- **HTML5:** tổ chức nội dung và cấu trúc các trang.
- **CSS3:** định dạng giao diện và bố cục đáp ứng theo kích thước màn hình.
- **JavaScript thuần:** xử lý danh sách sản phẩm, tìm kiếm, lọc, chi tiết sản phẩm và giỏ hàng.
- **Local Storage:** lưu dữ liệu giỏ hàng trong trình duyệt bằng khóa `cart`.
- **Live Server:** công cụ phục vụ mở và kiểm tra website trên máy.
- **Google Fonts:** các trang tham chiếu font **Be Vietnam Pro** từ nguồn bên ngoài. Khi không tải được font, trình duyệt sử dụng font dự phòng theo cấu hình CSS.

Dữ liệu giỏ hàng trong bài tập được lưu ở trình duyệt; đây là phiên bản phục vụ học tập.

# 4. Cấu trúc thư mục

```text
session3/
├── index.html                  # Trang chủ
├── products.html               # Danh sách sản phẩm
├── product-detail.html         # Chi tiết sản phẩm
├── about.html                  # Giới thiệu
├── cart.html                   # Giỏ hàng
├── css/
│   └── style.css               # Kiểu trình bày dùng chung
├── images/                     # Logo, banner và ảnh sản phẩm
├── js/
│   ├── data/
│   │   └── products.js         # Dữ liệu sản phẩm và hàm dùng chung
│   └── modules/
│       ├── cart.js
│       ├── cart-page.js
│       ├── product-detail.js
│       ├── render-products.js
│       └── search-filter.js
├── docs/
│   ├── ke-hoach.md
│   ├── quy-uoc.md
│   ├── kiem-thu.md
│   ├── ai-usage.md
│   ├── answers/
│   └── screenshots/
└── README.md
```

# 5. Các chức năng đã hoàn thành

Theo kết quả **Đạt** được ghi trong [báo cáo kiểm thử](docs/kiem-thu.md):

| Chức năng | Ca kiểm thử liên quan |
|---|---|
| Hiển thị danh sách 8 sản phẩm và giá VND | TC-01, TC-02 |
| Tìm kiếm theo tên, lọc theo danh mục và sắp xếp theo giá | TC-03, TC-04, TC-05 |
| Hiển thị thông báo khi tìm kiếm không có kết quả | TC-13 |
| Xem chi tiết sản phẩm theo ID; xử lý ID không hợp lệ hoặc không tồn tại | TC-06, TC-14, TC-15 |
| Thêm sản phẩm vào giỏ từ danh sách và trang chi tiết | TC-07, TC-08 |
| Tăng, giảm, xóa sản phẩm và tính tổng giỏ hàng | TC-09, TC-10, TC-11 |
| Lưu giỏ hàng bằng Local Storage và khôi phục sau khi tải lại | TC-12 |
| Xử lý khóa giỏ hàng bị thiếu hoặc dữ liệu JSON hỏng | TC-16 |

Các kết quả trên phản ánh những trường hợp được ghi trong báo cáo kiểm thử; không thay thế việc kiểm tra lại sau những thay đổi tiếp theo.

# 6. Hướng dẫn chạy bằng Live Server

1. Clone hoặc tải repository DAYORA về máy và mở thư mục dự án bằng VS Code.
2. Cài tiện ích **Live Server** trong VS Code nếu máy chưa có.
3. Trong Explorer, mở thư mục `session3/`.
4. Nhấp chuột phải vào `index.html`, chọn **Open with Live Server**.
5. Trình duyệt mở trang chủ. Dùng menu để đi đến các trang sản phẩm, giới thiệu và giỏ hàng.

Khi kiểm tra giỏ hàng, nên dùng cùng địa chỉ và cổng Live Server cho các trang để chúng dùng cùng dữ liệu Local Storage.

# 7. Hướng dẫn kiểm thử các chức năng chính

1. Mở website bằng Live Server và vào trang **Sản phẩm**.
2. Kiểm tra danh sách, tìm kiếm theo tên, lọc danh mục và sắp xếp theo giá.
3. Chọn một sản phẩm để xem chi tiết; thử đường dẫn có ID không tồn tại.
4. Thêm sản phẩm vào giỏ; vào trang **Giỏ hàng** để tăng, giảm hoặc xóa sản phẩm và kiểm tra tổng tiền.
5. Tải lại trang, kiểm tra giỏ hàng có được giữ lại trong cùng trình duyệt.
6. Mở Chrome DevTools để xem Console và Local Storage khi thực hiện các ca cần kiểm tra dữ liệu.

Các bước chi tiết, dữ liệu đầu vào và kết quả được ghi tại [báo cáo kiểm thử Buổi 3](docs/kiem-thu.md).

# 8. Những vấn đề đã gặp và cách khắc phục

**BUG-01 — Bố cục giỏ hàng ở 768 × 1024 px**

- **Trước khi sửa:** chữ “Xóa” bị ngắt giữa từ; ký hiệu `₫` xuống dòng; hai nút tăng và giảm số lượng hiển thị lệch dòng.
- **Xử lý:** Đạt được ghi là người phụ trách; báo cáo lỗi ghi trạng thái **Đã sửa**.
- **Kiểm tra lại:** ngày 10/11/2026, báo cáo ghi kết quả **Đạt** khi kiểm tra `cart.html` trên commit `bbf1d100957e19282971b2eee9c9e0150a1957c9`, ở cả trường hợp giỏ có một và ba sản phẩm. Chữ “Xóa”, giá và nút tăng/giảm hiển thị theo kết quả mong đợi.

Chi tiết và ảnh trước khi sửa: [BUG-01 trong báo cáo kiểm thử](docs/kiem-thu.md#bug-01--bố-cục-bảng-giỏ-hàng-ở-768--1024-px).

# 9. Repository GitHub và nhánh làm việc

- Repository nhóm: [liemnguyen-work/ecommerce-dayora-project](https://github.com/liemnguyen-work/ecommerce-dayora-project).
- Nhánh tích hợp của repository: `main`.
- Thành viên làm việc trên nhánh được giao theo task, sau đó tạo Pull Request để reviewer kiểm tra trước khi tích hợp.

Trạng thái các nhánh và Pull Request cần kiểm tra trực tiếp trên GitHub tại thời điểm bàn giao.

# 10. Nhật ký sử dụng AI

Nhóm ghi lại mục đích sử dụng AI, nội dung hỗ trợ, phản biện, quyết định và việc kiểm tra trong nhật ký.

- [Tổng hợp AI usage của bài tập](docs/ai-usage.md).
- [Nhật ký AI theo thành viên](../docs/ai-logs/AI_USAGE_LOG.md).
- [Quy tắc ghi nhật ký AI](../docs/ai-logs/ai-logging-rules.md).

Mỗi thành viên chịu trách nhiệm kiểm tra và giải thích phần mình thực hiện.