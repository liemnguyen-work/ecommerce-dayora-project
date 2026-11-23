# PRJ-P2-BD2-3 — Kiểm tra kiến thức Seed Voucher và Promotion
**Người thực hiện:** BD2 Châu

## Checklist kiến thức

### 1. Seed voucher DAYORA10 giảm 10% tối đa 50.000đ bằng `upsert`

Sử dụng `prisma.voucher.upsert()` để tạo voucher `DAYORA10`, giảm 10% giá trị đơn hàng, tối đa 50.000đ, áp dụng cho đơn hàng từ 300.000đ. Voucher có giới hạn 200 lượt sử dụng và mỗi người dùng được sử dụng tối đa một lần.

`upsert` kiểm tra mã voucher đã tồn tại hay chưa. Nếu chưa có thì tạo mới, nếu đã có thì thực hiện phần `update`. Trong đoạn code đã triển khai, `update: {}` giúp tránh tạo bản ghi trùng khi chạy seed nhiều lần mà không ghi đè dữ liệu hiện có.

Nếu bỏ bước này, cơ sở dữ liệu mới sẽ không được khởi tạo sẵn voucher `DAYORA10`, khiến người dùng không thể áp dụng mã giảm giá này nếu chưa được tạo bằng cách khác.

### 2. Seed voucher PICNIC50K giảm cố định 50.000đ bằng `upsert`

Sử dụng `prisma.voucher.upsert()` để khởi tạo voucher `PICNIC50K`, giảm trực tiếp 50.000đ cho đơn hàng từ 500.000đ. Voucher có giới hạn 100 lượt sử dụng và mỗi người dùng chỉ được sử dụng tối đa một lần.

Khác với `DAYORA10` sử dụng trường `percentOff`, voucher này sử dụng `amountOff: 50000` để giảm một số tiền cố định.

Nếu bỏ bước này, hệ thống không có dữ liệu ban đầu cho mã `PICNIC50K`, làm cho chức năng áp dụng voucher này không tìm thấy mã nếu chưa được tạo riêng.

### 3. Seed chương trình khuyến mãi Promotion mùa picnic bằng `upsert`

Sử dụng `prisma.promotion.upsert()` để khởi tạo chương trình `Ưu đãi mùa picnic`, bao gồm tiêu đề, hình ảnh, đường dẫn đến trang sản phẩm, thời gian bắt đầu, kết thúc và trạng thái hoạt động.

Promotion sử dụng một `id` cố định trong điều kiện `where`, giúp nhận diện cùng một chương trình khi chạy seed lại.

Nếu bỏ bước này, cơ sở dữ liệu mới sẽ không có sẵn chương trình khuyến mãi mùa picnic, khiến giao diện lấy dữ liệu Promotion không thể hiển thị chương trình này nếu chưa được tạo bằng cách khác.

### 4. Chỗ khó nhất trong task: Lúc đầu sai ở đâu, sửa thế nào?

Phần khó nhất là tổ chức vị trí thực thi các thao tác seed voucher và Promotion trong file `seed.ts`.

Trong phiên bản chỉnh sửa ban đầu, phần bổ sung voucher và Promotion được đặt sau lệnh `await main().finally(() => prisma.$disconnect())`. Điều này khiến các thao tác mới nằm ngoài luồng seed chính và có nguy cơ chạy khi kết nối Prisma đã bị đóng.

Cách xử lý là đưa các thao tác `upsert` vào bên trong hàm `main()`, trước khi kết thúc hàm và gọi `prisma.$disconnect()`. Sau đó cần kiểm tra lại cấu trúc file, chạy seed và xác nhận dữ liệu trong cơ sở dữ liệu.

## Kết luận

Qua task này, hiểu cách sử dụng Prisma `upsert` để khởi tạo dữ liệu voucher và Promotion, phân biệt giảm giá theo phần trăm và số tiền cố định, đồng thời thiết lập điều kiện áp dụng, thời gian hiệu lực và giới hạn sử dụng.

Điểm quan trọng là bảo đảm quá trình seed có thể chạy lại mà không tạo bản ghi trùng, đồng thời giữ đúng thứ tự thực thi và quản lý kết nối cơ sở dữ liệu.
