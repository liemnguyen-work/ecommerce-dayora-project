# Nhật ký sử dụng AI của Kiệt

Chỉ ghi hoạt động thực tế theo [quy tắc chung](ai-logging-rules.md) và [mẫu mục log](TEMPLATE.md). Mục đã ghi chỉ được bổ sung bằng mục mới, không sửa hoặc xóa.

## P0 / KIET-20261102-8D53F2A1-001

* Thời gian ghi: 2026-11-02T21:33:14+07:00
* Thời gian thực hiện: 2026-11-02, trong phiên trao đổi này
* Mã phiên nhật ký: KIET-20261102-8D53F2A1
* Người prompt: Kiệt
* Loại mục: Hoạt động
* Liên quan: Không có

### Công cụ

Codex.

### Mục đích

Nắm ngữ cảnh repo và nhiệm vụ của Kiệt; bổ sung quy tắc làm việc và ghi nhật ký AI khi Kiệt làm bài, trao đổi.

### Prompt

Tóm lược: Người dùng xác nhận mình là Kiệt, yêu cầu đọc folder, cập nhật ngữ cảnh, thêm rule và ghi AI usage log cho các công việc và trao đổi của mình.

### Kết quả đề xuất

Đọc cấu trúc repo, hướng dẫn Buổi 2, quy tắc log, kế hoạch và tài liệu vai trò Kiệt. Bổ sung mục hướng dẫn khi Kiệt làm việc với AI vào AGENTS.md; ghi hoạt động này trong log Kiệt. 

### Phản biện

Chưa có phản biện của Kiệt hoặc nhóm được ghi nhận.

### Quyết định của nhóm

Chưa có quyết định chung mới được xác nhận; Kiệt yêu cầu thêm hướng dẫn và ghi log cho mình.

### Người kiểm tra

Codex kiểm tra diff; chờ Kiệt rà soát nội dung.

### Kiểm tra và minh chứng

Đối chiếu AGENTS.md, PROJECT.md, docs/SESSION2-GUIDE.md, session2/AGENTS.md, tài liệu P0 của Kiệt và quy tắc log. Bản repo hiện tại có session2/index.html và session2/css/style.css chưa theo dõi; các trang còn lại chưa thấy trong session2. Không kiểm chứng tiến độ ở kho hay máy khác, không chạy kiểm thử ứng dụng vì chỉ sửa tài liệu. Tệp thay đổi trong công việc này: AGENTS.md, docs/ai-logs/kiet.md.
## Bài tập Buổi 2 / KIET-20261102-8D53F2A1-002

* Thời gian ghi: 2026-11-02T21:34:01+07:00
* Thời gian thực hiện: 2026-11-02, trong phiên trao đổi này
* Mã phiên nhật ký: KIET-20261102-8D53F2A1
* Người prompt: Kiệt
* Loại mục: Hoạt động
* Liên quan: KIET-20261102-8D53F2A1-001

### Công cụ

Codex.

### Mục đích

Học lần lượt cây thư mục, HTML tối thiểu, đường dẫn tương đối, Git và PR cho bài Buổi 2; tự trả lời sau mỗi khái niệm.

### Prompt

Tóm lược: Kiệt yêu cầu ví dụ sát phần DO, giải thích lần lượt, hỏi một câu sau mỗi khái niệm và chờ trả lời; chỉ dùng HTML5/CSS3, không viết toàn bộ bài thay.

### Kết quả đề xuất

Đối chiếu cây thư mục dự kiến với hướng dẫn và bản hiện tại; bắt đầu giải thích cây thư mục và đặt một câu hỏi. Các chủ đề sau chờ trao đổi tiếp; chưa sửa mã ứng dụng.

### Phản biện

Chưa có câu trả lời hoặc phản biện của Kiệt được ghi nhận tại thời điểm ghi.

### Quyết định của nhóm

Chưa có quyết định chung mới.

### Người kiểm tra

Chờ Kiệt xem và phản hồi nội dung hướng dẫn.

### Kiểm tra và minh chứng

Đọc docs/SESSION2-GUIDE.md và kiểm tra danh sách session2; chưa xác minh tiến độ trên kho hoặc máy khác. Chỉ nối docs/ai-logs/kiet.md; không chạy kiểm thử ứng dụng.
## Bài tập Buổi 2 / KIET-20261102-8D53F2A1-003

* Thời gian ghi: 2026-11-02T21:35:35+07:00
* Thời gian thực hiện: 2026-11-02, trong phiên trao đổi này
* Mã phiên nhật ký: KIET-20261102-8D53F2A1
* Người prompt: Kiệt
* Loại mục: Kiểm tra
* Liên quan: KIET-20261102-8D53F2A1-002; HW-P0-DO-1

### Công cụ

Codex.

### Mục đích

Kiểm tra cấu trúc session2, HTML tối thiểu, CSS, ảnh và quy ước đường dẫn để hướng dẫn Kiệt tự làm.

### Prompt

Tóm lược: Kiệt yêu cầu kiểm tra HW-P0-DO-1, giải thích từng điểm, không xóa tài nguyên và chưa viết code thay; chỉ dùng HTML5/CSS3, không JavaScript hoặc framework.

### Kết quả đề xuất

Đối chiếu hướng dẫn B2 với bản repo: chỉ có index.html trong bốn trang, CSS đã có tám khu và nội dung; chưa có session2/images và session2/docs/plan.md. Các ảnh được tham chiếu từ index hiện tồn tại trong assets/images; ba trang đích chưa có. Đề xuất Kiệt giữ tệp hiện có, tạo các phần còn thiếu và phối hợp khi đổi đường dẫn ảnh. Không sửa mã hoặc xóa tài nguyên.

