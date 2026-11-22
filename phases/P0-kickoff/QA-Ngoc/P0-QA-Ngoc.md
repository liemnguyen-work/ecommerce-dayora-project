---
tags: [phase/P0, role/QA, guide]
member: Ngọc
role: QA
phase: P0
dates: "28/10 – 03/11/2026"
---
# P0 · QA Ngọc — QA/Tester

> [!NOTE] Phase: [P0-OVERVIEW](../P0-OVERVIEW.md) (28/10 – 03/11/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/ngoc.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Repo chạy được trên máy mọi người, CSDL Supabase có schema + 30 SKU, chốt các quyết định bảng 2.6, có design system và hero mẫu, deploy bản "hello" lên Vercel/Render.

## 1. Việc của bạn trong phase này
- [ ] Viết test plan: phạm vi, loại test, môi trường, tiêu chí đạt (file `docs/TEST-PLAN.md`)
- [ ] Lập ma trận truy vết yêu cầu → ca kiểm thử (FR01–FR18, AC01–AC10)
- [ ] Tạo mẫu báo lỗi (bug report) trên GitHub Issues
- [ ] Chạy thử web/api local, ghi lại mọi bước setup chưa rõ gửi DO

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 2. File/thư mục bạn phụ trách
- `docs/TEST-PLAN.md`
- `docs/TEST-CASES.md`
- `.github/ISSUE_TEMPLATE/bug.md`

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Test case: bước, dữ liệu, kết quả mong đợi/thực tế | Bạn viết ≥24 ca Kit + ca checkout, voucher... | [Tài liệu](https://www.guru99.com/test-case.html) | Viết 1 ca đăng nhập sai mật khẩu |
| 2 | Kiểm thử biên và phân vùng tương đương | Số người 0, 1, 8, 9; ngân sách âm | [Tài liệu](https://www.guru99.com/equivalence-partitioning-boundary-value-analysis.html) | Liệt kê giá trị biên cho số người 1–8 |
| 3 | Ma trận truy vết yêu cầu | Chứng minh mỗi yêu cầu đều có test | [Tài liệu](https://www.guru99.com/traceability-matrix.html) | Map FR13 → các ca voucher |
| 4 | Báo lỗi tốt (bước tái hiện, ảnh, mức độ) | Dev sửa nhanh hơn | [Tài liệu](https://docs.github.com/en/issues/tracking-your-work-with-issues/configuring-issues/creating-an-issue) | Viết 1 bug mẫu |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Ngọc, vai trò QA/Tester trong dự án DAYORA
(website bán đồ picnic trong ngày, đồ án môn Phát triển ứng dụng TMĐT - UEH).
Stack: React + TypeScript + Tailwind (frontend), NestJS + Prisma + PostgreSQL Supabase (backend), VNPay Sandbox.
Tôi chưa có nền tảng lập trình. Phase hiện tại: P0 - Khởi động và nền móng.
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

### 3. Sinh ca kiểm thử từ yêu cầu
```text
Đây là yêu cầu FR13 (voucher) và quyết định D03 của dự án DAYORA:
<dán>
Viết bảng ca kiểm thử: ID, mô tả, dữ liệu vào, bước, kết quả mong đợi. Bao gồm ca biên (đúng ngưỡng, hết hạn đúng 1 phút, hết lượt). Đánh dấu ca nào cần dữ liệu demo đặc biệt.
```

### 4. Phản biện test plan
```text
Đóng vai giảng viên khó tính. Đọc test plan sau và chỉ ra 5 lỗ hổng (thiếu loại test, thiếu tiêu chí, thiếu dữ liệu):
<dán TEST-PLAN.md>
```

### 5. Luyện bảo vệ (cuối phase)
```text
Đóng vai giảng viên chấm đồ án. Dựa trên phần tôi phụ trách ở phase P0 (<dán mục 1 và file ở mục 2>),
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
- [ ] TEST-PLAN.md
- [ ] Ma trận truy vết bản đầu
- [ ] Template bug report
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/ngoc.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Ca kiểm thử biên là gì? Cho ví dụ với số người Kit Builder.
2. Làm sao chứng minh mỗi FR đều đã được test?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
