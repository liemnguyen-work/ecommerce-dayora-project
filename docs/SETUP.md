# Cài đặt DAYORA trên máy mới

Hướng dẫn này dành cho thành viên chạy ứng dụng web và API trên Windows bằng Git Bash. Thực hiện lệnh ở **thư mục gốc repo** `ecommerce-dayora-project`, trừ khi có ghi khác. Cần có quyền truy cập repo và hai chuỗi kết nối database do người phụ trách gửi qua kênh riêng.

## 1. Chuẩn bị

- Cài Git và Node.js **24**, kèm npm. Đóng rồi mở lại Git Bash sau khi cài.
- Kiểm tra:

```bash
git --version
node --version
npm --version
```

`node --version` cần bắt đầu bằng `v24.`. Nếu máy đã có Node khác, chuyển sang Node 24 trước khi cài thư viện.

## 2. Lấy mã nguồn và cài thư viện

Máy chưa có repo:

```bash
git clone https://github.com/liemnguyen-work/ecommerce-dayora-project.git
cd ecommerce-dayora-project
```

Máy đã có repo: mở Git Bash trong thư mục gốc, kiểm tra thay đổi cá nhân trước khi cập nhật. Nếu đang làm việc trên nhánh riêng, đừng chuyển nhánh khi còn thay đổi chưa lưu.

```bash
git switch main
git pull --ff-only origin main
npm ci
```

`npm ci` dùng `package-lock.json` của repo để cài các workspace `apps/api` và `apps/web`. Không cần cài npm riêng trong từng thư mục.

## 3. Tạo file môi trường cục bộ

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

Mở `apps/api/.env` trong VS Code và điền:

```dotenv
PORT=3000
WEB_ORIGIN=http://localhost:5173
DATABASE_URL="postgresql://postgres.<project-ref>:<password>@<pooler-host>:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.<project-ref>:<password>@<pooler-host>:5432/postgres"
```

**Sao chép chuỗi thật từ Supabase hoặc tin nhắn riêng của người phụ trách**, không tự đoán host, project ref hay mật khẩu. `DATABASE_URL` là **Transaction pooler, cổng 6543** cho ứng dụng; `DIRECT_URL` là **Session pooler, cổng 5432** cho Prisma Migrate. Nếu chuỗi Transaction đã có tham số sau dấu `?`, thêm `&pgbouncer=true` thay vì dấu `?` thứ hai. Ký tự đặc biệt trong mật khẩu phải được percent-encode trong URL; không để nguyên ký tự như `@`, `#`, `/`, `?`.

Trong `apps/web/.env`, đặt:

```dotenv
VITE_API_URL=http://localhost:3000/api
```

Biến bắt đầu bằng `VITE_` có thể xuất hiện trong trình duyệt; tuyệt đối không đặt mật khẩu hoặc chuỗi kết nối database ở đây. Không đưa file `.env` vào Git, issue, PR, ảnh chụp hay AI. Kiểm tra Git đang bỏ qua chúng:

```bash
git check-ignore -v apps/api/.env apps/web/.env
```

## 4. Kiểm tra schema, áp dụng migration

```bash
npm run prisma:validate -w api
npm run db:migrate -w api
```

`prisma:validate` cần báo schema hợp lệ. `db:migrate` dùng `DIRECT_URL`, áp dụng migration còn thiếu và sinh Prisma Client. Khi đã đồng bộ, lệnh báo database khớp schema. Nếu Prisma đề nghị **reset database**, phát hiện **drift**, hoặc hỏi tạo migration mới mà bạn không chủ định thay đổi schema, hãy dừng và báo người phụ trách; không xác nhận reset trên database chung.

**Seed:** Cấu hình Prisma trong repo có khai báo `tsx prisma/seed.ts`, nhưng tại thời điểm soạn hướng dẫn, repo **chưa có** `apps/api/prisma/seed.ts` hoặc script `db:seed` trong `apps/api/package.json`. Vì vậy chưa chạy `npm run db:seed -w api`; chờ nhóm bổ sung seed và xác nhận lệnh trước khi thực hiện. Không tự thêm dữ liệu mẫu vào database chung.

