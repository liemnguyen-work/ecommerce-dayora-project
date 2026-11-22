---
description: Review diff của một task hoặc PR, ghi reviews/<mã>.md
argument-hint: "<mã task hoặc số PR> [base..head]"
---

Đối tượng: $ARGUMENTS

1. Đọc tiêu chí xong của task: issue tương ứng, mục 6 trong file LP của người phụ trách (`docs/learning/<VAI>-<Tên>/`), hoặc `tasks/<mã>.md` nếu có. Đọc mô tả PR (lệnh đã chạy, ảnh).
2. Đọc `git diff` theo khoảng commit được nêu; không nêu thì so với `main`.
3. Kiểm tra:
   - Có sửa file ngoài phạm vi task không.
   - Từng tiêu chí xong có bằng chứng không.
   - Test viết trước có bị nới lỏng sau khi QA duyệt không (`git log -p -- <file test>`).
   - Tiền/giá/tổng có tính ở server không; API khách có kiểm tra chủ sở hữu; API admin có guard.
   - Bảo mật, mất dữ liệu, thao tác không hoàn tác được: tự kiểm tra thêm.
   - Task UI: chụp 1366 px và 390 px.
   - Bài tập Buổi 2: `python tools/check-session2.py session2`, đúng phạm vi trong `session2/AGENTS.md`.
4. Chạy lệnh kiểm tra trong task đúng một lần.
5. Ghi `reviews/<mã>.md` theo `reviews/REVIEW-TEMPLATE.md`, gán owner (thành viên) cho từng lỗi.

Không tự sửa code. Báo lại: PASS/FAIL và số lỗi theo mức. Reviewer là thành viên quyết định duyệt PR, không phải AI.
