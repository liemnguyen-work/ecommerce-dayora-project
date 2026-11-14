
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

# Kiểm tra kiến thức — HW-P1-QA-1.6

## 1. Giỏ hàng đúng ở một trang nhưng sai ở trang khác

Mình sẽ so sánh dữ liệu trong khóa `cart` với số lượng và sản phẩm hiển thị ở hai trang. Nếu dữ liệu lưu đã đúng mà một trang vẫn hiện sai, mình sẽ kiểm tra cách trang đó đọc giỏ và cập nhật giao diện sau khi thêm hoặc xóa sản phẩm.

## 2. Kiểm tra đoạn mã do AI đề xuất

Mình đọc xem đoạn mã thay đổi gì, rồi chạy thử cả trường hợp bình thường lẫn trường hợp biên. Ví dụ với giỏ hàng, mình thử thêm một món, tải lại trang và thử dữ liệu giỏ bị hỏng để xem kết quả có đúng như mong đợi không.

## 3. Dùng Chrome DevTools để kiểm tra JavaScript và `localStorage`

Mình mở **Console** để xem thông báo lỗi và bấm vào tên file, số dòng nếu cần tìm chỗ phát sinh lỗi. Để xem dữ liệu giỏ, mình vào **Application → Local Storage**, chọn đúng địa chỉ trang đang chạy rồi xem khóa `cart`.

## 4. Vì sao cần lập danh sách ca kiểm thử?

Mình lập `kiem-thu.md` để biết trước cần thử gì, thao tác ra sao và kết quả nào được tính là đạt. Nếu chỉ bấm thử theo luồng mua hàng bình thường, mình dễ quên các ca như mở trang chi tiết với ID sản phẩm không tồn tại.

## 5. Vì sao cần chạy kiểm thử chức năng và ghi kết quả thực tế?

Mình chạy từng ca rồi ghi lại điều thực sự xảy ra để đối chiếu với kết quả mong đợi. Chẳng hạn khi thử dữ liệu giỏ hỏng, trang vẫn hiện giỏ trống nhưng Console có cảnh báo. Nếu chỉ nhìn giao diện, mình sẽ bỏ qua chi tiết đó.

## 6. Vì sao cần kiểm tra giao diện ở ba kích thước và lưu ảnh?

Mình kiểm tra 5 trang ở 1366, 768 và 390 px vì cùng một trang có thể hiển thị ổn ở kích thước này nhưng bị lệch ở kích thước khác. Lỗi nút **Xóa** bị ngắt chữ ở 768 px là ví dụ mình phát hiện được khi thử trên tablet, và ảnh giúp Đạt nhìn thấy đúng hiện tượng.

## 7. Vì sao cần kiểm tra tích hợp?

Mình muốn biết các trang có cập nhật giỏ nhất quán khi dùng chung dữ liệu không. Mình đã mở hai tab, thêm hàng ở một tab rồi xem tab giỏ hàng có tự cập nhật số lượng không. Nếu thử từng trang riêng, mình dễ bỏ sót lỗi đồng bộ này.

## 8. Vì sao cần lập danh sách lỗi?

Mình ghi bước tái hiện, ảnh, người phụ trách và trạng thái để theo dõi lỗi từ lúc phát hiện đến lúc kiểm tra lại. Với `BUG-01`, mình báo Đạt rồi thử lại trên bản sửa trước khi cập nhật trạng thái. Nếu chỉ nhắn báo lỗi, sau đó rất dễ quên mình đã xác nhận bản sửa hay chưa.

## 9. Một lỗi đã gặp, nguyên nhân và cách sửa

Ở 768 px, chỗ hiển thị giá và các nút trong bảng giỏ bị chật nên ký hiệu `₫`, chữ **Xóa** và nút tăng giảm bị tách dòng. Đạt chỉnh bố cục bảng cho tablet. Mình chạy lại ở 768 × 1024 px và thấy cả ba chỗ đều hiển thị đúng.