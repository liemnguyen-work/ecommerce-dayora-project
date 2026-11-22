---
tags: [phase/P0, role/PD, guide]
member: Đạt
role: PD
phase: P0
dates: "28/10 – 03/11/2026"
---
# P0 · PD Đạt — Product Designer (UI/UX)

> [!NOTE] Phase: [P0-OVERVIEW](../P0-OVERVIEW.md) (28/10 – 03/11/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/dat.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Repo chạy được trên máy mọi người, CSDL Supabase có schema + 30 SKU, chốt các quyết định bảng 2.6, có design system và hero mẫu, deploy bản "hello" lên Vercel/Render.

## 1. Việc của bạn trong phase này
- [ ] Chuyển bộ nhận diện thành design system: [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) (màu, chữ, khoảng cách, nút, thẻ sản phẩm)
- [ ] Đăng nhập motionsites (MCP), duyệt CANDIDATES, chọn 1 hero + 2 section chủ đề picnic
- [ ] Vẽ sơ đồ luồng người dùng: mua lẻ, Kit Builder, checkout (Mermaid hoặc Figma)
- [ ] Duyệt hero mẫu do FD1 dựng trên trang chủ ở 1366/390 px

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 2. File/thư mục bạn phụ trách
- `docs/DESIGN-SYSTEM.md`
- `design/motion-prompts/`
- `apps/web/src/index.css (token, review cùng FD1)`

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Design token và Tailwind (màu, font, spacing) | Token là "từ điển màu" dùng chung cho code | [Tài liệu](https://tailwindcss.com/docs) | Đổi màu nút bằng class `bg-teal` thay vì mã HEX |
| 2 | Độ tương phản màu (WCAG) | Chữ teal trên kem phải đọc được; GV chấm UI/UX | [Tài liệu](https://webaim.org/resources/contrastchecker/) | Kiểm tra cặp #163B3B / #FFF6DF đạt AA |
| 3 | Animation có mục đích (Motion for React) | Quy định yêu cầu ≥3 hiệu ứng có mục đích UX | [Tài liệu](https://motion.dev/docs/react) | Giải thích hiệu ứng nào giúp người dùng, hiệu ứng nào chỉ trang trí |
| 4 | Responsive: mobile-first, breakpoint | Bắt buộc chạy tốt 1366 px và 390 px | [Tài liệu](https://tailwindcss.com/docs) | Mở DevTools, chuyển sang iPhone 12 Pro (390 px) |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Đạt, vai trò Product Designer (UI/UX) trong dự án DAYORA
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

### 3. Chọn prompt motionsites
```text
Tìm trên motionsites các prompt hero, scroll-reveal section và product showcase hợp với website đồ picnic trong ngày: nắng chiều, giấy kem, thiên nhiên, ấm áp. Trả bảng: tên prompt, loại section, vì sao hợp, độ nặng animation. Đề xuất 1 hero + 2 section.
```

### 4. Kiểm tra UI như người dùng thật
```text
Đây là ảnh chụp trang chủ DAYORA ở 390 px <đính ảnh>. Đóng vai người lần đầu vào web để mua thảm picnic. Chỉ ra 5 chỗ gây khó hiểu hoặc khó bấm, xếp theo mức nghiêm trọng, đề xuất sửa cụ thể theo design system (màu teal/kem, font Cormorant/Be Vietnam Pro).
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
- [ ] DESIGN-SYSTEM.md cập nhật
- [ ] File prompt đã chọn trong `design/motion-prompts/`
- [ ] Ảnh hero ở 1366 và 390 px
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/dat.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Ba tương tác có mục đích UX của DAYORA là gì và giúp người dùng thế nào?
2. Vì sao không dùng màu làm tín hiệu duy nhất cho lỗi?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
