---
tags: [phase/P2, role/QA, guide]
member: Ngọc
role: QA
phase: P2
dates: "11/11 – 17/11/2026"
---
# P2 · QA Ngọc — QA/Tester

> [!NOTE] Phase: [P2-OVERVIEW](../P2-OVERVIEW.md) (11/11 – 17/11/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/ngoc.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Giỏ hàng gắn tài khoản; voucher kiểm đủ 6 điều kiện; phí giao theo bảng demo; checkout preview → xác nhận thay đổi → tạo đơn có snapshot và giữ tồn.

## 1. Việc của bạn trong phase này
- [ ] Ca kiểm thử voucher theo AC06 (hiệu lực, hết hạn, dưới ngưỡng, hết lượt, trần, đối tượng)
- [ ] Thử giả mạo giá: sửa request trong DevTools/Postman gửi giá 1đ
- [ ] Ca phí giao 3 khu vực + miễn phí
- [ ] Retest bug P1 còn mở

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 1b. Tài liệu và prompt cho phần này
- Lộ trình chi tiết phase này: [LP-QA-Ngoc-P2](../../../docs/learning/QA-Ngoc/LP-QA-Ngoc-P2.md) (đọc gì, tiêu chí, tình huống thật, 7 bước prompt, bài tập có commit) · Chung: [LEARNING-PATH](../../../docs/learning/LEARNING-PATH.md), [PITFALLS](../../../docs/learning/PITFALLS.md).

**Prompt riêng cho phần code này** (dùng sau prompt khởi động ở mục 4):
```text
Đây là pricing.spec.ts của DAYORA:
<dán code>
Liệt kê các ca biên đã có. Đề xuất 8 ca kiểm thử tay cho giỏ + voucher + phí giao (gồm đơn đúng 500.000đ, voucher hết lượt, giá đổi giữa chừng). Tôi tự chạy và ghi kết quả thật.
```

## 2. File/thư mục bạn phụ trách
- `docs/TEST-CASES.md`
- `apps/api/src/pricing/pricing.spec.ts` (đọc)
- `apps/api/src/orders/checkout.service.spec.ts` (đọc)

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Postman/Thunder Client gửi request tuỳ ý | Kiểm tra server không tin client | [Tài liệu](https://learning.postman.com/docs/getting-started/first-steps/sending-the-first-request/) | Gửi POST /orders với field price lạ |
| 2 | Bảng quyết định (decision table) | Voucher nhiều điều kiện | [Tài liệu](https://www.guru99.com/decision-table-testing.html) | Lập bảng 6 điều kiện voucher |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Ngọc, vai trò QA/Tester trong dự án DAYORA
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

### 3. Bảng quyết định voucher
```text
Lập decision table cho voucher DAYORA với điều kiện: tồn tại, trong thời hạn, đạt ngưỡng, còn lượt tổng, còn lượt mỗi người, đúng đối tượng. Rút gọn còn các ca có ý nghĩa, ghi kết quả mong đợi.
```

### 4. Kịch bản tấn công giá
```text
Viết 5 kịch bản kiểm tra "server không tin dữ liệu client" cho API giỏ hàng và đặt hàng (sửa giá, sửa số lượng âm, sửa phí giao, voucher người khác, đơn người khác). Mỗi kịch bản: request gửi, kết quả mong đợi.
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
- [ ] Kết quả ca voucher/phí giao
- [ ] Ảnh request giả mạo bị từ chối/bỏ qua
- [ ] Bug report
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/ngoc.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Ca kiểm thử nào chứng minh AC07 "sửa giá từ client không được tin"?
2. Decision table giúp gì?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
