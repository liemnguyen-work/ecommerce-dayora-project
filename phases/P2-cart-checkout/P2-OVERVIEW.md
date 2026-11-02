---
tags: [phase, P2]
phase: P2
dates: "11/11 – 17/11/2026"
---
# P2 — Giỏ hàng, voucher, phí giao, checkout

**Thời gian:** 11/11 – 17/11/2026 · Lộ trình: [PHASES](../PHASES.md) · Tổng hợp nhật ký AI: [AI_USAGE_LOG](../../docs/ai-logs/AI_USAGE_LOG.md)

## Mục tiêu
Giỏ hàng gắn tài khoản; voucher kiểm đủ 6 điều kiện; phí giao theo bảng demo; checkout preview → xác nhận thay đổi → tạo đơn có snapshot và giữ tồn.

## Điều kiện hoàn thành
- [ ] FR09, FR10, FR12 (phần phí), FR13 chạy
- [ ] Test voucher đủ ca: tồn tại, hiệu lực, ngưỡng, lượt, trần, đối tượng
- [ ] Server bỏ qua giá client gửi lên (có test)
- [ ] Admin CRUD voucher + khuyến mãi

## 0. Bài tập trên lớp (làm trước)
Chưa có. Khi GV giao bài tập có hạn trong phase này, PM thêm vào [ASSIGNMENTS](../../docs/ASSIGNMENTS.md), thêm task `HW-P2-*` vào [ROADMAP](../../docs/ROADMAP.md) và ghi lại mục này. Bài tập làm trước task đồ án của phase.

## Gói việc đồ án và theo dõi
Cột Task: mã task trong [ROADMAP](../../docs/ROADMAP.md) mục P2 (mỗi task một issue). Trạng thái: todo · doing · review · done. Tiến độ tổng: [PROGRESS](../../docs/PROGRESS.md).

| # | Gói việc | Phụ trách | Reviewer | Yêu cầu | Task | Trạng thái |
|---|---|---|---|---|---|---|
| 1 | Chốt D02/D03/D04 lần cuối, cập nhật báo cáo 3.5.2/3.5.5 | [Liêm (PM)](PM-Liem/P2-PM-Liem.md) | Ngọc (QA) | FR10, FR13 | PRJ-P2-PM-1 | todo |
| 2 | Thiết kế giỏ, checkout, hộp đối chiếu thay đổi | [Đạt (PD)](PD-Dat/P2-PD-Dat.md) | Thành (FD1) | NFR02 | PRJ-P2-PD-1 | todo |
| 3 | Giỏ hàng, checkout, hộp xác nhận thay đổi | [Thành (FD1)](FD1-Thanh/P2-FD1-Thanh.md) | Đạt (PD) | FR09, FR10 | PRJ-P2-FD1-1, PRJ-P2-FD1-2, PRJ-P2-FD1-3 | todo |
| 4 | Admin voucher + khuyến mãi | [Phúc (FD2)](FD2-Phuc/P2-FD2-Phuc.md) | Thành (FD1) | FR13 | PRJ-P2-FD2-1 | todo |
| 5 | API giỏ, voucher apply, phí giao, orders/preview, orders | [Hoàn (BD1)](BD1-Hoan/P2-BD1-Hoan.md) | Châu (BD2) | FR09, FR10, FR12, FR13 | PRJ-P2-BD1-1, PRJ-P2-BD1-2, PRJ-P2-BD1-3 | todo |
| 6 | API admin voucher/khuyến mãi; transaction giữ tồn khi tạo đơn | [Châu (BD2)](BD2-Chau/P2-BD2-Chau.md) | Hoàn (BD1) | FR13, FR15, D06 | PRJ-P2-BD2-1, PRJ-P2-BD2-2, PRJ-P2-BD2-3 | todo |
| 7 | Test voucher/phí giao/giá client giả mạo | [Ngọc (QA)](QA-Ngoc/P2-QA-Ngoc.md) | Liêm (PM) | AC06, AC07 | PRJ-P2-QA-1 | todo |
| 8 | Seed dữ liệu demo voucher; theo dõi log Render | [Kiệt (DO)](DO-Kiet/P2-DO-Kiet.md) | Châu (BD2) | NFR08 | PRJ-P2-DO-1 | todo |

## Thư mục thành viên
| Vai | Thành viên | Hướng dẫn phase | Log cá nhân |
|---|---|---|---|
| PM | Liêm | [P2-PM-Liem](PM-Liem/P2-PM-Liem.md) | [log cá nhân](../../docs/ai-logs/liem.md) |
| PD | Đạt | [P2-PD-Dat](PD-Dat/P2-PD-Dat.md) | [log cá nhân](../../docs/ai-logs/dat.md) |
| FD1 | Thành | [P2-FD1-Thanh](FD1-Thanh/P2-FD1-Thanh.md) | [log cá nhân](../../docs/ai-logs/thanh.md) |
| FD2 | Phúc | [P2-FD2-Phuc](FD2-Phuc/P2-FD2-Phuc.md) | [log cá nhân](../../docs/ai-logs/phuc.md) |
| BD1 | Hoàn | [P2-BD1-Hoan](BD1-Hoan/P2-BD1-Hoan.md) | [log cá nhân](../../docs/ai-logs/hoan.md) |
| BD2 | Châu | [P2-BD2-Chau](BD2-Chau/P2-BD2-Chau.md) | [log cá nhân](../../docs/ai-logs/chau.md) |
| QA | Ngọc | [P2-QA-Ngoc](QA-Ngoc/P2-QA-Ngoc.md) | [log cá nhân](../../docs/ai-logs/ngoc.md) |
| DO | Kiệt | [P2-DO-Kiet](DO-Kiet/P2-DO-Kiet.md) | [log cá nhân](../../docs/ai-logs/kiet.md) |

## Ghi chú họp chốt phase
- Ngày họp:
- Quyết định:
- Rủi ro:
