---
tags: [learning, member/PD, phase/P1]
---
# P1 · PD Đạt

> P1 Catalog, tài khoản, giao diện nền (04/11–10/11) · Tổng quan của bạn: [LP-PD-Dat](LP-PD-Dat.md) · Hướng dẫn phase: [P1-PD-Dat](../../../phases/P1-catalog-accounts/PD-Dat/P1-PD-Dat.md) · Log của bạn: `docs/ai-logs/dat.md`

**Mục tiêu:** Hiểu và bảo vệ được hệ thiết kế của nhóm: vì sao bố cục này, màu này, font này.

Thời lượng gợi ý: cả phase (1 tuần). **Thứ tự làm:**
1. Mục 2 + bước 1 (khái niệm) · đọc issue và tiêu chí xong của task ở mục 6.
2. **Mục 6: viết test hoặc ca kiểm thử trước, rồi tự xây task PRJ** (bước 5). Kẹt quá 1 buổi: hỏi reviewer hoặc PM.
3. Khi kiểm chứng đạt: bước 2 đọc lại code của chính bạn, giải thích được từng file ở mục 1.
4. Mục 3, 4, bước 3, 4, 6, 7: kiểm hiểu biết, tình huống, luyện bảo vệ, AI-LOG.

## 1. File bạn sẽ viết hoặc sửa
1. `docs/DESIGN-SYSTEM.md`
2. `docs/DECISIONS.md` (K01–K07)
3. `apps/web/src/index.css` (:root)
4. `docs/learning/PITFALLS.md` (nhóm A)

## 2. Kiến thức cần nắm
| # | Khái niệm | Vì sao cần | Thấy ở đâu trong code |
|---|---|---|---|
| 1 | Mục tiêu trang quyết định bố cục (portfolio vs bán hàng) | Chọn bố cục theo mục tiêu bán hàng | A1 |
| 2 | Design token (màu, chữ, khoảng cách) | Đổi một chỗ, cả web đổi | `index.css` |
| 3 | Font hỗ trợ tiếng Việt | Dấu đẹp, không đè | A10 |
| 4 | Phân cấp thị giác, CTA nổi bật | Mắt đi đúng thứ tự | `cta-glow` |
| 5 | Thu hẹp phạm vi có chủ đích | Ghi rõ phạm vi giao diện | A8 |

## 3. Tiêu chí đạt (tự đánh dấu, có bằng chứng)
- [ ] Trình bày 2 phút: vì sao chọn bố cục này, lấy gì từ trang tham khảo.
- [ ] Liệt kê token màu và nơi dùng.
- [ ] Giải thích vì sao chọn Be Vietnam Pro.
- [ ] Ghi nguồn đầy đủ cho mọi ảnh/video (bài tập).

Đạt khi: mọi ô được đánh dấu **và** mỗi ô có bằng chứng trong AI-LOG hoặc PR (lệnh đã chạy, ảnh, link commit).

## 4. Lỗi hay gặp trong phần này
Đọc tình huống, **tự đoán nguyên nhân trước** rồi mới đọc lời giải.

