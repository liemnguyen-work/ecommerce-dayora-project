---
tags: [phase/P7, role/PD, guide]
member: Đạt
role: PD
phase: P7
dates: "16/12 – 22/12/2026"
---
# P7 · PD Đạt — Product Designer (UI/UX)

> [!NOTE] Phase: [P7-OVERVIEW](../P7-OVERVIEW.md) (16/12 – 22/12/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/dat.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Đóng băng code, deploy ổn định, hoàn thiện báo cáo Word theo cấu trúc môn học, phụ lục đủ, slide, video dự phòng, tập dượt bảo vệ và sửa code trực tiếp.

## 1. Việc của bạn trong phase này
- [ ] Ảnh trước/sau cho từng chức năng Chương 3
- [ ] Thiết kế slide hình ảnh, ít chữ, theo nhận diện DAYORA
- [ ] Kiểm tra UI cuối trên bản deploy 1366/390 px
- [ ] Hoàn thiện SOURCE-INVENTORY (ảnh, prompt motionsites)

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 2. File/thư mục bạn phụ trách
- `docs/report/images/`
- `docs/SOURCE-INVENTORY.md`

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Thiết kế slide | Điểm slide 0.5 | [Tài liệu](https://www.duarte.com/resources/guides-tools/slidedocs/) | Một slide một ý |
| 2 | Ảnh minh chứng có ngày giờ | Quy định yêu cầu screenshot có thời gian | [Tài liệu](https://support.microsoft.com/en-us/windows/use-snipping-tool-to-capture-screenshots-00246869-1843-655f-f220-97299b865f6b) | Chụp có đồng hồ hệ thống |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Đạt, vai trò Product Designer (UI/UX) trong dự án DAYORA
(website bán đồ picnic trong ngày, đồ án môn Phát triển ứng dụng TMĐT - UEH).
Stack: React + TypeScript + Tailwind (frontend), NestJS + Prisma + PostgreSQL Supabase (backend), VNPay Sandbox.
Tôi chưa có nền tảng lập trình. Phase hiện tại: P7 - Đóng gói, báo cáo và bảo vệ.
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

### 3. Kịch bản slide
```text
Lập dàn slide 12–15 trang cho thuyết trình DAYORA (bối cảnh, vấn đề, giải pháp Kit Builder, kiến trúc, demo, bảo mật, kiểm thử, kết quả, hạn chế). Mỗi slide: tiêu đề, hình nên dùng, tối đa 15 chữ.
```

### 4. Kiểm tra nguồn ảnh
```text
Đây là SOURCE-INVENTORY.md:
<dán>
Chỉ ra dòng thiếu nguồn, thiếu license, ảnh AI chưa ghi công cụ.
```

### 5. Luyện bảo vệ (cuối phase)
```text
Đóng vai giảng viên chấm đồ án. Dựa trên phần tôi phụ trách ở phase P7 (<dán mục 1 và file ở mục 2>),
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
- [ ] Bộ ảnh trước/sau
- [ ] Slide
- [ ] SOURCE-INVENTORY đủ
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/dat.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. UI mới khác UI cũ ở điểm nào, vì sao tốt hơn?
2. Ảnh trong web lấy từ đâu, có quyền không?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
