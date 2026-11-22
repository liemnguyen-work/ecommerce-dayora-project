---
tags: [phase/P1, role/FD1, guide]
member: Thành
role: FD1
phase: P1
dates: "04/11 – 10/11/2026"
---
# P1 · FD1 Thành — Frontend 1 — khách hàng

> [!NOTE] Phase: [P1-OVERVIEW](../P1-OVERVIEW.md) (04/11 – 10/11/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/thanh.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Khách xem trang chủ (hero motionsites), danh mục, tìm kiếm + ≥5 bộ lọc + sắp xếp, chi tiết sản phẩm theo biến thể; đăng ký/đăng nhập; admin CRUD sản phẩm/danh mục cơ bản.

## 1. Việc của bạn trong phase này
- [ ] Tự làm + commit: trang chủ có hero motionsites, 6 nhóm hàng, 3 tình huống, sản phẩm nổi bật
- [ ] Tự làm + commit: Catalog có ô tìm kiếm, ≥5 bộ lọc, sắp xếp giá, đồng bộ lên URL (`?q=&category=`)
- [ ] Tự làm + commit: Chi tiết sản phẩm đổi biến thể (màu) → giá/ảnh/tồn đổi theo; sản phẩm liên quan
- [ ] Tự làm + commit: Đăng ký/Đăng nhập có báo lỗi tại ô

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 1b. Tài liệu và prompt cho phần này
- Lộ trình chi tiết phase này: [LP-FD1-Thanh-P1](../../../docs/learning/FD1-Thanh/LP-FD1-Thanh-P1.md) (đọc gì, tiêu chí, tình huống thật, 7 bước prompt, bài tập có commit) · Chung: [LEARNING-PATH](../../../docs/learning/LEARNING-PATH.md), [PITFALLS](../../../docs/learning/PITFALLS.md).

**Prompt riêng cho phần code này** (dùng sau prompt khởi động ở mục 4):
```text
Đây là HomePage.tsx của DAYORA:
<dán code>
Giải thích: biến `introSeenThisLoad` làm gì, vì sao tải lại trang thì intro chạy lại còn bấm menu về Trang chủ thì không.
Hàm `words()` tạo hiệu ứng chữ hiện từng từ thế nào? Nếu GV bảo "cho intro chỉ chạy 1 lần mỗi ngày" thì sửa chỗ nào? Để tôi tự sửa, chỉ gợi ý.
```

## 2. File/thư mục bạn phụ trách
- `apps/web/src/App.tsx` (route + chuyển trang)
- `apps/web/src/pages/HomePage.tsx`
- `apps/web/src/components/home/`
- `apps/web/src/pages/CatalogPage.tsx`
- `apps/web/src/components/catalog/`
- `apps/web/src/pages/ProductPage.tsx`
- `apps/web/src/pages/LoginPage.tsx, RegisterPage.tsx`
- `apps/web/src/pages/AboutPage.tsx`
- `apps/web/src/components/SiteHeader.tsx, SiteFooter.tsx`
- `apps/web/src/lib/api.ts, auth.tsx, catalog.ts`
- `apps/web/src/index.css, catalog.css, motion.css`

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | useState, useEffect, gọi API | Catalog tải dữ liệu theo bộ lọc | [Tài liệu](https://react.dev/learn) | Giải thích vì sao đổi bộ lọc thì gọi lại API |
| 2 | URL search params | Bộ lọc nằm trên URL để chia sẻ link | [Tài liệu](https://reactrouter.com/api/hooks/useSearchParams) | Đọc `?category=TM` trong code |
| 3 | Motion: animate, whileInView | Hero và section có animation | [Tài liệu](https://motion.dev/docs/react) | Tắt animation khi reduced motion |
| 4 | Form có validate | Đăng ký báo lỗi ngay | [Tài liệu](https://react.dev/reference/react-dom/components/form) | Hiện lỗi "email không hợp lệ" |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Thành, vai trò Frontend 1 — khách hàng trong dự án DAYORA
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

### 3. Đọc hiểu trang Catalog
```text
Đây là CatalogPage.tsx của DAYORA:
<dán code>
Vẽ sơ đồ: người dùng chọn bộ lọc → state đổi → URL đổi → gọi API → hiển thị. Chỉ ra dòng code tương ứng mỗi bước. Hỏi tôi 3 câu kiểm tra.
```

### 4. Luyện sửa code kiểu GV
```text
Giả sử giảng viên yêu cầu: "thêm bộ lọc theo màu" trên trang Catalog. Hướng dẫn tôi từng bước: sửa file nào ở frontend, cần backend hỗ trợ gì, kiểm tra thế nào. Để tôi tự làm, chỉ gợi ý khi tôi hỏi.
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
- [ ] Ảnh 4 trang × 2 kích thước
- [ ] Video ngắn lọc sản phẩm
- [ ] Commit/PR của bạn
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/thanh.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Khi đổi biến thể, những thông tin nào đổi và lấy từ đâu?
2. Làm sao thêm một thuộc tính lọc mới?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
