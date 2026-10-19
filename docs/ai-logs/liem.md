# Nhật ký sử dụng AI của Liêm

Chỉ ghi hoạt động thực tế theo [quy tắc chung](../ai-logging-rules.md) và [mẫu mục log](TEMPLATE.md). Mục đã ghi chỉ được bổ sung bằng mục mới, không sửa hoặc xóa.

---

## Khởi tạo quy trình phát triển / LIEM-20261019-A5B97F16-001

* Thời gian ghi: 2026-10-19T21:52:28+07:00.
* Thời gian thực hiện: Đợt rà soát được ghi nhận từ 2026-10-19T21:50:28+07:00; đây không phải thời điểm bắt đầu toàn bộ lịch sử dự án.
* Mã phiên nhật ký: LIEM-20261019-A5B97F16. Đây là mã phiên do dự án đặt, không phải session ID nội bộ của Codex.
* Người prompt: Liêm, theo danh tính đã xác nhận trong cuộc trao đổi.
* Loại mục: Hoạt động thiết lập quy tắc.
* Liên quan: Bản tổng hợp ban đầu trong AI_USAGE_LOG.md; chưa có Issue được cung cấp cho đầu việc này.

### Công cụ

Codex. Không ghi tên model vì chưa xác minh từ giao diện người dùng.

### Mục đích

Thiết lập cách ghi log theo thành viên, phase và phiên, có thời gian, giữ lịch sử và thể hiện cách kiểm tra, sửa đầu ra AI; kết hợp mẫu môn học với cách ghi Hỏi/Giữ/Bỏ/Sửa.

### Prompt

Yêu cầu thực tế của Liêm: "giống yêu cầu thầy ròi phát triển theo mình nói, miễn sau luôn tự update liên tục là được"; bổ sung yêu cầu có thời gian, phiên, không chỉnh sửa lịch sử, chia theo người prompt và phase, có file rule và quyết định nhóm.

Phần mô tả trên tóm lược các ghi chú đi kèm, không phải bản chép đầy đủ toàn bộ cuộc trò chuyện.

### Kết quả đề xuất

Chuẩn bị cập nhật AGENTS.md để dẫn quy tắc chi tiết; tạo docs/ai-logging-rules.md, mẫu TEMPLATE.md và tám tệp log cá nhân; nối mục dẫn đường vào AI_USAGE_LOG.md, giữ nguyên phần cũ.

Mỗi mục mới có metadata và đủ bảy trường theo mẫu thầy. Mỗi công việc đáng kể được chủ động ghi khi Codex làm trong repo; người dùng kiểm tra trước commit/push.

### Phản biện

Liêm chỉ ra bản log cần đồng thời sát mẫu môn học và thể hiện quá trình dùng AI của từng thành viên. Bản trước gộp công việc, chưa có thời gian, mã phiên và quy tắc bất biến rõ ràng.

Điều chỉnh đề xuất sửa mục cũ thành chỉ nối thêm; tách log cá nhân để hạn chế xung đột. Quy tắc tự ghi được giới hạn đúng khả năng: không giám sát khi công cụ không chạy và không tự đọc chat của người khác.

### Quyết định của nhóm

Liêm yêu cầu thiết lập các nguyên tắc nêu trên. Việc dùng tám tệp cá nhân và quy ước mã phiên là phương án Codex triển khai cho yêu cầu này, chưa có xác nhận riêng của toàn bộ nhóm. Không ghi đây là cuộc họp hoặc biểu quyết đã diễn ra.

### Người kiểm tra

Codex kiểm tra cấu trúc bản chuẩn bị; Liêm cần đọc lại kết quả trước khi commit/push. Chưa có xác nhận duyệt nội dung từ các thành viên khác.

### Kiểm tra và minh chứng

Đã đọc trực tiếp AGENTS.md và AI_USAGE_LOG.md trên máy, xác nhận thư mục docs chưa tồn tại. Bản chuẩn bị giữ nguyên sáu mục chính của AGENTS, giữ nguyên byte đầu của log cũ và tạo đúng các đường dẫn cá nhân. Mẫu có đủ bảy trường, không gán hoạt động cho bảy thành viên còn lại.

Tệp liên quan: AGENTS.md, AI_USAGE_LOG.md, docs/ai-logging-rules.md, docs/ai-logs/TEMPLATE.md và tám log cá nhân. Chưa chạy mã ứng dụng, chưa kiểm thử việc tuân thủ quy tắc trong các phiên Codex của thành viên khác; chưa có cơ chế CI khóa sửa log. Việc chuẩn bị tệp chưa chứng minh đã push lên GitHub.
