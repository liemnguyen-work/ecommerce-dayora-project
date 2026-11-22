# Cài đặt DAYORA trên máy mới

Hướng dẫn dành cho thành viên chạy web và API trên Windows bằng Git Bash. Thực hiện các lệnh tại thư mục gốc repo `ecommerce-dayora-project`, trừ khi có ghi khác.

Chuẩn bị quyền truy cập repo và hai chuỗi kết nối tới DB thử riêng. Người phụ trách gửi thông tin kết nối qua kênh riêng.

## 1. Chuẩn bị

Cài Git và Node.js 24 kèm npm. Đóng rồi mở lại Git Bash sau khi cài.

Kiểm tra phiên bản:

```bash
git --version
node --version
npm --version
```

`node --version` cần bắt đầu bằng `v24.`. Nếu đang dùng phiên bản khác, chuyển sang Node 24 trước khi cài thư viện.

## 2. Lấy mã nguồn và cài thư viện

### Máy chưa có repo

```bash
git clone https://github.com/liemnguyen-work/ecommerce-dayora-project.git
cd ecommerce-dayora-project
```

### Máy đã có repo

Kiểm tra thay đổi cá nhân trước khi chuyển nhánh và cập nhật:

```bash
git status --short
```

Lưu hoặc commit phần việc đang làm trước khi tiếp tục:

```bash
git switch main &&
git pull --ff-only origin main
```

Nếu Git báo nhánh phân kỳ hoặc có xung đột, dừng và trao đổi với người phụ trách trước khi xử lý.

### Cài thư viện

```bash
npm ci
```

Lệnh dùng `package-lock.json` để cài các workspace API và web.

Khi kiểm tra một PR, checkout đúng nhánh hoặc SHA cần nghiệm thu rồi chạy `npm ci`. Ghi SHA đang kiểm tra bằng:

```bash
git rev-parse HEAD
```

## 3. Tạo file môi trường cục bộ

Chạy tại thư mục gốc:

```bash
cp -n apps/api/.env.example apps/api/.env
cp -n apps/web/.env.example apps/web/.env
```

Tùy chọn `-n` giữ file `.env` nếu đã tồn tại. Với file cũ, đối chiếu `.env.example` và bổ sung các biến còn thiếu.

### Cấu hình API

Mở `apps/api/.env` trong VS Code và điền:

```dotenv
PORT=3000
WEB_ORIGIN=http://localhost:5173
JWT_SECRET=<generate-locally>
DATABASE_URL="postgresql://postgres.<project-ref>:<password>@<pooler-host>:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.<project-ref>:<password>@<pooler-host>:5432/postgres"
```

Các giá trị trong dấu `<...>` là placeholder cần thay trước khi chạy.

Sao chép hai chuỗi kết nối thật từ Supabase hoặc kênh riêng của người phụ trách:

- `DATABASE_URL` dùng Transaction pooler, cổng 6543 cho ứng dụng và seed.
- `DIRECT_URL` dùng Session pooler, cổng 5432 cho migration.
- Cả hai phải trỏ tới cùng DB thử riêng khi kiểm tra hướng dẫn này.
- Nếu Transaction URL đã có tham số sau dấu `?`, thêm `&pgbouncer=true`.
- Ký tự đặc biệt trong mật khẩu phải được percent-encode trong URL.

### Sinh JWT secret trên máy cá nhân

`AuthService` bắt buộc có `JWT_SECRET`. Mỗi môi trường tự sinh một giá trị riêng.

Trên Windows Git Bash, chạy:

```bash
node -e "process.stdout.write(require('node:crypto').randomBytes(32).toString('hex'))" | clip.exe
```

Lệnh sinh 32 byte ngẫu nhiên, biểu diễn thành 64 ký tự hex và sao chép vào clipboard.

Mở `apps/api/.env`, thay `<generate-locally>` bằng giá trị vừa sao chép, lưu file rồi xóa nội dung clipboard bằng cách sao chép một đoạn văn bản thông thường.

Giữ JWT secret trong `.env` cục bộ hoặc cấu hình bí mật của môi trường triển khai. Khởi động lại API sau khi thay đổi biến môi trường.

### Biến cho seed admin

Nếu cần tạo admin và RuleSet trên DB thử riêng, điền thêm trong `apps/api/.env`:

```dotenv
SEED_ADMIN_EMAIL=<local-admin-email>
SEED_ADMIN_PASSWORD=<local-admin-password>
```

Dùng email thử và mật khẩu riêng có ít nhất 8 ký tự. Thay cả hai placeholder trước khi chạy seed.

Nếu thiếu một trong hai biến, seed bỏ qua admin và RuleSet. Nếu chưa cần tạo chúng, có thể bỏ hai dòng hoặc để giá trị rỗng trong `.env` cục bộ.

