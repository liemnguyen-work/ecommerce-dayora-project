---
tags: [phase/P1, role/BD1, guide]
member: Hoàn
role: BD1
phase: P1
dates: "04/11 – 10/11/2026"
---
# P1 · BD1 Hoàn — Backend 1 — khách hàng và giao dịch

> [!NOTE] Phase: [P1-OVERVIEW](../P1-OVERVIEW.md) (04/11 – 10/11/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/hoan.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Khách xem trang chủ (hero motionsites), danh mục, tìm kiếm + ≥5 bộ lọc + sắp xếp, chi tiết sản phẩm theo biến thể; đăng ký/đăng nhập; admin CRUD sản phẩm/danh mục cơ bản.

## 1. Việc của bạn trong phase này
- [ ] Tự làm + commit: `POST /auth/register`, `POST /auth/login` (bcrypt, JWT cookie httpOnly), `GET /auth/me`
- [ ] Tự làm + commit: `GET /products` lọc q, category, scenario, minPrice, maxPrice, capacity, material, sort
- [ ] Tự làm + commit: `GET /products/:slug` trả biến thể, sản phẩm liên quan; ghi ViewedProduct khi đã đăng nhập
- [ ] Đọc test của từng endpoint, tự chạy `npm test`

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 1b. Tài liệu và prompt cho phần này
- Lộ trình chi tiết phase này: [LP-BD1-Hoan-P1](../../../docs/learning/BD1-Hoan/LP-BD1-Hoan-P1.md) (đọc gì, tiêu chí, tình huống thật, 7 bước prompt, bài tập có commit) · Chung: [LEARNING-PATH](../../../docs/learning/LEARNING-PATH.md), [PITFALLS](../../../docs/learning/PITFALLS.md).

**Prompt riêng cho phần code này** (dùng sau prompt khởi động ở mục 4):
```text
Đây là auth.controller.ts, auth.guard.ts và me.controller.ts của DAYORA:
<dán code>
Vẽ đường đi của một request: POST /api/auth/login → tạo cookie → GET /api/me/profile đọc cookie → guard → service.
Chỉ ra dòng code ở từng bước. Giải thích vì sao cookie là httpOnly. Hỏi tôi 3 câu kiểm tra.
```

## 2. File/thư mục bạn phụ trách
- `apps/api/src/auth/`
- `apps/api/src/catalog/`
- `apps/api/src/me/`
- `apps/api/src/promotions/promotions.*.ts`

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Băm mật khẩu (bcrypt) và JWT | Không lưu mật khẩu thô (NFR04) | [Tài liệu](https://jwt.io/introduction) | Giải thích vì sao 2 user cùng mật khẩu có hash khác nhau |
| 2 | NestJS authentication + guard | Bảo vệ endpoint | [Tài liệu](https://docs.nestjs.com/security/authentication) | Chỉ ra nơi đọc cookie và xác thực token |
| 3 | Prisma query: where, orderBy, include | Bộ lọc catalog | [Tài liệu](https://www.prisma.io/docs/orm) | Viết điều kiện lọc giá bằng `gte`/`lte` |
| 4 | Unit test với Vitest | Mỗi logic phải có test | [Tài liệu](https://vitest.dev/guide/) | Chạy `npm test`, đọc 1 test |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Hoàn, vai trò Backend 1 — khách hàng và giao dịch trong dự án DAYORA
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

### 3. Hiểu luồng đăng nhập
```text
Đây là auth.service.ts và auth.controller.ts:
<dán>
Kể lại luồng đăng nhập từ lúc bấm nút đến lúc trình duyệt giữ cookie, như kể chuyện. Chỉ ra 3 điểm bảo mật trong code.
```

### 4. Luyện sửa: đổi business rule
```text
GV yêu cầu "mật khẩu phải tối thiểu 8 ký tự và có số". Chỉ tôi file DTO cần sửa, decorator class-validator cần dùng, và cách viết test kiểm tra. Để tôi tự sửa.
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
- [ ] Ảnh gọi API login trả cookie (DevTools > Network)
- [ ] Kết quả `npm test`
- [ ] Commit/PR của bạn
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/hoan.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. JWT lưu ở đâu, vì sao không để localStorage?
2. Lọc theo sức chứa dùng field nào trong DB?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
