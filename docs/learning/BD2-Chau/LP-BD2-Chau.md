---
tags: [learning, member/BD2]
member: Châu
role: BD2
---
# BD2 Châu — Backend 2 — quản trị, dữ liệu

Lộ trình học riêng của bạn. Cách học chung, quy trình commit và AI-LOG: [LEARNING-PATH](../LEARNING-PATH.md). Lỗi hay gặp để học tư duy: [PITFALLS](../PITFALLS.md).

## Phần code bạn sở hữu
Bạn phải giải thích và tự sửa được các phần này khi GV hỏi. Người review PR của bạn: **BD1 Hoàn**.
- `apps/api/prisma/`
- `apps/api/prisma.config.ts`
- `apps/api/src/admin-catalog/`
- `apps/api/src/admin-users/`
- `apps/api/src/cart/`
- `apps/api/src/orders/orders.service.ts`
- `apps/api/src/admin-orders/`
- `apps/api/src/admin-rulesets/`
- `apps/api/src/admin-dashboard/`
- `apps/api/src/common/`

## Lộ trình 5 phase
| Phase | Mục tiêu học | File |
|---|---|---|
| [P1](LP-BD2-Chau-P1.md) | Hiểu cấu trúc dữ liệu: bảng nào, quan hệ nào, dữ liệu mẫu vào database thế nào. | `LP-BD2-Chau-P1.md` |
| [P2](LP-BD2-Chau-P2.md) | Hiểu giỏ hàng và xem trước đơn: server tính giá, phát hiện giá đổi. | `LP-BD2-Chau-P2.md` |
| [P3](LP-BD2-Chau-P3.md) | Hiểu vòng đời đơn hàng: sơ đồ trạng thái D08, hủy, hết hạn giữ tồn. | `LP-BD2-Chau-P3.md` |
| [P4](LP-BD2-Chau-P4.md) | Hiểu RuleSet: dữ liệu quy tắc Kit, kiểm tra hợp lệ, phiên bản. | `LP-BD2-Chau-P4.md` |
| [P5](LP-BD2-Chau-P5.md) | Hiểu phát hành RuleSet an toàn, dashboard đúng công thức, các lớp bảo mật chung. | `LP-BD2-Chau-P5.md` |

## Nhiệm vụ xây dựng của bạn (commit đứng tên bạn)
Bạn tự xây phần này trong repo nhóm. Quy trình: [ROADMAP](../../ROADMAP.md).

| Mã | Phase | Việc | Test nghiệm thu | Phải merge trước |
|---|---|---|---|---|
| PRJ-P0-BD2-1 | P0 | Schema + migration đầu | — | PRJ-P0-DO-1 |
| PRJ-P1-BD2-1 | P1 | Seed catalog: 6 nhóm, 30 SKU, phí giao, admin, RuleSet v1 | — | PRJ-P0-BD2-1 |
| PRJ-P1-BD2-2 | P1 | API admin tài khoản | — | PRJ-P1-BD1-1 |
| PRJ-P1-BD2-3 | P1 | API admin danh mục, sản phẩm, SKU | 1 file | PRJ-P1-BD1-1 |
| PRJ-P2-BD2-1 | P2 | API giỏ hàng | 1 file | PRJ-P1-BD1-1 |
| PRJ-P2-BD2-2 | P2 | Xem trước đơn (preview) | 1 file | PRJ-P2-BD2-1, PRJ-P2-BD1-1 |
| PRJ-P2-BD2-3 | P2 | Seed voucher DAYORA10, PICNIC50K + 1 khuyến mãi | — | PRJ-P1-BD2-1 |
| PRJ-P3-BD2-1 | P3 | Admin đơn hàng theo sơ đồ D08 | 1 file | PRJ-P2-BD1-2 |
| PRJ-P4-BD2-1 | P4 | Kit service + API /kits | — | PRJ-P4-BD1-1 |
| PRJ-P4-BD2-2 | P4 | RuleSet: tạo nháp, sửa, kiểm hợp lệ, phát hành | 1 file | — |
| PRJ-P5-BD2-1 | P5 | Dashboard thống kê D10 | 2 file | PRJ-P4-BD2-2 |
| PRJ-P5-BD2-2 | P5 | Bảo mật chung: header, rate limit, lọc lỗi 500, ValidationPipe | 1 file | — |

