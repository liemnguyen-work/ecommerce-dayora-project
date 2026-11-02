---
tags: [learning, member/BD2, phase/P1]
---
# P1 · BD2 Châu

> P1 Catalog, tài khoản, giao diện nền (04/11–10/11) · Tổng quan của bạn: [LP-BD2-Chau](LP-BD2-Chau.md) · Hướng dẫn phase: [P1-BD2-Chau](../../../phases/P1-catalog-accounts/BD2-Chau/P1-BD2-Chau.md) · Log của bạn: `docs/ai-logs/chau.md`

**Mục tiêu:** Hiểu cấu trúc dữ liệu: bảng nào, quan hệ nào, dữ liệu mẫu vào database thế nào.

Thời lượng gợi ý: cả phase (1 tuần). **Thứ tự làm:**
1. Mục 2 + bước 1 (khái niệm) · đọc issue và tiêu chí xong của task ở mục 6.
2. **Mục 6: viết test hoặc ca kiểm thử trước, rồi tự xây task PRJ** (bước 5). Kẹt quá 1 buổi: hỏi reviewer hoặc PM.
3. Khi kiểm chứng đạt: bước 2 đọc lại code của chính bạn, giải thích được từng file ở mục 1.
4. Mục 3, 4, bước 3, 4, 6, 7: kiểm hiểu biết, tình huống, luyện bảo vệ, AI-LOG.

## 1. File bạn sẽ viết hoặc sửa
1. `apps/api/prisma/schema.prisma`
2. `apps/api/prisma.config.ts`
3. `apps/api/prisma/migrations/20261029105758_init/migration.sql`
4. `apps/api/prisma/seed.ts`
5. `apps/api/src/admin-catalog/admin-catalog.service.ts`
6. `apps/api/src/admin-users/admin-users.service.ts`
7. `docs/catalog/SKU-INVENTORY.md`

## 2. Kiến thức cần nắm
| # | Khái niệm | Vì sao cần | Thấy ở đâu trong code |
|---|---|---|---|
| 1 | Model, quan hệ 1-n (Category–Product–Sku), enum | Nền của mọi API | `schema.prisma` |
| 2 | Migration và seed khác nhau | Một tạo bảng, một đổ dữ liệu | `migrations/`, `seed.ts` |
| 3 | Upsert và chạy lại an toàn (idempotent) | Seed chạy nhiều lần không trùng, không phá dữ liệu | `seed.ts` |
| 4 | `DATABASE_URL` (pooler 6543, pgbouncer) vs `DIRECT_URL` (5432) | App và migration cần kết nối khác nhau | `prisma.config.ts`, `.env.example` |
| 5 | Ẩn mềm (soft hide) thay vì xóa | Không phá đơn cũ | `hideProduct`, `hideSku` |
| 6 | Cấm tự khóa tài khoản admin | Tránh khóa mất quyền quản trị | `admin-users.service.ts` |

## 3. Tiêu chí đạt (tự đánh dấu, có bằng chứng)
- [ ] Vẽ sơ đồ quan hệ ít nhất 8 bảng chính (Category, Product, Sku, User, Cart, Order, Voucher, RuleSet).
- [ ] Giải thích vì sao `Sku` có cả `stock` và `reserved`.
- [ ] Giải thích vì sao seed không được ghi đè `stock` ở nhánh `update` (B4) và vì sao nguy hiểm.
- [ ] Chạy `npm run db:seed` hai lần và chứng minh không trùng (đếm số SKU).
- [ ] Giải thích vì sao admin "ẩn" chứ không "xóa" sản phẩm.
- [ ] Phân biệt được lúc nào dùng `DIRECT_URL`.

Đạt khi: mọi ô được đánh dấu **và** mỗi ô có bằng chứng trong AI-LOG hoặc PR (lệnh đã chạy, ảnh, link commit).

## 4. Lỗi hay gặp trong phần này
Đọc tình huống, **tự đoán nguyên nhân trước** rồi mới đọc lời giải.

