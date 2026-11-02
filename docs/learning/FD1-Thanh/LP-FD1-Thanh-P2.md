---
tags: [learning, member/FD1, phase/P2]
---
# P2 · FD1 Thành

> P2 Giỏ hàng, voucher, phí giao, checkout (11/11–17/11) · Tổng quan của bạn: [LP-FD1-Thanh](LP-FD1-Thanh.md) · Hướng dẫn phase: [P2-FD1-Thanh](../../../phases/P2-cart-checkout/FD1-Thanh/P2-FD1-Thanh.md) · Log của bạn: `docs/ai-logs/thanh.md`

**Mục tiêu:** Hiểu luồng giỏ hàng và thanh toán, cách web xử lý khi server từ chối.

Thời lượng gợi ý: cả phase (1 tuần). **Thứ tự làm:**
1. Mục 2 + bước 1 (khái niệm) · đọc issue và tiêu chí xong của task ở mục 6.
2. **Mục 6: viết test hoặc ca kiểm thử trước, rồi tự xây task PRJ** (bước 5). Kẹt quá 1 buổi: hỏi reviewer hoặc PM.
3. Khi kiểm chứng đạt: bước 2 đọc lại code của chính bạn, giải thích được từng file ở mục 1.
4. Mục 3, 4, bước 3, 4, 6, 7: kiểm hiểu biết, tình huống, luyện bảo vệ, AI-LOG.

## 1. File bạn sẽ viết hoặc sửa
1. `apps/web/src/lib/cart.ts`
2. `apps/web/src/pages/CartPage.tsx`
3. `apps/web/src/pages/CheckoutPage.tsx`
4. `apps/web/src/pages/ProductPage.tsx` (thêm giỏ)

## 2. Kiến thức cần nắm
| # | Khái niệm | Vì sao cần | Thấy ở đâu trong code |
|---|---|---|---|
| 1 | Kiểu TypeScript làm hợp đồng (`Pick<Address,…>`) | Bắt lỗi gửi thừa trường lúc viết code | `lib/cart.ts` |
| 2 | async/await, try/catch, lỗi HTTP 409 | Hộp đối chiếu khi giá đổi | `CheckoutPage.tsx` |
| 3 | Class lỗi riêng `ConfirmError` | Phân biệt lỗi cần xác nhận với lỗi khác | `CheckoutPage.tsx` |
| 4 | `sessionStorage` cho voucher | Giữ mã khi chuyển trang | `savedVoucher`, `saveVoucher` |
| 5 | Chuyển hướng khi chưa đăng nhập (`?next=`) | D04 | `ProductPage.tsx` |
| 6 | Form có kiểm tra | Địa chỉ, số điện thoại | `CheckoutPage.tsx` |

## 3. Tiêu chí đạt (tự đánh dấu, có bằng chứng)
- [ ] Vẽ luồng: đổi địa chỉ → `previewOrder` → hiện phí → Đặt hàng → 409 → hộp đối chiếu → xác nhận.
- [ ] Giải thích lỗi 400 khi gửi thừa trường và cách `Pick` ngăn lại.
- [ ] Giải thích lỗi build TS1294 và cách viết lại `ConfirmError`.
- [ ] Tự tính một đơn và khớp với màn hình.
- [ ] Giải thích web có tự tính tổng không, và vì sao.

Đạt khi: mọi ô được đánh dấu **và** mỗi ô có bằng chứng trong AI-LOG hoặc PR (lệnh đã chạy, ảnh, link commit).

## 4. Lỗi hay gặp trong phần này
Đọc tình huống, **tự đoán nguyên nhân trước** rồi mới đọc lời giải.

