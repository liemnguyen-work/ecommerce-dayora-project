---
tags: [learning, member/DO]
member: Kiệt
role: DO
---
# DO Kiệt — DevOps

Lộ trình học riêng của bạn. Cách học chung, quy trình commit và AI-LOG: [LEARNING-PATH](../LEARNING-PATH.md). Lỗi hay gặp để học tư duy: [PITFALLS](../PITFALLS.md).

## Phần code bạn sở hữu
Bạn phải giải thích và tự sửa được các phần này khi GV hỏi. Người review PR của bạn: **BD2 Châu**.
- `vercel.json`
- `render.yaml`
- `apps/*/.env.example`
- `.github/workflows/ (chưa có)`
- `docs/SETUP.md, docs/RUNBOOK.md (chưa có)`

## Lộ trình 6 phase
| Phase | Mục tiêu học | File |
|---|---|---|
| [P1](LP-DO-Kiet-P1.md) | Tự dựng được project trên máy mới và hiểu cấu hình deploy. | `LP-DO-Kiet-P1.md` |
| [P2](LP-DO-Kiet-P2.md) | Chuẩn bị dữ liệu demo an toàn. | `LP-DO-Kiet-P2.md` |
| [P3](LP-DO-Kiet-P3.md) | Chuẩn bị cấu hình VNPay cho deploy. | `LP-DO-Kiet-P3.md` |
| [P4](LP-DO-Kiet-P4.md) | Dựng CI chạy lint, test, build. | `LP-DO-Kiet-P4.md` |
| [P5](LP-DO-Kiet-P5.md) | Deploy và kiểm tra sau deploy. | `LP-DO-Kiet-P5.md` |
| [P6](LP-DO-Kiet-P6.md) | Quản lý khóa API của dịch vụ AI: lưu ở đâu, ai thấy, đổi model không cần sửa code, theo dõi hết lượt. | `LP-DO-Kiet-P6.md` |

## Nhiệm vụ xây dựng của bạn (commit đứng tên bạn)
Bạn tự xây phần này trong repo nhóm. Quy trình: [ROADMAP](../../ROADMAP.md).

| Mã | Phase | Việc | Test nghiệm thu | Phải merge trước |
|---|---|---|---|---|
| PRJ-P0-DO-1 | P0 | Bộ khung chạy được trong repo nhóm | 1 file | — |
| PRJ-P0-DO-2 | P0 | CI chạy lint + test + build mỗi PR | — | PRJ-P0-DO-1 |
| PRJ-P1-DO-1 | P1 | Supabase riêng cho nhóm + hướng dẫn cài máy mới | — | PRJ-P0-BD2-1 |
| PRJ-P2-DO-1 | P2 | Checklist dữ liệu demo | — | PRJ-P2-BD2-3 |
| PRJ-P3-DO-1 | P3 | Cấu hình VNPay Sandbox (env, IPN URL) | — | PRJ-P3-BD1-2 |
| PRJ-P4-DO-1 | P4 | Cấu hình deploy | — | — |
| PRJ-P5-DO-1 | P5 | Deploy + trust proxy + biên bản kiểm tra | — | PRJ-P5-BD2-2 |
| PRJ-P6-DO-1 | P6 | Cấu hình khóa AI trên Render + biên bản | — | PRJ-P6-BD1-1 |

