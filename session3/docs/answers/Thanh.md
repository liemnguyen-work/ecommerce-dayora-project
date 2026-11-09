# Bản nháp tham khảo — Thành

**AI soạn theo phân công dự kiến; chưa phải câu trả lời cá nhân, chưa được Thành xác nhận.** Đề yêu cầu mỗi người tự trả lời và hiểu phần của mình. Hãy thay nội dung gợi ý bằng cách diễn đạt, ví dụ, kết quả kiểm tra và bằng chứng thực tế của bạn; không nhận phần việc chưa làm.

Vai trò theo kế hoạch: Frontend. Gợi ý khu vực để đối chiếu: index.html: header, banner và các thẻ nổi bật.

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

Trạng thái: **NHÁP — chờ Thành tự hoàn thiện, xác nhận và giải thích**.

## Buổi 3 — Kiểm tra kiến thức HW-P1-FD1-1.6

### Câu 3 — Danh sách danh mục

Danh sách danh mục lấy từ `category` trong dữ liệu sản phẩm; viết tay thì tốn công. Thành nhớ lại nguồn sau khi AI gợi ý. Như Thành giải thích ở câu 5, khi thêm hoặc đổi danh mục thì ô chọn tự cập nhật.

### Câu 1 — Trình tự tìm kiếm và lọc

Sản phẩm gốc, rồi đến lọc sản phẩm, rồi đến tìm kiếm; cuối cùng là sắp xếp theo thứ tự theo yêu cầu.

### Câu 2 — Vì sao không sắp xếp trực tiếp `products`

Vì có nhiều phần khác sử dụng mảng này; nếu sắp xếp trực tiếp sẽ ảnh hưởng thứ tự, còn tạo bản sao thì giữ được thứ tự gốc.

### Câu 4 — Thanh công cụ

Giúp khách hàng tìm sản phẩm, lọc theo nhu cầu; nếu bỏ đi thì chức năng tìm kiếm sản phẩm sẽ bị ảnh hưởng.

### Câu 5 — Danh sách danh mục tạo từ dữ liệu

Danh sách danh mục được tạo từ dữ liệu sản phẩm để khi thêm hoặc đổi danh mục thì ô chọn tự cập nhật và không bị trùng. Nếu bỏ bước này thì ô danh mục chỉ hiện lựa chọn Tất cả danh mục, nên người dùng không chọn được từng danh mục để lọc sản phẩm.

### Câu 6 — Tìm theo tên

Đưa từ khóa về chữ thường và bỏ khoảng trắng hai đầu để dễ tìm kiếm. Nếu bỏ, chữ viết hoa dù cùng nghĩa có thể không được chấp nhận và bị bỏ sót sản phẩm.

### Câu 7 — Sắp xếp trên bản sao

Sắp xếp giá trên bản sao để giữ nguyên thứ tự ban đầu của danh sách sản phẩm. Nếu sắp xếp trực tiếp thì mảng gốc bị thay đổi thứ tự và có thể ảnh hưởng đến những chức năng khác dùng danh sách đó.

### Câu 8 — `applyFilters()`

Áp dụng quy trình từ sản phẩm gốc, lọc danh mục, tìm kiếm rồi sắp xếp theo giá. Nếu bỏ thì khách hàng khó tìm sản phẩm phù hợp và mất thời gian hơn.

### Câu 9 — Một lỗi đã gặp

Lúc kiểm tra Git tôi thấy không có file nào thay đổi dù tôi đã thêm thanh công cụ và CSS. Nguyên nhân là tôi chưa lưu các file sau khi chỉnh sửa. Tôi nhấn Ctrl+S để lưu lại rồi kiểm tra Git thì thấy hai file đã được thay đổi.
