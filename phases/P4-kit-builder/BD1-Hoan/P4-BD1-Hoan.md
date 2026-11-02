---
tags: [phase/P4, role/BD1, guide]
member: Hoàn
role: BD1
phase: P4
dates: "25/11 – 01/12/2026"
---
# P4 · BD1 Hoàn — Backend 1 — khách hàng và giao dịch

> [!NOTE] Phase: [P4-OVERVIEW](../P4-OVERVIEW.md) (25/11 – 01/12/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/hoan.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Kit Builder nhận 4 nhóm đầu vào, áp R01–R05, giải thích kết quả, cho thay món và kiểm soát ngân sách, đưa bộ vào giỏ có ruleSetVersion.

## 1. Việc của bạn trong phase này
- [ ] Tự làm + commit: `kit.service.ts` hàm thuần `buildKit(input, ruleSet, skus)` áp R01–R04, chọn SKU ổn định (ưu tiên + thứ tự)
- [ ] Tự làm + commit: `adjustKit` áp R05 (thay món phải cùng công dụng, đủ sức chứa, tồn, ngân sách)
- [ ] Tự làm + commit: `POST /kit/build`, `POST /kit/adjust` validate đầu vào
- [ ] Chạy 24+ test Kit (cùng QA), sửa đến khi pass

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 1b. Tài liệu và prompt cho phần này
- Lộ trình chi tiết phase này: [LP-BD1-Hoan-P4](../../../docs/learning/BD1-Hoan/LP-BD1-Hoan-P4.md) (đọc gì, tiêu chí, tình huống thật, 7 bước prompt, bài tập có commit) · Chung: [LEARNING-PATH](../../../docs/learning/LEARNING-PATH.md), [PITFALLS](../../../docs/learning/PITFALLS.md).

**Prompt riêng cho phần code này** (dùng sau prompt khởi động ở mục 4):
```text
Đây là kit-engine.ts của DAYORA:
<dán code>
Lấy ví dụ: picnic 4 người, ngân sách 500.000đ. Đi từng bước engine tính số lượng mỗi món, chọn SKU, xử lý vượt ngân sách.
Nếu GV bảo "thêm quy tắc R06: tối đa 2 món cùng nhóm" thì sửa đâu? Để tôi tự làm.
```

## 2. File/thư mục bạn phụ trách
- `apps/api/src/kit/kit-engine.ts`
- `apps/api/src/kit/kit.service.ts`
- `apps/api/src/kit/kit.controller.ts, kit.dto.ts`

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Hàm thuần (pure function) | Test 24 ca dễ | [Tài liệu](https://developer.mozilla.org/en-US/docs/Glossary/Pure_function) | Giải thích vì sao buildKit không gọi DB |
| 2 | Test bảng (test.each) | 24 ca gọn | [Tài liệu](https://vitest.dev/api/#test-each) | Thêm 1 ca vào bảng |
| 3 | Thuật toán tham lam đơn giản | Chọn sản phẩm theo ưu tiên | [Tài liệu](https://en.wikipedia.org/wiki/Greedy_algorithm) | Kể vì sao không cam kết tối ưu toàn cục |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Hoàn, vai trò Backend 1 — khách hàng và giao dịch trong dự án DAYORA
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

### 3. Hiểu Kit engine
```text
Đây là kit.service.ts:
<dán>
Chạy tay ví dụ charter (picnic, 5 người, 350.000đ, có túi giữ nhiệt) qua từng hàm, ghi giá trị biến ở mỗi bước, so với kết quả mong đợi 335.500đ.
```

### 4. Luyện sửa nâng cao: đổi business rule
```text
GV yêu cầu "đồ cá nhân dư 10% cho nhóm từ 6 người". Phân tích chỗ sửa (RuleSet hay code), test cần thêm, ảnh hưởng tới đơn cũ (R06). Hướng dẫn tôi tự làm.
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
- [ ] 24+ test Kit pass
- [ ] Ảnh API build trả kết quả + giải thích
- [ ] Commit/PR của bạn
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/hoan.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. R01 và R02 khác nhau thế nào? Cho ví dụ thảm.
2. Nếu thiếu tồn một món thiết yếu, API trả gì?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
