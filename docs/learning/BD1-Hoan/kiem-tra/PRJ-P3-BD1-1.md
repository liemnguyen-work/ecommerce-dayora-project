# Kiểm tra kiến thức — PRJ-P3-BD1-1

Người thực hiện: Hoàn

Tự trả lời bằng lời của mình, không xem lại code và không nhờ AI viết hộ. Mỗi câu trả lời 1–3 dòng; riêng câu 1 ghi một dòng cho mỗi ca. Đổi `[ ]` thành `[x]` khi tự hoàn thành.

## 1. Các ca kiểm thử

- [x] Mỗi `it(...)` trong `vnpay.spec.ts` kiểm tra điều gì? Viết một dòng cho mỗi ca.

  - Ca 1 kiểm tra sắp xếp, mã hóa tham số và tạo chữ ký theo kết quả mẫu; đồng thời kiểm tra chữ ký hợp lệ, dữ liệu bị sửa và khóa bí mật sai.
  - Ca 2 kiểm tra hệ thống từ chối chữ ký thiếu hoặc sai định dạng, và từ chối tham số VNPay không phải kiểu chuỗi.
  - Ca 3 kiểm tra thời gian được chuyển sang giờ Việt Nam chính xác, kể cả khi chuyển sang ngày hoặc năm mới.

## 2. Sắp xếp và mã hóa tham số

- [x] Bước 1 làm vậy để làm gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Tôi sắp xếp và mã hóa tham số theo cùng một quy tắc để tạo chuỗi dữ liệu thống nhất trước khi ký. Nếu bỏ hoặc làm sai, chữ ký có thể không khớp và ca test “mã hóa sắp xếp và ký đúng vector cố định” sẽ hỏng.

## 3. Ký và kiểm chữ ký

- [x] Bước 2 làm vậy để làm gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Tôi tạo chữ ký bằng khóa bí mật và kiểm tra lại chữ ký khi nhận dữ liệu để phát hiện thông tin bị sửa hoặc chữ ký không hợp lệ. Nếu bỏ, hệ thống có thể tin vào dữ liệu bị giả mạo; hai ca test đầu sẽ bị ảnh hưởng.

## 4. Giờ Việt Nam

- [x] Bước 3 dùng giờ Việt Nam độc lập múi giờ máy chủ để làm gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Tôi chuyển thời gian sang giờ Việt Nam để dữ liệu gửi đến VNPay luôn đúng dù máy chủ dùng múi giờ nào. Nếu bỏ, thời gian giao dịch có thể bị lệch; ca test thứ ba, đặc biệt các trường hợp sang ngày hoặc năm mới, sẽ hỏng.

## 5. Điều khó nhất

- [x] Chọn một chỗ khó nhất trong task: lúc đầu bạn sai ở đâu, sửa thế nào?

  Tôi gặp khó khăn khi tìm file `vnpay.ts` vì file nằm trong worktree ở một thư mục khác. Tôi lo thành viên khác sẽ không thấy file, nhưng sau khi tìm hiểu tôi biết họ có thể lấy code từ nhánh đã push; nếu cập nhật qua `main` thì cần chờ PR được merge.
