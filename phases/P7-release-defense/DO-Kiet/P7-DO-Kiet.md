---
tags: [phase/P7, role/DO, guide]
member: Kiệt
role: DO
phase: P7
dates: "16/12 – 22/12/2026"
---
# P7 · DO Kiệt — DevOps

> [!NOTE] Phase: [P7-OVERVIEW](../P7-OVERVIEW.md) (16/12 – 22/12/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/kiet.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Đóng băng code, deploy ổn định, hoàn thiện báo cáo Word theo cấu trúc môn học, phụ lục đủ, slide, video dự phòng, tập dượt bảo vệ và sửa code trực tiếp.

## 1. Việc của bạn trong phase này
- [ ] Code freeze: tag `v1.0`, chỉ sửa lỗi chặn
- [ ] SETUP.md cuối + tài khoản demo (admin/khách) ghi trong phụ lục
- [ ] Đảm bảo link web/API/GitHub/Drive sống tới khi có điểm (gia hạn, chống ngủ)
- [ ] Video demo dự phòng bản cuối; checklist demo 30 phút trước bảo vệ

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 2. File/thư mục bạn phụ trách
- `docs/SETUP.md`
- `docs/RUNBOOK.md`
- `docs/report/APPENDIX-LINKS.md`

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Quản lý phát hành | Bản chấm ổn định | [Tài liệu](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases) | Tạo release v1.0 |
| 2 | Checklist vận hành | Không sự cố khi bảo vệ | [Tài liệu](https://www.atlassian.com/incident-management/handbook) | Viết checklist 10 bước |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Kiệt, vai trò DevOps trong dự án DAYORA
(website bán đồ picnic trong ngày, đồ án môn Phát triển ứng dụng TMĐT - UEH).
Stack: React + TypeScript + Tailwind (frontend), NestJS + Prisma + PostgreSQL Supabase (backend), VNPay Sandbox.
Tôi chưa có nền tảng lập trình. Phase hiện tại: P7 - Đóng gói, báo cáo và bảo vệ.
Việc của tôi: <dán mục 1 ở trên>.
Quy tắc: giải thích đơn giản, có ví dụ đời thường; mỗi lần chỉ dạy một ý; hỏi lại để kiểm tra tôi hiểu;
không viết code thay tôi khi tôi chưa yêu cầu; nếu không chắc thì nói không chắc.
Bắt đầu bằng việc hỏi tôi đã biết gì về <chủ đề đầu tiên ở mục 3>.
```

### 2. Hiểu code trước khi commit hoặc review
```text
Đây là diff/đoạn code của task <mã task> trong dự án DAYORA:
<dán diff hoặc file>
1) Tóm tắt code làm gì trong 3 câu.
2) Giải thích từng khối, như cho người mới.
3) Chỉ ra 2 chỗ có thể sai hoặc thiếu kiểm tra.
4) Hỏi tôi 3 câu; chỉ khi tôi trả lời đúng mới coi như tôi đã hiểu.
```

### 3. Checklist ngày bảo vệ
```text
Viết checklist 30 phút trước buổi bảo vệ online (MS Teams) cho DAYORA: đánh thức Render, kiểm tra đăng nhập demo, VNPay sandbox, dữ liệu demo, mở sẵn VS Code + repo, camera/mic, video dự phòng.
```

### 4. Phụ lục link
```text
Tạo bảng phụ lục: GitHub, web, API health, Drive, tài khoản demo (không ghi mật khẩu thật nếu repo public — để trong file nộp riêng), hướng dẫn chạy.
```

### 5. Luyện bảo vệ (cuối phase)
```text
Đóng vai giảng viên chấm đồ án. Dựa trên phần tôi phụ trách ở phase P7 (<dán mục 1 và file ở mục 2>),
hỏi tôi 5 câu, mỗi câu tôi trả lời trong 20 giây. Sau đó ra 1 yêu cầu sửa code đơn giản
và 1 yêu cầu nâng cao đúng kiểu GV (thêm field, thêm filter, đổi business rule, sửa lỗi Service...).
Chấm và chỉ ra chỗ tôi cần học thêm.
```

### 6. Ghi nhật ký AI sau buổi làm việc
```text
Dựa trên cuộc trò chuyện này, soạn một mục nhật ký theo mẫu docs/ai-logs/TEMPLATE.md của nhóm.
Chỉ dùng thông tin có trong cuộc trò chuyện. Không tự điền Phản biện, Quyết định của nhóm, Người kiểm tra: để trống ghi "<tự điền>".
<dán mẫu từ docs/ai-logs/TEMPLATE.md>
```
Sau đó **tự viết** các phần còn trống bằng lời của bạn và **nối thêm vào cuối** log cá nhân theo [quy tắc ghi log](../../../docs/ai-logs/ai-logging-rules.md). Không sửa mục cũ.

## 5. Minh chứng cần có trước khi kết thúc phase
- [ ] Release v1.0
- [ ] APPENDIX-LINKS.md
- [ ] Video dự phòng cuối
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/kiet.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Nếu Render sập lúc bảo vệ, bạn làm gì trong 1 phút?
2. Tài khoản demo được cấp thế nào để không lộ mật khẩu?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
