---
tags: [learning, member/BD2, phase/P2]
---
# P2 · BD2 Châu

> P2 Giỏ hàng, voucher, phí giao, checkout (11/11–17/11) · Tổng quan của bạn: [LP-BD2-Chau](LP-BD2-Chau.md) · Hướng dẫn phase: [P2-BD2-Chau](../../../phases/P2-cart-checkout/BD2-Chau/P2-BD2-Chau.md) · Log của bạn: `docs/ai-logs/chau.md`

**Mục tiêu:** Hiểu giỏ hàng và xem trước đơn: server tính giá, phát hiện giá đổi.

Thời lượng gợi ý: cả phase (1 tuần). **Thứ tự làm:**
1. Mục 2 + bước 1 (khái niệm) · đọc issue và tiêu chí xong của task ở mục 6.
2. **Mục 6: viết test hoặc ca kiểm thử trước, rồi tự xây task PRJ** (bước 5). Kẹt quá 1 buổi: hỏi reviewer hoặc PM.
3. Khi kiểm chứng đạt: bước 2 đọc lại code của chính bạn, giải thích được từng file ở mục 1.
4. Mục 3, 4, bước 3, 4, 6, 7: kiểm hiểu biết, tình huống, luyện bảo vệ, AI-LOG.

## 1. File bạn sẽ viết hoặc sửa
1. `apps/api/src/cart/cart.controller.ts`
2. `apps/api/src/cart/cart.service.ts`
3. `apps/api/src/cart/cart.dto.ts`
4. `apps/api/src/orders/orders.service.ts`
5. `apps/api/src/orders/orders.dto.ts`
6. `apps/api/src/cart/cart.service.spec.ts`

## 2. Kiến thức cần nắm
| # | Khái niệm | Vì sao cần | Thấy ở đâu trong code |
|---|---|---|---|
| 1 | Giỏ gắn user (1 user – 1 cart) | Giỏ theo tài khoản (D04) | `cart.service.ts` |
| 2 | IDOR khi sửa dòng giỏ | Sửa dòng của người khác → 404 | `update`, `remove` |
| 3 | Preview: subtotal, saleDiscount, voucher, shippingFee, total, warnings | Hợp đồng với web | `orders.service.ts` `preview` |
| 4 | Cảnh báo PRICE_CHANGED qua `expected` | Phát hiện giá đổi | `preview` |
| 5 | Phí tạm tính 30.000đ khi chưa có địa chỉ | D02 | `preview` |
| 6 | Thêm nhiều món một lần (bulk) | Kit Builder đưa cả bộ vào giỏ | `POST /cart/items/bulk` |

## 3. Tiêu chí đạt (tự đánh dấu, có bằng chứng)
- [ ] Giải thích luồng thêm 1 món và thêm cả bộ (bulk).
- [ ] Chứng minh bằng thử thật: khách B sửa dòng giỏ của khách A → 404.
- [ ] Đọc một response preview và giải thích từng trường.
- [ ] Giải thích khi nào có `PRICE_CHANGED`.
- [ ] Nói được preview gọi `calculatePricing` của BD1 ở đâu.

Đạt khi: mọi ô được đánh dấu **và** mỗi ô có bằng chứng trong AI-LOG hoặc PR (lệnh đã chạy, ảnh, link commit).

## 4. Lỗi hay gặp trong phần này
Đọc tình huống, **tự đoán nguyên nhân trước** rồi mới đọc lời giải.

