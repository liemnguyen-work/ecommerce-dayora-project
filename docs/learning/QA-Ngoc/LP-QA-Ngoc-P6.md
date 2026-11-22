---
tags: [learning, member/QA, phase/P6]
---
# P6 · QA Ngọc

> P6 Kiểm thử tổng, Innovation AI gợi ý Kit (09/12–15/12) · Tổng quan của bạn: [LP-QA-Ngoc](LP-QA-Ngoc.md) · Hướng dẫn phase: [P6-QA-Ngoc](../../../phases/P6-testing-innovation/QA-Ngoc/P6-QA-Ngoc.md) · Log của bạn: `docs/ai-logs/ngoc.md`

**Mục tiêu:** Biết kiểm thử một tính năng có AI: phần xác định (server kiểm) test tự động, phần không xác định (câu trả lời AI) thử tay có ghi chép.

Innovation đề xuất (thay FR18 khi nhóm chốt, ghi vào [DECISIONS](../../DECISIONS.md)): khách gõ một câu mô tả chuyến đi, AI (Gemini) chỉ trích tình huống, số người, ngân sách, đồ đã có; Kit engine R01–R05 vẫn dựng bộ, giá và tồn vẫn do server quyết.

Thứ tự làm: mục 2 + bước 1 → viết test/ca kiểm thử → **mục 6 tự xây** → mục 3, 4, bước 3–7.

## 1. File bạn sẽ viết hoặc sửa
1. `apps/api/src/kit/kit-ai.spec.ts`
2. `docs/testing/TEST-CASES.md`
3. `docs/testing/USABILITY.md`

## 2. Kiến thức cần nắm
| # | Khái niệm | Vì sao cần | Thấy ở đâu trong code |
|---|---|---|---|
| 1 | Phần xác định và không xác định của tính năng AI | Không assert được câu AI trả, nhưng assert được bước kiểm của server | `kit-ai.spec.ts` |
| 2 | Mock mạng | CI không có key, không gọi Gemini thật | `kit-ai.spec.ts` |
| 3 | Ca kiểm thử prompt injection | Chứng minh AI không vượt được bước kiểm | `TEST-CASES.md` mục AI |
| 4 | Ghi chép thử tay | Bằng chứng cho báo cáo Ch.4 | `TEST-CASES.md` mục AI |

## 3. Tiêu chí đạt (tự đánh dấu, có bằng chứng)
- [ ] Đọc và giải thích mọi ca trong `kit-ai.spec.ts`.
- [ ] Thử tay 10 câu mô tả (rõ, mơ hồ, sai miền, tấn công) trên bản deploy, ghi expected/actual.
- [ ] Chạy nhiệm vụ N2b (AI) trong buổi usability.
- [ ] Ghi 1 lỗi tìm được (nếu có) thành issue có bước tái hiện.

Đạt khi: mọi ô được đánh dấu **và** mỗi ô có bằng chứng trong AI-LOG hoặc PR.

## 4. Lỗi hay gặp trong phần này
| Vấn đề | Cách đã giải quyết |
|---|---|
| Free tier hết lượt giữa buổi usability | Báo trước người tham gia; 503 là đúng thiết kế, dùng form. |
| Câu "1tr2" hiểu sai | Ghi ca, báo BD1 chỉnh prompt. |

## 5. Lộ trình prompt (mỗi bước một phiên AI)
**Không dán `.env`, khóa `GEMINI_API_KEY`, mật khẩu.** Mỗi bước xong ghi một mục AI-LOG.

### Bước 1 — Hiểu khái niệm (AI-P6-QA-01)
```text
Tôi là Ngọc (QA) trong dự án DAYORA. Giải thích lần lượt, mỗi lần MỘT khái niệm, bằng ví dụ đời thường, hỏi tôi 1 câu kiểm tra rồi mới sang khái niệm tiếp: Phần xác định và không xác định của tính năng AI; Mock mạng; Ca kiểm thử prompt injection; Ghi chép thử tay.
Không viết code. Tôi trả lời sai thì giải thích lại theo cách khác.
```

