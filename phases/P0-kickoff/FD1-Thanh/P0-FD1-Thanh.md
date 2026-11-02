---
tags: [phase/P0, role/FD1, guide]
member: Thành
role: FD1
phase: P0
dates: "28/10 – 03/11/2026"
---
# P0 · FD1 Thành — Frontend 1 — khách hàng

> [!NOTE] Phase: [P0-OVERVIEW](../P0-OVERVIEW.md) (28/10 – 03/11/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/thanh.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Repo chạy được trên máy mọi người, CSDL Supabase có schema + 30 SKU, chốt các quyết định bảng 2.6, có design system và hero mẫu, deploy bản "hello" lên Vercel/Render.

## 1. Việc của bạn trong phase này
- [ ] Cài môi trường theo SETUP: Node 24, Git, VS Code; chạy được `npm run dev:web`
- [ ] Đọc `apps/web/src/` (main.tsx, App.tsx, pages/HomePage.tsx, lib/api.ts) và giải thích được từng file
- [ ] Tự làm layout chung (header, footer, menu mobile) và commit bằng tài khoản của bạn
- [ ] Tự sửa thử một chữ trên trang chủ, thấy trình duyệt cập nhật

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 2. File/thư mục bạn phụ trách
- `apps/web/src/App.tsx`
- `apps/web/src/components/`
- `apps/web/src/pages/HomePage.tsx`

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | HTML/CSS/JS nền tảng | React vẫn sinh ra HTML; cần đọc được thẻ, class | [Tài liệu](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started) | Giải thích `<button className="...">` hiển thị ra sao |
| 2 | React: component, props, state, useEffect | Mọi trang là component | [Tài liệu](https://react.dev/learn) | Đọc HomePage.tsx, chỉ ra state và effect |
| 3 | TypeScript cơ bản (kiểu, interface) | Code dùng TS, lỗi kiểu xuất hiện khi build | [Tài liệu](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) | Giải thích `api<{ status: string }>` |
| 4 | Tailwind class | Giao diện viết bằng class | [Tài liệu](https://tailwindcss.com/docs) | Đổi `py-16` thành `py-8`, thấy khác biệt |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Thành, vai trò Frontend 1 — khách hàng trong dự án DAYORA
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

### 3. Hiểu một file React
```text
Tôi chưa biết code. Đây là file apps/web/src/pages/HomePage.tsx của dự án React + TypeScript + Tailwind:
<dán code>
Giải thích từng dòng như cho học sinh cấp 3, có ví dụ đời thường. Sau đó hỏi tôi 3 câu để kiểm tra tôi đã hiểu.
```

### 4. Bài tập sửa nhỏ
```text
Cho tôi 3 bài tập sửa rất nhỏ trên file trên (đổi chữ, đổi màu bằng token Tailwind bg-teal/text-honey, thêm một nút). Mỗi bài: mô tả, gợi ý dòng cần sửa, cách kiểm tra trên trình duyệt. Chưa đưa lời giải.
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
- [ ] Ảnh màn hình web chạy local
- [ ] Commit đầu tiên của bạn (link)
- [ ] Ghi chú tự giải thích 4 file trong AI-LOG
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/thanh.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. `lib/api.ts` làm gì? Nếu backend tắt thì trang chủ hiển thị gì?
2. Thêm một trang mới cần sửa những file nào?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
