---
description: Kiểm bài Buổi 2 theo guide, báo lỗi kèm bằng chứng, không tự sửa
argument-hint: [trang hoặc để trống để kiểm cả 4 trang]
---
Kiểm bài Buổi 2: $ARGUMENTS

Chỉ đọc và báo cáo, KHÔNG sửa file.

0. Chạy `python tools/check-session2.py session2` trước; dùng kết quả của script cho các mục 1–6, chỉ tự đọc file cho phần script không kiểm. Không có Python thì làm tay các mục dưới.

1. Phạm vi: `grep -rn --include=*.html --include=*.css "<script\|onclick\|bootstrap\|tailwind" session2/` phải không in gì.
2. Cấu trúc: có đủ `index.html`, `products.html`, `product-detail.html`, `about.html`, `css/style.css`; mỗi trang có `<!DOCTYPE html>`, `lang="vi"`, `charset`, `viewport`, link `css/style.css`.
3. Link: liệt kê mọi `href` và `src` trong 4 trang, đối chiếu với file có thật trong `session2/`. Báo link hỏng và đường dẫn tuyệt đối (`C:\`, `file:///`).
4. Nội dung theo đề: header + menu + banner + sản phẩm nổi bật (trang chủ); ≥ 8 thẻ sản phẩm có ảnh, tên, giá, link chi tiết; chi tiết có ảnh, tên, giá, mô tả, thuộc tính, nút mua, link quay lại; giới thiệu có các phần, hình, liên hệ.
5. Thống nhất: header/footer 4 trang có giống nhau không (so sánh khối `<header>` và `<footer>`); CSS có mã màu rời thay vì `var(--...)` không.
6. Responsive, hover, focus: có `@media` cho khoảng 768 và 390 px không; có `:hover` và `:focus-visible` cho link, nút, thẻ không; có `outline: none` mà không có viền thay thế không.
7. Nộp bài: đối chiếu bảng 12 mục ở cuối `docs/SESSION2-GUIDE.md`, ghi mục nào có, mục nào thiếu, của ai (theo bảng phân công).

Trả lời bằng bảng: mục, kết quả (đạt / chưa / cần kiểm trên trình duyệt), bằng chứng (file:dòng), người phụ trách. Những gì cần mắt người (méo ảnh, chồng menu) thì ghi "cần kiểm trên trình duyệt", không đoán.
