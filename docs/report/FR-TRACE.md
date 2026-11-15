# Bảng truy vết yêu cầu Phase 1

Đối chiếu theo `REQUIREMENTS.md`, `docs/ROADMAP.md` và file thực tế trên nhánh `prj/p1-pm-1`. Đường dẫn code là minh chứng hiện diện, không mặc nhiên đáp ứng toàn bộ FR. Chưa chạy kiểm thử trong đợt này; mọi trạng thái dưới đây đều cần QA/người phụ trách kiểm tra và xác nhận bằng kết quả thực tế.

| Mã FR | Yêu cầu | Task phụ trách | Đường dẫn code chính | Đường dẫn test nghiệm thu | Trạng thái |
|---|---|---|---|---|---|
| FR01 | Trang chủ và điều hướng | PRJ-P1-FD1-1, PRJ-P1-FD1-2; QA: PRJ-P1-QA-1 | [App.tsx](../../apps/web/src/App.tsx), [SiteHeader.tsx](../../apps/web/src/components/SiteHeader.tsx) | Chưa thấy trên nhánh | Có router, header và styleguide; trang chủ đầy đủ chưa thấy, chưa có bằng chứng nghiệm thu. |
| FR02 | Tìm kiếm, lọc và sắp xếp | PRJ-P1-BD1-2, PRJ-P1-FD1-3; QA: PRJ-P1-QA-1 | Chưa thấy trên nhánh; [App.tsx](../../apps/web/src/App.tsx) chỉ có trang sản phẩm placeholder | Chưa thấy trên nhánh | Chưa thấy chức năng catalog P1; chưa kiểm thử. |
| FR03 | Chi tiết sản phẩm | PRJ-P1-BD1-2, PRJ-P1-FD1-4; QA: PRJ-P1-QA-1 | Chưa thấy trên nhánh; [App.tsx](../../apps/web/src/App.tsx) chỉ có trang chi tiết placeholder | Chưa thấy trên nhánh | Chưa thấy chi tiết sản phẩm P1; chưa kiểm thử. |
| FR04 | Tài khoản và hồ sơ | PRJ-P1-BD1-1, PRJ-P1-BD1-4, PRJ-P1-FD2-1; QA: PRJ-P1-QA-1 | [auth.controller.ts](../../apps/api/src/auth/auth.controller.ts), [auth.service.ts](../../apps/api/src/auth/auth.service.ts), [App.tsx](../../apps/web/src/App.tsx) | [auth.spec.ts](../../apps/api/src/auth/auth.spec.ts), [auth-rate-limit.spec.ts](../../apps/api/src/auth/auth-rate-limit.spec.ts) — kiểm thử auth, chưa xác minh nghiệm thu toàn FR | Có code và test auth; các trang đăng nhập, đăng ký, tài khoản là placeholder. Chưa có minh chứng chạy đạt và chưa thấy đầy đủ hồ sơ/lịch sử. |
| FR05 | Đánh giá sau mua | PRJ-P3-BD1-3, PRJ-P3-FD1-2; QA: PRJ-P3-QA-1 | Chưa thấy trên nhánh | Chưa thấy trên nhánh | Roadmap xếp đánh giá ở P3; chưa thấy triển khai và chưa kiểm thử. |
| FR14 | Quản trị dữ liệu sản phẩm, danh mục, nhóm hàng và người dùng | PRJ-P1-BD2-2, PRJ-P1-BD2-3, PRJ-P1-FD2-2 | Chưa thấy trên nhánh; [auth.guard.ts](../../apps/api/src/auth/auth.guard.ts) có kiểm tra vai trò, không chứng minh CRUD quản trị | Chưa thấy trên nhánh; [auth.spec.ts](../../apps/api/src/auth/auth.spec.ts) có ca kiểm tra vai trò, không phải test nghiệm thu đầy đủ FR14 | Có phần kiểm tra quyền; chưa thấy code/test nghiệm thu CRUD quản trị trên nhánh. |

## Khác biệt cần xác nhận

- Theo thông tin Liêm cung cấp, task giao việc mô tả **FR05 là quản trị sản phẩm**, trong khi `REQUIREMENTS.md` ghi **FR05 là đánh giá sau mua**. Roadmap hiện xếp đánh giá sau mua vào P3. Cần xác nhận sự khác biệt; chưa kết luận tài liệu nào cần sửa.
- Theo thông tin Liêm cung cấp, task giao việc mô tả **FR14 là hồ sơ cá nhân và sản phẩm đã xem**, trong khi `REQUIREMENTS.md` ghi **FR14 là quản trị dữ liệu cửa hàng**. Cần xác nhận sự khác biệt; chưa kết luận tài liệu nào cần sửa.
- Cần đối chiếu nguyên văn task/issue với `REQUIREMENTS.md` và thống nhất mã FR, phạm vi P1/P3 cùng nhóm/QA; không tự đổi định nghĩa hoặc tuyên bố đã chốt. [P1 overview](../../phases/P1-catalog-accounts/P1-OVERVIEW.md) và [roadmap](../ROADMAP.md) có điểm khác về phân công frontend, cần xác nhận owner thực tế trước khi nghiệm thu.
- File `session2/` và `session3/` là bài tập; không dùng làm bằng chứng đã triển khai hoặc nghiệm thu chức năng React/NestJS của đồ án P1.
- Bảng có mã task liên quan nhưng chưa chứng minh các chức năng đạt; QA Ngọc cần đối chiếu, bổ sung test nghiệm thu và bằng chứng chạy thực tế. Chưa đủ căn cứ tự đóng sub-issue khi phạm vi còn cần xác nhận.
