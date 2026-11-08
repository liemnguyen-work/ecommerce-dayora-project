## Mã Task / Sub-issue

- Mã task: `PRJ-...` hoặc `HW-...`
- Link issue: <!-- Điền nếu issue thuộc cùng repo. -->
- Người thực hiện: `@username`
- Link nhật ký AI: <!-- Dán link đến đúng mục trong docs/ai-logs/ hoặc nhật ký của bài tập tương ứng. -->

Closes #...
<!-- Với PR vào main dùng để đóng issue cùng repo, thay ... bằng số issue thực tế. Xóa dòng Closes nếu không áp dụng. -->

## Tóm tắt thay đổi

<!-- Tóm tắt thay đổi và phạm vi PR. Với Buổi 2, ghi rõ bước trong docs/SESSION2-GUIDE.md. -->

## Đã chạy kiểm tra

<!-- Ghi thao tác hoặc lệnh đã chạy và kết quả thực tế. Nếu một mục không áp dụng, ghi lý do và cách kiểm tra thay thế nếu có. -->

| Kiểm tra | Kết quả |
| --- | --- |
| | |

## Checklist tự kiểm tra

- [ ] Chỉ sửa file thuộc phạm vi được phân công.
- [ ] Đã chạy các kiểm tra phù hợp và ghi kết quả ở trên. Với API có test tự động và workspace `api` đã được cấu hình, dùng `npm test -w api -- <spec>`. Nếu kiểm tra thủ công, ghi các bước và kết quả.
- [ ] Với task có test nghiệm thu, đã kiểm tra đúng commit sẽ đưa lên PR, thư mục làm việc sạch và file test có ở cả commit đó lẫn mốc đã chốt. Đã chạy `git diff --exit-code <ref> -- <spec>` theo Phần 2 của `docs/TEST-PROCESS.md`. Lệnh không in diff và trả mã `0`.
- [ ] Đã chạy `npm run lint` và `npm run build` nếu dự án có cấu hình các lệnh này. Đã ghi kết quả ở trên.
- [ ] Với thay đổi giao diện, Console không có lỗi đỏ, Network không báo lỗi 404 cho CSS, JS hoặc ảnh, các liên kết mở đúng trang và ảnh hiển thị đúng.
- [ ] Với thay đổi giao diện, đã đính kèm ảnh ở chiều rộng **1366 px** và **390 px**.
- [ ] Đã điền mã task, cập nhật và dẫn link đến đúng mục nhật ký AI. Nhật ký ghi rõ đề xuất nào được dùng, sửa hoặc bỏ.
- [ ] Với `PRJ-P0-QA-1`, mỗi sub-issue có một commit riêng kèm dòng `Task: PRJ-...`.

### BTVN 3 – nếu áp dụng

- [ ] Không thay đổi `session2/`.
- [ ] Đã kiểm tra các trang liên quan trong `session3/`.
- [ ] Không dùng thư viện hoặc `onclick` trong HTML.
- [ ] Đã cập nhật `session3/docs/ai-usage.md`.

### Buổi 2 – nếu áp dụng

- [ ] Chỉ sửa file và phần CSS được phân công trong mục 2 của `docs/SESSION2-GUIDE.md`.
- [ ] Đã chạy `python tools/check-session2.py session2` trên máy và không thấy `[LOI]`.

## Ảnh chụp màn hình minh chứng

- Desktop 1366 px:
- Mobile 390 px:

<!-- Nếu không thay đổi giao diện, ghi “Không áp dụng” và lý do. -->

## Reviewer / QA kiểm tra

Đánh dấu từng mục sau khi kiểm tra. Nếu một mục không áp dụng, ghi lý do trong nhận xét review.

- [ ] **Phạm vi.** Thay đổi đúng phạm vi task.
- [ ] **Toàn vẹn test nghiệm thu.** Đã kiểm tra đúng commit PR, thư mục làm việc sạch và file test có ở cả commit đó lẫn mốc đã chốt. Đã chạy lệnh đối chiếu theo Phần 2 và ghi mốc Git, đường dẫn file test cùng mã thoát `0` vào review.
- [ ] **Chạy lại kiểm tra.** Đã chạy kiểm tra phù hợp trên máy reviewer, thử lại chức năng và liên kết liên quan, rồi ghi kết quả thực tế.
- [ ] **CI.** Đã đối chiếu kết quả lint, test và build trên GitHub Actions với pipeline của dự án. Chỉ đánh dấu đạt khi tất cả check bắt buộc thành công. Nếu thiếu check hoặc check chưa thành công, để trống ô này, ghi rõ tình trạng trong review và báo PM trước khi duyệt.
- [ ] **Giao diện.** Nếu PR thay đổi web, đã kiểm tra ở 1366 px, 768 px và 390 px, không có tràn ngang. Đã đối chiếu ảnh 1366 px và 390 px với `docs/DESIGN-SYSTEM.md` và yêu cầu của task.
- [ ] **Truy vết task và nhật ký AI.** Đã kiểm tra mã task và link đến đúng mục nhật ký AI. Với `PRJ-P0-QA-1`, đã kiểm tra mỗi sub-issue có một commit riêng kèm dòng `Task: PRJ-...`. Nếu PR vào `main` để đóng issue cùng repo, đã xác nhận `Closes #...` trỏ đúng issue.
- [ ] **Giải thích thay đổi.** Đã hỏi người thực hiện hai câu về phần đã làm. Với Buổi 2, một câu yêu cầu giải thích một thuộc tính CSS trong PR.
- [ ] **Kết luận review.** Đồng ý merge vào `main` theo phương thức nhóm đã chốt.

### Reviewer kiểm thêm cho Buổi 2

- [ ] Sau khi PR được mở và CI chạy xong, đã xác nhận check `check-session2` thành công.