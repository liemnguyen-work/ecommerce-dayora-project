---
tags: [phase/P4, role/FD2, guide]
member: Phúc
role: FD2
phase: P4
dates: "25/11 – 01/12/2026"
---
# P4 · FD2 Phúc — Frontend 2 — quản trị

> [!NOTE] Phase: [P4-OVERVIEW](../P4-OVERVIEW.md) (25/11 – 01/12/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/phuc.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Kit Builder nhận 4 nhóm đầu vào, áp R01–R05, giải thích kết quả, cho thay món và kiểm soát ngân sách, đưa bộ vào giỏ có ruleSetVersion.

## 1. Việc của bạn trong phase này
- [ ] Tự làm + commit: admin xem RuleSet đang PUBLISHED (định mức theo tình huống) dạng bảng dễ đọc
- [ ] Chuẩn bị form sửa RuleSet nháp (làm tiếp ở P5)
- [ ] Hỗ trợ FD1 component dùng chung (badge, cảnh báo)
- [ ] Cập nhật trang admin sản phẩm hiển thị useType, capacityPeople

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 1b. Tài liệu và prompt cho phần này
- Lộ trình chi tiết phase này: [LP-FD2-Phuc-P4](../../../docs/learning/FD2-Phuc/LP-FD2-Phuc-P4.md) (đọc gì, tiêu chí, tình huống thật, 7 bước prompt, bài tập có commit) · Chung: [LEARNING-PATH](../../../docs/learning/LEARNING-PATH.md), [PITFALLS](../../../docs/learning/PITFALLS.md).

**Prompt riêng cho phần code này** (dùng sau prompt khởi động ở mục 4):
```text
Đây là phần RuleSets trong AdminPage.tsx của DAYORA:
<dán code>
Giải thích DRAFT → PUBLISHED → ARCHIVED. Vì sao không sửa trực tiếp bản đang PUBLISHED? Hỏi tôi 3 câu.
```

## 2. File/thư mục bạn phụ trách
- `apps/web/src/pages/AdminPage.tsx` (mục RuleSets)
- `API: apps/api/src/admin-rulesets/` (chỉ đọc)

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Hiển thị dữ liệu JSON lồng nhau thành bảng | RuleSet là JSON | [Tài liệu](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON) | Đọc cấu trúc RuleSet v1 |
| 2 | Form động (thêm/xoá dòng) | Sửa danh sách hạng mục | [Tài liệu](https://react.dev/learn/updating-arrays-in-state) | Thêm 1 dòng định mức |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Phúc, vai trò Frontend 2 — quản trị trong dự án DAYORA
(website bán đồ picnic trong ngày, đồ án môn Phát triển ứng dụng TMĐT - UEH).
Stack: React + TypeScript + Tailwind (frontend), NestJS + Prisma + PostgreSQL Supabase (backend), VNPay Sandbox.
Tôi chưa có nền tảng lập trình. Phase hiện tại: P4 - Kit Builder.
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

### 3. Hiểu cấu trúc RuleSet
```text
Đây là RuleSet v1 JSON:
<dán>
Giải thích từng phần bằng ví dụ thực đơn nhà hàng, rồi đề xuất cách hiển thị thành bảng cho admin không biết JSON.
```

### 4. Luyện sửa: thay đổi hiển thị
```text
GV yêu cầu "tô màu hạng mục thiết yếu trong bảng quy tắc". Hướng dẫn tôi sửa component và giữ quy tắc không dùng màu làm tín hiệu duy nhất.
```

### 5. Luyện bảo vệ (cuối phase)
```text
Đóng vai giảng viên chấm đồ án. Dựa trên phần tôi phụ trách ở phase P4 (<dán mục 1 và file ở mục 2>),
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
- [ ] Ảnh bảng RuleSet
- [ ] Commit/PR của bạn
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/phuc.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. useType dùng để làm gì trong Kit Builder?
2. Vì sao admin không sửa trực tiếp bản PUBLISHED?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
