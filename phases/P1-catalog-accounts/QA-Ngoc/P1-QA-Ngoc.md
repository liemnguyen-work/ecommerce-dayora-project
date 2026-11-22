---
tags: [phase/P1, role/QA, guide]
member: Ngọc
role: QA
phase: P1
dates: "04/11 – 10/11/2026"
---
# P1 · QA Ngọc — QA/Tester

> [!NOTE] Phase: [P1-OVERVIEW](../P1-OVERVIEW.md) (04/11 – 10/11/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/ngoc.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Khách xem trang chủ (hero motionsites), danh mục, tìm kiếm + ≥5 bộ lọc + sắp xếp, chi tiết sản phẩm theo biến thể; đăng ký/đăng nhập; admin CRUD sản phẩm/danh mục cơ bản.

## 1. Việc của bạn trong phase này
- [ ] Viết + chạy ca kiểm thử FR01–FR04 (tìm kiếm rỗng, ký tự đặc biệt, lọc kết hợp, sắp xếp)
- [ ] Kiểm tra 1366/390 px các trang P1, ghi bug có ảnh
- [ ] Thử XSS cơ bản: nhập `<script>` vào ô tìm kiếm, tên đăng ký
- [ ] Retest bug sau khi sửa, cập nhật trạng thái

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 1b. Tài liệu và prompt cho phần này
- Lộ trình chi tiết phase này: [LP-QA-Ngoc-P1](../../../docs/learning/QA-Ngoc/LP-QA-Ngoc-P1.md) (đọc gì, tiêu chí, tình huống thật, 7 bước prompt, bài tập có commit) · Chung: [LEARNING-PATH](../../../docs/learning/LEARNING-PATH.md), [PITFALLS](../../../docs/learning/PITFALLS.md).

**Prompt riêng cho phần code này** (dùng sau prompt khởi động ở mục 4):
```text
Đây là auth.spec.ts của DAYORA:
<dán code>
Giải thích mỗi test kiểm cái gì bằng lời thường. Từ đó viết giúp tôi 6 ca kiểm thử tay (bước, dữ liệu, kết quả mong đợi) cho đăng ký/đăng nhập, gồm ca sai mật khẩu 6 lần. Tôi sẽ tự chạy và ghi kết quả thật.
```

## 2. File/thư mục bạn phụ trách
- `docs/TEST-CASES.md` (chưa có, bạn tạo)
- `apps/api/src/auth/auth.spec.ts, catalog/catalog.spec.ts, me/me.spec.ts` (đọc)

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Kiểm thử chức năng thủ công | Phần lớn test P1 là thủ công | [Tài liệu](https://www.guru99.com/test-case.html) | Chạy 10 ca, ghi actual |
| 2 | DevTools: Network, Console, responsive | Xem request lỗi, giả lập mobile | [Tài liệu](https://developer.chrome.com/docs/devtools/overview) | Chụp request /products |
| 3 | XSS là gì | Phải có minh chứng kiểm tra XSS | [Tài liệu](https://owasp.org/www-project-top-ten/) | Giải thích vì sao React tự chống XSS |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Ngọc, vai trò QA/Tester trong dự án DAYORA
(website bán đồ picnic trong ngày, đồ án môn Phát triển ứng dụng TMĐT - UEH).
Stack: React + TypeScript + Tailwind (frontend), NestJS + Prisma + PostgreSQL Supabase (backend), VNPay Sandbox.
Tôi chưa có nền tảng lập trình. Phase hiện tại: P1 - Catalog, tài khoản và giao diện nền.
Việc của tôi: <dán mục 1 ở trên>.
Quy tắc: giải thích đơn giản, có ví dụ đời thường; mỗi lần chỉ dạy một ý; hỏi lại để kiểm tra tôi hiểu;
không viết code thay tôi khi tôi chưa yêu cầu; nếu không chắc thì nói không chắc.
Bắt đầu bằng việc hỏi tôi đã biết gì về <chủ đề đầu tiên ở mục 3>.
```

### 2. Hiểu code trước khi commit hoặc review
```text
Đây là diff/đoạn code của task <mã task> trong dự án DAYORA:
<dán diff hoặc file>
1) Tóm tắt code làm gì trong 3 câu.
2) Giải thích từng khối, như cho người mới.
3) Chỉ ra 2 chỗ có thể sai hoặc thiếu kiểm tra.
4) Hỏi tôi 3 câu; chỉ khi tôi trả lời đúng mới coi như tôi đã hiểu.
```

### 3. Sinh ca kiểm thử bộ lọc
```text
Catalog DAYORA có lọc: từ khóa, khoảng giá, nhóm hàng, tình huống, sức chứa, chất liệu; sắp xếp giá tăng/giảm. Viết 15 ca kiểm thử kết hợp quan trọng nhất, có ca không ra kết quả và ca giá min > max.
```

### 4. Viết bug report
```text
Từ mô tả sau, viết bug report chuẩn: tiêu đề, môi trường, bước tái hiện, kết quả mong đợi, kết quả thực tế, mức độ, ảnh cần đính kèm.
<dán mô tả>
```

### 5. Luyện bảo vệ (cuối phase)
```text
Đóng vai giảng viên chấm đồ án. Dựa trên phần tôi phụ trách ở phase P1 (<dán mục 1 và file ở mục 2>),
hỏi tôi 5 câu, mỗi câu tôi trả lời trong 20 giây. Sau đó ra 1 yêu cầu sửa code đơn giản
và 1 yêu cầu nâng cao đúng kiểu GV (thêm field, thêm filter, đổi business rule, sửa lỗi Service...).
Chấm và chỉ ra chỗ tôi cần học thêm.
```

### 6. Ghi nhật ký AI sau buổi làm việc
```text
Dựa trên cuộc trò chuyện này, soạn một mục nhật ký theo mẫu docs/ai-logs/TEMPLATE.md của nhóm.
Chỉ dùng thông tin có trong cuộc trò chuyện. Không tự điền Phản biện, Quyết định của nhóm, Người kiểm tra: để trống ghi "<tự điền>".
<dán mẫu từ docs/ai-logs/TEMPLATE.md>
```
Sau đó **tự viết** các phần còn trống bằng lời của bạn và **nối thêm vào cuối** log cá nhân theo [quy tắc ghi log](../../../docs/ai-logs/ai-logging-rules.md). Không sửa mục cũ.

## 5. Minh chứng cần có trước khi kết thúc phase
- [ ] TEST-CASES.md cập nhật kết quả P1
- [ ] Bug có ảnh trên Issues
- [ ] Minh chứng thử XSS
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/ngoc.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Ca kiểm thử nào chứng minh bộ lọc giá đúng biên?
2. Làm sao biết lỗi nằm ở frontend hay backend?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
