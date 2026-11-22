# Bản nháp tham khảo — Đạt

**AI soạn theo phân công dự kiến; chưa phải câu trả lời cá nhân, chưa được Đạt xác nhận.** Đề yêu cầu mỗi người tự trả lời và hiểu phần của mình. Hãy thay nội dung gợi ý bằng cách diễn đạt, ví dụ, kết quả kiểm tra và bằng chứng thực tế của bạn; không nhận phần việc chưa làm.

Vai trò theo kế hoạch: Thiết kế. Gợi ý khu vực để đối chiếu: Khu 8 của style.css: hover, transition và focus.

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

Trạng thái: **NHÁP — chờ Đạt tự hoàn thiện, xác nhận và giải thích**.
---

---

# Buổi 3 — Kiểm tra kiến thức HW-P1-PD-1.6

**Thành viên:** Đạt
**Vai trò:** PD — Product Designer
**Task:** HW-P1-PD-1.6
**Phần phụ trách:** Giao diện giỏ hàng và cập nhật số lượng trên biểu tượng giỏ.

### Câu 1. Những thành phần nào cần cập nhật khi số lượng sản phẩm thay đổi?

Khi tăng hoặc giảm số lượng, giao diện cần cập nhật số lượng của sản phẩm, thành tiền từng dòng, tổng số món và tổng tiền giỏ hàng. Đồng thời, số lượng trên biểu tượng giỏ hàng ở header cũng phải thay đổi tương ứng.

### Câu 2. Nếu giỏ hàng hiển thị đúng ở một trang nhưng sai ở trang khác, nhóm sẽ kiểm tra những phần nào?

Cần kiểm tra dữ liệu `localStorage`, khóa `cart`, thứ tự nạp các file JavaScript và các hàm đọc, lưu giỏ hàng. Ngoài ra, cần kiểm tra các trang có dùng chung nguồn dữ liệu và đăng ký sự kiện cập nhật giao diện đúng cách hay không.

### Câu 3. Sự kiện `cart:changed` giúp gì cho số trên biểu tượng giỏ?

Sự kiện `cart:changed` được phát ra khi dữ liệu giỏ hàng được lưu lại, giúp hàm `updateCartCountBadge()` cập nhật số lượng trên header mà không cần tải lại trang. Đối với thay đổi từ tab khác, hệ thống sử dụng thêm sự kiện `storage`.

### Câu 4. Bước 1 — Khung bảng giỏ trong `cart.html`: Làm vậy để làm gì? Bỏ đi thì chức năng nào hỏng?

Bước này tạo cấu trúc HTML để hiển thị danh sách sản phẩm, số lượng, đơn giá, thành tiền và phần tổng kết giỏ hàng. Nếu bỏ khung bảng, JavaScript sẽ không có các phần tử cần thiết để hiển thị nội dung giỏ và các thao tác trên trang sẽ không hoạt động đúng.

### Câu 5. Bước 2 — `renderCart()`: Làm vậy để làm gì? Bỏ đi thì chức năng nào hỏng?

Hàm `renderCart()` lấy dữ liệu giỏ hàng, tạo các dòng sản phẩm và cập nhật nội dung hiển thị, kể cả khi giỏ trống. Nếu bỏ hàm này, trang giỏ hàng sẽ không hiển thị hoặc làm mới danh sách sản phẩm khi dữ liệu thay đổi.

### Câu 6. Bước 3 — Nút tăng, giảm, xóa: Làm vậy để làm gì? Bỏ đi thì chức năng nào hỏng?

Các nút này cho phép người dùng điều chỉnh số lượng và xóa sản phẩm trực tiếp trong giỏ hàng. Nếu bỏ bước này, người dùng sẽ không thể thực hiện các thao tác đó trên trang giỏ, dù dữ liệu sản phẩm vẫn được lưu.

### Câu 7. Bước 4 — Tổng số lượng, tổng tiền: Làm vậy để làm gì? Bỏ đi thì chức năng nào hỏng?

Bước này tính tổng số món và tổng giá trị giỏ hàng dựa trên giá sản phẩm nhân với số lượng tương ứng. Nếu bỏ đi, khách hàng sẽ không xem được thông tin tổng kết chính xác để kiểm tra đơn hàng trước khi tiếp tục mua sắm hoặc thanh toán.

### Câu 8. Bước 5 — Số trên biểu tượng giỏ: Làm vậy để làm gì? Bỏ đi thì chức năng nào hỏng?

Bước này giúp biểu tượng giỏ hàng trên header luôn hiển thị tổng số sản phẩm đang có trong giỏ. Nếu bỏ đi, người dùng phải mở trang giỏ hàng để kiểm tra, đồng thời số lượng hiển thị trên các trang có thể không được đồng bộ.

### Câu 9. Chọn một lỗi đã gặp trong bài: Nguyên nhân là gì, sửa thế nào?

Khi kiểm tra giao diện ở màn hình tablet 768px, chữ “Xóa”, giá tiền và nhóm nút tăng/giảm bị xuống dòng do không đủ không gian hiển thị. Tôi đã điều chỉnh CSS bằng `white-space: nowrap`, sử dụng `inline-flex` cho nhóm nút và tối ưu khoảng đệm của bảng.