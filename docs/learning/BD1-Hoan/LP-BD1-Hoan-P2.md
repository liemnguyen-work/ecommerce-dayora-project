---
tags: [learning, member/BD1, phase/P2]
---
# P2 · BD1 Hoàn

> P2 Giỏ hàng, voucher, phí giao, checkout (11/11–17/11) · Tổng quan của bạn: [LP-BD1-Hoan](LP-BD1-Hoan.md) · Hướng dẫn phase: [P2-BD1-Hoan](../../../phases/P2-cart-checkout/BD1-Hoan/P2-BD1-Hoan.md) · Log của bạn: `docs/ai-logs/hoan.md`

**Mục tiêu:** Hiểu cách server tính tiền và tạo đơn an toàn khi nhiều người mua cùng lúc.

Thời lượng gợi ý: cả phase (1 tuần). **Thứ tự làm:**
1. Mục 2 + bước 1 (khái niệm) · đọc issue và tiêu chí xong của task ở mục 6.
2. **Mục 6: viết test hoặc ca kiểm thử trước, rồi tự xây task PRJ** (bước 5). Kẹt quá 1 buổi: hỏi reviewer hoặc PM.
3. Khi kiểm chứng đạt: bước 2 đọc lại code của chính bạn, giải thích được từng file ở mục 1.
4. Mục 3, 4, bước 3, 4, 6, 7: kiểm hiểu biết, tình huống, luyện bảo vệ, AI-LOG.

## 1. File bạn sẽ viết hoặc sửa
1. `apps/api/src/pricing/pricing.ts`
2. `apps/api/src/pricing/pricing.spec.ts`
3. `apps/api/src/orders/create-order.dto.ts`
4. `apps/api/src/orders/checkout.service.ts`
5. `apps/api/src/orders/checkout.service.spec.ts`
6. `apps/api/src/admin-vouchers/admin-vouchers.service.ts`
7. `docs/DECISIONS.md` (D02, D03, D06)

## 2. Kiến thức cần nắm
| # | Khái niệm | Vì sao cần | Thấy ở đâu trong code |
|---|---|---|---|
| 1 | Hàm thuần (pure function) cho logic tiền | Dễ test, không phụ thuộc DB | `calculatePricing` trong `pricing.ts` |
| 2 | Làm tròn xuống, trần giảm giá `maxDiscount`, số nguyên VND | D03; tránh lệch 1đ | `pricing.ts` |
| 3 | Transaction (`prisma.$transaction`) | Một bước lỗi thì không ghi gì | `checkout.service.ts` hàm `create` |
| 4 | UPDATE có điều kiện (atomic) để giữ tồn | Chống bán vượt khi tranh mua | `UPDATE "Sku" SET reserved …` trong `create` |
| 5 | Khóa dòng `SELECT … FOR UPDATE`, khóa theo thứ tự để tránh deadlock | Voucher không bị dùng quá lượt | `create` |
| 6 | Snapshot đơn hàng (giá, tên tại thời điểm mua) | Đổi giá sau này không làm sai đơn cũ | `order.create` → `items` |
| 7 | Mã lỗi nghiệp vụ trong 409: CONFIRM_REQUIRED, OUT_OF_STOCK, RULESET_CHANGED | Web biết phải làm gì tiếp | `create` |

## 3. Tiêu chí đạt (tự đánh dấu, có bằng chứng)
- [ ] Tính tay được tổng tiền 3 ví dụ (có/không voucher, HCM nội/ngoại thành/tỉnh khác) và khớp với preview thật.
- [ ] Giải thích từng bước trong `create` theo thứ tự, nói được bước nào nằm trong transaction.
- [ ] Giải thích vì sao câu UPDATE có điều kiện chống được tranh tồn mà "đọc rồi trừ" thì không.
- [ ] Giải thích vì sao các SKU được khóa theo thứ tự id.
- [ ] Nói được 3 trường hợp trả 409 và web phản ứng thế nào.
- [ ] Biết đơn hết hạn sau bao lâu, ai trả tồn (`expireStaleOrders`, `release`).
- [ ] Viết thêm được một test biên cho `pricing.ts`.

Đạt khi: mọi ô được đánh dấu **và** mỗi ô có bằng chứng trong AI-LOG hoặc PR (lệnh đã chạy, ảnh, link commit).

## 4. Lỗi hay gặp trong phần này
Đọc tình huống, **tự đoán nguyên nhân trước** rồi mới đọc lời giải.

| Vấn đề | Cách tránh | Đọc thêm |
|---|---|---|
| Hai khách tranh món cuối | UPDATE có điều kiện + transaction; thử bằng 2 đơn song song trên database thật. | [C1](../PITFALLS.md#c1) |
| Giá đổi giữa lúc thanh toán | So `expected`/`expectedTotal`, trả CONFIRM_REQUIRED. | [C2](../PITFALLS.md#c2) |
| Schema thiếu trạng thái "hết hạn" | Ánh xạ CANCELLED + EXPIRED. | [B3](../PITFALLS.md#b3) |

## 5. Lộ trình prompt (làm lần lượt, mỗi bước một phiên AI)
Mở đầu mỗi phiên bằng prompt "Khởi động phiên" trong [P2-BD1-Hoan](../../../phases/P2-cart-checkout/BD1-Hoan/P2-BD1-Hoan.md) mục 4.1. **Không dán `.env`, mật khẩu, khóa.** Mỗi bước xong ghi một mục AI-LOG theo mã gợi ý.

### Bước 1 — Hiểu khái niệm (AI-P2-BD1-01)
```text
Tôi là Hoàn (BD1) trong dự án DAYORA. Giải thích lần lượt các khái niệm sau bằng ví dụ đời thường, mỗi lần MỘT khái niệm, hỏi tôi 1 câu kiểm tra rồi mới sang khái niệm tiếp theo:
1. Hàm thuần (pure function) cho logic tiền
2. Làm tròn xuống, trần giảm giá `maxDiscount`, số nguyên VND
3. Transaction (`prisma.$transaction`)
4. UPDATE có điều kiện (atomic) để giữ tồn
5. Khóa dòng `SELECT … FOR UPDATE`, khóa theo thứ tự để tránh deadlock
6. Snapshot đơn hàng (giá, tên tại thời điểm mua)
7. Mã lỗi nghiệp vụ trong 409: CONFIRM_REQUIRED, OUT_OF_STOCK, RULESET_CHANGED
Không viết code. Nếu tôi trả lời sai, giải thích lại theo cách khác.
```
Tự kiểm: đóng AI, viết lại mỗi khái niệm 1 câu bằng lời của bạn.

### Bước 2 — Đọc lại code của bạn (AI-P2-BD1-02)
Dán **từng file** theo thứ tự mục 1 (file dài thì dán từng hàm).
```text
Đây là <tên file> của DAYORA:
<dán code>
1) Tóm tắt file làm gì trong 3 câu.
2) Đi qua từng hàm: đầu vào, đầu ra, bước quan trọng; chỉ số dòng.
3) Khái niệm nào trong danh sách sau xuất hiện ở đâu: Hàm thuần (pure function) cho logic tiền; Làm tròn xuống, trần giảm giá `maxDiscount`, số nguyên VND; Transaction (`prisma.$transaction`); UPDATE có điều kiện (atomic) để giữ tồn; Khóa dòng `SELECT … FOR UPDATE`, khóa theo thứ tự để tránh deadlock; Snapshot đơn hàng (giá, tên tại thời điểm mua); Mã lỗi nghiệp vụ trong 409: CONFIRM_REQUIRED, OUT_OF_STOCK, RULESET_CHANGED.
4) Hỏi tôi 3 câu. Chỉ khi tôi trả lời đúng mới sang file tiếp.
```
Tự kiểm: mở file trong VS Code, tìm đúng dòng AI chỉ. **AI có thể chỉ sai dòng hoặc bịa hàm**: ghi lại nếu gặp.

### Bước 3 — Dự đoán rồi thử (AI-P2-BD1-03)
Viết dự đoán **trước** khi chạy, rồi mới chạy.
```text
Tôi sẽ đặt 2 bình nước, dùng `DAYORA10`, giao Quận 1. Tôi tính tay tổng là <số tôi tính>. Sau đó tôi đổi sang tỉnh khác và dự đoán phí giao là <dự đoán>.
Đừng nói kết quả. Hãy hỏi tôi vì sao tôi dự đoán vậy, rồi hướng dẫn tôi cách chạy và cách đọc kết quả.
```
Ghi vào AI-LOG: dự đoán, kết quả thật, giải thích chỗ khác nhau.

### Bước 4 — Học từ tình huống thật (AI-P2-BD1-04)
Chọn 1 tình huống ở mục 4, dán phần **Dấu hiệu** (chưa dán lời giải).
```text
Đây là một lỗi hay gặp khi làm phần này của DAYORA:
<dán phần Dấu hiệu>
Đừng nói lời giải. Hỏi tôi từng câu gợi ý để tôi tự tìm ra nguyên nhân gốc. Sau đó tôi sẽ dán phần Nguyên nhân và Cách tránh trong tài liệu để bạn so với suy luận của tôi.
```
Ghi AI-LOG: suy luận của bạn khác lời giải thật ở đâu.

### Bước 5 — Tự xây phần của bạn (AI-P2-BD1-05, mỗi task PRJ một mục log)
Xem mục 6. AI chỉ **hướng dẫn và review**, bạn tự gõ code. Làm task PRJ trước, bài tập mở rộng sau.
```text
Tôi đang tự viết PRJ-P2-BD1-1 "Tính tiền thuần (voucher, phí giao)" của dự án DAYORA.
File tôi phải viết: apps/api/src/pricing/.
Test nghiệm thu phải pass (không được sửa test): <dán nội dung apps/api/src/pricing/pricing.spec.ts>
1) Đọc test, giải thích test yêu cầu hàm/route nào, trả về gì.
2) Giúp tôi liệt kê các bước cài đặt theo thứ tự, mỗi bước chạy được test.
Đừng viết code thay tôi. Chờ tôi làm xong mỗi bước. Khi tôi dán lỗi test hoặc git diff, chỉ ra chỗ sai và vì sao, gợi ý hướng sửa chứ không đưa code hoàn chỉnh.
```
Khi kiểm chứng đạt hoặc kẹt quá 1 buổi: ghi vào log cá nhân việc đã làm, chỗ kẹt và cách gỡ (xem [ROADMAP](../../ROADMAP.md)).

### Bước 6 — Luyện bảo vệ (AI-P2-BD1-06)
```text
Đóng vai giảng viên chấm đồ án. Phần tôi phụ trách ở P2: Hiểu cách server tính tiền và tạo đơn an toàn khi nhiều người mua cùng lúc.
Hỏi tôi lần lượt (mỗi câu tôi trả lời trong 30 giây, không xem code):
1. Nếu đổi ngưỡng miễn phí thành 400.000đ thì sửa ở đâu: code, seed hay database?
2. Vì sao không trừ `stock` ngay khi tạo đơn mà tăng `reserved`?
3. Điều gì xảy ra nếu bỏ `FOR UPDATE` ở voucher?
Sau đó hỏi thêm 2 câu vặn dựa trên câu trả lời của tôi, ra 1 yêu cầu sửa code nhỏ. Chấm từng câu và nói tôi cần học lại gì.
```

### Bước 7 — Ghi nhật ký AI
Nối thêm một mục vào log cá nhân `docs/ai-logs/<tên>.md` theo [quy tắc ghi log](../../ai-logs/ai-logging-rules.md) (đủ 7 trường, có mã phiên và mã mục, chỉ nối thêm). Phần **Phản biện**, **Quyết định của nhóm**, **Người kiểm tra** phải tự viết.

## 6. Nhiệm vụ xây dựng (commit đứng tên bạn)
Quy trình chung: [ROADMAP](../../ROADMAP.md).

### PRJ-P2-BD1-1 — Tính tiền thuần (voucher, phí giao)
- **File phải viết:** `apps/api/src/pricing/`
- **Test nghiệm thu:** `apps/api/src/pricing/pricing.spec.ts`
- **Phải merge trước:** không
- **Kiểm chứng:** viết test ở dòng trên **trước** khi code (commit riêng, QA duyệt ca test). Sau khi QA duyệt, không sửa test cho dễ pass; cần đổi thì ghi lý do trong PR.
- **Nhánh:** `prj/p2-bd1-1` · **Reviewer:** BD2 Châu

### PRJ-P2-BD1-2 — Tạo đơn, giữ tồn, hủy, hết hạn 15 phút
- **File phải viết:** `apps/api/src/orders/checkout.service.ts, create-order.dto.ts, orders.controller.ts, orders.module.ts`
- **Test nghiệm thu:** `apps/api/src/orders/checkout.service.spec.ts`
- **Phải merge trước:** PRJ-P2-BD2-2
- **Kiểm chứng:** viết test ở dòng trên **trước** khi code (commit riêng, QA duyệt ca test). Sau khi QA duyệt, không sửa test cho dễ pass; cần đổi thì ghi lý do trong PR.
- **Nhánh:** `prj/p2-bd1-2` · **Reviewer:** BD2 Châu

### PRJ-P2-BD1-3 — Admin voucher + khuyến mãi
- **File phải viết:** `apps/api/src/admin-vouchers/`; `apps/api/src/promotions/admin-promotions.*.ts`
- **Test nghiệm thu:** `apps/api/src/admin-vouchers/admin-vouchers.spec.ts`
- **Phải merge trước:** PRJ-P1-BD1-1
- **Kiểm chứng:** viết test ở dòng trên **trước** khi code (commit riêng, QA duyệt ca test). Sau khi QA duyệt, không sửa test cho dễ pass; cần đổi thì ghi lý do trong PR.
- **Nhánh:** `prj/p2-bd1-3` · **Reviewer:** BD2 Châu

### Bài tập mở rộng (sau khi xong task PRJ): Thêm test biên cho pricing (làm tròn % và ngưỡng miễn phí)
- **File:** `apps/api/src/pricing/pricing.spec.ts`
- **Các bước:**
  1. Đọc các test có sẵn, liệt kê ca nào đã có.
  2. Chọn 2 ca **chưa có**: ví dụ 10% của 333.333đ (làm tròn xuống 33.333đ), tiền hàng sau giảm 499.999đ ở HCM (vẫn tính phí).
  3. Viết test, chạy `npm test -w api -- pricing`.
- **Xong khi:** Hai test mới pass và có comment ghi rõ quy tắc D02/D03 nào.
- **Quy trình git:** nhánh `study/bd1-p2` → PR → **BD2 Châu** review → merge.

## 7. Bằng chứng cần có trước khi sang phase sau
- [ ] Tối thiểu 4 mục AI-LOG thật (AI-P2-BD1-01 … AI-P2-BD1-06), mỗi mục có phần kiểm tra và tự giải thích.
- [ ] Mọi task PRJ của phase đã merge: test nghiệm thu pass, ảnh/diff đối chiếu trong PR; link PR ghi vào [LP-BD1-Hoan](LP-BD1-Hoan.md).
- [ ] Trả lời được các câu ở bước 6 không cần xem code.
- [ ] Cập nhật bảng tiến độ trong [LP-BD1-Hoan](LP-BD1-Hoan.md).
