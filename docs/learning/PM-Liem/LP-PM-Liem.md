---
tags: [learning, member/PM]
member: Liêm
role: PM
---
# PM Liêm — Trưởng nhóm kiêm BA

Lộ trình học riêng của bạn. Cách học chung, quy trình commit và AI-LOG: [LEARNING-PATH](../LEARNING-PATH.md). Lỗi hay gặp để học tư duy: [PITFALLS](../PITFALLS.md).

## Phần code bạn sở hữu
Bạn phải giải thích và tự sửa được các phần này khi GV hỏi. Người review PR của bạn: **QA Ngọc**.
- `docs/REQUIREMENTS.md`
- `docs/DECISIONS.md`
- `docs/CHANGELOG.md`
- `phases/*/P*-OVERVIEW.md (bảng theo dõi)`
- `docs/report/`

## Lộ trình 5 phase
| Phase | Mục tiêu học | File |
|---|---|---|
| [P1](LP-PM-Liem-P1.md) | Nắm phạm vi và quyết định; truy được mỗi yêu cầu tới trang/API/minh chứng. | `LP-PM-Liem-P1.md` |
| [P2](LP-PM-Liem-P2.md) | Viết được phần báo cáo về tính tiền, voucher, giữ tồn. | `LP-PM-Liem-P2.md` |
| [P3](LP-PM-Liem-P3.md) | Viết được phần thanh toán và vòng đời đơn. | `LP-PM-Liem-P3.md` |
| [P4](LP-PM-Liem-P4.md) | Viết được phần Kit Builder cho người không biết code. | `LP-PM-Liem-P4.md` |
| [P5](LP-PM-Liem-P5.md) | Viết phần bảo mật và bảng đóng góp. | `LP-PM-Liem-P5.md` |

## Nhiệm vụ xây dựng của bạn (commit đứng tên bạn)
Bạn tự xây phần này trong repo nhóm. Quy trình: [ROADMAP](../../ROADMAP.md).

| Mã | Phase | Việc | Test nghiệm thu | Phải merge trước |
|---|---|---|---|---|
| PRJ-P0-PM-1 | P0 | Bảng việc: issue cho mọi task (bài tập + đồ án), milestone theo phase | — | — |
| PRJ-P1-PM-1 | P1 | Bảng truy vết yêu cầu + CHANGELOG | — | — |
| PRJ-P2-PM-1 | P2 | Chương checkout/voucher | — | — |
| PRJ-P3-PM-1 | P3 | Chương thanh toán | — | — |
| PRJ-P4-PM-1 | P4 | Chương Kit Builder | — | — |
| PRJ-P5-PM-1 | P5 | Chương bảo mật + bảng đóng góp từ git log | — | — |

### Việc P0 (28/10–03/11, trước khi vào P1)
### PRJ-P0-PM-1 — Bảng việc: issue cho mọi task (bài tập + đồ án), milestone theo phase
- **File phải viết:** `GitHub Issues + Projects của repo nhóm`
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** không
- **Kiểm chứng:** reviewer đối chiếu với `REQUIREMENTS.md`, `docs/DECISIONS.md` và kết quả chạy thật.
- **Nhánh:** `prj/p0-pm-1` · **Reviewer:** QA Ngọc
- **Các bước:**
  - [ ] 1. Kiểm `docs/ROLES.md`: cột GitHub đúng username 8 người (người nào sai thì sửa) — Xong khi: 8 người xác nhận
  - [ ] 2. Chạy thử `npm run roadmap:issues` (chỉ in, không tạo) — Xong khi: thấy đủ 88 task (10 bài tập + 78 đồ án), không task nào gán `@?`
  - [ ] 3. Tạo thật: `npm run roadmap:issues -- --repo <owner>/<repo-nhom> --apply` (cần `gh auth login` tài khoản có quyền ghi) — Xong khi: tab Issues có 88 issue, 7 milestone, label `roadmap`, `homework`, `project`, `phase/P*`, `role/*`
  - [ ] 4. Projects → New project (Board), thêm mọi issue `label:roadmap`, nhóm theo Milestone — Xong khi: cả nhóm mở được bảng
  - [ ] 5. Sinh báo cáo lần đầu: `npm run roadmap:report -- --repo <owner>/<repo-nhom>`, commit `docs/PROGRESS.md` — Xong khi: báo cáo ra 8 dòng thành viên

## Lỗi hay gặp bạn nên đọc kỹ
- [A1. Thiết kế đẹp nhưng sai mục đích](../PITFALLS.md#a1)
- [B1. Dữ liệu nguồn mâu thuẫn](../PITFALLS.md#b1)
- [B2. Chốt D01–D10 trước khi code](../PITFALLS.md#b2)
- [A8. Thu hẹp phạm vi có chủ đích](../PITFALLS.md#a8)
- [C1. Hai người cùng mua món cuối cùng](../PITFALLS.md#c1)
- [C2. Không tin giá trình duyệt gửi lên](../PITFALLS.md#c2)
- [C4. VNPay gọi IPN hai lần, hoặc gọi trễ](../PITFALLS.md#c4)
- [C3. Kit Builder chọn hàng "rẻ" mà tổng lại đắt](../PITFALLS.md#c3)
- [E5. Một task, một người chịu trách nhiệm, một vòng sửa](../PITFALLS.md#e5)

## Tài liệu chính thức nên mở song song
- https://docs.github.com/en/issues
- https://www.conventionalcommits.org/vi/v1.0.0/

## Theo dõi tiến độ của bạn
| Mã task | PR (link) | Test pass | Ảnh/diff | Mục AI-LOG | Ngày merge |
|---|---|---|---|---|---|
| PRJ-P0-PM-1 |  |  |  |  |  |
| PRJ-P1-PM-1 |  |  |  |  |  |
| PRJ-P2-PM-1 |  |  |  |  |  |
| PRJ-P3-PM-1 |  |  |  |  |  |
| PRJ-P4-PM-1 |  |  |  |  |  |
| PRJ-P5-PM-1 |  |  |  |  |  |

| Phase | Tiêu chí học đạt |
|---|---|
| P1 | __/3 |
| P2 | __/2 |
| P3 | __/3 |
| P4 | __/2 |
| P5 | __/2 |
