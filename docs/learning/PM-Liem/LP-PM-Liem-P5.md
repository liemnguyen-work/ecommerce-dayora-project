---
tags: [learning, member/PM, phase/P5]
---
# P5 · PM Liêm

> P5 Quản trị quy tắc, dashboard, bảo mật (02/12–08/12) · Tổng quan của bạn: [LP-PM-Liem](LP-PM-Liem.md) · Hướng dẫn phase: [P5-PM-Liem](../../../phases/P5-admin-security/PM-Liem/P5-PM-Liem.md) · Log của bạn: `docs/ai-logs/liem.md`

**Mục tiêu:** Viết phần bảo mật và bảng đóng góp.

Thời lượng gợi ý: cả phase (1 tuần). **Thứ tự làm:**
1. Mục 2 + bước 1 (khái niệm) · đọc issue và tiêu chí xong của task ở mục 6.
2. **Mục 6: viết test hoặc ca kiểm thử trước, rồi tự xây task PRJ** (bước 5). Kẹt quá 1 buổi: hỏi reviewer hoặc PM.
3. Khi kiểm chứng đạt: bước 2 đọc lại code của chính bạn, giải thích được từng file ở mục 1.
4. Mục 3, 4, bước 3, 4, 6, 7: kiểm hiểu biết, tình huống, luyện bảo vệ, AI-LOG.

## 1. File bạn sẽ viết hoặc sửa
3. `docs/ai-logs/AI_USAGE_LOG.md`

## 2. Kiến thức cần nắm
| # | Khái niệm | Vì sao cần | Thấy ở đâu trong code |
|---|---|---|---|
| 1 | NFR04 và bằng chứng | Bảo mật | bảng rà route của nhóm |
| 2 | Đóng góp thật theo commit + AI-LOG | Liêm chính học thuật | git log |

## 3. Tiêu chí đạt (tự đánh dấu, có bằng chứng)
- [ ] Mỗi biện pháp bảo mật 1 câu + minh chứng.
- [ ] Bảng đóng góp đối chiếu `git log --author`.

Đạt khi: mọi ô được đánh dấu **và** mỗi ô có bằng chứng trong AI-LOG hoặc PR (lệnh đã chạy, ảnh, link commit).

## 4. Lỗi hay gặp trong phần này
Đọc tình huống, **tự đoán nguyên nhân trước** rồi mới đọc lời giải.

