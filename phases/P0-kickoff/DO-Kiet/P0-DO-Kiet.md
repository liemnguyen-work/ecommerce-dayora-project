---
tags: [phase/P0, role/DO, guide]
member: Kiệt
role: DO
phase: P0
dates: "28/10 – 03/11/2026"
---
# P0 · DO Kiệt — DevOps

> [!NOTE] Phase: [P0-OVERVIEW](../P0-OVERVIEW.md) (28/10 – 03/11/2026) · Vai trò: [ROLES](../../../docs/ROLES.md) · **Log AI của bạn:** [log cá nhân](../../../docs/ai-logs/kiet.md) · Mẫu: [mẫu log](../../../docs/ai-logs/TEMPLATE.md)

**Mục tiêu chung của phase:** Repo chạy được trên máy mọi người, CSDL Supabase có schema + 30 SKU, chốt các quyết định bảng 2.6, có design system và hero mẫu, deploy bản "hello" lên Vercel/Render.

## 1. Việc của bạn trong phase này
- [ ] Tạo repo GitHub public, push `main`, mời 7 thành viên, bật branch protection (cần 1 review)
- [ ] Tạo Supabase project, lưu secret vào nơi an toàn (không gửi qua chat nhóm công khai)
- [ ] Deploy web lên Vercel (root `apps/web`) và api lên Render (root `apps/api`), cấu hình env
- [ ] Viết `docs/SETUP.md` (setup guide) cho người không biết code; thêm GitHub Actions chạy build + test

> [!TIP] Bạn tự viết phần của mình; AI chỉ giải thích, gợi ý và review. **Việc của bạn là tự làm, tự kiểm tra và tự commit** bằng tài khoản GitHub của bạn. Trước buổi bảo vệ, bạn phải tự giải thích và tự sửa được phần này (GV gọi bất kỳ ai).

## 2. File/thư mục bạn phụ trách
- `docs/SETUP.md`
- `.github/workflows/ci.yml`
- `apps/*/.env.example`
- `render.yaml (nếu dùng)`

## 3. Kiến thức cần học (theo thứ tự)
| # | Chủ đề | Vì sao bạn cần | Học ở đâu | Tự kiểm tra: làm được thì đạt |
|---|---|---|---|---|
| 1 | Git remote, push, branch protection | Bạn quản trị repo | [Tài liệu](https://docs.github.com/en/pull-requests) | Bật rule "Require a pull request before merging" |
| 2 | Biến môi trường trên Vercel/Render | Secret chỉ nằm ở đây | [Tài liệu](https://vercel.com/docs/frameworks/vite) | Đặt VITE_API_URL trỏ tới Render |
| 3 | Deploy NestJS lên Render | API phải có HTTPS cho VNPay IPN | [Tài liệu](https://render.com/docs/deploy-nestjs) | Mở https://<app>.onrender.com/api/health |
| 4 | GitHub Actions CI | Tự kiểm tra build mỗi PR | [Tài liệu](https://docs.github.com/en/actions/get-started/quickstart) | PR có dấu tick xanh |

Cách học nhanh: đọc tài liệu 20 phút → hỏi AI bằng prompt số 1 bên dưới → tự làm bài tự kiểm tra → ghi AI-LOG.

## 4. Làm việc với AI của bạn
Dùng AI nào cũng được (ChatGPT, Claude, Gemini...). Copy prompt, thay phần `<...>`. **Không dán file `.env`, mật khẩu, key vào AI.**

### 1. Khởi động phiên (dùng đầu mỗi buổi)
```text
Bạn là trợ giảng lập trình kiên nhẫn. Tôi là Kiệt, vai trò DevOps trong dự án DAYORA
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

### 3. Viết setup guide
```text
Viết hướng dẫn cài đặt cho người chưa từng lập trình, dùng Windows, cho dự án monorepo này:
<dán mục Lệnh trong PROJECT.md>
Từng bước có ảnh minh hoạ cần chụp (ghi chú [ẢNH: ...]), lỗi thường gặp và cách sửa. Không đưa secret thật vào hướng dẫn.
```

### 4. Debug deploy
```text
Render báo lỗi khi deploy NestJS:
<dán log, xoá secret>
Giải thích nguyên nhân từng bước, đề xuất cách sửa và cách kiểm tra lại. Không yêu cầu tôi dán file .env.
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
- [ ] URL Vercel + Render chạy
- [ ] SETUP.md
- [ ] CI xanh trên PR đầu tiên
- [ ] Ít nhất 1 mục AI-LOG thật trong [log cá nhân](../../../docs/ai-logs/kiet.md)
- [ ] Commit/PR mang tên tài khoản GitHub của bạn (xem [ROLES](../../../docs/ROLES.md))

## 6. Câu hỏi GV có thể hỏi — tự trả lời được thì đạt
1. Vì sao VITE_API_URL không được chứa secret?
2. Nếu lỡ commit file .env lên GitHub thì phải làm gì?

## Liên kết
[REQUIREMENTS](../../../REQUIREMENTS.md) · [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [DECISIONS](../../../docs/DECISIONS.md) · [DESIGN-SYSTEM](../../../docs/DESIGN-SYSTEM.md) · [PROJECT](../../../PROJECT.md)
