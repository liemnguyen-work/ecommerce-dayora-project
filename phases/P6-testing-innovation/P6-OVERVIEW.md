---
tags: [phase, P6]
phase: P6
dates: "09/12 – 15/12/2026"
---
# P6 — Kiểm thử tổng, usability, Innovation có điều kiện

**Thời gian:** 09/12 – 15/12/2026 · Lộ trình: [PHASES](../PHASES.md) · Tổng hợp nhật ký AI: [AI_USAGE_LOG](../../docs/ai-logs/AI_USAGE_LOG.md)

## Mục tiêu
Chạy toàn bộ bộ test, test đồng thời, thử nghiệm 8 người dùng; sửa lỗi; nếu core đạt thì làm FR18 checklist + email nhắc.

## Điều kiện hoàn thành
- [ ] Không còn lỗi Critical/High mở
- [ ] Kết quả usability ≥8 người (NFR07)
- [ ] FR18 xong hoặc ghi rõ lý do hoãn trong CHANGELOG

## 0. Bài tập trên lớp (làm trước)
Chưa có. Khi GV giao bài tập có hạn trong phase này, PM thêm vào [ASSIGNMENTS](../../docs/ASSIGNMENTS.md), thêm task `HW-P6-*` vào [ROADMAP](../../docs/ROADMAP.md) và ghi lại mục này. Bài tập làm trước task đồ án của phase.

## Gói việc đồ án và theo dõi
Cột Task: mã task trong [ROADMAP](../../docs/ROADMAP.md) mục P6 (mỗi task một issue). Trạng thái: todo · doing · review · done. Tiến độ tổng: [PROGRESS](../../docs/PROGRESS.md).

| # | Gói việc | Phụ trách | Reviewer | Yêu cầu | Task | Trạng thái |
|---|---|---|---|---|---|---|
| 1 | Điều phối usability 8 người, tổng hợp kết quả, CHANGELOG | [Liêm (PM)](PM-Liem/P6-PM-Liem.md) | Ngọc (QA) | NFR07 | — | todo |
| 2 | Chạy usability, sửa UX theo phát hiện | [Đạt (PD)](PD-Dat/P6-PD-Dat.md) | Thành (FD1) | NFR07 | — | todo |
| 3 | Sửa lỗi UI khách; FR18 checklist UI (nếu làm) | [Thành (FD1)](FD1-Thanh/P6-FD1-Thanh.md) | Đạt (PD) | FR18 | PRJ-P6-FD1-1, PRJ-P6-FD1-2 | todo |
| 4 | Sửa lỗi UI admin; nhật ký email (nếu làm) | [Phúc (FD2)](FD2-Phuc/P6-FD2-Phuc.md) | Thành (FD1) | FR18 | PRJ-P6-FD2-1, PRJ-P6-FD2-2 | todo |
| 5 | Sửa lỗi backend khách; FR18 đăng ký/đổi/hủy nhắc (nếu làm) | [Hoàn (BD1)](BD1-Hoan/P6-BD1-Hoan.md) | Châu (BD2) | FR18 | PRJ-P6-BD1-1, PRJ-P6-BD1-2, PRJ-P6-BD1-3 | todo |
| 6 | Sửa lỗi backend admin; scheduler gửi email chống lặp (nếu làm) | [Châu (BD2)](BD2-Chau/P6-BD2-Chau.md) | Hoàn (BD1) | FR18, AC10 | — | todo |
| 7 | Chạy toàn bộ test, smoke Playwright, retest bug | [Ngọc (QA)](QA-Ngoc/P6-QA-Ngoc.md) | Liêm (PM) | NFR06 | PRJ-P6-QA-1 | todo |
| 8 | Deploy ổn định, monitoring, video dự phòng bản 1 | [Kiệt (DO)](DO-Kiet/P6-DO-Kiet.md) | Ngọc (QA) | AC09 | PRJ-P6-DO-1 | todo |

## Thư mục thành viên
| Vai | Thành viên | Hướng dẫn phase | Log cá nhân |
|---|---|---|---|
| PM | Liêm | [P6-PM-Liem](PM-Liem/P6-PM-Liem.md) | [log cá nhân](../../docs/ai-logs/liem.md) |
| PD | Đạt | [P6-PD-Dat](PD-Dat/P6-PD-Dat.md) | [log cá nhân](../../docs/ai-logs/dat.md) |
| FD1 | Thành | [P6-FD1-Thanh](FD1-Thanh/P6-FD1-Thanh.md) | [log cá nhân](../../docs/ai-logs/thanh.md) |
| FD2 | Phúc | [P6-FD2-Phuc](FD2-Phuc/P6-FD2-Phuc.md) | [log cá nhân](../../docs/ai-logs/phuc.md) |
| BD1 | Hoàn | [P6-BD1-Hoan](BD1-Hoan/P6-BD1-Hoan.md) | [log cá nhân](../../docs/ai-logs/hoan.md) |
| BD2 | Châu | [P6-BD2-Chau](BD2-Chau/P6-BD2-Chau.md) | [log cá nhân](../../docs/ai-logs/chau.md) |
| QA | Ngọc | [P6-QA-Ngoc](QA-Ngoc/P6-QA-Ngoc.md) | [log cá nhân](../../docs/ai-logs/ngoc.md) |
| DO | Kiệt | [P6-DO-Kiet](DO-Kiet/P6-DO-Kiet.md) | [log cá nhân](../../docs/ai-logs/kiet.md) |

## Ghi chú họp chốt phase
- Ngày họp:
- Quyết định:
- Rủi ro:
