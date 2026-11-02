---
tags: [harness, project]
---
# PROJECT.md — Thông tin riêng của DAYORA

## Tổng quan
- Tên: **DAYORA** — website B2C bán đồ dùng cho chuyến đi trong ngày.
- Môn: Phát triển ứng dụng TMĐT (UEH), 8 thành viên ([ROLES](docs/ROLES.md)).
- Phạm vi: 30 SKU / 6 nhóm hàng, 3 tình huống (picnic ăn nhẹ, hẹn hò buổi chiều, đi biển trong ngày), Kit Builder theo quy tắc R01–R07. Chi tiết: [REQUIREMENTS](REQUIREMENTS.md), [PROJECT_PLAN](PROJECT_PLAN.md).
- Đọc theo thứ tự: [REQUIREMENTS](REQUIREMENTS.md) → [DECISIONS](docs/DECISIONS.md) → [PHASES](phases/PHASES.md) → [ROADMAP](docs/ROADMAP.md).
- Giai đoạn hiện tại: **Bài tập Buổi 2** (HTML5 + CSS3 trong `session2/`, hạn 04/11/2026). Đồ án React/NestJS bắt đầu theo ROADMAP sau khi bài tập của từng người xong.

## Stack (kế hoạch, chốt ở [DECISIONS](docs/DECISIONS.md) K01–K07)
- `apps/web`: React + TypeScript + Vite + Tailwind CSS.
- `apps/api`: NestJS (Express) + ORM + PostgreSQL trên Supabase.
- Thanh toán: VNPay Sandbox. Deploy: web → Vercel, API → Render, DB → Supabase.
- Chi tiết: [ARCHITECTURE](docs/ARCHITECTURE.md).

## Lệnh
Repo chưa có `apps/`. DO Kiệt dựng bộ khung ở PRJ-P0-DO-1 rồi cập nhật mục này. Dự kiến:
- Cài đặt: `npm install` (ở thư mục gốc)
- Env: copy `apps/api/.env.example` → `apps/api/.env`, `apps/web/.env.example` → `apps/web/.env`, điền giá trị thật (không commit).
- Chạy: `npm run dev:api` và `npm run dev:web`
- Test: `npm test`; build: `npm run build`; lint: `npm run lint`

Có sẵn ngay:
- Kiểm bài Buổi 2: `python tools/check-session2.py session2`
- Issue theo lộ trình: `npm run roadmap:issues` (dry run), thêm `-- --repo <owner>/<repo> --apply` để tạo thật
- Tiến độ: `npm run roadmap:report -- --repo <owner>/<repo>` → `docs/PROGRESS.md`

## Phạm vi thư mục
- Thành viên: phần mình sở hữu theo `docs/learning/<VAI>-<Tên>/LP-<VAI>-<Tên>.md` và bảng phân công của từng bài tập; log cá nhân `docs/ai-logs/<tên>.md` (chỉ nối thêm).
- PM: `docs/ROADMAP.md`, `docs/ASSIGNMENTS.md`, `docs/CHANGELOG.md`, bảng theo dõi trong `phases/*/P*-OVERVIEW.md`.
- Không ai sửa khi chưa được nhóm đồng ý: `REQUIREMENTS.md`, quyết định đã chốt trong `docs/DECISIONS.md`, ADR đã chấp nhận, mục cũ trong log của người khác.

## Ghi công cho thành viên
- Mỗi task có **thành viên phụ trách**. Người đó tự làm, tự chạy lệnh kiểm tra, tự commit/mở PR bằng tài khoản GitHub của mình và ghi nhật ký AI thật của mình. Lịch sử commit phải phản ánh đúng người làm.
- Chưa hiểu đoạn code: dùng prompt "giải thích" trong hướng dẫn phase của mình trước khi commit.

## Không bao giờ
- Không dùng dữ liệu cá nhân thật, tài khoản thật; dữ liệu mẫu ghi rõ nguồn.
- Không dùng ảnh/mã không rõ quyền; ghi nguồn ở [SOURCE-INVENTORY](docs/SOURCE-INVENTORY.md).
- Không để khóa bí mật (VNPay hash secret, Supabase service key, JWT secret) trong frontend hay git.