### Phản biện

Chưa có phản hồi hoặc phản biện của Kiệt được ghi nhận.

### Quyết định của nhóm

Chưa có quyết định chung mới.

### Người kiểm tra

Codex kiểm tra tĩnh các tệp; chờ Kiệt xem và tự kiểm tra trên trình duyệt.

### Kiểm tra và minh chứng

Đọc docs/SESSION2-GUIDE.md, session2/AGENTS.md, index.html và style.css; kiểm tra các đường dẫn href/src bằng PowerShell và tìm script, thuộc tính sự kiện, bootstrap, tailwind và đường dẫn tuyệt đối trong HTML/CSS hiện có, không có kết quả tìm. Chưa chạy check-session2.py vì không tìm thấy python/py; chưa kiểm trình duyệt hoặc kiểm các trang chưa tạo. Chỉ nối docs/ai-logs/kiet.md.
## Bài tập Buổi 2 / KIET-20261102-8D53F2A1-004

* Thời gian ghi: 2026-11-02T21:37:46+07:00
* Thời gian thực hiện: 2026-11-02, trong phiên trao đổi này
* Mã phiên nhật ký: KIET-20261102-8D53F2A1
* Người prompt: Kiệt
* Loại mục: Hoạt động
* Liên quan: KIET-20261102-8D53F2A1-003; HW-P0-DO-1

### Công cụ

Codex.

### Mục đích

Kiệt yêu cầu phát triển phần khung theo task để mình review.

### Prompt

Nguyên văn: “Tôi là kiệt, Sau khi đọc xong và hiểu mã bài tập này bạn hãy phát triển code dựa theo issue này sau khi xong tôi sẽ review”.

### Kết quả đề xuất

Tạo khung HTML tối thiểu cho products.html, product-detail.html và about.html; sao chép 12 ảnh hiện có vào session2/images. Giữ nguyên index.html và CSS; ba trang mới chưa có nội dung, header hoặc footer. Không xóa tài nguyên. Chưa xem được nội dung issue GitHub riêng, dựa vào ROADMAP và SESSION2-GUIDE trong repo.

### Phản biện

Chưa có phản biện hoặc review của Kiệt được ghi nhận.

### Quyết định của nhóm

Chưa có quyết định chung mới; Kiệt yêu cầu viết khung để review.

### Người kiểm tra

Codex kiểm tra tĩnh; chờ Kiệt review và kiểm trên trình duyệt.

### Kiểm tra và minh chứng

Kiểm bằng PowerShell bốn tệp có doctype, lang, charset, viewport, title và liên kết CSS; các đường dẫn href/src hiện có trỏ tới tệp tồn tại. So SHA-256 cho thấy 12 ảnh sao chép khớp bản gốc. Tìm script, thuộc tính sự kiện, bootstrap, tailwind, đường dẫn tuyệt đối trong HTML/CSS không thấy kết quả. git diff --check không báo lỗi. Chưa chạy check-session2.py do không tìm thấy python/py và chưa kiểm trình duyệt; session2/docs/plan.md chưa có, trang chủ vẫn dùng ảnh trong assets/images.
## Bài tập Buổi 2 / KIET-20261102-8D53F2A1-005

* Thời gian ghi: 2026-11-02T21:39:11+07:00
* Thời gian thực hiện: 2026-11-02, trong phiên trao đổi này
* Mã phiên nhật ký: KIET-20261102-8D53F2A1
* Người prompt: Kiệt
* Loại mục: Kiểm tra
* Liên quan: KIET-20261102-8D53F2A1-004; HW-P0-DO-1

### Công cụ

Codex.

### Mục đích

Rà soát phạm vi, HTML/CSS, liên kết, ảnh và các bước cần tự kiểm responsive, focus trước khi review.

### Prompt

Tóm lược: Kiệt yêu cầu đọc issue và git diff, chỉ ra ngoài phạm vi, lỗi và điểm cần kiểm, liệt kê bước tự thử; không bịa kết quả.

### Kết quả đề xuất

Đọc diff tracked, status và các tệp chưa theo dõi; đối chiếu ROADMAP, SESSION2-GUIDE và script kiểm. Nêu ba trang chỉ là khung, ảnh dùng bản gốc, thiếu biến, media và CSS focus; script hiện coi alt rỗng là lỗi dù ảnh trang trí có thể dùng alt rỗng. Chỉ ra thay đổi và rule chung cần tách khỏi PR của Kiệt; đề xuất kiểm thử thủ công. Không sửa mã ứng dụng.

### Phản biện

Chưa có phản hồi review của Kiệt được ghi nhận.

### Quyết định của nhóm

Chưa có quyết định chung mới.

### Người kiểm tra

Codex đọc mã và diff; chờ Kiệt tự kiểm trên trình duyệt và review.

### Kiểm tra và minh chứng

Đọc .claude/skills/review-session2/SKILL.md, ROADMAP, SESSION2-GUIDE, tools/check-session2.py, tệp HTML/CSS và git status/diff; git diff --check không báo lỗi. Chưa chạy script Python hoặc kiểm trình duyệt. Không truy cập được issue GitHub riêng trong phiên trước và chưa xác minh trực tiếp nội dung issue; không khẳng định pass CI. Chỉ nối docs/ai-logs/kiet.md.