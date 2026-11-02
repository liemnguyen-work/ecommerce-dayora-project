---
tags: [phase/P4, role/FD1, guide]
member: Thành
role: FD1
phase: P4
dates: "25/11 – 01/12/2026"
---
# P4 · FD1 Thành — Frontend 1 — khách hàng

> [!NOTE] Phase: [P4-OVERVIEW](../P4-OVERVIEW.md) (25/11 – 01/12/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/thanh.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Kit Builder nhận 4 nhóm đầu vào, áp R01–R05, giải thích kết quả, cho thay món và kiểm soát ngân sách, đưa bộ vào giỏ có ruleSetVersion.

## 1. Việc của bạn trong phase này
- [ ] Tự làm + commit: form Kit Builder (tình huống, số người 1–8, ngân sách, đồ đã có theo số lượng/sức chứa) báo lỗi tại ô
- [ ] Tự làm + commit: hiển thị bộ gợi ý + giải thích + nhãn thiết yếu/tùy chọn + ruleSetVersion
- [ ] Tự làm + commit: thay món/đổi số lượng gọi `/kit/adjust`, tổng chạy + cảnh báo
- [ ] Tự làm + commit: đưa bộ vào giỏ (đăng nhập theo D04), gỡ nhãn "đầy đủ" khi bỏ món thiết yếu

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 1b. Tài liệu và prompt cho phần này
- Lộ trình chi tiết phase này: [LP-FD1-Thanh-P4](../../../docs/learning/FD1-Thanh/LP-FD1-Thanh-P4.md) (đọc gì, tiêu chí, tình huống thật, 7 bước prompt, bài tập có commit) · Chung: [LEARNING-PATH](../../../docs/learning/LEARNING-PATH.md), [PITFALLS](../../../docs/learning/PITFALLS.md).

**Prompt riêng cho phần code này** (dùng sau prompt khởi động ở mục 4):
```text
Đây là KitBuilderPage.tsx của DAYORA:
<dán code>
Giải thích cách bộ đang tạo được giữ lại khi phải đi đăng nhập rồi quay về. Thanh ngân sách tính phần trăm thế nào? Hỏi tôi 3 câu.
```

## 2. File/thư mục bạn phụ trách
- `apps/web/src/pages/KitBuilderPage.tsx`
- `apps/web/src/components/home/KitPreview.tsx`
- `apps/web/src/lib/cart.ts` (addKitToCart)

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Form nhiều bước, giữ state | Không mất dữ liệu khi quay lại | [Tài liệu](https://react.dev/learn/managing-state) | Quay lại bước 1 vẫn còn số người |
| 2 | Animation số (count-up) bằng Motion | Tương tác UX bắt buộc #2 | [Tài liệu](https://motion.dev/docs/react) | Tắt khi reduced motion |
| 3 | sessionStorage | Giữ kit qua bước đăng nhập | [Tài liệu](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) | Giải thích sessionStorage khác localStorage |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Thành, vai trò Frontend 1 — khách hàng trong dự án DAYORA
(website bán đồ picnic trong ngày, đồ án môn Phát triển ứng dụng TMĐT - UEH).
Stack: React + TypeScript + Tailwind (frontend), NestJS + Prisma + PostgreSQL Supabase (backend), VNPay Sandbox.
Tôi chưa có nền tảng lập trình. Phase hiện tại: P4 - Kit Builder.
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

### 3. Hiểu luồng Kit Builder phía web
```text
Đây là KitBuilderPage.tsx:
<dán>
Vẽ sơ đồ trạng thái màn hình (nhập → đang tính → kết quả → điều chỉnh → vào giỏ). Chỉ ra nơi validate client và nơi hiển thị lỗi server.
```

### 4. Luyện sửa: thêm validation
```text
GV yêu cầu "ngân sách tối thiểu 100.000đ". Sửa ở đâu phía web, phía server cần sửa gì để thống nhất? Hướng dẫn tôi tự làm.
```

### 5. Luyện bảo vệ (cuối phase)
```text
Đóng vai giảng viên chấm đồ án. Dựa trên phần tôi phụ trách ở phase P4 (<dán mục 1 và file ở mục 2>),
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
- [ ] Video Kit Builder đủ 3 tương tác
- [ ] Ảnh 2 kích thước
- [ ] Commit/PR của bạn
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/thanh.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Validate ở form có đủ không? Vì sao server vẫn kiểm?
2. Khi bỏ món thiết yếu, giao diện báo gì?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