### Việc P0 (28/10–03/11, trước khi vào P1)
### PRJ-P0-BD2-1 — Schema + migration đầu
- **File phải viết:** `apps/api/prisma/schema.prisma`; `apps/api/prisma/migrations/`; `apps/api/prisma.config.ts`
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** PRJ-P0-DO-1
- **Kiểm chứng:** chạy trên database nhóm, đối chiếu số liệu (số bảng, số SKU, kết quả API mẫu) với `REQUIREMENTS.md` và `docs/DECISIONS.md`; dán kết quả vào PR.
- **Nhánh:** `prj/p0-bd2-1` · **Reviewer:** BD1 Hoàn
- **Các bước:**
  - [ ] 1. Đọc [DECISIONS](../../DECISIONS.md) D06–D08 (giữ tồn, callback muộn, 3 trục trạng thái) và [ARCHITECTURE](../../ARCHITECTURE.md) mục "Dữ liệu chính" — Xong khi: tự vẽ được sơ đồ 18 bảng trên giấy
  - [ ] 2. `schema.prisma`: `generator`, `datasource`, 7 enum (`Role`, `ProductStatus`, `Scenario`, `OrderStatus`, `PaymentStatus`, `ShippingStatus`, `RuleSetStatus`) — Xong khi: `cd apps/api && npx prisma validate` không lỗi
  - [ ] 3. Nhóm bán hàng: `User`, `Category`, `Product`, `Sku` (có `stock`, `reserved`, `capacityPeople`, `useType`), `ViewedProduct` — Xong khi: validate xanh
  - [ ] 4. Nhóm mua hàng: `Cart`, `CartItem`, `Voucher`, `VoucherUsage`, `Promotion`, `ShippingRate`, `Order`, `OrderItem`, `OrderStatusLog`, `Payment`, `Review` (nhớ các `@@unique`) — Xong khi: validate xanh
  - [ ] 5. Kit: `RuleSet` (`version` duy nhất, `rules` kiểu Json), `RuleChangeLog` — Xong khi: validate xanh
  - [ ] 6. `prisma.config.ts` (migration dùng `DIRECT_URL`), rồi `npm run db:migrate -w api -- --name init` trên Supabase (chưa có Supabase nhóm của PRJ-P1-DO-1 thì dùng project cá nhân) — Xong khi: Supabase → Table Editor thấy đủ 18 bảng

## Lỗi hay gặp bạn nên đọc kỹ
- [B4. Chạy lại seed làm sai tồn kho](../PITFALLS.md#b4)
- [B5. Email admin viết hoa không đăng nhập được](../PITFALLS.md#b5)
- [B1. Dữ liệu nguồn mâu thuẫn](../PITFALLS.md#b1)
- [C2. Không tin giá trình duyệt gửi lên](../PITFALLS.md#c2)
- [D3. Gửi thừa trường bị 400](../PITFALLS.md#d3)
- [C4. VNPay gọi IPN hai lần, hoặc gọi trễ](../PITFALLS.md#c4)
- [B3. Schema thiếu trường, không sửa schema](../PITFALLS.md#b3)
- [C3. Kit Builder chọn hàng "rẻ" mà tổng lại đắt](../PITFALLS.md#c3)
- [C6. Rate limit sau proxy](../PITFALLS.md#c6)
- [E3. Test pass chưa chắc đúng: mock và database thật](../PITFALLS.md#e3)

## Tài liệu chính thức nên mở song song
- https://www.prisma.io/docs
- https://docs.nestjs.com
- https://supabase.com/docs/guides/database/connecting-to-postgres
- https://www.postgresql.org/docs/current/explicit-locking.html

## Theo dõi tiến độ của bạn
| Mã task | PR (link) | Test pass | Ảnh/diff | Mục AI-LOG | Ngày merge |
|---|---|---|---|---|---|
| PRJ-P0-BD2-1 |  |  |  |  |  |
| PRJ-P1-BD2-1 |  |  |  |  |  |
| PRJ-P1-BD2-2 |  |  |  |  |  |
| PRJ-P1-BD2-3 |  |  |  |  |  |
| PRJ-P2-BD2-1 |  |  |  |  |  |
| PRJ-P2-BD2-2 |  |  |  |  |  |
| PRJ-P2-BD2-3 |  |  |  |  |  |
| PRJ-P3-BD2-1 |  |  |  |  |  |
| PRJ-P4-BD2-1 |  |  |  |  |  |
| PRJ-P4-BD2-2 |  |  |  |  |  |
| PRJ-P5-BD2-1 |  |  |  |  |  |
| PRJ-P5-BD2-2 |  |  |  |  |  |

| Phase | Tiêu chí học đạt |
|---|---|
| P1 | __/6 |
| P2 | __/5 |
| P3 | __/4 |
| P4 | __/3 |
| P5 | __/5 |
