# Kiểm tra kiến thức — PRJ-P1-DO-1

## 1. Vì sao nhóm cần Supabase project riêng và mời thành viên?

Project riêng giúp cả nhóm dùng chung một database cho DAYORA, thay vì mỗi người làm trên dữ liệu khác nhau. Mời thành viên vào Organization để họ truy cập project theo quyền được phân công; tôi cần kiểm tra lại quyền và trạng thái chấp nhận lời mời.

## 2. DATABASE_URL và DIRECT_URL khác nhau thế nào?

Theo cấu hình của nhóm, API dùng `DATABASE_URL` qua Transaction pooler cổng 6543 và có `pgbouncer=true`. Prisma Migrate dùng `DIRECT_URL` qua Session pooler cổng 5432 vì việc thay đổi cấu trúc database cần kết nối ổn định hơn.

## 3. Vì sao không commit file .env?

`.env` chứa mật khẩu database. Nếu commit lên GitHub, người có quyền xem lịch sử Git có thể lấy được mật khẩu, kể cả sau khi tôi xóa nó ở commit sau. Repo chỉ lưu `.env.example` với giá trị mẫu.

## 4. Vì sao phải nhờ người khác thử cài trên máy mới?

Máy tôi migrate thành công chỉ chứng minh cấu hình trên máy tôi chạy được. Hai bạn khác thử thành công giúp phát hiện hướng dẫn thiếu bước, đường dẫn sai hoặc cấu hình chỉ hoạt động trên máy người viết.

## 5. docs/SETUP.md giúp gì cho nhóm?

File này hướng dẫn người mới cài Node 24, lấy mã nguồn, tạo `.env`, chạy migration rồi mở API và web. Nếu bỏ hướng dẫn, mỗi bạn phải hỏi lại các bước và dễ điền nhầm chuỗi kết nối hoặc vô tình đưa mật khẩu lên Git.

## 6. Vì sao web production gọi /api qua Vercel rewrite?

Trình duyệt gửi yêu cầu đến `/api` trên cùng tên miền với web, rồi Vercel chuyển tiếp đến API trên Render. Cách này giúp việc gửi cookie theo cùng nguồn gốc dễ kiểm soát hơn; backend vẫn phải đặt thuộc tính cookie và cấu hình bảo mật đúng.

## 7. Nếu web chạy cổng khác WEB_ORIGIN thì sao?

API chỉ cho phép origin được cấu hình trong `WEB_ORIGIN`. Khi web đổi cổng mà biến này chưa đổi, trình duyệt có thể chặn phản hồi vì CORS; tôi sẽ cập nhật đúng giao thức, host và cổng rồi khởi động lại API.

## 8. Chỗ tôi thấy dễ nhầm nhất là gì?

Lúc đầu tôi dễ nhầm hai kết nối cùng có cổng 5432: Session pooler và kết nối trực tiếp không nhất thiết dùng cùng host. Tôi lấy nguyên chuỗi Session pooler từ Supabase, kiểm tra migration thành công và giữ các chuỗi thật ngoài Git.
