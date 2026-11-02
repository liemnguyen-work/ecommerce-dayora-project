---
tags: [phase/P2, role/PM, guide]
member: Liêm
role: PM
phase: P2
dates: "11/11 – 17/11/2026"
---
# P2 · PM Liêm — Trưởng nhóm kiêm BA

> [!NOTE] Phase: [P2-OVERVIEW](../P2-OVERVIEW.md) (11/11 – 17/11/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/liem.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Giỏ hàng gắn tài khoản; voucher kiểm đủ 6 điều kiện; phí giao theo bảng demo; checkout preview → xác nhận thay đổi → tạo đơn có snapshot và giữ tồn.

## 1. Việc của bạn trong phase này
- [ ] Chốt lần cuối D02 (phí giao), D03 (kết hợp ưu đãi), D04 (đăng nhập khi mua) với nhóm
- [ ] Viết báo cáo mục 3.5.2 Giỏ hàng/checkout, 3.5.5 Voucher (mô tả, requirement, flow)
- [ ] Theo dõi rủi ro: giữ tồn, giá client giả mạo
- [ ] Cập nhật bảng đóng góp thành viên (bản nháp)

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 1b. Tài liệu và prompt cho phần này
- Lộ trình chi tiết phase này: [LP-PM-Liem-P2](../../../docs/learning/PM-Liem/LP-PM-Liem-P2.md) (đọc gì, tiêu chí, tình huống thật, 7 bước prompt, bài tập có commit) · Chung: [LEARNING-PATH](../../../docs/learning/LEARNING-PATH.md), [PITFALLS](../../../docs/learning/PITFALLS.md).

**Prompt riêng cho phần code này** (dùng sau prompt khởi động ở mục 4):
```text
Đây là D02, D03, D06 trong DECISIONS.md của DAYORA:
<dán>
Giúp tôi viết đoạn báo cáo "Quy tắc tính tiền" với 2 ví dụ số cụ thể (có voucher DAYORA10, giao nội thành HCM). Tôi sẽ tự kiểm tra số bằng cách đặt đơn thử trên localhost.
```

## 2. File/thư mục bạn phụ trách
- `docs/DECISIONS.md`
- `docs/report/CH3-checkout-voucher.md` (chưa có, bạn viết)
- `phases/P2-cart-checkout/P2-OVERVIEW.md`

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Cấu trúc 11 mục của một chức năng trong Chương 3 | Quy định bắt buộc | [Tài liệu](https://www.atlassian.com/work-management/project-management/acceptance-criteria) | Liệt kê 11 mục cho FR13 |
| 2 | Quy trình checkout TMĐT | Viết flow chính xác | [Tài liệu](https://baymard.com/blog/checkout-flow-average-form-fields) | Kể 5 bước checkout DAYORA |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Liêm, vai trò Trưởng nhóm kiêm BA trong dự án DAYORA
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

### 3. Khung chương 3 cho một chức năng
```text
Tạo khung markdown 11 mục (mô tả, requirement, design, database, flow, source code, giải thích, before, after, testing, AI sử dụng) cho chức năng Voucher của DAYORA, điền phần tôi cung cấp, mục nào thiếu ghi <cần bổ sung>.
<dán FR13, D03, link PR>
```

### 4. Kiểm tra mâu thuẫn
```text
So sánh DECISIONS D02–D04 với REQUIREMENTS FR09, FR10, FR12, FR13. Chỉ ra chỗ mâu thuẫn hoặc chưa rõ.
<dán>
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
- [ ] DECISIONS chốt D02–D04
- [ ] Khung báo cáo checkout/voucher
- [ ] Bảng đóng góp nháp
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/liem.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Voucher tính trên tiền hàng hay tổng có phí giao? Vì sao?
2. Khi giá đổi giữa lúc thêm giỏ và checkout, hệ thống làm gì?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
