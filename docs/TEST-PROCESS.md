# Quy trình kiểm thử và review PR

Commit test nghiệm thu trước khi viết code để chốt từ đầu hành vi mà tính năng phải đáp ứng. Khi review PR, dù test đã pass, QA vẫn đối chiếu file test với phiên bản đã chốt trước khi triển khai để phát hiện những thay đổi đối với kết quả mong đợi.

## 1. Cách lấy file test nghiệm thu

1. Mở issue của task để xác định mốc Git (`<ref>`) và đường dẫn file test (`<spec>`). Xác nhận rằng đó là phiên bản test dùng để nghiệm thu.
2. Từ thư mục gốc của dự án, chuyển sang nhánh làm task và chạy `git fetch origin` để cập nhật các mốc Git từ repo nhóm.
3. Chạy `git status --short` để kiểm tra các thay đổi hiện có. Nếu file test đích có thay đổi chưa commit, hãy lưu lại phần đó trước. Lệnh checkout cập nhật cả file trong thư mục làm việc và bản của file trong vùng chờ commit.
4. Thay `<ref>` và `<spec>` bằng giá trị ghi trong issue. Khi chạy lệnh, nhập giá trị thực tế và bỏ dấu `<` và `>`.

```bash
git checkout <ref> -- <spec>
```

### Ví dụ lấy file test từ một commit cố định

```bash
git fetch origin
git checkout 68918c43410ca65d7e33e2f6f9e401e7075bef6f -- apps/api/src/app.controller.spec.ts
```

Mã commit trên dùng để minh họa. Khi làm task thực tế, dùng mốc Git và đường dẫn file test đã xác định ở bước 1. Nếu Git báo không tìm thấy mốc sau khi chạy `git fetch origin`, kiểm tra lại mốc trong issue và xác định nhánh chứa commit đó đã được fetch hay chưa.

Sau khi lấy file, chạy `git diff --cached --name-only` để xem toàn bộ file đang chờ commit. Nếu file test có thay đổi so với commit hiện tại, tạo commit riêng cho file test và kiểm tra để tránh đưa các file khác vào cùng commit. Nếu file test đã trùng với phiên bản trong commit hiện tại, bỏ qua việc tạo thêm commit cho file đó. Bắt đầu viết code sau khi QA đã duyệt phiên bản test.

## 2. Lệnh gác cổng kiểm tra tính toàn vẹn của bài test

Khi review PR, dùng mốc Git (`<ref>`) và đường dẫn file test (`<spec>`) đã xác định ở phần 1. Chạy lệnh từ thư mục gốc của dự án khi đang ở nhánh PR và thư mục làm việc sạch.

```bash
git diff --exit-code <ref> -- <spec>
```

Ngay sau khi chạy lệnh, dùng `echo $?` trên macOS hoặc Bash, hay `$LASTEXITCODE` trên PowerShell để xem mã thoát.

- **Mã `0`, không có diff:** File test khớp với phiên bản đã chốt. Ghi `git diff --exit-code: clean (0 diff)` vào nhận xét review PR.
- **Mã `1`, có diff:** Xem các dòng thay đổi, đính kèm diff vào nhận xét review và yêu cầu khôi phục file test trước khi duyệt.
- **Git báo lỗi:** Kiểm tra lại mốc Git và đường dẫn file test, rồi chạy lại.

### Tự kiểm tra trên nhánh nháp

1. Lấy file test từ mốc đã chọn theo phần 1. Chạy lệnh đối chiếu và kiểm tra mã thoát `0`.
2. Sửa một dòng, lưu file rồi chạy lại. Giữ phần diff và mã thoát `1` làm minh chứng.
3. Giữ chỉnh sửa thử ở trạng thái chưa stage. Chạy `git checkout -- <spec>` để khôi phục file về bản đã lấy, rồi đối chiếu lại để xác nhận mã thoát trở về `0`.

## 3. Checklist kiểm tra khi review Pull Request

Reviewer và QA kiểm tra các mục dưới đây trước khi Approve. Nếu một mục không áp dụng, ghi rõ lý do trong nhận xét review. Khi merge, dùng phương thức nhóm đã thống nhất. Phương thức đề xuất cho quy trình này là **Rebase and merge**, chờ PM Liêm xác nhận.

- [ ] **Toàn vẹn của test nghiệm thu.** Xác nhận đang ở đúng commit của PR, thư mục làm việc sạch và file test tồn tại ở cả nhánh PR lẫn mốc đã chốt. Chạy `git diff --exit-code <ref> -- <spec>` theo phần 2. Kết quả đạt khi lệnh không in diff và trả mã `0`. Ghi mốc Git, đường dẫn file test và mã thoát vào nhận xét review.
- [ ] **Chạy lại test.** Chạy lệnh kiểm tra phù hợp với task trên máy reviewer và ghi kết quả thực tế. Với task API có test tự động, dùng `npm test -w api -- <tên_test>` khi workspace `api` đã được cấu hình. Nếu task không có test tự động, ghi rõ lý do và kết quả kiểm tra thủ công tương ứng.
- [ ] **CI.** Kiểm tra các check bắt buộc của PR trong GitHub Actions và xác nhận chúng đều thành công. Đối chiếu kết quả lint, test và build theo pipeline của dự án. Nếu thiếu bước bắt buộc, ghi rõ để PM xác nhận trước khi duyệt.
- [ ] **Giao diện, nếu PR có thay đổi web.** Kiểm tra ảnh ở chiều rộng **1366 px** trên máy tính và **390 px** trên điện thoại. Đối chiếu giao diện với [Design System](DESIGN-SYSTEM.md) và yêu cầu của task.
- [ ] **Truy vết task và AI Usage Log.** Theo quy ước của `PRJ-P0-QA-1`, mỗi sub-issue có một commit riêng kèm dòng `Task: PRJ-...`. Mô tả PR dẫn đến đúng mục nhật ký trong `docs/ai-logs/`. Nếu PR về nhánh mặc định dùng để đóng một issue trong cùng repo, kiểm tra `Closes #<số issue>` trỏ đúng issue.
