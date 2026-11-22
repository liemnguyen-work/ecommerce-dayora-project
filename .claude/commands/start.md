---
description: Mở phiên làm việc: xác nhận tên, bước đang làm, file được sửa
argument-hint: <tên> <bước, ví dụ "Bước 5">
---
Mình là thành viên DAYORA, thông tin: $ARGUMENTS

1. Đọc `AGENTS.md`, `session2/AGENTS.md`, `docs/ai-logs/ai-logging-rules.md` và mục của bước này trong `docs/SESSION2-GUIDE.md`.
2. Nếu chưa rõ tên hoặc bước, hỏi lại một câu, không đoán.
3. Trả lời ngắn:
   - Bước này mình phải làm gì (checklist trong guide).
   - File và khu CSS mình được sửa; file không được đụng.
   - Mình phải chờ ai xong trước (mục 3 của guide) và hiện trạng file đó trong repo.
   - Dấu hiệu "xong" của bước.
4. Chạy `git status` và `git branch --show-current`. Nếu đang ở `main`, nhắc tạo nhánh `b2/<ten-viec>` trước khi sửa.
5. Chưa viết code. Hỏi mình muốn bắt đầu từ mục nào của checklist.
