---
tags: [learning, member/PD, phase/P5]
---
# P5 · PD Đạt

> P5 Quản trị quy tắc, dashboard, bảo mật (02/12–08/12) · Tổng quan của bạn: [LP-PD-Dat](LP-PD-Dat.md) · Hướng dẫn phase: [P5-PD-Dat](../../../phases/P5-admin-security/PD-Dat/P5-PD-Dat.md) · Log của bạn: `docs/ai-logs/dat.md`

**Mục tiêu:** Kiểm tra tương phản và focus theo WCAG.

Thời lượng gợi ý: cả phase (1 tuần). **Thứ tự làm:**
1. Mục 2 + bước 1 (khái niệm) · đọc issue và tiêu chí xong của task ở mục 6.
2. **Mục 6: viết test hoặc ca kiểm thử trước, rồi tự xây task PRJ** (bước 5). Kẹt quá 1 buổi: hỏi reviewer hoặc PM.
3. Khi kiểm chứng đạt: bước 2 đọc lại code của chính bạn, giải thích được từng file ở mục 1.
4. Mục 3, 4, bước 3, 4, 6, 7: kiểm hiểu biết, tình huống, luyện bảo vệ, AI-LOG.

## 1. File bạn sẽ viết hoặc sửa
1. `apps/web/src/index.css` (:root, :focus-visible)
2. `docs/DESIGN-SYSTEM.md`

## 2. Kiến thức cần nắm
| # | Khái niệm | Vì sao cần | Thấy ở đâu trong code |
|---|---|---|---|
| 1 | Tỉ lệ tương phản 4.5:1 (chữ thường), 3:1 (chữ lớn) | WCAG AA | token |
| 2 | Focus nhìn thấy được | Bàn phím | CSS |

## 3. Tiêu chí đạt (tự đánh dấu, có bằng chứng)
- [ ] Bảng mọi cặp chữ/nền thường dùng kèm tỉ lệ.
- [ ] Đánh dấu cặp không đạt, đề xuất màu thay.

Đạt khi: mọi ô được đánh dấu **và** mỗi ô có bằng chứng trong AI-LOG hoặc PR (lệnh đã chạy, ảnh, link commit).

## 4. Lỗi hay gặp trong phần này
Đọc tình huống, **tự đoán nguyên nhân trước** rồi mới đọc lời giải.