## 5. Chạy API và web

Mở **hai cửa sổ Git Bash** tại thư mục gốc repo. Cửa sổ thứ nhất:

```bash
npm run dev:api
```

Đợi API khởi động, rồi truy cập <http://localhost:3000/api/health>. Phản hồi mong đợi:

```json
{"status":"ok","service":"dayora-api"}
```

Cửa sổ thứ hai:

```bash
npm run dev:web
```

Mở <http://localhost:5173>. Giữ cả hai cửa sổ chạy khi thử ứng dụng; nhấn `Ctrl+C` trong mỗi cửa sổ để dừng. API kết nối Prisma khi khởi động; trang health cho biết API phản hồi, còn kết quả migration xác nhận truy cập database.

## 6. Kết quả thử trên máy mới và kiểm tra trước PR

Kiệt đã chạy `prisma:validate` và `db:migrate` thành công trên máy cá nhân: migration `20261108183740_init` được áp dụng và Prisma Client được sinh ra. Theo xác nhận của Kiệt, **hai thành viên khác cũng đã chạy thử thành công**. Tên người thử, ngày giờ, lệnh đã chạy và minh chứng riêng của từng người cần được ghi vào nhật ký hoặc phần mô tả PR trước khi nghiệm thu; tài liệu này không chứa ảnh hay chuỗi kết nối của họ.

Trên máy của bạn, vẫn tự chạy các lệnh dưới đây trước khi gửi PR:

```bash
npm run lint
npm test
npm run build
git status --short
```

Chỉ báo hoàn thành khi các lệnh thực sự chạy thành công trên máy bạn. `git status --short` không được liệt kê `apps/api/.env`, `apps/web/.env` hay `apps/api/src/generated/`. Nếu có file khác xuất hiện, đọc kỹ trước khi `git add`; không dùng `git add .` khi còn file cục bộ hoặc file sao lưu không liên quan.

## 7. Lỗi thường gặp

| Dấu hiệu | Cách kiểm tra và xử lý |
|---|---|
| `node` hoặc `npm` không được nhận diện | Mở lại Git Bash sau khi cài Node 24; kiểm tra PATH và `node --version`. |
| PowerShell chặn `npm.ps1` | Mở **Git Bash** để chạy các lệnh trong hướng dẫn; không cần đổi chính sách thực thi của PowerShell. |
| `npm ci` báo lockfile không khớp | Cập nhật đúng nhánh và kiểm tra thay đổi cục bộ; không tự sửa `package-lock.json` để bỏ qua lỗi. |
| `P1000` hoặc authentication failed | Kiểm tra mật khẩu đã điền, ký tự đặc biệt đã percent-encode, và username trong **từng** chuỗi lấy từ Supabase. Không gửi nguyên URL khi báo lỗi. |
| `P1001`, timeout hoặc kết nối không tới database | Kiểm tra mạng, trạng thái project Supabase và đúng host/cổng. Cổng 5432 của **Session pooler** khác host kết nối trực tiếp; lấy lại nguyên chuỗi ở mục Connect. |
| Lỗi prepared statement trên cổng 6543 | Kiểm tra `DATABASE_URL` có tham số `pgbouncer=true`; `DIRECT_URL` dùng Session pooler cổng 5432. |
| Cổng 3000 hoặc 5173 đang được sử dụng | Dừng tiến trình cũ rồi chạy lại. Nếu đổi cổng API, cập nhật `VITE_API_URL`; nếu đổi cổng web, cập nhật `WEB_ORIGIN` tương ứng. |
| Trình duyệt báo CORS | Kiểm tra địa chỉ web thực tế có khớp `WEB_ORIGIN` của API, gồm cả giao thức và cổng; khởi động lại API sau khi sửa `.env`. |
| Web không gọi được API | Xem Network trong DevTools, kiểm tra API đang chạy và `VITE_API_URL=http://localhost:3000/api`; khởi động lại Vite sau khi sửa `.env`. |

Khi nhờ hỗ trợ, gửi **lệnh gây lỗi và thông báo đã che thông tin kết nối**. Không gửi file `.env` hoặc ảnh chứa mật khẩu.
