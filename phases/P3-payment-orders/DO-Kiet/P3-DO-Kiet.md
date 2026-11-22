---
tags: [phase/P3, role/DO, guide]
member: Kiệt
role: DO
phase: P3
dates: "18/11 – 24/11/2026"
---
# P3 · DO Kiệt — DevOps

> [!NOTE] Phase: [P3-OVERVIEW](../P3-OVERVIEW.md) (18/11 – 24/11/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/kiet.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Thanh toán VNPay Sandbox đủ ca thành công/thất bại/hủy/sai chữ ký/sai tiền/lặp; trạng thái đơn 3 trục; admin xử lý đơn; khách theo dõi đơn và đánh giá sau mua.

## 1. Việc của bạn trong phase này
- [ ] Đăng ký VNPay Sandbox (cùng BD1), đặt VNP_* trên Render
- [ ] Cấu hình IPN URL public HTTPS trên cổng sandbox trỏ Render
- [ ] Render free ngủ sau 15 phút: thiết lập cách đánh thức trước demo (ghi vào RUNBOOK)
- [ ] Kiểm tra secret VNPay không xuất hiện trong repo/log

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 1b. Tài liệu và prompt cho phần này
- Lộ trình chi tiết phase này: [LP-DO-Kiet-P3](../../../docs/learning/DO-Kiet/LP-DO-Kiet-P3.md) (đọc gì, tiêu chí, tình huống thật, 7 bước prompt, bài tập có commit) · Chung: [LEARNING-PATH](../../../docs/learning/LEARNING-PATH.md), [PITFALLS](../../../docs/learning/PITFALLS.md).

**Prompt riêng cho phần code này** (dùng sau prompt khởi động ở mục 4):
```text
Đây là render.yaml và .env.example của DAYORA:
<dán, KHÔNG dán giá trị thật>
Hướng dẫn tôi từng bước thêm biến VNPay trên Render và khai IPN URL trên trang VNPay Sandbox. Vì sao IPN phải là URL public?
```

## 2. File/thư mục bạn phụ trách
- `render.yaml`
- `apps/api/.env.example`
- `README.md` (phần Deploy)

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Webhook/IPN cần URL public | VNPay gọi server của mình | [Tài liệu](https://developer.mozilla.org/en-US/docs/Glossary/Webhook) | Giải thích vì sao localhost không nhận được IPN |
| 2 | Quản lý secret | Hash secret VNPay là chìa khoá | [Tài liệu](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning) | Bật secret scanning trên repo |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Kiệt, vai trò DevOps trong dự án DAYORA
(website bán đồ picnic trong ngày, đồ án môn Phát triển ứng dụng TMĐT - UEH).
Stack: React + TypeScript + Tailwind (frontend), NestJS + Prisma + PostgreSQL Supabase (backend), VNPay Sandbox.
Tôi chưa có nền tảng lập trình. Phase hiện tại: P3 - Thanh toán VNPay, đơn hàng, tồn kho, đánh giá.
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

### 3. Kiểm tra cấu hình VNPay
```text
Liệt kê các biến cấu hình VNPay Sandbox cần cho dự án (TMN code, hash secret, URL, return URL, IPN URL), mỗi biến đặt ở đâu (Render, cổng VNPay, web), biến nào là bí mật.
```

### 4. Kế hoạch chống Render ngủ
```text
Render free tắt dịch vụ khi không dùng. Đề xuất cách chuẩn bị trước giờ demo/bảo vệ để không chờ khởi động lâu, kèm checklist 10 phút trước demo.
```

### 5. Luyện bảo vệ (cuối phase)
```text
Đóng vai giảng viên chấm đồ án. Dựa trên phần tôi phụ trách ở phase P3 (<dán mục 1 và file ở mục 2>),
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
- [ ] IPN nhận được trên Render (ảnh log)
- [ ] RUNBOOK chống ngủ
- [ ] Ảnh secret scanning bật
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/kiet.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Vì sao IPN không gọi được về localhost?
2. Nếu hash secret bị lộ thì hậu quả gì?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
