---
tags: [phase/P5, role/QA, guide]
member: Ngọc
role: QA
phase: P5
dates: "02/12 – 08/12/2026"
---
# P5 · QA Ngọc — QA/Tester

> [!NOTE] Phase: [P5-OVERVIEW](../P5-OVERVIEW.md) (02/12 – 08/12/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/ngoc.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Admin sửa và phát hành RuleSet có phiên bản + nhật ký; dashboard 5 chỉ số đúng công thức; rà soát và test bảo mật XSS/SQLi/CSRF/IDOR/secret.

## 1. Việc của bạn trong phase này
- [ ] Test bảo mật: XSS (đánh giá, tìm kiếm), SQLi (ô tìm kiếm), CSRF, IDOR (đơn, giỏ), API admin bằng tài khoản khách
- [ ] Test hồi quy AC03 thủ công
- [ ] Đối chiếu dashboard với SQL tay
- [ ] Lập bảng kết quả bảo mật cho Chương 4

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 1b. Tài liệu và prompt cho phần này
- Lộ trình chi tiết phase này: [LP-QA-Ngoc-P5](../../../docs/learning/QA-Ngoc/LP-QA-Ngoc-P5.md) (đọc gì, tiêu chí, tình huống thật, 7 bước prompt, bài tập có commit) · Chung: [LEARNING-PATH](../../../docs/learning/LEARNING-PATH.md), [PITFALLS](../../../docs/learning/PITFALLS.md).

**Prompt riêng cho phần code này** (dùng sau prompt khởi động ở mục 4):
```text
Đây là security.spec.ts và bảng rà route của DAYORA:
<dán>
Viết 8 ca kiểm thử bảo mật tay: IDOR (xem đơn người khác), khách gọi /api/admin → 403, body thừa trường → 400, brute-force login. Tôi tự chạy bằng trình duyệt/Postman.
```

## 2. File/thư mục bạn phụ trách
- `apps/api/src/common/security.spec.ts` (đọc)
- `docs/TEST-CASES.md`
- `docs/report/CH4-security.md` (phần test)

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Kiểm thử bảo mật cơ bản | Chương 4 | [Tài liệu](https://owasp.org/www-project-top-ten/) | Chạy 5 ca bảo mật |
| 2 | Kiểm thử hồi quy | Sửa chỗ này không hỏng chỗ khác | [Tài liệu](https://www.guru99.com/regression-testing.html) | Chọn bộ ca hồi quy tối thiểu |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Ngọc, vai trò QA/Tester trong dự án DAYORA
(website bán đồ picnic trong ngày, đồ án môn Phát triển ứng dụng TMĐT - UEH).
Stack: React + TypeScript + Tailwind (frontend), NestJS + Prisma + PostgreSQL Supabase (backend), VNPay Sandbox.
Tôi chưa có nền tảng lập trình. Phase hiện tại: P5 - Quản trị quy tắc, dashboard, bảo mật.
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

### 3. Ca kiểm thử bảo mật
```text
Viết 12 ca kiểm thử bảo mật cho DAYORA (XSS, SQLi, CSRF, IDOR, phân quyền admin, lộ secret, brute-force, IPN giả): bước, dữ liệu, kết quả mong đợi, cách chụp minh chứng. Chỉ dùng trên môi trường của nhóm.
```

### 4. Chọn bộ hồi quy
```text
Từ danh sách ca kiểm thử sau, chọn bộ hồi quy tối thiểu chạy mỗi lần deploy, giải thích lý do.
<dán>
```

### 5. Luyện bảo vệ (cuối phase)
```text
Đóng vai giảng viên chấm đồ án. Dựa trên phần tôi phụ trách ở phase P5 (<dán mục 1 và file ở mục 2>),
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
- [ ] Bảng kết quả bảo mật
- [ ] Minh chứng AC03, AC07
- [ ] Bug report
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/ngoc.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Bằng chứng nào cho thấy khách không gọi được API admin?
2. Bộ hồi quy gồm những ca nào?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
