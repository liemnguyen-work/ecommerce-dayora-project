---
tags: [learning, member/FD2, phase/P1]
---
# P1 · FD2 Phúc

> P1 Catalog, tài khoản, giao diện nền (04/11–10/11) · Tổng quan của bạn: [LP-FD2-Phuc](LP-FD2-Phuc.md) · Hướng dẫn phase: [P1-FD2-Phuc](../../../phases/P1-catalog-accounts/FD2-Phuc/P1-FD2-Phuc.md) · Log của bạn: `docs/ai-logs/phuc.md`

**Mục tiêu:** Hiểu khung khu quản trị và hai mục Sản phẩm, Tài khoản; bắt đầu tách AdminPage thành nhiều file.

Thời lượng gợi ý: cả phase (1 tuần). **Thứ tự làm:**
1. Mục 2 + bước 1 (khái niệm) · đọc issue và tiêu chí xong của task ở mục 6.
2. **Mục 6: viết test hoặc ca kiểm thử trước, rồi tự xây task PRJ** (bước 5). Kẹt quá 1 buổi: hỏi reviewer hoặc PM.
3. Khi kiểm chứng đạt: bước 2 đọc lại code của chính bạn, giải thích được từng file ở mục 1.
4. Mục 3, 4, bước 3, 4, 6, 7: kiểm hiểu biết, tình huống, luyện bảo vệ, AI-LOG.

## 1. File bạn sẽ viết hoặc sửa
1. `apps/web/src/pages/AdminPage.tsx` (export default AdminPage, useLoad, Products, Users)
2. `apps/web/src/lib/api.ts`
3. `apps/web/src/lib/auth.tsx`
4. `apps/api/src/admin-catalog/admin-catalog.controller.ts`
5. `apps/api/src/admin-users/admin-users.controller.ts`

## 2. Kiến thức cần nắm
| # | Khái niệm | Vì sao cần | Thấy ở đâu trong code |
|---|---|---|---|
| 1 | Một file nhiều component → tách module (import/export) | Dễ đọc, dễ chia việc, dễ review | `AdminPage.tsx` 204 dòng, 7 hàm mục |
| 2 | Hook tự viết (`useLoad`) | Gọi API + loading + lỗi dùng chung | `AdminPage.tsx` |
| 3 | Ẩn link Quản trị ở web **và** chặn ở server | Web chỉ tiện, server mới bảo vệ | `SiteHeader.tsx`, `RolesGuard` |
| 4 | Form sửa inline, gọi PATCH, tải lại | Sửa giá/tồn SKU | `Products` |
| 5 | Ẩn mềm | Không phá đơn cũ | `PATCH /admin/products/:id/hide` |

## 3. Tiêu chí đạt (tự đánh dấu, có bằng chứng)
- [ ] Giải thích cấu trúc AdminPage: khung tab + 7 hàm mục + `useLoad`.
- [ ] Giải thích vì sao khách gõ `/admin` vẫn không lấy được dữ liệu (403).
- [ ] Sửa giá một SKU, chứng minh trang sản phẩm đổi theo.
- [ ] Tách `Products` và `Users` ra file riêng mà không đổi hành vi (bài tập).

Đạt khi: mọi ô được đánh dấu **và** mỗi ô có bằng chứng trong AI-LOG hoặc PR (lệnh đã chạy, ảnh, link commit).

## 4. Lỗi hay gặp trong phần này
Đọc tình huống, **tự đoán nguyên nhân trước** rồi mới đọc lời giải.