| Vấn đề | Cách tránh | Đọc thêm |
|---|---|---|
| Gửi thừa trường bị 400 | Pick 3 trường. | [D3](../PITFALLS.md#d3) |
| TS1294 | Viết lại class. | [D5](../PITFALLS.md#d5) |
| Giá đổi giữa chừng | Hộp đối chiếu NFR02. | [C2](../PITFALLS.md#c2) |

## 5. Lộ trình prompt (làm lần lượt, mỗi bước một phiên AI)
Mở đầu mỗi phiên bằng prompt "Khởi động phiên" trong [P2-FD1-Thanh](../../../phases/P2-cart-checkout/FD1-Thanh/P2-FD1-Thanh.md) mục 4.1. **Không dán `.env`, mật khẩu, khóa.** Mỗi bước xong ghi một mục AI-LOG theo mã gợi ý.

### Bước 1 — Hiểu khái niệm (AI-P2-FD1-01)
```text
Tôi là Thành (FD1) trong dự án DAYORA. Giải thích lần lượt các khái niệm sau bằng ví dụ đời thường, mỗi lần MỘT khái niệm, hỏi tôi 1 câu kiểm tra rồi mới sang khái niệm tiếp theo:
1. Kiểu TypeScript làm hợp đồng (`Pick<Address,…>`)
2. async/await, try/catch, lỗi HTTP 409
3. Class lỗi riêng `ConfirmError`
4. `sessionStorage` cho voucher
5. Chuyển hướng khi chưa đăng nhập (`?next=`)
6. Form có kiểm tra
Không viết code. Nếu tôi trả lời sai, giải thích lại theo cách khác.
```
Tự kiểm: đóng AI, viết lại mỗi khái niệm 1 câu bằng lời của bạn.

### Bước 2 — Đọc lại code của bạn (AI-P2-FD1-02)
Dán **từng file** theo thứ tự mục 1 (file dài thì dán từng hàm).
```text
Đây là <tên file> của DAYORA:
<dán code>
1) Tóm tắt file làm gì trong 3 câu.
2) Đi qua từng hàm: đầu vào, đầu ra, bước quan trọng; chỉ số dòng.
3) Khái niệm nào trong danh sách sau xuất hiện ở đâu: Kiểu TypeScript làm hợp đồng (`Pick<Address,…>`); async/await, try/catch, lỗi HTTP 409; Class lỗi riêng `ConfirmError`; `sessionStorage` cho voucher; Chuyển hướng khi chưa đăng nhập (`?next=`); Form có kiểm tra.
4) Hỏi tôi 3 câu. Chỉ khi tôi trả lời đúng mới sang file tiếp.
```
Tự kiểm: mở file trong VS Code, tìm đúng dòng AI chỉ. **AI có thể chỉ sai dòng hoặc bịa hàm**: ghi lại nếu gặp.

### Bước 3 — Dự đoán rồi thử (AI-P2-FD1-03)
Viết dự đoán **trước** khi chạy, rồi mới chạy.
```text
Tôi mở trang thanh toán, trong lúc đó nhờ bạn FD2 đổi giá món trong giỏ ở Admin. Tôi bấm Đặt hàng và dự đoán <điều xảy ra>.
Đừng nói kết quả. Hãy hỏi tôi vì sao tôi dự đoán vậy, rồi hướng dẫn tôi cách chạy và cách đọc kết quả.
```
Ghi vào AI-LOG: dự đoán, kết quả thật, giải thích chỗ khác nhau.

### Bước 4 — Học từ tình huống thật (AI-P2-FD1-04)
Chọn 1 tình huống ở mục 4, dán phần **Dấu hiệu** (chưa dán lời giải).
```text
Đây là một lỗi hay gặp khi làm phần này của DAYORA:
<dán phần Dấu hiệu>
Đừng nói lời giải. Hỏi tôi từng câu gợi ý để tôi tự tìm ra nguyên nhân gốc. Sau đó tôi sẽ dán phần Nguyên nhân và Cách tránh trong tài liệu để bạn so với suy luận của tôi.
```
Ghi AI-LOG: suy luận của bạn khác lời giải thật ở đâu.

### Bước 5 — Tự xây phần của bạn (AI-P2-FD1-05, mỗi task PRJ một mục log)
Xem mục 6. AI chỉ **hướng dẫn và review**, bạn tự gõ code. Làm task PRJ trước, bài tập mở rộng sau.
```text
Tôi đang tự viết PRJ-P2-FD1-1 "Giỏ hàng + voucher" của dự án DAYORA.
File tôi phải viết: apps/web/src/lib/cart.ts; apps/web/src/pages/CartPage.tsx.
1) Giúp tôi liệt kê các bước làm theo thứ tự.
Đừng viết code thay tôi. Chờ tôi làm xong mỗi bước. Khi tôi dán lỗi test hoặc git diff, chỉ ra chỗ sai và vì sao, gợi ý hướng sửa chứ không đưa code hoàn chỉnh.
```
Khi kiểm chứng đạt hoặc kẹt quá 1 buổi: ghi vào log cá nhân việc đã làm, chỗ kẹt và cách gỡ (xem [ROADMAP](../../ROADMAP.md)).

### Bước 6 — Luyện bảo vệ (AI-P2-FD1-06)
```text
Đóng vai giảng viên chấm đồ án. Phần tôi phụ trách ở P2: Hiểu luồng giỏ hàng và thanh toán, cách web xử lý khi server từ chối.
Hỏi tôi lần lượt (mỗi câu tôi trả lời trong 30 giây, không xem code):
1. Nếu server không trả 409 mà 500 thì UI làm gì?
2. Vì sao không lưu giỏ ở localStorage?
Sau đó hỏi thêm 2 câu vặn dựa trên câu trả lời của tôi, ra 1 yêu cầu sửa code nhỏ. Chấm từng câu và nói tôi cần học lại gì.
```

### Bước 7 — Ghi nhật ký AI
Nối thêm một mục vào log cá nhân `docs/ai-logs/<tên>.md` theo [quy tắc ghi log](../../ai-logs/ai-logging-rules.md) (đủ 7 trường, có mã phiên và mã mục, chỉ nối thêm). Phần **Phản biện**, **Quyết định của nhóm**, **Người kiểm tra** phải tự viết.

## 6. Nhiệm vụ xây dựng (commit đứng tên bạn)
Quy trình chung: [ROADMAP](../../ROADMAP.md).

### PRJ-P2-FD1-1 — Giỏ hàng + voucher
- **File phải viết:** `apps/web/src/lib/cart.ts`; `apps/web/src/pages/CartPage.tsx`
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** PRJ-P2-BD2-2
- **Kiểm chứng:** ca kiểm thử tay trong `docs/testing/TEST-CASES.md` (QA duyệt); ảnh 1366 px và 390 px trong PR; PD duyệt theo `docs/DESIGN-SYSTEM.md`.
- **Nhánh:** `prj/p2-fd1-1` · **Reviewer:** PD Đạt

### PRJ-P2-FD1-2 — Thanh toán + hộp đối chiếu 409
- **File phải viết:** `apps/web/src/pages/CheckoutPage.tsx`
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** PRJ-P2-FD1-1, PRJ-P2-BD1-2
- **Kiểm chứng:** ca kiểm thử tay trong `docs/testing/TEST-CASES.md` (QA duyệt); ảnh 1366 px và 390 px trong PR; PD duyệt theo `docs/DESIGN-SYSTEM.md`.
- **Nhánh:** `prj/p2-fd1-2` · **Reviewer:** PD Đạt

### PRJ-P2-FD1-3 — Thêm vào giỏ, ghi sản phẩm đã xem
- **File phải viết:** `apps/web/src/pages/ProductPage.tsx` (phần mua)
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** PRJ-P2-FD1-1, PRJ-P1-BD1-4
- **Kiểm chứng:** ca kiểm thử tay trong `docs/testing/TEST-CASES.md` (QA duyệt); ảnh 1366 px và 390 px trong PR; PD duyệt theo `docs/DESIGN-SYSTEM.md`.
- **Nhánh:** `prj/p2-fd1-3` · **Reviewer:** PD Đạt

### Bài tập mở rộng (sau khi xong task PRJ): Thử luồng giỏ/thanh toán và sửa 1 lỗi tìm được
- **File:** `apps/web/src/pages/CartPage.tsx hoặc CheckoutPage.tsx` (tùy lỗi), `docs/report/images/` (ảnh minh chứng)
- **Các bước:**
  1. Thử các ca: giỏ trống, voucher sai, voucher hết điều kiện, tỉnh khác, mất mạng (DevTools offline).
  2. Ghi lỗi tìm được thành GitHub Issue (gán QA đọc).
  3. Sửa 1 lỗi nhỏ nhất; nếu không có lỗi, commit ảnh minh chứng + ghi chú vào issue.
- **Xong khi:** Có issue, có commit liên kết issue, PD duyệt.
- **Quy trình git:** nhánh `study/fd1-p2` → PR → **PD Đạt** review → merge.

## 7. Bằng chứng cần có trước khi sang phase sau
- [ ] Tối thiểu 4 mục AI-LOG thật (AI-P2-FD1-01 … AI-P2-FD1-06), mỗi mục có phần kiểm tra và tự giải thích.
- [ ] Mọi task PRJ của phase đã merge: test nghiệm thu pass, ảnh/diff đối chiếu trong PR; link PR ghi vào [LP-FD1-Thanh](LP-FD1-Thanh.md).
- [ ] Trả lời được các câu ở bước 6 không cần xem code.
- [ ] Cập nhật bảng tiến độ trong [LP-FD1-Thanh](LP-FD1-Thanh.md).
