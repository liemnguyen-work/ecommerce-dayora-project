# Kiểm tra kiến thức — PRJ-P1-BD1-1

Người thực hiện: Hoàn

Tự trả lời bằng lời của mình, không xem lại code và không nhờ AI viết hộ câu trả lời. Mỗi câu viết ngắn gọn từ 1–3 dòng; sau khi hoàn thành, đổi `[ ]` thành `[x]`.

## 1. Các ca kiểm thử

- [ ] Mỗi `it(...)` trong `auth.spec.ts` kiểm tra điều gì? Viết một dòng cho mỗi ca.

  Trả lời:

Theo **tài liệu hướng dẫn**, các ca test dự kiến kiểm tra:

- **Mật khẩu:** Cùng một mật khẩu được băm hai lần cho kết quả khác nhau nhờ salt ngẫu nhiên; kiểm tra mật khẩu đúng, sai và dữ liệu hash sai định dạng.
- **JWT:** Không cho khởi tạo khi thiếu khóa bí mật; từ chối token hết hạn, sai chữ ký hoặc bị chỉnh sửa.
- **Đăng ký:** Chuẩn hóa email, từ chối email đã tồn tại, kể cả khi hai yêu cầu đăng ký được gửi đồng thời.
- **DTO:** Kiểm tra email được cắt khoảng trắng, chuyển thành chữ thường và từ chối mật khẩu quá ngắn.
- **Đăng nhập:** Email không tồn tại, mật khẩu sai và tài khoản bị khóa đều nhận cùng thông báo lỗi.
- **Guard:** Kiểm tra cookie, trạng thái hoạt động của tài khoản và quyền truy cập của người dùng.

Đây là các ca được nêu trong **hướng dẫn**, chưa chắc là toàn bộ `it(...)` trong file bạn đã viết. Để trả lời chính xác “mỗi `it(...)`”, bạn cần đối chiếu sau khi hoàn thành phần tự kiểm tra, hoặc gửi file `auth.spec.ts` để mình giúp bạn kiểm tra các ca còn thiếu.

## 2. password.ts

- [ ] Bước 1 làm gì, nhằm mục đích gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Ý cần hiểu: mật khẩu được băm bằng **scrypt** với salt ngẫu nhiên; khi đăng nhập, hệ thống tính lại hash và so sánh an toàn. Nếu bỏ bước này, mật khẩu không được xử lý đúng để lưu và xác minh; ca test về **random salt và xác thực mật khẩu** cũng không đạt.

## 3. auth.service.ts

- [ ] Bước 2 làm gì, nhằm mục đích gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Ý cần hiểu: bước này tạo và kiểm tra **JWT** bằng khóa bí mật, đồng thời kiểm tra thời hạn token. Nếu bỏ kiểm tra, token giả hoặc hết hạn có thể được chấp nhận; ca test về **token hết hạn hoặc sai chữ ký** sẽ thất bại.

## 4. auth.dto.ts

- [ ] Bước 3 làm gì, nhằm mục đích gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Ý cần hiểu: DTO kiểm tra dữ liệu đăng ký và đăng nhập, ví dụ định dạng email, mật khẩu tối thiểu 8 ký tự; email còn được chuẩn hóa về chữ thường. Bước này cũng xử lý email trùng trong chức năng đăng ký. Nếu thiếu, dữ liệu sai có thể được chấp nhận hoặc lỗi đăng ký trùng có thể xử lý không đúng; các test **DTO và duplicates** sẽ bị ảnh hưởng.

## 5. login

- [ ] Bước 4 làm gì, nhằm mục đích gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Ý cần hiểu: hệ thống kiểm tra email, mật khẩu và trạng thái tài khoản; cả ba trường hợp không hợp lệ đều trả cùng lỗi 401. Cách này hạn chế việc người khác dò xem email nào đã đăng ký. Nếu bỏ, đăng nhập sai có thể được xử lý không an toàn và test **same message** không đạt.

## 6. auth.guard.ts

- [ ] Bước 5 làm gì, nhằm mục đích gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Ý cần hiểu: `JwtAuthGuard` đọc token từ cookie, xác thực người dùng và kiểm tra tài khoản còn hoạt động; `RolesGuard` kiểm tra người đó có quyền vào chức năng hay không. Nếu thiếu, các API cần bảo vệ có thể bị truy cập trái phép và test **admin roles** bị ảnh hưởng.

## 7. auth.controller.ts

- [ ] Bước 6 làm gì, nhằm mục đích gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Ý cần hiểu: controller tiếp nhận các yêu cầu đăng ký, đăng nhập, đăng xuất và lấy thông tin người dùng; gọi service xử lý và quản lý cookie đăng nhập. Nếu bỏ hoặc cấu hình sai, frontend có thể không gọi được các API xác thực hoặc không duy trì được phiên đăng nhập.

## 8. Điều khó nhất

- [ ] Chọn một chỗ khó nhất trong task: lúc đầu bạn sai ở đâu, sửa thế nào?

  Trả lời: Khi merge nhánh, tôi gặp khó khăn vì CI trên GitHub báo lỗi không tìm thấy Prisma Client, dù test chạy được trên máy. Nguyên nhân là môi trường CI chưa sinh Prisma Client trước khi chạy test. Hướng khắc phục là bổ sung bước sinh Prisma Client sau khi cài dependency và trước bước test trong cấu hình CI.
