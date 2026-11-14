# Báo cáo sử dụng AI — Buổi 2

Bản tổng hợp từ nhật ký đã có; người thực hiện kiểm tra lại trước khi nộp. Không suy mọi đề xuất đã được duyệt hoặc kiểm thử thành công.

## Ví dụ 1 — Đạt: hiệu ứng hover và focus

- Mục đích: phát triển hiệu ứng trong khu 8 CSS; nguồn [DAT-20261102-48B73AC1-005](../../docs/ai-logs/dat.md).
- Kết quả theo log: Codex bổ sung hover, transition, focus-visible và giảm chuyển động; Đạt được yêu cầu review.
- Kiểm tra/giới hạn theo log: kiểm tĩnh số ngoặc và một số mẫu bị cấm; lúc ghi chưa kiểm tương tác trên trình duyệt. Cần Đạt xác nhận kết quả sau cùng.

## Ví dụ 2 — Ngọc: kiểm tra và xử lý vấn đề giao diện

- Nguồn: [báo cáo kiểm thử](test-report.md) và [nhật ký Ngọc](../../docs/ai-logs/ngoc.md).
- Báo cáo ghi trước đó script báo hai lỗi; sau sửa đường dẫn ảnh, lưới CSS, biến màu và điều chỉnh checker, script báo 0 lỗi và 6 cảnh báo.
- Phản biện: kết quả kiểm tĩnh không thay thế việc mở trình duyệt; ảnh thử có giới hạn và chưa chứng minh đủ 12 lần kiểm. Người phụ trách cần kiểm lại.

## Trạng thái bàn giao

Ngọc và Liêm cần rà lại nguồn, prompt, kết quả, quyết định và minh chứng trước khi nộp. Không đưa token hoặc dữ liệu riêng tư vào báo cáo.

## Thành — AI hỗ trợ BTVN Buổi 3

### 1 — Học kiến thức trước khi làm

- Tôi nhờ AI giải thích các khái niệm cần cho task: sự kiện `input`, `change`; `Set`; `filter`, `includes`, `toLowerCase`, `trim`; `sort`, sao chép mảng và kết hợp nhiều điều kiện.
- AI đưa ví dụ ngoài dự án, giải thích lỗi thường gặp và đặt câu hỏi để tôi trả lời. Tôi trả lời trong cuộc trao đổi và được AI góp ý.
- Theo cách hiểu của tôi: `input` giúp phản hồi khi đang nhập; `Set` giữ các giá trị không trùng; `sort()` làm thay đổi mảng được sắp xếp nên cần tạo bản sao nếu muốn giữ mảng gốc.

### 2 — Làm Bước 1: Thanh công cụ sản phẩm

- Yêu cầu: tạo ô tìm kiếm, chọn danh mục và sắp xếp trong `session3/products.html`; viết CSS tại khu vực của Thành trong `session3/css/style.css`.
- Tôi trao đổi với AI về các yêu cầu và cách đặt thanh công cụ phía trên lưới sản phẩm.
- Ban đầu AI gợi ý tôi tự viết CSS. Sau đó tôi yêu cầu AI cung cấp đoạn CSS để dán. Tôi sử dụng đoạn CSS AI đưa, gồm Flexbox, khoảng cách giữa các ô và media query cho màn hình nhỏ.
- Lý do sử dụng: tôi cần được hỗ trợ tạo bố cục ba ô nằm ngang trên màn hình lớn và xếp dọc trên màn hình nhỏ.

### 3 — Kiểm tra giao diện và Console

- Tôi mở trang sản phẩm trên trình duyệt và gửi ảnh kết quả trong cuộc trao đổi.
- Theo ảnh quan sát: ba ô nằm ngang ở màn hình lớn, xếp dọc ở màn hình nhỏ và Console không hiển thị lỗi đỏ.
- Giới hạn: chưa xác nhận từ ảnh rằng hai chiều rộng được đặt chính xác là 1366 px và 390 px. Tôi cần kiểm tra lại hai kích thước và việc tràn ngang trước khi kết luận Bước 1 đạt.

### 4 — Kiểm tra Git trước khi commit

- AI hướng dẫn tôi kiểm tra nhánh, trạng thái file và lịch sử Git khi chuẩn bị commit.
- Lúc đầu Git báo không có thay đổi. Sau khi tôi lưu file, `git status` hiển thị `session3/products.html` và `session3/css/style.css` đã thay đổi.
- Tại thời điểm kiểm tra, tôi đang ở nhánh `Thành-Nguyễn`, chưa phải nhánh `hw/p1-fd1-1`. Tôi chưa tạo commit cho Bước 1 và cần kiểm tra lại nhánh trước khi commit.

### Cập nhật sau khi Thành tự kiểm tra

- Thành xác nhận đã kiểm tra ở 1366 px và 390 px, giao diện đạt yêu cầu và Console không có lỗi đỏ. Ở 390 px, ảnh Console cho thấy `scrollWidth` và `clientWidth` đều bằng 390. Việc kiểm tra 1366 px dựa trên xác nhận của Thành; ảnh được cung cấp không hiển thị số đo viewport.

---

## Đạt (PD) — AI hỗ trợ BTVN Buổi 3 / HW-P1-PD-1.6

- Thời gian ghi: 2026-11-10T01:36:30+07:00. Mã tham chiếu: DAT-20261109-A6CFD653-007; [log cá nhân của Đạt](../../docs/ai-logs/dat.md).
- Nguồn xác nhận: Đạt cho biết đã trao đổi với ChatGPT để được hướng dẫn quy trình nộp bài, đối chiếu yêu cầu bài tập và cách ghi log. Đây là tổng hợp hồi cứu; chưa xác minh thời điểm trao đổi, model hoặc prompt nguyên văn, không dựng lại lời chat.
- Trong phiên hiện tại, Codex đọc tài liệu và kiểm tra cấu trúc session3/docs/answers/Dat.md; không viết câu trả lời thay Đạt và không sửa file trả lời cá nhân.
- Kết quả quan sát: Dat.md hiện là bản nháp AI chưa được Đạt xác nhận, có 6 mục Câu 1–6 mang ngữ cảnh HTML/CSS Buổi 2 và nhiều placeholder; chưa có đủ 9 câu trả lời Buổi 3 theo yêu cầu Đạt. Hướng dẫn Buổi 3 hiện chỉ liệt kê 3 câu trọng tâm cho PD; cần Đạt đối chiếu bộ câu hỏi chính thức để tự hoàn thiện. Không xác nhận nội dung kiến thức đã đúng hoặc bài đã nộp.
- Phản biện/giới hạn: không coi bản nháp tham khảo là câu trả lời cá nhân; chưa có prompt ChatGPT nguyên văn hoặc phê duyệt reviewer. Chưa có quyết định chung của nhóm; chờ Đạt duyệt log/tóm tắt và tự hoàn thiện câu trả lời.
- Người kiểm tra: Codex kiểm cấu trúc/tài liệu và Git; Đạt cung cấp xác nhận hoạt động ChatGPT. Không kiểm thử trình duyệt, không commit/push/tạo PR/đóng Issue trong phiên này. Toàn bộ nội dung thành viên khác và các mục trước được giữ nguyên.
