# Nhật ký sử dụng AI của Ngọc

Chỉ ghi hoạt động thực tế theo [quy tắc chung](ai-logging-rules.md) và [mẫu mục log](TEMPLATE.md). Mục đã ghi chỉ được bổ sung bằng mục mới, không sửa hoặc xóa.

---

## P0 / ngoc-20261103-b7e2-01

* Thời gian ghi: 2026-11-03T01:28:28+07:00
* Thời gian thực hiện: Chưa xác minh thời điểm bắt đầu; ghi trong phiên ngày 03/11/2026.
* Mã phiên nhật ký: ngoc-20261103-b7e2
* Người prompt: Ngọc
* Loại mục: Hoạt động
* Liên quan: Không có

### Công cụ

Codex.

### Mục đích

Nắm ngữ cảnh dự án và phạm vi của Ngọc, tìm hiểu quy tắc dự án và ghi nhận việc sử dụng AI.

### Prompt

Tóm lược: Ngọc đề nghị đọc folder, cập nhật ngữ cảnh, thêm rule cho dự án và cập nhật AI usage log trong quá trình trao đổi.

### Kết quả đề xuất

Codex đọc các tài liệu định hướng, phân công, quy tắc Buổi 2 và quy tắc ghi log; xác định Ngọc là QA/Tester và tóm tắt phạm vi Buổi 2. Đã hỏi Ngọc nội dung rule cần bổ sung; chưa thêm rule vì nội dung chưa được xác định. Nối mục này vào log cá nhân.

### Phản biện

Chưa có phản biện của thành viên.

### Quyết định của nhóm

Chưa có quyết định chung mới; Ngọc xác nhận danh tính và yêu cầu hỗ trợ trong cuộc trao đổi này.

### Người kiểm tra

Chờ Ngọc kiểm tra nội dung và mục log.

### Kiểm tra và minh chứng

Đã đối chiếu `AGENTS.md`, `session2/AGENTS.md`, `docs/SESSION2-GUIDE.md`, `PROJECT_PLAN.md`, tài liệu P0 của QA và quy tắc, mẫu log. Chưa kiểm thử giao diện; `session2/docs/test-report.md` chưa có tại thời điểm đọc. Chưa có Issue hoặc commit được xác định cho việc này.

---

## P0 / ngoc-20261103-b7e2-02

* Thời gian ghi: 2026-11-03T01:29:17+07:00
* Thời gian thực hiện: Trong phiên ngày 03/11/2026; thời điểm bắt đầu chưa xác minh.
* Mã phiên nhật ký: ngoc-20261103-b7e2
* Người prompt: Ngọc
* Loại mục: Hoạt động
* Liên quan: ngoc-20261103-b7e2-01

### Công cụ

Codex.

### Mục đích

Hỗ trợ Ngọc học kiểm thử Buổi 2 từng khái niệm, bắt đầu bằng thiết kế ca kiểm.

### Prompt

Tóm lược: Ngọc yêu cầu giải thích lần lượt thiết kế ca kiểm, responsive và DevTools, lỗi và kiểm lại, tiếp cận và đánh giá AI; lấy ví dụ sát nhiệm vụ QA, hỏi một câu sau mỗi khái niệm và đợi trả lời; chỉ dùng HTML5/CSS3, không làm toàn bộ bài thay Ngọc.

### Kết quả đề xuất

Chuẩn bị giải thích khái niệm ca kiểm bằng ví dụ kiểm tra giao diện ở 390 px và đặt một câu hỏi để Ngọc tự trả lời. Các chủ đề tiếp theo chờ trao đổi sau.

### Phản biện

Chưa có phản biện.

### Quyết định của nhóm

Chưa có quyết định chung mới; cách học trên do Ngọc yêu cầu.

### Người kiểm tra

Chờ Ngọc xem và trả lời câu hỏi.

### Kiểm tra và minh chứng

Đã đối chiếu nhiệm vụ B7, B9 trong `docs/SESSION2-GUIDE.md`; chưa thực hiện kiểm thử giao diện. Tệp thay đổi: `docs/ai-logs/ngoc.md`.

---

## P0 / ngoc-20261103-b7e2-03

* Thời gian ghi: 2026-11-03T01:29:43+07:00
* Thời gian thực hiện: Trong phiên ngày 03/11/2026; thời điểm bắt đầu chưa xác minh.
* Mã phiên nhật ký: ngoc-20261103-b7e2
* Người prompt: Ngọc
* Loại mục: Hoạt động
* Liên quan: ngoc-20261103-b7e2-02; HW-P0-QA-1

### Công cụ

Codex.

### Mục đích

Hướng dẫn lập bảng kiểm Buổi 2 và ghi lỗi, theo cách học từng khái niệm do Ngọc yêu cầu.

