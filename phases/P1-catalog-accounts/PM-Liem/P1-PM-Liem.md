---
tags: [phase/P1, role/PM, guide]
member: Liêm
role: PM
phase: P1
dates: "04/11 – 10/11/2026"
---
# P1 · PM Liêm — Trưởng nhóm kiêm BA

> [!NOTE] Phase: [P1-OVERVIEW](../P1-OVERVIEW.md) (04/11 – 10/11/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/liem.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Khách xem trang chủ (hero motionsites), danh mục, tìm kiếm + ≥5 bộ lọc + sắp xếp, chi tiết sản phẩm theo biến thể; đăng ký/đăng nhập; admin CRUD sản phẩm/danh mục cơ bản.

## 1. Việc của bạn trong phase này
- [ ] Theo dõi tiến độ FR01–FR04 trên board, họp ngắn 2 lần/tuần
- [ ] Cập nhật [CHANGELOG](../../../docs/CHANGELOG.md) khi có thay đổi
- [ ] Viết lại Chương 1–2 báo cáo theo scope mới (giữ phần đã có trong BAO-CAO-DRAFT, bỏ UI cũ)
- [ ] Duyệt PR tài liệu, kiểm tra mỗi PR code có thành viên phụ trách review

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 1b. Tài liệu và prompt cho phần này
- Lộ trình chi tiết phase này: [LP-PM-Liem-P1](../../../docs/learning/PM-Liem/LP-PM-Liem-P1.md) (đọc gì, tiêu chí, tình huống thật, 7 bước prompt, bài tập có commit) · Chung: [LEARNING-PATH](../../../docs/learning/LEARNING-PATH.md), [PITFALLS](../../../docs/learning/PITFALLS.md).

**Prompt riêng cho phần code này** (dùng sau prompt khởi động ở mục 4):
```text
Đây là docs/DECISIONS.md và plan/task_plan.md của DAYORA:
<dán>
Tóm tắt các quyết định giao diện của nhóm trong 5 câu. Lập bảng: yêu cầu FR01–FR04 → trang/API nào đáp ứng → minh chứng cần chụp. Hỏi tôi 3 câu để kiểm tra tôi nắm phạm vi.
```

## 2. File/thư mục bạn phụ trách
- `docs/DECISIONS.md`
- `docs/CHANGELOG.md`
- `plan/task_plan.md, plan/progress.md` (đọc)
- `phases/P1-catalog-accounts/P1-OVERVIEW.md`

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Luồng dữ liệu giao diện → API → CSDL | Quy định yêu cầu giải thích data flow | [Tài liệu](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview) | Kể luồng khi khách lọc sản phẩm theo giá |
| 2 | Viết báo cáo học thuật + trích dẫn | Báo cáo chiếm điểm lớn, chống đạo văn <20% | [Tài liệu](https://apastyle.apa.org/style-grammar-guidelines/references/examples) | Trích dẫn đúng 1 nguồn số liệu |
| 3 | Quản lý phạm vi (scope creep) | Không để nhóm làm thêm ngoài FR | [Tài liệu](https://www.atlassian.com/work-management/project-management/acceptance-criteria) | Từ chối 1 đề xuất ngoài scope có lý do |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Liêm, vai trò Trưởng nhóm kiêm BA trong dự án DAYORA
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

### 3. Viết lại phần lý do chọn đề tài
```text
Viết lại mục 1.1 Lý do chọn đề tài cho DAYORA từ bản nháp sau, giữ nguyên số liệu và nguồn đã có, câu văn học thuật, không thêm số liệu mới không có nguồn:
<dán đoạn nháp>
```

### 4. Kiểm tra truy vết
```text
Đây là danh sách issue đã đóng trong phase và REQUIREMENTS FR01–FR04. Liệt kê yêu cầu nào chưa có issue/test tương ứng.
<dán>
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
- [ ] CH1-CH2.md bản mới
- [ ] Board P1 cập nhật
- [ ] Ít nhất 1 PR bạn review
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/liem.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Khi khách lọc "giá 100k–300k, nhóm thảm", dữ liệu đi qua những tầng nào?
2. Thay đổi nào phải ghi CHANGELOG?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
