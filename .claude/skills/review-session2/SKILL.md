---
name: review-session2
description: Dùng khi một thành viên review PR của người khác trong bài Buổi 2, hoặc muốn tự kiểm phần của mình trước khi mở PR. Kết hợp script kiểm tự động, kiểm trên trình duyệt và kiểm người làm có hiểu code không.
---

# Review PR Buổi 2

Vai trò của AI: giúp reviewer kiểm có hệ thống và viết nhận xét rõ ràng. Không tự sửa code trong PR của người khác; ghi nhận xét để người làm tự sửa.

## Bước 1. Máy kiểm

```bash
git fetch origin
git checkout <nhanh-cua-PR>
python tools/check-session2.py session2
```

- `[LOI]`: PR chưa được merge. Chỉ người làm vào đúng dòng cần sửa.
- `[CANH BAO]`: ghi chú, không chặn (thường là phần nộp bài chưa có).
- Check `check-session2` trên GitHub phải xanh.

## Bước 2. Phạm vi và quyền sở hữu

```bash
git diff --stat origin/main...HEAD
```

- Chỉ sửa file và khu CSS của người làm (bảng phân công mục 2 trong `docs/SESSION2-GUIDE.md`)?
- Header/footer chỉ đổi khi PR là của người phụ trách header.
- Có mục mới trong `docs/ai-logs/<tên>.md` cho việc dùng AI?

## Bước 3. Mắt người (script không làm được)

Mở trang trên trình duyệt (bấm đúp file hoặc Live Server), DevTools Ctrl+Shift+M:

| Kiểm | 1366 | 768 | 390 |
|---|---|---|---|
| Ảnh không méo, không bị cắt mất phần chính | | | |
| Menu không chồng, chữ đọc được trên banner | | | |
| Thẻ sản phẩm cao đều, giá thẳng hàng | | | |
| Nút đủ to để bấm bằng ngón tay | | | |
| Tab bằng bàn phím thấy rõ viền focus | | | |

## Bước 4. Người làm có hiểu không

Hỏi trong PR một câu về chính đoạn code của họ, ví dụ:
- "Nếu bỏ `object-fit: cover` ở dòng X thì ảnh sẽ thế nào?"
- "Vì sao lưới dùng Grid mà header dùng Flexbox?"
- "Ở 390 px, `@media` nào đang áp dụng cho phần này?"

Người làm tự trả lời (không dán câu trả lời của AI). Trả lời chưa đúng thì gợi ý tài liệu, chưa duyệt.

## Bước 5. Viết nhận xét

Mỗi nhận xét: vị trí (file:dòng), vấn đề, vì sao, gợi ý hướng sửa. Phân biệt "bắt buộc sửa" với "gợi ý". Duyệt (Approve) khi: script xanh, bảng mắt người đạt ở 3 mốc, người làm trả lời được câu hỏi.
