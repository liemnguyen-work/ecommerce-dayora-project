---
tags: [learning, member/BD2, phase/P5]
---
# P5 · BD2 Châu

> P5 Quản trị quy tắc, dashboard, bảo mật (02/12–08/12) · Tổng quan của bạn: [LP-BD2-Chau](LP-BD2-Chau.md) · Hướng dẫn phase: [P5-BD2-Chau](../../../phases/P5-admin-security/BD2-Chau/P5-BD2-Chau.md) · Log của bạn: `docs/ai-logs/chau.md`

**Mục tiêu:** Hiểu phát hành RuleSet an toàn, dashboard đúng công thức, các lớp bảo mật chung.

Thời lượng gợi ý: cả phase (1 tuần). **Thứ tự làm:**
1. Mục 2 + bước 1 (khái niệm) · đọc issue và tiêu chí xong của task ở mục 6.
2. **Mục 6: viết test hoặc ca kiểm thử trước, rồi tự xây task PRJ** (bước 5). Kẹt quá 1 buổi: hỏi reviewer hoặc PM.
3. Khi kiểm chứng đạt: bước 2 đọc lại code của chính bạn, giải thích được từng file ở mục 1.
4. Mục 3, 4, bước 3, 4, 6, 7: kiểm hiểu biết, tình huống, luyện bảo vệ, AI-LOG.

## 1. File bạn sẽ viết hoặc sửa
1. `apps/api/src/admin-rulesets/admin-rulesets.service.ts`
2. `apps/api/src/admin-dashboard/admin-dashboard.service.ts`
3. `apps/api/src/admin-dashboard/admin-dashboard.service.spec.ts`
4. `apps/api/src/common/security.ts`
5. `apps/api/src/common/safe-exception.filter.ts`
6. `apps/api/src/main.ts`

## 2. Kiến thức cần nắm
| # | Khái niệm | Vì sao cần | Thấy ở đâu trong code |
|---|---|---|---|
| 1 | Publish trong transaction: bản cũ ARCHIVED, bản mới PUBLISHED | Luôn chỉ có 1 bản đang dùng | `publish` |
| 2 | Doanh thu D10: chỉ PAID chưa hủy | Không đếm đơn ảo | `dashboard` |
| 3 | Ngày theo GMT+7, đủ ngày kể cả ngày 0 đơn | Biểu đồ không bị hở | `revenueByDay` |
| 4 | Exception filter không lộ stack | Không lộ thông tin hệ thống | `safe-exception.filter.ts` |
| 5 | Header bảo mật, body ≤ 100kb, CORS theo `WEB_ORIGIN` | Phòng thủ chung | `security.ts`, `main.ts` |

## 3. Tiêu chí đạt (tự đánh dấu, có bằng chứng)
- [ ] Giải thích công thức 6 chỉ số dashboard và đối chiếu một con số với dữ liệu thật.
- [ ] Giải thích vì sao ngày phải tính theo GMT+7 (đơn lúc 23:30 thuộc ngày nào).
- [ ] Giải thích từng header bảo mật chống gì.
- [ ] Giải thích lỗi 500 trả gì cho khách, ghi gì ở server.
- [ ] Bật được `trust proxy` và giải thích (bài tập).

Đạt khi: mọi ô được đánh dấu **và** mỗi ô có bằng chứng trong AI-LOG hoặc PR (lệnh đã chạy, ảnh, link commit).

## 4. Lỗi hay gặp trong phần này
Đọc tình huống, **tự đoán nguyên nhân trước** rồi mới đọc lời giải.

