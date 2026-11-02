---
tags: [phase/P1, role/PD, guide]
member: Đạt
role: PD
phase: P1
dates: "04/11 – 10/11/2026"
---
# P1 · PD Đạt — Product Designer (UI/UX)

> [!NOTE] Phase: [P1-OVERVIEW](../P1-OVERVIEW.md) (04/11 – 10/11/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/dat.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Khách xem trang chủ (hero motionsites), danh mục, tìm kiếm + ≥5 bộ lọc + sắp xếp, chi tiết sản phẩm theo biến thể; đăng ký/đăng nhập; admin CRUD sản phẩm/danh mục cơ bản.

## 1. Việc của bạn trong phase này
- [ ] Thiết kế Home, Catalog (bộ lọc mobile dạng drawer), Chi tiết sản phẩm, Đăng nhập/Đăng ký cho 1366 và 390 px
- [ ] Chốt nội dung hero (slogan, 2 CTA "Mua sản phẩm" / "Tạo bộ cho chuyến đi"), ảnh 3 tình huống
- [ ] Review UI FD1 trên bản deploy, ghi lỗi UI thành issue
- [ ] Ghi nguồn ảnh vào SOURCE-INVENTORY

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 1b. Tài liệu và prompt cho phần này
- Lộ trình chi tiết phase này: [LP-PD-Dat-P1](../../../docs/learning/PD-Dat/LP-PD-Dat-P1.md) (đọc gì, tiêu chí, tình huống thật, 7 bước prompt, bài tập có commit) · Chung: [LEARNING-PATH](../../../docs/learning/LEARNING-PATH.md), [PITFALLS](../../../docs/learning/PITFALLS.md).

**Prompt riêng cho phần code này** (dùng sau prompt khởi động ở mục 4):
```text
Đây là phần màu, chữ trong DESIGN-SYSTEM.md và khối :root trong index.css của DAYORA:
<dán>
Giải thích từng token màu dùng ở đâu. Kiểm tra giúp tôi: chữ trên nền có đủ tương phản 4.5:1 không? Nếu GV hỏi "vì sao chọn bố cục này thay vì portfolio" thì tôi trả lời thế nào (dựa trên K10 bị loại)?
```

## 2. File/thư mục bạn phụ trách
- `docs/DESIGN-SYSTEM.md`
- `docs/DECISIONS.md` (K01–K07)
- `apps/web/src/index.css` (token, review cùng FD1)
- `apps/web/public/home/`
- `apps/web/public/products/`
- `docs/SOURCE-INVENTORY.md` (ghi nguồn ảnh)

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Bố cục trang thương mại (grid, card, filter) | Catalog phải dễ lọc | [Tài liệu](https://www.nngroup.com/articles/filters-vs-facets/) | Phân biệt filter và sort |
| 2 | Thiết kế mobile-first | Bộ lọc trên 390 px | [Tài liệu](https://tailwindcss.com/docs) | Vẽ bộ lọc dạng drawer trên mobile |
| 3 | Quyền sử dụng ảnh / ảnh AI | Ảnh không rõ nguồn bị cấm | [Tài liệu](https://unsplash.com/license) | Ghi đúng nguồn 1 ảnh |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Đạt, vai trò Product Designer (UI/UX) trong dự án DAYORA
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

### 3. Phân tích catalog đối thủ
```text
Tôi đã khảo sát FanFan, Đi Outdoor, WeTrek (ghi chú dưới). Đề xuất bố cục trang danh mục DAYORA cho desktop và mobile: vị trí bộ lọc, thứ tự thuộc tính lọc, thẻ sản phẩm hiển thị gì (giá, giá giảm, % giảm, sức chứa).
<dán ghi chú>
```

### 4. Tạo ảnh bối cảnh có kiểm soát
```text
Viết prompt tạo ảnh cho cảnh "picnic ăn nhẹ chiều cuối tuần ở công viên Sài Gòn, thảm teal, giỏ mây, ánh nắng vàng, không người nhìn thẳng ống kính, không chữ, không logo thương hiệu khác", tỉ lệ 16:9. Thêm checklist kiểm tra ảnh trước khi dùng.
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
- [ ] Thiết kế 4 màn × 2 kích thước
- [ ] Issue lỗi UI có ảnh
- [ ] SOURCE-INVENTORY cập nhật ảnh
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/dat.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Thẻ sản phẩm hiển thị % giảm thế nào khi có salePrice?
2. Hero dùng hiệu ứng gì và vì sao không làm chậm trang?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
