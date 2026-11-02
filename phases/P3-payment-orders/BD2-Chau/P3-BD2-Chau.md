---
tags: [phase/P3, role/BD2, guide]
member: Châu
role: BD2
phase: P3
dates: "18/11 – 24/11/2026"
---
# P3 · BD2 Châu — Backend 2 — quản trị và dữ liệu

> [!NOTE] Phase: [P3-OVERVIEW](../P3-OVERVIEW.md) (18/11 – 24/11/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/chau.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Thanh toán VNPay Sandbox đủ ca thành công/thất bại/hủy/sai chữ ký/sai tiền/lặp; trạng thái đơn 3 trục; admin xử lý đơn; khách theo dõi đơn và đánh giá sau mua.

## 1. Việc của bạn trong phase này
- [ ] Tự làm + commit: service chuyển trạng thái đơn theo D08 (bảng chuyển hợp lệ) + ghi OrderStatusLog
- [ ] Tự làm + commit: thanh toán thành công → trừ stock, giảm reserved; hủy/thất bại → giảm reserved
- [ ] Tự làm + commit: job dọn đơn hết hạn giữ tồn 15 phút (D06) + xử lý callback muộn (D07)
- [ ] Tự làm + commit: `/admin/orders` lọc, chi tiết, chuyển trạng thái

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 1b. Tài liệu và prompt cho phần này
- Lộ trình chi tiết phase này: [LP-BD2-Chau-P3](../../../docs/learning/BD2-Chau/LP-BD2-Chau-P3.md) (đọc gì, tiêu chí, tình huống thật, 7 bước prompt, bài tập có commit) · Chung: [LEARNING-PATH](../../../docs/learning/LEARNING-PATH.md), [PITFALLS](../../../docs/learning/PITFALLS.md).

**Prompt riêng cho phần code này** (dùng sau prompt khởi động ở mục 4):
```text
Đây là admin-orders.service.ts của DAYORA:
<dán code>
Vẽ sơ đồ trạng thái đơn (status, shippingStatus) từ code. Khi admin hủy đơn đã PAID thì tồn kho thay đổi thế nào? Nếu GV bảo "thêm trạng thái RETURNED → hoàn tồn" thì sửa đâu? Để tôi tự sửa.
```

## 2. File/thư mục bạn phụ trách
- `apps/api/src/admin-orders/`
- `apps/api/src/orders/checkout.service.ts` (expireStaleOrders, release)

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Máy trạng thái phía server | Chặn chuyển sai | [Tài liệu](https://developer.mozilla.org/en-US/docs/Glossary/State_machine) | Viết bảng from → to |
| 2 | Tác vụ định kỳ (cron) trong NestJS | Dọn đơn hết hạn | [Tài liệu](https://docs.nestjs.com/techniques/task-scheduling) | Giải thích cron mỗi phút |
| 3 | Transaction nhiều bảng | Đơn + tồn + log cùng thành công hoặc cùng thất bại | [Tài liệu](https://www.postgresql.org/docs/current/tutorial-transactions.html) | Kể điều gì xảy ra nếu lỗi giữa chừng |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Châu, vai trò Backend 2 — quản trị và dữ liệu trong dự án DAYORA
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

### 3. Hiểu luồng tồn kho
```text
Đây là order-status.service.ts:
<dán>
Lập bảng: sự kiện (tạo đơn, IPN thành công, thất bại, hết hạn, admin hủy) → stock, reserved thay đổi thế nào. Chỉ dòng code.
```

### 4. Luyện sửa: sửa lỗi trong Service
```text
Giả sử có lỗi: hủy đơn đã thanh toán không hoàn tồn. Hướng dẫn tôi tìm hàm, viết test tái hiện lỗi trước, rồi sửa.
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
- [ ] Test chuyển trạng thái + tồn pass
- [ ] Ảnh OrderStatusLog trong DB
- [ ] Commit/PR của bạn
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/chau.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Đơn hết hạn 15 phút thì tồn đi đâu?
2. IPN thành công đến sau khi đơn đã hết hạn thì xử lý thế nào (D07)?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
