---
tags: [learning, member/BD1, phase/P4]
---
# P4 · BD1 Hoàn

> P4 Kit Builder (25/11–01/12) · Tổng quan của bạn: [LP-BD1-Hoan](LP-BD1-Hoan.md) · Hướng dẫn phase: [P4-BD1-Hoan](../../../phases/P4-kit-builder/BD1-Hoan/P4-BD1-Hoan.md) · Log của bạn: `docs/ai-logs/hoan.md`

**Mục tiêu:** Hiểu Kit engine: từ tình huống, số người, ngân sách ra danh sách món và số lượng.

Thời lượng gợi ý: cả phase (1 tuần). **Thứ tự làm:**
1. Mục 2 + bước 1 (khái niệm) · đọc issue và tiêu chí xong của task ở mục 6.
2. **Mục 6: viết test hoặc ca kiểm thử trước, rồi tự xây task PRJ** (bước 5). Kẹt quá 1 buổi: hỏi reviewer hoặc PM.
3. Khi kiểm chứng đạt: bước 2 đọc lại code của chính bạn, giải thích được từng file ở mục 1.
4. Mục 3, 4, bước 3, 4, 6, 7: kiểm hiểu biết, tình huống, luyện bảo vệ, AI-LOG.

## 1. File bạn sẽ viết hoặc sửa
1. `docs/catalog/KIT-RULES-PROPOSAL.md`
2. `apps/api/src/kit/kit-engine.ts`
3. `apps/api/src/kit/kit.service.ts`
4. `apps/api/src/kit/kit.controller.ts`
5. `apps/api/src/kit/kit-engine.spec.ts`

## 2. Kiến thức cần nắm
| # | Khái niệm | Vì sao cần | Thấy ở đâu trong code |
|---|---|---|---|
| 1 | Quy tắc R01–R05 và RuleSet có phiên bản | Kit engine đọc bản PUBLISHED | `kit.service.ts` |
| 2 | Đồ cá nhân (theo người) và đồ dùng chung (theo sức chứa) | Hai cách tính số lượng khác nhau | `buildKit` |
| 3 | `ceil` và tổng tiền dòng | Chọn SKU rẻ nhất **theo tổng** | `buildKit` |
| 4 | Hàm thuần + DTO giới hạn 1–8 người | Test dễ, đầu vào an toàn | `kit.dto.ts` |
| 5 | `ruleSetVersion` trên đơn (D09) | Sửa quy tắc không làm sai đơn cũ | `checkout.service.ts` |

## 3. Tiêu chí đạt (tự đánh dấu, có bằng chứng)
- [ ] Tính tay bộ PICNIC 4 người, ngân sách 800.000đ, khớp với API.
- [ ] Giải thích lỗi chọn SKU theo đơn giá bằng ví dụ thảm.
- [ ] Chỉ ra chỗ xử lý vượt ngân sách và thiếu tồn.
- [ ] Giải thích `build`, `adjust`, `options` khác nhau thế nào.
- [ ] Viết một ca test mới cho tình huống chưa có.

Đạt khi: mọi ô được đánh dấu **và** mỗi ô có bằng chứng trong AI-LOG hoặc PR (lệnh đã chạy, ảnh, link commit).

## 4. Lỗi hay gặp trong phần này
Đọc tình huống, **tự đoán nguyên nhân trước** rồi mới đọc lời giải.