| Vấn đề | Cách tránh | Đọc thêm |
|---|---|---|
| Quy trình 1 task 1 owner | Xem tình huống | [E5](../PITFALLS.md#e5) |

## 5. Lộ trình prompt (làm lần lượt, mỗi bước một phiên AI)
Mở đầu mỗi phiên bằng prompt "Khởi động phiên" trong [P5-PM-Liem](../../../phases/P5-admin-security/PM-Liem/P5-PM-Liem.md) mục 4.1. **Không dán `.env`, mật khẩu, khóa.** Mỗi bước xong ghi một mục AI-LOG theo mã gợi ý.

### Bước 1 — Hiểu khái niệm (AI-P5-PM-01)
```text
Tôi là Liêm (PM) trong dự án DAYORA. Giải thích lần lượt các khái niệm sau bằng ví dụ đời thường, mỗi lần MỘT khái niệm, hỏi tôi 1 câu kiểm tra rồi mới sang khái niệm tiếp theo:
1. NFR04 và bằng chứng
2. Đóng góp thật theo commit + AI-LOG
Không viết code. Nếu tôi trả lời sai, giải thích lại theo cách khác.
```
Tự kiểm: đóng AI, viết lại mỗi khái niệm 1 câu bằng lời của bạn.

### Bước 2 — Đọc lại code của bạn (AI-P5-PM-02)
Dán **từng file** theo thứ tự mục 1 (file dài thì dán từng hàm).
```text
Đây là <tên file> của DAYORA:
<dán code>
1) Tóm tắt file làm gì trong 3 câu.
2) Đi qua từng hàm: đầu vào, đầu ra, bước quan trọng; chỉ số dòng.
3) Khái niệm nào trong danh sách sau xuất hiện ở đâu: NFR04 và bằng chứng; Đóng góp thật theo commit + AI-LOG.
4) Hỏi tôi 3 câu. Chỉ khi tôi trả lời đúng mới sang file tiếp.
```
Tự kiểm: mở file trong VS Code, tìm đúng dòng AI chỉ. **AI có thể chỉ sai dòng hoặc bịa hàm**: ghi lại nếu gặp.

### Bước 3 — Dự đoán rồi thử (AI-P5-PM-03)
Viết dự đoán **trước** khi chạy, rồi mới chạy.
```text
Tôi chạy `git shortlog -sn` và so với bảng phân công.
Đừng nói kết quả. Hãy hỏi tôi vì sao tôi dự đoán vậy, rồi hướng dẫn tôi cách chạy và cách đọc kết quả.
```
Ghi vào AI-LOG: dự đoán, kết quả thật, giải thích chỗ khác nhau.

### Bước 4 — Học từ tình huống thật (AI-P5-PM-04)
Chọn 1 tình huống ở mục 4, dán phần **Dấu hiệu** (chưa dán lời giải).
```text
Đây là một lỗi hay gặp khi làm phần này của DAYORA:
<dán phần Dấu hiệu>
Đừng nói lời giải. Hỏi tôi từng câu gợi ý để tôi tự tìm ra nguyên nhân gốc. Sau đó tôi sẽ dán phần Nguyên nhân và Cách tránh trong tài liệu để bạn so với suy luận của tôi.
```
Ghi AI-LOG: suy luận của bạn khác lời giải thật ở đâu.

### Bước 5 — Tự xây phần của bạn (AI-P5-PM-05, mỗi task PRJ một mục log)
Xem mục 6. AI chỉ **hướng dẫn và review**, bạn tự gõ code. Làm task PRJ trước, bài tập mở rộng sau.
```text
Tôi đang tự viết PRJ-P5-PM-1 "Chương bảo mật + bảng đóng góp từ git log" của dự án DAYORA.
File tôi phải viết: docs/report/CH4-security.md; docs/report/CONTRIBUTIONS.md.
1) Giúp tôi liệt kê các bước làm theo thứ tự.
Đừng viết code thay tôi. Chờ tôi làm xong mỗi bước. Khi tôi dán lỗi test hoặc git diff, chỉ ra chỗ sai và vì sao, gợi ý hướng sửa chứ không đưa code hoàn chỉnh.
```
Khi kiểm chứng đạt hoặc kẹt quá 1 buổi: ghi vào log cá nhân việc đã làm, chỗ kẹt và cách gỡ (xem [ROADMAP](../../ROADMAP.md)).

### Bước 6 — Luyện bảo vệ (AI-P5-PM-06)
```text
Đóng vai giảng viên chấm đồ án. Phần tôi phụ trách ở P5: Viết phần bảo mật và bảng đóng góp.
Hỏi tôi lần lượt (mỗi câu tôi trả lời trong 30 giây, không xem code):
1. Nhóm dùng AI thế nào mà vẫn đảm bảo mỗi người hiểu code?
Sau đó hỏi thêm 2 câu vặn dựa trên câu trả lời của tôi, ra 1 yêu cầu sửa code nhỏ. Chấm từng câu và nói tôi cần học lại gì.
```

### Bước 7 — Ghi nhật ký AI
Nối thêm một mục vào log cá nhân `docs/ai-logs/<tên>.md` theo [quy tắc ghi log](../../ai-logs/ai-logging-rules.md) (đủ 7 trường, có mã phiên và mã mục, chỉ nối thêm). Phần **Phản biện**, **Quyết định của nhóm**, **Người kiểm tra** phải tự viết.

## 6. Nhiệm vụ xây dựng (commit đứng tên bạn)
Quy trình chung: [ROADMAP](../../ROADMAP.md).

### PRJ-P5-PM-1 — Chương bảo mật + bảng đóng góp từ git log
- **File phải viết:** `docs/report/CH4-security.md`; `docs/report/CONTRIBUTIONS.md`
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** không
- **Kiểm chứng:** reviewer đối chiếu với `REQUIREMENTS.md`, `docs/DECISIONS.md` và kết quả chạy thật.
- **Nhánh:** `prj/p5-pm-1` · **Reviewer:** QA Ngọc

### Bài tập mở rộng (sau khi xong task PRJ): Chương bảo mật + bảng đóng góp
- **File:** `docs/report/CH4-security.md` (mới), `docs/report/CONTRIBUTIONS.md` (mới)
- **Các bước:**
  1. Dùng số liệu thật từ git và AI-LOG.
- **Xong khi:** QA duyệt.
- **Quy trình git:** nhánh `study/pm-p5` → PR → **QA Ngọc** review → merge.

## 7. Bằng chứng cần có trước khi sang phase sau
- [ ] Tối thiểu 4 mục AI-LOG thật (AI-P5-PM-01 … AI-P5-PM-06), mỗi mục có phần kiểm tra và tự giải thích.
- [ ] Mọi task PRJ của phase đã merge: test nghiệm thu pass, ảnh/diff đối chiếu trong PR; link PR ghi vào [LP-PM-Liem](LP-PM-Liem.md).
- [ ] Trả lời được các câu ở bước 6 không cần xem code.
- [ ] Cập nhật bảng tiến độ trong [LP-PM-Liem](LP-PM-Liem.md).
