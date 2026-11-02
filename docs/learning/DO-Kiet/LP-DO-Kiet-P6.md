---
tags: [learning, member/DO, phase/P6]
---
# P6 · DO Kiệt

> P6 Kiểm thử tổng, Innovation AI gợi ý Kit (09/12–15/12) · Tổng quan của bạn: [LP-DO-Kiet](LP-DO-Kiet.md) · Hướng dẫn phase: [P6-DO-Kiet](../../../phases/P6-testing-innovation/DO-Kiet/P6-DO-Kiet.md) · Log của bạn: `docs/ai-logs/kiet.md`

**Mục tiêu:** Quản lý khóa API của dịch vụ AI: lưu ở đâu, ai thấy, đổi model không cần sửa code, theo dõi hết lượt.

Innovation đề xuất (thay FR18 khi nhóm chốt, ghi vào [DECISIONS](../../DECISIONS.md)): khách gõ một câu mô tả chuyến đi, AI (Gemini) chỉ trích tình huống, số người, ngân sách, đồ đã có; Kit engine R01–R05 vẫn dựng bộ, giá và tồn vẫn do server quyết.

Thứ tự làm: mục 2 + bước 1 → viết test/ca kiểm thử → **mục 6 tự xây** → mục 3, 4, bước 3–7.

## 1. File bạn sẽ viết hoặc sửa
1. `render.yaml`
2. `apps/api/.env.example`
4. `docs/RELEASE-CHECKLIST.md`

## 2. Kiến thức cần nắm
| # | Khái niệm | Vì sao cần | Thấy ở đâu trong code |
|---|---|---|---|
| 1 | Biến môi trường `sync: false` trên Render | Khóa không nằm trong git | `render.yaml` |
| 2 | Núm chỉnh `GEMINI_MODEL` | Google đổi tên model thì chỉ đổi biến | `render.yaml`, `.env.example` |
| 3 | Giới hạn free tier và quyền dữ liệu | Biết khi nào 503 là do hết lượt | tài liệu nhà cung cấp AI |
| 4 | Xoay vòng khóa (rotate) | Lộ khóa thì thu hồi ở AI Studio, tạo khóa mới | Google AI Studio |

## 3. Tiêu chí đạt (tự đánh dấu, có bằng chứng)
- [ ] Điền `GEMINI_API_KEY` trên Render, không dán khóa vào chat/AI/commit.
- [ ] Gọi thử ô AI trên bản deploy và chụp kết quả.
- [ ] Đổi `GEMINI_MODEL` sang model khác rồi đổi lại, ghi thời gian Render áp dụng.
- [ ] Viết 3 dòng "nếu lộ khóa thì làm gì".

Đạt khi: mọi ô được đánh dấu **và** mỗi ô có bằng chứng trong AI-LOG hoặc PR.

## 4. Lỗi hay gặp trong phần này
| Vấn đề | Cách đã giải quyết |
|---|---|
| Lỡ dán khóa vào chat AI | Thu hồi khóa ngay ở AI Studio, tạo khóa mới, cập nhật Render. |
| 503 liên tục | Kiểm biến trên Render và hạn mức trong AI Studio. |

## 5. Lộ trình prompt (mỗi bước một phiên AI)
**Không dán `.env`, khóa `GEMINI_API_KEY`, mật khẩu.** Mỗi bước xong ghi một mục AI-LOG.

### Bước 1 — Hiểu khái niệm (AI-P6-DO-01)
```text
Tôi là Kiệt (DO) trong dự án DAYORA. Giải thích lần lượt, mỗi lần MỘT khái niệm, bằng ví dụ đời thường, hỏi tôi 1 câu kiểm tra rồi mới sang khái niệm tiếp: Biến môi trường `sync: false` trên Render; Núm chỉnh `GEMINI_MODEL`; Giới hạn free tier và quyền dữ liệu; Xoay vòng khóa (rotate).
Không viết code. Tôi trả lời sai thì giải thích lại theo cách khác.
```

