# Kiểm tra kiến thức — PRJ-P1-BD1-2

Người thực hiện: Hoàn

Tự trả lời bằng lời của mình, không xem lại code và không nhờ AI viết hộ. Mỗi câu trả lời 1–3 dòng; riêng câu 1 ghi một dòng cho mỗi ca. Đổi `[ ]` thành `[x]` khi tự hoàn thành.

## 1. Các ca kiểm thử

- [ ] Mỗi `it(...)` trong `catalog.spec.ts` kiểm tra điều gì? Viết một dòng cho mỗi ca.

  Trả lời:

  Tài liệu nêu các ca kiểm tra sau:

  1. Query mặc định và query hợp lệ được chuyển sang đúng kiểu dữ liệu.
  2. Query sai hoặc tham số không được hỗ trợ bị từ chối với lỗi 400.
  3. Chuỗi tìm kiếm trông giống SQL được truyền dưới dạng giá trị lọc của Prisma.
  4. Các bộ lọc từ khóa, nhóm, tình huống, chất liệu và trạng thái `ACTIVE` được gửi đúng.
  5. Các điều kiện giá, sức chứa hoặc kích thước phải cùng khớp trên một SKU.
  6. Giá giảm, kể cả bằng 0, được dùng để lọc và sắp xếp.
  7. Sản phẩm được sắp xếp theo giá nhỏ nhất của các SKU khớp; giá bằng nhau có thứ tự ổn định.
  8. Chi tiết sản phẩm trả đúng thông số, tồn khả dụng và sản phẩm liên quan.
  9. Slug không tồn tại hoặc sản phẩm đã ẩn trả lỗi 404.
  10. Danh mục chỉ chứa nhóm có sản phẩm và SKU hoạt động.
  11. Module khởi tạo với Prisma mock và controller chuyển đúng tham số.

  Tài liệu ghi tổng cộng **13 test**, nhưng phần hướng dẫn mình đọc chỉ nêu rõ **11 tên ca** như trên. Vì vậy, mình chưa thể khẳng định hai ca còn lại là gì hoặc file bạn viết có đúng các tên này không.

## 2. catalog-query.pipe.ts

- [ ] Bước 1 làm vậy để làm gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời:

  Pipe kiểm tra và chuyển tham số từ URL sang kiểu phù hợp: chẳng hạn chuyển giá từ chuỗi thành số, kiểm tra tình huống và kích thước hợp lệ. Nếu bỏ, dữ liệu sai có thể đi vào phần lọc, làm kết quả không chính xác; các test về query hợp lệ và không hợp lệ sẽ bị ảnh hưởng.

## 3. catalog.service.ts — danh sách

- [ ] Bước 2 làm vậy để làm gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời:

  Danh sách chỉ lấy sản phẩm và SKU đang hoạt động. Các điều kiện như giá và sức chứa phải thỏa mãn trên **cùng một SKU**, tránh lấy giá của biến thể nhỏ ghép với sức chứa của biến thể lớn. Từ khóa được đưa vào bộ lọc Prisma thay vì nối thành SQL; nếu xử lý sai, kết quả lọc và các test tương ứng sẽ không đúng.

## 4. Giá và sắp xếp

- [ ] Bước 3 dùng `salePrice ?? price`, kể cả giá 0, và sắp xếp theo giá nhỏ nhất của SKU khớp để làm gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời:

  `salePrice ?? price` dùng giá giảm khi có, kể cả khi giá giảm bằng **0**; chỉ dùng giá gốc khi giá giảm là `null` hoặc `undefined`. Sắp xếp theo giá nhỏ nhất của SKU **đã khớp bộ lọc** giúp thứ tự phản ánh đúng lựa chọn của khách; nếu làm sai, các test về giá giảm và thứ tự giá sẽ không đạt.

## 5. Chi tiết sản phẩm

- [ ] Bước 4 `GET /products/:slug` làm vậy để làm gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời:

  `GET /products/:slug` cung cấp thông tin chi tiết, tồn khả dụng và sản phẩm liên quan. Tồn khả dụng được tính từ hàng trong kho trừ hàng đã giữ, không trả trực tiếp hai số liệu nội bộ; sản phẩm không tồn tại hoặc đã ẩn trả 404. Nếu thiếu, trang chi tiết có thể hiển thị sai hoặc lộ dữ liệu tồn kho.

## 6. Danh mục hoạt động

- [ ] Bước 5 `GET /categories` chỉ trả nhóm có hàng ACTIVE để làm gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời:

  `GET /categories` chỉ trả danh mục có ít nhất một sản phẩm và SKU đang hoạt động, giúp khách không nhìn thấy nhóm hàng không có sản phẩm đang bán. Nếu bỏ điều kiện này, danh mục rỗng hoặc đã ngừng bán có thể xuất hiện và test lọc danh mục sẽ bị ảnh hưởng.

## 7. Điều khó nhất

- [ ] Chọn một chỗ khó nhất trong task: lúc đầu bạn sai ở đâu, sửa thế nào?

  Trả lời:

  **Tình huống mẫu:** Bạn có thể cân nhắc tình huống **lọc điều kiện trên cùng một SKU**: lúc đầu dễ hiểu nhầm rằng chỉ cần một SKU thỏa điều kiện giá và một SKU khác thỏa điều kiện sức chứa là đủ. Hướng sửa là kiểm tra tất cả điều kiện trên từng SKU, rồi chỉ giữ sản phẩm có ít nhất một SKU đáp ứng đồng thời.

  Đây là **tình huống mẫu**, mình không biết bạn thực sự đã gặp lỗi này hay chưa. Khi viết câu trả lời, bạn hãy chọn đúng vấn đề mình từng gặp và mô tả cách mình đã sửa nhé.
