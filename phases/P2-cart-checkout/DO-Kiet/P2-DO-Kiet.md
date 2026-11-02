---
tags: [phase/P2, role/DO, guide]
member: Kiệt
role: DO
phase: P2
dates: "11/11 – 17/11/2026"
---
# P2 · DO Kiệt — DevOps

> [!NOTE] Phase: [P2-OVERVIEW](../P2-OVERVIEW.md) (11/11 – 17/11/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/kiet.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Giỏ hàng gắn tài khoản; voucher kiểm đủ 6 điều kiện; phí giao theo bảng demo; checkout preview → xác nhận thay đổi → tạo đơn có snapshot và giữ tồn.

## 1. Việc của bạn trong phase này
- [ ] Seed voucher demo (hết hạn, sắp hết lượt, hợp lệ) cho QA
- [ ] Xem log Render khi có lỗi 500, gửi người phụ trách
- [ ] Chạy migration trên DB demo theo quy trình an toàn (backup trước)
- [ ] Cập nhật SETUP.md mục dữ liệu demo

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 1b. Tài liệu và prompt cho phần này
- Lộ trình chi tiết phase này: [LP-DO-Kiet-P2](../../../docs/learning/DO-Kiet/LP-DO-Kiet-P2.md) (đọc gì, tiêu chí, tình huống thật, 7 bước prompt, bài tập có commit) · Chung: [LEARNING-PATH](../../../docs/learning/LEARNING-PATH.md), [PITFALLS](../../../docs/learning/PITFALLS.md).

**Prompt riêng cho phần code này** (dùng sau prompt khởi động ở mục 4):
```text
Đây là phần voucher trong seed.ts của DAYORA:
<dán>
Giải thích "upsert" là gì và vì sao chạy seed 2 lần không bị trùng. Lập checklist chuẩn bị dữ liệu trước buổi demo.
```

## 2. File/thư mục bạn phụ trách
- `apps/api/prisma/seed.ts` (phần demo, phối hợp BD2)
- `README.md` (phần Dữ liệu mẫu)

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Đọc log server | Tìm lỗi nhanh | [Tài liệu](https://render.com/docs/deploy-nestjs) | Tìm stack trace của một lỗi 500 |
| 2 | Migrate production an toàn | Không mất dữ liệu demo | [Tài liệu](https://www.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production) | Phân biệt migrate dev và deploy |
| 3 | Backup Supabase | Khôi phục khi lỗi | [Tài liệu](https://supabase.com/docs/guides/platform/backups) | Tải 1 bản backup |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Kiệt, vai trò DevOps trong dự án DAYORA
(website bán đồ picnic trong ngày, đồ án môn Phát triển ứng dụng TMĐT - UEH).
Stack: React + TypeScript + Tailwind (frontend), NestJS + Prisma + PostgreSQL Supabase (backend), VNPay Sandbox.
Tôi chưa có nền tảng lập trình. Phase hiện tại: P2 - Giỏ hàng, voucher, phí giao, checkout.
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

### 3. Đọc log lỗi
```text
Log Render sau (đã xoá secret):
<dán>
Giải thích lỗi nằm ở file/dòng nào, nguyên nhân khả dĩ, tôi nên báo ai trong nhóm (BD1 khách hàng/giao dịch hay BD2 quản trị/dữ liệu).
```

### 4. Runbook
```text
Viết runbook ngắn "deploy bản mới lên Render + migrate DB demo" gồm kiểm tra trước, các bước, cách rollback.
```

### 5. Luyện bảo vệ (cuối phase)
```text
Đóng vai giảng viên chấm đồ án. Dựa trên phần tôi phụ trách ở phase P2 (<dán mục 1 và file ở mục 2>),
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
- [ ] Voucher demo trên DB demo
- [ ] RUNBOOK.md
- [ ] SETUP.md cập nhật
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/kiet.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. `prisma migrate dev` và `migrate deploy` khác gì? Dùng cái nào trên demo?
2. Khi API trả 500 bạn xử lý theo thứ tự nào?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
