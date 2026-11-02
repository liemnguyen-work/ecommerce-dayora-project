---
tags: [learning, member/FD1, phase/P6]
---
# P6 · FD1 Thành

> P6 Kiểm thử tổng, Innovation AI gợi ý Kit (09/12–15/12) · Tổng quan của bạn: [LP-FD1-Thanh](LP-FD1-Thanh.md) · Hướng dẫn phase: [P6-FD1-Thanh](../../../phases/P6-testing-innovation/FD1-Thanh/P6-FD1-Thanh.md) · Log của bạn: `docs/ai-logs/thanh.md`

**Mục tiêu:** Hiểu cách đưa một tính năng AI vào giao diện mà không làm hỏng luồng cũ: ô nhập, trạng thái chờ, lỗi, đường lùi về form.

Innovation đề xuất (thay FR18 khi nhóm chốt, ghi vào [DECISIONS](../../DECISIONS.md)): khách gõ một câu mô tả chuyến đi, AI (Gemini) chỉ trích tình huống, số người, ngân sách, đồ đã có; Kit engine R01–R05 vẫn dựng bộ, giá và tồn vẫn do server quyết.

Thứ tự làm: mục 2 + bước 1 → viết test/ca kiểm thử → **mục 6 tự xây** → mục 3, 4, bước 3–7.

## 1. File bạn sẽ viết hoặc sửa
1. `apps/web/src/pages/KitBuilderPage.tsx`
2. `apps/web/src/components/home/KitPreview.tsx` (Lộ trình chọn đồ dạng giới thiệu, dữ liệu mẫu)
3. `apps/web/src/pages/CatalogPage.tsx` (dải AI "Chưa biết chọn gì?" gửi câu sang `/kit-builder?description=`)
4. `apps/web/src/catalog.css`, `apps/web/src/index.css` (`.kit-route`, `.route-*`)

## 2. Kiến thức cần nắm
| # | Khái niệm | Vì sao cần | Thấy ở đâu trong code |
|---|---|---|---|
| 1 | Trạng thái chờ / lỗi / thành công của một lời gọi API | Người dùng phải biết AI đang làm gì | `askAi` trong `KitBuilderPage.tsx` |
| 2 | Đường lùi (graceful degradation) | AI lỗi thì form vẫn dùng được | `KitBuilderPage.tsx` |
| 3 | Đưa kết quả AI vào state có sẵn | Không tạo luồng thứ hai song song với form | `setScenario`, `setPeople`, `setBudget`, `setOwned` |
| 4 | Chuỗi hẹn giờ có hủy trong `useEffect` | Đổi câu mẫu giữa chừng thì lượt cũ dừng, không chồng hiệu ứng | effect chiếu lộ trình trong `KitPreview.tsx` (cleanup xóa timer) |
| 5 | Hiển thị trung thực | Trang chủ ghi rõ "ví dụ minh họa", dữ liệu chụp từ engine, không giả lập "suy nghĩ" của AI; không gọi API khi khách chỉ xem | comment đầu `KitPreview.tsx` |
| 8 | Truyền dữ liệu giữa trang qua URL | Câu khách gõ ở Sản phẩm sang Tạo bộ mà không cần state chung; `useRef` chặn chạy AI hai lần (StrictMode) | `?description=` trong `CatalogPage.tsx` và `KitBuilderPage.tsx` |
| 10 | Hội thoại trên trạng thái có sẵn | Câu sau gửi kèm bộ hiện tại; nhớ lựa chọn của khách (`picks`) để dựng lại bộ mà không mất món đã đổi | `runAi`, `applyAll`, `picks` trong `KitBuilderPage.tsx` |
| 9 | Ngân sách so với tổng gồm phí giao | Giải thích được vì sao "tạm tính 782k" vẫn vượt 800k | `kit-engine.ts` dòng `total`/`overBy` |
| 6 | `prefers-reduced-motion` | Người nhạy chuyển động thấy kết quả ngay | `useReducedMotion`, CSS cuối `index.css` |
| 7 | Nhắc quyền riêng tư | Free tier của Gemini có thể dùng prompt | dòng `<small>` dưới ô nhập |

