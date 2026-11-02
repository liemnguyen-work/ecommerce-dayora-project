---
tags: [decisions]
---
# DECISIONS — Quyết định nghiệp vụ và kỹ thuật

Mỗi dòng một quyết định. Trạng thái: **đề xuất** (chờ nhóm duyệt ở P0) → **chốt** (đã duyệt, ghi ngày và người duyệt) → **thay đổi** (ghi [CHANGELOG](CHANGELOG.md)). Quyết định lớn có thể viết ADR theo [mẫu](adr/_TEMPLATE.md). Về [HOME](../HOME.md).

Mọi dòng dưới đây đang là **đề xuất**. PM điều phối họp chốt ở P0, ghi ngày và người duyệt khi chốt.

## Kỹ thuật
| Mã | Quyết định đề xuất | Trạng thái |
|---|---|---|
| K01 | Stack: React + TypeScript + Tailwind + Vite (web) / NestJS (API) / PostgreSQL trên Supabase / VNPay Sandbox (theo `AGENTS.md`) | đề xuất |
| K02 | Monorepo npm workspaces `apps/web`, `apps/api` | đề xuất |
| K03 | ORM và migration (ví dụ Prisma + `prisma migrate`); mọi thay đổi schema qua migration | đề xuất |
| K04 | Deploy: web Vercel, API Render, DB Supabase | đề xuất |
| K05 | Auth: JWT trong cookie httpOnly; mật khẩu băm có salt (bcrypt hoặc scrypt) | đề xuất |
| K06 | Animation: tôn trọng `prefers-reduced-motion` | đề xuất |
| K07 | Test: Vitest hoặc Jest (API); CI GitHub Actions chạy lint + test + build mỗi PR | đề xuất |

## Nghiệp vụ (bảng 2.6 — câu hỏi cần chốt trước khi code)
| Mã | Câu hỏi | Phương án đề xuất | Trạng thái |
|---|---|---|---|
| D01 | Đếm SKU, định mức Kit | 30 SKU = 30 biến thể bán. Định mức + danh sách thiết yếu/tùy chọn mỗi tình huống lưu trong RuleSet v1 (JSON), PM + BD2 chốt | đề xuất |
| D02 | Phí giao | Tạm tính khi chưa có địa chỉ: 30.000đ. Chính thức: HCM nội thành 20.000đ, ngoại thành 30.000đ, tỉnh khác 40.000đ; miễn phí HCM khi tiền hàng sau giảm ≥ 500.000đ | đề xuất |
| D03 | Kết hợp ưu đãi | Giá sale trên SKU + **1** voucher/đơn. Voucher tính trên tiền hàng sau sale, không trên phí giao. Giảm % làm tròn xuống, có trần `maxDiscount` | đề xuất |
| D04 | Đăng nhập khi mua | Khách vãng lai xem hàng + thử Kit Builder; giỏ/checkout cần đăng nhập; bộ kit đang dở lưu `sessionStorage` và đưa vào giỏ sau khi đăng nhập | đề xuất |
| D05 | Điều kiện đánh giá | Chỉ khi đơn đã thanh toán và đã giao; mỗi (user, sản phẩm, đơn) 1 đánh giá | đề xuất |
| D06 | Giữ/trừ tồn | Tạo đơn: `reserved += qty` trong transaction (kiểm `stock - reserved ≥ qty`). IPN thành công: `stock -= qty, reserved -= qty`. Thất bại/hủy/hết hạn 15 phút: `reserved -= qty` | đề xuất |
| D07 | Callback đến muộn | IPN thành công sau khi đơn đã hết hạn: còn tồn → giữ lại và xác nhận đơn; hết → đánh dấu đã trả tiền + cần hoàn tiền thủ công, ghi log | đề xuất |
| D08 | Trạng thái đơn | Tách 3 trục: `status`, `paymentStatus`, `shippingStatus`. Admin chỉ chuyển theo sơ đồ, mỗi lần ghi log | đề xuất |
| D09 | Bộ kit nháp khi có quy tắc mới | Kit gắn `ruleSetVersion`. Checkout so phiên bản; khác thì báo và yêu cầu khách xác nhận lại | đề xuất |
| D10 | Dashboard | Doanh thu = tổng `total` của đơn đã thanh toán, chưa hủy; bán chạy theo số lượng; mặc định 30 ngày gần nhất | đề xuất |
| D11 | Innovation | FR18 (checklist + email nhắc) chỉ làm nếu cuối P5 core đạt; quyết định ở buổi chốt P5. Có thể thay bằng phương án khác nếu nhóm chốt và ghi CHANGELOG | đề xuất |

## Ghi chú dữ liệu
- Chỗ dữ liệu sản phẩm mâu thuẫn (xem [PITFALLS](learning/PITFALLS.md#b1)): ghi ngày, quyết định, người duyệt ở đây.
