# Nhật ký sử dụng AI của Phúc

Chỉ ghi hoạt động thực tế theo [quy tắc chung](ai-logging-rules.md) và [mẫu mục log](TEMPLATE.md). Mục đã ghi chỉ được bổ sung bằng mục mới, không sửa hoặc xóa.

## Buổi 2 — Khôi phục HW-P0-FD2-1 sau pull main / PHUC-20261102-C6B827-001

* Thời gian ghi: 2026-11-02T23:42:00+07:00
* Thời gian thực hiện: 2026-11-02; chi tiết bắt đầu/kết thúc chưa xác minh
* Mã phiên nhật ký: PHUC-20261102-C6B827
* Người prompt: Phúc
* Loại mục: Hoạt động
* Liên quan: HW-P0-FD2-1; các trao đổi trước về task này trong lịch sử hội thoại, mục PHUC-20261102-A7D91C-003/004 không có trong working tree sau pull

### Công cụ

Codex trong IDE; PowerShell để đọc repo và ghi lại tệp.

### Mục đích

Khôi phục phần bài tập danh sách sản phẩm FD2 bị mất sau khi pull main; nối lại log AI dựa trên cuộc trao đổi đã có.

### Prompt

Tóm lược yêu cầu: Phúc báo đã pull nhánh main trước khi commit nên mất file; yêu cầu làm lại task đã trao đổi từ đầu và cập nhật AI log theo trao đổi giữa hai bên.

### Kết quả đề xuất

Trước khi dựng lại, xác nhận working tree sạch ở commit `0f7d2c8`, nhánh `HongPhuc`; trong `session2/` chỉ còn AGENTS.md và CLAUDE.md, không có `products.html` hoặc `css/style.css`. Tám ảnh `assets/images/product-1.jpg` đến `product-8.jpg` còn tồn tại và đều 900×900.

Đã tạo lại `session2/products.html` với 8 thẻ sản phẩm theo bảng trong SESSION2-GUIDE, alt, giá, link chi tiết, cùng header/footer scaffold và CSS link. Đã tạo `session2/css/style.css` với marker 8 khu, chỉ thêm CSS trong khu 4 của Phúc: Grid 4/2/1 cột theo breakpoint, ảnh vuông, Flexbox cho nội dung thẻ và link ở cuối. Ảnh tham chiếu qua đường dẫn tương đối `../assets/images/` vì ảnh hiện nằm ở thư mục gốc `assets/images/`.

Các trao đổi trước gồm hướng dẫn học từng bước, triển khai rồi review tĩnh; thay đổi trước đó không còn trong working tree sau pull. Bản hiện tại được dựng lại từ tiêu chí local và nội dung đã xác nhận trong lịch sử trao đổi, không khẳng định khôi phục chính xác byte-for-byte file đã mất. Issue GitHub riêng HW-P0-FD2-1 chưa được tìm thấy trong lần tra cứu trước; dùng ROADMAP/SESSION2-GUIDE làm tiêu chí.

### Phản biện

Chưa có phản biện mới từ thành viên. Quy ước vị trí media queries giữa khu 4 và khu 7 từng được nêu là điểm cần Phúc/Ngọc thống nhất; không sửa khu của thành viên khác.

### Quyết định của nhóm

Phúc yêu cầu dựng lại phần task của mình sau pull main. Chưa có quyết định chung về vị trí cuối cùng của media queries.

### Người kiểm tra

Chờ Phúc review; chưa có kết quả kiểm tra trình duyệt.

### Kiểm tra và minh chứng

Đã đọc trạng thái Git, hướng dẫn Buổi 2, ROADMAP, AGENTS cục bộ, checker source, quy tắc và mẫu log. Đã xác nhận 8 tệp ảnh và kích thước 900×900. Không chạy checker, test hoặc trình duyệt. Hiện các trang `index.html`, `product-detail.html`, `about.html`, ảnh trong `session2/images/` và CSS khu của các vai khác chưa có trong working tree; đường dẫn menu/chi tiết được giữ theo cấu trúc dự án dự kiến, chưa xác nhận mở được trong checkout này.

