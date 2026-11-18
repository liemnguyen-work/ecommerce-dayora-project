# PRJ-P2-PD-1 — Kiểm tra kiến thức đối chiếu giỏ hàng và thanh toán

- **Người thực hiện:** Đạt (PD)
- **Ngày thực hiện:** 19/11/2026
- **Nhánh:** `prj/p2-pd-1`

## Câu 1 — Vì sao cần đối chiếu giao diện giỏ hàng?

Việc này giúp tôi kiểm tra giỏ có sản phẩm, giỏ rỗng và cách bố cục thay đổi giữa desktop với mobile. Nếu bỏ qua, nhóm có thể không phát hiện các lỗi như thiếu số lượng trên biểu tượng giỏ, chữ khó đọc, CTA tương phản thấp hoặc giao diện mobile chưa thuận tiện.

## Câu 2 — Vì sao cần khảo sát trang thanh toán và đếm thao tác?

Việc đếm thao tác giúp đánh giá mức độ thuận tiện từ giỏ hàng đến đặt hàng, còn thử đổi tỉnh/thành giúp xác nhận phí giao và tổng tiền tự cập nhật đúng. Nếu bỏ qua, nhóm có thể không phát hiện form gây nhiều thao tác, địa chỉ nhập thiếu chuẩn hóa hoặc phí giao không phản hồi kịp thời.

## Câu 3 — Vì sao cần đánh giá câu chữ thông báo?

Thông báo cần cho người mua biết chuyện gì xảy ra, số tiền hoặc sản phẩm nào bị ảnh hưởng và họ phải làm gì tiếp theo. Nếu chỉ ghi “Không tìm thấy voucher” hoặc “Chưa đạt đơn tối thiểu”, người dùng hiểu nguyên nhân chung nhưng vẫn thiếu hướng xử lý và số liệu cụ thể.

## Câu 4 — Chỗ khó nhất trong task

Khó nhất là lúc bắt đầu bước thanh toán nhưng nhánh của tôi chưa có phần checkout mới. Tôi đã fetch, merge `origin/main`, tạo lại Prisma Client, kiểm tra migration, build API/web rồi mới chạy giao diện và tiếp tục đối chiếu; lỗi kết nối database ban đầu được kiểm tra và chạy lại thành công.

