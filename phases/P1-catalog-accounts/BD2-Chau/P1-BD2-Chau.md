---
tags: [phase/P1, role/BD2, guide]
member: Châu
role: BD2
phase: P1
dates: "04/11 – 10/11/2026"
---
# P1 · BD2 Châu — Backend 2 — quản trị và dữ liệu

> [!NOTE] Phase: [P1-OVERVIEW](../P1-OVERVIEW.md) (04/11 – 10/11/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/chau.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Khách xem trang chủ (hero motionsites), danh mục, tìm kiếm + ≥5 bộ lọc + sắp xếp, chi tiết sản phẩm theo biến thể; đăng ký/đăng nhập; admin CRUD sản phẩm/danh mục cơ bản.

## 1. Việc của bạn trong phase này
- [ ] Tự làm + commit: `RolesGuard` + decorator `@Roles("ADMIN")`
- [ ] Tự làm + commit: `/admin/products` CRUD (ẩn thay vì xoá nếu đã có đơn), `/admin/categories`
- [ ] Kiểm tra ràng buộc: giá ≥ 0, tồn ≥ 0, SKU duy nhất
- [ ] Cập nhật seed nếu thiếu dữ liệu lọc (scenarios, material)

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 1b. Tài liệu và prompt cho phần này
- Lộ trình chi tiết phase này: [LP-BD2-Chau-P1](../../../docs/learning/BD2-Chau/LP-BD2-Chau-P1.md) (đọc gì, tiêu chí, tình huống thật, 7 bước prompt, bài tập có commit) · Chung: [LEARNING-PATH](../../../docs/learning/LEARNING-PATH.md), [PITFALLS](../../../docs/learning/PITFALLS.md).

**Prompt riêng cho phần code này** (dùng sau prompt khởi động ở mục 4):
```text
Đây là schema.prisma và prisma.config.ts của DAYORA:
<dán code, KHÔNG dán .env>
1) Giải thích Product, Sku, Category liên quan thế nào (vẽ sơ đồ).
2) Vì sao có DATABASE_URL (port 6543, pgbouncer) và DIRECT_URL (port 5432)? Lệnh nào dùng cái nào?
3) Khác nhau giữa `db:migrate` và `db:seed`. Hỏi tôi 3 câu kiểm tra.
```

## 2. File/thư mục bạn phụ trách
- `apps/api/prisma/schema.prisma`
- `apps/api/prisma/seed.ts`
- `apps/api/prisma/migrations/`
- `apps/api/prisma.config.ts`
- `apps/api/src/admin-catalog/`
- `apps/api/src/admin-users/`
- `apps/api/src/auth/auth.guard.ts` (RolesGuard, review cùng BD1)

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | NestJS Guards | Chặn khách gọi API admin | [Tài liệu](https://docs.nestjs.com/guards) | Giải thích 401 khác 403 |
| 2 | Ràng buộc dữ liệu (DTO + DB) | Không cho giá/tồn âm | [Tài liệu](https://docs.nestjs.com/techniques/validation) | Thêm `@Min(0)` |
| 3 | Soft delete | Giữ lịch sử đơn | [Tài liệu](https://www.prisma.io/docs/orm) | Giải thích status INACTIVE |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Châu, vai trò Backend 2 — quản trị và dữ liệu trong dự án DAYORA
(website bán đồ picnic trong ngày, đồ án môn Phát triển ứng dụng TMĐT - UEH).
Stack: React + TypeScript + Tailwind (frontend), NestJS + Prisma + PostgreSQL Supabase (backend), VNPay Sandbox.
Tôi chưa có nền tảng lập trình. Phase hiện tại: P1 - Catalog, tài khoản và giao diện nền.
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

### 3. Hiểu guard phân quyền
```text
Đây là roles.guard.ts:
<dán>
Giải thích bằng ví dụ bảo vệ toà nhà kiểm thẻ. Viết 3 ca test: không đăng nhập, khách thường, admin — mỗi ca mong đợi status gì.
```

### 4. Kiểm tra lỗ hổng
```text
Liệt kê các cách một khách thường có thể cố gọi API admin của dự án này và cách code hiện tại chặn từng cách. Chỉ ra chỗ còn hở nếu có.
<dán controller admin>
```

### 5. Luyện bảo vệ (cuối phase)
```text
Đóng vai giảng viên chấm đồ án. Dựa trên phần tôi phụ trách ở phase P1 (<dán mục 1 và file ở mục 2>),
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
- [ ] Test RolesGuard pass
- [ ] Ảnh 403 khi khách gọi /admin/products
- [ ] Commit/PR của bạn
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/chau.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Vì sao kiểm tra vai trò ở backend dù frontend đã ẩn menu admin?
2. Sản phẩm đã có trong đơn cũ thì xoá được không?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
