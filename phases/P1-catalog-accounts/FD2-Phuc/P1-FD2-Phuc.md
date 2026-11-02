---
tags: [phase/P1, role/FD2, guide]
member: Phúc
role: FD2
phase: P1
dates: "04/11 – 10/11/2026"
---
# P1 · FD2 Phúc — Frontend 2 — quản trị

> [!NOTE] Phase: [P1-OVERVIEW](../P1-OVERVIEW.md) (04/11 – 10/11/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/phuc.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Khách xem trang chủ (hero motionsites), danh mục, tìm kiếm + ≥5 bộ lọc + sắp xếp, chi tiết sản phẩm theo biến thể; đăng ký/đăng nhập; admin CRUD sản phẩm/danh mục cơ bản.

## 1. Việc của bạn trong phase này
- [ ] Tự làm + commit: trang admin danh sách sản phẩm (tìm, lọc nhóm, trạng thái), form thêm/sửa SKU, nút ẩn
- [ ] Tự làm + commit: admin danh mục
- [ ] Hiển thị lỗi từ backend (giá âm, SKU trùng) dễ hiểu
- [ ] Chặn truy cập /admin khi không phải ADMIN (chuyển về trang đăng nhập)

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 1b. Tài liệu và prompt cho phần này
- Lộ trình chi tiết phase này: [LP-FD2-Phuc-P1](../../../docs/learning/FD2-Phuc/LP-FD2-Phuc-P1.md) (đọc gì, tiêu chí, tình huống thật, 7 bước prompt, bài tập có commit) · Chung: [LEARNING-PATH](../../../docs/learning/LEARNING-PATH.md), [PITFALLS](../../../docs/learning/PITFALLS.md).

**Prompt riêng cho phần code này** (dùng sau prompt khởi động ở mục 4):
```text
Đây là phần Products trong AdminPage.tsx và admin-catalog.controller.ts của DAYORA:
<dán code>
Giải thích luồng: admin sửa giá SKU → gọi PATCH /api/admin/skus/:id → bảng tải lại.
Vì sao phải đăng nhập ADMIN mới gọi được (RolesGuard)? Nếu GV bảo "thêm cột Danh mục vào bảng" thì sửa những dòng nào? Để tôi tự làm.
```

## 2. File/thư mục bạn phụ trách
- `apps/web/src/pages/AdminPage.tsx` (mục Products, Users)
- `apps/web/src/catalog.css` (phần `.admin-*`)
- `API: apps/api/src/admin-catalog/, admin-users/` (chỉ đọc)

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Form có nhiều field + kiểm tra | Form SKU có giá, tồn, kích thước | [Tài liệu](https://react.dev/reference/react-dom/components/input) | Chặn tồn kho âm ở client |
| 2 | Gọi API POST/PATCH, xử lý lỗi | Thêm/sửa sản phẩm | [Tài liệu](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview) | Hiện thông báo khi API trả 400 |
| 3 | Route bảo vệ theo vai trò | Admin không lộ cho khách | [Tài liệu](https://reactrouter.com/start/declarative/routing) | Giải thích route guard phía client chỉ là phụ, backend mới quyết định |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Phúc, vai trò Frontend 2 — quản trị trong dự án DAYORA
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

### 3. Hiểu form admin
```text
Đây là ProductForm.tsx:
<dán>
Giải thích luồng: nhập → kiểm tra client → gửi API → backend kiểm tra lại → hiện kết quả. Vì sao phải kiểm tra ở cả hai phía?
```

### 4. Luyện sửa: thêm field
```text
GV yêu cầu "thêm trường xuất xứ cho sản phẩm và hiển thị ở admin". Liệt kê các file cần sửa ở cả schema, backend, frontend theo dự án này và thứ tự làm. Chưa viết code.
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
- [ ] Ảnh CRUD sản phẩm
- [ ] Ảnh thông báo lỗi giá âm
- [ ] Commit/PR của bạn
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/phuc.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Ẩn sản phẩm khác xoá thế nào? Vì sao không xoá cứng?
2. Nếu bỏ route guard frontend, hệ thống còn an toàn không? Vì sao?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
