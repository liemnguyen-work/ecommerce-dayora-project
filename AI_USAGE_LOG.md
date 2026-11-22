# AI Usage Log — DAYORA

## Nguyên tắc ghi nhận

Nhật ký ghi cách từng thành viên sử dụng AI theo các giai đoạn thực tế của dự án. Trong mỗi giai đoạn, phần của từng người ghi rõ: hỏi AI gì, giữ gì, bỏ hoặc sửa gì và vì sao, đã kiểm tra thế nào, kết quả và tệp liên quan.

Codex chủ động cập nhật log sau mỗi công việc đáng kể khi làm trực tiếp trong repository và có quyền sửa tệp, theo AGENTS.md. Thành viên kiểm tra lại trước khi commit và push.

Không tự thu thập lịch sử từ các máy, tài khoản hoặc công cụ khác. Chỉ tổng hợp những thông tin đã quan sát hoặc được thành viên cung cấp. Không ghi hoạt động hướng dẫn thành thao tác đã hoàn thành.

Không tự gán đóng góp, kết quả kiểm thử hoặc quyết định cho người khác. Chỉ ghi "Nhóm thống nhất" khi đã có xác nhận. Không công khai thông tin bí mật hoặc hội thoại riêng tư.

## Giai đoạn 1: Khởi tạo tài liệu và quy trình phát triển

### Liêm · Codex

**Hỏi AI gì:** Hỗ trợ lập bộ tài liệu theo mẫu, thống nhất cách trình bày cho dự án cuối kỳ; hướng dẫn tạo kho, clone về máy, soạn tệp, commit và push; kiểm tra thay đổi công nghệ, lỗi đăng nhập GitHub và định dạng Markdown; thiết lập cách ghi log theo từng thành viên.

**Giữ lại gì:** Tên DAYORA; mua lẻ kết hợp Kit Builder; dữ liệu dự kiến khoảng 30 SKU, ba tình huống và nhóm từ 1 đến 8 người. Dùng danh sách tám vai trò người dùng cung cấp. Giữ FR01 đến FR17 trong phiên bản đầu; FR18 là nâng cao có điều kiện. Tổ chức README, REQUIREMENTS, PROJECT_PLAN và AGENTS theo mẫu đã cung cấp.

**Bỏ hoặc sửa gì, vì sao:**

* Chuyển bộ công nghệ Laravel, Blade, Bootstrap và MySQL sang NestJS, React, Tailwind CSS và PostgreSQL trên Supabase theo trao đổi người dùng cung cấp. Codex đề xuất bổ sung TypeScript, Vite, VNPay Sandbox và Supabase Storage; đây là lựa chọn tài liệu, chưa phải các dịch vụ đã được cài hoặc tích hợp.
* Không sao chép cách dẫn số nhiệm vụ bài tập vào tài liệu phát triển. Repository trình bày trực tiếp mục tiêu, yêu cầu và công việc của DAYORA.
* Đổi tên kho mới thành ecommerce-dayora-project để phản ánh toàn bộ dự án; không giới hạn tên ở cải tiến giao diện.
* Dùng quy trình tạo tệp trên máy, commit và push. Khi phát hiện ký hiệu Markdown bị thoát bằng dấu gạch chéo ngược, hướng dẫn sửa trên GitHub và đồng bộ về máy.
* Chỉnh cách ghi nhật ký: chia giai đoạn, tách từng thành viên và ghi việc giữ, sửa hoặc bỏ cùng lý do; không chỉ ghi danh sách prompt và không điền trước đóng góp của cả nhóm.

**Đã kiểm tra thế nào:**

* Đọc file Word nhóm cung cấp để đối chiếu ảnh hưởng của thay đổi công nghệ; không tìm thấy tên bộ công nghệ cũ trong phần văn bản được trích xuất.
* Quan sát ảnh kết quả Git do Liêm cung cấp: clone kho trống thành công; README và REQUIREMENTS được commit, push thành công. Liêm xác nhận hoàn thành các bước tiếp theo cho PROJECT_PLAN.
* Đọc trực tiếp README trên máy để xác định các ký tự bị thoát như dấu thăng, dấu sao và dấu chấm. Việc sửa các tệp trên GitHub được hướng dẫn; không mặc định mọi tệp đã được đồng bộ nếu chưa có xác minh.
* Đọc và chỉnh trực tiếp AGENTS.md trên máy, sửa định dạng và bổ sung quy tắc Codex chủ động ghi log. Kiểm tra tệp ghi lại khớp bản đã chuẩn bị; Liêm xác nhận hoàn tất bước commit và push.
* Kiểm tra AI_USAGE_LOG.md chưa tồn tại trước khi tạo bản đầu. Soát nội dung dựa trên cuộc trao đổi thực tế; chưa có thành viên duyệt riêng bản log này.

