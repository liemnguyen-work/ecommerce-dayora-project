---
tags: [learning, member/BD2, phase/P3]
---
# P3 · BD2 Châu

> P3 Thanh toán VNPay, đơn hàng, đánh giá (18/11–24/11) · Tổng quan của bạn: [LP-BD2-Chau](LP-BD2-Chau.md) · Hướng dẫn phase: [P3-BD2-Chau](../../../phases/P3-payment-orders/BD2-Chau/P3-BD2-Chau.md) · Log của bạn: `docs/ai-logs/chau.md`

**Mục tiêu:** Hiểu vòng đời đơn hàng: sơ đồ trạng thái D08, hủy, hết hạn giữ tồn.

Thời lượng gợi ý: cả phase (1 tuần). **Thứ tự làm:**
1. Mục 2 + bước 1 (khái niệm) · đọc issue và tiêu chí xong của task ở mục 6.
2. **Mục 6: viết test hoặc ca kiểm thử trước, rồi tự xây task PRJ** (bước 5). Kẹt quá 1 buổi: hỏi reviewer hoặc PM.
3. Khi kiểm chứng đạt: bước 2 đọc lại code của chính bạn, giải thích được từng file ở mục 1.
4. Mục 3, 4, bước 3, 4, 6, 7: kiểm hiểu biết, tình huống, luyện bảo vệ, AI-LOG.

## 1. File bạn sẽ viết hoặc sửa
1. `docs/DECISIONS.md` (D06, D07, D08)
2. `apps/api/src/admin-orders/admin-orders.service.ts`
3. `apps/api/src/admin-orders/admin-orders.dto.ts`
4. `apps/api/src/admin-orders/admin-orders.service.spec.ts`
5. `apps/api/src/orders/checkout.service.ts` (release, expireStaleOrders, onModuleInit)

## 2. Kiến thức cần nắm
| # | Khái niệm | Vì sao cần | Thấy ở đâu trong code |
|---|---|---|---|
| 1 | State machine 3 trục: status, paymentStatus, shippingStatus | Không cho nhảy bước | `admin-orders.service.ts` `update` |
| 2 | 422 kèm danh sách bước hợp lệ (`allowed`) | Web hiện đúng nút | `update` |
| 3 | Log trạng thái `OrderStatusLog` | Truy vết ai đổi gì | `update` |
| 4 | Job định kỳ `setInterval` 60 giây, tắt bằng `DISABLE_ORDER_EXPIRY` | Đơn quá 15 phút tự hủy | `onModuleInit`, `expireStaleOrders` |
| 5 | UPDATE có điều kiện khi hủy | Không hủy nhầm đơn vừa thanh toán | `release` |

## 3. Tiêu chí đạt (tự đánh dấu, có bằng chứng)
- [ ] Vẽ sơ đồ trạng thái từ code, khớp với D08.
- [ ] Giải thích 2 nhánh hủy: chưa trả tiền (trả `reserved`) và đã trả (cộng `stock` + log hoàn tiền).
- [ ] Giải thích vì sao `release` dùng `updateMany` có điều kiện.
- [ ] Thử thật một lượt admin: PREPARING → SHIPPING → DELIVERED, và một lần nhảy sai → 422.

Đạt khi: mọi ô được đánh dấu **và** mỗi ô có bằng chứng trong AI-LOG hoặc PR (lệnh đã chạy, ảnh, link commit).

## 4. Lỗi hay gặp trong phần này
Đọc tình huống, **tự đoán nguyên nhân trước** rồi mới đọc lời giải.

