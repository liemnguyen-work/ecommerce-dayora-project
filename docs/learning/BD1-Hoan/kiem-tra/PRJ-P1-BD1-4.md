# Kiểm tra kiến thức — PRJ-P1-BD1-4

Người thực hiện: Hoàn

Tự trả lời bằng lời của mình, không xem lại code và không nhờ AI viết hộ. Mỗi câu trả lời 1–3 dòng; riêng câu 1 ghi một dòng cho mỗi ca. Đổi `[ ]` thành `[x]` khi tự hoàn thành.

## 1. Các ca kiểm thử

- [ ] Mỗi `it(...)` trong `me.spec.ts` kiểm tra điều gì? Viết một dòng cho mỗi ca.

  Trả lời:

  - Yêu cầu đăng nhập, khách không được vào admin: API hồ sơ từ chối người chưa đăng nhập; khách thường không được truy cập chức năng admin.
  - Xem và sửa hồ sơ: Lấy, cập nhật hồ sơ theo ID và không trả về `passwordHash`.
  - Đổi mật khẩu: Mật khẩu cũ sai bị từ chối; mật khẩu mới được băm trước khi lưu.
  - Không ghi đè khi mật khẩu thay đổi đồng thời: Khi mật khẩu đã được thay đổi trong lúc xử lý, lần cập nhật sau bị từ chối để tránh ghi đè.
  - Upsert lượt xem: Xem lại sản phẩm thì cập nhật thời gian, không tạo bản ghi trùng; sản phẩm ẩn hoặc không tồn tại không được ghi nhận.
  - Lấy tối đa 12 lượt xem: Trả về tối đa 12 sản phẩm còn hiển thị, mới xem gần đây nhất, với dữ liệu phù hợp để hiện thẻ sản phẩm.

## 2. DTO, controller và guard

- [ ] Bước 1 làm vậy để làm gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời:

  DTO kiểm tra dữ liệu gửi lên; controller tạo các API `/api/me`, còn guard yêu cầu đăng nhập trước khi truy cập. ID tài khoản được lấy từ phiên đã xác thực. Nếu thiếu, dữ liệu sai có thể được nhận hoặc người chưa đăng nhập có thể vào API hồ sơ; ca test “yêu cầu đăng nhập” sẽ hỏng.

## 3. Xem và cập nhật hồ sơ

- [ ] Bước 2 làm vậy để làm gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời:

  Chức năng này cho người dùng xem, sửa hồ sơ của chính mình và chỉ trả những trường cần thiết, không lấy `passwordHash`. Nếu bỏ phần chọn trường an toàn, API có nguy cơ trả cả hash mật khẩu; ca test “xem và sửa hồ sơ” sẽ hỏng.

## 4. Đổi mật khẩu

- [ ] Bước 3 làm vậy để làm gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời:

  Hệ thống kiểm tra mật khẩu hiện tại, sau đó băm mật khẩu mới trước khi lưu; việc cập nhật còn kiểm tra để tránh ghi đè nếu mật khẩu đã đổi đồng thời. Nếu bỏ, người khác có thể đổi mật khẩu khi đang cầm phiên đăng nhập, hoặc mật khẩu mới bị lưu ở dạng thô; ca test “đổi mật khẩu” sẽ hỏng.

## 5. Sản phẩm đã xem

- [ ] Bước 4 dùng `upsert`, bỏ qua sản phẩm không hiển thị và lấy lịch sử để làm gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời:

  `upsert` giúp xem lần đầu thì tạo lịch sử, xem lại thì cập nhật thời gian mà không bị trùng. Bỏ qua sản phẩm không còn hiển thị và chỉ lấy tối đa 12 lượt xem mới nhất giúp lịch sử hữu ích cho khách; nếu bỏ, API có thể lỗi khi xem lại hoặc hiện sản phẩm đã ẩn.

## 6. Điều khó nhất

- [ ] Chọn một chỗ khó nhất trong task: lúc đầu bạn sai ở đâu, sửa thế nào?

  Trả lời:

  Điều khó khăn là tôi băn khoăn không biết có cần dữ liệu thật trên Supabase hay tạo database trong task này để kiểm thử dữ liệu thực tế không. Sau đó tôi hiểu test dùng Prisma giả, task này không yêu cầu import dữ liệu; tôi có thể hỏi lại nhóm xem việc import dữ liệu được thực hiện ở phần nào.
