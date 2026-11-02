---
tags: [learning, member/PD]
member: Đạt
role: PD
---
# PD Đạt — Product Designer (UI/UX)

Lộ trình học riêng của bạn. Cách học chung, quy trình commit và AI-LOG: [LEARNING-PATH](../LEARNING-PATH.md). Lỗi hay gặp để học tư duy: [PITFALLS](../PITFALLS.md).

## Phần code bạn sở hữu
Bạn phải giải thích và tự sửa được các phần này khi GV hỏi. Người review PR của bạn: **FD1 Thành**.
- `docs/DESIGN-SYSTEM.md`
- `docs/SOURCE-INVENTORY.md`
- `apps/web/public/home/`
- `apps/web/src/index.css (token, review cùng FD1)`

## Lộ trình 5 phase
| Phase | Mục tiêu học | File |
|---|---|---|
| [P1](LP-PD-Dat-P1.md) | Hiểu và bảo vệ được hệ thiết kế của nhóm: vì sao bố cục này, màu này, font này. | `LP-PD-Dat-P1.md` |
| [P2](LP-PD-Dat-P2.md) | Đánh giá UX giỏ hàng và thanh toán. | `LP-PD-Dat-P2.md` |
| [P3](LP-PD-Dat-P3.md) | Đánh giá UX trang đơn, kết quả thanh toán, tài khoản. | `LP-PD-Dat-P3.md` |
| [P4](LP-PD-Dat-P4.md) | Đánh giá UX Kit Builder. | `LP-PD-Dat-P4.md` |
| [P5](LP-PD-Dat-P5.md) | Kiểm tra tương phản và focus theo WCAG. | `LP-PD-Dat-P5.md` |

## Nhiệm vụ xây dựng của bạn (commit đứng tên bạn)
Bạn tự xây phần này trong repo nhóm. Quy trình: [ROADMAP](../../ROADMAP.md).

| Mã | Phase | Việc | Test nghiệm thu | Phải merge trước |
|---|---|---|---|---|
| PRJ-P0-PD-1 | P0 | Design token + font | — | PRJ-P0-DO-1 |
| PRJ-P1-PD-1 | P1 | Trang Về chúng tôi | — | PRJ-P1-FD1-1 |
| PRJ-P1-PD-2 | P1 | Đối chiếu giao diện P1 với DESIGN-SYSTEM | — | PRJ-P1-FD1-4 |
| PRJ-P2-PD-1 | P2 | Đối chiếu giao diện giỏ/thanh toán | — | PRJ-P2-FD1-2 |
| PRJ-P3-PD-1 | P3 | Đối chiếu giao diện đơn/tài khoản | — | PRJ-P3-FD1-1 |
| PRJ-P4-PD-1 | P4 | Đối chiếu Kit Builder + thử với 2 người | — | PRJ-P4-FD1-1 |
| PRJ-P5-PD-1 | P5 | Kiểm tương phản + nguồn ảnh | — | — |

### Việc P0 (28/10–03/11, trước khi vào P1)
### PRJ-P0-PD-1 — Design token + font
- **File phải viết:** `apps/web/src/index.css` (@theme, :root, nền tảng); `apps/web/src/main.tsx` (import font); `docs/DESIGN-SYSTEM.md`
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** PRJ-P0-DO-1
- **Kiểm chứng:** ca kiểm thử tay trong `docs/testing/TEST-CASES.md` (QA duyệt); ảnh 1366 px và 390 px trong PR; PD duyệt theo `docs/DESIGN-SYSTEM.md`.
- **Nhánh:** `prj/p0-pd-1` · **Reviewer:** FD1 Thành
- **Các bước:**
  - [ ] 1. Viết `docs/DESIGN-SYSTEM.md`: màu (lấy từ bộ nhận diện Buổi 1), font hỗ trợ tiếng Việt, cỡ chữ — Xong khi: nói được mỗi màu dùng cho gì
  - [ ] 2. `apps/web/src/index.css`: `@import 'tailwindcss';`, khối `@theme` khai `--color-ink`, `--color-paper`, `--color-butter`, `--color-berry`, `--color-leaf` và font; `:root` cho token còn lại — Xong khi: class `bg-paper text-ink` đổi màu đúng
  - [ ] 3. Font: `npm i -w web @fontsource/be-vietnam-pro`, import `400.css`, `600.css`, `800.css` trong `main.tsx` — Xong khi: DevTools → Computed → font-family là Be Vietnam Pro
  - [ ] 4. Trang mẫu tạm trong `App.tsx`: 5 ô màu, 3 cỡ chữ, một nút chính — Xong khi: ảnh 1366 px trong PR, FD1 duyệt
  - [ ] 5. Viết `docs/DESIGN-SYSTEM.md` của nhóm: bảng màu (mã hex, dùng cho gì), font, khoảng cách, kiểu nút — Xong khi: FD1 đọc mà không phải hỏi lại

## Lỗi hay gặp bạn nên đọc kỹ
- [A1. Thiết kế đẹp nhưng sai mục đích](../PITFALLS.md#a1)
- [A6. Watermark trong video và ảnh](../PITFALLS.md#a6)
- [A10. Font phải đọc được tiếng Việt](../PITFALLS.md#a10)
- [A9. Trang danh mục phải "vừa một màn hình"](../PITFALLS.md#a9)
- [C4. VNPay gọi IPN hai lần, hoặc gọi trễ](../PITFALLS.md#c4)
- [D6. Giữ bộ Kit khi phải đi đăng nhập](../PITFALLS.md#d6)
- [D4. Dấu tiếng Việt bị cắt ở tiêu đề có hiệu ứng](../PITFALLS.md#d4)

## Tài liệu chính thức nên mở song song
- https://www.w3.org/WAI/WCAG21/quickref/
- https://webaim.org/resources/contrastchecker/
- https://labs.google/fx/tools/whisk

## Theo dõi tiến độ của bạn
| Mã task | PR (link) | Test pass | Ảnh/diff | Mục AI-LOG | Ngày merge |
|---|---|---|---|---|---|
| PRJ-P0-PD-1 |  |  |  |  |  |
| PRJ-P1-PD-1 |  |  |  |  |  |
| PRJ-P1-PD-2 |  |  |  |  |  |
| PRJ-P2-PD-1 |  |  |  |  |  |
| PRJ-P3-PD-1 |  |  |  |  |  |
| PRJ-P4-PD-1 |  |  |  |  |  |
| PRJ-P5-PD-1 |  |  |  |  |  |

| Phase | Tiêu chí học đạt |
|---|---|
| P1 | __/4 |
| P2 | __/3 |
| P3 | __/2 |
| P4 | __/2 |
| P5 | __/2 |
