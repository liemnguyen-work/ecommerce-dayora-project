---
tags: [phase, P4]
phase: P4
dates: "25/11 – 01/12/2026"
---
# P4 — Kit Builder

**Thời gian:** 25/11 – 01/12/2026 · Lộ trình: [PHASES](../PHASES.md) · Tổng hợp nhật ký AI: [AI_USAGE_LOG](../../docs/ai-logs/AI_USAGE_LOG.md)

## Mục tiêu
Kit Builder nhận 4 nhóm đầu vào, áp R01–R05, giải thích kết quả, cho thay món và kiểm soát ngân sách, đưa bộ vào giỏ có ruleSetVersion.

## Điều kiện hoàn thành
- [ ] FR06–FR08 chạy
- [ ] ≥24 ca kiểm thử Kit Builder có expected/actual (AC02)
- [ ] Ví dụ charter (5 người, 350.000đ → tổng 335.500đ) cho đúng kết quả (test với phí giao giả định 25.000đ của charter; bảng phí thật HCM nội thành 20.000đ cho 330.500đ, xem [AC02-KIT-CASES](../../docs/testing/AC02-KIT-CASES.md))
- [ ] Ba tương tác UX bắt buộc hoạt động

## 0. Bài tập trên lớp (làm trước)
Chưa có. Khi GV giao bài tập có hạn trong phase này, PM thêm vào [ASSIGNMENTS](../../docs/ASSIGNMENTS.md), thêm task `HW-P4-*` vào [ROADMAP](../../docs/ROADMAP.md) và ghi lại mục này. Bài tập làm trước task đồ án của phase.

## Gói việc đồ án và theo dõi
Cột Task: mã task trong [ROADMAP](../../docs/ROADMAP.md) mục P4 (mỗi task một issue). Trạng thái: todo · doing · review · done. Tiến độ tổng: [PROGRESS](../../docs/PROGRESS.md).

| # | Gói việc | Phụ trách | Reviewer | Yêu cầu | Task | Trạng thái |
|---|---|---|---|---|---|---|
| 1 | Chốt định mức + thiết yếu/tùy chọn 3 tình huống, viết 3.4 | [Liêm (PM)](PM-Liem/P4-PM-Liem.md) | Ngọc (QA) | R01–R05 | PRJ-P4-PM-1 | todo |
| 2 | Thiết kế Kit Builder 3 bước + giải thích + thay món | [Đạt (PD)](PD-Dat/P4-PD-Dat.md) | Thành (FD1) | FR06–FR08 | PRJ-P4-PD-1 | todo |
| 3 | UI Kit Builder: form có validate, kết quả, thay món, tổng chạy, vào giỏ | [Thành (FD1)](FD1-Thanh/P4-FD1-Thanh.md) | Đạt (PD) | FR06–FR08, NFR02 | PRJ-P4-FD1-1, PRJ-P4-FD1-2 | todo |
| 4 | Admin xem RuleSet hiện hành (chỉ đọc) + chuẩn bị form sửa | [Phúc (FD2)](FD2-Phuc/P4-FD2-Phuc.md) | Thành (FD1) | FR16 | PRJ-P4-FD2-1 | todo |
| 5 | Kit engine: R01–R05 hàm thuần + API build/adjust | [Hoàn (BD1)](BD1-Hoan/P4-BD1-Hoan.md) | Châu (BD2) | FR06–FR08 | PRJ-P4-BD1-1 | todo |
| 6 | RuleSet v1 JSON + validate schema quy tắc | [Châu (BD2)](BD2-Chau/P4-BD2-Chau.md) | Hoàn (BD1) | R06, FR16 | PRJ-P4-BD2-1, PRJ-P4-BD2-2 | todo |
| 7 | 24+ ca kiểm thử Kit Builder (expected/actual) | [Ngọc (QA)](QA-Ngoc/P4-QA-Ngoc.md) | Liêm (PM) | AC02 | PRJ-P4-QA-1 | todo |
| 8 | Theo dõi hiệu năng API kit, log lỗi | [Kiệt (DO)](DO-Kiet/P4-DO-Kiet.md) | Hoàn (BD1) | NFR08 | PRJ-P4-DO-1 | todo |

## Thư mục thành viên
| Vai | Thành viên | Hướng dẫn phase | Log cá nhân |
|---|---|---|---|
| PM | Liêm | [P4-PM-Liem](PM-Liem/P4-PM-Liem.md) | [log cá nhân](../../docs/ai-logs/liem.md) |
| PD | Đạt | [P4-PD-Dat](PD-Dat/P4-PD-Dat.md) | [log cá nhân](../../docs/ai-logs/dat.md) |
| FD1 | Thành | [P4-FD1-Thanh](FD1-Thanh/P4-FD1-Thanh.md) | [log cá nhân](../../docs/ai-logs/thanh.md) |
| FD2 | Phúc | [P4-FD2-Phuc](FD2-Phuc/P4-FD2-Phuc.md) | [log cá nhân](../../docs/ai-logs/phuc.md) |
| BD1 | Hoàn | [P4-BD1-Hoan](BD1-Hoan/P4-BD1-Hoan.md) | [log cá nhân](../../docs/ai-logs/hoan.md) |
| BD2 | Châu | [P4-BD2-Chau](BD2-Chau/P4-BD2-Chau.md) | [log cá nhân](../../docs/ai-logs/chau.md) |
| QA | Ngọc | [P4-QA-Ngoc](QA-Ngoc/P4-QA-Ngoc.md) | [log cá nhân](../../docs/ai-logs/ngoc.md) |
| DO | Kiệt | [P4-DO-Kiet](DO-Kiet/P4-DO-Kiet.md) | [log cá nhân](../../docs/ai-logs/kiet.md) |

## Ghi chú họp chốt phase
- Ngày họp:
- Quyết định:
- Rủi ro:
