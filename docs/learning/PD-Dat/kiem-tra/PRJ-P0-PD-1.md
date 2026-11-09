# PRJ-P0-PD-1.6 — Kiểm tra kiến thức

**Người thực hiện:** Đạt (PD)
**Task:** PRJ-P0-PD-1 — Design token + font

## Câu 1 — Bước 1: Đọc tài liệu thiết kế mẫu

**Câu hỏi:** Làm vậy để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

Đọc tài liệu thiết kế mẫu giúp xác định hệ màu, font chữ, khoảng cách và phong cách giao diện trước khi triển khai. Nếu bỏ bước này, ứng dụng vẫn có thể chạy nhưng giao diện dễ sử dụng sai quy chuẩn, thiếu nhất quán và khó đối chiếu với bản thiết kế chung.

## Câu 2 — Bước 2: Khai báo biến thiết kế trong `apps/web/src/index.css`

**Câu hỏi:** Làm vậy để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

Khai báo các design token trong `@theme` giúp quản lý tập trung 5 màu Paper, Ink, Butter, Berry, Leaf và font chữ. Nếu bỏ bước này, các utility Tailwind như `bg-paper`, `text-ink` không được tạo đúng, làm giao diện mất màu sắc và kiểu chữ theo quy chuẩn DAYORA.

## Câu 3 — Bước 3: Cài đặt và import Be Vietnam Pro

**Câu hỏi:** Làm vậy để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

Cài `@fontsource/be-vietnam-pro` và import các độ đậm 400, 600, 800 trong `main.tsx` giúp website sử dụng font tiếng Việt thống nhất. Nếu bỏ bước này, trình duyệt sẽ chuyển sang font dự phòng khi không có nguồn font phù hợp, khiến giao diện không còn đúng hệ thiết kế.

## Câu 4 — Bước 4: Dựng trang mẫu trong `apps/web/src/App.tsx`

**Câu hỏi:** Làm vậy để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

Trang mẫu hiển thị 5 ô màu, 3 cỡ chữ và nút CTA Berry nhằm kiểm tra trực quan các token, độ tương phản và bố cục responsive. Nếu bỏ bước này, nhóm sẽ thiếu trang kiểm tra trực quan để phát hiện sai lệch về màu sắc, font và khả năng hiển thị trước khi triển khai giao diện chính.

## Câu 5 — Bước 5: Soạn tài liệu `design/DESIGN-SYSTEM.md` của nhóm

**Câu hỏi:** Làm vậy để làm gì? Bỏ đi thì test hoặc chức năng nào hỏng?

Tài liệu Design System thống nhất quy định về màu sắc, font chữ, khoảng cách, bo góc và trạng thái tương tác để các thành viên sử dụng chung. Nếu bỏ tài liệu, website không nhất thiết bị lỗi kỹ thuật nhưng nhóm dễ triển khai giao diện không đồng bộ và khó kiểm tra tính nhất quán.

## Câu 6 — Chọn một chỗ khó nhất trong task: Lúc đầu sai ở đâu, sửa thế nào?

Khó khăn là CSS mặc định ban đầu còn giới hạn chiều rộng của `#root` và có thể ảnh hưởng màu giao diện khi hệ thống bật dark mode. Phần CSS đã được điều chỉnh để trang mẫu sử dụng đúng không gian hiển thị và giữ nguyên bảng màu DAYORA. Theo kết quả kiểm tra Firefox đã ghi nhận trong AI Log, giao diện hiển thị đúng ở viewport 1366px và 390px, kể cả khi thiết bị bật chế độ tối.