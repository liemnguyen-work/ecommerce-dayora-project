---
tags: [learning, member/BD2, phase/P4]
---
# P4 · BD2 Châu

> P4 Kit Builder (25/11–01/12) · Tổng quan của bạn: [LP-BD2-Chau](LP-BD2-Chau.md) · Hướng dẫn phase: [P4-BD2-Chau](../../../phases/P4-kit-builder/BD2-Chau/P4-BD2-Chau.md) · Log của bạn: `docs/ai-logs/chau.md`

**Mục tiêu:** Hiểu RuleSet: dữ liệu quy tắc Kit, kiểm tra hợp lệ, phiên bản.

Thời lượng gợi ý: cả phase (1 tuần). **Thứ tự làm:**
1. Mục 2 + bước 1 (khái niệm) · đọc issue và tiêu chí xong của task ở mục 6.
2. **Mục 6: viết test hoặc ca kiểm thử trước, rồi tự xây task PRJ** (bước 5). Kẹt quá 1 buổi: hỏi reviewer hoặc PM.
3. Khi kiểm chứng đạt: bước 2 đọc lại code của chính bạn, giải thích được từng file ở mục 1.
4. Mục 3, 4, bước 3, 4, 6, 7: kiểm hiểu biết, tình huống, luyện bảo vệ, AI-LOG.

## 1. File bạn sẽ viết hoặc sửa
1. `docs/catalog/KIT-RULES-PROPOSAL.md`
2. `apps/api/prisma/seed.ts` (RuleSet v1)
3. `apps/api/src/admin-rulesets/validate-rules.ts`
4. `apps/api/src/admin-rulesets/admin-rulesets.service.spec.ts`

## 2. Kiến thức cần nắm
| # | Khái niệm | Vì sao cần | Thấy ở đâu trong code |
|---|---|---|---|
| 1 | Dữ liệu cấu trúc trong cột JSON | Quy tắc linh hoạt mà không cần bảng mới | RuleSet `rules` |
| 2 | Validate trả lỗi theo đường dẫn (`rules[0].perPerson`) | Admin biết sai chỗ nào | `validate-rules.ts` |
| 3 | DRAFT → PUBLISHED → ARCHIVED | Không sửa bản đang dùng | service |

## 3. Tiêu chí đạt (tự đánh dấu, có bằng chứng)
- [ ] Giải thích từng trường của một quy tắc.
- [ ] Viết 3 quy tắc sai, dự đoán lỗi, kiểm bằng test.
- [ ] Giải thích vì sao mỗi tình huống phải có ≥ 1 món thiết yếu.

Đạt khi: mọi ô được đánh dấu **và** mỗi ô có bằng chứng trong AI-LOG hoặc PR (lệnh đã chạy, ảnh, link commit).

## 4. Lỗi hay gặp trong phần này
Đọc tình huống, **tự đoán nguyên nhân trước** rồi mới đọc lời giải.

