---
tags: [learning, member/PM, phase/P1]
---
# P1 · PM Liêm

> P1 Catalog, tài khoản, giao diện nền (04/11–10/11) · Tổng quan của bạn: [LP-PM-Liem](LP-PM-Liem.md) · Hướng dẫn phase: [P1-PM-Liem](../../../phases/P1-catalog-accounts/PM-Liem/P1-PM-Liem.md) · Log của bạn: `docs/ai-logs/liem.md`

**Mục tiêu:** Nắm phạm vi và quyết định; truy được mỗi yêu cầu tới trang/API/minh chứng.

Thời lượng gợi ý: cả phase (1 tuần). **Thứ tự làm:**
1. Mục 2 + bước 1 (khái niệm) · đọc issue và tiêu chí xong của task ở mục 6.
2. **Mục 6: viết test hoặc ca kiểm thử trước, rồi tự xây task PRJ** (bước 5). Kẹt quá 1 buổi: hỏi reviewer hoặc PM.
3. Khi kiểm chứng đạt: bước 2 đọc lại code của chính bạn, giải thích được từng file ở mục 1.
4. Mục 3, 4, bước 3, 4, 6, 7: kiểm hiểu biết, tình huống, luyện bảo vệ, AI-LOG.

## 1. File bạn sẽ viết hoặc sửa
1. `docs/REQUIREMENTS.md`
2. `docs/DECISIONS.md`
3. `plan/task_plan.md`
4. `plan/progress.md`
5. `docs/learning/PITFALLS.md` (A1, A8, B1, B2, E5)

## 2. Kiến thức cần nắm
| # | Khái niệm | Vì sao cần | Thấy ở đâu trong code |
|---|---|---|---|
| 1 | Truy vết yêu cầu (traceability) | GV hỏi "FR03 ở đâu" | REQUIREMENTS |
| 2 | Ghi quyết định có mã và lý do (ADR nhẹ) | D01–D10, K01–K07 | DECISIONS |
| 3 | Cắt phạm vi có chủ đích | ghi rõ phần không làm và lý do | A8 |
| 4 | Chia việc theo ranh giới file | Song song an toàn | E5 |

## 3. Tiêu chí đạt (tự đánh dấu, có bằng chứng)
- [ ] Bảng FR01–FR04 → trang/API → minh chứng (bài tập).
- [ ] Kể lại 3 quyết định khó của nhóm và lý do.
- [ ] Giải thích quy trình task → result → review → commit.

Đạt khi: mọi ô được đánh dấu **và** mỗi ô có bằng chứng trong AI-LOG hoặc PR (lệnh đã chạy, ảnh, link commit).

## 4. Lỗi hay gặp trong phần này
Đọc tình huống, **tự đoán nguyên nhân trước** rồi mới đọc lời giải.

