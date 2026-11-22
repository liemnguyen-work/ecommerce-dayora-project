---
tags: [phase/P2, role/BD2, guide]
member: Châu
role: BD2
phase: P2
dates: "11/11 – 17/11/2026"
---
# P2 · BD2 Châu — Backend 2 — quản trị và dữ liệu

> [!NOTE] Phase: [P2-OVERVIEW](../P2-OVERVIEW.md) (11/11 – 17/11/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/chau.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Giỏ hàng gắn tài khoản; voucher kiểm đủ 6 điều kiện; phí giao theo bảng demo; checkout preview → xác nhận thay đổi → tạo đơn có snapshot và giữ tồn.

## 1. Việc của bạn trong phase này
- [ ] Tự làm + commit: `/admin/vouchers`, `/admin/promotions`
- [ ] Tự làm + commit: hàm tạo đơn trong transaction: kiểm `stock − reserved ≥ qty`, tăng reserved, lưu snapshot OrderItem, tăng usedCount voucher
- [ ] Viết test 2 request tạo đơn cùng lúc cho SKU còn 1
- [ ] Cập nhật ERD nếu schema đổi + migration

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 1b. Tài liệu và prompt cho phần này
- Lộ trình chi tiết phase này: [LP-BD2-Chau-P2](../../../docs/learning/BD2-Chau/LP-BD2-Chau-P2.md) (đọc gì, tiêu chí, tình huống thật, 7 bước prompt, bài tập có commit) · Chung: [LEARNING-PATH](../../../docs/learning/LEARNING-PATH.md), [PITFALLS](../../../docs/learning/PITFALLS.md).

**Prompt riêng cho phần code này** (dùng sau prompt khởi động ở mục 4):
```text
Đây là cart.service.ts và orders.service.ts (preview) của DAYORA:
<dán code>
Giải thích: vì sao web gửi giá "expected" nhưng server vẫn tự tính lại? Khi nào trả 409 CONFIRM_REQUIRED?
Nếu GV bảo "miễn phí giao từ 400.000đ thay vì 500.000đ" thì sửa ở đâu? Để tôi tự sửa.
```

## 2. File/thư mục bạn phụ trách
- `apps/api/src/cart/`
- `apps/api/src/orders/orders.service.ts` (preview)
- `apps/api/src/orders/orders.dto.ts`
- `apps/api/prisma/seed.ts` (voucher demo)

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Transaction CSDL | Không bán âm tồn (R07) | [Tài liệu](https://www.postgresql.org/docs/current/tutorial-transactions.html) | Giải thích ACID bằng ví dụ chuyển tiền |
| 2 | Prisma `$transaction` + cập nhật có điều kiện | Giữ tồn an toàn | [Tài liệu](https://www.prisma.io/docs/orm/prisma-client/queries/transactions) | Đọc đoạn updateMany có where stock |
| 3 | Race condition | Hai khách mua món cuối | [Tài liệu](https://en.wikipedia.org/wiki/Race_condition) | Kể kịch bản 2 khách cùng bấm |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Châu, vai trò Backend 2 — quản trị và dữ liệu trong dự án DAYORA
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

### 3. Hiểu transaction giữ tồn
```text
Đây là đoạn tạo đơn:
<dán>
Giải thích bằng ví dụ 2 khách cùng mua chiếc thảm cuối: code đảm bảo chỉ 1 người thành công thế nào? Nếu bỏ transaction thì lỗi gì?
```

### 4. Kiểm tra migration
```text
Đây là migration SQL Prisma vừa sinh:
<dán>
Giải thích từng lệnh, có lệnh nào làm mất dữ liệu không?
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
- [ ] Test đồng thời pass
- [ ] Ảnh DB: reserved tăng sau khi tạo đơn
- [ ] Commit/PR của bạn
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/chau.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. stock và reserved thay đổi thế nào khi tạo đơn?
2. Vì sao OrderItem phải lưu tên, giá tại thời điểm mua?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
