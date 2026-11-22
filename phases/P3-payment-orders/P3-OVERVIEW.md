---
tags: [phase, P3]
phase: P3
dates: "18/11 – 24/11/2026"
---
# P3 — Thanh toán VNPay, đơn hàng, tồn kho, đánh giá

**Thời gian:** 18/11 – 24/11/2026 · Lộ trình: [PHASES](../PHASES.md) · Tổng hợp nhật ký AI: [AI_USAGE_LOG](../../docs/ai-logs/AI_USAGE_LOG.md)

## Mục tiêu
Thanh toán VNPay Sandbox đủ ca thành công/thất bại/hủy/sai chữ ký/sai tiền/lặp; trạng thái đơn 3 trục; admin xử lý đơn; khách theo dõi đơn và đánh giá sau mua.

## Điều kiện hoàn thành
- [ ] FR11, FR15, FR05, FR12 (trạng thái giao) chạy
- [ ] IPN gửi lặp không cập nhật 2 lần (test)
- [ ] Hai đơn tranh 1 tồn cuối: chỉ 1 thành công (test)
- [ ] AC01 chạy trọn từ chọn hàng tới theo dõi đơn

## 0. Bài tập trên lớp (làm trước)
Chưa có. Khi GV giao bài tập có hạn trong phase này, PM thêm vào [ASSIGNMENTS](../../docs/ASSIGNMENTS.md), thêm task `HW-P3-*` vào [ROADMAP](../../docs/ROADMAP.md) và ghi lại mục này. Bài tập làm trước task đồ án của phase.

## Gói việc đồ án và theo dõi
Cột Task: mã task trong [ROADMAP](../../docs/ROADMAP.md) mục P3 (mỗi task một issue). Trạng thái: todo · doing · review · done. Tiến độ tổng: [PROGRESS](../../docs/PROGRESS.md).

| # | Gói việc | Phụ trách | Reviewer | Yêu cầu | Task | Trạng thái |
|---|---|---|---|---|---|---|
| 1 | Theo dõi AC01/AC04/AC05, viết 3.5.3 Thanh toán | [Liêm (PM)](PM-Liem/P3-PM-Liem.md) | Ngọc (QA) | FR11 | PRJ-P3-PM-1 | todo |
| 2 | Trang kết quả thanh toán, theo dõi đơn, form đánh giá | [Đạt (PD)](PD-Dat/P3-PD-Dat.md) | Thành (FD1) | FR04, FR05 | PRJ-P3-PD-1 | todo |
| 3 | Trang kết quả thanh toán, đơn của tôi, chi tiết đơn, đánh giá | [Thành (FD1)](FD1-Thanh/P3-FD1-Thanh.md) | Đạt (PD) | FR04, FR05, FR11 | PRJ-P3-FD1-1, PRJ-P3-FD1-2 | todo |
| 4 | Admin quản lý đơn: lọc, chi tiết, chuyển trạng thái | [Phúc (FD2)](FD2-Phuc/P3-FD2-Phuc.md) | Thành (FD1) | FR15 | PRJ-P3-FD2-1, PRJ-P3-FD2-2 | todo |
| 5 | VNPay: tạo URL, Return, IPN, chữ ký, idempotency; API review | [Hoàn (BD1)](BD1-Hoan/P3-BD1-Hoan.md) | Châu (BD2) | FR11, FR05 | PRJ-P3-BD1-1, PRJ-P3-BD1-2, PRJ-P3-BD1-3 | todo |
| 6 | Chuyển trạng thái đơn theo sơ đồ + tồn kho + log; job hết hạn giữ tồn | [Châu (BD2)](BD2-Chau/P3-BD2-Chau.md) | Hoàn (BD1) | FR15, D06–D08 | PRJ-P3-BD2-1 | todo |
| 7 | Test VNPay 6 ca, test 2 đơn tranh tồn cuối | [Ngọc (QA)](QA-Ngoc/P3-QA-Ngoc.md) | Liêm (PM) | AC04, AC05 | PRJ-P3-QA-1 | todo |
| 8 | Cấu hình IPN URL public (Render), HTTPS, secret VNPay | [Kiệt (DO)](DO-Kiet/P3-DO-Kiet.md) | Hoàn (BD1) | FR11 | PRJ-P3-DO-1 | todo |

## Thư mục thành viên
| Vai | Thành viên | Hướng dẫn phase | Log cá nhân |
|---|---|---|---|
| PM | Liêm | [P3-PM-Liem](PM-Liem/P3-PM-Liem.md) | [log cá nhân](../../docs/ai-logs/liem.md) |
| PD | Đạt | [P3-PD-Dat](PD-Dat/P3-PD-Dat.md) | [log cá nhân](../../docs/ai-logs/dat.md) |
| FD1 | Thành | [P3-FD1-Thanh](FD1-Thanh/P3-FD1-Thanh.md) | [log cá nhân](../../docs/ai-logs/thanh.md) |
| FD2 | Phúc | [P3-FD2-Phuc](FD2-Phuc/P3-FD2-Phuc.md) | [log cá nhân](../../docs/ai-logs/phuc.md) |
| BD1 | Hoàn | [P3-BD1-Hoan](BD1-Hoan/P3-BD1-Hoan.md) | [log cá nhân](../../docs/ai-logs/hoan.md) |
| BD2 | Châu | [P3-BD2-Chau](BD2-Chau/P3-BD2-Chau.md) | [log cá nhân](../../docs/ai-logs/chau.md) |
| QA | Ngọc | [P3-QA-Ngoc](QA-Ngoc/P3-QA-Ngoc.md) | [log cá nhân](../../docs/ai-logs/ngoc.md) |
| DO | Kiệt | [P3-DO-Kiet](DO-Kiet/P3-DO-Kiet.md) | [log cá nhân](../../docs/ai-logs/kiet.md) |

## Ghi chú họp chốt phase
- Ngày họp:
- Quyết định:
- Rủi ro:
