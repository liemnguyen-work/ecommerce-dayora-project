---
tags: [phase/P6, role/QA, guide]
member: Ngọc
role: QA
phase: P6
dates: "09/12 – 15/12/2026"
---
# P6 · QA Ngọc — QA/Tester

> [!NOTE] Phase: [P6-OVERVIEW](../P6-OVERVIEW.md) (09/12 – 15/12/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/ngoc.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Chạy toàn bộ bộ test, test đồng thời, thử nghiệm 8 người dùng; sửa lỗi; nếu core đạt thì làm FR18 checklist + email nhắc.

## 1. Việc của bạn trong phase này
- [ ] Chạy toàn bộ ca kiểm thử (≥ 24 Kit + checkout + voucher + VNPay + bảo mật), ghi actual cuối
- [ ] Viết smoke Playwright cho 3 luồng chính (cùng FD1)
- [ ] Retest mọi bug; báo cáo lỗi còn tồn trước demo
- [ ] Hỗ trợ buổi usability (ghi chép)

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 2. File/thư mục bạn phụ trách
- `docs/TEST-CASES.md`
- `apps/web/e2e/ (nếu có Playwright)`
- `docs/report/BUG-REPORT.md`

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Playwright | Smoke tự động | [Tài liệu](https://playwright.dev/docs/intro) | Viết test đăng nhập |
| 2 | Báo cáo kiểm thử | Chương 4 | [Tài liệu](https://www.guru99.com/test-summary-report.html) | Viết test summary |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Ngọc, vai trò QA/Tester trong dự án DAYORA
(website bán đồ picnic trong ngày, đồ án môn Phát triển ứng dụng TMĐT - UEH).
Stack: React + TypeScript + Tailwind (frontend), NestJS + Prisma + PostgreSQL Supabase (backend), VNPay Sandbox.
Tôi chưa có nền tảng lập trình. Phase hiện tại: P6 - Kiểm thử tổng, usability, Innovation có điều kiện.
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

### 3. Viết smoke test
```text
Giải thích cách viết một test Playwright đơn giản: mở trang chủ DAYORA, tìm "thảm", mở sản phẩm đầu tiên, kiểm tra có nút "Thêm vào giỏ". Giải thích từng dòng.
```

### 4. Test summary report
```text
Từ kết quả sau, viết test summary report: số ca, pass/fail, lỗi theo mức, lỗi còn tồn, rủi ro khi demo.
<dán>
```

### 5. Luyện bảo vệ (cuối phase)
```text
Đóng vai giảng viên chấm đồ án. Dựa trên phần tôi phụ trách ở phase P6 (<dán mục 1 và file ở mục 2>),
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
- [ ] TEST-CASES đầy đủ actual
- [ ] Smoke test
- [ ] BUG-REPORT.md
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/ngoc.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Còn lỗi nào chưa sửa và vì sao chấp nhận?
2. Smoke test kiểm tra những gì?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
