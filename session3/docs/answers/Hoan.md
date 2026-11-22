## Buổi 3 — Kiểm tra kiến thức HW-P1-BD1-1.5

### Câu 1: Làm thế nào để trang chi tiết xác định đúng sản phẩm từ URL?

Trang lấy mã sản phẩm (id) từ URL bằng `URLSearchParams`, sau đó tìm sản phẩm có id tương ứng trong danh sách dữ liệu sản phẩm để hiển thị.
Trong `session3/js/modules/product-detail.js`, hàm `getProductIdFromUrl()` đọc id, sau đó `renderProductDetail()` dùng `getProductById(id)` để tìm sản phẩm.

### Câu 2: Mã sản phẩm không tồn tại hoặc không phải số thì trang xử lý thế nào?

Nếu URL thiếu `id`, mã sản phẩm không phải số hoặc không tồn tại trong dữ liệu, trang sẽ hiển thị thông báo không tìm thấy sản phẩm. Người dùng có thể quay lại danh sách để chọn sản phẩm khác.
Trong `session3/js/modules/product-detail.js`, nhánh `if (!product)` hiển thị thông báo và liên kết quay lại danh sách sản phẩm.

### Câu 3: Một trang chi tiết hiển thị được nhiều sản phẩm nhờ đâu?

Nhờ sử dụng chung một trang HTML và lấy id sản phẩm từ URL. Mỗi id sẽ tương ứng với một sản phẩm khác nhau trong dữ liệu.

### Câu 4: Bước 1 — Đọc id từ URL và đổi sang số để làm gì? Bỏ đi thì chức năng nào hỏng?

Bước này giúp lấy đúng mã sản phẩm từ URL và chuyển về kiểu số để so sánh với id trong dữ liệu. Nếu bỏ đi, trang không xác định được sản phẩm cần hiển thị.

### Câu 5: Bước 2 — Hiển thị thông tin sản phẩm vào khung HTML để làm gì? Bỏ đi thì chức năng nào hỏng?

Bước này giúp đưa thông tin của sản phẩm được chọn lên giao diện chi tiết. Nếu bỏ đi, trang có thể xác định được sản phẩm nhưng không hiển thị thông tin cho người dùng.

### Câu 6: Bước 3 — Xử lý mã không tồn tại để làm gì? Bỏ đi thì chức năng nào hỏng?

Bước này giúp xử lý trường hợp không tìm thấy sản phẩm bằng cách hiển thị thông báo và cung cấp đường quay lại danh sách. Nếu bỏ đi, vùng chi tiết sẽ bị rỗng khiến người dùng không biết chuyện gì xảy ra.

### Câu 7: Bước 4 — Chọn số lượng và gọi addToCart để làm gì? Bỏ đi thì chức năng nào hỏng?

Bước này cho phép người dùng chọn số lượng sản phẩm và thêm sản phẩm vào giỏ hàng. Nếu bỏ đi, người dùng không thể thêm sản phẩm từ trang chi tiết vào giỏ hàng.

### Câu 8: Chọn một lỗi bạn gặp trong bài: nguyên nhân là gì, sửa thế nào?

Khi URL thiếu tham số `id`, hàm lấy giá trị trả về `null`. Sau khi thêm `?id=3` vào URL, hàm trả về giá trị `3`, giúp trang xác định đúng mã sản phẩm.
