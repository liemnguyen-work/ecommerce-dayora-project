# Quy trình kiểm thử và review PR

Commit test nghiệm thu trước khi viết code để chốt từ đầu hành vi mà tính năng phải đáp ứng. Khi review PR, dù test đã pass, QA vẫn đối chiếu file test với phiên bản đã chốt trước khi triển khai để phát hiện những thay đổi đối với kết quả mong đợi.

## 1. Cách lấy file test nghiệm thu

1. Mở issue của task để xác định mốc Git (`<ref>`) và đường dẫn file test (`<spec>`). Xác nhận rằng đó là phiên bản test dùng để nghiệm thu.
2. Từ thư mục gốc của dự án, chuyển sang nhánh làm task và chạy `git fetch origin` để cập nhật các mốc Git từ repo nhóm.
3. Chạy `git status --short` để kiểm tra các thay đổi hiện có. Nếu file test đích có thay đổi chưa commit, hãy lưu lại phần đó trước. Lệnh checkout cập nhật cả file trong thư mục làm việc và bản của file trong vùng chờ commit.
4. Thay `<ref>` và `<spec>` bằng giá trị ghi trong issue. Khi chạy lệnh, nhập giá trị thực tế và bỏ dấu `<` và `>`.

```bash
git checkout <ref> -- <spec>
```

### Ví dụ lấy file test từ một commit cố định

```bash
git fetch origin
git checkout 68918c43410ca65d7e33e2f6f9e401e7075bef6f -- apps/api/src/app.controller.spec.ts
```

Mã commit trên dùng để minh họa. Khi làm task thực tế, dùng mốc Git và đường dẫn file test đã xác định ở bước 1. Nếu Git báo không tìm thấy mốc sau khi chạy `git fetch origin`, kiểm tra lại mốc trong issue và xác định nhánh chứa commit đó đã được fetch hay chưa.

Sau khi lấy file, chạy `git diff --cached --name-only` để xem toàn bộ file đang chờ commit. Nếu file test có thay đổi so với commit hiện tại, tạo commit riêng cho file test và kiểm tra để tránh đưa các file khác vào cùng commit. Nếu file test đã trùng với phiên bản trong commit hiện tại, bỏ qua việc tạo thêm commit cho file đó. Bắt đầu viết code sau khi QA đã duyệt phiên bản test.
