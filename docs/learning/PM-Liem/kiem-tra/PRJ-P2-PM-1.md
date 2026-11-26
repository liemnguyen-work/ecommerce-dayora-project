# Kiểm tra kiến thức — PRJ-P2-PM-1

Tự trả lời bằng lời của mình, mỗi câu 1–3 dòng, không xem lại code.

- [x] Bước 1: Soạn tài liệu về luồng giỏ hàng và checkout để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Tài liệu giúp nhóm mô tả và thống nhất quy trình đặt hàng gồm 5 bước: xem giỏ hàng, nhập địa chỉ, nhập voucher, xem trước và đặt đơn. Nếu bỏ tài liệu thì website không tự hỏng, nhưng nhóm sẽ khó đối chiếu luồng xử lý và xác định lỗi khi kiểm thử giỏ hàng, voucher hoặc checkout.

- [x] Bước 2: Soạn quy tắc tính tiền, phí giao và điều kiện voucher để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Các quy tắc giúp nhóm xác định cách tính tổng tiền, phí giao hàng theo 3 khu vực và kiểm tra 6 điều kiện áp dụng voucher. Nếu thiếu tài liệu, nhóm sẽ khó đối chiếu kết quả kiểm thử; nếu chương trình xử lý sai quy tắc thì chức năng tính tiền, phí vận chuyển và áp dụng voucher có thể cho kết quả không chính xác.

- [x] Bước 3: Phân tích bảo mật tính giá trên server và xử lý tranh chấp tồn kho để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

  Trả lời: Phần phân tích giúp nhóm nhận diện rủi ro khi khách hàng tự thay đổi giá gửi lên hoặc nhiều khách cùng mua sản phẩm cuối cùng. Nếu bỏ phần báo cáo thì sẽ khó kiểm chứng và giải thích giải pháp bảo vệ; nếu thiếu cơ chế xử lý trong chương trình thì có thể xảy ra sai lệch giá thanh toán hoặc bán vượt tồn kho. Phần kiểm thử tranh tồn hiện mới dùng giả lập, chưa chứng minh trên hai giao dịch PostgreSQL thực tế.

- [x] Chỗ nào khó nhất trong task? Lúc đầu mình sai ở đâu và đã sửa thế nào?

  Trả lời: Mình thấy khó nhất là hiểu cách server kiểm tra giá sản phẩm và xử lý tồn kho khi nhiều khách đặt hàng cùng lúc. Ban đầu, mình chưa phân biệt rõ giữa giá hiển thị trên giao diện và giá thực tế dùng để thanh toán. Sau đó, mình đã trao đổi, tìm hiểu lại luồng checkout và kiểm tra cách xử lý giá, voucher cũng như số lượng tồn kho để hiểu rõ hơn các trường hợp có thể phát sinh lỗi.