Seed hiện tại tạo mật khẩu khi tạo mới admin. Với email đã tồn tại, seed cập nhật quyền ADMIN và giữ mật khẩu hiện có.

### Cấu hình web

Trong `apps/web/.env`, đặt:

```dotenv
VITE_API_URL=http://localhost:3000/api
```

Các biến bắt đầu bằng `VITE_` có thể xuất hiện trong trình duyệt. Chỉ đặt cấu hình công khai ở đây.

### Kiểm tra file môi trường được Git bỏ qua

```bash
git check-ignore -v apps/api/.env apps/web/.env
```

Cần thấy quy tắc `.gitignore` áp dụng cho cả hai file.

Giữ mật khẩu, JWT secret, khóa VNPay và chuỗi kết nối trong cấu hình cục bộ hoặc kênh riêng. Che các giá trị này khi gửi ảnh, log hoặc nhờ hỗ trợ.

## 4. Kiểm tra schema, migration và seed

### Chọn đúng DB thử

Trước khi chạy các lệnh ghi dữ liệu, xác nhận `DATABASE_URL` và `DIRECT_URL` đều trỏ tới DB phát triển riêng.

Việc nghiệm thu hướng dẫn máy mới thực hiện trên DB thử riêng. Dừng và báo Liêm nếu chưa có DB phù hợp.

### Kiểm tra schema và migration

Trên DB phát triển riêng, chạy:

```bash
npm run prisma:validate -w api &&
npm run db:migrate -w api &&
npm run prisma:generate -w api
```

Kết quả cần có:

- Schema hợp lệ.
- Migration hiện có được áp dụng thành công hoặc DB đã đồng bộ.
- Prisma Client được sinh thành công.

Sau mỗi `git pull`, chạy `npm run db:migrate -w api` trên DB phát triển riêng để áp dụng migration còn thiếu. Người thực hiện PR có migration cần nhắc nhóm cập nhật.

Nếu Prisma đề nghị reset database, phát hiện drift hoặc yêu cầu tạo migration mới ngoài dự kiến, dừng và báo Liêm.

### Supabase dùng chung và production

Trước demo hoặc deploy, đối chiếu thư mục `apps/api/prisma/migrations` với bảng `_prisma_migrations` trên Supabase. Báo Liêm nếu có migration chưa áp hoặc migration lỗi.

Mỗi lần deploy API, áp dụng migration bằng `prisma migrate deploy` trước khi khởi động phiên bản mới theo quy trình deploy của nhóm. Lệnh `db:migrate` dành cho DB phát triển riêng.

### Seed dữ liệu thử

Repo đã có:

- File `apps/api/prisma/seed.ts`.
- Script `db:seed` trong `apps/api/package.json`, chạy `prisma db seed`.
- Cấu hình seed `tsx prisma/seed.ts` trong `apps/api/prisma.config.ts`.

Sau khi xác nhận đúng DB thử riêng, đã áp dụng migration và sinh Prisma Client, chạy:

```bash
npm run db:seed -w api
```

Nếu cần admin và RuleSet, chuẩn bị hai biến seed trong `.env` theo mục 3 trước khi chạy.

Đọc kết quả terminal và đối chiếu dữ liệu trên DB thử. Nếu có lỗi, ghi lại lệnh và thông báo đã che thông tin nhạy cảm. Dừng nếu công cụ đề nghị reset dữ liệu.

## 5. Chạy API và web

Mở hai cửa sổ Git Bash tại thư mục gốc repo.

### Cửa sổ thứ nhất — API

```bash
npm run dev:api
```

Đợi API khởi động thành công và qua bước khởi tạo AuthService.

Dùng trình duyệt mở:

```text
http://localhost:3000/api/health
```

Hoặc kiểm tra từ một cửa sổ Git Bash khác:

```bash
curl -i http://localhost:3000/api/health
```

Kết quả mong đợi là HTTP `200` và:

```json
{"status":"ok","service":"dayora-api"}
```

Ghi riêng kết quả khởi động API, phản hồi health và kết quả migration/seed đã thực hiện.

### Cửa sổ thứ hai — Web

```bash
npm run dev:web
```

Mở:

```text
http://localhost:5173
```

Kiểm tra web hiển thị, gọi API được và Console/Network của các thao tác đã thử.

Giữ hai tiến trình chạy khi dùng ứng dụng. Nhấn `Ctrl+C` trong từng cửa sổ để dừng. Khởi động lại tiến trình tương ứng sau khi sửa `.env`.

## 6. Kiểm tra trên máy hoặc checkout sạch

Lần thử Supabase trước đây có xác nhận hai thành viên chạy thành công. Đợt sửa JWT và hướng dẫn seed cần được kiểm tra lại tại đúng SHA đưa lên PR.

Nhờ hai thành viên thực hiện trên máy hoặc checkout sạch, mỗi người dùng cấu hình cục bộ và DB thử riêng. Ghi kết quả sau khi chạy:

| Người kiểm tra | Ngày kiểm tra | SHA | Máy hoặc checkout sạch | Lệnh đã chạy | Kết quả và minh chứng |
| --- | --- | --- | --- | --- | --- |
| Chưa ghi nhận người thứ nhất | — | — | Chưa kiểm tra | — | Chưa kiểm tra |
| Chưa ghi nhận người thứ hai | — | — | Chưa kiểm tra | — | Chưa kiểm tra |

Mỗi lượt kiểm tra cần ghi:

1. Phiên bản Node và npm.
2. SHA bằng `git rev-parse HEAD`.
3. Kết quả `npm ci`.
4. Việc đã tạo JWT secret riêng và cấu hình file môi trường.
5. Kết quả migration và seed trên DB thử riêng nếu có thực hiện.
6. Kết quả `npm run dev:api`, API qua khởi tạo AuthService và `/api/health`.
7. Kết quả `npm run dev:web` và thao tác web đã thử.
8. Lỗi gặp phải, cách xử lý và minh chứng đã che thông tin nhạy cảm.

Các bước chưa chạy giữ trạng thái “Chưa kiểm tra”.

## 7. Kiểm tra trước PR

Tại thư mục gốc repo, chạy:

```bash
npm run lint &&
npm test &&
npm run build
```

Sau đó kiểm tra:

```bash
git status --short
```

Ghi lệnh và kết quả thực tế vào PR. Nếu có test timeout hoặc lỗi, ghi cả lần lỗi và kết quả điều tra/chạy lại.

Kiểm tra `.env` và mã Prisma tự sinh được Git bỏ qua. Đọc kỹ các file xuất hiện trước khi stage, chỉ thêm file thuộc phạm vi task.

Kết quả lint, test và build cần đi kèm bằng chứng thử hướng dẫn trên hai máy hoặc checkout sạch ở mục 6.

## 8. Lỗi thường gặp

| Dấu hiệu | Cách kiểm tra và xử lý |
| --- | --- |
| `node` hoặc `npm` không được nhận diện | Mở lại Git Bash sau khi cài Node 24, kiểm tra PATH và `node --version`. |
| PowerShell chặn `npm.ps1` | Dùng Git Bash để chạy các lệnh trong hướng dẫn. |
| `npm ci` báo lockfile không khớp | Kiểm tra đúng nhánh, SHA và thay đổi cục bộ rồi trao đổi với người phụ trách. |
| `JWT_SECRET is required` | Kiểm tra `JWT_SECRET` trong `apps/api/.env`, sinh giá trị riêng theo mục 3 rồi khởi động lại API. |
| `clip.exe` không được nhận diện | Kiểm tra đang chạy trên Windows và Windows System32 có trong PATH. Báo người hỗ trợ để dùng cách sinh và lưu secret phù hợp. |
| Seed báo thiếu biến admin | Điền `SEED_ADMIN_EMAIL` và `SEED_ADMIN_PASSWORD` trong `.env` cục bộ nếu cần admin và RuleSet. |
| Seed báo mật khẩu quá ngắn | Dùng mật khẩu riêng có ít nhất 8 ký tự rồi chạy lại trên DB thử. |
| Admin đã tồn tại nhưng mật khẩu seed mới không đăng nhập được | Seed giữ mật khẩu của tài khoản đã tồn tại. Dùng thông tin thử đúng hoặc phối hợp BD xử lý tài khoản trên DB thử. |
| `P1000` hoặc authentication failed | Kiểm tra username, mật khẩu và percent-encoding trong từng chuỗi kết nối. |
| `P1001`, timeout hoặc không tới DB | Kiểm tra mạng, trạng thái project, host và cổng theo thông tin Supabase cung cấp. |
| Lỗi prepared statement trên cổng 6543 | Kiểm tra `DATABASE_URL` có `pgbouncer=true`, `DIRECT_URL` dùng Session pooler cổng 5432. |
| Prisma báo drift hoặc đề nghị reset | Dừng và báo Liêm, giữ lại thông báo đã che thông tin kết nối. |
| Cổng 3000 hoặc 5173 đang được sử dụng | Dừng tiến trình cũ. Nếu đổi cổng API, cập nhật `VITE_API_URL`; đổi cổng web thì cập nhật `WEB_ORIGIN`. |
| Trình duyệt báo CORS | Đối chiếu địa chỉ web thực tế với `WEB_ORIGIN`, gồm giao thức và cổng, rồi khởi động lại API. |
| Web gọi API lỗi | Kiểm tra API đang chạy, xem Network và đối chiếu `VITE_API_URL=http://localhost:3000/api`. Khởi động lại Vite sau khi sửa `.env`. |

Khi nhờ hỗ trợ, gửi lệnh gây lỗi và thông báo đã che thông tin nhạy cảm. Minh chứng cần thể hiện đúng SHA, thao tác và kết quả thực tế.