### Bước 2 — Đọc lại code của bạn (AI-P6-QA-02)
Dán từng file theo thứ tự mục 1.
```text
Đây là <tên file> của DAYORA:
<dán code>
1) Tóm tắt file làm gì trong 3 câu. 2) Đi qua từng hàm, chỉ số dòng. 3) Khái niệm nào ở mục 2 xuất hiện ở đâu. 4) Hỏi tôi 3 câu.
```
Tự kiểm: mở file, tìm đúng dòng AI chỉ; AI có thể chỉ sai dòng.

### Bước 3 — Dự đoán rồi thử (AI-P6-QA-03)
```text
Tôi gửi câu 2 ký tự tới `/api/kits/ai-parse`. Tôi dự đoán <mã HTTP>, và AI <có/không> bị gọi.
Đừng nói kết quả. Hỏi vì sao tôi dự đoán vậy, rồi hướng dẫn tôi cách chạy và đọc kết quả.
```

### Bước 4 — Học từ tình huống thật (AI-P6-QA-04)
Chọn 1 dòng ở mục 4, dán phần "Vấn đề", nhờ AI hỏi gợi ý để bạn tự tìm cách giải, rồi so với cột "Cách đã giải quyết".

### Bước 5 — Tự xây phần của bạn (AI-P6-QA-05)
```text
Tôi đang tự viết PRJ-P6-QA-1 "Ca kiểm thử Innovation AI (tự động + thử tay)" của dự án DAYORA. File tôi phải viết: `docs/testing/TEST-CASES.md` (mục AI).
Liệt kê các bước theo thứ tự. Đừng viết code thay tôi; khi tôi dán lỗi test hoặc git diff, chỉ ra chỗ sai và gợi ý hướng sửa.
```
Kiểm chứng đạt hoặc kẹt quá 1 buổi: ghi việc đã làm và chỗ kẹt vào log cá nhân ([ROADMAP](../../ROADMAP.md)).

### Bước 6 — Luyện bảo vệ (AI-P6-QA-06)
```text
Đóng vai giảng viên. Hỏi tôi lần lượt, mỗi câu 30 giây, không xem code:
1. Làm sao chứng minh tính năng AI không làm sai giá đơn hàng?
2. Test AI có chạy được trong CI không, vì sao?
Sau đó hỏi thêm 2 câu vặn và ra 1 yêu cầu sửa code nhỏ trong phần AI. Chấm từng câu.
```

### Bước 7 — Ghi AI-LOG
Dùng prompt "Điền AI-LOG" trong [quy tắc ghi log](../../ai-logs/ai-logging-rules.md); phần kiểm tra và tự giải thích phải tự viết.

## 6. Nhiệm vụ xây dựng (commit đứng tên bạn)
### PRJ-P6-QA-1 — Ca kiểm thử Innovation AI (tự động + thử tay)
- **File phải viết:** `docs/testing/TEST-CASES.md` (mục AI)
- **Test nghiệm thu:** `kit-ai.spec.ts` phải xanh
- **Phải merge trước:** PRJ-P6-BD1-1
- **Nhánh:** `prj/p6-qa-1` · **Reviewer:** PM Liêm

### Bài tập mở rộng: Bảng 10 câu thử tay
- **Các bước:**
  1. Chọn 10 câu theo 4 nhóm: rõ ràng, mơ hồ, sai miền (12 người), tấn công.
  2. Chạy trên bản deploy, chụp ảnh có giờ.
  3. Ghi expected/actual vào `TEST-CASES.md`.
- **Xong khi:** PM duyệt bảng.
- **Quy trình git:** nhánh `study/qa-p6` → PR → PM Liêm review → merge.

## 7. Bằng chứng cần có trước khi sang P7
- [ ] Tối thiểu 4 mục AI-LOG thật (AI-P6-QA-01 … 06).
- [ ] PRJ-P6-QA-1 đã merge, link PR ghi vào [LP-QA-Ngoc](LP-QA-Ngoc.md).
- [ ] Trả lời được câu ở bước 6 không cần xem code.