| Vấn đề | Cách tránh | Đọc thêm |
|---|---|---|
| Giá web thấy khác giá thật | Trường `expected`, cảnh báo PRICE_CHANGED. | [C2](../PITFALLS.md#c2) |
| Gửi thừa trường địa chỉ | Preview chỉ nhận 3 trường. | [D3](../PITFALLS.md#d3) |

## 5. Lộ trình prompt (làm lần lượt, mỗi bước một phiên AI)
Mở đầu mỗi phiên bằng prompt "Khởi động phiên" trong [P2-BD2-Chau](../../../phases/P2-cart-checkout/BD2-Chau/P2-BD2-Chau.md) mục 4.1. **Không dán `.env`, mật khẩu, khóa.** Mỗi bước xong ghi một mục AI-LOG theo mã gợi ý.

### Bước 1 — Hiểu khái niệm (AI-P2-BD2-01)
```text
Tôi là Châu (BD2) trong dự án DAYORA. Giải thích lần lượt các khái niệm sau bằng ví dụ đời thường, mỗi lần MỘT khái niệm, hỏi tôi 1 câu kiểm tra rồi mới sang khái niệm tiếp theo:
1. Giỏ gắn user (1 user – 1 cart)
2. IDOR khi sửa dòng giỏ
3. Preview: subtotal, saleDiscount, voucher, shippingFee, total, warnings
4. Cảnh báo PRICE_CHANGED qua `expected`
5. Phí tạm tính 30.000đ khi chưa có địa chỉ
6. Thêm nhiều món một lần (bulk)
Không viết code. Nếu tôi trả lời sai, giải thích lại theo cách khác.
```
Tự kiểm: đóng AI, viết lại mỗi khái niệm 1 câu bằng lời của bạn.

### Bước 2 — Đọc lại code của bạn (AI-P2-BD2-02)
Dán **từng file** theo thứ tự mục 1 (file dài thì dán từng hàm).
```text
Đây là <tên file> của DAYORA:
<dán code>
1) Tóm tắt file làm gì trong 3 câu.
2) Đi qua từng hàm: đầu vào, đầu ra, bước quan trọng; chỉ số dòng.
3) Khái niệm nào trong danh sách sau xuất hiện ở đâu: Giỏ gắn user (1 user – 1 cart); IDOR khi sửa dòng giỏ; Preview: subtotal, saleDiscount, voucher, shippingFee, total, warnings; Cảnh báo PRICE_CHANGED qua `expected`; Phí tạm tính 30.000đ khi chưa có địa chỉ; Thêm nhiều món một lần (bulk).
4) Hỏi tôi 3 câu. Chỉ khi tôi trả lời đúng mới sang file tiếp.
```
Tự kiểm: mở file trong VS Code, tìm đúng dòng AI chỉ. **AI có thể chỉ sai dòng hoặc bịa hàm**: ghi lại nếu gặp.

### Bước 3 — Dự đoán rồi thử (AI-P2-BD2-03)
Viết dự đoán **trước** khi chạy, rồi mới chạy.
```text
Tôi đổi giá một SKU bằng trang Admin trong khi giỏ đang có món đó, rồi mở trang thanh toán. Tôi dự đoán <điều xảy ra>.
Đừng nói kết quả. Hãy hỏi tôi vì sao tôi dự đoán vậy, rồi hướng dẫn tôi cách chạy và cách đọc kết quả.
```
Ghi vào AI-LOG: dự đoán, kết quả thật, giải thích chỗ khác nhau.

### Bước 4 — Học từ tình huống thật (AI-P2-BD2-04)
Chọn 1 tình huống ở mục 4, dán phần **Dấu hiệu** (chưa dán lời giải).
```text
Đây là một lỗi hay gặp khi làm phần này của DAYORA:
<dán phần Dấu hiệu>
Đừng nói lời giải. Hỏi tôi từng câu gợi ý để tôi tự tìm ra nguyên nhân gốc. Sau đó tôi sẽ dán phần Nguyên nhân và Cách tránh trong tài liệu để bạn so với suy luận của tôi.
```
Ghi AI-LOG: suy luận của bạn khác lời giải thật ở đâu.

### Bước 5 — Tự xây phần của bạn (AI-P2-BD2-05, mỗi task PRJ một mục log)
Xem mục 6. AI chỉ **hướng dẫn và review**, bạn tự gõ code. Làm task PRJ trước, bài tập mở rộng sau.
```text
Tôi đang tự viết PRJ-P2-BD2-1 "API giỏ hàng" của dự án DAYORA.
File tôi phải viết: apps/api/src/cart/.
Test nghiệm thu phải pass (không được sửa test): <dán nội dung apps/api/src/cart/cart.service.spec.ts>
1) Đọc test, giải thích test yêu cầu hàm/route nào, trả về gì.
2) Giúp tôi liệt kê các bước cài đặt theo thứ tự, mỗi bước chạy được test.
Đừng viết code thay tôi. Chờ tôi làm xong mỗi bước. Khi tôi dán lỗi test hoặc git diff, chỉ ra chỗ sai và vì sao, gợi ý hướng sửa chứ không đưa code hoàn chỉnh.
```
Khi kiểm chứng đạt hoặc kẹt quá 1 buổi: ghi vào log cá nhân việc đã làm, chỗ kẹt và cách gỡ (xem [ROADMAP](../../ROADMAP.md)).

### Bước 6 — Luyện bảo vệ (AI-P2-BD2-06)
```text
Đóng vai giảng viên chấm đồ án. Phần tôi phụ trách ở P2: Hiểu giỏ hàng và xem trước đơn: server tính giá, phát hiện giá đổi.
Hỏi tôi lần lượt (mỗi câu tôi trả lời trong 30 giây, không xem code):
1. Vì sao giỏ không lưu giá?
2. Món trong giỏ bị admin ẩn thì preview báo gì?
Sau đó hỏi thêm 2 câu vặn dựa trên câu trả lời của tôi, ra 1 yêu cầu sửa code nhỏ. Chấm từng câu và nói tôi cần học lại gì.
```

### Bước 7 — Ghi nhật ký AI
Nối thêm một mục vào log cá nhân `docs/ai-logs/<tên>.md` theo [quy tắc ghi log](../../ai-logs/ai-logging-rules.md) (đủ 7 trường, có mã phiên và mã mục, chỉ nối thêm). Phần **Phản biện**, **Quyết định của nhóm**, **Người kiểm tra** phải tự viết.

## 6. Nhiệm vụ xây dựng (commit đứng tên bạn)
Quy trình chung: [ROADMAP](../../ROADMAP.md).

### PRJ-P2-BD2-1 — API giỏ hàng
- **File phải viết:** `apps/api/src/cart/`
- **Test nghiệm thu:** `apps/api/src/cart/cart.service.spec.ts`
- **Phải merge trước:** PRJ-P1-BD1-1
- **Kiểm chứng:** viết test ở dòng trên **trước** khi code (commit riêng, QA duyệt ca test). Sau khi QA duyệt, không sửa test cho dễ pass; cần đổi thì ghi lý do trong PR.
- **Nhánh:** `prj/p2-bd2-1` · **Reviewer:** BD1 Hoàn

### PRJ-P2-BD2-2 — Xem trước đơn (preview)
- **File phải viết:** `apps/api/src/orders/orders.service.ts`; `apps/api/src/orders/orders.dto.ts`
- **Test nghiệm thu:** `apps/api/src/orders/orders.service.spec.ts`
- **Phải merge trước:** PRJ-P2-BD2-1, PRJ-P2-BD1-1
- **Kiểm chứng:** viết test ở dòng trên **trước** khi code (commit riêng, QA duyệt ca test). Sau khi QA duyệt, không sửa test cho dễ pass; cần đổi thì ghi lý do trong PR.
- **Nhánh:** `prj/p2-bd2-2` · **Reviewer:** BD1 Hoàn

### PRJ-P2-BD2-3 — Seed voucher DAYORA10, PICNIC50K + 1 khuyến mãi
- **File phải viết:** `apps/api/prisma/seed.ts` (phần voucher)
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** PRJ-P1-BD2-1
- **Kiểm chứng:** chạy trên database nhóm, đối chiếu số liệu (số bảng, số SKU, kết quả API mẫu) với `REQUIREMENTS.md` và `docs/DECISIONS.md`; dán kết quả vào PR.
- **Nhánh:** `prj/p2-bd2-3` · **Reviewer:** BD1 Hoàn

### Bài tập mở rộng (sau khi xong task PRJ): Test preview khi giỏ trống và khi SKU bị ẩn
- **File:** `apps/api/src/orders/orders.service.spec.ts`
- **Các bước:**
  1. Đọc test có sẵn, kiểm tra 2 ca này đã có chưa.
  2. Viết ca chưa có, ghi rõ kết quả mong đợi.
  3. Chạy `npm test -w api -- orders`.
- **Xong khi:** Test mới pass, BD1 duyệt.
- **Quy trình git:** nhánh `study/bd2-p2` → PR → **BD1 Hoàn** review → merge.

## 7. Bằng chứng cần có trước khi sang phase sau
- [ ] Tối thiểu 4 mục AI-LOG thật (AI-P2-BD2-01 … AI-P2-BD2-06), mỗi mục có phần kiểm tra và tự giải thích.
- [ ] Mọi task PRJ của phase đã merge: test nghiệm thu pass, ảnh/diff đối chiếu trong PR; link PR ghi vào [LP-BD2-Chau](LP-BD2-Chau.md).
- [ ] Trả lời được các câu ở bước 6 không cần xem code.
- [ ] Cập nhật bảng tiến độ trong [LP-BD2-Chau](LP-BD2-Chau.md).
