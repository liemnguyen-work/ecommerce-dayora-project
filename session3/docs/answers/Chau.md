HW-P1-BD2-1.6 — Checklist kiến thức

Người thực hiện: Châu
Ngày thực hiện: 08/11/2026
Chủ đề: Buổi 3 — Dữ liệu sản phẩm, logic giỏ hàng và localStorage

## Câu 1. Nhóm tổ chức dữ liệu sản phẩm thế nào để các trang cùng dùng?

Nhóm tập trung danh sách sản phẩm trong file js/data/products.js. Các trang có thể sử dụng chung dữ liệu này, giúp tránh khai báo trùng lặp và dễ cập nhật thông tin sản phẩm.

## Câu 2. Thêm một sản phẩm đã có trong giỏ thì hàm xử lý thế nào?

Hàm addToCart() kiểm tra ID sản phẩm trong giỏ. Nếu sản phẩm đã tồn tại, hàm cộng thêm số lượng vào sản phẩm đó thay vì tạo một phần tử mới.

## Câu 3. Vì sao lưu giỏ bằng localStorage? Dữ liệu được khôi phục thế nào, dữ liệu hỏng thì sao?

localStorage giúp lưu giỏ hàng ngay trên trình duyệt để dữ liệu không mất khi tải lại trang. Hàm loadCart() đọc và chuyển dữ liệu JSON thành mảng; nếu dữ liệu bị lỗi hoặc không hợp lệ thì trả về mảng rỗng.

## Câu 4. Vì sao giỏ chỉ lưu id và quantity, không lưu tên và giá?

Giỏ hàng chỉ cần lưu ID để xác định sản phẩm và quantity để biết số lượng mua. Tên và giá được lấy từ products.js, giúp tránh lưu dữ liệu trùng lặp và hạn chế sai lệch khi thông tin sản phẩm thay đổi.

## Câu 5. Bước 1 (js/data/products.js): làm vậy để làm gì? Bỏ đi thì chức năng nào hỏng?

Bước 1 tạo danh sách sản phẩm làm nguồn dữ liệu chung cho website. Nếu bỏ file này, các chức năng cần thông tin sản phẩm như hiển thị danh sách, tra cứu sản phẩm và tính tiền sẽ không hoạt động đúng.

## Câu 6. Bước 2 (formatPrice): làm vậy để làm gì? Bỏ đi thì chức năng nào hỏng?

Hàm formatPrice() chuyển giá tiền thành định dạng tiền Việt Nam để người dùng dễ đọc. Nếu bỏ hàm này, các vị trí giao diện gọi formatPrice() có thể báo lỗi hoặc không hiển thị giá theo định dạng VND.

## Câu 7. Bước 3 (js/modules/cart.js): làm vậy để làm gì? Bỏ đi thì chức năng nào hỏng?

Bước 3 xây dựng saveCart() và loadCart() để lưu và đọc dữ liệu giỏ hàng bằng localStorage. Nếu bỏ các hàm này, những chức năng giỏ hàng phụ thuộc vào chúng sẽ không thể lưu hoặc khôi phục dữ liệu.

## Câu 8. Bước 4 (addToCart): làm vậy để làm gì? Bỏ đi thì chức năng nào hỏng?

Hàm addToCart() dùng để thêm sản phẩm mới vào giỏ hoặc cộng dồn số lượng nếu sản phẩm đã tồn tại. Nếu bỏ hàm này, chức năng thêm sản phẩm vào giỏ hàng sẽ không hoạt động.

## Câu 9. Bước 5 (updateQuantity): làm vậy để làm gì? Bỏ đi thì chức năng nào hỏng?

Hàm updateQuantity() dùng để thay đổi số lượng sản phẩm trong giỏ và đảm bảo số lượng tối thiểu là 1. Nếu bỏ hàm này, chức năng chỉnh sửa số lượng sản phẩm trong giỏ hàng sẽ không hoạt động.

## Câu 10. Chọn 1 lỗi bạn gặp trong bài: nguyên nhân là gì, sửa thế nào?

Khi kiểm tra trên Safari Console, tôi gặp lỗi SyntaxError: Unexpected token '.' do nhập thừa dấu chấm ở cuối lệnh addToCart(). Tôi xóa dấu chấm thừa và chạy lại lệnh đúng cú pháp để tiếp tục kiểm tra.
