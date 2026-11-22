---
tags: [phase/P6, role/BD1, guide]
member: Hoàn
role: BD1
phase: P6
dates: "09/12 – 15/12/2026"
---
# P6 · BD1 Hoàn — Backend 1 — khách hàng và giao dịch

> [!NOTE] Phase: [P6-OVERVIEW](../P6-OVERVIEW.md) (09/12 – 15/12/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/hoan.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Chạy toàn bộ bộ test, test đồng thời, thử nghiệm 8 người dùng; sửa lỗi; nếu core đạt thì làm FR18 checklist + email nhắc.

## 1. Việc của bạn trong phase này
- [ ] Sửa bug backend khách
- [ ] Nếu làm FR18: API checklist, đăng ký nhắc (chỉ đơn của mình), đổi ngày, hủy
- [ ] Chạy toàn bộ test, bổ sung test cho bug đã sửa
- [ ] Ôn bảo vệ: VNPay + Kit + voucher

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 2. File/thư mục bạn phụ trách
- `apps/api/src/`

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Viết test tái hiện bug trước khi sửa | Không tái phát | [Tài liệu](https://vitest.dev/guide/) | Viết test fail rồi sửa cho pass |
| 2 | Gửi email qua dịch vụ (nếu FR18) | Email nhắc | [Tài liệu](https://resend.com/docs/introduction) | Gửi 1 email test |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Hoàn, vai trò Backend 1 — khách hàng và giao dịch trong dự án DAYORA
(website bán đồ picnic trong ngày, đồ án môn Phát triển ứng dụng TMĐT - UEH).
Stack: React + TypeScript + Tailwind (frontend), NestJS + Prisma + PostgreSQL Supabase (backend), VNPay Sandbox.
Tôi chưa có nền tảng lập trình. Phase hiện tại: P6 - Kiểm thử tổng, usability, Innovation có điều kiện.
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

### 3. Sửa bug theo TDD
```text
Bug sau ở backend:
<dán>
Hướng dẫn tôi viết test Vitest tái hiện (fail), xác định dòng lỗi, sửa, chạy lại pass.
```

### 4. Luyện bảo vệ nâng cao
```text
Ra cho tôi 3 yêu cầu sửa nâng cao kiểu giảng viên trên module voucher/checkout/VNPay của DAYORA. Với mỗi bài, tôi phải nói: phân tích, file, giải thích, sửa, test. Chấm tôi.
```

### 5. Luyện bảo vệ (cuối phase)
```text
Đóng vai giảng viên chấm đồ án. Dựa trên phần tôi phụ trách ở phase P6 (<dán mục 1 và file ở mục 2>),
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
- [ ] Test mới cho bug
- [ ] FR18 API (nếu làm)
- [ ] Ghi chú luyện bảo vệ
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/hoan.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Nếu GV yêu cầu đổi voucher logic, bạn bắt đầu từ file nào?
2. Test nào chứng minh bug đã hết?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