### Bước 2 — Đọc lại code của bạn (AI-P6-DO-02)
Dán từng file theo thứ tự mục 1.
```text
Đây là <tên file> của DAYORA:
<dán code>
1) Tóm tắt file làm gì trong 3 câu. 2) Đi qua từng hàm, chỉ số dòng. 3) Khái niệm nào ở mục 2 xuất hiện ở đâu. 4) Hỏi tôi 3 câu.
```
Tự kiểm: mở file, tìm đúng dòng AI chỉ; AI có thể chỉ sai dòng.

### Bước 3 — Dự đoán rồi thử (AI-P6-DO-03)
```text
Tôi xóa `GEMINI_API_KEY` trên Render rồi gọi ô AI. Tôi dự đoán <mã HTTP>, và trang Tạo bộ <vẫn/không> dùng được.
Đừng nói kết quả. Hỏi vì sao tôi dự đoán vậy, rồi hướng dẫn tôi cách chạy và đọc kết quả.
```

### Bước 4 — Học từ tình huống thật (AI-P6-DO-04)
Chọn 1 dòng ở mục 4, dán phần "Vấn đề", nhờ AI hỏi gợi ý để bạn tự tìm cách giải, rồi so với cột "Cách đã giải quyết".

### Bước 5 — Tự xây phần của bạn (AI-P6-DO-05)
```text
Tôi đang tự viết PRJ-P6-DO-1 "Cấu hình khóa AI trên Render + biên bản" của dự án DAYORA. File tôi phải viết: `render.yaml` (GEMINI_*), `docs/report/deploy/AI-KEY.md`.
Liệt kê các bước theo thứ tự. Đừng viết code thay tôi; khi tôi dán lỗi test hoặc git diff, chỉ ra chỗ sai và gợi ý hướng sửa.
```
Kiểm chứng đạt hoặc kẹt quá 1 buổi: ghi việc đã làm và chỗ kẹt vào log cá nhân ([ROADMAP](../../ROADMAP.md)).

### Bước 6 — Luyện bảo vệ (AI-P6-DO-06)
```text
Đóng vai giảng viên. Hỏi tôi lần lượt, mỗi câu 30 giây, không xem code:
1. Vì sao không để khóa Gemini ở frontend (Vercel) cho nhanh?
2. Free tier có rủi ro gì về dữ liệu người dùng?
Sau đó hỏi thêm 2 câu vặn và ra 1 yêu cầu sửa code nhỏ trong phần AI. Chấm từng câu.
```

### Bước 7 — Ghi AI-LOG
Dùng prompt "Điền AI-LOG" trong [quy tắc ghi log](../../ai-logs/ai-logging-rules.md); phần kiểm tra và tự giải thích phải tự viết.

## 6. Nhiệm vụ xây dựng (commit đứng tên bạn)
### PRJ-P6-DO-1 — Cấu hình khóa AI trên Render + biên bản
- **File phải viết:** `render.yaml` (GEMINI_*), `docs/report/deploy/AI-KEY.md`
- **Test nghiệm thu:** không có test tự động (reviewer đối chiếu cấu hình với tài liệu nhà cung cấp)
- **Phải merge trước:** PRJ-P6-BD1-1
- **Nhánh:** `prj/p6-do-1` · **Reviewer:** QA Ngọc

### Bài tập mở rộng: Theo dõi lượt dùng AI
- **Các bước:**
  1. Mở trang hạn mức trong AI Studio.
  2. Ghi số lượt sau buổi usability.
  3. Đề xuất có cần nâng gói hay không.
- **Xong khi:** PM đọc và ghi vào Ch.5 hạn chế.
- **Quy trình git:** nhánh `study/do-p6` → PR → QA Ngọc review → merge.

## 7. Bằng chứng cần có trước khi sang P7
- [ ] Tối thiểu 4 mục AI-LOG thật (AI-P6-DO-01 … 06).
- [ ] PRJ-P6-DO-1 đã merge, link PR ghi vào [LP-DO-Kiet](LP-DO-Kiet.md).
- [ ] Trả lời được câu ở bước 6 không cần xem code.