| Vấn đề | Cách tránh | Đọc thêm |
|---|---|---|
| Chạy lại seed ghi đè tồn | `stock` chỉ trong `create`. | [B4](../PITFALLS.md#b4) |
| Email admin viết hoa | Chuẩn hóa chữ thường, mật khẩu ≥ 8. | [B5](../PITFALLS.md#b5) |
| Dữ liệu nguồn mâu thuẫn | Hỏi, ghi quyết định, rồi mới seed. | [B1](../PITFALLS.md#b1) |

## 5. Lộ trình prompt (làm lần lượt, mỗi bước một phiên AI)
Mở đầu mỗi phiên bằng prompt "Khởi động phiên" trong [P1-BD2-Chau](../../../phases/P1-catalog-accounts/BD2-Chau/P1-BD2-Chau.md) mục 4.1. **Không dán `.env`, mật khẩu, khóa.** Mỗi bước xong ghi một mục AI-LOG theo mã gợi ý.

### Bước 1 — Hiểu khái niệm (AI-P1-BD2-01)
```text
Tôi là Châu (BD2) trong dự án DAYORA. Giải thích lần lượt các khái niệm sau bằng ví dụ đời thường, mỗi lần MỘT khái niệm, hỏi tôi 1 câu kiểm tra rồi mới sang khái niệm tiếp theo:
1. Model, quan hệ 1-n (Category–Product–Sku), enum
2. Migration và seed khác nhau
3. Upsert và chạy lại an toàn (idempotent)
4. `DATABASE_URL` (pooler 6543, pgbouncer) vs `DIRECT_URL` (5432)
5. Ẩn mềm (soft hide) thay vì xóa
6. Cấm tự khóa tài khoản admin
Không viết code. Nếu tôi trả lời sai, giải thích lại theo cách khác.
```
Tự kiểm: đóng AI, viết lại mỗi khái niệm 1 câu bằng lời của bạn.

### Bước 2 — Đọc lại code của bạn (AI-P1-BD2-02)
Dán **từng file** theo thứ tự mục 1 (file dài thì dán từng hàm).
```text
Đây là <tên file> của DAYORA:
<dán code>
1) Tóm tắt file làm gì trong 3 câu.
2) Đi qua từng hàm: đầu vào, đầu ra, bước quan trọng; chỉ số dòng.
3) Khái niệm nào trong danh sách sau xuất hiện ở đâu: Model, quan hệ 1-n (Category–Product–Sku), enum; Migration và seed khác nhau; Upsert và chạy lại an toàn (idempotent); `DATABASE_URL` (pooler 6543, pgbouncer) vs `DIRECT_URL` (5432); Ẩn mềm (soft hide) thay vì xóa; Cấm tự khóa tài khoản admin.
4) Hỏi tôi 3 câu. Chỉ khi tôi trả lời đúng mới sang file tiếp.
```
Tự kiểm: mở file trong VS Code, tìm đúng dòng AI chỉ. **AI có thể chỉ sai dòng hoặc bịa hàm**: ghi lại nếu gặp.

### Bước 3 — Dự đoán rồi thử (AI-P1-BD2-03)
Viết dự đoán **trước** khi chạy, rồi mới chạy.
```text
Tôi đếm số SKU bằng Prisma Studio (`npx prisma studio -w api` hoặc Supabase Table Editor), chạy seed lần nữa, đếm lại. Tôi dự đoán <số>.
Đừng nói kết quả. Hãy hỏi tôi vì sao tôi dự đoán vậy, rồi hướng dẫn tôi cách chạy và cách đọc kết quả.
```
Ghi vào AI-LOG: dự đoán, kết quả thật, giải thích chỗ khác nhau.

### Bước 4 — Học từ tình huống thật (AI-P1-BD2-04)
Chọn 1 tình huống ở mục 4, dán phần **Dấu hiệu** (chưa dán lời giải).
```text
Đây là một lỗi hay gặp khi làm phần này của DAYORA:
<dán phần Dấu hiệu>
Đừng nói lời giải. Hỏi tôi từng câu gợi ý để tôi tự tìm ra nguyên nhân gốc. Sau đó tôi sẽ dán phần Nguyên nhân và Cách tránh trong tài liệu để bạn so với suy luận của tôi.
```
Ghi AI-LOG: suy luận của bạn khác lời giải thật ở đâu.

### Bước 5 — Tự xây phần của bạn (AI-P1-BD2-05, mỗi task PRJ một mục log)
Xem mục 6. AI chỉ **hướng dẫn và review**, bạn tự gõ code. Làm task PRJ trước, bài tập mở rộng sau.
```text
Tôi đang tự viết PRJ-P1-BD2-1 "Seed catalog: 6 nhóm, 30 SKU, phí giao, admin, RuleSet v1" của dự án DAYORA.
File tôi phải viết: apps/api/prisma/seed.ts (phần catalog, ShippingRate, admin, RuleSet).
1) Giúp tôi liệt kê các bước làm theo thứ tự.
Đừng viết code thay tôi. Chờ tôi làm xong mỗi bước. Khi tôi dán lỗi test hoặc git diff, chỉ ra chỗ sai và vì sao, gợi ý hướng sửa chứ không đưa code hoàn chỉnh.
```
Khi kiểm chứng đạt hoặc kẹt quá 1 buổi: ghi vào log cá nhân việc đã làm, chỗ kẹt và cách gỡ (xem [ROADMAP](../../ROADMAP.md)).

### Bước 6 — Luyện bảo vệ (AI-P1-BD2-06)
```text
Đóng vai giảng viên chấm đồ án. Phần tôi phụ trách ở P1: Hiểu cấu trúc dữ liệu: bảng nào, quan hệ nào, dữ liệu mẫu vào database thế nào.
Hỏi tôi lần lượt (mỗi câu tôi trả lời trong 30 giây, không xem code):
1. Thêm trường "trọng lượng" cho SKU thì cần những bước nào?
2. Vì sao không xóa cứng sản phẩm đã có đơn?
3. pgbouncer là gì, vì sao migration không chạy qua nó?
Sau đó hỏi thêm 2 câu vặn dựa trên câu trả lời của tôi, ra 1 yêu cầu sửa code nhỏ. Chấm từng câu và nói tôi cần học lại gì.
```

### Bước 7 — Ghi nhật ký AI
Nối thêm một mục vào log cá nhân `docs/ai-logs/<tên>.md` theo [quy tắc ghi log](../../ai-logs/ai-logging-rules.md) (đủ 7 trường, có mã phiên và mã mục, chỉ nối thêm). Phần **Phản biện**, **Quyết định của nhóm**, **Người kiểm tra** phải tự viết.

## 6. Nhiệm vụ xây dựng (commit đứng tên bạn)
Quy trình chung: [ROADMAP](../../ROADMAP.md).

### PRJ-P1-BD2-1 — Seed catalog: 6 nhóm, 30 SKU, phí giao, admin, RuleSet v1
- **File phải viết:** `apps/api/prisma/seed.ts` (phần catalog, ShippingRate, admin, RuleSet)
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** PRJ-P0-BD2-1
- **Kiểm chứng:** chạy trên database nhóm, đối chiếu số liệu (số bảng, số SKU, kết quả API mẫu) với `REQUIREMENTS.md` và `docs/DECISIONS.md`; dán kết quả vào PR.
- **Nhánh:** `prj/p1-bd2-1` · **Reviewer:** BD1 Hoàn
- **Các bước:**
  - [ ] 1. `seed.ts` khung: tạo `PrismaClient`, hàm `main()`, đóng kết nối ở `finally` — Xong khi: `npm run db:seed -w api` chạy không lỗi
  - [ ] 2. 6 nhóm hàng (`Category`) và bảng `ShippingRate` theo D02, dùng `upsert` (chạy lại không nhân đôi) — Xong khi: chạy seed 2 lần vẫn 6 dòng Category
  - [ ] 3. 26 sản phẩm, 30 SKU (giá, chất liệu, `capacityPeople`, `useType`) lấy theo `docs/catalog/SKU-INVENTORY.md`; viết `validateCatalog()` kiểm đủ 30 mã, không trùng — Xong khi: `select count(*) from "Sku"` = 30
  - [ ] 4. Admin từ `SEED_ADMIN_EMAIL`/`SEED_ADMIN_PASSWORD` (thiếu thì in cảnh báo và bỏ qua cả admin lẫn RuleSet, không có mật khẩu mặc định), mật khẩu băm như `auth/password.ts` — Xong khi: đăng nhập admin được qua `POST /api/auth/login`
  - [ ] 5. RuleSet v1 `PUBLISHED` theo `docs/catalog/KIT-RULES-PROPOSAL.md` — Xong khi: bảng `RuleSet` có 1 dòng version 1
  - [ ] 6. Đối chiếu số liệu với REQUIREMENTS: số dòng từng bảng, `GET /api/products?category=…` đúng nhóm hàng — Xong khi: bảng đối chiếu có trong PR

### PRJ-P1-BD2-2 — API admin tài khoản
- **File phải viết:** `apps/api/src/admin-users/`
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** PRJ-P1-BD1-1
- **Kiểm chứng:** test `me.spec.ts` cần cả `me/` và `admin-users/`: merge task này trước, sau đó test chạy xanh ở PRJ-P1-BD1-4. Trong lúc chờ, gọi thử `GET/PATCH /api/admin/users` bằng tài khoản admin, dán kết quả vào PR.
- **Nhánh:** `prj/p1-bd2-2` · **Reviewer:** BD1 Hoàn
- **Các bước:**
  - [ ] 1. `admin-users.dto.ts`: `UserQueryDto` (`q` ≤ 100 ký tự, `page` ≥ 1), `UserStatusDto` (`isActive` boolean) — Xong khi: build xanh
  - [ ] 2. `admin-users.service.ts` `list(query)`: tìm theo email/tên, phân trang, `select` không có `passwordHash`, kèm số đơn (`_count.orders`) — Xong khi: gọi bằng admin trả danh sách không có hash
  - [ ] 3. `update(actorId, id, isActive)`: chặn tự khóa chính mình (400 "Không thể tự khóa tài khoản") — Xong khi: tự khóa bị 400
  - [ ] 4. `admin-users.controller.ts`: `@Controller('admin/users')` + `JwtAuthGuard`, `RolesGuard`, `@Roles('ADMIN')`; khai module vào `app.module.ts` — Xong khi: khách gọi bị 403, chưa đăng nhập bị 401
  - [ ] 5. Test `me.spec.ts` chỉ xanh khi có cả `me/` của PRJ-P1-BD1-4: merge task này trước, báo BD1 Hoàn — Xong khi: PR có ảnh gọi `GET/PATCH /api/admin/users` thật

### PRJ-P1-BD2-3 — API admin danh mục, sản phẩm, SKU
- **File phải viết:** `apps/api/src/admin-catalog/`
- **Test nghiệm thu:** `apps/api/src/admin-catalog/admin-catalog.spec.ts`
- **Phải merge trước:** PRJ-P1-BD1-1
- **Kiểm chứng:** viết test ở dòng trên **trước** khi code (commit riêng, QA duyệt ca test). Sau khi QA duyệt, không sửa test cho dễ pass; cần đổi thì ghi lý do trong PR.
- **Nhánh:** `prj/p1-bd2-3` · **Reviewer:** BD1 Hoàn
- **Các bước:**
  - [ ] 1. `admin-catalog.dto.ts`: DTO tạo/sửa Category, Product, Sku; giá là số nguyên ≥ 0, giá giảm < giá; `code` SKU không có trong DTO sửa (không đổi được) — Xong khi: test "rejects invalid prices and immutable SKU codes" xanh
  - [ ] 2. Controller `@Controller('admin')` + guard ADMIN: `GET/POST/PATCH` categories, products, skus — Xong khi: test "requires authentication and admin role" xanh
  - [ ] 3. Service sửa SKU: kiểm với giá hiện có và `reserved` (không hạ `stock` dưới `reserved`) — Xong khi: test "validates updates against existing price and reservations" xanh
  - [ ] 4. Ẩn: `PATCH products/:id/hide`, `skus/:id/hide` đặt trạng thái INACTIVE, không xóa dòng — Xong khi: test "hides product and SKU by setting inactive" xanh
  - [ ] 5. Trùng slug: bắt lỗi Prisma `P2002` → 409 khi tạo và sửa — Xong khi: `npm test -w api -- admin-catalog` xanh 5/5

### Bài tập mở rộng (sau khi xong task PRJ): Sơ đồ ERD bằng Mermaid
- **File:** `docs/report/database/ERD.md` (mới)
- **Các bước:**
  1. Đọc `schema.prisma`, liệt kê model và quan hệ.
  2. Viết sơ đồ `erDiagram` Mermaid (Obsidian hiển thị được).
  3. Dưới sơ đồ, mỗi bảng 1 câu giải thích bằng lời của bạn.
- **Xong khi:** Sơ đồ khớp schema, BD1 duyệt.
- **Quy trình git:** nhánh `study/bd2-p1` → PR → **BD1 Hoàn** review → merge.

## 7. Bằng chứng cần có trước khi sang phase sau
- [ ] Tối thiểu 4 mục AI-LOG thật (AI-P1-BD2-01 … AI-P1-BD2-06), mỗi mục có phần kiểm tra và tự giải thích.
- [ ] Mọi task PRJ của phase đã merge: test nghiệm thu pass, ảnh/diff đối chiếu trong PR; link PR ghi vào [LP-BD2-Chau](LP-BD2-Chau.md).
- [ ] Trả lời được các câu ở bước 6 không cần xem code.
- [ ] Cập nhật bảng tiến độ trong [LP-BD2-Chau](LP-BD2-Chau.md).
