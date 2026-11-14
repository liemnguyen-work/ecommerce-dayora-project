# Báo cáo kiểm tra và tự đánh giá - PRJ-P1-FD1-1

## 1. API (`lib/api.ts`)
- **Mục đích:** Gom nhóm và quản lý các hàm gọi API hoặc cấu hình kết nối.
- **Ảnh hưởng nếu bỏ đi:** Các component gọi dữ liệu từ đây sẽ bị mất nguồn dữ liệu (undefined), gây lỗi hoặc không thể lấy dữ liệu từ server.

## 2. Router (`App.tsx`)
- **Mục đích:** Đóng vai trò là gốc của ứng dụng, thiết lập bộ định tuyến để gắn các URL với trang tương ứng.
- **Ảnh hưởng nếu bỏ đi:** Ứng dụng sẽ mất khả năng chuyển trang, không biết hiển thị component nào tương ứng với đường dẫn URL.

## 3. Header (`SiteHeader.tsx`)
- **Mục đích:** Thanh điều hướng ở đầu trang chứa logo, các mục menu, giỏ hàng và tài khoản, giúp người dùng di chuyển nhanh giữa các phần.
- **Ảnh hưởng nếu bỏ đi:** Người dùng sẽ mất các liên kết điều hướng nhanh ở đầu trang (dù vẫn còn một số liên kết ở footer), làm giảm tính tiện lợi khi duyệt web.

## 4. Footer và Motion
- **Footer:** Chứa thông tin thương hiệu, slogan, các liên kết nhanh và dòng bản quyền.
- **Motion:** Tạo sự sinh động cho giao diện. Việc hỗ trợ giảm chuyển động (`prefers-reduced-motion`) giúp người dùng nhạy cảm với chuyển động cảm thấy dễ chịu và an toàn hơn khi sử dụng.
- **Ảnh hưởng nếu bỏ đi:** Người dùng mất thông tin bổ sung, liên kết phụ và bản quyền ở cuối trang. Nếu bỏ hỗ trợ giảm chuyển động, người nhạy cảm với chuyển động có thể khó chịu vì các hiệu ứng vẫn chạy.

## 5. Cuộn và điều hướng
- **Giải quyết vấn đề:** Xử lý việc cuộn lên đầu trang khi chuyển trang, di chuyển đến đúng vị trí “Ba chuyến đi”, và duy trì hành vi ứng dụng một trang (SPA) mà không bị tải lại toàn bộ tài liệu.
- **Ảnh hưởng nếu bỏ đi:** Trải nghiệm chuyển trang sẽ bị đứt gãy (ví dụ: sang trang mới nhưng vẫn đứng ở vị trí đáy trang cũ), gây khó chịu cho người dùng.

## 6. Chỗ khó khăn nhất và cách xử lý
- **Khó khăn:** Lần tìm cách mở đúng ứng dụng React và kiểm tra hoạt động của mạng/console trong quá trình chạy thử (Network/Console).
- **Cách xử lý:** Kiên nhẫn kiểm tra lại đường dẫn port, cấu hình chạy ứng dụng và rà soát các lỗi hiển thị trên trình duyệt để fix từng bước.