| Vấn đề | Cách tránh | Đọc thêm |
|---|---|---|
| Đường dẫn trong hướng dẫn cũ (`pages/admin/*.tsx`) không tồn tại | Admin gom trong 1 file; bạn tách dần ra từng phase. | [E5](../PITFALLS.md#e5) |

## 5. Lộ trình prompt (làm lần lượt, mỗi bước một phiên AI)
Mở đầu mỗi phiên bằng prompt "Khởi động phiên" trong [P1-FD2-Phuc](../../../phases/P1-catalog-accounts/FD2-Phuc/P1-FD2-Phuc.md) mục 4.1. **Không dán `.env`, mật khẩu, khóa.** Mỗi bước xong ghi một mục AI-LOG theo mã gợi ý.

### Bước 1 — Hiểu khái niệm (AI-P1-FD2-01)
```text
Tôi là Phúc (FD2) trong dự án DAYORA. Giải thích lần lượt các khái niệm sau bằng ví dụ đời thường, mỗi lần MỘT khái niệm, hỏi tôi 1 câu kiểm tra rồi mới sang khái niệm tiếp theo:
1. Một file nhiều component → tách module (import/export)
2. Hook tự viết (`useLoad`)
3. Ẩn link Quản trị ở web **và** chặn ở server
4. Form sửa inline, gọi PATCH, tải lại
5. Ẩn mềm
Không viết code. Nếu tôi trả lời sai, giải thích lại theo cách khác.
```
Tự kiểm: đóng AI, viết lại mỗi khái niệm 1 câu bằng lời của bạn.

### Bước 2 — Đọc lại code của bạn (AI-P1-FD2-02)
Dán **từng file** theo thứ tự mục 1 (file dài thì dán từng hàm).
```text
Đây là <tên file> của DAYORA:
<dán code>
1) Tóm tắt file làm gì trong 3 câu.
2) Đi qua từng hàm: đầu vào, đầu ra, bước quan trọng; chỉ số dòng.
3) Khái niệm nào trong danh sách sau xuất hiện ở đâu: Một file nhiều component → tách module (import/export); Hook tự viết (`useLoad`); Ẩn link Quản trị ở web **và** chặn ở server; Form sửa inline, gọi PATCH, tải lại; Ẩn mềm.
4) Hỏi tôi 3 câu. Chỉ khi tôi trả lời đúng mới sang file tiếp.
```
Tự kiểm: mở file trong VS Code, tìm đúng dòng AI chỉ. **AI có thể chỉ sai dòng hoặc bịa hàm**: ghi lại nếu gặp.

### Bước 3 — Dự đoán rồi thử (AI-P1-FD2-03)
Viết dự đoán **trước** khi chạy, rồi mới chạy.
```text
Tôi đăng nhập khách thường, gõ `/admin`, mở tab Network. Tôi dự đoán API trả <mã>.
Đừng nói kết quả. Hãy hỏi tôi vì sao tôi dự đoán vậy, rồi hướng dẫn tôi cách chạy và cách đọc kết quả.
```
Ghi vào AI-LOG: dự đoán, kết quả thật, giải thích chỗ khác nhau.

### Bước 4 — Học từ tình huống thật (AI-P1-FD2-04)
Chọn 1 tình huống ở mục 4, dán phần **Dấu hiệu** (chưa dán lời giải).
```text
Đây là một lỗi hay gặp khi làm phần này của DAYORA:
<dán phần Dấu hiệu>
Đừng nói lời giải. Hỏi tôi từng câu gợi ý để tôi tự tìm ra nguyên nhân gốc. Sau đó tôi sẽ dán phần Nguyên nhân và Cách tránh trong tài liệu để bạn so với suy luận của tôi.
```
Ghi AI-LOG: suy luận của bạn khác lời giải thật ở đâu.

### Bước 5 — Tự xây phần của bạn (AI-P1-FD2-05, mỗi task PRJ một mục log)
Xem mục 6. AI chỉ **hướng dẫn và review**, bạn tự gõ code. Làm task PRJ trước, bài tập mở rộng sau.
```text
Tôi đang tự viết PRJ-P1-FD2-1 "Đăng nhập, đăng ký, trạng thái đăng nhập" của dự án DAYORA.
File tôi phải viết: apps/web/src/lib/auth.tsx; apps/web/src/pages/LoginPage.tsx, RegisterPage.tsx.
1) Giúp tôi liệt kê các bước làm theo thứ tự.
Đừng viết code thay tôi. Chờ tôi làm xong mỗi bước. Khi tôi dán lỗi test hoặc git diff, chỉ ra chỗ sai và vì sao, gợi ý hướng sửa chứ không đưa code hoàn chỉnh.
```
Khi kiểm chứng đạt hoặc kẹt quá 1 buổi: ghi vào log cá nhân việc đã làm, chỗ kẹt và cách gỡ (xem [ROADMAP](../../ROADMAP.md)).

### Bước 6 — Luyện bảo vệ (AI-P1-FD2-06)
```text
Đóng vai giảng viên chấm đồ án. Phần tôi phụ trách ở P1: Hiểu khung khu quản trị và hai mục Sản phẩm, Tài khoản; bắt đầu tách AdminPage thành nhiều file.
Hỏi tôi lần lượt (mỗi câu tôi trả lời trong 30 giây, không xem code):
1. Vì sao tách file giúp 2 người làm song song an toàn?
2. Thêm cột "Danh mục" vào bảng sản phẩm thì sửa đâu?
Sau đó hỏi thêm 2 câu vặn dựa trên câu trả lời của tôi, ra 1 yêu cầu sửa code nhỏ. Chấm từng câu và nói tôi cần học lại gì.
```

### Bước 7 — Ghi nhật ký AI
Nối thêm một mục vào log cá nhân `docs/ai-logs/<tên>.md` theo [quy tắc ghi log](../../ai-logs/ai-logging-rules.md) (đủ 7 trường, có mã phiên và mã mục, chỉ nối thêm). Phần **Phản biện**, **Quyết định của nhóm**, **Người kiểm tra** phải tự viết.

## 6. Nhiệm vụ xây dựng (commit đứng tên bạn)
Quy trình chung: [ROADMAP](../../ROADMAP.md).

### PRJ-P1-FD2-1 — Đăng nhập, đăng ký, trạng thái đăng nhập
- **File phải viết:** `apps/web/src/lib/auth.tsx`; `apps/web/src/pages/LoginPage.tsx, RegisterPage.tsx`
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** PRJ-P1-FD1-1, PRJ-P1-BD1-1
- **Kiểm chứng:** ca kiểm thử tay trong `docs/testing/TEST-CASES.md` (QA duyệt); ảnh 1366 px và 390 px trong PR; PD duyệt theo `docs/DESIGN-SYSTEM.md`.
- **Nhánh:** `prj/p1-fd2-1` · **Reviewer:** FD1 Thành
- **Các bước:**
  - [ ] 1. `lib/auth.tsx`: `AuthProvider` gọi `GET /auth/me` khi tải trang, giữ `user`, `loading`; hàm `login`, `register` (tạo xong tự đăng nhập), `logout`; hook `useAuth()` — Xong khi: F5 sau khi đăng nhập vẫn còn đăng nhập
  - [ ] 2. Bọc `<AuthProvider>` trong `main.tsx` — Xong khi: header đọc được `useAuth().user`
  - [ ] 3. `LoginPage.tsx`: một component `AuthPage` dùng cho cả đăng nhập và đăng ký (`register` prop); `RegisterPage.tsx` chỉ gọi `<AuthPage register />` — Xong khi: hai trang dùng chung form
  - [ ] 4. Hiện lỗi từ server (sai mật khẩu, email trùng), khóa nút khi đang gửi — Xong khi: nhập sai thấy thông báo của API
  - [ ] 5. `?next=`: đăng nhập xong quay lại trang trước; chỉ nhận đường dẫn nội bộ bắt đầu bằng `/` (chống chuyển hướng ra trang lạ) — Xong khi: `/login?next=https://example.com` vẫn về `/`

### PRJ-P1-FD2-2 — Khung quản trị + Sản phẩm + Tài khoản
- **File phải viết:** `apps/web/src/pages/AdminPage.tsx` (khung, Products, Users); `apps/web/src/catalog.css` (phần .admin-*)
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** PRJ-P1-FD2-1, PRJ-P1-BD2-3, PRJ-P1-BD2-2
- **Kiểm chứng:** ca kiểm thử tay trong `docs/testing/TEST-CASES.md` (QA duyệt); ảnh 1366 px và 390 px trong PR; PD duyệt theo `docs/DESIGN-SYSTEM.md`.
- **Nhánh:** `prj/p1-fd2-2` · **Reviewer:** FD1 Thành
- **Các bước:**
  - [ ] 1. `AdminPage.tsx` khung: không phải ADMIN (kể cả chưa đăng nhập) → khối "Chỉ tài khoản quản trị mới…", không gọi API admin; menu mục bên trái, mục đang mở lưu trên URL `?muc=` — Xong khi: tài khoản khách không thấy dữ liệu admin, F5 vẫn ở đúng mục
  - [ ] 2. Hàm `useLoad(path)` tải dữ liệu + trạng thái lỗi, dùng chung cho mọi mục — Xong khi: tắt API thì mục báo lỗi
  - [ ] 3. Mục Sản phẩm: bảng SKU (mã, tên, giá, giá giảm, tồn, đang giữ), sửa giá/tồn qua `PATCH /admin/skus/:id`, ẩn sản phẩm — Xong khi: sửa giá rồi tải lại vẫn giữ giá mới
  - [ ] 4. Mục Tài khoản: danh sách `GET /admin/users`, nút khóa/mở (`PATCH /admin/users/:id`) — Xong khi: khóa một khách thì khách đó đăng nhập bị từ chối
  - [ ] 5. CSS `.admin-*` trong `catalog.css`; ảnh 1366 px trong PR — Xong khi: PD duyệt

### Bài tập mở rộng (sau khi xong task PRJ): Tách mục Sản phẩm và Tài khoản ra `pages/admin/`
- **File:** `apps/web/src/pages/AdminPage.tsx`, `apps/web/src/pages/admin/Products.tsx` (mới), `apps/web/src/pages/admin/Users.tsx` (mới), `apps/web/src/pages/admin/useLoad.ts` (mới, nếu cần dùng chung)
- **Các bước:**
  1. Chuyển nguyên hàm `Products`, `Users` sang file mới, `export default`.
  2. Hàm dùng chung (`useLoad`, định dạng tiền) đưa vào file chung, không chép lặp.
  3. Không đổi giao diện, không đổi API.
  4. `npm run build -w web`, `npm run lint -w web`, bấm thử 2 mục.
- **Xong khi:** Build/lint pass, giao diện y như cũ, FD1 duyệt.
- **Quy trình git:** nhánh `study/fd2-p1` → PR → **FD1 Thành** review → merge.

## 7. Bằng chứng cần có trước khi sang phase sau
- [ ] Tối thiểu 4 mục AI-LOG thật (AI-P1-FD2-01 … AI-P1-FD2-06), mỗi mục có phần kiểm tra và tự giải thích.
- [ ] Mọi task PRJ của phase đã merge: test nghiệm thu pass, ảnh/diff đối chiếu trong PR; link PR ghi vào [LP-FD2-Phuc](LP-FD2-Phuc.md).
- [ ] Trả lời được các câu ở bước 6 không cần xem code.
- [ ] Cập nhật bảng tiến độ trong [LP-FD2-Phuc](LP-FD2-Phuc.md).
