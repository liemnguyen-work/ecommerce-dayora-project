---
tags: [demo, p7]
---
# Kịch bản demo và tập sửa code (P7)

Thời lượng trình bày: 10–15 phút. Kịch bản dưới đây là khung; cập nhật theo chức năng nhóm làm thật. Mở sẵn trước giờ: web, `/api/health`, repo trong VS Code, terminal `npm run dev:api` + `npm run dev:web`.

## Luồng demo (khoảng 8 phút)
| Phút | Nội dung | Màn hình | Điểm nhấn để nói |
|---|---|---|---|
| 0–1 | Bài toán và kiến trúc | `docs/ARCHITECTURE.md` (sơ đồ mục 1, 4) | React/Vite trên Vercel, NestJS trên Render, PostgreSQL Supabase; web gọi `/api` cùng tên miền nên cookie không bị chặn |
| 1–2 | Danh mục, bộ lọc, chi tiết | `/products` | ≥5 thuộc tính lọc; giá do server tính |
| 2–4 | Kit Builder | `/kit-builder` | 5 người đi biển, ngân sách; giải thích lý do từng món (R01–R04) ; đổi món; thêm món vượt ngân sách → lỗi tại món + "Nâng ngân sách thêm X" (R05); đưa bộ vào giỏ có ruleSetVersion |
| 3–4 | Innovation (nếu làm) | theo D11 | Nói rõ phần nào AI làm, phần nào server kiểm |
| 4–6 | Giỏ, voucher, checkout, VNPay | `/cart` → `/checkout` | DAYORA10; hộp đối chiếu khi giá đổi (409); giữ hàng 15 phút; thẻ NCB sandbox |
| 6–7 | Đơn và đánh giá | `/account` | IPN cập nhật đơn; chỉ đánh giá khi đã nhận hàng (D05) |
| 7–8 | Quản trị (mở thêm bản 390 px) | `/admin` | Đổi trạng thái đơn, phát hành RuleSet mới, dashboard 5 chỉ số |
| 8–10 | Bảo mật và kiểm thử | `docs/testing/` | IDOR, rate limit, chữ ký VNPay, 24+ ca Kit Builder, CI |

## Tập sửa code (mỗi người 1 đơn giản + 1 nâng cao trong module mình)
Quy trình khi GV yêu cầu: phân tích → chỉ ra file → giải thích → sửa → chạy test.

| Vai | Bài đơn giản (gợi ý) | Bài nâng cao (gợi ý) | File chính |
|---|---|---|---|
| FD1 | Thêm bộ lọc "Còn hàng" ở danh mục | Hiện cảnh báo khi giỏ có món hết hàng trước checkout | `apps/web/src/pages/CatalogPage.tsx`, `CartPage.tsx` |
| FD2 | Thêm cột "Ngày tạo" ở bảng đơn admin | Lọc đơn admin theo khoảng ngày | `apps/web/src/pages/AdminPage.tsx` |
| BD1 | Đổi định mức bình nước 1 → 2 mỗi người (RuleSet) | Thêm điều kiện voucher theo nhóm hàng | `apps/api/src/kit/`, `apps/api/src/pricing/` |
| BD2 | Thêm trường `note` cho đơn | Đổi thời gian giữ hàng 15 → 10 phút và test hết hạn | `apps/api/prisma/schema.prisma`, `apps/api/src/orders/` |
| QA | Thêm 1 ca test voucher hết lượt | Viết test IPN sai số tiền | `apps/api/src/**/*.spec.ts` |
| DO | Thêm biến môi trường mới trên Render | Rollback một deploy hỏng trên Vercel | `render.yaml`, `vercel.json` |
| PD | Đổi màu nút chính theo token | Sửa bố cục 390 px của một trang | `apps/web/src/index.css`, `catalog.css` |
| PM | Thêm dòng CHANGELOG cho thay đổi phạm vi | Giải thích luồng checkout từ UI tới DB | `docs/CHANGELOG.md`, `apps/api/src/orders/` |

## Câu hỏi hay gặp (chuẩn bị trả lời 1 người/câu)
- Vì sao giá không lấy từ client? → server tính lại trong `orders/preview` và khi tạo đơn.
- Hai người mua món cuối cùng cùng lúc thì sao? → một câu `UPDATE "Sku" SET reserved = reserved + qty WHERE stock - reserved >= qty` trong transaction; người thứ hai cập nhật 0 dòng → 409 `OUT_OF_STOCK`.
- Đổi món làm vượt ngân sách thì sao? → R05 trả 422 kèm `overBy`; web hiện ngay dưới món và đề nghị nâng ngân sách, không tự bỏ món.
- IPN gọi hai lần thì sao? → kiểm trạng thái + `(provider, txnNo)` duy nhất, trả `02`.
- Return URL và IPN khác gì? → Return chỉ để khách xem; IPN mới cập nhật đơn.
- Innovation có dùng AI thì AI làm gì? → chỉ trích thông tin; giá, tồn, quy tắc vẫn do server kiểm.
- Admin đổi quy tắc thì đơn cũ có đổi không? → không, đơn giữ snapshot và ruleSetVersion.