| Vấn đề | Cách tránh | Đọc thêm |
|---|---|---|
| Kit chọn SKU theo đơn giá | Bạn là owner engine; hiểu để bảo vệ. | [C3](../PITFALLS.md#c3) |

## 5. Lộ trình prompt (làm lần lượt, mỗi bước một phiên AI)
Mở đầu mỗi phiên bằng prompt "Khởi động phiên" trong [P4-BD2-Chau](../../../phases/P4-kit-builder/BD2-Chau/P4-BD2-Chau.md) mục 4.1. **Không dán `.env`, mật khẩu, khóa.** Mỗi bước xong ghi một mục AI-LOG theo mã gợi ý.

### Bước 1 — Hiểu khái niệm (AI-P4-BD2-01)
```text
Tôi là Châu (BD2) trong dự án DAYORA. Giải thích lần lượt các khái niệm sau bằng ví dụ đời thường, mỗi lần MỘT khái niệm, hỏi tôi 1 câu kiểm tra rồi mới sang khái niệm tiếp theo:
1. Dữ liệu cấu trúc trong cột JSON
2. Validate trả lỗi theo đường dẫn (`rules[0].perPerson`)
3. DRAFT → PUBLISHED → ARCHIVED
Không viết code. Nếu tôi trả lời sai, giải thích lại theo cách khác.
```
Tự kiểm: đóng AI, viết lại mỗi khái niệm 1 câu bằng lời của bạn.

### Bước 2 — Đọc lại code của bạn (AI-P4-BD2-02)
Dán **từng file** theo thứ tự mục 1 (file dài thì dán từng hàm).
```text
Đây là <tên file> của DAYORA:
<dán code>
1) Tóm tắt file làm gì trong 3 câu.
2) Đi qua từng hàm: đầu vào, đầu ra, bước quan trọng; chỉ số dòng.
3) Khái niệm nào trong danh sách sau xuất hiện ở đâu: Dữ liệu cấu trúc trong cột JSON; Validate trả lỗi theo đường dẫn (`rules[0].perPerson`); DRAFT → PUBLISHED → ARCHIVED.
4) Hỏi tôi 3 câu. Chỉ khi tôi trả lời đúng mới sang file tiếp.
```
Tự kiểm: mở file trong VS Code, tìm đúng dòng AI chỉ. **AI có thể chỉ sai dòng hoặc bịa hàm**: ghi lại nếu gặp.

### Bước 3 — Dự đoán rồi thử (AI-P4-BD2-03)
Viết dự đoán **trước** khi chạy, rồi mới chạy.
```text
Tôi gửi `PATCH /api/admin/rulesets/<draft>` với `perPerson: -1`. Tôi dự đoán mã và nội dung lỗi là <dự đoán>.
Đừng nói kết quả. Hãy hỏi tôi vì sao tôi dự đoán vậy, rồi hướng dẫn tôi cách chạy và cách đọc kết quả.
```
Ghi vào AI-LOG: dự đoán, kết quả thật, giải thích chỗ khác nhau.

### Bước 4 — Học từ tình huống thật (AI-P4-BD2-04)
Chọn 1 tình huống ở mục 4, dán phần **Dấu hiệu** (chưa dán lời giải).
```text
Đây là một lỗi hay gặp khi làm phần này của DAYORA:
<dán phần Dấu hiệu>
Đừng nói lời giải. Hỏi tôi từng câu gợi ý để tôi tự tìm ra nguyên nhân gốc. Sau đó tôi sẽ dán phần Nguyên nhân và Cách tránh trong tài liệu để bạn so với suy luận của tôi.
```
Ghi AI-LOG: suy luận của bạn khác lời giải thật ở đâu.

### Bước 5 — Tự xây phần của bạn (AI-P4-BD2-05, mỗi task PRJ một mục log)
Xem mục 6. AI chỉ **hướng dẫn và review**, bạn tự gõ code. Làm task PRJ trước, bài tập mở rộng sau.
```text
Tôi đang tự viết PRJ-P4-BD2-1 "Kit service + API /kits" của dự án DAYORA.
File tôi phải viết: apps/api/src/kit/kit.service.ts, kit.controller.ts, kit.module.ts.
1) Giúp tôi liệt kê các bước làm theo thứ tự.
Đừng viết code thay tôi. Chờ tôi làm xong mỗi bước. Khi tôi dán lỗi test hoặc git diff, chỉ ra chỗ sai và vì sao, gợi ý hướng sửa chứ không đưa code hoàn chỉnh.
```
Khi kiểm chứng đạt hoặc kẹt quá 1 buổi: ghi vào log cá nhân việc đã làm, chỗ kẹt và cách gỡ (xem [ROADMAP](../../ROADMAP.md)).

### Bước 6 — Luyện bảo vệ (AI-P4-BD2-06)
```text
Đóng vai giảng viên chấm đồ án. Phần tôi phụ trách ở P4: Hiểu RuleSet: dữ liệu quy tắc Kit, kiểm tra hợp lệ, phiên bản.
Hỏi tôi lần lượt (mỗi câu tôi trả lời trong 30 giây, không xem code):
1. Vì sao lưu quy tắc dạng JSON thay vì bảng riêng? Đánh đổi là gì?
Sau đó hỏi thêm 2 câu vặn dựa trên câu trả lời của tôi, ra 1 yêu cầu sửa code nhỏ. Chấm từng câu và nói tôi cần học lại gì.
```

### Bước 7 — Ghi nhật ký AI
Nối thêm một mục vào log cá nhân `docs/ai-logs/<tên>.md` theo [quy tắc ghi log](../../ai-logs/ai-logging-rules.md) (đủ 7 trường, có mã phiên và mã mục, chỉ nối thêm). Phần **Phản biện**, **Quyết định của nhóm**, **Người kiểm tra** phải tự viết.

## 6. Nhiệm vụ xây dựng (commit đứng tên bạn)
Quy trình chung: [ROADMAP](../../ROADMAP.md).

### PRJ-P4-BD2-1 — Kit service + API /kits
- **File phải viết:** `apps/api/src/kit/kit.service.ts, kit.controller.ts, kit.module.ts`
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** PRJ-P4-BD1-1
- **Kiểm chứng:** chạy trên database nhóm, đối chiếu số liệu (số bảng, số SKU, kết quả API mẫu) với `REQUIREMENTS.md` và `docs/DECISIONS.md`; dán kết quả vào PR.
- **Nhánh:** `prj/p4-bd2-1` · **Reviewer:** BD1 Hoàn

### PRJ-P4-BD2-2 — RuleSet: tạo nháp, sửa, kiểm hợp lệ, phát hành
- **File phải viết:** `apps/api/src/admin-rulesets/` (service, validate-rules, controller, module, dto)
- **Test nghiệm thu:** `apps/api/src/admin-rulesets/admin-rulesets.service.spec.ts`
- **Phải merge trước:** không
- **Kiểm chứng:** viết test ở dòng trên **trước** khi code (commit riêng, QA duyệt ca test). Sau khi QA duyệt, không sửa test cho dễ pass; cần đổi thì ghi lý do trong PR.
- **Nhánh:** `prj/p4-bd2-2` · **Reviewer:** BD1 Hoàn

### Bài tập mở rộng (sau khi xong task PRJ): Hai ca test validate-rules
- **File:** `apps/api/src/admin-rulesets/admin-rulesets.service.spec.ts`
- **Các bước:**
  1. Kiểm ca nào đã có.
  2. Thêm 2 ca chưa có (ví dụ trùng scenario/useType, thiếu tình huống BEACH).
  3. Chạy `npm test -w api -- admin-rulesets`.
- **Xong khi:** Test pass, BD1 duyệt.
- **Quy trình git:** nhánh `study/bd2-p4` → PR → **BD1 Hoàn** review → merge.

## 7. Bằng chứng cần có trước khi sang phase sau
- [ ] Tối thiểu 4 mục AI-LOG thật (AI-P4-BD2-01 … AI-P4-BD2-06), mỗi mục có phần kiểm tra và tự giải thích.
- [ ] Mọi task PRJ của phase đã merge: test nghiệm thu pass, ảnh/diff đối chiếu trong PR; link PR ghi vào [LP-BD2-Chau](LP-BD2-Chau.md).
- [ ] Trả lời được các câu ở bước 6 không cần xem code.
- [ ] Cập nhật bảng tiến độ trong [LP-BD2-Chau](LP-BD2-Chau.md).
