---
tags: [phase/P0, role/PM, guide]
member: Liêm
role: PM
phase: P0
dates: "28/10 – 03/11/2026"
---
# P0 · PM Liêm — Trưởng nhóm kiêm BA

> [!NOTE] Phase: [P0-OVERVIEW](../P0-OVERVIEW.md) (28/10 – 03/11/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/liem.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Repo chạy được trên máy mọi người, CSDL Supabase có schema + 30 SKU, chốt các quyết định bảng 2.6, có design system và hero mẫu, deploy bản "hello" lên Vercel/Render.

## 1. Việc của bạn trong phase này
- [ ] Mời 7 thành viên vào repo GitHub (cùng DO), tạo GitHub Project board cột Todo/Doing/Review/Done
- [ ] Tổ chức buổi chốt quyết định D01–D10 trong [DECISIONS](../../../docs/DECISIONS.md); cập nhật trạng thái + ngày
- [ ] Tạo Issue cho từng gói việc P0–P1, gắn người phụ trách và reviewer
- [ ] Viết biên bản họp đầu tiên vào `docs/meetings/` (tự tạo file md)

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 2. File/thư mục bạn phụ trách
- `docs/DECISIONS.md`
- `docs/CHANGELOG.md`
- `phases/P0-kickoff/P0-OVERVIEW.md (bảng theo dõi)`

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Đọc yêu cầu: FR/NFR/R/AC là gì | Bạn là người giải thích phạm vi cho cả nhóm và GV | [Tài liệu](https://www.atlassian.com/work-management/project-management/acceptance-criteria) | Nói được khác nhau giữa FR10 và R07 |
| 2 | Git và GitHub cơ bản (commit, branch, pull request, issue) | Quản lý Issues, duyệt PR | [Tài liệu](https://docs.github.com/en/get-started/using-git/about-git) | Tự tạo 1 issue và 1 PR sửa file md |
| 3 | Markdown + liên kết Obsidian `...` | Toàn bộ tài liệu là md liên kết với nhau | [Tài liệu](https://help.obsidian.md/Linking+notes+and+files/Internal+links) | Tạo một ghi chú link tới [REQUIREMENTS FR10](../../../REQUIREMENTS.md) |
| 4 | Sơ đồ quy trình (Mermaid flowchart) | Vẽ luồng mua hàng, checkout cho báo cáo | [Tài liệu](https://mermaid.js.org/syntax/flowchart.html) | Vẽ lại luồng checkout trong [ARCHITECTURE](../../../docs/ARCHITECTURE.md) |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Liêm, vai trò Trưởng nhóm kiêm BA trong dự án DAYORA
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

### 3. Hiểu một quyết định trước khi chốt
```text
Tôi là trưởng nhóm BA dự án web bán đồ picnic DAYORA. Đây là câu hỏi cần chốt:
<dán 1 dòng D0x từ DECISIONS.md>
Hãy giải thích bằng ví dụ đời thường: nếu chọn phương án này thì khách hàng, admin và lập trình viên bị ảnh hưởng gì? Liệt kê 2 phương án khác và ưu/nhược. Không viết code.
```

### 4. Soạn biên bản họp
```text
Từ ghi chú thô sau đây, viết biên bản họp markdown gồm: thành phần, quyết định đã chốt (mã D0x), việc cần làm (ai, hạn), vấn đề còn mở. Không thêm nội dung không có trong ghi chú.
<dán ghi chú>
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
- [ ] Ảnh GitHub Project board có đủ issue P0–P1
- [ ] DECISIONS.md có ngày chốt
- [ ] Biên bản họp đầu tiên
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/liem.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Vì sao server phải tính lại giá thay vì tin giá trên giao diện?
2. D06 giữ tồn khi nào, trả tồn khi nào? Ví dụ một đơn bị hủy.

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
