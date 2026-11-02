---
tags: [phase/P2, role/FD1, guide]
member: Thành
role: FD1
phase: P2
dates: "11/11 – 17/11/2026"
---
# P2 · FD1 Thành — Frontend 1 — khách hàng

> [!NOTE] Phase: [P2-OVERVIEW](../P2-OVERVIEW.md) (11/11 – 17/11/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/thanh.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Giỏ hàng gắn tài khoản; voucher kiểm đủ 6 điều kiện; phí giao theo bảng demo; checkout preview → xác nhận thay đổi → tạo đơn có snapshot và giữ tồn.

## 1. Việc của bạn trong phase này
- [ ] Tự làm + commit: trang giỏ (sửa số lượng, xoá, tổng, gợi ý bổ sung)
- [ ] Tự làm + commit: checkout (người nhận, địa chỉ, khu vực giao, voucher) gọi `/orders/preview`
- [ ] Tự làm + commit: hộp đối chiếu thay đổi → khách xác nhận → `POST /orders`
- [ ] Kit/giỏ khi chưa đăng nhập: lưu tạm và chuyển sau đăng nhập (D04)

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 1b. Tài liệu và prompt cho phần này
- Lộ trình chi tiết phase này: [LP-FD1-Thanh-P2](../../../docs/learning/FD1-Thanh/LP-FD1-Thanh-P2.md) (đọc gì, tiêu chí, tình huống thật, 7 bước prompt, bài tập có commit) · Chung: [LEARNING-PATH](../../../docs/learning/LEARNING-PATH.md), [PITFALLS](../../../docs/learning/PITFALLS.md).

**Prompt riêng cho phần code này** (dùng sau prompt khởi động ở mục 4):
```text
Đây là CheckoutPage.tsx và lib/cart.ts của DAYORA:
<dán code>
Vẽ luồng: đổi địa chỉ → gọi previewOrder → hiện phí giao → bấm Đặt hàng → server trả 409 → mở hộp đối chiếu → xác nhận.
Class `ConfirmError` để làm gì? Hỏi tôi 3 câu kiểm tra.
```

## 2. File/thư mục bạn phụ trách
- `apps/web/src/pages/CartPage.tsx`
- `apps/web/src/pages/CheckoutPage.tsx`
- `apps/web/src/lib/cart.ts`
- `apps/web/src/catalog.css` (phần `.cart-*`, `.checkout-*`, `.voucher-*`)

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | State chia sẻ giữa trang (context) | Số món trên icon giỏ | [Tài liệu](https://react.dev/learn/passing-data-deeply-with-context) | Giải thích CartContext |
| 2 | Hiển thị tiền VND | Định dạng 345.000 ₫ | [Tài liệu](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) | Dùng Intl.NumberFormat("vi-VN") |
| 3 | Không tin client | Frontend chỉ hiển thị số server trả | [Tài liệu](https://owasp.org/www-project-top-ten/) | Chỉ ra frontend không gửi giá lên |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Thành, vai trò Frontend 1 — khách hàng trong dự án DAYORA
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

### 3. Hiểu luồng checkout phía web
```text
Đây là CheckoutPage.tsx:
<dán>
Vẽ sequence diagram Mermaid: web ↔ API khi preview, khi có thay đổi, khi đặt hàng. Giải thích vì sao web không tự tính tổng tiền.
```

### 4. Luyện sửa: thay đổi hiển thị
```text
GV yêu cầu "hiện số tiền tiết kiệm được nhờ voucher ở giỏ hàng". Hướng dẫn tôi tìm dữ liệu cần có từ API và sửa giao diện. Để tôi tự làm.
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
- [ ] Video luồng giỏ → checkout → hộp đối chiếu
- [ ] Ảnh 2 kích thước
- [ ] Commit/PR của bạn
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/thanh.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Nếu ai đó sửa giá trong DevTools rồi đặt hàng thì chuyện gì xảy ra?
2. Giỏ hàng của khách lưu ở đâu?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
