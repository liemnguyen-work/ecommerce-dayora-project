---
tags: [learning, member/FD1, phase/P3]
---
# P3 · FD1 Thành

> P3 Thanh toán VNPay, đơn hàng, đánh giá (18/11–24/11) · Tổng quan của bạn: [LP-FD1-Thanh](LP-FD1-Thanh.md) · Hướng dẫn phase: [P3-FD1-Thanh](../../../phases/P3-payment-orders/FD1-Thanh/P3-FD1-Thanh.md) · Log của bạn: `docs/ai-logs/thanh.md`

**Mục tiêu:** Hiểu trang đơn, kết quả thanh toán và tài khoản.

Thời lượng gợi ý: cả phase (1 tuần). **Thứ tự làm:**
1. Mục 2 + bước 1 (khái niệm) · đọc issue và tiêu chí xong của task ở mục 6.
2. **Mục 6: viết test hoặc ca kiểm thử trước, rồi tự xây task PRJ** (bước 5). Kẹt quá 1 buổi: hỏi reviewer hoặc PM.
3. Khi kiểm chứng đạt: bước 2 đọc lại code của chính bạn, giải thích được từng file ở mục 1.
4. Mục 3, 4, bước 3, 4, 6, 7: kiểm hiểu biết, tình huống, luyện bảo vệ, AI-LOG.

## 1. File bạn sẽ viết hoặc sửa
1. `apps/web/src/pages/OrderPage.tsx`
2. `apps/web/src/pages/PaymentResultPage.tsx`
3. `apps/web/src/pages/AccountPage.tsx`
4. `apps/web/src/pages/ProductPage.tsx` (ProductReviews)

## 2. Kiến thức cần nắm
| # | Khái niệm | Vì sao cần | Thấy ở đâu trong code |
|---|---|---|---|
| 1 | Chuyển hướng sang trang ngoài (`window.location`) | Sang VNPay | `OrderPage.tsx` |
| 2 | Đọc query `?moi=1`, `vnp_*` | Thông báo đơn mới, kết quả | `OrderPage.tsx`, `PaymentResultPage.tsx` |
| 3 | Tab trong một trang | Tài khoản 4 mục | `AccountPage.tsx` |
| 4 | Map trạng thái → nhãn tiếng Việt | `statusLabel`, `paymentLabel` | `OrderPage.tsx` |

## 3. Tiêu chí đạt (tự đánh dấu, có bằng chứng)
- [ ] Giải thích vì sao trang kết quả chỉ **hiển thị** và đơn được cập nhật bởi IPN.
- [ ] Giải thích dữ liệu "chờ đánh giá" lấy từ API nào, có dạng gì.
- [ ] Giải thích vì sao nút hủy chỉ hiện ở đơn chưa thanh toán.
- [ ] Thử trang Tài khoản (chưa ai thử trên UI) và ghi kết quả.

Đạt khi: mọi ô được đánh dấu **và** mỗi ô có bằng chứng trong AI-LOG hoặc PR (lệnh đã chạy, ảnh, link commit).

## 4. Lỗi hay gặp trong phần này
Đọc tình huống, **tự đoán nguyên nhân trước** rồi mới đọc lời giải.