| Vấn đề | Cách tránh | Đọc thêm |
|---|---|---|
| Rate limit sau proxy | Bật `trust proxy` (bài tập của bạn + DO). | [C6](../PITFALLS.md#c6) |
| Test mock không chứng minh khóa DB | Reviewer chạy thật trên Supabase. | [E3](../PITFALLS.md#e3) |

## 5. Lộ trình prompt (làm lần lượt, mỗi bước một phiên AI)
Mở đầu mỗi phiên bằng prompt "Khởi động phiên" trong [P5-BD2-Chau](../../../phases/P5-admin-security/BD2-Chau/P5-BD2-Chau.md) mục 4.1. **Không dán `.env`, mật khẩu, khóa.** Mỗi bước xong ghi một mục AI-LOG theo mã gợi ý.

### Bước 1 — Hiểu khái niệm (AI-P5-BD2-01)
```text
Tôi là Châu (BD2) trong dự án DAYORA. Giải thích lần lượt các khái niệm sau bằng ví dụ đời thường, mỗi lần MỘT khái niệm, hỏi tôi 1 câu kiểm tra rồi mới sang khái niệm tiếp theo:
1. Publish trong transaction: bản cũ ARCHIVED, bản mới PUBLISHED
2. Doanh thu D10: chỉ PAID chưa hủy
3. Ngày theo GMT+7, đủ ngày kể cả ngày 0 đơn
4. Exception filter không lộ stack
5. Header bảo mật, body ≤ 100kb, CORS theo `WEB_ORIGIN`
Không viết code. Nếu tôi trả lời sai, giải thích lại theo cách khác.
```
Tự kiểm: đóng AI, viết lại mỗi khái niệm 1 câu bằng lời của bạn.

### Bước 2 — Đọc lại code của bạn (AI-P5-BD2-02)
Dán **từng file** theo thứ tự mục 1 (file dài thì dán từng hàm).
```text
Đây là <tên file> của DAYORA:
<dán code>
1) Tóm tắt file làm gì trong 3 câu.
2) Đi qua từng hàm: đầu vào, đầu ra, bước quan trọng; chỉ số dòng.
3) Khái niệm nào trong danh sách sau xuất hiện ở đâu: Publish trong transaction: bản cũ ARCHIVED, bản mới PUBLISHED; Doanh thu D10: chỉ PAID chưa hủy; Ngày theo GMT+7, đủ ngày kể cả ngày 0 đơn; Exception filter không lộ stack; Header bảo mật, body ≤ 100kb, CORS theo `WEB_ORIGIN`.
4) Hỏi tôi 3 câu. Chỉ khi tôi trả lời đúng mới sang file tiếp.
```
Tự kiểm: mở file trong VS Code, tìm đúng dòng AI chỉ. **AI có thể chỉ sai dòng hoặc bịa hàm**: ghi lại nếu gặp.

### Bước 3 — Dự đoán rồi thử (AI-P5-BD2-03)
Viết dự đoán **trước** khi chạy, rồi mới chạy.
```text
Tôi tạo 1 đơn, thanh toán Sandbox, rồi mở dashboard. Tôi dự đoán doanh thu tăng <số> và đơn bị hủy không làm đổi doanh thu.
Đừng nói kết quả. Hãy hỏi tôi vì sao tôi dự đoán vậy, rồi hướng dẫn tôi cách chạy và cách đọc kết quả.
```
Ghi vào AI-LOG: dự đoán, kết quả thật, giải thích chỗ khác nhau.

### Bước 4 — Học từ tình huống thật (AI-P5-BD2-04)
Chọn 1 tình huống ở mục 4, dán phần **Dấu hiệu** (chưa dán lời giải).
```text
Đây là một lỗi hay gặp khi làm phần này của DAYORA:
<dán phần Dấu hiệu>
Đừng nói lời giải. Hỏi tôi từng câu gợi ý để tôi tự tìm ra nguyên nhân gốc. Sau đó tôi sẽ dán phần Nguyên nhân và Cách tránh trong tài liệu để bạn so với suy luận của tôi.
```
Ghi AI-LOG: suy luận của bạn khác lời giải thật ở đâu.

### Bước 5 — Tự xây phần của bạn (AI-P5-BD2-05, mỗi task PRJ một mục log)
Xem mục 6. AI chỉ **hướng dẫn và review**, bạn tự gõ code. Làm task PRJ trước, bài tập mở rộng sau.
```text
Tôi đang tự viết PRJ-P5-BD2-1 "Dashboard thống kê D10" của dự án DAYORA.
File tôi phải viết: apps/api/src/admin-dashboard/.
Test nghiệm thu phải pass (không được sửa test): <dán nội dung apps/api/src/admin-dashboard/admin-dashboard.service.spec.ts, apps/api/src/admin-rulesets/admin-rulesets.http.spec.ts>
1) Đọc test, giải thích test yêu cầu hàm/route nào, trả về gì.
2) Giúp tôi liệt kê các bước cài đặt theo thứ tự, mỗi bước chạy được test.
Đừng viết code thay tôi. Chờ tôi làm xong mỗi bước. Khi tôi dán lỗi test hoặc git diff, chỉ ra chỗ sai và vì sao, gợi ý hướng sửa chứ không đưa code hoàn chỉnh.
```
Khi kiểm chứng đạt hoặc kẹt quá 1 buổi: ghi vào log cá nhân việc đã làm, chỗ kẹt và cách gỡ (xem [ROADMAP](../../ROADMAP.md)).

### Bước 6 — Luyện bảo vệ (AI-P5-BD2-06)
```text
Đóng vai giảng viên chấm đồ án. Phần tôi phụ trách ở P5: Hiểu phát hành RuleSet an toàn, dashboard đúng công thức, các lớp bảo mật chung.
Hỏi tôi lần lượt (mỗi câu tôi trả lời trong 30 giây, không xem code):
1. `trust proxy` bật sai (tin mọi proxy) thì kẻ xấu làm gì được?
2. Vì sao không cài thư viện helmet?
Sau đó hỏi thêm 2 câu vặn dựa trên câu trả lời của tôi, ra 1 yêu cầu sửa code nhỏ. Chấm từng câu và nói tôi cần học lại gì.
```

### Bước 7 — Ghi nhật ký AI
Nối thêm một mục vào log cá nhân `docs/ai-logs/<tên>.md` theo [quy tắc ghi log](../../ai-logs/ai-logging-rules.md) (đủ 7 trường, có mã phiên và mã mục, chỉ nối thêm). Phần **Phản biện**, **Quyết định của nhóm**, **Người kiểm tra** phải tự viết.

## 6. Nhiệm vụ xây dựng (commit đứng tên bạn)
Quy trình chung: [ROADMAP](../../ROADMAP.md).

### PRJ-P5-BD2-1 — Dashboard thống kê D10
- **File phải viết:** `apps/api/src/admin-dashboard/`
- **Test nghiệm thu:** `apps/api/src/admin-dashboard/admin-dashboard.service.spec.ts`; `apps/api/src/admin-rulesets/admin-rulesets.http.spec.ts`
- **Phải merge trước:** PRJ-P4-BD2-2
- **Kiểm chứng:** viết test ở dòng trên **trước** khi code (commit riêng, QA duyệt ca test). Sau khi QA duyệt, không sửa test cho dễ pass; cần đổi thì ghi lý do trong PR.
- **Nhánh:** `prj/p5-bd2-1` · **Reviewer:** BD1 Hoàn

### PRJ-P5-BD2-2 — Bảo mật chung: header, rate limit, lọc lỗi 500, ValidationPipe
- **File phải viết:** `apps/api/src/common/`; `apps/api/src/main.ts`
- **Test nghiệm thu:** `apps/api/src/common/security.spec.ts`
- **Phải merge trước:** không
- **Kiểm chứng:** viết test ở dòng trên **trước** khi code (commit riêng, QA duyệt ca test). Sau khi QA duyệt, không sửa test cho dễ pass; cần đổi thì ghi lý do trong PR.
- **Nhánh:** `prj/p5-bd2-2` · **Reviewer:** BD1 Hoàn

### Bài tập mở rộng (sau khi xong task PRJ): Bật `trust proxy` cho deploy
- **File:** `apps/api/src/main.ts`
- **Các bước:**
  1. Thêm `app.set('trust proxy', 1)` (NestExpressApplication) trước khi listen.
  2. Giải thích trong comment vì sao là `1` (một lớp proxy Render).
  3. Chạy `npm test -w api`, build.
- **Xong khi:** Test pass, DO xác nhận khi deploy rate limit đọc đúng IP.
- **Quy trình git:** nhánh `study/bd2-p5` → PR → **BD1 Hoàn** review → merge.

## 7. Bằng chứng cần có trước khi sang phase sau
- [ ] Tối thiểu 4 mục AI-LOG thật (AI-P5-BD2-01 … AI-P5-BD2-06), mỗi mục có phần kiểm tra và tự giải thích.
- [ ] Mọi task PRJ của phase đã merge: test nghiệm thu pass, ảnh/diff đối chiếu trong PR; link PR ghi vào [LP-BD2-Chau](LP-BD2-Chau.md).
- [ ] Trả lời được các câu ở bước 6 không cần xem code.
- [ ] Cập nhật bảng tiến độ trong [LP-BD2-Chau](LP-BD2-Chau.md).
