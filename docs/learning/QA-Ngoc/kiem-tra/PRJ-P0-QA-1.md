# PRJ-P0-QA-1.6 — Kiểm tra kiến thức

## 1. REBUILD — Quy trình một task XL, bước 3 và 8

Bước 3 thì giúp chốt bài test nghiệm thu trước khi viết code.
Bước 8 thì giúp reviewer kiểm tra lại PR dựa trên bài test đã chốt. Nếu bỏ qua, PR có thể được duyệt dù bài test đã bị sửa để.

## 2. TEST-PROCESS.md — Phần 1

Phần này hướng dẫn lấy file test từ commit đã chốt. Nếu mình lấy theo đầu nhánh thì có thể lấy nhầm bản test mới hơn vì nhánh vẫn cập nhật. Khi đó thì kết quả chạy test có thể không còn phản ánh đúng tiêu chí nghiệm thu ban đầu.

## 3. TEST-PROCESS.md — Phần 2

Dùng git diff --exit-code để đối chiếu file test trong PR với bản đã chốt. Nếu mình bỏ bước này thì reviewer có thể bỏ sót một điều kiện kiểm tra đã bị đổi hoặc xóa, dù bài test vẫn chạy xanh. Rồi từ đó dẫn đến việc kiểm thử sai.

## 4. TEST-PROCESS.md — Phần 3

Checklist này giúp reviewer kiểm tra đúng commit của PR, đối chiếu đúng file test và tự chạy lại kiểm tra trước khi duyệt. Nếu bỏ qua checklist này thì reviewer có thể chạy test trên commit cũ rồi dùng kết quả đó để duyệt bản mới.

## 5. Checklist trong mẫu PR

Đưa checklist vào mẫu để khi mở PR thì người làm và reviewer đều thấy ngay những mục cần kiểm tra. Nếu bỏ mẫu này thì người review dễ quên đối chiếu file test hoặc ghi lại kết quả kiểm tra.

## 6. Chỗ khó nhất khi làm task

Lúc đầu chạy lệnh merge với tùy chọn tự stash và Git báo fatal: stash failed. Sau đó chạy lại với --no-autostash, xử lý xung đột ở mẫu PR bằng cách giữ nội dung trên main và ghép các mục QA vào.
