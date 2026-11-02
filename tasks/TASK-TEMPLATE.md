---
tags: [task]
phase: P?
owner: <vai-tên, vd FD1-Thanh>
reviewer: <vai-tên>
status: todo # todo | doing | review | done
---
# <mã task, vd PRJ-P1-FD1-1> — <tên task>

Dùng khi một việc cần mô tả dài hơn issue (việc phát sinh, việc chia nhỏ). Việc trong [ROADMAP](../docs/ROADMAP.md) đã có issue thì không cần file này.

- **Phase:** P?
- **Loại:** bài tập | đồ án
- **Thành viên phụ trách / reviewer:** <vai-tên> / <vai-tên>
- **Cỡ:** S (≤1 file, <30 phút) | M (2–4 file) — lớn hơn thì tách
- **Phụ thuộc:** <mã task hoặc không>
- **Yêu cầu liên quan:** [REQUIREMENTS](../REQUIREMENTS.md) FR??, [DECISIONS](../docs/DECISIONS.md) D??
- **Issue:** #<số>

## Mục tiêu
<một hai câu>

## File được sửa
- <đường dẫn>

## File không được đụng
- <đường dẫn>

## Giao diện (nếu có)
- Token: dùng màu/font trong [DESIGN-SYSTEM](../docs/DESIGN-SYSTEM.md); tôn trọng `prefers-reduced-motion`.
- Kiểm tra ở 1366 px và 390 px.

## Tiêu chí xong
- [ ] <kiểm chứng được>
- [ ] Có test hoặc ca kiểm thử cho logic nghiệp vụ (viết trước, QA duyệt)
- [ ] Comment tiếng Việt ở chỗ khó để thành viên giải thích được

## Lệnh kiểm tra
```bash
npm run lint && npm test && npm run build
```
