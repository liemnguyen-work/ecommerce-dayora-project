---
tags: [phase/P3, role/PM, guide]
member: Liêm
role: PM
phase: P3
dates: "18/11 – 24/11/2026"
---
# P3 · PM Liêm — Trưởng nhóm kiêm BA

> [!NOTE] Phase: [P3-OVERVIEW](../P3-OVERVIEW.md) (18/11 – 24/11/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/liem.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Thanh toán VNPay Sandbox đủ ca thành công/thất bại/hủy/sai chữ ký/sai tiền/lặp; trạng thái đơn 3 trục; admin xử lý đơn; khách theo dõi đơn và đánh giá sau mua.

## 1. Việc của bạn trong phase này
- [ ] Theo dõi AC01, AC04, AC05; tổ chức buổi demo nội bộ luồng mua hàng trọn vẹn
- [ ] Viết báo cáo 3.5.3 Thanh toán VNPay (dùng lại Chương 3 dự án thuyết trình: Return URL vs IPN)
- [ ] Cập nhật bảng đóng góp
- [ ] Kiểm tra AI-LOG của các thành viên đã cập nhật P0–P2

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 1b. Tài liệu và prompt cho phần này
- Lộ trình chi tiết phase này: [LP-PM-Liem-P3](../../../docs/learning/PM-Liem/LP-PM-Liem-P3.md) (đọc gì, tiêu chí, tình huống thật, 7 bước prompt, bài tập có commit) · Chung: [LEARNING-PATH](../../../docs/learning/LEARNING-PATH.md), [PITFALLS](../../../docs/learning/PITFALLS.md).

**Prompt riêng cho phần code này** (dùng sau prompt khởi động ở mục 4):
```text
Đây là D07, D08 trong DECISIONS.md của DAYORA:
<dán>
Giúp tôi viết đoạn báo cáo luồng thanh toán VNPay dạng các bước đánh số, kèm 1 sơ đồ trạng thái đơn bằng chữ. Hỏi tôi 3 câu để chắc tôi trình bày được.
```

## 2. File/thư mục bạn phụ trách
- `docs/DECISIONS.md`
- `docs/report/CH3-payment.md` (chưa có, bạn viết)

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Luồng thanh toán VNPay | GV hỏi kỹ payment request/response/callback | [Tài liệu](https://sandbox.vnpayment.vn/apis/docs/thanh-toan-pay/pay.html) | Phân biệt Return URL và IPN |
| 2 | Kịch bản demo | Thuyết trình mượt | [Tài liệu](https://www.atlassian.com/team-playbook/plays/demo-trust) | Viết kịch bản demo 5 phút |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Liêm, vai trò Trưởng nhóm kiêm BA trong dự án DAYORA
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

### 3. Giải thích VNPay cho người không chuyên
```text
Giải thích luồng thanh toán VNPay Sandbox (tạo URL có chữ ký, chuyển hướng, Return URL, IPN, kiểm tra chữ ký/số tiền, idempotency) bằng ví dụ gửi thư bảo đảm. Sau đó hỏi tôi 5 câu như giảng viên.
```

### 4. Kịch bản demo
```text
Viết kịch bản demo 7 phút cho luồng: tìm sản phẩm → giỏ → voucher → checkout → VNPay sandbox → theo dõi đơn → admin cập nhật giao hàng. Ghi tài khoản/dữ liệu cần chuẩn bị và phương án khi mạng chậm.
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
- [ ] CH3-payment.md
- [ ] Biên bản demo nội bộ
- [ ] Đóng góp cập nhật
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/liem.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Vì sao không cập nhật trạng thái đơn ở Return URL?
2. Idempotency trong thanh toán là gì?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
