# PRJ-P1-PD-1.1 — Nội dung trang Về chúng tôi

**Dự án:** DAYORA
**Người phụ trách:** PD Đạt
**Task:** PRJ-P1-PD-1.1
**Trạng thái:** PM Liêm đã duyệt nội dung

## 1. Câu chuyện thương hiệu DAYORA

### DAYORA — Gói trọn cuộc vui, mở trọn hành trình

DAYORA được xây dựng với mong muốn giúp mọi người chuẩn bị những chuyến đi trong ngày một cách đơn giản, tiện lợi và chủ động hơn.

Chúng tôi tin rằng một chuyến picnic hay một buổi dã ngoại trọn vẹn không nằm ở việc mang theo thật nhiều đồ dùng, mà ở việc lựa chọn đúng những món cần thiết cho từng hành trình.

Vì vậy, DAYORA hướng đến việc giúp khách hàng lựa chọn và tùy chỉnh đồ dùng phù hợp với số người, nhu cầu và đặc điểm chuyến đi, để dành nhiều thời gian hơn cho trải nghiệm và những người đồng hành.

## 2. Ba lời hứa thương hiệu

### 2.1. Vừa đủ cho chuyến đi

DAYORA hướng đến việc gợi ý các món đồ dựa trên loại chuyến đi và số lượng người tham gia. Khách hàng có thể bỏ những món đã có, tránh mua sắm dư thừa.

### 2.2. Giá minh bạch

Giá sản phẩm, voucher và phí vận chuyển được hướng đến hiển thị rõ ràng, đồng thời tính lại theo lựa chọn thực tế trước khi khách hàng xác nhận đơn hàng.

### 2.3. Tự do đổi món

Bộ sản phẩm gợi ý chỉ là điểm bắt đầu. Khách hàng có thể chủ động thay đổi mẫu mã và số lượng để phù hợp với nhu cầu cá nhân.

## 3. Đội ngũ phát triển DAYORA

DAYORA là dự án được xây dựng bởi nhóm 8 thành viên, phối hợp trong các mảng quản lý, thiết kế, phát triển phần mềm, kiểm thử và triển khai hệ thống.

| Thành viên | Vai trò | Trách nhiệm |
|---|---|---|
| Liêm | PM — Trưởng nhóm, Business Analyst | Quản lý tiến độ, phân tích yêu cầu và điều phối dự án |
| Đạt | PD — Product Designer (UI/UX) | Thiết kế giao diện, trải nghiệm người dùng và hệ thống thiết kế |
| Thành | FD1 — Frontend khách hàng | Phát triển giao diện website dành cho khách hàng |
| Phúc | FD2 — Frontend quản trị | Phát triển giao diện và chức năng quản trị |
| Hoàn | BD1 — Backend giao dịch | Phát triển API và xử lý nghiệp vụ khách hàng |
| Châu | BD2 — Backend dữ liệu, quản trị | Xây dựng cơ sở dữ liệu và chức năng quản trị |
| Ngọc | QA — Quality Assurance | Kiểm thử chức năng, phát hiện và theo dõi lỗi |
| Kiệt | DO — DevOps | Quản lý môi trường, tích hợp và triển khai hệ thống |

**Nguồn thông tin thành viên:** `docs/ROLES.md` của repo nhóm DAYORA.

## 4. Câu hỏi thường gặp (FAQ)

Trang Về chúng tôi sẽ tái sử dụng dữ liệu câu hỏi thường gặp từ:

`apps/web/src/components/home/HomeSections.tsx`

Mảng dữ liệu dự kiến: `faqs`, gồm:

- `q`: Nội dung câu hỏi.
- `a`: Nội dung câu trả lời.

**Trạng thái tích hợp:** Đang chờ module FAQ được đưa vào nhánh làm việc. Không tự tạo bộ FAQ riêng để tránh trùng lặp hoặc sai lệch dữ liệu với trang chủ.

## 5. Ghi chú triển khai

- Nội dung thương hiệu được chuẩn bị cho trang Về chúng tôi.
- Danh sách thành viên được đối chiếu với `docs/ROLES.md`.
- Ba lời hứa thương hiệu cần được trình bày thống nhất với thiết kế và chức năng thực tế của DAYORA.
- FAQ sẽ sử dụng lại dữ liệu chung khi module liên quan sẵn sàng.
- Giao diện React và CSS sẽ được thực hiện ở các sub-issue tiếp theo.

**Phê duyệt:** PM Liêm đã duyệt nội dung.