| Vấn đề | Cách tránh | Đọc thêm |
|---|---|---|
| Hết hạn và IPN đến cùng lúc | Cùng khóa đơn, cập nhật có điều kiện. | [C4](../PITFALLS.md#c4) |
| Không có trạng thái EXPIRED riêng | CANCELLED + EXPIRED. | [B3](../PITFALLS.md#b3) |

## 5. Lộ trình prompt (làm lần lượt, mỗi bước một phiên AI)
Mở đầu mỗi phiên bằng prompt "Khởi động phiên" trong [P3-BD2-Chau](../../../phases/P3-payment-orders/BD2-Chau/P3-BD2-Chau.md) mục 4.1. **Không dán `.env`, mật khẩu, khóa.** Mỗi bước xong ghi một mục AI-LOG theo mã gợi ý.

### Bước 1 — Hiểu khái niệm (AI-P3-BD2-01)
```text
Tôi là Châu (BD2) trong dự án DAYORA. Giải thích lần lượt các khái niệm sau bằng ví dụ đời thường, mỗi lần MỘT khái niệm, hỏi tôi 1 câu kiểm tra rồi mới sang khái niệm tiếp theo:
1. State machine 3 trục: status, paymentStatus, shippingStatus
2. 422 kèm danh sách bước hợp lệ (`allowed`)
3. Log trạng thái `OrderStatusLog`
4. Job định kỳ `setInterval` 60 giây, tắt bằng `DISABLE_ORDER_EXPIRY`
5. UPDATE có điều kiện khi hủy
Không viết code. Nếu tôi trả lời sai, giải thích lại theo cách khác.
```
Tự kiểm: đóng AI, viết lại mỗi khái niệm 1 câu bằng lời của bạn.

### Bước 2 — Đọc lại code của bạn (AI-P3-BD2-02)
Dán **từng file** theo thứ tự mục 1 (file dài thì dán từng hàm).
```text
Đây là <tên file> của DAYORA:
<dán code>
1) Tóm tắt file làm gì trong 3 câu.
2) Đi qua từng hàm: đầu vào, đầu ra, bước quan trọng; chỉ số dòng.
3) Khái niệm nào trong danh sách sau xuất hiện ở đâu: State machine 3 trục: status, paymentStatus, shippingStatus; 422 kèm danh sách bước hợp lệ (`allowed`); Log trạng thái `OrderStatusLog`; Job định kỳ `setInterval` 60 giây, tắt bằng `DISABLE_ORDER_EXPIRY`; UPDATE có điều kiện khi hủy.
4) Hỏi tôi 3 câu. Chỉ khi tôi trả lời đúng mới sang file tiếp.
```
Tự kiểm: mở file trong VS Code, tìm đúng dòng AI chỉ. **AI có thể chỉ sai dòng hoặc bịa hàm**: ghi lại nếu gặp.

### Bước 3 — Dự đoán rồi thử (AI-P3-BD2-03)
Viết dự đoán **trước** khi chạy, rồi mới chạy.
```text
Tôi tạo đơn rồi không thanh toán, ghi giờ. Tôi dự đoán sau <số> phút đơn thành <trạng thái> và tồn khả dụng trở lại <số>.
Đừng nói kết quả. Hãy hỏi tôi vì sao tôi dự đoán vậy, rồi hướng dẫn tôi cách chạy và cách đọc kết quả.
```
Ghi vào AI-LOG: dự đoán, kết quả thật, giải thích chỗ khác nhau.

### Bước 4 — Học từ tình huống thật (AI-P3-BD2-04)
Chọn 1 tình huống ở mục 4, dán phần **Dấu hiệu** (chưa dán lời giải).
```text
Đây là một lỗi hay gặp khi làm phần này của DAYORA:
<dán phần Dấu hiệu>
Đừng nói lời giải. Hỏi tôi từng câu gợi ý để tôi tự tìm ra nguyên nhân gốc. Sau đó tôi sẽ dán phần Nguyên nhân và Cách tránh trong tài liệu để bạn so với suy luận của tôi.
```
Ghi AI-LOG: suy luận của bạn khác lời giải thật ở đâu.

### Bước 5 — Tự xây phần của bạn (AI-P3-BD2-05, mỗi task PRJ một mục log)
Xem mục 6. AI chỉ **hướng dẫn và review**, bạn tự gõ code. Làm task PRJ trước, bài tập mở rộng sau.
```text
Tôi đang tự viết PRJ-P3-BD2-1 "Admin đơn hàng theo sơ đồ D08" của dự án DAYORA.
File tôi phải viết: apps/api/src/admin-orders/.
Test nghiệm thu phải pass (không được sửa test): <dán nội dung apps/api/src/admin-orders/admin-orders.service.spec.ts>
1) Đọc test, giải thích test yêu cầu hàm/route nào, trả về gì.
2) Giúp tôi liệt kê các bước cài đặt theo thứ tự, mỗi bước chạy được test.
Đừng viết code thay tôi. Chờ tôi làm xong mỗi bước. Khi tôi dán lỗi test hoặc git diff, chỉ ra chỗ sai và vì sao, gợi ý hướng sửa chứ không đưa code hoàn chỉnh.
```
Khi kiểm chứng đạt hoặc kẹt quá 1 buổi: ghi vào log cá nhân việc đã làm, chỗ kẹt và cách gỡ (xem [ROADMAP](../../ROADMAP.md)).

### Bước 6 — Luyện bảo vệ (AI-P3-BD2-06)
```text
Đóng vai giảng viên chấm đồ án. Phần tôi phụ trách ở P3: Hiểu vòng đời đơn hàng: sơ đồ trạng thái D08, hủy, hết hạn giữ tồn.
Hỏi tôi lần lượt (mỗi câu tôi trả lời trong 30 giây, không xem code):
1. Admin có được sửa `paymentStatus` bằng tay không, vì sao?
2. Server khởi động lại thì job hết hạn có mất đơn nào không?
Sau đó hỏi thêm 2 câu vặn dựa trên câu trả lời của tôi, ra 1 yêu cầu sửa code nhỏ. Chấm từng câu và nói tôi cần học lại gì.
```

### Bước 7 — Ghi nhật ký AI
Nối thêm một mục vào log cá nhân `docs/ai-logs/<tên>.md` theo [quy tắc ghi log](../../ai-logs/ai-logging-rules.md) (đủ 7 trường, có mã phiên và mã mục, chỉ nối thêm). Phần **Phản biện**, **Quyết định của nhóm**, **Người kiểm tra** phải tự viết.

## 6. Nhiệm vụ xây dựng (commit đứng tên bạn)
Quy trình chung: [ROADMAP](../../ROADMAP.md).

### PRJ-P3-BD2-1 — Admin đơn hàng theo sơ đồ D08
- **File phải viết:** `apps/api/src/admin-orders/`
- **Test nghiệm thu:** `apps/api/src/admin-orders/admin-orders.service.spec.ts`
- **Phải merge trước:** PRJ-P2-BD1-2
- **Kiểm chứng:** viết test ở dòng trên **trước** khi code (commit riêng, QA duyệt ca test). Sau khi QA duyệt, không sửa test cho dễ pass; cần đổi thì ghi lý do trong PR.
- **Nhánh:** `prj/p3-bd2-1` · **Reviewer:** BD1 Hoàn

### Bài tập mở rộng (sau khi xong task PRJ): Script dọn dữ liệu thử có chế độ xem trước
- **File:** `apps/api/prisma/cleanup-test-data.ts` (mới), `apps/api/package.json` (thêm script)
- **Các bước:**
  1. Chỉ nhắm tài khoản `adminthu`, `khachthu1`, `khachthu2` @example.com, đơn của họ và RuleSet DRAFT "Thử nghiệm review".
  2. Mặc định chỉ **in ra** sẽ xóa gì; chỉ xóa khi có cờ `--yes`.
  3. Xóa theo thứ tự phụ thuộc trong transaction; trả lại `reserved` nếu đơn còn giữ tồn.
  4. **Chỉ chạy `--yes` khi cả nhóm đồng ý**, vì không hoàn tác được.
- **Xong khi:** Chạy xem trước liệt kê đúng; BD1 review code trước khi chạy thật.
- **Quy trình git:** nhánh `study/bd2-p3` → PR → **BD1 Hoàn** review → merge.

## 7. Bằng chứng cần có trước khi sang phase sau
- [ ] Tối thiểu 4 mục AI-LOG thật (AI-P3-BD2-01 … AI-P3-BD2-06), mỗi mục có phần kiểm tra và tự giải thích.
- [ ] Mọi task PRJ của phase đã merge: test nghiệm thu pass, ảnh/diff đối chiếu trong PR; link PR ghi vào [LP-BD2-Chau](LP-BD2-Chau.md).
- [ ] Trả lời được các câu ở bước 6 không cần xem code.
- [ ] Cập nhật bảng tiến độ trong [LP-BD2-Chau](LP-BD2-Chau.md).
