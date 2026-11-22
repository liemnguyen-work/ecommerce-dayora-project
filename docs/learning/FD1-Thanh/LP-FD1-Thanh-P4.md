---
tags: [learning, member/FD1, phase/P4]
---
# P4 · FD1 Thành

> P4 Kit Builder (25/11–01/12) · Tổng quan của bạn: [LP-FD1-Thanh](LP-FD1-Thanh.md) · Hướng dẫn phase: [P4-FD1-Thanh](../../../phases/P4-kit-builder/FD1-Thanh/P4-FD1-Thanh.md) · Log của bạn: `docs/ai-logs/thanh.md`

**Mục tiêu:** Hiểu Kit Builder phía web: 3 bước, giữ bộ qua đăng nhập, đưa cả bộ vào giỏ.

Thời lượng gợi ý: cả phase (1 tuần). **Thứ tự làm:**
1. Mục 2 + bước 1 (khái niệm) · đọc issue và tiêu chí xong của task ở mục 6.
2. **Mục 6: viết test hoặc ca kiểm thử trước, rồi tự xây task PRJ** (bước 5). Kẹt quá 1 buổi: hỏi reviewer hoặc PM.
3. Khi kiểm chứng đạt: bước 2 đọc lại code của chính bạn, giải thích được từng file ở mục 1.
4. Mục 3, 4, bước 3, 4, 6, 7: kiểm hiểu biết, tình huống, luyện bảo vệ, AI-LOG.

## 1. File bạn sẽ viết hoặc sửa
1. `apps/web/src/pages/KitBuilderPage.tsx`
2. `apps/web/src/components/home/KitPreview.tsx`
3. `apps/web/src/lib/cart.ts` (addKitToCart)

## 2. Kiến thức cần nắm
| # | Khái niệm | Vì sao cần | Thấy ở đâu trong code |
|---|---|---|---|
| 1 | State nhiều bước (wizard) | 3 bước | `KitBuilderPage.tsx` |
| 2 | `sessionStorage` + try/catch | Giữ bộ khi đi đăng nhập | `PENDING_KIT` |
| 3 | Tham số `next` sau đăng nhập | Quay đúng chỗ | `/login?next=…` |
| 4 | Thanh ngân sách (phần trăm) | Trực quan hóa vượt ngân sách | `KitBuilderPage.tsx` |

## 3. Tiêu chí đạt (tự đánh dấu, có bằng chứng)
- [ ] Giải thích luồng khách chưa đăng nhập bấm "Đưa bộ vào giỏ".
- [ ] Giải thích vì sao bọc `sessionStorage` trong try/catch.
- [ ] Giải thích web gửi `ruleSetVersion` để làm gì (D09).
- [ ] Thử thật luồng "Đưa bộ vào giỏ" (chưa ai thử trên UI).

Đạt khi: mọi ô được đánh dấu **và** mỗi ô có bằng chứng trong AI-LOG hoặc PR (lệnh đã chạy, ảnh, link commit).

## 4. Lỗi hay gặp trong phần này
Đọc tình huống, **tự đoán nguyên nhân trước** rồi mới đọc lời giải.

