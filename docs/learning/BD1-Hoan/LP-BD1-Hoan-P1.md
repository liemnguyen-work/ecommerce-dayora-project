---
tags: [learning, member/BD1, phase/P1]
---
# P1 · BD1 Hoàn

> P1 Catalog, tài khoản, giao diện nền (04/11–10/11) · Tổng quan của bạn: [LP-BD1-Hoan](LP-BD1-Hoan.md) · Hướng dẫn phase: [P1-BD1-Hoan](../../../phases/P1-catalog-accounts/BD1-Hoan/P1-BD1-Hoan.md) · Log của bạn: `docs/ai-logs/hoan.md`

**Mục tiêu:** Hiểu một request đi từ trình duyệt vào NestJS, qua đăng nhập bằng cookie, tới database và quay về.

Thời lượng gợi ý: cả phase (1 tuần). **Thứ tự làm:**
1. Mục 2 + bước 1 (khái niệm) · đọc issue và tiêu chí xong của task ở mục 6.
2. **Mục 6: viết test hoặc ca kiểm thử trước, rồi tự xây task PRJ** (bước 5). Kẹt quá 1 buổi: hỏi reviewer hoặc PM.
3. Khi kiểm chứng đạt: bước 2 đọc lại code của chính bạn, giải thích được từng file ở mục 1.
4. Mục 3, 4, bước 3, 4, 6, 7: kiểm hiểu biết, tình huống, luyện bảo vệ, AI-LOG.

## 1. File bạn sẽ viết hoặc sửa
1. `apps/api/src/main.ts`
2. `apps/api/src/app.module.ts`
3. `apps/api/src/auth/auth.controller.ts`
4. `apps/api/src/auth/auth.service.ts`
5. `apps/api/src/auth/password.ts`
6. `apps/api/src/auth/auth.guard.ts`
7. `apps/api/src/auth/auth.dto.ts`
8. `apps/api/src/catalog/catalog.controller.ts`
9. `apps/api/src/catalog/catalog-query.pipe.ts`
10. `apps/api/src/me/me.service.ts`
11. `apps/api/src/auth/auth.spec.ts`

## 2. Kiến thức cần nắm
| #   | Khái niệm                                                     | Vì sao cần                                                                 | Thấy ở đâu trong code                                     |
| --- | ------------------------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------- |
| 1   | Module / Controller / Service trong NestJS                    | Mọi chức năng API đều chia 3 lớp này                                       | `auth.module.ts`, `auth.controller.ts`, `auth.service.ts` |
| 2   | DTO + ValidationPipe (whitelist, forbidNonWhitelisted)        | Chặn dữ liệu sai và trường thừa như `role`                                 | `auth.dto.ts`, `main.ts`                                  |
| 3   | Băm mật khẩu bằng scrypt + salt, so sánh bằng timingSafeEqual | Không lưu mật khẩu gốc, chống đoán theo thời gian                          | `password.ts`                                             |
| 4   | JWT HS256 tự ký, cookie httpOnly / SameSite=Lax / secure      | Đăng nhập không cần lưu phiên ở server, JS trên trang không đọc được token | `auth.controller.ts` (cookieOptions, maxAge 7 ngày)       |
| 5   | Guard: JwtAuthGuard, RolesGuard, @Roles                       | Ai được gọi route nào                                                      | `auth.guard.ts`                                           |
| 6   | Query params có kiểm tra (Pipe)                               | Lọc catalog an toàn                                                        | `catalog-query.pipe.ts`                                   |
| 7   | IDOR: lấy userId từ token, không từ request                   | Không xem được dữ liệu người khác                                          | `me.controller.ts`                                        |

## 3. Tiêu chí đạt (tự đánh dấu, có bằng chứng)
- [ ] Vẽ được đường đi của `POST /api/auth/login` qua từng file, chỉ đúng tên hàm.
- [ ] Giải thích vì sao mật khẩu được băm với salt riêng và vì sao so sánh dùng `timingSafeEqual`.
- [ ] Giải thích 4 thuộc tính cookie (`httpOnly`, `sameSite`, `secure`, `maxAge`) và hậu quả nếu bỏ từng cái.
- [ ] Giải thích vì sao `/api/me/profile` không nhận `userId` từ URL.
- [ ] Gọi được `GET /api/products?category=TM&sort=price_asc` và đọc hiểu kết quả.
- [ ] Chạy `npm test -w api -- auth` và nói được 3 test kiểm điều gì.
- [ ] Tự thêm một ràng buộc DTO và thấy API trả 400 (bài tập dưới).

