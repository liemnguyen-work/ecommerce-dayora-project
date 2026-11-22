---
tags: [learning, member/FD2, phase/P2]
---
# P2 · FD2 Phúc

> P2 Giỏ hàng, voucher, phí giao, checkout (11/11–17/11) · Tổng quan của bạn: [LP-FD2-Phuc](LP-FD2-Phuc.md) · Hướng dẫn phase: [P2-FD2-Phuc](../../../phases/P2-cart-checkout/FD2-Phuc/P2-FD2-Phuc.md) · Log của bạn: `docs/ai-logs/phuc.md`

**Mục tiêu:** Hiểu quản trị Voucher và Khuyến mãi, hiển thị lỗi validate từ server.

Thời lượng gợi ý: cả phase (1 tuần). **Thứ tự làm:**
1. Mục 2 + bước 1 (khái niệm) · đọc issue và tiêu chí xong của task ở mục 6.
2. **Mục 6: viết test hoặc ca kiểm thử trước, rồi tự xây task PRJ** (bước 5). Kẹt quá 1 buổi: hỏi reviewer hoặc PM.
3. Khi kiểm chứng đạt: bước 2 đọc lại code của chính bạn, giải thích được từng file ở mục 1.
4. Mục 3, 4, bước 3, 4, 6, 7: kiểm hiểu biết, tình huống, luyện bảo vệ, AI-LOG.

## 1. File bạn sẽ viết hoặc sửa
1. `apps/web/src/pages/AdminPage.tsx` (Vouchers, Promotions)
2. `apps/api/src/admin-vouchers/admin-vouchers.dto.ts`
3. `apps/api/src/promotions/admin-promotions.dto.ts`
4. `docs/DECISIONS.md` (D03)

## 2. Kiến thức cần nắm
| # | Khái niệm | Vì sao cần | Thấy ở đâu trong code |
|---|---|---|---|
| 1 | Ràng buộc voucher: một trong % / số tiền, `maxDiscount`, `usageLimit ≥ usedCount` | D03 | DTO |
| 2 | Hiện lỗi 400 từ server lên form | Admin biết sửa gì | `Vouchers` |
| 3 | Trạng thái tính sẵn: active / scheduled / expired / disabled | Không tự tính lại ở web | response |
| 4 | Link khuyến mãi chỉ nội bộ (`/…`) | Chống chèn link độc | promotions DTO |

## 3. Tiêu chí đạt (tự đánh dấu, có bằng chứng)
- [ ] Tạo voucher hợp lệ và 3 voucher sai, giải thích từng lỗi.
- [ ] Giải thích vì sao không có nút xóa voucher.
- [ ] Giải thích vì sao link khuyến mãi ngoài bị chặn.
- [ ] Tách 2 mục ra file (bài tập).

Đạt khi: mọi ô được đánh dấu **và** mỗi ô có bằng chứng trong AI-LOG hoặc PR (lệnh đã chạy, ảnh, link commit).

## 4. Lỗi hay gặp trong phần này
Đọc tình huống, **tự đoán nguyên nhân trước** rồi mới đọc lời giải.

| Vấn đề | Cách tránh | Đọc thêm |
|---|---|---|
| Voucher dùng quá lượt | Khóa dòng khi tạo đơn. | [C1](../PITFALLS.md#c1) |

## 5. Lộ trình prompt (làm lần lượt, mỗi bước một phiên AI)
Mở đầu mỗi phiên bằng prompt "Khởi động phiên" trong [P2-FD2-Phuc](../../../phases/P2-cart-checkout/FD2-Phuc/P2-FD2-Phuc.md) mục 4.1. **Không dán `.env`, mật khẩu, khóa.** Mỗi bước xong ghi một mục AI-LOG theo mã gợi ý.

### Bước 1 — Hiểu khái niệm (AI-P2-FD2-01)
```text
Tôi là Phúc (FD2) trong dự án DAYORA. Giải thích lần lượt các khái niệm sau bằng ví dụ đời thường, mỗi lần MỘT khái niệm, hỏi tôi 1 câu kiểm tra rồi mới sang khái niệm tiếp theo:
1. Ràng buộc voucher: một trong % / số tiền, `maxDiscount`, `usageLimit ≥ usedCount`
2. Hiện lỗi 400 từ server lên form
3. Trạng thái tính sẵn: active / scheduled / expired / disabled
4. Link khuyến mãi chỉ nội bộ (`/…`)
Không viết code. Nếu tôi trả lời sai, giải thích lại theo cách khác.
```
Tự kiểm: đóng AI, viết lại mỗi khái niệm 1 câu bằng lời của bạn.

### Bước 2 — Đọc lại code của bạn (AI-P2-FD2-02)
Dán **từng file** theo thứ tự mục 1 (file dài thì dán từng hàm).
```text
Đây là <tên file> của DAYORA:
<dán code>
1) Tóm tắt file làm gì trong 3 câu.
2) Đi qua từng hàm: đầu vào, đầu ra, bước quan trọng; chỉ số dòng.
3) Khái niệm nào trong danh sách sau xuất hiện ở đâu: Ràng buộc voucher: một trong % / số tiền, `maxDiscount`, `usageLimit ≥ usedCount`; Hiện lỗi 400 từ server lên form; Trạng thái tính sẵn: active / scheduled / expired / disabled; Link khuyến mãi chỉ nội bộ (`/…`).
4) Hỏi tôi 3 câu. Chỉ khi tôi trả lời đúng mới sang file tiếp.
```
Tự kiểm: mở file trong VS Code, tìm đúng dòng AI chỉ. **AI có thể chỉ sai dòng hoặc bịa hàm**: ghi lại nếu gặp.

### Bước 3 — Dự đoán rồi thử (AI-P2-FD2-03)
Viết dự đoán **trước** khi chạy, rồi mới chạy.
```text
Tôi tạo voucher có cả `percentOff` và `amountOff`. Tôi dự đoán lỗi <dự đoán>.
Đừng nói kết quả. Hãy hỏi tôi vì sao tôi dự đoán vậy, rồi hướng dẫn tôi cách chạy và cách đọc kết quả.
```
Ghi vào AI-LOG: dự đoán, kết quả thật, giải thích chỗ khác nhau.

### Bước 4 — Học từ tình huống thật (AI-P2-FD2-04)
Chọn 1 tình huống ở mục 4, dán phần **Dấu hiệu** (chưa dán lời giải).
```text
Đây là một lỗi hay gặp khi làm phần này của DAYORA:
<dán phần Dấu hiệu>
Đừng nói lời giải. Hỏi tôi từng câu gợi ý để tôi tự tìm ra nguyên nhân gốc. Sau đó tôi sẽ dán phần Nguyên nhân và Cách tránh trong tài liệu để bạn so với suy luận của tôi.
```
Ghi AI-LOG: suy luận của bạn khác lời giải thật ở đâu.

### Bước 5 — Tự xây phần của bạn (AI-P2-FD2-05, mỗi task PRJ một mục log)
Xem mục 6. AI chỉ **hướng dẫn và review**, bạn tự gõ code. Làm task PRJ trước, bài tập mở rộng sau.
```text
Tôi đang tự viết PRJ-P2-FD2-1 "Admin Voucher + Khuyến mãi" của dự án DAYORA.
File tôi phải viết: apps/web/src/pages/AdminPage.tsx (Vouchers, Promotions).
1) Giúp tôi liệt kê các bước làm theo thứ tự.
Đừng viết code thay tôi. Chờ tôi làm xong mỗi bước. Khi tôi dán lỗi test hoặc git diff, chỉ ra chỗ sai và vì sao, gợi ý hướng sửa chứ không đưa code hoàn chỉnh.
```
Khi kiểm chứng đạt hoặc kẹt quá 1 buổi: ghi vào log cá nhân việc đã làm, chỗ kẹt và cách gỡ (xem [ROADMAP](../../ROADMAP.md)).

### Bước 6 — Luyện bảo vệ (AI-P2-FD2-06)
```text
Đóng vai giảng viên chấm đồ án. Phần tôi phụ trách ở P2: Hiểu quản trị Voucher và Khuyến mãi, hiển thị lỗi validate từ server.
Hỏi tôi lần lượt (mỗi câu tôi trả lời trong 30 giây, không xem code):
1. Thêm ô "đơn tối thiểu" vào form thì sửa những đâu?
Sau đó hỏi thêm 2 câu vặn dựa trên câu trả lời của tôi, ra 1 yêu cầu sửa code nhỏ. Chấm từng câu và nói tôi cần học lại gì.
```

### Bước 7 — Ghi nhật ký AI
Nối thêm một mục vào log cá nhân `docs/ai-logs/<tên>.md` theo [quy tắc ghi log](../../ai-logs/ai-logging-rules.md) (đủ 7 trường, có mã phiên và mã mục, chỉ nối thêm). Phần **Phản biện**, **Quyết định của nhóm**, **Người kiểm tra** phải tự viết.

## 6. Nhiệm vụ xây dựng (commit đứng tên bạn)
Quy trình chung: [ROADMAP](../../ROADMAP.md).

### PRJ-P2-FD2-1 — Admin Voucher + Khuyến mãi
- **File phải viết:** `apps/web/src/pages/AdminPage.tsx` (Vouchers, Promotions)
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** PRJ-P2-BD1-3
- **Kiểm chứng:** ca kiểm thử tay trong `docs/testing/TEST-CASES.md` (QA duyệt); ảnh 1366 px và 390 px trong PR; PD duyệt theo `docs/DESIGN-SYSTEM.md`.
- **Nhánh:** `prj/p2-fd2-1` · **Reviewer:** FD1 Thành

### Bài tập mở rộng (sau khi xong task PRJ): Tách mục Voucher và Khuyến mãi ra `pages/admin/`
- **File:** `apps/web/src/pages/AdminPage.tsx`, `apps/web/src/pages/admin/Vouchers.tsx` (mới), `apps/web/src/pages/admin/Promotions.tsx` (mới)
- **Các bước:**
  1. Như bài P1.
  2. Thử tạo/sửa/bật tắt sau khi tách.
- **Xong khi:** Build/lint pass, hành vi không đổi, FD1 duyệt.
- **Quy trình git:** nhánh `study/fd2-p2` → PR → **FD1 Thành** review → merge.

## 7. Bằng chứng cần có trước khi sang phase sau
- [ ] Tối thiểu 4 mục AI-LOG thật (AI-P2-FD2-01 … AI-P2-FD2-06), mỗi mục có phần kiểm tra và tự giải thích.
- [ ] Mọi task PRJ của phase đã merge: test nghiệm thu pass, ảnh/diff đối chiếu trong PR; link PR ghi vào [LP-FD2-Phuc](LP-FD2-Phuc.md).
- [ ] Trả lời được các câu ở bước 6 không cần xem code.
- [ ] Cập nhật bảng tiến độ trong [LP-FD2-Phuc](LP-FD2-Phuc.md).
