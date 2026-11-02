---
tags: [phase, P5]
phase: P5
dates: "02/12 – 08/12/2026"
---
# P5 — Quản trị quy tắc, dashboard, bảo mật

**Thời gian:** 02/12 – 08/12/2026 · Lộ trình: [PHASES](../PHASES.md) · Tổng hợp nhật ký AI: [AI_USAGE_LOG](../../docs/ai-logs/AI_USAGE_LOG.md)

## Mục tiêu
Admin sửa và phát hành RuleSet có phiên bản + nhật ký; dashboard 5 chỉ số đúng công thức; rà soát và test bảo mật XSS/SQLi/CSRF/IDOR/secret.

## Điều kiện hoàn thành
- [ ] FR16, FR17 chạy; AC03 có test hồi quy
- [ ] Bảng rủi ro bảo mật + test minh chứng (AC07)
- [ ] Quyết định có làm Innovation FR18 hay không (D11)

## 0. Bài tập trên lớp (làm trước)
Chưa có. Khi GV giao bài tập có hạn trong phase này, PM thêm vào [ASSIGNMENTS](../../docs/ASSIGNMENTS.md), thêm task `HW-P5-*` vào [ROADMAP](../../docs/ROADMAP.md) và ghi lại mục này. Bài tập làm trước task đồ án của phase.

## Gói việc đồ án và theo dõi
Cột Task: mã task trong [ROADMAP](../../docs/ROADMAP.md) mục P5 (mỗi task một issue). Trạng thái: todo · doing · review · done. Tiến độ tổng: [PROGRESS](../../docs/PROGRESS.md).

| # | Gói việc | Phụ trách | Reviewer | Yêu cầu | Task | Trạng thái |
|---|---|---|---|---|---|---|
| 1 | Rà soát yêu cầu bắt buộc, quyết định Innovation, viết Ch.4 bảo mật | [Liêm (PM)](PM-Liem/P5-PM-Liem.md) | Ngọc (QA) | D11 | PRJ-P5-PM-1 | todo |
| 2 | Thiết kế dashboard + màn sửa quy tắc | [Đạt (PD)](PD-Dat/P5-PD-Dat.md) | Phúc (FD2) | FR16, FR17 | PRJ-P5-PD-1 | todo |
| 3 | Hoàn thiện responsive + accessibility toàn site khách | [Thành (FD1)](FD1-Thanh/P5-FD1-Thanh.md) | Đạt (PD) | NFR01 | PRJ-P5-FD1-1 | todo |
| 4 | Dashboard (biểu đồ, KPI) + màn sửa/phát hành RuleSet + nhật ký | [Phúc (FD2)](FD2-Phuc/P5-FD2-Phuc.md) | Thành (FD1) | FR16, FR17 | PRJ-P5-FD2-1 | todo |
| 5 | Rà bảo mật API khách (IDOR, rate limit login, cookie) | [Hoàn (BD1)](BD1-Hoan/P5-BD1-Hoan.md) | Châu (BD2) | NFR04 | PRJ-P5-BD1-1 | todo |
| 6 | API RuleSet draft/publish/log + dashboard queries | [Châu (BD2)](BD2-Chau/P5-BD2-Chau.md) | Hoàn (BD1) | FR16, FR17 | PRJ-P5-BD2-1, PRJ-P5-BD2-2 | todo |
| 7 | Test bảo mật XSS/SQLi/CSRF/IDOR + hồi quy AC03 | [Ngọc (QA)](QA-Ngoc/P5-QA-Ngoc.md) | Liêm (PM) | AC03, AC07 | PRJ-P5-QA-1 | todo |
| 8 | Quét secret, CORS, header bảo mật, backup DB | [Kiệt (DO)](DO-Kiet/P5-DO-Kiet.md) | Châu (BD2) | NFR04 | PRJ-P5-DO-1 | todo |

## Thư mục thành viên
| Vai | Thành viên | Hướng dẫn phase | Log cá nhân |
|---|---|---|---|
| PM | Liêm | [P5-PM-Liem](PM-Liem/P5-PM-Liem.md) | [log cá nhân](../../docs/ai-logs/liem.md) |
| PD | Đạt | [P5-PD-Dat](PD-Dat/P5-PD-Dat.md) | [log cá nhân](../../docs/ai-logs/dat.md) |
| FD1 | Thành | [P5-FD1-Thanh](FD1-Thanh/P5-FD1-Thanh.md) | [log cá nhân](../../docs/ai-logs/thanh.md) |
| FD2 | Phúc | [P5-FD2-Phuc](FD2-Phuc/P5-FD2-Phuc.md) | [log cá nhân](../../docs/ai-logs/phuc.md) |
| BD1 | Hoàn | [P5-BD1-Hoan](BD1-Hoan/P5-BD1-Hoan.md) | [log cá nhân](../../docs/ai-logs/hoan.md) |
| BD2 | Châu | [P5-BD2-Chau](BD2-Chau/P5-BD2-Chau.md) | [log cá nhân](../../docs/ai-logs/chau.md) |
| QA | Ngọc | [P5-QA-Ngoc](QA-Ngoc/P5-QA-Ngoc.md) | [log cá nhân](../../docs/ai-logs/ngoc.md) |
| DO | Kiệt | [P5-DO-Kiet](DO-Kiet/P5-DO-Kiet.md) | [log cá nhân](../../docs/ai-logs/kiet.md) |

## Ghi chú họp chốt phase
- Ngày họp:
- Quyết định:
- Rủi ro:
