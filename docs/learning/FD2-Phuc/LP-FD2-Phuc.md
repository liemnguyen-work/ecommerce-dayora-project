---
tags: [learning, member/FD2]
member: Phúc
role: FD2
---
# FD2 Phúc — Frontend 2 — quản trị

Lộ trình học riêng của bạn. Cách học chung, quy trình commit và AI-LOG: [LEARNING-PATH](../LEARNING-PATH.md). Lỗi hay gặp để học tư duy: [PITFALLS](../PITFALLS.md).

## Phần code bạn sở hữu
Bạn phải giải thích và tự sửa được các phần này khi GV hỏi. Người review PR của bạn: **FD1 Thành**.
- `apps/web/src/pages/AdminPage.tsx`
- `apps/web/src/pages/admin/ (sẽ tạo khi tách file)`
- `apps/web/src/catalog.css (phần `.admin-*`)`

## Lộ trình 5 phase
| Phase | Mục tiêu học | File |
|---|---|---|
| [P1](LP-FD2-Phuc-P1.md) | Hiểu khung khu quản trị và hai mục Sản phẩm, Tài khoản; bắt đầu tách AdminPage thành nhiều file. | `LP-FD2-Phuc-P1.md` |
| [P2](LP-FD2-Phuc-P2.md) | Hiểu quản trị Voucher và Khuyến mãi, hiển thị lỗi validate từ server. | `LP-FD2-Phuc-P2.md` |
| [P3](LP-FD2-Phuc-P3.md) | Hiểu mục Đơn hàng: lọc, chi tiết, nút bước kế theo sơ đồ D08. | `LP-FD2-Phuc-P3.md` |
| [P4](LP-FD2-Phuc-P4.md) | Hiểu mục Quy tắc Kit: sửa bản nháp, phát hành. | `LP-FD2-Phuc-P4.md` |
| [P5](LP-FD2-Phuc-P5.md) | Hiểu mục Tổng quan và hoàn tất tách AdminPage. | `LP-FD2-Phuc-P5.md` |
| [P6](LP-FD2-Phuc-P6.md) | Quản trị dùng được trên điện thoại; đăng nhập Google/Facebook phía web. | `LP-FD2-Phuc-P6.md` |

## Nhiệm vụ xây dựng của bạn (commit đứng tên bạn)
Bạn tự xây phần này trong repo nhóm. Quy trình: [ROADMAP](../../ROADMAP.md).

| Mã | Phase | Việc | Test nghiệm thu | Phải merge trước |
|---|---|---|---|---|
| PRJ-P1-FD2-1 | P1 | Đăng nhập, đăng ký, trạng thái đăng nhập | — | PRJ-P1-FD1-1, PRJ-P1-BD1-1 |
| PRJ-P1-FD2-2 | P1 | Khung quản trị + Sản phẩm + Tài khoản | — | PRJ-P1-FD2-1, PRJ-P1-BD2-3, PRJ-P1-BD2-2 |
| PRJ-P2-FD2-1 | P2 | Admin Voucher + Khuyến mãi | — | PRJ-P2-BD1-3 |
| PRJ-P3-FD2-1 | P3 | Admin Đơn hàng | — | PRJ-P3-BD2-1 |
| PRJ-P3-FD2-2 | P3 | Trang Tài khoản 4 tab | — | PRJ-P1-BD1-4, PRJ-P3-BD1-3 |
| PRJ-P4-FD2-1 | P4 | Admin Quy tắc Kit | — | PRJ-P4-BD2-2 |
| PRJ-P5-FD2-1 | P5 | Admin Tổng quan | — | PRJ-P5-BD2-1 |
| PRJ-P6-FD2-1 | P6 | Quản trị trên điện thoại + tìm/lọc/phân trang | — | PRJ-P5-FD2-1 |
| PRJ-P6-FD2-2 | P6 | Nút Google/Facebook, callback, trang chính sách | — | PRJ-P6-BD1-2, PRJ-P1-FD2-1 |

## Lỗi hay gặp bạn nên đọc kỹ
- [E5. Một task, một người chịu trách nhiệm, một vòng sửa](../PITFALLS.md#e5)
- [C1. Hai người cùng mua món cuối cùng](../PITFALLS.md#c1)
- [C3. Kit Builder chọn hàng "rẻ" mà tổng lại đắt](../PITFALLS.md#c3)
- [E3. Test pass chưa chắc đúng: mock và database thật](../PITFALLS.md#e3)

## Tài liệu chính thức nên mở song song
- https://react.dev/learn
- https://react.dev/learn/importing-and-exporting-components
- https://reactrouter.com

## Theo dõi tiến độ của bạn
| Mã task | PR (link) | Test pass | Ảnh/diff | Mục AI-LOG | Ngày merge |
|---|---|---|---|---|---|
| PRJ-P1-FD2-1 |  |  |  |  |  |
| PRJ-P1-FD2-2 |  |  |  |  |  |
| PRJ-P2-FD2-1 |  |  |  |  |  |
| PRJ-P3-FD2-1 |  |  |  |  |  |
| PRJ-P3-FD2-2 |  |  |  |  |  |
| PRJ-P4-FD2-1 |  |  |  |  |  |
| PRJ-P5-FD2-1 |  |  |  |  |  |
| PRJ-P6-FD2-1 |  |  |  |  |  |
| PRJ-P6-FD2-2 |  |  |  |  |  |

| Phase | Tiêu chí học đạt |
|---|---|
| P1 | __/4 |
| P2 | __/4 |
| P3 | __/4 |
| P4 | __/3 |
| P5 | __/3 |
| P6 | __/4 |
