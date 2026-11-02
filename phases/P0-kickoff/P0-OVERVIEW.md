---
tags: [phase, P0]
phase: P0
dates: "28/10 – 03/11/2026"
---
# P0 — Khởi động và nền móng

**Thời gian:** 28/10 – 03/11/2026 · Lộ trình: [PHASES](../PHASES.md) · Tổng hợp nhật ký AI: [AI_USAGE_LOG](../../docs/ai-logs/AI_USAGE_LOG.md)

## Mục tiêu
Repo chạy được trên máy mọi người, CSDL Supabase có schema + 30 SKU, chốt các quyết định bảng 2.6, có design system và hero mẫu, deploy bản "hello" lên Vercel/Render.

## Điều kiện hoàn thành
- [ ] `npm run dev:web` và `npm run dev:api` chạy, trang chủ tạm hiện "API: ok"
- [ ] Migration đầu tiên áp lên Supabase; seed có 6 nhóm, 30 SKU, 3 mức phí giao
- [ ] DECISIONS D01–D10 chuyển sang "chốt" (hoặc ghi rõ còn mở)
- [ ] URL demo Vercel + Render mở được qua HTTPS
- [ ] Mỗi thành viên có GitHub được mời vào repo và đã commit ít nhất 1 lần
- [ ] Bài tập Buổi 2 nộp trước 04/11 (`python tools/check-session2.py session2` báo 0 lỗi)

## 0. Bài tập trên lớp (làm trước)
**Buổi 2 — HTML5 + CSS3 thuần, 4 trang. Hạn nộp 04/11/2026.** Hướng dẫn, phân công, thứ tự làm: [SESSION2-GUIDE](../../docs/SESSION2-GUIDE.md) · Sổ bài tập: [ASSIGNMENTS](../../docs/ASSIGNMENTS.md).

Bài tập làm trước. Task đồ án đầu tiên của mỗi người chỉ mở khi task bài tập của chính người đó đã merge.

| Thứ tự | Task | Người | Việc | Trạng thái |
|---|---|---|---|---|
| 1 | HW-P0-PM-1 | Liêm (PM) | B1 kế hoạch | todo |
| 2 | HW-P0-DO-1 | Kiệt (DO) | B2 khung thư mục, ảnh, quy ước, gác cổng PR | todo |
| 3 | HW-P0-PD-1 | Đạt (PD) | B3 ui-design + biến CSS | todo |
| 4 | HW-P0-FD1-1 | Thành (FD1) | B4 header, menu, banner, footer, trang chủ | todo |
| 5 | HW-P0-FD2-1 · HW-P0-BD1-1 · HW-P0-BD2-1 | Phúc, Hoàn, Châu | B5 sản phẩm · B6A chi tiết · B6B giới thiệu (song song) | todo |
| 6 | HW-P0-QA-1 | Ngọc (QA) | B7 responsive, B9A rà soát, B9B đánh giá AI | todo |
| 7 | HW-P0-PD-2 | Đạt (PD) | B8 hover + focus | todo |
| 8 | HW-P0-PM-2 | Liêm (PM) | B9C README, gom bài, nộp; cả nhóm làm B10 | todo |


Kiểm: `python tools/check-session2.py session2` báo 0 lỗi trước khi nộp.

## Gói việc đồ án và theo dõi
Cột Task: mã task trong [ROADMAP](../../docs/ROADMAP.md) mục P0 (mỗi task một issue). Trạng thái: todo · doing · review · done. Tiến độ tổng: [PROGRESS](../../docs/PROGRESS.md).

| # | Gói việc | Phụ trách | Reviewer | Yêu cầu | Task | Trạng thái |
|---|---|---|---|---|---|---|
| 1 | Chốt bảng quyết định D01–D10, Issue board, lịch họp | [Liêm (PM)](PM-Liem/P0-PM-Liem.md) | Ngọc (QA) | DECISIONS | PRJ-P0-PM-1 | todo |
| 2 | Design system + chọn hero/section motionsites | [Đạt (PD)](PD-Dat/P0-PD-Dat.md) | Thành (FD1) | NFR01, NFR02 | PRJ-P0-PD-1 | todo |
| 3 | Layout chung (header, footer) + trang chủ khung | [Thành (FD1)](FD1-Thanh/P0-FD1-Thanh.md) | Đạt (PD) | FR01 | — | todo |
| 4 | Khung trang admin (sidebar, bảng dữ liệu dùng chung) | [Phúc (FD2)](FD2-Phuc/P0-FD2-Phuc.md) | Thành (FD1) | FR14 | — | todo |
| 5 | Module auth khung + DTO validation | [Hoàn (BD1)](BD1-Hoan/P0-BD1-Hoan.md) | Châu (BD2) | FR04 | — | todo |
| 6 | Migration đầu + seed 30 SKU + định mức Kit v1 | [Châu (BD2)](BD2-Chau/P0-BD2-Chau.md) | Hoàn (BD1) | FR14, D01 | PRJ-P0-BD2-1 | todo |
| 7 | Test plan + ma trận yêu cầu → test | [Ngọc (QA)](QA-Ngoc/P0-QA-Ngoc.md) | Liêm (PM) | NFR06 | PRJ-P0-QA-1 | todo |
| 8 | Repo GitHub, Supabase, Vercel, Render, CI build | [Kiệt (DO)](DO-Kiet/P0-DO-Kiet.md) | Châu (BD2) | NFR08 | PRJ-P0-DO-1, PRJ-P0-DO-2 | todo |

## Thư mục thành viên
| Vai | Thành viên | Hướng dẫn phase | Log cá nhân |
|---|---|---|---|
| PM | Liêm | [P0-PM-Liem](PM-Liem/P0-PM-Liem.md) | [log cá nhân](../../docs/ai-logs/liem.md) |
| PD | Đạt | [P0-PD-Dat](PD-Dat/P0-PD-Dat.md) | [log cá nhân](../../docs/ai-logs/dat.md) |
| FD1 | Thành | [P0-FD1-Thanh](FD1-Thanh/P0-FD1-Thanh.md) | [log cá nhân](../../docs/ai-logs/thanh.md) |
| FD2 | Phúc | [P0-FD2-Phuc](FD2-Phuc/P0-FD2-Phuc.md) | [log cá nhân](../../docs/ai-logs/phuc.md) |
| BD1 | Hoàn | [P0-BD1-Hoan](BD1-Hoan/P0-BD1-Hoan.md) | [log cá nhân](../../docs/ai-logs/hoan.md) |
| BD2 | Châu | [P0-BD2-Chau](BD2-Chau/P0-BD2-Chau.md) | [log cá nhân](../../docs/ai-logs/chau.md) |
| QA | Ngọc | [P0-QA-Ngoc](QA-Ngoc/P0-QA-Ngoc.md) | [log cá nhân](../../docs/ai-logs/ngoc.md) |
| DO | Kiệt | [P0-DO-Kiet](DO-Kiet/P0-DO-Kiet.md) | [log cá nhân](../../docs/ai-logs/kiet.md) |

## Ghi chú họp chốt phase
- Ngày họp:
- Quyết định:
- Rủi ro:
