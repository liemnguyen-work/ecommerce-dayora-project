---
tags: [learning, member/BD1, phase/P3]
---
# P3 · BD1 Hoàn

> P3 Thanh toán VNPay, đơn hàng, đánh giá (18/11–24/11) · Tổng quan của bạn: [LP-BD1-Hoan](LP-BD1-Hoan.md) · Hướng dẫn phase: [P3-BD1-Hoan](../../../phases/P3-payment-orders/BD1-Hoan/P3-BD1-Hoan.md) · Log của bạn: `docs/ai-logs/hoan.md`

**Mục tiêu:** Hiểu thanh toán VNPay end-to-end: tạo URL, ký, IPN, Return, và xử lý lặp/trễ.

Thời lượng gợi ý: cả phase (1 tuần). **Thứ tự làm:**
1. Mục 2 + bước 1 (khái niệm) · đọc issue và tiêu chí xong của task ở mục 6.
2. **Mục 6: viết test hoặc ca kiểm thử trước, rồi tự xây task PRJ** (bước 5). Kẹt quá 1 buổi: hỏi reviewer hoặc PM.
3. Khi kiểm chứng đạt: bước 2 đọc lại code của chính bạn, giải thích được từng file ở mục 1.
4. Mục 3, 4, bước 3, 4, 6, 7: kiểm hiểu biết, tình huống, luyện bảo vệ, AI-LOG.

## 1. File bạn sẽ viết hoặc sửa
1. `apps/api/src/payments/vnpay.ts`
2. `apps/api/src/payments/vnpay.spec.ts`
3. `apps/api/src/payments/payments.service.ts`
4. `apps/api/src/payments/payments.controller.ts`
5. `apps/api/src/payments/payments.spec.ts`
6. `apps/api/src/reviews/reviews.service.ts`
7. `docs/DECISIONS.md` (D05, D07, D08)

## 2. Kiến thức cần nắm
| # | Khái niệm | Vì sao cần | Thấy ở đâu trong code |
|---|---|---|---|
| 1 | HMAC-SHA512, sắp xếp tham số, URL encode | Chữ ký chứng minh dữ liệu đến từ VNPay | `vnpSign`, `vnpVerify` |
| 2 | Return URL khác IPN | Return để hiển thị, IPN mới cập nhật đơn | `returnUrl`, `ipn` |
| 3 | Idempotency (xử lý lặp ra cùng kết quả) | VNPay có thể gửi IPN nhiều lần | mã `02` trong `ipn` |
| 4 | Khóa đơn `FOR UPDATE` dùng chung với job hết hạn | Hai tiến trình không chen nhau | `ipn` |
| 5 | Số tiền ×100, giờ GMT+7 | Định dạng VNPay yêu cầu | `vnpDate`, `create` |
| 6 | Điều kiện đánh giá D05 | Chỉ đánh giá khi PAID + DELIVERED, một lần | `reviews.service.ts` |

## 3. Tiêu chí đạt (tự đánh dấu, có bằng chứng)
- [ ] Vẽ sơ đồ: bấm Thanh toán → `POST /payments/vnpay/:id` → VNPay → IPN → Return → trang kết quả.
- [ ] Giải thích từng mã IPN 00/01/02/04/97/99 và dòng code trả mã đó.
- [ ] Giải thích vì sao IPN gửi 2 lần không trừ tồn 2 lần.
- [ ] Giải thích nhánh IPN đến sau khi đơn đã hủy (còn hàng / hết hàng).
- [ ] Giải thích vì sao thiếu cấu hình VNPay thì trả 503 thay vì làm sập app.
- [ ] Liệt kê 4 điều kiện để được đánh giá và test tương ứng.

Đạt khi: mọi ô được đánh dấu **và** mỗi ô có bằng chứng trong AI-LOG hoặc PR (lệnh đã chạy, ảnh, link commit).

## 4. Lỗi hay gặp trong phần này
Đọc tình huống, **tự đoán nguyên nhân trước** rồi mới đọc lời giải.

