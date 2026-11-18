# Kiểm tra kiến thức — PRJ-P2-FD1-1

Người thực hiện: Thành

## 1. Viết hàm giỏ trong `cart.ts`

- [x] Bước 1 làm vậy để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: `cart.ts` là lớp giao tiếp dữ liệu, định nghĩa các kiểu của giỏ, gọi API lấy/thêm/sửa/xóa sản phẩm theo tài khoản và lưu tạm mã voucher vào `sessionStorage`. Nếu bỏ, giao diện không thể đồng bộ giỏ với backend, voucher bị mất khi chuyển trang và TypeScript thiếu các kiểu/hàm cần dùng.

## 2. Hiển thị giỏ trong `CartPage.tsx`

- [x] Bước 2 làm vậy để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: `CartPage.tsx` lấy dữ liệu từ các hàm API để hiển thị hình ảnh, giá, số lượng, voucher và gắn sự kiện cho các nút. Nếu bỏ, `/gio-hang` không có giao diện để khách xem, tăng/giảm hoặc xóa món và luồng kiểm tra giỏ không thể thực hiện.

## 3. Nối voucher và preview

- [x] Bước 3 làm vậy để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: API preview kiểm tra hạn dùng, lượt dùng, giá trị tối thiểu và trả số tiền giảm chính xác. Frontend không tự trừ 10% vì dữ liệu phía trình duyệt có thể bị sửa, không nắm trạng thái mới nhất và có thể làm tròn khác backend; nếu bỏ preview thì tổng tiền và kiểm tra voucher có thể sai.

## 4. Nối đường sang thanh toán

- [x] Bước 4 làm vậy để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Nút chỉ điều hướng từ bước kiểm tra giỏ sang `/thanh-toan`; trang sau lấy lại giỏ từ backend và mã voucher được giữ bằng `sessionStorage`. Nút bị khóa khi đang gửi request hoặc có `OUT_OF_STOCK`; giỏ trống không hiện khung thanh toán, còn voucher sai chỉ hiện lý do và không khóa nút.

## 5. Chỗ khó nhất

- [x] Lúc đầu sai ở đâu và sửa thế nào?

  Trả lời: Khó nhất là nối preview giữa frontend và backend: endpoint từng trả 404 do thiếu controller/module, CORS dùng sai cổng và giao diện chưa nói rõ tổng đã gồm phí giao. Tôi đăng ký lại route, sửa CORS và tách rõ tiền hàng, giảm voucher, phí giao cùng tổng dự kiến.

## 6. Câu hỏi vặn: giá khách đang thấy

- [x] Vì sao `expectedOf(cart)` gửi `unitPrice` nhưng server không dùng giá đó để tính tổng?

  Trả lời: `unitPrice` phía client chỉ để server đối chiếu và phát hiện giá đã thay đổi. Request có thể bị sửa bằng DevTools hoặc công cụ HTTP, nên server phải lấy giá hiện tại từ database để tính tổng và ngăn gian lận.

## 7. Câu hỏi vặn: nơi lưu dữ liệu

- [x] Voucher và giỏ được lưu ở đâu, vì sao không lưu giống nhau?

  Trả lời: Giỏ nằm trong database backend và gắn với tài khoản để dùng được trên nhiều thiết bị; mã voucher chỉ được giữ tạm trong `sessionStorage` cho phiên hiện tại. Điều kiện voucher vẫn phải được server kiểm tra lại vì thời hạn, lượt dùng và giá trị giỏ có thể thay đổi.

## Trạng thái kiểm tra

Thành đã tự trả lời và sửa các điểm chưa đúng sau khi được phản biện. Phần reviewer hỏi ngẫu nhiên và xác nhận giải thích trôi chảy vẫn đang chờ thực hiện.