| Vấn đề | Cách tránh | Đọc thêm |
|---|---|---|
| Thiết kế đẹp nhưng sai mục đích | Hỏi "đẹp cho mục tiêu nào" trước khi chọn | [A1](../PITFALLS.md#a1) |
| Watermark | Xem tình huống | [A6](../PITFALLS.md#a6) |
| Font | Xem tình huống | [A10](../PITFALLS.md#a10) |

## 5. Lộ trình prompt (làm lần lượt, mỗi bước một phiên AI)
Mở đầu mỗi phiên bằng prompt "Khởi động phiên" trong [P1-PD-Dat](../../../phases/P1-catalog-accounts/PD-Dat/P1-PD-Dat.md) mục 4.1. **Không dán `.env`, mật khẩu, khóa.** Mỗi bước xong ghi một mục AI-LOG theo mã gợi ý.

### Bước 1 — Hiểu khái niệm (AI-P1-PD-01)
```text
Tôi là Đạt (PD) trong dự án DAYORA. Giải thích lần lượt các khái niệm sau bằng ví dụ đời thường, mỗi lần MỘT khái niệm, hỏi tôi 1 câu kiểm tra rồi mới sang khái niệm tiếp theo:
1. Mục tiêu trang quyết định bố cục (portfolio vs bán hàng)
2. Design token (màu, chữ, khoảng cách)
3. Font hỗ trợ tiếng Việt
4. Phân cấp thị giác, CTA nổi bật
5. Thu hẹp phạm vi có chủ đích
Không viết code. Nếu tôi trả lời sai, giải thích lại theo cách khác.
```
Tự kiểm: đóng AI, viết lại mỗi khái niệm 1 câu bằng lời của bạn.

### Bước 2 — Đọc lại code của bạn (AI-P1-PD-02)
Dán **từng file** theo thứ tự mục 1 (file dài thì dán từng hàm).
```text
Đây là <tên file> của DAYORA:
<dán code>
1) Tóm tắt file làm gì trong 3 câu.
2) Đi qua từng hàm: đầu vào, đầu ra, bước quan trọng; chỉ số dòng.
3) Khái niệm nào trong danh sách sau xuất hiện ở đâu: Mục tiêu trang quyết định bố cục (portfolio vs bán hàng); Design token (màu, chữ, khoảng cách); Font hỗ trợ tiếng Việt; Phân cấp thị giác, CTA nổi bật; Thu hẹp phạm vi có chủ đích.
4) Hỏi tôi 3 câu. Chỉ khi tôi trả lời đúng mới sang file tiếp.
```
Tự kiểm: mở file trong VS Code, tìm đúng dòng AI chỉ. **AI có thể chỉ sai dòng hoặc bịa hàm**: ghi lại nếu gặp.

### Bước 3 — Dự đoán rồi thử (AI-P1-PD-03)
Viết dự đoán **trước** khi chạy, rồi mới chạy.
```text
Tôi đổi một token màu trong DevTools (không sửa file) và dự đoán những phần nào đổi theo: <dự đoán>.
Đừng nói kết quả. Hãy hỏi tôi vì sao tôi dự đoán vậy, rồi hướng dẫn tôi cách chạy và cách đọc kết quả.
```
Ghi vào AI-LOG: dự đoán, kết quả thật, giải thích chỗ khác nhau.

### Bước 4 — Học từ tình huống thật (AI-P1-PD-04)
Chọn 1 tình huống ở mục 4, dán phần **Dấu hiệu** (chưa dán lời giải).
```text
Đây là một lỗi hay gặp khi làm phần này của DAYORA:
<dán phần Dấu hiệu>
Đừng nói lời giải. Hỏi tôi từng câu gợi ý để tôi tự tìm ra nguyên nhân gốc. Sau đó tôi sẽ dán phần Nguyên nhân và Cách tránh trong tài liệu để bạn so với suy luận của tôi.
```
Ghi AI-LOG: suy luận của bạn khác lời giải thật ở đâu.

### Bước 5 — Tự xây phần của bạn (AI-P1-PD-05, mỗi task PRJ một mục log)
Xem mục 6. AI chỉ **hướng dẫn và review**, bạn tự gõ code. Làm task PRJ trước, bài tập mở rộng sau.
```text
Tôi đang tự viết PRJ-P1-PD-1 "Trang Về chúng tôi" của dự án DAYORA.
File tôi phải viết: apps/web/src/pages/AboutPage.tsx; apps/web/src/catalog.css (phần .about-*).
1) Giúp tôi liệt kê các bước làm theo thứ tự.
Đừng viết code thay tôi. Chờ tôi làm xong mỗi bước. Khi tôi dán lỗi test hoặc git diff, chỉ ra chỗ sai và vì sao, gợi ý hướng sửa chứ không đưa code hoàn chỉnh.
```
Khi kiểm chứng đạt hoặc kẹt quá 1 buổi: ghi vào log cá nhân việc đã làm, chỗ kẹt và cách gỡ (xem [ROADMAP](../../ROADMAP.md)).

### Bước 6 — Luyện bảo vệ (AI-P1-PD-06)
```text
Đóng vai giảng viên chấm đồ án. Phần tôi phụ trách ở P1: Hiểu và bảo vệ được hệ thiết kế của nhóm: vì sao bố cục này, màu này, font này.
Hỏi tôi lần lượt (mỗi câu tôi trả lời trong 30 giây, không xem code):
1. Vì sao giữ intro video khi chuyển sang bố cục bán hàng?
2. Watermark được xử lý thế nào, vì sao không render lại video?
Sau đó hỏi thêm 2 câu vặn dựa trên câu trả lời của tôi, ra 1 yêu cầu sửa code nhỏ. Chấm từng câu và nói tôi cần học lại gì.
```

### Bước 7 — Ghi nhật ký AI
Nối thêm một mục vào log cá nhân `docs/ai-logs/<tên>.md` theo [quy tắc ghi log](../../ai-logs/ai-logging-rules.md) (đủ 7 trường, có mã phiên và mã mục, chỉ nối thêm). Phần **Phản biện**, **Quyết định của nhóm**, **Người kiểm tra** phải tự viết.

## 6. Nhiệm vụ xây dựng (commit đứng tên bạn)
Quy trình chung: [ROADMAP](../../ROADMAP.md).

### PRJ-P1-PD-1 — Trang Về chúng tôi
- **File phải viết:** `apps/web/src/pages/AboutPage.tsx`; `apps/web/src/catalog.css` (phần .about-*)
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** PRJ-P1-FD1-1
- **Kiểm chứng:** ca kiểm thử tay trong `docs/testing/TEST-CASES.md` (QA duyệt); ảnh 1366 px và 390 px trong PR; PD duyệt theo `docs/DESIGN-SYSTEM.md`.
- **Nhánh:** `prj/p1-pd-1` · **Reviewer:** FD1 Thành
- **Các bước:**
  - [ ] 1. Nội dung: câu chuyện thương hiệu, 8 thành viên (lấy từ `docs/ROLES.md`), hỏi đáp (dùng lại `faqs` trong `HomeSections.tsx`) — Xong khi: PM duyệt nội dung
  - [ ] 2. `AboutPage.tsx` theo bố cục trong `docs/DESIGN-SYSTEM.md`; logo trong `public/` — Xong khi: route `/about` hiện trang
  - [ ] 3. CSS `.about-*` trong `catalog.css`; 390 px: lưới về 1 cột, thẻ đội ngũ 2 cột — Xong khi: không tràn ngang
  - [ ] 4. Ảnh 1366 px và 390 px trong PR — Xong khi: FD1 duyệt

### PRJ-P1-PD-2 — Đối chiếu giao diện P1 với DESIGN-SYSTEM
- **File phải viết:** `docs/report/ux/P1-doi-chieu.md`
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** PRJ-P1-FD1-4
- **Kiểm chứng:** reviewer đối chiếu với `REQUIREMENTS.md`, `docs/DECISIONS.md` và kết quả chạy thật.
- **Nhánh:** `prj/p1-pd-2` · **Reviewer:** FD1 Thành
- **Các bước:**
  - [ ] 1. Chạy bản nhóm (5173), mở `docs/DESIGN-SYSTEM.md` bên cạnh — Xong khi: chụp đủ các trang P1 ở 1366 px và 390 px
  - [ ] 2. Chụp 1366 px và 390 px: trang chủ, Sản phẩm, Chi tiết, Đăng nhập, Về chúng tôi — Xong khi: 10 cặp ảnh
  - [ ] 3. `docs/report/ux/P1-doi-chieu.md`: bảng mỗi trang: giống / khác / mức độ (chặn, nên sửa, chấp nhận) / người sửa — Xong khi: mỗi khác biệt "chặn" có issue riêng gán người

### Bài tập mở rộng (sau khi xong task PRJ): Lập bảng nguồn và quyền sử dụng cho ảnh, video, font
- **File:** `docs/SOURCE-INVENTORY.md`
- **Các bước:**
  1. Liệt kê `apps/web/public/home/*` (story-1..4, trip-*, ảnh trích phim), video intro, 30 ảnh sản phẩm, font Be Vietnam Pro.
  2. Mỗi dòng: nguồn, công cụ, ngày, giấy phép, đã chỉnh gì (cắt watermark).
- **Xong khi:** Mọi file trong `public/` có dòng nguồn, FD1 duyệt.
- **Quy trình git:** nhánh `study/pd-p1` → PR → **FD1 Thành** review → merge.

## 7. Bằng chứng cần có trước khi sang phase sau
- [ ] Tối thiểu 4 mục AI-LOG thật (AI-P1-PD-01 … AI-P1-PD-06), mỗi mục có phần kiểm tra và tự giải thích.
- [ ] Mọi task PRJ của phase đã merge: test nghiệm thu pass, ảnh/diff đối chiếu trong PR; link PR ghi vào [LP-PD-Dat](LP-PD-Dat.md).
- [ ] Trả lời được các câu ở bước 6 không cần xem code.
- [ ] Cập nhật bảng tiến độ trong [LP-PD-Dat](LP-PD-Dat.md).
