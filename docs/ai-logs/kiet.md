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
## Bài tập Buổi 3 / KIET-20261107-HW3-001

- Thời gian ghi: 2026-11-07T17:33:30+07:00
- Mã phiên nhật ký: KIET-20261107-HW3
- Người prompt: Mã Tuấn Kiệt
- Loại mục: Hoạt động và kiểm tra
- Liên quan: HW-P1-DO-1.1 — issue #516

### Công cụ

ChatGPT, VS Code, Git Bash và trình duyệt trên máy Kiệt.

### Mục đích

Chép nguyên session2 sang session3 để làm nền cho bài tập Buổi 3.
Giữ nguyên session2; kiểm tra bốn trang trong session3 không lỗi ảnh.

### Prompt

Yêu cầu thực tế của Kiệt:
- Kiệt cung cấp sub-issue HW-P1-DO-1.1 với yêu cầu:
  chép nguyên session2/ sang session3/ gồm bốn trang, css/ và images/;
  mở bốn trang không lỗi ảnh và session2/ không đổi.
- Kiệt hỏi vì sao Terminal vẫn hiển thị nhánh prj/p0-do-1,
  sau đó yêu cầu tiếp tục.

Các câu hướng dẫn ChatGPT đã gửi


1. “Trước tiên cần giữ lại phần 1.7 đồ án đang dở,
   tránh mang sang nhánh bài tập.”

2. “Vì git stash chỉ cất thay đổi, không chuyển nhánh.”

3. “Giờ chạy từng lệnh, chờ xong mới chạy lệnh tiếp.”

4. “Nếu session3 đã tồn tại, gửi kết quả cho tôi trước,
   tránh chép lồng hoặc ghi đè.”

5. “Không có đầu ra nghĩa là nội dung hai thư mục giống nhau.”

6. “Kiểm tra ảnh hiển thị đầy đủ và thanh địa chỉ vẫn nằm
   trong session3 khi chuyển trang.”

Các lệnh chính ChatGPT đã hướng dẫn:
- git status --short
- git branch --show-current
- git stash push -u -m "Pause PRJ-P0-DO-1.7 before homework"
- git switch main
- git pull --ff-only origin main
- git switch -c hw/p1-do-1
- ls -ld session2 session3
- cp -R session2 session3
- diff -qr session2 session3
- git diff --name-only HEAD -- session2

ChatGPT hướng dẫn mở index.html, products.html,
product-detail.html và about.html trong session3 để kiểm tra.

### Kết quả đề xuất

Đã cất các thay đổi đang dở của đồ án bằng Git stash.
Chuyển về main, cập nhật từ origin/main và tạo nhánh hw/p1-do-1.
Xác nhận session3 chưa tồn tại trước khi chép.
Chép toàn bộ session2 sang session3 bằng cp -R.
Không chủ động sửa nội dung HTML, CSS hoặc ảnh trong bước này.

### Phản biện

Kiệt hỏi lại vì sao tên nhánh vẫn là prj/p0-do-1 sau khi stash.
ChatGPT giải thích stash không chuyển nhánh, rồi hướng dẫn
chuyển sang nhánh bài tập đúng yêu cầu sub-issue.

Kiểm tra sự tồn tại của session3 trước khi chép để tránh
chép lồng thư mục hoặc ghi đè nội dung hiện có.

Phân biệt kiểm tra bằng diff với kiểm tra trên trình duyệt:
hai thư mục giống nhau chưa tự chứng minh ảnh hiển thị đúng.

### Quyết định của nhóm

Kiệt yêu cầu tạm dừng đồ án ở bước 1.7 để chờ Minh gửi public,
chuyển sang bài tập Buổi 3.

Theo thứ tự Kiệt cung cấp: làm bước 1 và 2 trước,
chờ Liêm hoàn thành phần phụ thuộc rồi mới làm bước 3 và 4.
Chưa có xác nhận review hoặc merge bước 1.1.

### Người kiểm tra

Kiệt trực tiếp chạy lệnh và kiểm tra trên máy.
ChatGPT đối chiếu ảnh Terminal.
Sau hướng dẫn kiểm tra bốn trang và session2,
Kiệt phản hồi “đã oke”.

### Kiểm tra và minh chứng

- Ảnh Terminal xác nhận main đã cập nhật và nhánh hw/p1-do-1
  được tạo thành công.
- Trước khi chép: session2 tồn tại, session3 chưa tồn tại.
- cp -R session2 session3: không báo lỗi.
- diff -qr session2 session3: không có đầu ra.
- Kiệt xác nhận đã kiểm tra ổn sau hướng dẫn mở bốn trang
  và kiểm tra session2 không thay đổi.
- Chưa nhận ảnh riêng của từng trang hoặc đầu ra riêng
  của lệnh git diff --name-only HEAD -- session2.
- Chưa xác nhận commit/push của bước HW-P1-DO-1.1.
## Bài tập Buổi 3 / KIET-20261107-HW3-002

- Thời gian ghi: <thời gian thực tế, kèm +07:00>
- Mã phiên nhật ký: KIET-20261107-HW3
- Người prompt: Mã Tuấn Kiệt
- Loại mục: Hoạt động và kiểm tra
- Liên quan: HW-P1-DO-1.2 — issue #517

### Công cụ
ChatGPT, VS Code, Git Bash và Chrome DevTools.

### Mục đích
Tạo khung JavaScript dùng chung và gắn script vào bốn trang session3.

### Prompt
Kiệt cung cấp sub-issue #517, lộ trình cá nhân và BUOI3-GUIDE,
yêu cầu hướng dẫn tiếp tục bước 1.2.

Các hướng dẫn chính của ChatGPT:
- Tạo products.js và năm file module theo đúng phân công.
- Mỗi file chỉ có một dòng chú thích chủ sở hữu.
- Đặt script sau footer, trước thẻ đóng body.
- Nạp dữ liệu trước, logic giỏ hàng tiếp theo, module trang sau cùng;
  render-products đứng trước search-filter.
- Kiểm tra Network, Console và vị trí file bằng lệnh find.
- Không viết chức năng thay các thành viên khác.

### Kết quả đề xuất
Tạo products.js, cart.js, render-products.js, search-filter.js,
product-detail.js và cart-page.js.
Gắn script có defer vào index.html, products.html,
product-detail.html và about.html trong session3.

### Phản biện
Kiệt hỏi việc tạo file của các thành viên khác có thuộc task mình không.
Đã đối chiếu sub-issue: Kiệt tạo khung, người sở hữu viết chức năng.

Console ban đầu báo ERR_FILE_NOT_FOUND; lệnh find chưa liệt kê file JS.
Sau khi tạo và lưu file đúng chỗ, Kiệt xác nhận các trang không báo lỗi.
Khi VS Code báo products.js đã tồn tại, hướng dẫn mở file hiện có,
không tạo tên khác hoặc ghi đè nội dung đã có.

### Quyết định của nhóm
Thực hiện đúng phạm vi tạo khung và gắn script của sub-issue #517.
Chưa có phản hồi review bước này của PM Liêm.

### Người kiểm tra
Kiệt trực tiếp kiểm tra trình duyệt và cung cấp kết quả Terminal.
ChatGPT đối chiếu danh sách file và phạm vi thay đổi.

### Kiểm tra và minh chứng
- find liệt kê đủ sáu file JS tại đúng đường dẫn.
- Kiệt xác nhận bốn trang không báo lỗi.
- git status: bốn file HTML session3 được sửa và js/ được tạo.
- git diff --name-only HEAD -- session2: không có đầu ra.
- Chưa xác nhận commit/push bước 1.2.