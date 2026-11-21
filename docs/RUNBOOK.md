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

## Cách chuẩn bị dữ liệu demo

1. Xác nhận với Châu DB nào dùng cho demo và kiểm tra cấu hình kết nối.
2. Chạy `npm run db:seed -w api` trên DB demo đã xác nhận để chuẩn bị sản phẩm, voucher `DAYORA10`, `PICNIC50K` và khuyến mãi mùa picnic.
3. Chuẩn bị tài khoản demo bằng thông tin giả. Chọn SKU đủ tồn và tạo đơn mẫu qua checkout.
4. Lập danh sách dữ liệu thử cần dọn và thống nhất phạm vi với Châu trước buổi demo.

## Cách xác nhận dữ liệu demo

- Đăng nhập bằng tài khoản khách demo. Xác nhận SKU đã chọn có thể thêm vào giỏ và đủ tồn cho đơn mẫu.
- Kiểm tra `DAYORA10`, `PICNIC50K` và khuyến mãi mùa picnic có trong DB demo. Thử từng voucher trên giỏ đủ điều kiện và đối chiếu mức giảm với cấu hình.
- Tạo một đơn mẫu qua checkout. Đối chiếu sản phẩm, số lượng, tiền giảm, phí giao và tổng tiền với chi tiết đơn.
- Kiểm tra seed chạy lại trên DB thử riêng. Ghi tồn kho của một SKU sau khi chỉnh và tổng số SKU, chạy lại `npm run db:seed -w api`, rồi xác nhận cả hai số vẫn giữ nguyên.
- Ghi môi trường, ngày kiểm tra và kết quả thực tế. Để trạng thái “Chờ kiểm tra” cho các mục chưa chạy.
