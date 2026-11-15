# Kiểm tra kiến thức — PRJ-P1-BD1-3

Người thực hiện: Hoàn

Tự trả lời bằng lời của mình, không xem lại code và không nhờ AI viết hộ. Mỗi câu trả lời 1–3 dòng; riêng câu 1 ghi một dòng cho mỗi ca. Đổi `[ ]` thành `[x]` khi tự hoàn thành.

## 1. Các ca kiểm thử

- [ ] Mỗi `it(...)` trong `promotions.spec.ts` kiểm tra điều gì? Viết một dòng cho mỗi ca.

  Trả lời:

  - Ca “lọc active”: Kiểm tra chỉ lấy ưu đãi đang bật, còn hiệu lực; dùng cùng một mốc thời gian để lọc, chỉ trả trường công khai và sắp xếp đúng thứ tự.
  - Ca “lấy thời gian mới mỗi request”: Kiểm tra mỗi lần gọi đều lấy thời gian hiện tại mới; nếu database báo lỗi thì service chuyển lỗi lên để hệ thống xử lý.
  - Ca “DI thật và GET /api/promotions”: Kiểm tra module và controller hoạt động với Prisma mock; khách chưa đăng nhập vẫn gọi API và nhận kết quả.

## 2. promotions.service.ts

- [ ] Bước 1 làm vậy để làm gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời:

  Tôi lọc ưu đãi đang bật và còn trong thời gian áp dụng, chỉ lấy dữ liệu cần hiển thị và sắp xếp cố định. Nếu bỏ bước này, banner có thể hiện ưu đãi hết hạn hoặc chưa bắt đầu; ca test “lọc active” sẽ không đạt.

## 3. Thời gian cho mỗi request

- [ ] Bước 2 lấy `new Date()` mới ở mỗi request để làm gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời:

  Tôi đặt `new Date()` trong hàm lấy danh sách để mỗi request kiểm tra ưu đãi theo thời gian mới nhất. Nếu chỉ lấy thời gian lúc khởi động server, ưu đãi mới có thể không xuất hiện và ưu đãi hết hạn vẫn còn hiển thị; ca test “lấy thời gian mới mỗi request” sẽ không đạt.

## 4. API ưu đãi công khai

- [ ] Bước 3 tạo controller và module cho `GET /promotions` để làm gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời:

  Tôi tạo controller để nhận yêu cầu `GET /api/promotions` và module để đăng ký chức năng này với ứng dụng. Nếu thiếu, frontend không gọi được API hoặc nhận lỗi 404; ca test gọi API công khai sẽ không đạt.

## 5. Điều khó nhất

- [ ] Chọn một chỗ khó nhất trong task: lúc đầu bạn sai ở đâu, sửa thế nào?

  Trả lời:

  Tôi gặp khó khăn khi schema của ưu đãi (`Promotion`) khác với yêu cầu task: schema không có `subtitle`, dùng `linkUrl` thay vì `link`, và có ngày bắt đầu, ngày kết thúc cho phép `null`. Tôi đã trao đổi với nhóm và thống nhất giữ schema hiện tại; đầu thời gian nào là `null` thì ưu đãi không bị giới hạn ở đầu đó.

  Ghi chú: Câu này được Codex hỗ trợ bổ sung và chỉnh thuật ngữ theo yêu cầu của Hoàn; Hoàn cần xem lại và tự diễn đạt để đáp ứng yêu cầu tự đánh giá của task.
