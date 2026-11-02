---
tags: [phase/P2, role/FD2, guide]
member: Phúc
role: FD2
phase: P2
dates: "11/11 – 17/11/2026"
---
# P2 · FD2 Phúc — Frontend 2 — quản trị

> [!NOTE] Phase: [P2-OVERVIEW](../P2-OVERVIEW.md) (11/11 – 17/11/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/phuc.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Giỏ hàng gắn tài khoản; voucher kiểm đủ 6 điều kiện; phí giao theo bảng demo; checkout preview → xác nhận thay đổi → tạo đơn có snapshot và giữ tồn.

## 1. Việc của bạn trong phase này
- [ ] Tự làm + commit: admin voucher (tạo/sửa/bật tắt; % hoặc số tiền, trần, ngưỡng, lượt, thời hạn)
- [ ] Tự làm + commit: admin khuyến mãi/banner Home
- [ ] Validate form: ngày kết thúc > bắt đầu, % trong 1–100
- [ ] Bảng voucher hiện số lượt đã dùng

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 1b. Tài liệu và prompt cho phần này
- Lộ trình chi tiết phase này: [LP-FD2-Phuc-P2](../../../docs/learning/FD2-Phuc/LP-FD2-Phuc-P2.md) (đọc gì, tiêu chí, tình huống thật, 7 bước prompt, bài tập có commit) · Chung: [LEARNING-PATH](../../../docs/learning/LEARNING-PATH.md), [PITFALLS](../../../docs/learning/PITFALLS.md).

**Prompt riêng cho phần code này** (dùng sau prompt khởi động ở mục 4):
```text
Đây là phần Vouchers trong AdminPage.tsx và admin-vouchers.dto.ts của DAYORA:
<dán code>
Giải thích các ràng buộc voucher (chỉ một trong % hoặc số tiền, maxDiscount, usageLimit ≥ usedCount) và lỗi hiện ra trên form thế nào.
Nếu GV bảo "thêm ô nhập đơn tối thiểu" thì làm thế nào? Để tôi tự làm.
```

## 2. File/thư mục bạn phụ trách
- `apps/web/src/pages/AdminPage.tsx` (mục Vouchers, Promotions)
- `API: apps/api/src/admin-vouchers/, promotions/admin-promotions.*` (chỉ đọc)

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Input ngày giờ (datetime-local), múi giờ | Voucher có thời hạn | [Tài liệu](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/datetime-local) | Giải thích lệch múi giờ UTC/VN |
| 2 | Validate phụ thuộc giữa field | Ngày kết thúc > bắt đầu | [Tài liệu](https://react.dev/reference/react-dom/components/form) | Báo lỗi khi ngày ngược |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Phúc, vai trò Frontend 2 — quản trị trong dự án DAYORA
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

### 3. Hiểu form voucher
```text
Đây là form voucher:
<dán>
Liệt kê mọi trường hợp nhập sai có thể xảy ra và code đã chặn chưa. Trường hợp nào chỉ backend chặn được?
```

### 4. Luyện sửa: thêm field
```text
GV yêu cầu "voucher chỉ áp dụng cho khách mới (chưa có đơn)". Liệt kê thay đổi ở schema, backend, form admin. Chưa viết code.
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
- [ ] Ảnh tạo voucher + lỗi validate
- [ ] Commit/PR của bạn
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/phuc.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Vì sao thời gian voucher dễ sai múi giờ?
2. Lượt dùng voucher tăng lúc nào?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
