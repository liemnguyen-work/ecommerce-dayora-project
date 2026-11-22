---
tags: [team]
---
# ROLES — 8 vai trò DAYORA

Mỗi module có 1 người chính + 1 người review. Kế hoạch theo phase: [PHASES](../phases/PHASES.md).

| Mã | Vai | Thành viên | GitHub | Phụ trách chính | Reviewer mặc định |
|---|---|---|---|---|---|
| PM | Trưởng nhóm kiêm BA | Liêm | `liemnguyen-work` | Kế hoạch, Issues, REQUIREMENTS, Change Log, ghép báo cáo | QA |
| PD | Product Designer (UI/UX) | Đạt | `Dattran-ueh` | Luồng, design system, chọn prompt motionsites, kiểm tra UI thực tế | FD1 |
| FD1 | Frontend 1 (khách hàng) | Thành | `thanhnguyen31241022712-UEH` | Home, catalog, lọc, chi tiết, Kit Builder UI, giỏ, checkout, tài khoản | PD |
| FD2 | Frontend 2 (quản trị) | Phúc | `hngphc61` | Dashboard, CRUD sản phẩm/danh mục/user/đơn/voucher/khuyến mãi, quy tắc Kit | FD1 |
| BD1 | Backend 1 (khách hàng, giao dịch) | Hoàn | `Hoan1604` | Auth, catalog API, Kit Builder engine, giỏ, voucher, phí giao, đơn, VNPay | BD2 |
| BD2 | Backend 2 (quản trị, dữ liệu) | Châu | `nbchau571` | Schema Prisma, seed, API admin, trạng thái đơn + tồn kho, RuleSet, dashboard | BD1 |
> Ghi chú: Commit trước 10/11 đứng tên `bchau571` (cùng người).
| QA | QA/Tester | Ngọc | `ngocnguyen31241024603` | Test plan, ca kiểm thử (≥ 24 ca Kit Builder), bug list, kiểm thử bảo mật | PM |
| DO | DevOps | Kiệt | `TuanKiet-coder1` | Repo, env, CI, deploy Vercel/Render/Supabase, setup guide, checklist demo | BD2 |

Ghi chú: `liemnguyen-work` và `liemnguyen31241023460-cell` là hai tài khoản của Liêm; các commit mới dùng tài khoản chính `liemnguyen-work`.

Đã xác nhận username GitHub với cả 8 thành viên vào ngày 07/11/2026.

## Thư mục cá nhân theo phase
`phases/P<số>-<tên>/<MÃ>-<Tên>/` gồm:
- `P<số>-<MÃ>-<Tên>.md` — việc cần làm, kiến thức cần học, prompt mẫu, minh chứng.
Nhật ký AI của bạn ghi trong `docs/ai-logs/<tên>.md` (chỉ nối thêm, theo [quy tắc ghi log](ai-logs/ai-logging-rules.md) và [mẫu log](ai-logs/TEMPLATE.md)).
Lộ trình học riêng: `docs/learning/<MÃ>-<Tên>/`.