| Vấn đề | Cách tránh | Đọc thêm |
|---|---|---|
| Chọn hàng rẻ mà tổng đắt | So tổng tiền dòng, hòa thì ít số lượng hơn. | [C3](../PITFALLS.md#c3) |

## 5. Lộ trình prompt (làm lần lượt, mỗi bước một phiên AI)
Mở đầu mỗi phiên bằng prompt "Khởi động phiên" trong [P4-BD1-Hoan](../../../phases/P4-kit-builder/BD1-Hoan/P4-BD1-Hoan.md) mục 4.1. **Không dán `.env`, mật khẩu, khóa.** Mỗi bước xong ghi một mục AI-LOG theo mã gợi ý.

### Bước 1 — Hiểu khái niệm (AI-P4-BD1-01)
```text
Tôi là Hoàn (BD1) trong dự án DAYORA. Giải thích lần lượt các khái niệm sau bằng ví dụ đời thường, mỗi lần MỘT khái niệm, hỏi tôi 1 câu kiểm tra rồi mới sang khái niệm tiếp theo:
1. Quy tắc R01–R05 và RuleSet có phiên bản
2. Đồ cá nhân (theo người) và đồ dùng chung (theo sức chứa)
3. `ceil` và tổng tiền dòng
4. Hàm thuần + DTO giới hạn 1–8 người
5. `ruleSetVersion` trên đơn (D09)
Không viết code. Nếu tôi trả lời sai, giải thích lại theo cách khác.
```
Tự kiểm: đóng AI, viết lại mỗi khái niệm 1 câu bằng lời của bạn.

### Bước 2 — Đọc lại code của bạn (AI-P4-BD1-02)
Dán **từng file** theo thứ tự mục 1 (file dài thì dán từng hàm).
```text
Đây là <tên file> của DAYORA:
<dán code>
1) Tóm tắt file làm gì trong 3 câu.
2) Đi qua từng hàm: đầu vào, đầu ra, bước quan trọng; chỉ số dòng.
3) Khái niệm nào trong danh sách sau xuất hiện ở đâu: Quy tắc R01–R05 và RuleSet có phiên bản; Đồ cá nhân (theo người) và đồ dùng chung (theo sức chứa); `ceil` và tổng tiền dòng; Hàm thuần + DTO giới hạn 1–8 người; `ruleSetVersion` trên đơn (D09).
4) Hỏi tôi 3 câu. Chỉ khi tôi trả lời đúng mới sang file tiếp.
```
Tự kiểm: mở file trong VS Code, tìm đúng dòng AI chỉ. **AI có thể chỉ sai dòng hoặc bịa hàm**: ghi lại nếu gặp.

### Bước 3 — Dự đoán rồi thử (AI-P4-BD1-03)
Viết dự đoán **trước** khi chạy, rồi mới chạy.
```text
Tôi gọi `POST /api/kits/build` với BEACH, 3 người, 300.000đ. Trước khi gọi tôi tính tay từng món: <bảng tính tay>.
Đừng nói kết quả. Hãy hỏi tôi vì sao tôi dự đoán vậy, rồi hướng dẫn tôi cách chạy và cách đọc kết quả.
```
Ghi vào AI-LOG: dự đoán, kết quả thật, giải thích chỗ khác nhau.

### Bước 4 — Học từ tình huống thật (AI-P4-BD1-04)
Chọn 1 tình huống ở mục 4, dán phần **Dấu hiệu** (chưa dán lời giải).
```text
Đây là một lỗi hay gặp khi làm phần này của DAYORA:
<dán phần Dấu hiệu>
Đừng nói lời giải. Hỏi tôi từng câu gợi ý để tôi tự tìm ra nguyên nhân gốc. Sau đó tôi sẽ dán phần Nguyên nhân và Cách tránh trong tài liệu để bạn so với suy luận của tôi.
```
Ghi AI-LOG: suy luận của bạn khác lời giải thật ở đâu.

### Bước 5 — Tự xây phần của bạn (AI-P4-BD1-05, mỗi task PRJ một mục log)
Xem mục 6. AI chỉ **hướng dẫn và review**, bạn tự gõ code. Làm task PRJ trước, bài tập mở rộng sau.
```text
Tôi đang tự viết PRJ-P4-BD1-1 "Kit engine R01–R05" của dự án DAYORA.
File tôi phải viết: apps/api/src/kit/kit-engine.ts; apps/api/src/kit/kit.dto.ts.
Test nghiệm thu phải pass (không được sửa test): <dán nội dung apps/api/src/kit/kit-engine.spec.ts>
1) Đọc test, giải thích test yêu cầu hàm/route nào, trả về gì.
2) Giúp tôi liệt kê các bước cài đặt theo thứ tự, mỗi bước chạy được test.
Đừng viết code thay tôi. Chờ tôi làm xong mỗi bước. Khi tôi dán lỗi test hoặc git diff, chỉ ra chỗ sai và vì sao, gợi ý hướng sửa chứ không đưa code hoàn chỉnh.
```
Khi kiểm chứng đạt hoặc kẹt quá 1 buổi: ghi vào log cá nhân việc đã làm, chỗ kẹt và cách gỡ (xem [ROADMAP](../../ROADMAP.md)).

### Bước 6 — Luyện bảo vệ (AI-P4-BD1-06)
```text
Đóng vai giảng viên chấm đồ án. Phần tôi phụ trách ở P4: Hiểu Kit engine: từ tình huống, số người, ngân sách ra danh sách món và số lượng.
Hỏi tôi lần lượt (mỗi câu tôi trả lời trong 30 giây, không xem code):
1. Thêm quy tắc "tối đa 2 món cùng nhóm" thì sửa ở đâu?
2. Vì sao engine là hàm thuần, không gọi database trực tiếp?
3. Hết hàng một món thiết yếu thì kết quả trả gì?
Sau đó hỏi thêm 2 câu vặn dựa trên câu trả lời của tôi, ra 1 yêu cầu sửa code nhỏ. Chấm từng câu và nói tôi cần học lại gì.
```

### Bước 7 — Ghi nhật ký AI
Nối thêm một mục vào log cá nhân `docs/ai-logs/<tên>.md` theo [quy tắc ghi log](../../ai-logs/ai-logging-rules.md) (đủ 7 trường, có mã phiên và mã mục, chỉ nối thêm). Phần **Phản biện**, **Quyết định của nhóm**, **Người kiểm tra** phải tự viết.

## 6. Nhiệm vụ xây dựng (commit đứng tên bạn)
Quy trình chung: [ROADMAP](../../ROADMAP.md).

### PRJ-P4-BD1-1 — Kit engine R01–R05
- **File phải viết:** `apps/api/src/kit/kit-engine.ts`; `apps/api/src/kit/kit.dto.ts`
- **Test nghiệm thu:** `apps/api/src/kit/kit-engine.spec.ts`
- **Phải merge trước:** không
- **Kiểm chứng:** viết test ở dòng trên **trước** khi code (commit riêng, QA duyệt ca test). Sau khi QA duyệt, không sửa test cho dễ pass; cần đổi thì ghi lý do trong PR.
- **Nhánh:** `prj/p4-bd1-1` · **Reviewer:** BD2 Châu

### Bài tập mở rộng (sau khi xong task PRJ): Thêm ca test Kit engine cho tình huống của bạn
- **File:** `apps/api/src/kit/kit-engine.spec.ts`
- **Các bước:**
  1. Chọn một tình huống chưa có trong 33+ ca (xem tên các `it(...)`).
  2. Tính tay kết quả mong đợi trước, ghi vào comment.
  3. Viết test, chạy `npm test -w api -- kit-engine`.
- **Xong khi:** Test pass, comment có bảng tính tay.
- **Quy trình git:** nhánh `study/bd1-p4` → PR → **BD2 Châu** review → merge.

## 7. Bằng chứng cần có trước khi sang phase sau
- [ ] Tối thiểu 4 mục AI-LOG thật (AI-P4-BD1-01 … AI-P4-BD1-06), mỗi mục có phần kiểm tra và tự giải thích.
- [ ] Mọi task PRJ của phase đã merge: test nghiệm thu pass, ảnh/diff đối chiếu trong PR; link PR ghi vào [LP-BD1-Hoan](LP-BD1-Hoan.md).
- [ ] Trả lời được các câu ở bước 6 không cần xem code.
- [ ] Cập nhật bảng tiến độ trong [LP-BD1-Hoan](LP-BD1-Hoan.md).