**Kết quả và giới hạn:** Đã có bộ tài liệu khởi tạo và quy tắc cập nhật log. Chưa thực hiện viết mã chức năng, chạy kiểm thử ứng dụng hoặc triển khai website trong các công việc được ghi ở đây. Các chính sách nghiệp vụ còn mở trong REQUIREMENTS.md vẫn cần được xác nhận.

**Tệp liên quan:** [README.md](README.md), [REQUIREMENTS.md](REQUIREMENTS.md), [PROJECT_PLAN.md](PROJECT_PLAN.md), [AGENTS.md](AGENTS.md), AI_USAGE_LOG.md.

**Trạng thái kiểm tra:** Chờ Liêm rà soát và xác nhận bản nhật ký ban đầu. Các lựa chọn do AI đề xuất chỉ được xem là quyết định đã duyệt khi có xác nhận tương ứng.

### Kết quả phối hợp được ghi nhận

Liêm cung cấp danh sách tám vai trò nhóm đã chốt. Sau đó Liêm cung cấp hướng công nghệ mới từ trao đổi với thành viên nhóm và yêu cầu tiếp tục tài liệu theo hướng này. Nhật ký không suy ra cách từng thành viên đã sử dụng AI từ vai trò được giao.

Phần sử dụng AI của thành viên khác sẽ được bổ sung dưới tên người đó trong giai đoạn tương ứng khi có nội dung làm việc thực tế hoặc minh chứng được cung cấp.

## Ghi chú

Bản nhật ký ban đầu được tổng hợp từ cuộc trao đổi và các tệp, ảnh đã được cung cấp, không phải bản thu tự động toàn bộ hội thoại. Không tự suy ngày thực hiện cho từng lượt khi chưa có mốc xác nhận.

Các đợt tiếp theo được cập nhật cùng công việc phát sinh. Nếu không thể sửa log do thiếu quyền, thiếu dữ liệu hoặc xung đột, Codex phải báo rõ; thành viên vẫn cần kiểm tra trước khi commit và push.


## Bổ sung cơ chế nhật ký theo thành viên

Từ đợt thiết lập này, nhật ký chi tiết được nối thêm vào từng tệp cá nhân. Phần tổng hợp cũ phía trên được giữ nguyên như bản hồi cứu ban đầu, không đổi thời gian hoặc kết luận cũ. Các quy tắc chỉ nối thêm trong tệp rule áp dụng cho các mục ghi mới; có khác biệt về hướng dẫn cũ thì dùng quy tắc được dẫn ở đây và AGENTS.md hiện hành.

* [Quy tắc ghi nhật ký](docs/ai-logging-rules.md)
* [Mẫu đủ 7 trường theo yêu cầu môn học](docs/ai-logs/TEMPLATE.md)
* [Liêm](docs/ai-logs/liem.md)
* [Đạt](docs/ai-logs/dat.md)
* [Thành](docs/ai-logs/thanh.md)
* [Phúc](docs/ai-logs/phuc.md)
* [Hoàn](docs/ai-logs/hoan.md)
* [Châu](docs/ai-logs/chau.md)
* [Ngọc](docs/ai-logs/ngoc.md)
* [Kiệt](docs/ai-logs/kiet.md)

Tệp mỗi người là nơi ghi các phiên làm việc theo phase. Chưa có mục của một thành viên không có nghĩa người đó không dùng AI; chỉ có nghĩa chưa có hoạt động được ghi nhận và xác minh tại đây.

Phân tích ChatGPT và phản biện Gemini cần được bổ sung hồi cứu vào đúng log khi xác nhận người thực hiện, kèm prompt, kết quả, xử lý phản biện và người kiểm tra. Không tự gán các hoạt động này cho Liêm hoặc thành viên khác.
