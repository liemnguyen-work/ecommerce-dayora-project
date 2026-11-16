# Kiểm tra kiến thức — PRJ-P1-FD1-4

Người trả lời: Thành. Codex ghi lại câu trả lời Thành cung cấp sau khi hỗ trợ bằng từ khóa gợi ý và góp ý.

## 1. ProductPage

Hệ thống lấy tham số `slug` trực tiếp từ URL để gọi API tải dữ liệu chi tiết sản phẩm. Nếu tìm thấy dữ liệu hợp lệ thì trang sẽ hiển thị thông tin sản phẩm, ngược lại sẽ hiện thông báo không tìm thấy.

## 2. Biến thể

Khi người dùng chọn một mã SKU, giao diện sẽ cập nhật đồng bộ hình ảnh, giá bán và số lượng tồn kho tương ứng, hoặc chuyển sang trạng thái hết hàng nếu tồn bằng 0. Nếu bỏ qua phần chọn biến thể, khách sẽ không chọn được đúng SKU mong muốn và có thể xem sai ảnh, giá hoặc tồn kho của sản phẩm đó.

## 3. Số lượng

Bộ chọn số lượng mặc định tối thiểu là 1 và bị giới hạn không vượt quá tồn kho thực tế hoặc mức tối đa 99. Mỗi khi người dùng chuyển sang chọn SKU khác, số lượng sẽ tự động đặt lại về 1.

## 4. Thông số và liên quan

Trang hiển thị bảng thông số kỹ thuật chi tiết để hỗ trợ người dùng cân nhắc chọn mua. Bên dưới là danh sách sản phẩm cùng nhóm được xây dựng bằng cách tái sử dụng thẻ sản phẩm thống nhất của hệ thống.

## 5. 390 px

Trên khung hình điện thoại 390 px, giao diện tự động chuyển sang bố cục một cột dọc để tránh tình trạng tràn ngang. Đồng thời, kích thước các nút thao tác cũng được căn chỉnh đủ lớn để người dùng dễ chạm.

## 6. Khó khăn

Do hai biến thể thật có cùng mức giá nên mình và Thành chưa thể quan sát giá thay đổi trực tiếp khi bấm chuyển đổi. Để kiểm tra, nhóm đã thử hiển thị từng SKU bằng dữ liệu giả lập, và ghi nhận rõ là chưa mô phỏng thao tác bấm đổi giá trực tiếp trên trình duyệt.

Ghi nhận thêm: Codex là người chạy kiểm tra hiển thị bằng dữ liệu giả lập.