| Vấn đề | Cách tránh | Đọc thêm |
|---|---|---|
| Mất bộ khi phải đăng nhập | Lưu tạm và khôi phục. | [D6](../PITFALLS.md#d6) |

## 5. Lộ trình prompt (làm lần lượt, mỗi bước một phiên AI)
Mở đầu mỗi phiên bằng prompt "Khởi động phiên" trong [P4-FD1-Thanh](../../../phases/P4-kit-builder/FD1-Thanh/P4-FD1-Thanh.md) mục 4.1. **Không dán `.env`, mật khẩu, khóa.** Mỗi bước xong ghi một mục AI-LOG theo mã gợi ý.

### Bước 1 — Hiểu khái niệm (AI-P4-FD1-01)
```text
Tôi là Thành (FD1) trong dự án DAYORA. Giải thích lần lượt các khái niệm sau bằng ví dụ đời thường, mỗi lần MỘT khái niệm, hỏi tôi 1 câu kiểm tra rồi mới sang khái niệm tiếp theo:
1. State nhiều bước (wizard)
2. `sessionStorage` + try/catch
3. Tham số `next` sau đăng nhập
4. Thanh ngân sách (phần trăm)
Không viết code. Nếu tôi trả lời sai, giải thích lại theo cách khác.
```
Tự kiểm: đóng AI, viết lại mỗi khái niệm 1 câu bằng lời của bạn.

### Bước 2 — Đọc lại code của bạn (AI-P4-FD1-02)
Dán **từng file** theo thứ tự mục 1 (file dài thì dán từng hàm).
```text
Đây là <tên file> của DAYORA:
<dán code>
1) Tóm tắt file làm gì trong 3 câu.
2) Đi qua từng hàm: đầu vào, đầu ra, bước quan trọng; chỉ số dòng.
3) Khái niệm nào trong danh sách sau xuất hiện ở đâu: State nhiều bước (wizard); `sessionStorage` + try/catch; Tham số `next` sau đăng nhập; Thanh ngân sách (phần trăm).
4) Hỏi tôi 3 câu. Chỉ khi tôi trả lời đúng mới sang file tiếp.
```
Tự kiểm: mở file trong VS Code, tìm đúng dòng AI chỉ. **AI có thể chỉ sai dòng hoặc bịa hàm**: ghi lại nếu gặp.

### Bước 3 — Dự đoán rồi thử (AI-P4-FD1-03)
Viết dự đoán **trước** khi chạy, rồi mới chạy.
```text
Tôi tạo bộ khi chưa đăng nhập, bấm Đưa vào giỏ, đăng nhập, và dự đoán giỏ có <số> món.
Đừng nói kết quả. Hãy hỏi tôi vì sao tôi dự đoán vậy, rồi hướng dẫn tôi cách chạy và cách đọc kết quả.
```
Ghi vào AI-LOG: dự đoán, kết quả thật, giải thích chỗ khác nhau.

### Bước 4 — Học từ tình huống thật (AI-P4-FD1-04)
Chọn 1 tình huống ở mục 4, dán phần **Dấu hiệu** (chưa dán lời giải).
```text
Đây là một lỗi hay gặp khi làm phần này của DAYORA:
<dán phần Dấu hiệu>
Đừng nói lời giải. Hỏi tôi từng câu gợi ý để tôi tự tìm ra nguyên nhân gốc. Sau đó tôi sẽ dán phần Nguyên nhân và Cách tránh trong tài liệu để bạn so với suy luận của tôi.
```
Ghi AI-LOG: suy luận của bạn khác lời giải thật ở đâu.

### Bước 5 — Tự xây phần của bạn (AI-P4-FD1-05, mỗi task PRJ một mục log)
Xem mục 6. AI chỉ **hướng dẫn và review**, bạn tự gõ code. Làm task PRJ trước, bài tập mở rộng sau.
```text
Tôi đang tự viết PRJ-P4-FD1-1 "Kit Builder 3 bước + giữ bộ qua đăng nhập" của dự án DAYORA.
File tôi phải viết: apps/web/src/pages/KitBuilderPage.tsx.
1) Giúp tôi liệt kê các bước làm theo thứ tự.
Đừng viết code thay tôi. Chờ tôi làm xong mỗi bước. Khi tôi dán lỗi test hoặc git diff, chỉ ra chỗ sai và vì sao, gợi ý hướng sửa chứ không đưa code hoàn chỉnh.
```
Khi kiểm chứng đạt hoặc kẹt quá 1 buổi: ghi vào log cá nhân việc đã làm, chỗ kẹt và cách gỡ (xem [ROADMAP](../../ROADMAP.md)).

### Bước 6 — Luyện bảo vệ (AI-P4-FD1-06)
```text
Đóng vai giảng viên chấm đồ án. Phần tôi phụ trách ở P4: Hiểu Kit Builder phía web: 3 bước, giữ bộ qua đăng nhập, đưa cả bộ vào giỏ.
Hỏi tôi lần lượt (mỗi câu tôi trả lời trong 30 giây, không xem code):
1. Nếu admin phát hành RuleSet mới khi khách đang ở bước 2 thì chuyện gì xảy ra?
Sau đó hỏi thêm 2 câu vặn dựa trên câu trả lời của tôi, ra 1 yêu cầu sửa code nhỏ. Chấm từng câu và nói tôi cần học lại gì.
```

### Bước 7 — Ghi nhật ký AI
Nối thêm một mục vào log cá nhân `docs/ai-logs/<tên>.md` theo [quy tắc ghi log](../../ai-logs/ai-logging-rules.md) (đủ 7 trường, có mã phiên và mã mục, chỉ nối thêm). Phần **Phản biện**, **Quyết định của nhóm**, **Người kiểm tra** phải tự viết.

## 6. Nhiệm vụ xây dựng (commit đứng tên bạn)
Quy trình chung: [ROADMAP](../../ROADMAP.md).

### PRJ-P4-FD1-1 — Kit Builder 3 bước + giữ bộ qua đăng nhập
- **File phải viết:** `apps/web/src/pages/KitBuilderPage.tsx`
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** PRJ-P4-BD2-1
- **Kiểm chứng:** ca kiểm thử tay trong `docs/testing/TEST-CASES.md` (QA duyệt); ảnh 1366 px và 390 px trong PR; PD duyệt theo `docs/DESIGN-SYSTEM.md`.
- **Nhánh:** `prj/p4-fd1-1` · **Reviewer:** PD Đạt

### PRJ-P4-FD1-2 — Xem trước bộ trên trang chủ
- **File phải viết:** `apps/web/src/components/home/KitPreview.tsx`
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** PRJ-P4-FD1-1
- **Kiểm chứng:** ca kiểm thử tay trong `docs/testing/TEST-CASES.md` (QA duyệt); ảnh 1366 px và 390 px trong PR; PD duyệt theo `docs/DESIGN-SYSTEM.md`.
- **Nhánh:** `prj/p4-fd1-2` · **Reviewer:** PD Đạt

### Bài tập mở rộng (sau khi xong task PRJ): Thử luồng Kit Builder → giỏ và sửa lỗi tìm được
- **File:** `apps/web/src/pages/KitBuilderPage.tsx`, `docs/report/images/`
- **Các bước:**
  1. Thử: đã đăng nhập, chưa đăng nhập, đổi món, vượt ngân sách, 1 người, 8 người.
  2. Ghi issue, sửa 1 lỗi hoặc commit minh chứng.
- **Xong khi:** Có minh chứng cả 2 luồng, PD duyệt.
- **Quy trình git:** nhánh `study/fd1-p4` → PR → **PD Đạt** review → merge.

## 7. Bằng chứng cần có trước khi sang phase sau
- [ ] Tối thiểu 4 mục AI-LOG thật (AI-P4-FD1-01 … AI-P4-FD1-06), mỗi mục có phần kiểm tra và tự giải thích.
- [ ] Mọi task PRJ của phase đã merge: test nghiệm thu pass, ảnh/diff đối chiếu trong PR; link PR ghi vào [LP-FD1-Thanh](LP-FD1-Thanh.md).
- [ ] Trả lời được các câu ở bước 6 không cần xem code.
- [ ] Cập nhật bảng tiến độ trong [LP-FD1-Thanh](LP-FD1-Thanh.md).
