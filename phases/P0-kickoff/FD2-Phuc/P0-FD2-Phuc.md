---
tags: [phase/P0, role/FD2, guide]
member: Phúc
role: FD2
phase: P0
dates: "28/10 – 03/11/2026"
---
# P0 · FD2 Phúc — Frontend 2 — quản trị

> [!NOTE] Phase: [P0-OVERVIEW](../P0-OVERVIEW.md) (28/10 – 03/11/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/phuc.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Repo chạy được trên máy mọi người, CSDL Supabase có schema + 30 SKU, chốt các quyết định bảng 2.6, có design system và hero mẫu, deploy bản "hello" lên Vercel/Render.

## 1. Việc của bạn trong phase này
- [ ] Cài môi trường, chạy được web local
- [ ] Đọc cấu trúc frontend; nghiên cứu mẫu trang quản trị (sidebar, bảng, form)
- [ ] Review task khung admin: route `/admin`, layout sidebar, component bảng dữ liệu dùng chung
- [ ] Liệt kê màn admin cần có theo FR14–FR17 vào file overview

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 2. File/thư mục bạn phụ trách
- `apps/web/src/pages/admin/`
- `apps/web/src/components/admin/`

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | React component + props | Bảng dữ liệu dùng lại cho sản phẩm, đơn, voucher | [Tài liệu](https://react.dev/learn) | Truyền mảng cột vào component bảng |
| 2 | React Router (route lồng nhau) | `/admin/*` có layout riêng | [Tài liệu](https://reactrouter.com/start/declarative/routing) | Thêm route `/admin/thu` |
| 3 | Form và validation phía client | Admin nhập giá, tồn kho không được âm | [Tài liệu](https://react.dev/reference/react-dom/components/input) | Chặn ô giá nhận số âm |
| 4 | TypeScript kiểu dữ liệu từ API | Bảng hiển thị đúng field | [Tài liệu](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) | Viết type `Product` từ schema.prisma |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Phúc, vai trò Frontend 2 — quản trị trong dự án DAYORA
(website bán đồ picnic trong ngày, đồ án môn Phát triển ứng dụng TMĐT - UEH).
Stack: React + TypeScript + Tailwind (frontend), NestJS + Prisma + PostgreSQL Supabase (backend), VNPay Sandbox.
Tôi chưa có nền tảng lập trình. Phase hiện tại: P0 - Khởi động và nền móng.
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

### 3. Thiết kế danh sách màn admin
```text
Dự án DAYORA (web bán đồ picnic) có các yêu cầu admin sau:
<dán FR14–FR17 từ REQUIREMENTS.md>
Liệt kê các màn hình admin cần có, mỗi màn: mục đích, cột bảng, bộ lọc, hành động, thông báo thành công/lỗi. Trình bày bảng markdown.
```

### 4. Hiểu route lồng nhau
```text
Giải thích React Router route lồng nhau và <Outlet> bằng ví dụ toà nhà có nhiều phòng. Sau đó cho tôi xem cách tổ chức /admin, /admin/products, /admin/orders với một layout sidebar chung.
```

### 5. Luyện bảo vệ (cuối phase)
```text
Đóng vai giảng viên chấm đồ án. Dựa trên phần tôi phụ trách ở phase P0 (<dán mục 1 và file ở mục 2>),
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
- [ ] Danh sách màn admin trong overview
- [ ] Ảnh khung admin chạy local
- [ ] Commit review của bạn
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/phuc.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Vì sao trang admin cần layout riêng?
2. Nếu khách thường gõ URL /admin thì frontend và backend xử lý thế nào?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