### Việc P0 (28/10–03/11, trước khi vào P1)
### PRJ-P0-DO-1 — Bộ khung chạy được trong repo nhóm
- **File phải viết:** `package.json, package-lock.json`; `apps/*/package.json, tsconfig*.json, vite.config.ts, nest-cli.json, vitest.config*.ts`; `apps/api/src/main.ts` (bản tối thiểu: prefix api, CORS WEB_ORIGIN); `apps/api/src/app.controller.ts, apps/api/src/prisma/prisma.service.ts`; `apps/web/src/main.tsx, apps/web/src/App.tsx` (một trang trống); `apps/*/.env.example, .gitignore`; `apps/web/public/` (ảnh, video, logo: tài sản, chép nguyên)
- **Test nghiệm thu:** `apps/api/src/app.controller.spec.ts`
- **Phải merge trước:** không
- **Kiểm chứng:** viết test ở dòng trên **trước** khi code (commit riêng, QA duyệt ca test). Sau khi QA duyệt, không sửa test cho dễ pass; cần đổi thì ghi lý do trong PR.
- **Nhánh:** `prj/p0-do-1` · **Reviewer:** BD2 Châu
- **Các bước:**
  - [ ] 1. Gốc repo: `package.json` có `"workspaces": ["apps/*"]` và các script `dev:web`, `dev:api`, `build`, `test`, `lint` — Xong khi: `npm install` không lỗi
  - [ ] 2. API: tạo `apps/api` (NestJS): `package.json`, `tsconfig*.json`, `nest-cli.json`, `vitest.config.ts` — Xong khi: `npm run build -w api` xanh
  - [ ] 3. `app.controller.ts`: `GET /health` trả `{ status: 'ok', service: 'dayora-api' }`; `main.ts` bản tối thiểu: `setGlobalPrefix('api')`, CORS theo `WEB_ORIGIN` — Xong khi: `npm test -w api -- app.controller` xanh và `curl http://localhost:3000/api/health` trả JSON trên
  - [ ] 4. `apps/api/src/prisma/prisma.service.ts`: `PrismaService` dùng chung (kết nối khi module khởi động) — Xong khi: build vẫn xanh
  - [ ] 5. Web: `apps/web` (Vite + React + TypeScript), `main.tsx` + `App.tsx` một trang trống — Xong khi: `npm run dev:web` mở được http://localhost:5173
  - [ ] 6. `apps/api/.env.example`, `apps/web/.env.example` (chỉ tên biến, không giá trị thật); `.gitignore` có `.env`, `node_modules`, `dist`; ảnh và logo của nhóm vào `apps/web/public/` (ghi nguồn) — Xong khi: tạo `.env` thật rồi `git status` không thấy nó

### PRJ-P0-DO-2 — CI chạy lint + test + build mỗi PR
- **File phải viết:** `.github/workflows/ci.yml`
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** PRJ-P0-DO-1
- **Kiểm chứng:** reviewer đối chiếu với `REQUIREMENTS.md`, `docs/DECISIONS.md` và kết quả chạy thật.
- **Nhánh:** `prj/p0-do-2` · **Reviewer:** BD2 Châu
- **Các bước:**
  - [ ] 1. `.github/workflows/ci.yml`: chạy khi push/PR vào `main`; `actions/setup-node` Node 24.16.0 có cache npm; các bước `npm ci` → `npm run lint` → `npm test` → `npm run build`; env `DISABLE_ORDER_EXPIRY: '1'` — Xong khi: PR thử chạy CI xanh
  - [ ] 2. Mở PR này: tab **Checks** có job `check` chạy — Xong khi: job xanh
  - [ ] 3. Thử làm đỏ: trên một nhánh nháp, sửa sai một `expect` rồi push — Xong khi: CI đỏ đúng bước `npm test`; chụp ảnh rồi xóa nhánh nháp
  - [ ] 4. Settings → Branches: bảo vệ `main`, bắt buộc check `check` xanh mới merge được (cần quyền admin repo; không có thì nhờ PM) — Xong khi: PR đỏ không bấm được Merge

## Lỗi hay gặp bạn nên đọc kỹ
- [E1. Chưa commit thì không có điểm quay lại](../PITFALLS.md#e1)
- [B4. Chạy lại seed làm sai tồn kho](../PITFALLS.md#b4)
- [C4. VNPay gọi IPN hai lần, hoặc gọi trễ](../PITFALLS.md#c4)
- [E3. Test pass chưa chắc đúng: mock và database thật](../PITFALLS.md#e3)
- [C6. Rate limit sau proxy](../PITFALLS.md#c6)

## Tài liệu chính thức nên mở song song
- https://render.com/docs/blueprint-spec
- https://vercel.com/docs/projects/project-configuration
- https://supabase.com/docs/guides/database/connecting-to-postgres
- https://docs.github.com/en/actions

## Theo dõi tiến độ của bạn
| Mã task | PR (link) | Test pass | Ảnh/diff | Mục AI-LOG | Ngày merge |
|---|---|---|---|---|---|
| PRJ-P0-DO-1 |  |  |  |  |  |
| PRJ-P0-DO-2 |  |  |  |  |  |
| PRJ-P1-DO-1 |  |  |  |  |  |
| PRJ-P2-DO-1 |  |  |  |  |  |
| PRJ-P3-DO-1 |  |  |  |  |  |
| PRJ-P4-DO-1 |  |  |  |  |  |
| PRJ-P5-DO-1 |  |  |  |  |  |
| PRJ-P6-DO-1 |  |  |  |  |  |

| Phase | Tiêu chí học đạt |
|---|---|
| P1 | __/4 |
| P2 | __/2 |
| P3 | __/2 |
| P4 | __/2 |
| P5 | __/3 |
| P6 | __/4 |
