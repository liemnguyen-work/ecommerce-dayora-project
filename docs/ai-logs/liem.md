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

---

## Khởi tạo tài liệu khảo sát / LIEM-20261019-A5B97F16-002

* Thời gian ghi: 2026-10-19T21:57:46+07:00.
* Thời gian thực hiện: Đợt đọc tệp hiện tại được ghi nhận tại mốc trên; không phải thời gian thực hiện khảo sát đối thủ.
* Mã phiên nhật ký: LIEM-20261019-A5B97F16.
* Người prompt: Liêm.
* Loại mục: Hoạt động soạn tài liệu.
* Liên quan: Tiếp nối hướng dẫn tạo docs/competitor-analysis.md; chưa có Issue được cung cấp.

### Công cụ

Codex; không tự suy tên model.

### Mục đích

Chuyển kết quả khảo sát nhóm đã cung cấp thành tài liệu dự án, có bảng so sánh ba website, bài học và lý do chọn phương án cho DAYORA.

### Prompt

Tóm lược: Liêm đồng ý tiếp tục tạo docs/competitor-analysis.md từ FanFan, Đi Outdoor và WeTrek. Nội dung viết trực tiếp theo dự án, không nhắc số nhiệm vụ bài tập.

### Kết quả đề xuất

Chuẩn bị nội dung tệp khảo sát với sáu tiêu chí so sánh, nhận xét từng website, phương án áp dụng, đường dẫn và tình trạng minh chứng. Bản nguồn là kết quả ngày 18/10/2026 nhóm cung cấp; không thực hiện lại thao tác khảo sát trực tiếp trong đợt này.

### Phản biện

Giữ phân biệt ghi nhận đối thủ với chức năng đề xuất; không khẳng định tính độc quyền của Builder. Không thay đổi yêu cầu tối thiểu năm thuộc tính lọc theo đề xuất giảm còn bốn. Ảnh chưa được sao chép vào repo nên không tạo link ảnh giả. Chưa có phản hồi mới từ người dùng về bản soạn.

### Quyết định của nhóm

Liêm cho phép soạn tài liệu theo hướng đã đề xuất. Chưa có xác nhận toàn nhóm cho từng phương án triển khai hoặc duyệt nội dung cuối; không tự coi việc tạo tệp là đồng ý mọi yêu cầu.

### Người kiểm tra

Codex đối chiếu nội dung với thông tin nguồn đã đọc và cấu trúc bảng yêu cầu; Liêm cần đọc lại trước commit/push.

### Kiểm tra và minh chứng

Đã đọc AGENTS và quy tắc log; xác nhận tệp đích tồn tại nhưng trống, không ghi đè nội dung đã có. Kiểm tra bản chuẩn bị có ba website, sáu hàng tiêu chí, năm cột và không có ký tự Markdown bị thoát. Bản log mới giữ nguyên toàn bộ byte cũ. Chưa kiểm tra lại hoạt động các website hoặc cách GitHub render sau push, chưa sao chép ảnh và chưa chạy kiểm thử ứng dụng.

Tệp thay đổi: docs/competitor-analysis.md và docs/ai-logs/liem.md. Nguồn: phần khảo sát trong tài liệu Working Space đã cung cấp. Bản chuẩn bị chưa phải bằng chứng đã commit/push.
