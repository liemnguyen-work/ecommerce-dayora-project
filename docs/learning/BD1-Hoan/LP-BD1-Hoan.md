---
tags: [learning, member/BD1]
member: Hoàn
role: BD1
---
# BD1 Hoàn — Backend 1 — khách hàng, giao dịch

Lộ trình học riêng của bạn. Cách học chung, quy trình commit và AI-LOG: [LEARNING-PATH](../LEARNING-PATH.md). Lỗi hay gặp để học tư duy: [PITFALLS](../PITFALLS.md).

## Phần code bạn sở hữu
Bạn phải giải thích và tự sửa được các phần này khi GV hỏi. Người review PR của bạn: **BD2 Châu**.
- `apps/api/src/auth/`
- `apps/api/src/catalog/`
- `apps/api/src/me/`
- `apps/api/src/pricing/`
- `apps/api/src/orders/checkout.service.ts`
- `apps/api/src/payments/`
- `apps/api/src/reviews/`
- `apps/api/src/kit/kit-engine.ts`
- `apps/api/src/admin-vouchers/`

## Lộ trình 6 phase
| Phase | Mục tiêu học | File |
|---|---|---|
| [P1](LP-BD1-Hoan-P1.md) | Hiểu một request đi từ trình duyệt vào NestJS, qua đăng nhập bằng cookie, tới database và quay về. | `LP-BD1-Hoan-P1.md` |
| [P2](LP-BD1-Hoan-P2.md) | Hiểu cách server tính tiền và tạo đơn an toàn khi nhiều người mua cùng lúc. | `LP-BD1-Hoan-P2.md` |
| [P3](LP-BD1-Hoan-P3.md) | Hiểu thanh toán VNPay end-to-end: tạo URL, ký, IPN, Return, và xử lý lặp/trễ. | `LP-BD1-Hoan-P3.md` |
| [P4](LP-BD1-Hoan-P4.md) | Hiểu Kit engine: từ tình huống, số người, ngân sách ra danh sách món và số lượng. | `LP-BD1-Hoan-P4.md` |
| [P5](LP-BD1-Hoan-P5.md) | Hiểu các lớp bảo vệ quanh đăng nhập và cách chứng minh không có IDOR. | `LP-BD1-Hoan-P5.md` |
| [P6](LP-BD1-Hoan-P6.md) | Hiểu cách gọi một mô hình AI (Gemini) an toàn từ backend: chỉ để trích dữ liệu, kiểm lại output, xử lý lỗi và giới hạn lượt. | `LP-BD1-Hoan-P6.md` |

## Nhiệm vụ xây dựng của bạn (commit đứng tên bạn)
Bạn tự xây phần này trong repo nhóm. Quy trình: [ROADMAP](../../ROADMAP.md).

| Mã | Phase | Việc | Test nghiệm thu | Phải merge trước |
|---|---|---|---|---|
| PRJ-P1-BD1-1 | P1 | Đăng ký, đăng nhập, guard | 1 file | PRJ-P0-BD2-1 |
| PRJ-P1-BD1-2 | P1 | API catalog (lọc, sắp xếp, chi tiết) | 1 file | PRJ-P0-BD2-1 |
| PRJ-P1-BD1-3 | P1 | API ưu đãi công khai | 1 file | — |
| PRJ-P1-BD1-4 | P1 | Hồ sơ, đổi mật khẩu, sản phẩm đã xem | 1 file | PRJ-P1-BD2-2 |
| PRJ-P2-BD1-1 | P2 | Tính tiền thuần (voucher, phí giao) | 1 file | — |
| PRJ-P2-BD1-2 | P2 | Tạo đơn, giữ tồn, hủy, hết hạn 15 phút | 1 file | PRJ-P2-BD2-2 |
| PRJ-P2-BD1-3 | P2 | Admin voucher + khuyến mãi | 1 file | PRJ-P1-BD1-1 |
| PRJ-P3-BD1-1 | P3 | Ký và kiểm chữ ký VNPay | 1 file | — |
| PRJ-P3-BD1-2 | P3 | Thanh toán: tạo URL, Return, IPN | 1 file | PRJ-P3-BD1-1, PRJ-P2-BD1-2 |
| PRJ-P3-BD1-3 | P3 | Đánh giá sau mua | 2 file | PRJ-P3-BD2-1 |
| PRJ-P4-BD1-1 | P4 | Kit engine R01–R05 | 1 file | — |
| PRJ-P5-BD1-1 | P5 | Khóa tài khoản chặn token cũ + biên bản IDOR | — | PRJ-P5-BD2-2 |
| PRJ-P6-BD1-1 | P6 | API AI đọc mô tả chuyến đi | 1 file | PRJ-P4-BD1-1 |
| PRJ-P6-BD1-2 | P6 | API đăng nhập Google/Facebook qua Supabase | `auth.spec.ts` | PRJ-P1-BD1-1 |
| PRJ-P6-BD1-3 | P6 | Engine tự tính số lượng, `overBy`, AI "mua lại" | `kit-engine.spec.ts`, `kit-ai.spec.ts` | PRJ-P6-BD1-1 |

## Lỗi hay gặp bạn nên đọc kỹ
- [C5. Tài khoản bị khóa nhưng token cũ còn hạn](../PITFALLS.md#c5)
- [D3. Gửi thừa trường bị 400](../PITFALLS.md#d3)
- [B5. Email admin viết hoa không đăng nhập được](../PITFALLS.md#b5)
- [C1. Hai người cùng mua món cuối cùng](../PITFALLS.md#c1)
- [C2. Không tin giá trình duyệt gửi lên](../PITFALLS.md#c2)
- [B3. Schema thiếu trường, không sửa schema](../PITFALLS.md#b3)
- [C4. VNPay gọi IPN hai lần, hoặc gọi trễ](../PITFALLS.md#c4)
- [C3. Kit Builder chọn hàng "rẻ" mà tổng lại đắt](../PITFALLS.md#c3)
- [C6. Rate limit sau proxy](../PITFALLS.md#c6)

## Tài liệu chính thức nên mở song song
- https://docs.nestjs.com
- https://www.prisma.io/docs
- https://sandbox.vnpayment.vn/apis/docs/thanh-toan-pay/pay.html
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

## Theo dõi tiến độ của bạn
| Mã task | PR (link) | Test pass | Ảnh/diff | Mục AI-LOG | Ngày merge |
|---|---|---|---|---|---|
| PRJ-P1-BD1-1 |  |  |  |  |  |
| PRJ-P1-BD1-2 |  |  |  |  |  |
| PRJ-P1-BD1-3 |  |  |  |  |  |
| PRJ-P1-BD1-4 |  |  |  |  |  |
| PRJ-P2-BD1-1 |  |  |  |  |  |
| PRJ-P2-BD1-2 |  |  |  |  |  |
| PRJ-P2-BD1-3 |  |  |  |  |  |
| PRJ-P3-BD1-1 |  |  |  |  |  |
| PRJ-P3-BD1-2 |  |  |  |  |  |
| PRJ-P3-BD1-3 |  |  |  |  |  |
| PRJ-P4-BD1-1 |  |  |  |  |  |
| PRJ-P5-BD1-1 |  |  |  |  |  |
| PRJ-P6-BD1-1 |  |  |  |  |  |
| PRJ-P6-BD1-2 |  |  |  |  |  |
| PRJ-P6-BD1-3 |  |  |  |  |  |

| Phase | Tiêu chí học đạt |
| ----- | ---------------- |
| P1    | __/7             |
| P2    | __/7             |
| P3    | __/6             |
| P4    | __/5             |
| P5    | __/4             |
| P6    | __/4             |
