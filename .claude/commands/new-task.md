---
description: Tạo tasks/<mã>.md cho việc phát sinh, hoặc thêm task vào ROADMAP
argument-hint: "<mô tả việc cần làm>"
---

Việc: $ARGUMENTS

1. Việc thuộc lộ trình: thêm dòng vào bảng phase tương ứng trong `docs/ROADMAP.md` (mã `PRJ-P<phase>-<VAI>-<số>`, hoặc `HW-P<phase>-<VAI>-<số>` nếu là bài tập trên lớp). Bài tập luôn đặt đầu bảng; task đồ án đầu tiên của người đó phụ thuộc task bài tập.
2. Việc phát sinh cần mô tả dài: copy `tasks/TASK-TEMPLATE.md` thành `tasks/<mã>.md` và điền đủ mọi mục.
3. Lấy thành viên phụ trách + reviewer từ bảng gói việc trong phase overview hiện tại (`phases/P*/P*-OVERVIEW.md`); vai trò xem `docs/ROLES.md`.
4. "File được sửa" chỉ gồm file thật sự cần. "Lệnh kiểm tra" lấy từ mục Lệnh trong `PROJECT.md`.
5. Task giao diện: ghi hai kích thước kiểm tra 1366/390 px và token trong `docs/DESIGN-SYSTEM.md`.
6. Ghi link FR/D/AC liên quan (`REQUIREMENTS.md`, `docs/DECISIONS.md`).
7. Thiếu thông tin để viết tiêu chí xong kiểm chứng được: hỏi một câu, không đoán.
8. Nhắc PM chạy `npm run roadmap:issues -- --repo <owner>/<repo> --apply` để tạo issue (chỉ khi được yêu cầu, không tự chạy `--apply`).

Báo lại: đường dẫn file/dòng đã thêm, thành viên phụ trách, reviewer.
