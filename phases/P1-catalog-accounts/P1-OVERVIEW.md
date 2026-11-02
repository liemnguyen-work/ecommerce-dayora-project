---
tags: [phase, P1]
phase: P1
dates: "04/11 – 10/11/2026"
---
# P1 — Catalog, tài khoản và giao diện nền

**Thời gian:** 04/11 – 10/11/2026 · Lộ trình: [PHASES](../PHASES.md) · Tổng hợp nhật ký AI: [AI_USAGE_LOG](../../docs/ai-logs/AI_USAGE_LOG.md)

## Mục tiêu
Khách xem trang chủ (hero motionsites), danh mục, tìm kiếm + ≥5 bộ lọc + sắp xếp, chi tiết sản phẩm theo biến thể; đăng ký/đăng nhập; admin CRUD sản phẩm/danh mục cơ bản.

## Điều kiện hoàn thành
- [ ] FR01–FR04 chạy trên bản deploy
- [ ] ≥5 thuộc tính lọc hoạt động (giá, nhóm, tình huống, sức chứa, chất liệu/kích thước)
- [ ] Admin thêm/sửa/ẩn sản phẩm; khách thường gọi API admin bị 403
- [ ] Ảnh 1366/390 px của Home, Catalog, Chi tiết

## 0. Bài tập trên lớp (làm trước)
Chưa có. Khi GV giao bài tập có hạn trong phase này, PM thêm vào [ASSIGNMENTS](../../docs/ASSIGNMENTS.md), thêm task `HW-P1-*` vào [ROADMAP](../../docs/ROADMAP.md) và ghi lại mục này. Bài tập làm trước task đồ án của phase.

## Gói việc đồ án và theo dõi
Cột Task: mã task trong [ROADMAP](../../docs/ROADMAP.md) mục P1 (mỗi task một issue). Trạng thái: todo · doing · review · done. Tiến độ tổng: [PROGRESS](../../docs/PROGRESS.md).

| # | Gói việc | Phụ trách | Reviewer | Yêu cầu | Task | Trạng thái |
|---|---|---|---|---|---|---|
| 1 | Theo dõi FR01–FR04, cập nhật CHANGELOG, viết Ch.1–2 báo cáo bản mới | [Liêm (PM)](PM-Liem/P1-PM-Liem.md) | Ngọc (QA) | FR01–FR04 | PRJ-P1-PM-1 | todo |
| 2 | Thiết kế Home, Catalog, Chi tiết, Đăng nhập (desktop + mobile) | [Đạt (PD)](PD-Dat/P1-PD-Dat.md) | Thành (FD1) | FR01–FR03 | PRJ-P1-PD-1, PRJ-P1-PD-2 | todo |
| 3 | Home (hero motionsites), Catalog + bộ lọc, Chi tiết, Đăng ký/Đăng nhập | [Thành (FD1)](FD1-Thanh/P1-FD1-Thanh.md) | Đạt (PD) | FR01–FR04 | PRJ-P1-FD1-1, PRJ-P1-FD1-2, PRJ-P1-FD1-3, PRJ-P1-FD1-4 | todo |
| 4 | Admin: danh sách/thêm/sửa/ẩn sản phẩm, danh mục | [Phúc (FD2)](FD2-Phuc/P1-FD2-Phuc.md) | Thành (FD1) | FR14 | PRJ-P1-FD2-1, PRJ-P1-FD2-2 | todo |
| 5 | API auth (register/login/me), catalog (lọc, sắp xếp), chi tiết | [Hoàn (BD1)](BD1-Hoan/P1-BD1-Hoan.md) | Châu (BD2) | FR02–FR04 | PRJ-P1-BD1-1, PRJ-P1-BD1-2, PRJ-P1-BD1-3, PRJ-P1-BD1-4 | todo |
| 6 | API admin sản phẩm/danh mục + RolesGuard | [Châu (BD2)](BD2-Chau/P1-BD2-Chau.md) | Hoàn (BD1) | FR14, NFR04 | PRJ-P1-BD2-1, PRJ-P1-BD2-2, PRJ-P1-BD2-3 | todo |
| 7 | Ca kiểm thử FR01–FR04, test lọc/biên | [Ngọc (QA)](QA-Ngoc/P1-QA-Ngoc.md) | Liêm (PM) | FR01–FR04 | PRJ-P1-QA-1 | todo |
| 8 | Env deploy, preview mỗi PR, setup guide bản 1 | [Kiệt (DO)](DO-Kiet/P1-DO-Kiet.md) | Châu (BD2) | NFR08 | PRJ-P1-DO-1 | todo |

## Thư mục thành viên
| Vai | Thành viên | Hướng dẫn phase | Log cá nhân |
|---|---|---|---|
| PM | Liêm | [P1-PM-Liem](PM-Liem/P1-PM-Liem.md) | [log cá nhân](../../docs/ai-logs/liem.md) |
| PD | Đạt | [P1-PD-Dat](PD-Dat/P1-PD-Dat.md) | [log cá nhân](../../docs/ai-logs/dat.md) |
| FD1 | Thành | [P1-FD1-Thanh](FD1-Thanh/P1-FD1-Thanh.md) | [log cá nhân](../../docs/ai-logs/thanh.md) |
| FD2 | Phúc | [P1-FD2-Phuc](FD2-Phuc/P1-FD2-Phuc.md) | [log cá nhân](../../docs/ai-logs/phuc.md) |
| BD1 | Hoàn | [P1-BD1-Hoan](BD1-Hoan/P1-BD1-Hoan.md) | [log cá nhân](../../docs/ai-logs/hoan.md) |
| BD2 | Châu | [P1-BD2-Chau](BD2-Chau/P1-BD2-Chau.md) | [log cá nhân](../../docs/ai-logs/chau.md) |
| QA | Ngọc | [P1-QA-Ngoc](QA-Ngoc/P1-QA-Ngoc.md) | [log cá nhân](../../docs/ai-logs/ngoc.md) |
| DO | Kiệt | [P1-DO-Kiet](DO-Kiet/P1-DO-Kiet.md) | [log cá nhân](../../docs/ai-logs/kiet.md) |

## Ghi chú họp chốt phase
- Ngày họp:
- Quyết định:
- Rủi ro:
