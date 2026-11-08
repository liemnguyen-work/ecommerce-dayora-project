## Thông tin Task & Sub-issue

- Mã task: `PRJ-...` hoặc `HW-...`
- Người thực hiện: `@username`
- Link nhật ký AI: <!-- Dán link đến đúng mục trong docs/ai-logs/ -->

Closes #...
<!-- Với PR vào main dùng để đóng issue cùng repo, thay ... bằng số issue thực tế. Xóa dòng Closes nếu không áp dụng. -->

## Đã làm

<!-- Tóm tắt thay đổi và phạm vi PR. Với Buổi 2, ghi rõ bước trong docs/SESSION2-GUIDE.md. -->

## Tự kiểm trước khi xin review

Nếu một mục không áp dụng, ghi lý do và cách kiểm tra thay thế nếu có.

- [ ] Đã chạy test phù hợp trên máy và ghi kết quả. Với API có test tự động và workspace `api` đã được cấu hình, dùng `npm test -w api -- <spec>`. Nếu kiểm tra thủ công, ghi các bước và kết quả.
- [ ] Đã xác nhận đang ở đúng commit sẽ đưa lên PR, thư mục làm việc sạch và file test tồn tại ở cả commit đó lẫn mốc đã chốt. Đã chạy `git diff --exit-code <ref> -- <spec>` theo Phần 2 của `docs/TEST-PROCESS.md`, dùng mốc test đã chốt làm `<ref>`. Lệnh không in diff và trả mã `0`.
- [ ] Đã chạy `npm run lint` và `npm run build` nếu dự án có cấu hình các lệnh này. Đã ghi kết quả của các lệnh đã chạy.
- [ ] Nếu PR thay đổi giao diện web, đã đính kèm ảnh ở chiều rộng **1366 px** và **390 px**.
- [ ] Đã điền mã task và link đến đúng mục nhật ký AI. Với `PRJ-P0-QA-1`, mỗi sub-issue có một commit riêng kèm dòng `Task: PRJ-...`.

### Chỉ áp dụng cho Buổi 2

- [ ] Chỉ sửa file và phần CSS được phân công trong mục 2 của `docs/SESSION2-GUIDE.md`.
- [ ] Đã chạy `python tools/check-session2.py session2` trên máy và không thấy `[LOI]`.
- [ ] Đã thử các link trên trang đã sửa và kiểm tra ảnh hiển thị.

## Ảnh

<!-- Đính ảnh 1366 px và 390 px nếu PR thay đổi giao diện web. -->

## Đánh giá của Reviewer / QA

Đánh dấu từng mục sau khi kiểm tra. Nếu một mục không áp dụng, ghi lý do trong nhận xét review.

- [ ] **Toàn vẹn test nghiệm thu.** Đã kiểm tra đúng commit PR, thư mục làm việc sạch và file test tồn tại ở cả commit đó lẫn mốc đã chốt. Đã chạy lệnh đối chiếu theo Phần 2 và ghi mốc Git, đường dẫn file test cùng mã thoát `0` vào review.
- [ ] **Chạy lại test.** Đã chạy lại kiểm tra phù hợp trên máy reviewer và ghi kết quả thực tế.
- [ ] **CI.** Đã đối chiếu kết quả lint, test và build trên GitHub Actions với pipeline của dự án. Chỉ đánh dấu đạt khi tất cả check bắt buộc thành công. Nếu check bắt buộc bị thiếu hoặc chưa thành công, để trống ô này, ghi rõ tình trạng trong review và báo PM trước khi duyệt.
- [ ] **Giao diện.** Nếu PR thay đổi web, đã đối chiếu ảnh 1366 px và 390 px với `docs/DESIGN-SYSTEM.md` và yêu cầu của task.
- [ ] **Truy vết task và AI Usage Log.** Đã kiểm tra mã task và link đến đúng mục nhật ký AI. Với `PRJ-P0-QA-1`, đã kiểm tra mỗi sub-issue có một commit riêng kèm dòng `Task: PRJ-...`. Nếu PR vào `main` để đóng issue cùng repo, đã xác nhận `Closes #...` trỏ đúng issue.
- [ ] **Kết luận review.** Đồng ý merge vào `main` theo phương thức nhóm đã chốt.

### Reviewer kiểm thêm cho Buổi 2

- [ ] Sau khi PR được mở và CI chạy xong, đã xác nhận check `check-session2` thành công.
- [ ] Đã mở trang trên máy reviewer và thử các link.
- [ ] Đã kiểm tra ở chiều rộng 1366 px, 768 px và 390 px, không có tràn ngang.
- [ ] Đã hỏi người thực hiện giải thích một thuộc tính CSS trong PR.
