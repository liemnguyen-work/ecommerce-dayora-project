---
tags: [phase/P0, role/BD2, guide]
member: Châu
role: BD2
phase: P0
dates: "28/10 – 03/11/2026"
---
# P0 · BD2 Châu — Backend 2 — quản trị và dữ liệu

> [!NOTE] Phase: [P0-OVERVIEW](../P0-OVERVIEW.md) (28/10 – 03/11/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/chau.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Repo chạy được trên máy mọi người, CSDL Supabase có schema + 30 SKU, chốt các quyết định bảng 2.6, có design system và hero mẫu, deploy bản "hello" lên Vercel/Render.

## 1. Việc của bạn trong phase này
- [ ] Đọc `apps/api/prisma/schema.prisma`, vẽ sơ đồ quan hệ bảng (ERD) cho báo cáo
- [ ] Cùng DO tạo project Supabase, chạy `npm run db:migrate` lần đầu
- [ ] Review task seed 30 SKU (lấy từ catalog trong BAO-CAO-DRAFT mục 3.3) + `useType`, `capacityPeople`
- [ ] Cùng PM chốt định mức Kit v1 (D01)

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 2. File/thư mục bạn phụ trách
- `apps/api/prisma/schema.prisma`
- `apps/api/prisma/seed.ts`
- `apps/api/prisma/migrations/`

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | CSDL quan hệ: bảng, khoá chính, khoá ngoại, quan hệ 1-n | Bạn sở hữu schema | [Tài liệu](https://www.postgresql.org/docs/current/tutorial-concepts.html) | Chỉ ra quan hệ Order – OrderItem – Sku |
| 2 | Prisma schema + migrate | Đổi schema phải có migration | [Tài liệu](https://www.prisma.io/docs/orm) | Giải thích `npm run db:migrate` tạo ra gì |
| 3 | Supabase: project, connection string, pooler | DB chạy trên Supabase | [Tài liệu](https://supabase.com/docs/guides/database/overview) | Phân biệt DATABASE_URL và DIRECT_URL |
| 4 | Snapshot dữ liệu đơn hàng | Đơn cũ không đổi khi giá đổi (R06) | [Tài liệu](https://www.postgresql.org/docs/current/tutorial-transactions.html) | Giải thích vì sao OrderItem lưu unitPrice |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Châu, vai trò Backend 2 — quản trị và dữ liệu trong dự án DAYORA
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

### 3. Hiểu schema
```text
Đây là schema Prisma của web bán đồ picnic DAYORA:
<dán schema.prisma>
Vẽ ERD bằng Mermaid erDiagram, rồi giải thích 5 quan hệ quan trọng nhất bằng ví dụ một đơn hàng cụ thể (khách A mua 2 thảm).
```

### 4. Kiểm tra dữ liệu seed
```text
So sánh danh sách SKU trong seed.ts với bảng catalog sau:
<dán bảng 3.3>
Liệt kê SKU thiếu, sai giá, sai đơn vị, thiếu capacityPeople cho đồ dùng chung (thảm). Không sửa code, chỉ báo khác biệt.
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
- [ ] ERD Mermaid trong docs
- [ ] Ảnh Supabase Table Editor có 30 SKU
- [ ] Migration đầu tiên trong git
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/chau.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Vì sao tiền lưu Int chứ không phải Float?
2. Sku.stock và Sku.reserved khác nhau thế nào?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