### Prompt

Tóm lược: Ngọc yêu cầu hướng dẫn bảng kiểm bốn trang ở 1366, 768, 390 px cho link, ảnh, tràn ngang, menu, lưới, kích thước nút và focus; hướng dẫn ghi bước tái hiện, ảnh, người sửa và kết quả kiểm lại; không khẳng định đã kiểm khi chưa có kết quả thực tế.

### Kết quả đề xuất

Bắt đầu hướng dẫn tổ chức 12 dòng theo trang và kích thước với các tiêu chí cần kiểm, để trạng thái chưa kiểm và đặt câu hỏi; các bước kiểm và ghi lỗi tiếp tục sau khi Ngọc trả lời.

### Phản biện

Chưa có phản biện.

### Quyết định của nhóm

Chưa có quyết định chung mới.

### Người kiểm tra

Chờ Ngọc kiểm tra và trả lời.

### Kiểm tra và minh chứng

Đã đối chiếu `docs/ROADMAP.md`, `docs/SESSION2-GUIDE.md` và `.claude/skills/responsive-css/SKILL.md`. Chưa kiểm thử trang trên trình duyệt. Tệp thay đổi: `docs/ai-logs/ngoc.md`.

---

## P0 / ngoc-20261103-b7e2-04

* Thời gian ghi: 2026-11-03T01:30:37+07:00
* Thời gian thực hiện: Trong phiên ngày 03/11/2026; thời điểm bắt đầu chưa xác minh.
* Mã phiên nhật ký: ngoc-20261103-b7e2
* Người prompt: Ngọc
* Loại mục: Hoạt động
* Liên quan: ngoc-20261103-b7e2-03; HW-P0-QA-1

### Công cụ

Codex.

### Mục đích

Đọc mã Buổi 2 và chuẩn bị phần kiểm thử thuộc công việc QA để Ngọc review.

### Prompt

Tóm lược: Ngọc yêu cầu đọc, hiểu mã bài tập và phát triển đầy đủ theo issue đã nêu, sau đó Ngọc review.

### Kết quả đề xuất

Đã đọc HTML, CSS và phân công; tạo `session2/docs/test-report.md` với bảng 12 tổ hợp chưa kiểm, cách kiểm, mẫu ghi lỗi, kết quả script và điểm cần phối hợp. Chưa sửa HTML/CSS: khu responsive chỉ sửa lỗi đã ghi trong báo cáo; các phần khác thuộc người sở hữu tương ứng. Chưa tạo ảnh hay kết quả kiểm thử trình duyệt.

### Phản biện

Chưa có phản biện của Ngọc.

### Quyết định của nhóm

Chưa có quyết định chung mới; Ngọc yêu cầu thực hiện và dự kiến review.

### Người kiểm tra

Codex chạy script kiểm tự động; Ngọc chưa review.

### Kiểm tra và minh chứng

Sau khi tạo báo cáo, `python3 tools/check-session2.py session2` trả mã 1: 2 lỗi và 6 cảnh báo; chưa đạt. `rg` không tìm thấy script, onclick, bootstrap hoặc tailwind trong HTML/CSS. Chưa kiểm bằng trình duyệt tại ba chiều rộng; chưa chụp ảnh. Tệp thay đổi: `session2/docs/test-report.md`, `docs/ai-logs/ngoc.md`.

---

## P0 / ngoc-20261103-b7e2-05

* Thời gian ghi: 2026-11-03T01:33:33+07:00
* Thời gian thực hiện: Trong phiên ngày 03/11/2026; thời điểm bắt đầu chưa xác minh.
* Mã phiên nhật ký: ngoc-20261103-b7e2
* Người prompt: Ngọc
* Loại mục: Kiểm tra
* Liên quan: ngoc-20261103-b7e2-04; HW-P0-QA-1

### Công cụ

Codex, Google Chrome chế độ không hiện cửa sổ.

### Mục đích

Tiếp tục kiểm thử và chuẩn bị minh chứng cho bốn trang Buổi 2.

### Prompt

Tóm lược: Ngọc yêu cầu hoàn thành task còn dang dở.

### Kết quả đề xuất

Đã tạo 12 ảnh chụp thử trong `session2/docs/anh-thu/` và ghi giới hạn vào báo cáo. Ảnh `index-390.png` có nội dung bị cắt ở mép phải; chưa xác định nguyên nhân hay chiều rộng viewport thực tế. Chưa dùng các ảnh thử làm minh chứng nghiệm thu, chưa kết luận giao diện đạt hay lỗi, chưa sửa CSS.

### Phản biện

Chưa có phản biện của Ngọc.

### Quyết định của nhóm

Chưa có quyết định chung mới.

### Người kiểm tra