| Vấn đề | Cách tránh | Đọc thêm |
|---|---|---|
| Thiết kế sai mục đích | Hỏi mục tiêu trước khi khen đẹp | [A1](../PITFALLS.md#a1) |
| Mâu thuẫn dữ liệu | Xem tình huống | [B1](../PITFALLS.md#b1) |
| Chốt nghiệp vụ trước | Xem tình huống | [B2](../PITFALLS.md#b2) |
| Cắt phạm vi | Xem tình huống | [A8](../PITFALLS.md#a8) |

## 5. Lộ trình prompt (làm lần lượt, mỗi bước một phiên AI)
Mở đầu mỗi phiên bằng prompt "Khởi động phiên" trong [P1-PM-Liem](../../../phases/P1-catalog-accounts/PM-Liem/P1-PM-Liem.md) mục 4.1. **Không dán `.env`, mật khẩu, khóa.** Mỗi bước xong ghi một mục AI-LOG theo mã gợi ý.

### Bước 1 — Hiểu khái niệm (AI-P1-PM-01)
```text
Tôi là Liêm (PM) trong dự án DAYORA. Giải thích lần lượt các khái niệm sau bằng ví dụ đời thường, mỗi lần MỘT khái niệm, hỏi tôi 1 câu kiểm tra rồi mới sang khái niệm tiếp theo:
1. Truy vết yêu cầu (traceability)
2. Ghi quyết định có mã và lý do (ADR nhẹ)
3. Cắt phạm vi có chủ đích
4. Chia việc theo ranh giới file
Không viết code. Nếu tôi trả lời sai, giải thích lại theo cách khác.
```
Tự kiểm: đóng AI, viết lại mỗi khái niệm 1 câu bằng lời của bạn.

### Bước 2 — Đọc lại code của bạn (AI-P1-PM-02)
Dán **từng file** theo thứ tự mục 1 (file dài thì dán từng hàm).
```text
Đây là <tên file> của DAYORA:
<dán code>
1) Tóm tắt file làm gì trong 3 câu.
2) Đi qua từng hàm: đầu vào, đầu ra, bước quan trọng; chỉ số dòng.
3) Khái niệm nào trong danh sách sau xuất hiện ở đâu: Truy vết yêu cầu (traceability); Ghi quyết định có mã và lý do (ADR nhẹ); Cắt phạm vi có chủ đích; Chia việc theo ranh giới file.
4) Hỏi tôi 3 câu. Chỉ khi tôi trả lời đúng mới sang file tiếp.
```
Tự kiểm: mở file trong VS Code, tìm đúng dòng AI chỉ. **AI có thể chỉ sai dòng hoặc bịa hàm**: ghi lại nếu gặp.

### Bước 3 — Dự đoán rồi thử (AI-P1-PM-03)
Viết dự đoán **trước** khi chạy, rồi mới chạy.
```text
Tôi chọn ngẫu nhiên 1 yêu cầu FR và tự tìm minh chứng trong 5 phút. Tôi dự đoán <tìm được/không>.
Đừng nói kết quả. Hãy hỏi tôi vì sao tôi dự đoán vậy, rồi hướng dẫn tôi cách chạy và cách đọc kết quả.
```
Ghi vào AI-LOG: dự đoán, kết quả thật, giải thích chỗ khác nhau.

### Bước 4 — Học từ tình huống thật (AI-P1-PM-04)
Chọn 1 tình huống ở mục 4, dán phần **Dấu hiệu** (chưa dán lời giải).
```text
Đây là một lỗi hay gặp khi làm phần này của DAYORA:
<dán phần Dấu hiệu>
Đừng nói lời giải. Hỏi tôi từng câu gợi ý để tôi tự tìm ra nguyên nhân gốc. Sau đó tôi sẽ dán phần Nguyên nhân và Cách tránh trong tài liệu để bạn so với suy luận của tôi.
```
Ghi AI-LOG: suy luận của bạn khác lời giải thật ở đâu.

### Bước 5 — Tự xây phần của bạn (AI-P1-PM-05, mỗi task PRJ một mục log)
Xem mục 6. AI chỉ **hướng dẫn và review**, bạn tự gõ code. Làm task PRJ trước, bài tập mở rộng sau.
```text
Tôi đang tự viết PRJ-P1-PM-1 "Bảng truy vết yêu cầu + CHANGELOG" của dự án DAYORA.
File tôi phải viết: docs/report/FR-TRACE.md; docs/CHANGELOG.md.
1) Giúp tôi liệt kê các bước làm theo thứ tự.
Đừng viết code thay tôi. Chờ tôi làm xong mỗi bước. Khi tôi dán lỗi test hoặc git diff, chỉ ra chỗ sai và vì sao, gợi ý hướng sửa chứ không đưa code hoàn chỉnh.
```
Khi kiểm chứng đạt hoặc kẹt quá 1 buổi: ghi vào log cá nhân việc đã làm, chỗ kẹt và cách gỡ (xem [ROADMAP](../../ROADMAP.md)).

### Bước 6 — Luyện bảo vệ (AI-P1-PM-06)
```text
Đóng vai giảng viên chấm đồ án. Phần tôi phụ trách ở P1: Nắm phạm vi và quyết định; truy được mỗi yêu cầu tới trang/API/minh chứng.
Hỏi tôi lần lượt (mỗi câu tôi trả lời trong 30 giây, không xem code):
1. Vì sao chỉ làm Desktop? Có ảnh hưởng điểm không?
2. Ai quyết định nghiệp vụ, ai quyết định kỹ thuật?
Sau đó hỏi thêm 2 câu vặn dựa trên câu trả lời của tôi, ra 1 yêu cầu sửa code nhỏ. Chấm từng câu và nói tôi cần học lại gì.
```

### Bước 7 — Ghi nhật ký AI
Nối thêm một mục vào log cá nhân `docs/ai-logs/<tên>.md` theo [quy tắc ghi log](../../ai-logs/ai-logging-rules.md) (đủ 7 trường, có mã phiên và mã mục, chỉ nối thêm). Phần **Phản biện**, **Quyết định của nhóm**, **Người kiểm tra** phải tự viết.

## 6. Nhiệm vụ xây dựng (commit đứng tên bạn)
Quy trình chung: [ROADMAP](../../ROADMAP.md).

### PRJ-P1-PM-1 — Bảng truy vết yêu cầu + CHANGELOG
- **File phải viết:** `docs/report/FR-TRACE.md`; `docs/CHANGELOG.md`
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** không
- **Kiểm chứng:** reviewer đối chiếu với `REQUIREMENTS.md`, `docs/DECISIONS.md` và kết quả chạy thật.
- **Nhánh:** `prj/p1-pm-1` · **Reviewer:** QA Ngọc
- **Các bước:**
  - [ ] 1. `docs/report/FR-TRACE.md`: bảng FR01–FR05, FR14 → task PRJ → file code → test/ca kiểm → trạng thái — Xong khi: mọi FR P1 có ít nhất một task
  - [ ] 2. `docs/CHANGELOG.md`: ghi mọi thay đổi phạm vi trong P1 (ngày, thay đổi, lý do, tác động, người duyệt) theo mẫu trong file — Xong khi: QA đọc hiểu không cần hỏi
  - [ ] 3. Chạy `npm run roadmap:report -- --repo <owner>/<repo-nhom>`, đối chiếu task P1 chưa xong với bảng truy vết — Xong khi: task trễ có người và hạn mới

### Bài tập mở rộng (sau khi xong task PRJ): Bảng truy vết yêu cầu + CHANGELOG
- **File:** `docs/report/FR-TRACE.md` (mới), `docs/CHANGELOG.md`
- **Các bước:**
  1. Bảng FR/NFR → trang → API → test → review → ảnh.
  2. Ghi các quyết định giao diện và ánh xạ schema (B3) vào CHANGELOG.
- **Xong khi:** QA đối chiếu và xác nhận.
- **Quy trình git:** nhánh `study/pm-p1` → PR → **QA Ngọc** review → merge.

## 7. Bằng chứng cần có trước khi sang phase sau
- [ ] Tối thiểu 4 mục AI-LOG thật (AI-P1-PM-01 … AI-P1-PM-06), mỗi mục có phần kiểm tra và tự giải thích.
- [ ] Mọi task PRJ của phase đã merge: test nghiệm thu pass, ảnh/diff đối chiếu trong PR; link PR ghi vào [LP-PM-Liem](LP-PM-Liem.md).
- [ ] Trả lời được các câu ở bước 6 không cần xem code.
- [ ] Cập nhật bảng tiến độ trong [LP-PM-Liem](LP-PM-Liem.md).
