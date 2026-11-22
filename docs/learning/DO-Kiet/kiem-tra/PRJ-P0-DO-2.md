1. Bước 1 — Tạo .github/workflows/ci.yml

File này hướng dẫn GitHub tự chạy cài dependencies, lint, test và build mỗi khi có PR vào main hoặc push vào main. Nếu bỏ file, các lệnh vẫn chạy được trên máy nhưng sẽ không được workflow này tự động kiểm tra trên GitHub.

2. Bước 2 — Mở PR và kiểm tra CI

Mở PR giúp đưa thay đổi ra để reviewer xem và kích hoạt CI kiểm tra trước khi merge. Nếu không làm bước này, mình chưa có bằng chứng cấu hình CI thực sự chạy được trên PR; test trên máy vẫn có thể pass bình thường.

3. Bước 3 — Thử làm CI đỏ

Mình cố tình sửa sai một giá trị kỳ vọng trên nhánh nháp để xem CI có bắt được lỗi không. Kết quả Test đỏ và Build bị bỏ qua; nếu bỏ thử nghiệm này, chức năng không hỏng ngay nhưng mình chưa kiểm chứng được CI phản ứng đúng khi test thất bại.

4. Bước 4 — Bảo vệ nhánh trong Settings → Branches

Bước này buộc thay đổi phải đi qua PR và job check phải xanh trước khi merge vào main. Nếu không bật, CI có thể báo đỏ nhưng chưa có quy tắc này ngăn merge; hiện mình chưa có quyền nên đang chờ Liêm cấu hình.

5. Chỗ khó nhất — sai ở đâu và sửa thế nào?

Mình tưởng đã tạo đủ file CI, nhưng thực tế ci.yml chưa được lưu, còn lệnh git add chứa đường dẫn Vitest cũ nên commit đầu chỉ có đổi tên file. Sau đó mình tạo đúng file, kiểm tra danh sách staged rồi bổ sung vào commit và push lại bằng --force-with-lease.