# RUNBOOK — Dữ liệu demo DAYORA

## Dữ liệu cần có trước buổi demo

Checklist này dùng cho môi trường demo của nhóm. Chỉ đánh dấu một mục hoàn tất sau khi kiểm tra dữ liệu thực tế; không đưa mật khẩu, chuỗi kết nối hoặc thông tin cá nhân thật vào tài liệu.

| Dữ liệu | Mục đích trình diễn | Người phối hợp xác nhận | Trạng thái |
| --- | --- | --- | --- |
| Sản phẩm và SKU có giá, ảnh, trạng thái bán và tồn khả dụng | Xem danh mục, thêm vào giỏ, đặt đơn | BD2 Châu, QA Ngọc | Chờ kiểm tra trên DB demo |
| Tài khoản khách demo dùng thông tin giả | Đăng nhập, xem giỏ và lịch sử đơn | BD1 Hoàn, QA Ngọc | Chờ xác nhận tài khoản dùng được |
| Voucher `DAYORA10` và `PICNIC50K` | Thử giảm theo phần trăm, số tiền cố định và điều kiện áp dụng | BD2 Châu, QA Ngọc | Code seed đã có trên `main`; chờ kiểm tra trên DB demo |
| Một khuyến mãi mùa picnic | Hiển thị ưu đãi trong giai đoạn demo | BD2 Châu, QA Ngọc | Code seed đã có trên `main`; chờ kiểm tra trên DB demo |
| Đơn mẫu dùng dữ liệu giả | Xem chi tiết đơn, tổng tiền và trạng thái | BD1 Hoàn, BD2 Châu, QA Ngọc | Chờ thống nhất cách tạo và kiểm tra |
| Danh sách dữ liệu thử cần dọn | Tránh đơn thử và tài khoản thử gây nhầm lẫn khi trình diễn | BD2 Châu, QA Ngọc | Chờ xác nhận phạm vi dọn; giữ nguyên dữ liệu dùng chung |

Mã seed cho hai voucher và khuyến mãi đã có trong [`apps/api/prisma/seed.ts`](../apps/api/prisma/seed.ts) trên `main` (`5e3453d`, `01ef888`, `cdb8e89`; task `PRJ-P2-BD2-3.1` đến `.3`).