Tệp mới: `session2/products.html`, `session2/css/style.css`. Tệp log: `docs/ai-logs/phuc.md`, `docs/ai-logs/AI_USAGE_LOG.md`.
## Buổi 2 — Bổ sung hồi cứu trao đổi và đồng bộ nhánh / PHUC-20261102-C6B827-002

* Thời gian ghi: 2026-11-02T23:51:09+07:00
* Thời gian thực hiện: Các trao đổi hướng dẫn và review trước khi pull main: chưa xác minh; commit/push: 2026-11-02, theo kết quả Git trong phiên này
* Mã phiên nhật ký: PHUC-20261102-C6B827
* Người prompt: Phúc
* Loại mục: Hoạt động
* Liên quan: PHUC-20261102-C6B827-001; HW-P0-FD2-1

### Công cụ

Codex trong IDE; Git qua PowerShell.

### Mục đích

Bổ sung hồi cứu các yêu cầu trước đây liên quan bài Buổi 2 và ghi nhận việc commit, push bản dựng lại sau khi Phúc yêu cầu.

### Prompt

Tóm lược các yêu cầu có trong lịch sử hội thoại: Phúc (FD2) xin giải thích từng bước về HTML danh sách, CSS Grid, ảnh/tỷ lệ và dữ liệu/thẻ; sau đó thu hẹp phạm vi sang HW-P0-FD2-1, yêu cầu hướng dẫn tự làm `session2/products.html` và CSS bằng HTML5/CSS3; tiếp tục yêu cầu phát triển code trong phạm vi để Phúc review; rồi yêu cầu đọc issue và git diff, nêu phần ngoài phạm vi cùng các hạng mục HTML/CSS, link/ảnh, responsive và focus cần tự kiểm, không bịa kết quả. Sau khi dựng lại, Phúc yêu cầu commit và push lên nhánh của mình; hiện yêu cầu bổ sung log cho các trao đổi trước đó.

### Kết quả đề xuất

Các trao đổi học từng bước, phát triển, review và lần dựng lại sau pull được ghi nhận theo phần tóm lược trên; chi tiết câu trả lời/review cũ không được chép lại vì không có đủ nội dung để xác nhận trong working tree hiện tại. Mục PHUC-20261102-C6B827-001 ghi chi tiết phần khôi phục file và giới hạn kiểm tra.

Theo yêu cầu commit/push, đã commit bốn tệp liên quan bằng `ebc9a23` (`feat(products): restore session2 product list`) và push thành công `HongPhuc` lên `origin/HongPhuc`. Kết quả Git sau push cho thấy working tree sạch trước khi thêm mục log hồi cứu này.

### Phản biện

Chưa có phản biện mới của Phúc về nội dung code. Yêu cầu trước đó là review; chưa có phản hồi review của Phúc được cung cấp.

### Quyết định của nhóm

Phúc yêu cầu làm lại phần task của mình, commit và push lên nhánh `HongPhuc`. Không ghi nhận quyết định chung khác của nhóm.

### Người kiểm tra

Chờ Phúc review code và mục log mới; chưa có xác nhận duyệt.

### Kiểm tra và minh chứng

Đối chiếu các yêu cầu đã nêu trong lịch sử hội thoại, mục khôi phục PHUC-20261102-C6B827-001, và kết quả Git của commit `ebc9a23` cùng push `HongPhuc -> origin/HongPhuc`. Không chạy kiểm thử trình duyệt hoặc checker trong lần bổ sung log này. Thời điểm chính xác của các trao đổi trước khi pull main chưa xác minh.

Tệp log được nối thêm: `docs/ai-logs/phuc.md`, `docs/ai-logs/AI_USAGE_LOG.md`.
