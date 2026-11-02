---
tags: [phase/P2, role/PD, guide]
member: Đạt
role: PD
phase: P2
dates: "11/11 – 17/11/2026"
---
# P2 · PD Đạt — Product Designer (UI/UX)

> [!NOTE] Phase: [P2-OVERVIEW](../P2-OVERVIEW.md) (11/11 – 17/11/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/dat.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Giỏ hàng gắn tài khoản; voucher kiểm đủ 6 điều kiện; phí giao theo bảng demo; checkout preview → xác nhận thay đổi → tạo đơn có snapshot và giữ tồn.

## 1. Việc của bạn trong phase này
- [ ] Thiết kế giỏ hàng (sửa số lượng, xoá, gợi ý bổ sung), checkout 1 trang, hộp đối chiếu thay đổi (giá/tồn/phí)
- [ ] Trạng thái rỗng, đang tải, lỗi cho giỏ và checkout
- [ ] Review UI FD1 + FD2 (admin voucher)

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 1b. Tài liệu và prompt cho phần này
- Lộ trình chi tiết phase này: [LP-PD-Dat-P2](../../../docs/learning/PD-Dat/LP-PD-Dat-P2.md) (đọc gì, tiêu chí, tình huống thật, 7 bước prompt, bài tập có commit) · Chung: [LEARNING-PATH](../../../docs/learning/LEARNING-PATH.md), [PITFALLS](../../../docs/learning/PITFALLS.md).

**Prompt riêng cho phần code này** (dùng sau prompt khởi động ở mục 4):
```text
Đây là ảnh chụp trang Giỏ hàng và Thanh toán của DAYORA <đính ảnh>. Dựa trên DESIGN-SYSTEM <dán>, chỉ ra 5 chỗ chưa nhất quán (khoảng cách, cỡ chữ, màu). Hỏi tôi cách sửa từng chỗ trước khi gợi ý.
```

## 2. File/thư mục bạn phụ trách
- `docs/DESIGN-SYSTEM.md`
- `apps/web/src/catalog.css` (review phần giỏ/checkout)

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | UX giỏ hàng/checkout | Giảm bỏ giỏ | [Tài liệu](https://baymard.com/research/checkout-usability) | Liệt kê 3 nguyên nhân bỏ giỏ |
| 2 | Thiết kế trạng thái (empty/loading/error) | Quy định yêu cầu thông báo rõ | [Tài liệu](https://www.nngroup.com/articles/empty-state-interface-design/) | Vẽ trạng thái giỏ trống |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Đạt, vai trò Product Designer (UI/UX) trong dự án DAYORA
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

### 3. Thiết kế hộp đối chiếu thay đổi
```text
Thiết kế nội dung hộp thoại khi checkout phát hiện: giá 1 sản phẩm tăng 10.000đ, 1 sản phẩm chỉ còn 1 cái, phí giao đổi từ tạm tính 30.000đ sang 20.000đ. Viết chữ hiển thị tiếng Việt rõ ràng, nút hành động, và cách làm nổi bật thay đổi không chỉ bằng màu.
```

### 4. Review UI checkout
```text
Ảnh checkout 390 px <đính>. Kiểm tra theo: thứ tự trường, nhãn, lỗi, tổng tiền dễ thấy, nút đặt hàng không bị che. Đề xuất sửa.
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
- [ ] Thiết kế giỏ/checkout 2 kích thước
- [ ] Bộ chữ hộp đối chiếu
- [ ] Issue review UI
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/dat.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Hộp đối chiếu thay đổi là tương tác UX bắt buộc nào?
2. Vì sao hiển thị phí giao "tạm tính"?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
