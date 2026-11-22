---
tags: [team, homework]
---
# Sổ bài tập trên lớp

**Quy tắc ưu tiên:** phase nào có bài tập thì làm bài tập trước. Task đồ án đầu tiên của mỗi người trong phase đó chỉ mở khi bài tập của chính người đó đã merge (cột "Phải merge trước" trong [ROADMAP](ROADMAP.md)). Bài tập chiếm thời gian của phase thì PM dời task đồ án và ghi vào [CHANGELOG](CHANGELOG.md).

| Buổi | Phase | Hạn nộp    | Nội dung                                               | Hướng dẫn                           | Thư mục     | Task                | Trạng thái |
| ---- | ----- | ---------- | ------------------------------------------------------ | ----------------------------------- | ----------- | ------------------- | ---------- |
| 2    | P0    | 04/11/2026 | HTML5 + CSS3 thuần, 4 trang, không JS, không framework | [SESSION2-GUIDE](SESSION2-GUIDE.md) | `session2/` | `HW-P0-*` (10 task) | todo       |

## Thêm bài tập mới (PM)
Khi GV giao đề buổi mới:
1. Thêm một dòng vào bảng trên: buổi, phase chứa hạn nộp, hạn nộp, nội dung, hướng dẫn, thư mục.
2. Viết `docs/SESSION<số>-GUIDE.md`: phạm vi được/không được dùng, phân công 8 người (file sở hữu, reviewer), thứ tự làm, tiêu chí xong, bảng nộp bài. Lấy `SESSION2-GUIDE.md` làm mẫu.
3. Thêm task `HW-P<phase>-<VAI>-<số>` vào đầu bảng phase tương ứng trong [ROADMAP](ROADMAP.md); task đồ án đầu tiên của mỗi người trong phase đó thêm phụ thuộc vào task bài tập của chính người đó.
4. Sửa mục "0. Bài tập trên lớp" trong `phases/P<số>-*/P<số>-OVERVIEW.md`.
5. Chạy `npm run roadmap:issues -- --repo <owner>/<repo> --apply` để tạo issue cho task mới (issue cũ không bị tạo lại).
6. Có công cụ kiểm tự động thì thêm vào `tools/` và workflow vào `.github/workflows/`.

## Kiểm bài Buổi 2
```bash
python tools/check-session2.py session2
```
Chạy cả trên máy và trong GitHub Actions (`.github/workflows/check-session2.yml`) mỗi PR. Trước khi nộp: báo `0 lỗi` và không còn cảnh báo phần nộp bài (bảng nộp bài trong [SESSION2-GUIDE](SESSION2-GUIDE.md) mục 6).
