---
tags: [learning, member/FD1]
member: Thành
role: FD1
---
# FD1 Thành — Frontend 1 — khách hàng

Lộ trình học riêng của bạn. Cách học chung, quy trình commit và AI-LOG: [LEARNING-PATH](../LEARNING-PATH.md). Lỗi hay gặp để học tư duy: [PITFALLS](../PITFALLS.md).

## Phần code bạn sở hữu
Bạn phải giải thích và tự sửa được các phần này khi GV hỏi. Người review PR của bạn: **PD Đạt**.
- `apps/web/src/App.tsx`
- `apps/web/src/pages/ (trừ AdminPage.tsx)`
- `apps/web/src/components/`
- `apps/web/src/lib/`
- `apps/web/src/index.css, catalog.css, motion.css`

## Lộ trình 6 phase
| Phase | Mục tiêu học | File |
|---|---|---|
| [P1](LP-FD1-Thanh-P1.md) | Hiểu khung web: route, gọi API, đăng nhập, trang chủ có intro, catalog có bộ lọc trên URL. | `LP-FD1-Thanh-P1.md` |
| [P2](LP-FD1-Thanh-P2.md) | Hiểu luồng giỏ hàng và thanh toán, cách web xử lý khi server từ chối. | `LP-FD1-Thanh-P2.md` |
| [P3](LP-FD1-Thanh-P3.md) | Hiểu trang đơn, kết quả thanh toán và tài khoản. | `LP-FD1-Thanh-P3.md` |
| [P4](LP-FD1-Thanh-P4.md) | Hiểu Kit Builder phía web: 3 bước, giữ bộ qua đăng nhập, đưa cả bộ vào giỏ. | `LP-FD1-Thanh-P4.md` |
| [P5](LP-FD1-Thanh-P5.md) | Rà accessibility Desktop cho trang khách. | `LP-FD1-Thanh-P5.md` |
| [P6](LP-FD1-Thanh-P6.md) | Hiểu cách đưa một tính năng AI vào giao diện mà không làm hỏng luồng cũ: ô nhập, trạng thái chờ, lỗi, đường lùi về form. | `LP-FD1-Thanh-P6.md` |

## Nhiệm vụ xây dựng của bạn (commit đứng tên bạn)
Bạn tự xây phần này trong repo nhóm. Quy trình: [ROADMAP](../../ROADMAP.md).

| Mã | Phase | Việc | Test nghiệm thu | Phải merge trước |
|---|---|---|---|---|
| PRJ-P1-FD1-1 | P1 | Router, layout, header, footer, gọi API | — | PRJ-P0-PD-1 |
| PRJ-P1-FD1-2 | P1 | Trang chủ: intro video, chữ hiện từng từ, các section | — | PRJ-P1-FD1-1, PRJ-P1-BD1-2 |
| PRJ-P1-FD1-3 | P1 | Danh mục: bộ lọc trái, URL, thẻ sản phẩm | — | PRJ-P1-FD1-1, PRJ-P1-BD1-2 |
| PRJ-P1-FD1-4 | P1 | Chi tiết sản phẩm: biến thể, giá, tồn | — | PRJ-P1-FD1-3 |
| PRJ-P2-FD1-1 | P2 | Giỏ hàng + voucher | — | PRJ-P2-BD2-2 |
| PRJ-P2-FD1-2 | P2 | Thanh toán + hộp đối chiếu 409 | — | PRJ-P2-FD1-1, PRJ-P2-BD1-2 |
| PRJ-P2-FD1-3 | P2 | Thêm vào giỏ, ghi sản phẩm đã xem | — | PRJ-P2-FD1-1, PRJ-P1-BD1-4 |
| PRJ-P3-FD1-1 | P3 | Chi tiết đơn + kết quả thanh toán | — | PRJ-P3-BD1-2 |
| PRJ-P3-FD1-2 | P3 | Đánh giá trên trang sản phẩm | — | PRJ-P3-BD1-3 |
| PRJ-P4-FD1-1 | P4 | Kit Builder 3 bước + giữ bộ qua đăng nhập | — | PRJ-P4-BD2-1 |
| PRJ-P4-FD1-2 | P4 | Xem trước bộ trên trang chủ | — | PRJ-P4-FD1-1 |
| PRJ-P5-FD1-1 | P5 | Rà accessibility trang khách | — | — |
| PRJ-P6-FD1-1 | P6 | Ô AI + "Lộ trình chọn đồ" mẫu + dải AI Sản phẩm | — | PRJ-P6-BD1-1, PRJ-P4-FD1-1 |
| PRJ-P6-FD1-2 | P6 | Kit Builder: "Chọn món", lỗi tại món, nút nâng ngân sách | — | PRJ-P6-BD1-3, PRJ-P6-FD1-1 |

## Lỗi hay gặp bạn nên đọc kỹ
- [A3. Video intro "giật một nhịp" khi kết thúc](../PITFALLS.md#a3)
- [A4. Intro lúc có hiệu ứng lúc không](../PITFALLS.md#a4)
- [A5. Khi nào cho xem lại intro](../PITFALLS.md#a5)
- [A6. Watermark trong video và ảnh](../PITFALLS.md#a6)
- [D1. Header nhấp nháy mỗi lần đổi trang](../PITFALLS.md#d1)
- [D2. Chữ tiếng Việt biến thành dấu "?"](../PITFALLS.md#d2)
- [D4. Dấu tiếng Việt bị cắt ở tiêu đề có hiệu ứng](../PITFALLS.md#d4)
- [D3. Gửi thừa trường bị 400](../PITFALLS.md#d3)
- [D5. Lỗi build TS1294](../PITFALLS.md#d5)
- [C2. Không tin giá trình duyệt gửi lên](../PITFALLS.md#c2)
- [C4. VNPay gọi IPN hai lần, hoặc gọi trễ](../PITFALLS.md#c4)
- [D6. Giữ bộ Kit khi phải đi đăng nhập](../PITFALLS.md#d6)
- [E4. "Báo đã click" không phải bằng chứng](../PITFALLS.md#e4)

## Tài liệu chính thức nên mở song song
- https://react.dev/learn
- https://reactrouter.com
- https://motion.dev/docs/react
- https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
- https://www.typescriptlang.org/tsconfig/#erasableSyntaxOnly

## Theo dõi tiến độ của bạn
| Mã task | PR (link) | Test pass | Ảnh/diff | Mục AI-LOG | Ngày merge |
|---|---|---|---|---|---|
| PRJ-P1-FD1-1 |  |  |  |  |  |
| PRJ-P1-FD1-2 |  |  |  |  |  |
| PRJ-P1-FD1-3 |  |  |  |  |  |
| PRJ-P1-FD1-4 |  |  |  |  |  |
| PRJ-P2-FD1-1 |  |  |  |  |  |
| PRJ-P2-FD1-2 |  |  |  |  |  |
| PRJ-P2-FD1-3 |  |  |  |  |  |
| PRJ-P3-FD1-1 |  |  |  |  |  |
| PRJ-P3-FD1-2 |  |  |  |  |  |
| PRJ-P4-FD1-1 |  |  |  |  |  |
| PRJ-P4-FD1-2 |  |  |  |  |  |
| PRJ-P5-FD1-1 |  |  |  |  |  |
| PRJ-P6-FD1-1 |  |  |  |  |  |
| PRJ-P6-FD1-2 |  |  |  |  |  |

| Phase | Tiêu chí học đạt |
|---|---|
| P1 | __/7 |
| P2 | __/5 |
| P3 | __/4 |
| P4 | __/4 |
| P5 | __/4 |
| P6 | __/5 |