Đạt khi: mọi ô được đánh dấu **và** mỗi ô có bằng chứng trong AI-LOG hoặc PR (lệnh đã chạy, ảnh, link commit).

## 4. Lỗi hay gặp trong phần này
Đọc tình huống, **tự đoán nguyên nhân trước** rồi mới đọc lời giải.

| Vấn đề | Cách tránh | Đọc thêm |
|---|---|---|
| Tài khoản bị khóa vẫn dùng được token cũ | Guard tải lại user mỗi request và từ chối `isActive=false`. | [C5](../PITFALLS.md#c5) |
| Gửi kèm `role: ADMIN` khi đăng ký | `forbidNonWhitelisted` trả 400. | [D3](../PITFALLS.md#d3) |
| Email admin viết hoa không đăng nhập được | Chuẩn hóa chữ thường ở cả seed và auth. | [B5](../PITFALLS.md#b5) |

## 5. Lộ trình prompt (làm lần lượt, mỗi bước một phiên AI)
Mở đầu mỗi phiên bằng prompt "Khởi động phiên" trong [P1-BD1-Hoan](../../../phases/P1-catalog-accounts/BD1-Hoan/P1-BD1-Hoan.md) mục 4.1. **Không dán `.env`, mật khẩu, khóa.** Mỗi bước xong ghi một mục AI-LOG theo mã gợi ý.

### Bước 1 — Hiểu khái niệm (AI-P1-BD1-01)
```text
Tôi là Hoàn (BD1) trong dự án DAYORA. Giải thích lần lượt các khái niệm sau bằng ví dụ đời thường, mỗi lần MỘT khái niệm, hỏi tôi 1 câu kiểm tra rồi mới sang khái niệm tiếp theo:
1. Module / Controller / Service trong NestJS
2. DTO + ValidationPipe (whitelist, forbidNonWhitelisted)
3. Băm mật khẩu bằng scrypt + salt, so sánh bằng timingSafeEqual
4. JWT HS256 tự ký, cookie httpOnly / SameSite=Lax / secure
5. Guard: JwtAuthGuard, RolesGuard, @Roles
6. Query params có kiểm tra (Pipe)
7. IDOR: lấy userId từ token, không từ request
Không viết code. Nếu tôi trả lời sai, giải thích lại theo cách khác.
```
Tự kiểm: đóng AI, viết lại mỗi khái niệm 1 câu bằng lời của bạn.

### Bước 2 — Đọc lại code của bạn (AI-P1-BD1-02)
Dán **từng file** theo thứ tự mục 1 (file dài thì dán từng hàm).
```text
Đây là <tên file> của DAYORA:
<dán code>
1) Tóm tắt file làm gì trong 3 câu.
2) Đi qua từng hàm: đầu vào, đầu ra, bước quan trọng; chỉ số dòng.
3) Khái niệm nào trong danh sách sau xuất hiện ở đâu: Module / Controller / Service trong NestJS; DTO + ValidationPipe (whitelist, forbidNonWhitelisted); Băm mật khẩu bằng scrypt + salt, so sánh bằng timingSafeEqual; JWT HS256 tự ký, cookie httpOnly / SameSite=Lax / secure; Guard: JwtAuthGuard, RolesGuard, @Roles; Query params có kiểm tra (Pipe); IDOR: lấy userId từ token, không từ request.
4) Hỏi tôi 3 câu. Chỉ khi tôi trả lời đúng mới sang file tiếp.
```
Tự kiểm: mở file trong VS Code, tìm đúng dòng AI chỉ. **AI có thể chỉ sai dòng hoặc bịa hàm**: ghi lại nếu gặp.

### Bước 3 — Dự đoán rồi thử (AI-P1-BD1-03)
Viết dự đoán **trước** khi chạy, rồi mới chạy.
```text
Tôi sẽ gửi `POST /api/auth/register` kèm trường thừa `"role": "ADMIN"`. Tôi dự đoán API trả <dự đoán của tôi>. Sau đó tôi sẽ đăng nhập rồi xóa cookie `access_token` trong DevTools và gọi `/api/me/profile`.
Đừng nói kết quả. Hãy hỏi tôi vì sao tôi dự đoán vậy, rồi hướng dẫn tôi cách chạy và cách đọc kết quả.
```
Ghi vào AI-LOG: dự đoán, kết quả thật, giải thích chỗ khác nhau.

### Bước 4 — Học từ tình huống thật (AI-P1-BD1-04)
Chọn 1 tình huống ở mục 4, dán phần **Dấu hiệu** (chưa dán lời giải).
```text
Đây là một lỗi hay gặp khi làm phần này của DAYORA:
<dán phần Dấu hiệu>
Đừng nói lời giải. Hỏi tôi từng câu gợi ý để tôi tự tìm ra nguyên nhân gốc. Sau đó tôi sẽ dán phần Nguyên nhân và Cách tránh trong tài liệu để bạn so với suy luận của tôi.
```
Ghi AI-LOG: suy luận của bạn khác lời giải thật ở đâu.

### Bước 5 — Tự xây phần của bạn (AI-P1-BD1-05, mỗi task PRJ một mục log)
Xem mục 6. AI chỉ **hướng dẫn và review**, bạn tự gõ code. Làm task PRJ trước, bài tập mở rộng sau.
```text
Tôi đang tự viết PRJ-P1-BD1-1 "Đăng ký, đăng nhập, guard" của dự án DAYORA.
File tôi phải viết: apps/api/src/auth/.
Test nghiệm thu phải pass (không được sửa test): <dán nội dung apps/api/src/auth/auth.spec.ts>
1) Đọc test, giải thích test yêu cầu hàm/route nào, trả về gì.
2) Giúp tôi liệt kê các bước cài đặt theo thứ tự, mỗi bước chạy được test.
Đừng viết code thay tôi. Chờ tôi làm xong mỗi bước. Khi tôi dán lỗi test hoặc git diff, chỉ ra chỗ sai và vì sao, gợi ý hướng sửa chứ không đưa code hoàn chỉnh.
```
Khi kiểm chứng đạt hoặc kẹt quá 1 buổi: ghi vào log cá nhân việc đã làm, chỗ kẹt và cách gỡ (xem [ROADMAP](../../ROADMAP.md)).

### Bước 6 — Luyện bảo vệ (AI-P1-BD1-06)
```text
Đóng vai giảng viên chấm đồ án. Phần tôi phụ trách ở P1: Hiểu một request đi từ trình duyệt vào NestJS, qua đăng nhập bằng cookie, tới database và quay về.
Hỏi tôi lần lượt (mỗi câu tôi trả lời trong 30 giây, không xem code):
1. Nếu GV bảo "cho đăng nhập bằng số điện thoại" thì sửa những file nào?
2. Cookie `SameSite=Lax` chống được kiểu tấn công nào?
3. Vì sao lỗi đăng nhập không nói rõ "sai email" hay "sai mật khẩu"?
Sau đó hỏi thêm 2 câu vặn dựa trên câu trả lời của tôi, ra 1 yêu cầu sửa code nhỏ. Chấm từng câu và nói tôi cần học lại gì.
```

### Bước 7 — Ghi nhật ký AI
Nối thêm một mục vào log cá nhân `docs/ai-logs/<tên>.md` theo [quy tắc ghi log](../../ai-logs/ai-logging-rules.md) (đủ 7 trường, có mã phiên và mã mục, chỉ nối thêm). Phần **Phản biện**, **Quyết định của nhóm**, **Người kiểm tra** phải tự viết.

## 6. Nhiệm vụ xây dựng (commit đứng tên bạn)
Quy trình chung: [ROADMAP](../../ROADMAP.md).

### PRJ-P1-BD1-1 — Đăng ký, đăng nhập, guard
- **File phải viết:** `apps/api/src/auth/`
- **Test nghiệm thu:** `apps/api/src/auth/auth.spec.ts`
- **Phải merge trước:** PRJ-P0-BD2-1
- **Kiểm chứng:** viết test ở dòng trên **trước** khi code (commit riêng, QA duyệt ca test). Sau khi QA duyệt, không sửa test cho dễ pass; cần đổi thì ghi lý do trong PR.
- **Nhánh:** `prj/p1-bd1-1` · **Reviewer:** BD2 Châu
- **Các bước:**
  - [ ] 1. `password.ts`: `hashPassword` (scrypt + salt ngẫu nhiên), `verifyPassword` so bằng `timingSafeEqual` — Xong khi: ca "random salt" trong `auth.spec.ts` (bạn viết ở bước test) xanh
  - [ ] 2. `auth.service.ts`: constructor bắt buộc `JWT_SECRET`; `signToken`/`verifyToken` tự ký HS256, hết hạn 7 ngày — Xong khi: ca "expired or incorrectly signed" trong `auth.spec.ts` (bạn viết ở bước test) xanh
  - [ ] 3. `auth.dto.ts` (`LoginDto`, `RegisterDto`: email hạ chữ thường, mật khẩu ≥ 8) và `register`: trùng email kể cả tạo đồng thời → 409 — Xong khi: ca "duplicates", "validates DTO" trong `auth.spec.ts` (bạn viết ở bước test) xanh
  - [ ] 4. `login`: sai email, sai mật khẩu, tài khoản khóa đều trả cùng một thông báo 401 — Xong khi: ca "same message" trong `auth.spec.ts` (bạn viết ở bước test) xanh
  - [ ] 5. `auth.guard.ts`: `JwtAuthGuard` đọc cookie `access_token`, tải user còn active; `RolesGuard` + `@Roles` — Xong khi: ca "admin roles" trong `auth.spec.ts` (bạn viết ở bước test) xanh
  - [ ] 6. `auth.controller.ts`: `register`, `login` (đặt cookie httpOnly, `sameSite: 'lax'`, `secure` khi production), `logout`, `me`; khai `AuthModule` vào `app.module.ts` — Xong khi: thử bằng `curl -c` thấy cookie `HttpOnly`

### PRJ-P1-BD1-2 — API catalog (lọc, sắp xếp, chi tiết)
- **File phải viết:** `apps/api/src/catalog/`
- **Test nghiệm thu:** `apps/api/src/catalog/catalog.spec.ts`
- **Phải merge trước:** PRJ-P0-BD2-1
- **Kiểm chứng:** viết test ở dòng trên **trước** khi code (commit riêng, QA duyệt ca test). Sau khi QA duyệt, không sửa test cho dễ pass; cần đổi thì ghi lý do trong PR.
- **Nhánh:** `prj/p1-bd1-2` · **Reviewer:** BD2 Châu
- **Các bước:**
  - [ ] 1. `catalog-query.pipe.ts`: `CatalogQueryPipe` đổi query (`q`, `category`, `scenario`, `material`, `minPrice`, `maxPrice`, `capacity`, `size`, `sort`) thành kiểu rõ ràng, giá trị lạ → 400 — Xong khi: 2 test `describe CatalogQueryPipe` xanh
  - [ ] 2. `catalog.service.ts` danh sách: chỉ sản phẩm và SKU ACTIVE; mọi bộ lọc áp trên **cùng một SKU** (không ghép giá SKU nhỏ với sức chứa SKU lớn); từ khóa đi qua Prisma, không ghép chuỗi SQL — Xong khi: 4 test đầu của `describe CatalogService` xanh
  - [ ] 3. Giá dùng `salePrice ?? price` (kể cả 0) để lọc, sắp xếp theo giá nhỏ nhất của SKU khớp, giá bằng nhau thì thứ tự ổn định — Xong khi: test "dùng giá giảm" và "sắp xếp theo giá nhỏ nhất" xanh
  - [ ] 4. Chi tiết `GET /products/:slug`: thông số, tồn khả dụng = `stock - reserved` theo SKU, sản phẩm liên quan cùng nhóm; slug không có hoặc đã ẩn → 404 — Xong khi: 2 test chi tiết xanh
  - [ ] 5. `GET /categories` chỉ nhóm có hàng ACTIVE; controller + module khai vào `app.module.ts` — Xong khi: `npm test -w api -- catalog` xanh 13/13

### PRJ-P1-BD1-3 — API ưu đãi công khai
- **File phải viết:** `apps/api/src/promotions/promotions.*.ts`
- **Test nghiệm thu:** `apps/api/src/promotions/promotions.spec.ts`
- **Phải merge trước:** không
- **Kiểm chứng:** viết test ở dòng trên **trước** khi code (commit riêng, QA duyệt ca test). Sau khi QA duyệt, không sửa test cho dễ pass; cần đổi thì ghi lý do trong PR.
- **Nhánh:** `prj/p1-bd1-3` · **Reviewer:** BD2 Châu
- **Các bước:**
  - [ ] 1. `promotions.service.ts`: lấy khuyến mãi `isActive` và đang trong thời gian, so với **cùng một** `now` cho cả hai đầu khoảng; chỉ `select` trường công khai; `orderBy` cố định — Xong khi: test "lọc active" xanh
  - [ ] 2. Lấy `new Date()` mới ở mỗi request (không tạo một lần lúc khởi động); lỗi DB để Nest trả 500 — Xong khi: test "lấy thời gian mới mỗi request" xanh
  - [ ] 3. `promotions.controller.ts` `GET /promotions` (công khai) + `promotions.module.ts` khai vào `app.module.ts` — Xong khi: `npm test -w api -- promotions` xanh 3/3

### PRJ-P1-BD1-4 — Hồ sơ, đổi mật khẩu, sản phẩm đã xem
- **File phải viết:** `apps/api/src/me/`
- **Test nghiệm thu:** `apps/api/src/me/me.spec.ts`
- **Phải merge trước:** PRJ-P1-BD2-2
- **Kiểm chứng:** viết test ở dòng trên **trước** khi code (commit riêng, QA duyệt ca test). Sau khi QA duyệt, không sửa test cho dễ pass; cần đổi thì ghi lý do trong PR.
- **Nhánh:** `prj/p1-bd1-4` · **Reviewer:** BD2 Châu
- **Các bước:**
  - [ ] 1. Chờ PRJ-P1-BD2-2 (admin-users) merge: test này gọi cả hai module — Xong khi: `main` đã có `apps/api/src/admin-users/`
  - [ ] 2. `me.dto.ts` + `me.controller.ts` `@Controller('me')` có `JwtAuthGuard` — Xong khi: test "yêu cầu đăng nhập" xanh
  - [ ] 3. `me.service.ts` `profile`/`updateProfile`: không bao giờ `select` `passwordHash` — Xong khi: test "xem và sửa hồ sơ" xanh
  - [ ] 4. `password`: kiểm mật khẩu cũ bằng `verifyPassword`, lưu hash mới bằng `hashPassword` — Xong khi: test "đổi mật khẩu" xanh
  - [ ] 5. `recordViewed` dùng `upsert` (xem lại chỉ cập nhật thời gian), bỏ qua sản phẩm ẩn/không có; `viewed` trả tối đa 12 sản phẩm mới nhất dạng thẻ — Xong khi: `npm test -w api -- me` xanh 6/6

### Bài tập mở rộng (sau khi xong task PRJ): Thêm giới hạn độ dài cho DTO đăng nhập/đăng ký
- **File:** `apps/api/src/auth/auth.dto.ts`, `apps/api/src/auth/auth.spec.ts`
- **Các bước:**
  1. Đọc `auth.dto.ts`: hiện chưa có `@MaxLength`.
  2. Thêm `@MaxLength` hợp lý cho email (254), mật khẩu (72–128), họ tên (100).
  3. Viết 1 test: mật khẩu 500 ký tự → 400.
  4. Chạy `npm test -w api -- auth`, `npm run lint -w api`.
- **Xong khi:** Test mới pass, các test cũ không đổi, PR được BD2 duyệt.
- **Quy trình git:** nhánh `study/bd1-p1` → PR → **BD2 Châu** review → merge.

## 7. Bằng chứng cần có trước khi sang phase sau
- [ ] Tối thiểu 4 mục AI-LOG thật (AI-P1-BD1-01 … AI-P1-BD1-06), mỗi mục có phần kiểm tra và tự giải thích.
- [ ] Mọi task PRJ của phase đã merge: test nghiệm thu pass, ảnh/diff đối chiếu trong PR; link PR ghi vào [LP-BD1-Hoan](LP-BD1-Hoan.md).
- [ ] Trả lời được các câu ở bước 6 không cần xem code.
- [ ] Cập nhật bảng tiến độ trong [LP-BD1-Hoan](LP-BD1-Hoan.md).
