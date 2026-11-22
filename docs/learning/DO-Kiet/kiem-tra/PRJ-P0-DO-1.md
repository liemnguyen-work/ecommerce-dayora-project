1. Mỗi it(...) trong app.controller.spec.ts kiểm điều gì?

Ca kiểm thử đã làm kiểm tra hàm health() trả đúng { status: 'ok', service: 'dayora-api' }. Test gọi trực tiếp controller nên chưa kiểm tra được HTTP, CORS hay kết nối database.

2. Bước 1 — Gốc repo: làm để làm gì? Bỏ đi thì gì hỏng?

Cấu hình npm workspaces giúp quản lý API và Web trong cùng repo, chạy các lệnh chung từ thư mục gốc. Nếu bỏ cấu hình này, các lệnh dùng workspace như npm run build -w web sẽ không chạy đúng.

3. Bước 2 — API: làm để làm gì? Bỏ đi thì gì hỏng?

Tạo nền NestJS, cấu hình TypeScript và các lệnh chạy, build, test cho API. Nếu thiếu phần này, API có thể không khởi động hoặc biên dịch được; kiểm thử cũng không chạy nếu thiếu công cụ tương ứng.

4. Bước 3 — app.controller.ts: làm để làm gì? Bỏ đi thì gì hỏng?

Controller khai báo chức năng health; kết hợp tiền tố trong main.ts tạo đường dẫn /api/health. Nếu bỏ controller hoặc hàm health(), ca kiểm thử liên quan sẽ lỗi và endpoint không hoạt động như yêu cầu.

5. Bước 4 — prisma.service.ts: làm để làm gì? Bỏ đi thì gì hỏng?

Service cung cấp Prisma Client cho NestJS, kết nối khi module khởi tạo và ngắt kết nối khi vòng đời hủy được gọi. Nếu bỏ service, các chức năng phụ thuộc vào nó sẽ lỗi; test health gọi trực tiếp controller vẫn có thể đạt vì không dùng database.

6. Bước 5 — Web: làm để làm gì? Bỏ đi thì gì hỏng?

Tạo nền React, TypeScript và Vite để nhóm tiếp tục phát triển giao diện. Nếu bỏ nền này, các lệnh chạy hoặc build Web sẽ không hoạt động; trang trắng ở giai đoạn này là kết quả chủ động do App trả về null.

7. Bước 6 — Hai file mẫu biến môi trường: làm để làm gì? Bỏ đi thì gì hỏng?

Hai file mẫu hướng dẫn người clone repo cấu hình API và Web mà không đưa mật khẩu thật lên Git. Bỏ file mẫu không nhất thiết làm test hỏng ngay, nhưng người mới dễ thiếu cấu hình; .gitignore giúp tránh đưa .env thật vào commit.

8. Chỗ khó nhất — ví dụ từ lỗi thực tế đã gặp

Một lỗi đã gặp là tạo nhầm file tên prisma thay vì thư mục, khiến không tạo được cấu trúc cần thiết. Cách sửa là đổi tên file nhầm thành bản sao lưu, rồi tạo đúng thư mục và file Prisma.