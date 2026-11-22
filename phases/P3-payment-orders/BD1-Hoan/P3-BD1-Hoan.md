---
tags: [phase/P3, role/BD1, guide]
member: Hoàn
role: BD1
phase: P3
dates: "18/11 – 24/11/2026"
---
# P3 · BD1 Hoàn — Backend 1 — khách hàng và giao dịch

> [!NOTE] Phase: [P3-OVERVIEW](../P3-OVERVIEW.md) (18/11 – 24/11/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/hoan.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Thanh toán VNPay Sandbox đủ ca thành công/thất bại/hủy/sai chữ ký/sai tiền/lặp; trạng thái đơn 3 trục; admin xử lý đơn; khách theo dõi đơn và đánh giá sau mua.

## 1. Việc của bạn trong phase này
- [ ] Tự làm + commit: `POST /payments/vnpay/:orderCode` tạo URL (vnp_Amount ×100, vnp_TxnRef = order.code, HMAC SHA512)
- [ ] Tự làm + commit: `GET /payments/vnpay/ipn`: kiểm chữ ký → tìm đơn → so số tiền → đã xử lý chưa → cập nhật trong transaction → trả RspCode đúng spec
- [ ] Tự làm + commit: `GET /payments/vnpay/return` chỉ kiểm chữ ký và chuyển hướng về web
- [ ] Tự làm + commit: API review (D05)

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 1b. Tài liệu và prompt cho phần này
- Lộ trình chi tiết phase này: [LP-BD1-Hoan-P3](../../../docs/learning/BD1-Hoan/LP-BD1-Hoan-P3.md) (đọc gì, tiêu chí, tình huống thật, 7 bước prompt, bài tập có commit) · Chung: [LEARNING-PATH](../../../docs/learning/LEARNING-PATH.md), [PITFALLS](../../../docs/learning/PITFALLS.md).

**Prompt riêng cho phần code này** (dùng sau prompt khởi động ở mục 4):
```text
Đây là vnpay.ts và payments.service.ts (hàm ipn) của DAYORA:
<dán code, KHÔNG dán hash secret>
Giải thích chữ ký: sắp xếp tham số → nối chuỗi → HMAC-SHA512. Vì sao IPN quan trọng hơn Return URL?
VNPay gửi IPN 2 lần thì tồn kho có bị trừ 2 lần không, dòng nào chặn? Hỏi tôi 3 câu.
```

## 2. File/thư mục bạn phụ trách
- `apps/api/src/payments/vnpay.ts`
- `apps/api/src/payments/payments.service.ts`
- `apps/api/src/payments/payments.controller.ts`
- `apps/api/src/reviews/`

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Chữ ký HMAC SHA512 | Chống giả mạo kết quả thanh toán | [Tài liệu](https://developer.mozilla.org/en-US/docs/Glossary/HMAC) | Giải thích vì sao đổi 1 ký tự thì chữ ký sai |
| 2 | Spec VNPay: tham số, RspCode IPN | Làm đúng chuẩn | [Tài liệu](https://sandbox.vnpayment.vn/apis/docs/thanh-toan-pay/pay.html) | Kể ý nghĩa vnp_ResponseCode 00, 24 |
| 3 | Idempotency qua unique (provider, txnNo) | IPN gửi lặp | [Tài liệu](https://www.postgresql.org/docs/current/tutorial-transactions.html) | Giải thích vì sao lần 2 không cập nhật |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Hoàn, vai trò Backend 1 — khách hàng và giao dịch trong dự án DAYORA
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

### 3. Hiểu IPN handler
```text
Đây là payment.service.ts (phần IPN):
<dán>
Đi qua 6 ca: thành công, thất bại, khách hủy, sai chữ ký, sai số tiền, IPN lặp. Với mỗi ca chỉ dòng code xử lý và RspCode trả về.
```

### 4. Luyện sửa nâng cao: thay đổi API integration
```text
GV yêu cầu "thêm thời hạn thanh toán 15 phút gửi sang VNPay (vnp_ExpireDate)". Hướng dẫn tôi đọc spec, sửa hàm tạo URL, và test. Để tôi tự làm.
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
- [ ] Test 6 ca VNPay pass
- [ ] Ảnh giao dịch sandbox + log IPN
- [ ] Commit/PR của bạn
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/hoan.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Return URL và IPN khác nhau thế nào? Cái nào cập nhật DB?
2. Làm sao chống IPN giả?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
