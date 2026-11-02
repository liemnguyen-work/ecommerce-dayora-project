---
tags: [learning, member/FD2, phase/P6]
---
# P6 · FD2 Phúc

> P6 Kiểm thử tổng, Innovation (09/12–15/12) · Tổng quan của bạn: [LP-FD2-Phuc](LP-FD2-Phuc.md) · Hướng dẫn phase: [P6-FD2-Phuc](../../../phases/P6-testing-innovation/FD2-Phuc/P6-FD2-Phuc.md) · Log của bạn: `docs/ai-logs/phuc.md`

**Mục tiêu:** Làm trang quản trị dùng được trên điện thoại 390 px; nối nút đăng nhập Google/Facebook phía web với API của BD1.

Thứ tự làm: mục 2 → viết test/ca kiểm thử → **mục 6 tự xây** → mục 3, 4.

## 1. File bạn sẽ viết hoặc sửa
1. `apps/web/src/pages/AdminPage.tsx` (bảng `data-label`, tìm `q`, phân trang, chi tiết đơn)
2. `apps/web/src/catalog.css` (khối `@media (max-width: 767px)` của admin)
3. `apps/web/src/pages/LoginPage.tsx`, `apps/web/src/lib/auth.tsx` (nút Google/Facebook, trang callback)
4. `apps/web/src/pages/PrivacyPage.tsx`, route trong `apps/web/src/App.tsx`
5. Luồng: [ARCHITECTURE](../../ARCHITECTURE.md) mục 4.2

## 2. Kiến thức cần nắm
| # | Khái niệm | Vì sao cần | Thấy ở đâu trong code |
|---|---|---|---|
| 1 | Bảng thành thẻ trên màn hẹp | Bảng nhiều cột không vừa 390 px; mỗi dòng thành một thẻ, nhãn cột lấy từ `data-label` | `td[data-label]::before` trong `catalog.css` |
| 2 | Tìm và phân trang phía server | Không tải hết đơn về trình duyệt; gửi `q`, `page` lên API | `/admin/orders?q=&page=`, `/admin/users?q=&page=` |
| 3 | OAuth qua bên thứ ba | Web không tự kiểm danh tính; Supabase trả `access_token` trong `#hash`, API xác minh lại | trang `/login/callback` |
| 4 | Ẩn tính năng khi thiếu cấu hình | Thiếu `VITE_SUPABASE_URL` thì không hiện nút, không để khách bấm vào lỗi | `LoginPage.tsx` |

## 3. Tiêu chí đạt (tự đánh dấu, có bằng chứng)
- [ ] 390 px: mọi mục `/admin` không tràn ngang (`scrollWidth` = chiều rộng màn hình), ảnh minh chứng.
- [ ] Tìm đơn theo mã/email và sang trang 2 đúng (ca UI-A02 trong [TEST-CASES](../../testing/TEST-CASES.md)).
- [ ] Giải thích được vì sao web gửi `access_token` cho API chứ không tự coi là đã đăng nhập.
- [ ] Bỏ `VITE_SUPABASE_URL`, build lại: nút Google/Facebook biến mất (ca OA-08).

## 4. Lỗi hay gặp trong phần này
- Người dùng 30/10: "trang admin của giao diện mobile đang rất xấu và thiếu nhiều chức năng". Nguyên nhân: bảng cuộn ngang, form 4 cột bị bóp, menu là dải nút trần; API đã có `q`, `page`, chi tiết đơn nhưng UI chưa dùng.
- Meta yêu cầu link chính sách quyền riêng tư và hướng dẫn xóa dữ liệu trước khi bật đăng nhập Facebook → thêm `/privacy-policy` (mục `#delete-data`).

## 6. Nhiệm vụ xây dựng (commit đứng tên bạn)
### PRJ-P6-FD2-1 — Quản trị trên điện thoại + tìm/lọc/phân trang
- **File phải viết:** `apps/web/src/pages/AdminPage.tsx`, `catalog.css`
- **Test nghiệm thu:** không có; ca UI-A01, UI-A02, ảnh 1366/390
- **Phải merge trước:** PRJ-P5-FD2-1 · **Nhánh:** `prj/p6-fd2-1` · **Reviewer:** FD1 Thành

### PRJ-P6-FD2-2 — Nút Google/Facebook, callback, trang chính sách
- **File phải viết:** `LoginPage.tsx`, `lib/auth.tsx`, `PrivacyPage.tsx`, `App.tsx`, `apps/web/.env.example`
- **Test nghiệm thu:** không có; ca OA-08, OA-09
- **Phải merge trước:** PRJ-P6-BD1-2, PRJ-P1-FD2-1 · **Nhánh:** `prj/p6-fd2-2` · **Reviewer:** FD1 Thành

## 7. Bằng chứng cần có trước khi sang P7
- [ ] Tối thiểu 4 mục AI-LOG thật trong phase.
- [ ] PRJ-P6-FD2-1, PRJ-P6-FD2-2 đã merge, link PR ghi vào [LP-FD2-Phuc](LP-FD2-Phuc.md).