Codex xem ảnh chụp thử trang chủ; Ngọc chưa review.

### Kiểm tra và minh chứng

Chrome báo tạo ảnh thành công ở 12 tổ hợp kích thước cửa sổ được yêu cầu. Chưa đo viewport thực tế, chưa kiểm đủ nội dung, link, focus hay kiểm lại sau sửa. Tệp thay đổi: `session2/docs/test-report.md`, `session2/docs/anh-thu/`, `docs/ai-logs/ngoc.md`. Task chưa hoàn thành.

---

## P0 / ngoc-20261103-b7e2-06

* Thời gian ghi: 2026-11-03T01:35:19+07:00
* Thời gian thực hiện: Trong phiên ngày 03/11/2026; thời điểm bắt đầu chưa xác minh.
* Mã phiên nhật ký: ngoc-20261103-b7e2
* Người prompt: Ngọc
* Loại mục: Hoạt động
* Liên quan: ngoc-20261103-b7e2-04; ngoc-20261103-b7e2-05; HW-P0-QA-1

### Công cụ

Codex.

### Mục đích

Sửa các vấn đề đã nêu theo yêu cầu của Ngọc và kiểm tra lại bằng script.

### Prompt

Tóm lược: Ngọc nói mình đóng vai trò người sửa lỗi và yêu cầu sửa những lỗi đã nêu.

### Kết quả đề xuất

Bổ sung biến màu và lưới sản phẩm trong `session2/css/style.css`, chuyển ảnh sản phẩm sang đường dẫn `images/` trong `session2/products.html`. Sửa `tools/check-session2.py` để chấp nhận `alt` rỗng của ảnh trang trí và vẫn phát hiện thiếu thuộc tính. Cập nhật báo cáo kiểm thử. Giữ cảnh báo aria-current vì menu không có link tới trang chi tiết; không đánh dấu link trang khác là trang hiện tại. Các khu CSS liên quan do Đạt và Phúc phụ trách cần họ phối hợp review.

### Phản biện

Chưa có phản biện của Ngọc hay chủ sở hữu các phần liên quan.

### Quyết định của nhóm

Chưa có quyết định chung mới; Ngọc yêu cầu sửa lỗi.

### Người kiểm tra

Codex kiểm bằng script; Ngọc và chủ sở hữu chưa review.

### Kiểm tra và minh chứng

`python3 tools/check-session2.py session2`: 0 lỗi, 6 cảnh báo. Thử trên bản sao tạm xóa thuộc tính alt của banner: script phát hiện lỗi và thoát mã 1. `git diff --check` không báo lỗi. Chưa kiểm lại giao diện bằng trình duyệt; ảnh thử được chụp trước sửa. Tệp thay đổi: `session2/css/style.css`, `session2/products.html`, `tools/check-session2.py`, `session2/docs/test-report.md`, `docs/ai-logs/ngoc.md`.

---

## P0 / ngoc-20261103-b7e2-07

* Thời gian ghi: 2026-11-03T01:36:55+07:00
* Thời gian thực hiện: Trong phiên ngày 03/11/2026; thời điểm bắt đầu chưa xác minh.
* Mã phiên nhật ký: ngoc-20261103-b7e2
* Người prompt: Ngọc
* Loại mục: Hoạt động
* Liên quan: ngoc-20261103-b7e2-06; HW-P0-QA-1

### Công cụ

Codex, Git.

### Mục đích

Chuẩn bị commit và push các thay đổi liên quan lên nhánh của Ngọc theo yêu cầu.

### Prompt

Tóm lược: Ngọc yêu cầu commit và push lên nhánh của mình.

### Kết quả đề xuất

Đã kiểm tra nhánh hiện tại `KhanhNgoc` theo dõi `origin/KhanhNgoc`; tại thời điểm kiểm tra có sẵn 11 commit chưa đẩy. Chuẩn bị đưa mã sửa, báo cáo, ảnh thử và log vào commit. Kết quả commit và push chưa được xác minh tại thời điểm ghi mục này.

### Phản biện

Chưa có phản biện của Ngọc hay chủ sở hữu phần mã.

### Quyết định của nhóm

Chưa có quyết định chung mới; Ngọc yêu cầu commit và push lên nhánh của mình.

### Người kiểm tra

Codex kiểm trạng thái Git và chạy lại script; Ngọc chưa review thay đổi.

### Kiểm tra và minh chứng

`git diff --check` không báo lỗi; `python3 tools/check-session2.py session2` báo 0 lỗi và 6 cảnh báo. Chưa kiểm lại giao diện ở ba chiều rộng. Tệp dự kiến commit gồm `session2/css/style.css`, `session2/products.html`, `tools/check-session2.py`, `session2/docs/` và log này.