## 3. Tiêu chí đạt (tự đánh dấu, có bằng chứng)
- [ ] Giải thích vì sao bấm "Điền giúp tôi" không tự đưa bộ vào giỏ.
- [ ] Dùng API chưa có key: chụp ảnh thông báo lỗi và form vẫn chạy.
- [ ] Kiểm ô AI ở 1366 px và 390 px, không tràn ngang.
- [ ] Đọc được luồng: câu → `/kits/ai-parse` → state → `/kits/build`.
- [ ] Giải thích vì sao trang chủ dùng dữ liệu mẫu, không gọi API, và cách đổi câu mẫu hủy lượt cũ.
- [ ] Đi được luồng Sản phẩm → `/kit-builder?description=` → AI chạy đúng một lần.

Đạt khi: mọi ô được đánh dấu **và** mỗi ô có bằng chứng trong AI-LOG hoặc PR.

## 4. Lỗi hay gặp trong phần này
| Vấn đề | Cách đã giải quyết |
|---|---|
| Khách gõ thông tin cá nhân | Dòng nhắc ngay dưới ô; chỉ gửi câu mô tả, không gửi tài khoản. |
| AI trả đồ đã có | Hiện thành chip có nút ×, khách bỏ được từng món. |

## 5. Lộ trình prompt (mỗi bước một phiên AI)
**Không dán `.env`, khóa `GEMINI_API_KEY`, mật khẩu.** Mỗi bước xong ghi một mục AI-LOG.

### Bước 1 — Hiểu khái niệm (AI-P6-FD1-01)
```text
Tôi là Thành (FD1) trong dự án DAYORA. Giải thích lần lượt, mỗi lần MỘT khái niệm, bằng ví dụ đời thường, hỏi tôi 1 câu kiểm tra rồi mới sang khái niệm tiếp: Trạng thái chờ / lỗi / thành công của một lời gọi API; Đường lùi (graceful degradation); Đưa kết quả AI vào state có sẵn; Nhắc quyền riêng tư.
Không viết code. Tôi trả lời sai thì giải thích lại theo cách khác.
```

### Bước 2 — Đọc lại code của bạn (AI-P6-FD1-02)
Dán từng file theo thứ tự mục 1.
```text
Đây là <tên file> của DAYORA:
<dán code>
1) Tóm tắt file làm gì trong 3 câu. 2) Đi qua từng hàm, chỉ số dòng. 3) Khái niệm nào ở mục 2 xuất hiện ở đâu. 4) Hỏi tôi 3 câu.
```
Tự kiểm: mở file, tìm đúng dòng AI chỉ; AI có thể chỉ sai dòng.

### Bước 3 — Dự đoán rồi thử (AI-P6-FD1-03)
```text
Tôi gõ "2 người hẹn hò, 300k" rồi bấm "Điền giúp tôi". Tôi dự đoán ô chuyến đi, số người, ngân sách sẽ thành <...> và bộ gợi ý <...>.
Đừng nói kết quả. Hỏi vì sao tôi dự đoán vậy, rồi hướng dẫn tôi cách chạy và đọc kết quả.
```

### Bước 4 — Học từ tình huống thật (AI-P6-FD1-04)
Chọn 1 dòng ở mục 4, dán phần "Vấn đề", nhờ AI hỏi gợi ý để bạn tự tìm cách giải, rồi so với cột "Cách đã giải quyết".

