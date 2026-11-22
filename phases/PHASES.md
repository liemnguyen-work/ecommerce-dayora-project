---
tags: [phase]
---
# PHASES — Lộ trình 8 tuần DAYORA

Mỗi phase = 1 tuần. Thành viên vào thư mục của mình trong phase để xem việc + kiến thức cần học; nhật ký AI ghi ở `docs/ai-logs/<tên>.md`. Vai trò: [ROLES](../docs/ROLES.md). Bảng task chi tiết: [ROADMAP](../docs/ROADMAP.md). Về [HOME](../HOME.md).

| Phase                                      | Tên                                               | Thời gian          | Bài tập trên lớp (làm trước)                                                | Mục tiêu đồ án                                                                                                                                                         |
| ------------------------------------------ | ------------------------------------------------- | ------------------ | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [P0](P0-kickoff/P0-OVERVIEW.md)            | Khởi động và nền móng                             | 28/10 – 03/11/2026 | **Buổi 2** HTML5 + CSS3, hạn 04/11 ([hướng dẫn](../docs/SESSION2-GUIDE.md)) | Repo chạy được trên máy mọi người, CSDL Supabase có schema + 30 SKU, chốt các quyết định bảng 2.6, có design system và hero mẫu, deploy bản "hello" lên Vercel/Render. |
| [P1](P1-catalog-accounts/P1-OVERVIEW.md)   | Catalog, tài khoản và giao diện nền               | 04/11 – 10/11/2026 | chưa có                                                                     | Khách xem trang chủ, danh mục, tìm kiếm + ≥5 bộ lọc + sắp xếp, chi tiết sản phẩm theo biến thể; đăng ký/đăng nhập; admin CRUD sản phẩm/danh mục cơ bản.                |
| [P2](P2-cart-checkout/P2-OVERVIEW.md)      | Giỏ hàng, voucher, phí giao, checkout             | 11/11 – 17/11/2026 | chưa có                                                                     | Giỏ hàng gắn tài khoản; voucher kiểm đủ 6 điều kiện; phí giao theo bảng demo; checkout preview → xác nhận thay đổi → tạo đơn có snapshot và giữ tồn.                   |
| [P3](P3-payment-orders/P3-OVERVIEW.md)     | Thanh toán VNPay, đơn hàng, tồn kho, đánh giá     | 18/11 – 24/11/2026 | chưa có                                                                     | Thanh toán VNPay Sandbox đủ ca thành công/thất bại/hủy/sai chữ ký/sai tiền/lặp; trạng thái đơn 3 trục; admin xử lý đơn; khách theo dõi đơn và đánh giá sau mua.        |
| [P4](P4-kit-builder/P4-OVERVIEW.md)        | Kit Builder                                       | 25/11 – 01/12/2026 | chưa có                                                                     | Kit Builder nhận 4 nhóm đầu vào, áp R01–R05, giải thích kết quả, cho thay món và kiểm soát ngân sách, đưa bộ vào giỏ có ruleSetVersion.                                |
| [P5](P5-admin-security/P5-OVERVIEW.md)     | Quản trị quy tắc, dashboard, bảo mật              | 02/12 – 08/12/2026 | chưa có                                                                     | Admin sửa và phát hành RuleSet có phiên bản + nhật ký; dashboard 5 chỉ số đúng công thức; rà soát và test bảo mật XSS/SQLi/CSRF/IDOR/secret.                           |
| [P6](P6-testing-innovation/P6-OVERVIEW.md) | Kiểm thử tổng, usability, Innovation có điều kiện | 09/12 – 15/12/2026 | chưa có                                                                     | Chạy toàn bộ bộ test, test đồng thời, thử nghiệm 8 người dùng; sửa lỗi; nếu core đạt thì làm Innovation (FR18 hoặc phương án nhóm chốt ở D11).                         |
| [P7](P7-release-defense/P7-OVERVIEW.md)    | Đóng gói, báo cáo và bảo vệ                       | 16/12 – 22/12/2026 | chưa có                                                                     | Đóng băng code, deploy ổn định, hoàn thiện báo cáo Word theo cấu trúc môn học, phụ lục đủ, slide, video dự phòng, tập dượt bảo vệ và sửa code trực tiếp.               |

Bài tập mới: PM cập nhật cột "Bài tập trên lớp" và [ASSIGNMENTS](../docs/ASSIGNMENTS.md) khi GV giao đề.

## Nhịp mỗi phase
1. **Thứ 4 đầu phase — họp chốt (PM):** đọc overview, xác nhận bài tập trên lớp (nếu có), gói việc, người phụ trách, reviewer.
2. **Bài tập trước:** phase có bài tập thì cả nhóm làm task `HW-*` trước, theo hướng dẫn của buổi đó.
3. **Đồ án:** mỗi người nhận issue `PRJ-*` của mình (đã mở khi phụ thuộc xong), đọc hướng dẫn phase và file LP, viết test trước, tự code, mở PR.
4. **Review:** reviewer (thành viên) chạy lại kiểm tra; có thể dùng `/review` của Claude Code để rà thêm. Đạt thì merge.
5. **Cuối phase (thứ 3):** mỗi người nối mục nhật ký AI còn thiếu vào log cá nhân; PM chạy `npm run roadmap:report -- --repo <owner>/<repo>` để cập nhật [PROGRESS](../docs/PROGRESS.md), cập nhật bảng theo dõi trong overview và [AI_USAGE_LOG](../docs/ai-logs/AI_USAGE_LOG.md).

## Quy tắc chuyển phase
Chỉ sang phase sau khi đạt "Điều kiện hoàn thành" của phase trước, hoặc PM ghi rõ phần dời vào [CHANGELOG](../docs/CHANGELOG.md). Không cắt yêu cầu bắt buộc; thiếu thời gian thì hoãn Innovation (FR18). Bài tập trên lớp không được hoãn vì có hạn nộp riêng.