| Vấn đề | Cách tránh | Đọc thêm |
|---|---|---|
| IPN mới là nguồn sự thật | Trang kết quả không tự đánh dấu PAID. | [C4](../PITFALLS.md#c4) |

## 5. Lộ trình prompt (làm lần lượt, mỗi bước một phiên AI)
Mở đầu mỗi phiên bằng prompt "Khởi động phiên" trong [P3-FD1-Thanh](../../../phases/P3-payment-orders/FD1-Thanh/P3-FD1-Thanh.md) mục 4.1. **Không dán `.env`, mật khẩu, khóa.** Mỗi bước xong ghi một mục AI-LOG theo mã gợi ý.

### Bước 1 — Hiểu khái niệm (AI-P3-FD1-01)
```text
Tôi là Thành (FD1) trong dự án DAYORA. Giải thích lần lượt các khái niệm sau bằng ví dụ đời thường, mỗi lần MỘT khái niệm, hỏi tôi 1 câu kiểm tra rồi mới sang khái niệm tiếp theo:
1. Chuyển hướng sang trang ngoài (`window.location`)
2. Đọc query `?moi=1`, `vnp_*`
3. Tab trong một trang
4. Map trạng thái → nhãn tiếng Việt
Không viết code. Nếu tôi trả lời sai, giải thích lại theo cách khác.
```
Tự kiểm: đóng AI, viết lại mỗi khái niệm 1 câu bằng lời của bạn.

### Bước 2 — Đọc lại code của bạn (AI-P3-FD1-02)
Dán **từng file** theo thứ tự mục 1 (file dài thì dán từng hàm).
```text
Đây là <tên file> của DAYORA:
<dán code>
1) Tóm tắt file làm gì trong 3 câu.
2) Đi qua từng hàm: đầu vào, đầu ra, bước quan trọng; chỉ số dòng.
3) Khái niệm nào trong danh sách sau xuất hiện ở đâu: Chuyển hướng sang trang ngoài (`window.location`); Đọc query `?moi=1`, `vnp_*`; Tab trong một trang; Map trạng thái → nhãn tiếng Việt.
4) Hỏi tôi 3 câu. Chỉ khi tôi trả lời đúng mới sang file tiếp.
```
Tự kiểm: mở file trong VS Code, tìm đúng dòng AI chỉ. **AI có thể chỉ sai dòng hoặc bịa hàm**: ghi lại nếu gặp.

### Bước 3 — Dự đoán rồi thử (AI-P3-FD1-03)
Viết dự đoán **trước** khi chạy, rồi mới chạy.
```text
Tôi mở `/checkout/result?vnp_ResponseCode=00` bằng tay (không qua VNPay). Tôi dự đoán trang hiện <dự đoán> và đơn **không** đổi trạng thái vì <lý do>.
Đừng nói kết quả. Hãy hỏi tôi vì sao tôi dự đoán vậy, rồi hướng dẫn tôi cách chạy và cách đọc kết quả.
```
Ghi vào AI-LOG: dự đoán, kết quả thật, giải thích chỗ khác nhau.

### Bước 4 — Học từ tình huống thật (AI-P3-FD1-04)
Chọn 1 tình huống ở mục 4, dán phần **Dấu hiệu** (chưa dán lời giải).
```text
Đây là một lỗi hay gặp khi làm phần này của DAYORA:
<dán phần Dấu hiệu>
Đừng nói lời giải. Hỏi tôi từng câu gợi ý để tôi tự tìm ra nguyên nhân gốc. Sau đó tôi sẽ dán phần Nguyên nhân và Cách tránh trong tài liệu để bạn so với suy luận của tôi.
```
Ghi AI-LOG: suy luận của bạn khác lời giải thật ở đâu.

### Bước 5 — Tự xây phần của bạn (AI-P3-FD1-05, mỗi task PRJ một mục log)
Xem mục 6. AI chỉ **hướng dẫn và review**, bạn tự gõ code. Làm task PRJ trước, bài tập mở rộng sau.
```text
Tôi đang tự viết PRJ-P3-FD1-1 "Chi tiết đơn + kết quả thanh toán" của dự án DAYORA.
File tôi phải viết: apps/web/src/pages/OrderPage.tsx; apps/web/src/pages/PaymentResultPage.tsx.
1) Giúp tôi liệt kê các bước làm theo thứ tự.
Đừng viết code thay tôi. Chờ tôi làm xong mỗi bước. Khi tôi dán lỗi test hoặc git diff, chỉ ra chỗ sai và vì sao, gợi ý hướng sửa chứ không đưa code hoàn chỉnh.
```
Khi kiểm chứng đạt hoặc kẹt quá 1 buổi: ghi vào log cá nhân việc đã làm, chỗ kẹt và cách gỡ (xem [ROADMAP](../../ROADMAP.md)).

### Bước 6 — Luyện bảo vệ (AI-P3-FD1-06)
```text
Đóng vai giảng viên chấm đồ án. Phần tôi phụ trách ở P3: Hiểu trang đơn, kết quả thanh toán và tài khoản.
Hỏi tôi lần lượt (mỗi câu tôi trả lời trong 30 giây, không xem code):
1. Thêm tab "Địa chỉ đã lưu" thì cần API gì?
Sau đó hỏi thêm 2 câu vặn dựa trên câu trả lời của tôi, ra 1 yêu cầu sửa code nhỏ. Chấm từng câu và nói tôi cần học lại gì.
```

### Bước 7 — Ghi nhật ký AI
Nối thêm một mục vào log cá nhân `docs/ai-logs/<tên>.md` theo [quy tắc ghi log](../../ai-logs/ai-logging-rules.md) (đủ 7 trường, có mã phiên và mã mục, chỉ nối thêm). Phần **Phản biện**, **Quyết định của nhóm**, **Người kiểm tra** phải tự viết.

## 6. Nhiệm vụ xây dựng (commit đứng tên bạn)
Quy trình chung: [ROADMAP](../../ROADMAP.md).

### PRJ-P3-FD1-1 — Chi tiết đơn + kết quả thanh toán
- **File phải viết:** `apps/web/src/pages/OrderPage.tsx`; `apps/web/src/pages/PaymentResultPage.tsx`
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** PRJ-P3-BD1-2
- **Kiểm chứng:** ca kiểm thử tay trong `docs/testing/TEST-CASES.md` (QA duyệt); ảnh 1366 px và 390 px trong PR; PD duyệt theo `docs/DESIGN-SYSTEM.md`.
- **Nhánh:** `prj/p3-fd1-1` · **Reviewer:** PD Đạt

### PRJ-P3-FD1-2 — Đánh giá trên trang sản phẩm
- **File phải viết:** `apps/web/src/pages/ProductPage.tsx` (ProductReviews)
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** PRJ-P3-BD1-3
- **Kiểm chứng:** ca kiểm thử tay trong `docs/testing/TEST-CASES.md` (QA duyệt); ảnh 1366 px và 390 px trong PR; PD duyệt theo `docs/DESIGN-SYSTEM.md`.
- **Nhánh:** `prj/p3-fd1-2` · **Reviewer:** PD Đạt

### Bài tập mở rộng (sau khi xong task PRJ): Thử trang Tài khoản trên UI (chưa ai thử) và sửa lỗi tìm được
- **File:** `apps/web/src/pages/AccountPage.tsx`, `docs/report/images/`
- **Các bước:**
  1. Đăng nhập khách thử, mở cả 4 tab.
  2. Cần 1 đơn đã giao để thấy tab "Chờ đánh giá": nhờ FD2 chuyển trạng thái ở Admin.
  3. Gửi đánh giá, kiểm hiện trên trang sản phẩm.
  4. Ghi issue lỗi tìm được, sửa 1 lỗi.
- **Xong khi:** Có ảnh 4 tab, có commit sửa hoặc ghi chú "không lỗi", PD duyệt.
- **Quy trình git:** nhánh `study/fd1-p3` → PR → **PD Đạt** review → merge.

## 7. Bằng chứng cần có trước khi sang phase sau
- [ ] Tối thiểu 4 mục AI-LOG thật (AI-P3-FD1-01 … AI-P3-FD1-06), mỗi mục có phần kiểm tra và tự giải thích.
- [ ] Mọi task PRJ của phase đã merge: test nghiệm thu pass, ảnh/diff đối chiếu trong PR; link PR ghi vào [LP-FD1-Thanh](LP-FD1-Thanh.md).
- [ ] Trả lời được các câu ở bước 6 không cần xem code.
- [ ] Cập nhật bảng tiến độ trong [LP-FD1-Thanh](LP-FD1-Thanh.md).