| Vấn đề | Cách tránh | Đọc thêm |
|---|---|---|
| IPN lặp / trễ / sai tiền | Khóa đơn, kiểm số tiền, trả 02 khi đã xử lý; thử bằng IPN giả lập. | [C4](../PITFALLS.md#c4) |
| Schema không có PENDING cho thanh toán | Ánh xạ UNPAID. | [B3](../PITFALLS.md#b3) |

## 5. Lộ trình prompt (làm lần lượt, mỗi bước một phiên AI)
Mở đầu mỗi phiên bằng prompt "Khởi động phiên" trong [P3-BD1-Hoan](../../../phases/P3-payment-orders/BD1-Hoan/P3-BD1-Hoan.md) mục 4.1. **Không dán `.env`, mật khẩu, khóa.** Mỗi bước xong ghi một mục AI-LOG theo mã gợi ý.

### Bước 1 — Hiểu khái niệm (AI-P3-BD1-01)
```text
Tôi là Hoàn (BD1) trong dự án DAYORA. Giải thích lần lượt các khái niệm sau bằng ví dụ đời thường, mỗi lần MỘT khái niệm, hỏi tôi 1 câu kiểm tra rồi mới sang khái niệm tiếp theo:
1. HMAC-SHA512, sắp xếp tham số, URL encode
2. Return URL khác IPN
3. Idempotency (xử lý lặp ra cùng kết quả)
4. Khóa đơn `FOR UPDATE` dùng chung với job hết hạn
5. Số tiền ×100, giờ GMT+7
6. Điều kiện đánh giá D05
Không viết code. Nếu tôi trả lời sai, giải thích lại theo cách khác.
```
Tự kiểm: đóng AI, viết lại mỗi khái niệm 1 câu bằng lời của bạn.

### Bước 2 — Đọc lại code của bạn (AI-P3-BD1-02)
Dán **từng file** theo thứ tự mục 1 (file dài thì dán từng hàm).
```text
Đây là <tên file> của DAYORA:
<dán code>
1) Tóm tắt file làm gì trong 3 câu.
2) Đi qua từng hàm: đầu vào, đầu ra, bước quan trọng; chỉ số dòng.
3) Khái niệm nào trong danh sách sau xuất hiện ở đâu: HMAC-SHA512, sắp xếp tham số, URL encode; Return URL khác IPN; Idempotency (xử lý lặp ra cùng kết quả); Khóa đơn `FOR UPDATE` dùng chung với job hết hạn; Số tiền ×100, giờ GMT+7; Điều kiện đánh giá D05.
4) Hỏi tôi 3 câu. Chỉ khi tôi trả lời đúng mới sang file tiếp.
```
Tự kiểm: mở file trong VS Code, tìm đúng dòng AI chỉ. **AI có thể chỉ sai dòng hoặc bịa hàm**: ghi lại nếu gặp.

### Bước 3 — Dự đoán rồi thử (AI-P3-BD1-03)
Viết dự đoán **trước** khi chạy, rồi mới chạy.
```text
Tôi đọc `vnpay.spec.ts`, chọn một test vector, tự tính lại chữ ký bằng công cụ HMAC-SHA512 online với **khóa giả trong test** (không dùng khóa thật). Tôi dự đoán chữ ký khớp vì <lý do>.
Đừng nói kết quả. Hãy hỏi tôi vì sao tôi dự đoán vậy, rồi hướng dẫn tôi cách chạy và cách đọc kết quả.
```
Ghi vào AI-LOG: dự đoán, kết quả thật, giải thích chỗ khác nhau.

### Bước 4 — Học từ tình huống thật (AI-P3-BD1-04)
Chọn 1 tình huống ở mục 4, dán phần **Dấu hiệu** (chưa dán lời giải).
```text
Đây là một lỗi hay gặp khi làm phần này của DAYORA:
<dán phần Dấu hiệu>
Đừng nói lời giải. Hỏi tôi từng câu gợi ý để tôi tự tìm ra nguyên nhân gốc. Sau đó tôi sẽ dán phần Nguyên nhân và Cách tránh trong tài liệu để bạn so với suy luận của tôi.
```
Ghi AI-LOG: suy luận của bạn khác lời giải thật ở đâu.

### Bước 5 — Tự xây phần của bạn (AI-P3-BD1-05, mỗi task PRJ một mục log)
Xem mục 6. AI chỉ **hướng dẫn và review**, bạn tự gõ code. Làm task PRJ trước, bài tập mở rộng sau.
```text
Tôi đang tự viết PRJ-P3-BD1-1 "Ký và kiểm chữ ký VNPay" của dự án DAYORA.
File tôi phải viết: apps/api/src/payments/vnpay.ts.
Test nghiệm thu phải pass (không được sửa test): <dán nội dung apps/api/src/payments/vnpay.spec.ts>
1) Đọc test, giải thích test yêu cầu hàm/route nào, trả về gì.
2) Giúp tôi liệt kê các bước cài đặt theo thứ tự, mỗi bước chạy được test.
Đừng viết code thay tôi. Chờ tôi làm xong mỗi bước. Khi tôi dán lỗi test hoặc git diff, chỉ ra chỗ sai và vì sao, gợi ý hướng sửa chứ không đưa code hoàn chỉnh.
```
Khi kiểm chứng đạt hoặc kẹt quá 1 buổi: ghi vào log cá nhân việc đã làm, chỗ kẹt và cách gỡ (xem [ROADMAP](../../ROADMAP.md)).

### Bước 6 — Luyện bảo vệ (AI-P3-BD1-06)
```text
Đóng vai giảng viên chấm đồ án. Phần tôi phụ trách ở P3: Hiểu thanh toán VNPay end-to-end: tạo URL, ký, IPN, Return, và xử lý lặp/trễ.
Hỏi tôi lần lượt (mỗi câu tôi trả lời trong 30 giây, không xem code):
1. Nếu kẻ xấu gọi thẳng IPN với `vnp_ResponseCode=00` thì chuyện gì xảy ra?
2. Vì sao trang kết quả không được tự đánh dấu PAID?
3. Hủy đơn đã PAID thì tồn và tiền xử lý thế nào?
Sau đó hỏi thêm 2 câu vặn dựa trên câu trả lời của tôi, ra 1 yêu cầu sửa code nhỏ. Chấm từng câu và nói tôi cần học lại gì.
```

### Bước 7 — Ghi nhật ký AI
Nối thêm một mục vào log cá nhân `docs/ai-logs/<tên>.md` theo [quy tắc ghi log](../../ai-logs/ai-logging-rules.md) (đủ 7 trường, có mã phiên và mã mục, chỉ nối thêm). Phần **Phản biện**, **Quyết định của nhóm**, **Người kiểm tra** phải tự viết.

## 6. Nhiệm vụ xây dựng (commit đứng tên bạn)
Quy trình chung: [ROADMAP](../../ROADMAP.md).

### PRJ-P3-BD1-1 — Ký và kiểm chữ ký VNPay
- **File phải viết:** `apps/api/src/payments/vnpay.ts`
- **Test nghiệm thu:** `apps/api/src/payments/vnpay.spec.ts`
- **Phải merge trước:** không
- **Kiểm chứng:** viết test ở dòng trên **trước** khi code (commit riêng, QA duyệt ca test). Sau khi QA duyệt, không sửa test cho dễ pass; cần đổi thì ghi lý do trong PR.
- **Nhánh:** `prj/p3-bd1-1` · **Reviewer:** BD2 Châu

### PRJ-P3-BD1-2 — Thanh toán: tạo URL, Return, IPN
- **File phải viết:** `apps/api/src/payments/payments.service.ts, payments.controller.ts, payments.module.ts`
- **Test nghiệm thu:** `apps/api/src/payments/payments.spec.ts`
- **Phải merge trước:** PRJ-P3-BD1-1, PRJ-P2-BD1-2
- **Kiểm chứng:** viết test ở dòng trên **trước** khi code (commit riêng, QA duyệt ca test). Sau khi QA duyệt, không sửa test cho dễ pass; cần đổi thì ghi lý do trong PR.
- **Nhánh:** `prj/p3-bd1-2` · **Reviewer:** BD2 Châu

### PRJ-P3-BD1-3 — Đánh giá sau mua
- **File phải viết:** `apps/api/src/reviews/`
- **Test nghiệm thu:** `apps/api/src/reviews/reviews.service.spec.ts`; `apps/api/src/reviews/reviews.http.spec.ts`
- **Phải merge trước:** PRJ-P3-BD2-1
- **Kiểm chứng:** viết test ở dòng trên **trước** khi code (commit riêng, QA duyệt ca test). Sau khi QA duyệt, không sửa test cho dễ pass; cần đổi thì ghi lý do trong PR.
- **Nhánh:** `prj/p3-bd1-3` · **Reviewer:** BD2 Châu

### Bài tập mở rộng (sau khi xong task PRJ): Mã đơn dễ đọc `DAY-yyMMdd-xxxx`
- **File:** `apps/api/src/orders/checkout.service.ts`, `apps/api/src/orders/checkout.service.spec.ts`
- **Các bước:**
  1. Tìm chỗ `code: randomUUID()` trong `create`.
  2. Viết hàm tạo mã theo ngày GMT+7 + 4 ký tự ngẫu nhiên; nghĩ cách xử lý trùng (cột `code` là unique).
  3. Lưu ý: `code` được dùng làm `vnp_TxnRef`, kiểm tra VNPay chấp nhận định dạng mới.
  4. Thêm test định dạng; chạy toàn bộ `npm test -w api`.
- **Xong khi:** Đơn mới có mã dạng `DAY-261118-A7K2`, test pass, BD2 duyệt PR.
- **Quy trình git:** nhánh `study/bd1-p3` → PR → **BD2 Châu** review → merge.

## 7. Bằng chứng cần có trước khi sang phase sau
- [ ] Tối thiểu 4 mục AI-LOG thật (AI-P3-BD1-01 … AI-P3-BD1-06), mỗi mục có phần kiểm tra và tự giải thích.
- [ ] Mọi task PRJ của phase đã merge: test nghiệm thu pass, ảnh/diff đối chiếu trong PR; link PR ghi vào [LP-BD1-Hoan](LP-BD1-Hoan.md).
- [ ] Trả lời được các câu ở bước 6 không cần xem code.
- [ ] Cập nhật bảng tiến độ trong [LP-BD1-Hoan](LP-BD1-Hoan.md).
