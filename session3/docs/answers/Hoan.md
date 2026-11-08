# Bản nháp tham khảo — Hoàn

**AI soạn theo phân công dự kiến; chưa phải câu trả lời cá nhân, chưa được Hoàn xác nhận.** Đề yêu cầu mỗi người tự trả lời và hiểu phần của mình. Hãy thay nội dung gợi ý bằng cách diễn đạt, ví dụ, kết quả kiểm tra và bằng chứng thực tế của bạn; không nhận phần việc chưa làm.

Vai trò theo kế hoạch: Backend / HTML-CSS. Gợi ý khu vực để đối chiếu: product-detail.html: ảnh, thông số và lưới chi tiết.

## Câu 1 — Giải thích mã nguồn

- Đoạn HTML thực sự tham gia: [dẫn file và đoạn mã]. Thẻ [tên thẻ] có vai trò [tự giải thích].
- Đoạn CSS thực sự tham gia: [dẫn file và đoạn mã]. Ba thuộc tính cần giải thích: [1], [2], [3]; tác động lên giao diện: [tự mô tả].
- Nếu bạn chưa trực tiếp làm phần mã, hãy chọn phần bạn thực sự tham gia hoặc hỏi giảng viên/người phụ trách cách trình bày; không tự nhận mã của người khác.

## Câu 2 — Dự đoán thay đổi Grid

Gợi ý: `repeat(4, 1fr)` tạo bốn cột bằng nhau; đổi thành `repeat(2, 1fr)` làm còn hai cột, mỗi cột có thêm không gian và thẻ chuyển xuống các hàng tiếp theo.

- Dự đoán bằng lời của bạn: [tự viết trước khi thử].
- Cách thử và ảnh trước/sau: [tự thực hiện trên bản thử, ghi bằng chứng].
- Kết quả quan sát và so với dự đoán: [chưa thực hiện/chờ bổ sung].

## Câu 3 — Ảnh bị kéo giãn

Gợi ý: kiểm tra tỉ lệ thực của ảnh và kích thước khung. `object-fit: cover` có thể giữ tỉ lệ khi lấp đầy khung nhưng sẽ cắt phần ảnh; `contain` giữ toàn ảnh nhưng có thể để trống. Có thể cân nhắc chiều cao tự động tùy thiết kế.

- Phương án bạn chọn và lý do: [tự viết].
- Cách xác minh ảnh không bị méo: [tự thử, ghi kết quả].

## Câu 4 — Quyết định Grid hay Flexbox

- Khu vực bạn thực sự tham gia: [tên file và thành phần].
- Kỹ thuật đang dùng và lý do: [tự đối chiếu CSS].
- Trường hợp kỹ thuật còn lại phù hợp hơn: [tự nêu ví dụ].

## Câu 5 — Kiểm tra responsive 390 px

Gợi ý: mở DevTools, đặt viewport 390 px; kiểm tra phần tử rộng cố định, menu, ảnh, lưới và nội dung dài; xem phần tử nào vượt mép.

- Cách bạn kiểm tra: [tự mô tả].
- Trường hợp thực tế và kết quả: [chưa xác minh/chờ bổ sung].

## Câu 6 — Đánh giá AI

- Đề xuất AI thực sự liên quan công việc của bạn: [mô tả và dẫn mã mục trong log cá nhân].
- Bạn đã sử dụng, điều chỉnh hay loại bỏ? [tự xác nhận và giải thích].
- Bạn đã kiểm như thế nào, kết quả ra sao? [tự bổ sung minh chứng].
- Bài học rút ra: [tự viết].

Trạng thái: **NHÁP — chờ Hoàn tự hoàn thiện, xác nhận và giải thích**.

---

## Buổi 3 — Kiểm tra kiến thức HW-P1-BD1-1.5

### Câu 1: Làm thế nào để trang chi tiết xác định đúng sản phẩm từ URL?

Trang lấy mã sản phẩm (id) từ URL bằng `URLSearchParams`, sau đó tìm sản phẩm có id tương ứng trong danh sách dữ liệu sản phẩm để hiển thị.

### Câu 2: Mã sản phẩm không tồn tại hoặc không phải số thì trang xử lý thế nào?

Nếu URL thiếu `id`, mã sản phẩm không phải số hoặc không tồn tại trong dữ liệu, trang sẽ hiển thị thông báo không tìm thấy sản phẩm. Người dùng có thể quay lại danh sách để chọn sản phẩm khác.

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
