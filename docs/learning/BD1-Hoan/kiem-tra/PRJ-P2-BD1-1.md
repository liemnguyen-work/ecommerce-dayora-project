# Kiểm tra kiến thức — PRJ-P2-BD1-1

Người thực hiện: Hoàn

## 1. Các ca kiểm thử

- [x] Mỗi `it(...)` trong `pricing.spec.ts` kiểm tra điều gì? Viết một dòng cho mỗi ca.

  Trả lời:

  1. Kiểm tra ví dụ charter cho ra đúng tiền hàng, tiền giảm, phí và tổng thanh toán.
  2. Kiểm tra giá sale và số lượng; voucher được áp sau khi tính sale và không giảm vào phần phí.
  3. Kiểm tra mức giảm phần trăm không vượt trần; mức giảm cố định không vượt quá tiền hàng và giá sale bằng 0 vẫn được chấp nhận.
  4. Kiểm tra voucher chưa bắt đầu hoặc đã hết hạn không được áp dụng.
  5. Kiểm tra phép tính vượt giới hạn số an toàn ở từng dòng hàng hoặc tổng giỏ bị từ chối.

## 2. Ví dụ charter

- [x] Bước 1 làm vậy để làm gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Ví dụ charter là mốc tính giá đã được nhóm thống nhất để đối chiếu kết quả. Nếu bỏ, phép tính có thể vẫn chạy nhưng sai quy tắc chung mà không bị phát hiện; ca test theo ví dụ charter sẽ không đạt.

## 3. Giá sale, số lượng và voucher

- [x] Bước 2 tính theo sale, số lượng, voucher sau sale và phí ngoài voucher để làm gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Tôi tính tiền từng dòng theo giá đang áp dụng nhân với số lượng, rồi mới áp voucher lên tiền hàng; phí được cộng sau và không thuộc phần được giảm. Nếu đảo thứ tự hoặc giảm cả phí, số tiền khách phải trả sẽ sai và các test tính giỏ hàng, voucher sẽ hỏng.

## 4. Trần giảm giá và sale 0

- [x] Bước 3 áp trần, giới hạn giảm cố định không vượt tiền hàng và chấp nhận sale 0 để làm gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Trần ngăn voucher phần trăm giảm quá mức cho phép; giảm cố định không được lớn hơn tiền hàng để tổng không thành số âm. Giá sale 0 vẫn là giá hợp lệ, nên không được tự đổi về giá gốc; bỏ các kiểm tra này sẽ làm sai các ca test giới hạn giảm giá.

## 5. Hiệu lực voucher

- [x] Bước 4 kiểm tra hiệu lực voucher theo thời gian để làm gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Tôi kiểm tra thời điểm hiện tại có nằm trong thời gian voucher được phép sử dụng hay không. Nếu bỏ, voucher chưa bắt đầu hoặc đã hết hạn vẫn có thể giảm tiền; test về hiệu lực thời gian sẽ hỏng.

## 6. Kiểm tra overflow

- [x] Bước 5 phát hiện overflow từng dòng và tổng giỏ để làm gì? Nếu bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Tôi kiểm tra cả tiền của từng dòng và tổng giỏ có vượt giới hạn số nguyên an toàn hay không. Nếu bỏ, phép tính với giá hoặc số lượng rất lớn có thể cho kết quả sai mà hệ thống vẫn dùng để tính tiền; test overflow sẽ hỏng.

## 7. Điều khó nhất

- [x] Chọn một chỗ khó nhất trong task: lúc đầu bạn sai ở đâu, sửa thế nào?

  Trả lời: Điều khó nhất của tôi là xác định test tính giá có cần tạo voucher thật trong database hay không, đồng thời các quy luật voucher nhóm đề xuất đã được chốt chưa. Sau khi viết và push test, tôi kiểm tra lại cách test dùng dữ liệu giả và trao đổi với nhóm để xác nhận quy tắc; việc nhập dữ liệu voucher thật không thuộc task này.