| Vấn đề | Cách tránh | Đọc thêm |
|---|---|---|
| Dấu tiếng Việt bị cắt | Xem tình huống | [D4](../PITFALLS.md#d4) |

## 5. Lộ trình prompt (làm lần lượt, mỗi bước một phiên AI)
Mở đầu mỗi phiên bằng prompt "Khởi động phiên" trong [P5-PD-Dat](../../../phases/P5-admin-security/PD-Dat/P5-PD-Dat.md) mục 4.1. **Không dán `.env`, mật khẩu, khóa.** Mỗi bước xong ghi một mục AI-LOG theo mã gợi ý.

### Bước 1 — Hiểu khái niệm (AI-P5-PD-01)
```text
Tôi là Đạt (PD) trong dự án DAYORA. Giải thích lần lượt các khái niệm sau bằng ví dụ đời thường, mỗi lần MỘT khái niệm, hỏi tôi 1 câu kiểm tra rồi mới sang khái niệm tiếp theo:
1. Tỉ lệ tương phản 4.5:1 (chữ thường), 3:1 (chữ lớn)
2. Focus nhìn thấy được
Không viết code. Nếu tôi trả lời sai, giải thích lại theo cách khác.
```
Tự kiểm: đóng AI, viết lại mỗi khái niệm 1 câu bằng lời của bạn.

### Bước 2 — Đọc lại code của bạn (AI-P5-PD-02)
Dán **từng file** theo thứ tự mục 1 (file dài thì dán từng hàm).
```text
Đây là <tên file> của DAYORA:
<dán code>
1) Tóm tắt file làm gì trong 3 câu.
2) Đi qua từng hàm: đầu vào, đầu ra, bước quan trọng; chỉ số dòng.
3) Khái niệm nào trong danh sách sau xuất hiện ở đâu: Tỉ lệ tương phản 4.5:1 (chữ thường), 3:1 (chữ lớn); Focus nhìn thấy được.
4) Hỏi tôi 3 câu. Chỉ khi tôi trả lời đúng mới sang file tiếp.
```
Tự kiểm: mở file trong VS Code, tìm đúng dòng AI chỉ. **AI có thể chỉ sai dòng hoặc bịa hàm**: ghi lại nếu gặp.

### Bước 3 — Dự đoán rồi thử (AI-P5-PD-03)
Viết dự đoán **trước** khi chạy, rồi mới chạy.
```text
Tôi đo tương phản chữ trắng trên video hero ở khung tối nhất và sáng nhất.
Đừng nói kết quả. Hãy hỏi tôi vì sao tôi dự đoán vậy, rồi hướng dẫn tôi cách chạy và cách đọc kết quả.
```
Ghi vào AI-LOG: dự đoán, kết quả thật, giải thích chỗ khác nhau.

### Bước 4 — Học từ tình huống thật (AI-P5-PD-04)
Chọn 1 tình huống ở mục 4, dán phần **Dấu hiệu** (chưa dán lời giải).
```text
Đây là một lỗi hay gặp khi làm phần này của DAYORA:
<dán phần Dấu hiệu>
Đừng nói lời giải. Hỏi tôi từng câu gợi ý để tôi tự tìm ra nguyên nhân gốc. Sau đó tôi sẽ dán phần Nguyên nhân và Cách tránh trong tài liệu để bạn so với suy luận của tôi.
```
Ghi AI-LOG: suy luận của bạn khác lời giải thật ở đâu.

### Bước 5 — Tự xây phần của bạn (AI-P5-PD-05, mỗi task PRJ một mục log)
Xem mục 6. AI chỉ **hướng dẫn và review**, bạn tự gõ code. Làm task PRJ trước, bài tập mở rộng sau.
```text
Tôi đang tự viết PRJ-P5-PD-1 "Kiểm tương phản + nguồn ảnh" của dự án DAYORA.
File tôi phải viết: design/CONTRAST-AUDIT.md; docs/SOURCE-INVENTORY.md.
1) Giúp tôi liệt kê các bước làm theo thứ tự.
Đừng viết code thay tôi. Chờ tôi làm xong mỗi bước. Khi tôi dán lỗi test hoặc git diff, chỉ ra chỗ sai và vì sao, gợi ý hướng sửa chứ không đưa code hoàn chỉnh.
```
Khi kiểm chứng đạt hoặc kẹt quá 1 buổi: ghi vào log cá nhân việc đã làm, chỗ kẹt và cách gỡ (xem [ROADMAP](../../ROADMAP.md)).

### Bước 6 — Luyện bảo vệ (AI-P5-PD-06)
```text
Đóng vai giảng viên chấm đồ án. Phần tôi phụ trách ở P5: Kiểm tra tương phản và focus theo WCAG.
Hỏi tôi lần lượt (mỗi câu tôi trả lời trong 30 giây, không xem code):
1. Chữ trên video: làm sao bảo đảm đọc được ở mọi khung hình?
Sau đó hỏi thêm 2 câu vặn dựa trên câu trả lời của tôi, ra 1 yêu cầu sửa code nhỏ. Chấm từng câu và nói tôi cần học lại gì.
```

### Bước 7 — Ghi nhật ký AI
Nối thêm một mục vào log cá nhân `docs/ai-logs/<tên>.md` theo [quy tắc ghi log](../../ai-logs/ai-logging-rules.md) (đủ 7 trường, có mã phiên và mã mục, chỉ nối thêm). Phần **Phản biện**, **Quyết định của nhóm**, **Người kiểm tra** phải tự viết.

## 6. Nhiệm vụ xây dựng (commit đứng tên bạn)
Quy trình chung: [ROADMAP](../../ROADMAP.md).

### PRJ-P5-PD-1 — Kiểm tương phản + nguồn ảnh
- **File phải viết:** `design/CONTRAST-AUDIT.md`; `docs/SOURCE-INVENTORY.md`
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** không
- **Kiểm chứng:** reviewer đối chiếu với `REQUIREMENTS.md`, `docs/DECISIONS.md` và kết quả chạy thật.
- **Nhánh:** `prj/p5-pd-1` · **Reviewer:** FD1 Thành

### Bài tập mở rộng (sau khi xong task PRJ): Bảng kiểm tương phản
- **File:** `design/CONTRAST-AUDIT.md` (mới)
- **Các bước:**
  1. Dùng WebAIM Contrast Checker.
  2. Gửi đề xuất cho FD1 bằng issue.
- **Xong khi:** FD1 duyệt.
- **Quy trình git:** nhánh `study/pd-p5` → PR → **FD1 Thành** review → merge.

## 7. Bằng chứng cần có trước khi sang phase sau
- [ ] Tối thiểu 4 mục AI-LOG thật (AI-P5-PD-01 … AI-P5-PD-06), mỗi mục có phần kiểm tra và tự giải thích.
- [ ] Mọi task PRJ của phase đã merge: test nghiệm thu pass, ảnh/diff đối chiếu trong PR; link PR ghi vào [LP-PD-Dat](LP-PD-Dat.md).
- [ ] Trả lời được các câu ở bước 6 không cần xem code.
- [ ] Cập nhật bảng tiến độ trong [LP-PD-Dat](LP-PD-Dat.md).
