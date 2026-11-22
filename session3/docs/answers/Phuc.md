## Dữ liệu sản phẩm đi từ products.js lên giao diện qua những hàm nào?
Mảng products được truyền vào renderProducts(products). Hàm dùng map() tạo HTML, formatPrice() định dạng giá, join("") nối chuỗi và container.innerHTML đưa nội dung lên trang.

## Vì sao dùng map() và template literal thay cho viết tay 8 thẻ?
map() tạo một thẻ cho mỗi sản phẩm từ cùng một mẫu. Template literal cho phép chèn dữ liệu bằng ${...}, giúp giảm lặp và dễ hiển thị lại danh sách khi lọc.

## Vì sao gắn sự kiện một lần trên vùng chứa thay vì trên từng nút?
Khi vẽ lại bằng innerHTML, các nút cũ bị thay thế nhưng vùng chứa vẫn còn. Sự kiện click truyền lên vùng chứa nên bộ xử lý vẫn hoạt động với nút mới.

## Bước 1 làm để làm gì? Bỏ đi thì chức năng nào hỏng?
Vùng lưới là nơi nhận HTML do renderProducts() tạo từ dữ liệu. Sau khi xóa các thẻ viết tay, nếu thiếu vùng chứa hoặc không gọi hàm thì danh sách không hiển thị.

## Bước 2 làm để làm gì? Bỏ đi thì chức năng nào hỏng?
Thẻ hiển thị ảnh, tên, giá và link chi tiết đúng sản phẩm. Nếu link thiếu ?id=, trang chi tiết không nhận được ID qua tham số truy vấn để chọn sản phẩm tương ứng.

## Bước 3 làm để làm gì? Bỏ đi thì chức năng nào hỏng?
Bước này thông báo rõ khi không có sản phẩm phù hợp. Nếu bỏ, mảng rỗng làm lưới trắng; gọi hàm không truyền danh sách sẽ gây lỗi khi chạy list.map().

## Bước 4 làm để làm gì? Bỏ đi thì chức năng nào hỏng?
data-id xác định sản phẩm được bấm; bộ xử lý click đọc ID và gọi addToCart(id, 1). Nếu thiếu xử lý này, nút chỉ hiển thị mà không thêm sản phẩm vào giỏ.

## Một lỗi đã gặp: nguyên nhân và cách sửa?
Phúc có đặt list.map(...) ngoài hàm renderProducts, làm cho không truy cập được tham số list và sửa bằng cách chuyển đoạn tạo HTML và gán container.innerHTML vào trong hàm.