### Bước 5 — Tự xây phần của bạn (AI-P6-FD1-05)
```text
Tôi đang tự viết PRJ-P6-FD1-1 "Ô AI + "Lộ trình chọn đồ" mẫu + dải AI Sản phẩm" của dự án DAYORA. File tôi phải viết: `apps/web/src/pages/KitBuilderPage.tsx`, `apps/web/src/components/home/KitPreview.tsx`, `apps/web/src/pages/CatalogPage.tsx`, `apps/web/src/catalog.css`.
Liệt kê các bước theo thứ tự. Đừng viết code thay tôi; khi tôi dán lỗi test hoặc git diff, chỉ ra chỗ sai và gợi ý hướng sửa.
```
Kiểm chứng đạt hoặc kẹt quá 1 buổi: ghi việc đã làm và chỗ kẹt vào log cá nhân ([ROADMAP](../../ROADMAP.md)).

### Bước 6 — Luyện bảo vệ (AI-P6-FD1-06)
```text
Đóng vai giảng viên. Hỏi tôi lần lượt, mỗi câu 30 giây, không xem code:
1. Nếu AI trả sai chuyến đi, khách sửa thế nào?
2. Vì sao giá trong bộ không lấy từ AI?
Sau đó hỏi thêm 2 câu vặn và ra 1 yêu cầu sửa code nhỏ trong phần AI. Chấm từng câu.
```

### Bước 7 — Ghi AI-LOG
Dùng prompt "Điền AI-LOG" trong [quy tắc ghi log](../../ai-logs/ai-logging-rules.md); phần kiểm tra và tự giải thích phải tự viết.

## 6. Nhiệm vụ xây dựng (commit đứng tên bạn)
### PRJ-P6-FD1-1 — Ô AI + "Lộ trình chọn đồ" mẫu + dải AI Sản phẩm
- **File phải viết:** `apps/web/src/pages/KitBuilderPage.tsx` (ô AI), `apps/web/src/components/home/KitPreview.tsx` (Lộ trình chọn đồ), `apps/web/src/pages/CatalogPage.tsx` (dải AI), CSS tương ứng
- **Test nghiệm thu:** không có test tự động (ảnh 1366/390 trong PR, PD duyệt)
- **Phải merge trước:** PRJ-P6-BD1-1, PRJ-P4-FD1-1
- **Nhánh:** `prj/p6-fd1-1` · **Reviewer:** PD Đạt

### PRJ-P6-FD1-2 — Kit Builder: "Chọn món", lỗi tại món, nút nâng ngân sách
- **Đề bài:** Món tùy chọn đang tắt: nút "Chọn món" mở danh sách SKU (`GET /kits/options`), bấm thì gửi `{ selected: true, skuId }` (engine tự tính số lượng). Lỗi đổi/thêm hiện ngay dưới món đó. Lỗi 422 có `overBy` → nút "Nâng ngân sách thêm X" (X làm tròn lên 10.000 ₫), bấm thì tăng ngân sách và giữ món vừa chọn.
- **File phải viết:** `apps/web/src/pages/KitBuilderPage.tsx`, `apps/web/src/lib/api.ts` (lỗi giữ `body`), `catalog.css`
- **Test nghiệm thu:** không có; đi ca UI-K01–UI-K03 trong [TEST-CASES](../../testing/TEST-CASES.md), ảnh 1366/390
- **Phải merge trước:** PRJ-P6-BD1-3, PRJ-P6-FD1-1 · **Nhánh:** `prj/p6-fd1-2` · **Reviewer:** PD Đạt

### Bài tập mở rộng: Câu mẫu bấm là điền
- **Các bước:**
  1. Thêm 3 nút câu mẫu dưới ô nhập.
  2. Bấm nút thì điền câu vào ô, chưa gọi AI.
  3. Kiểm bàn phím: Tab tới được, Enter chọn được.
- **Xong khi:** Ảnh 1366/390, PD duyệt.
- **Quy trình git:** nhánh `study/fd1-p6` → PR → PD Đạt review → merge.

## 7. Bằng chứng cần có trước khi sang P7
- [ ] Tối thiểu 4 mục AI-LOG thật (AI-P6-FD1-01 … 06).
- [ ] PRJ-P6-FD1-1 đã merge, link PR ghi vào [LP-FD1-Thanh](LP-FD1-Thanh.md).
- [ ] Trả lời được câu ở bước 6 không cần xem code.
