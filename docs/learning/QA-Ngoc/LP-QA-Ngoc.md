---
tags: [learning, member/QA]
member: Ngọc
role: QA
---
# QA Ngọc — QA / Tester

Lộ trình học riêng của bạn. Cách học chung, quy trình commit và AI-LOG: [LEARNING-PATH](../LEARNING-PATH.md). Lỗi hay gặp để học tư duy: [PITFALLS](../PITFALLS.md).

## Phần code bạn sở hữu
Bạn phải giải thích và tự sửa được các phần này khi GV hỏi. Người review PR của bạn: **PM Liêm**.
- `docs/TEST-CASES.md`
- `GitHub Issues (bug)`
- `docs/report/CH4-test-report.md`

## Lộ trình 6 phase
| Phase | Mục tiêu học | File |
|---|---|---|
| [P1](LP-QA-Ngoc-P1.md) | Biết đọc test tự động, phân biệt test mock và kiểm thử thật, viết ca kiểm thử tay. | `LP-QA-Ngoc-P1.md` |
| [P2](LP-QA-Ngoc-P2.md) | Kiểm thử tiền, voucher, phí giao, tranh tồn. | `LP-QA-Ngoc-P2.md` |
| [P3](LP-QA-Ngoc-P3.md) | Kiểm thử thanh toán, trạng thái đơn, đánh giá. | `LP-QA-Ngoc-P3.md` |
| [P4](LP-QA-Ngoc-P4.md) | Kiểm thử Kit Builder (≥ 24 ca). | `LP-QA-Ngoc-P4.md` |
| [P5](LP-QA-Ngoc-P5.md) | Kiểm thử bảo mật cơ bản. | `LP-QA-Ngoc-P5.md` |
| [P6](LP-QA-Ngoc-P6.md) | Biết kiểm thử một tính năng có AI: phần xác định (server kiểm) test tự động, phần không xác định (câu trả lời AI) thử tay có ghi chép. | `LP-QA-Ngoc-P6.md` |

## Nhiệm vụ xây dựng của bạn (commit đứng tên bạn)
Bạn tự xây phần này trong repo nhóm. Quy trình: [ROADMAP](../../ROADMAP.md).

| Mã | Phase | Việc | Test nghiệm thu | Phải merge trước |
|---|---|---|---|---|
| PRJ-P0-QA-1 | P0 | Quy trình gác cổng PR (test nghiệm thu không bị sửa) | — | — |
| PRJ-P1-QA-1 | P1 | Ca kiểm thử P1 + chạy thật | — | — |
| PRJ-P2-QA-1 | P2 | Ca kiểm thử P2 (gồm tranh tồn) | — | — |
| PRJ-P3-QA-1 | P3 | Ca kiểm thử P3 (thanh toán, trạng thái, đánh giá) | — | — |
| PRJ-P4-QA-1 | P4 | Ca kiểm thử Kit Builder ≥ 24 ca | — | — |
| PRJ-P5-QA-1 | P5 | Ca kiểm thử bảo mật + chương kiểm thử | — | — |
| PRJ-P6-QA-1 | P6 | Ca kiểm thử Innovation AI (tự động + thử tay) | 1 file | PRJ-P6-BD1-1 |

### Việc P0 (28/10–03/11, trước khi vào P1)
### PRJ-P0-QA-1 — Quy trình gác cổng PR (test nghiệm thu không bị sửa)
- **File phải viết:** `docs/TEST-PROCESS.md`
- **Test nghiệm thu:** không có test tự động, kiểm chứng như dòng dưới
- **Phải merge trước:** không
- **Kiểm chứng:** reviewer đối chiếu với `REQUIREMENTS.md`, `docs/DECISIONS.md` và kết quả chạy thật.
- **Nhánh:** `prj/p0-qa-1` · **Reviewer:** PM Liêm
- **Các bước:**
  - [ ] 1. Đọc [ROADMAP](../../ROADMAP.md) mục "Quy trình một task PRJ" bước 3 và 8 — Xong khi: giải thích được vì sao test nghiệm thu phải commit trước code
  - [ ] 2. `docs/TEST-PROCESS.md` phần 1: cách lấy test nghiệm thu (`git checkout <ref> -- <spec>`), ref ghi trong issue của từng task — Xong khi: có lệnh mẫu chạy được
  - [ ] 3. Phần 2: lệnh gác cổng `git diff --exit-code <ref> -- <spec>` (không in gì = test không bị sửa), dán kết quả vào review PR — Xong khi: thử sửa một dòng spec trên nhánh nháp thì lệnh in diff và trả mã lỗi 1
  - [ ] 4. Phần 3: checklist reviewer (chạy lại test, xem CI, ảnh 1366 px, link AI-LOG, `Closes #<số>`) — Xong khi: PM đồng ý dùng làm mẫu review
  - [ ] 5. Đặt checklist vào `.github/pull_request_template.md` để mọi PR tự có — Xong khi: mở PR mới thấy checklist

## Lỗi hay gặp bạn nên đọc kỹ
- [E3. Test pass chưa chắc đúng: mock và database thật](../PITFALLS.md#e3)
- [E4. "Báo đã click" không phải bằng chứng](../PITFALLS.md#e4)
- [C1. Hai người cùng mua món cuối cùng](../PITFALLS.md#c1)
- [C2. Không tin giá trình duyệt gửi lên](../PITFALLS.md#c2)
- [C4. VNPay gọi IPN hai lần, hoặc gọi trễ](../PITFALLS.md#c4)
- [C3. Kit Builder chọn hàng "rẻ" mà tổng lại đắt](../PITFALLS.md#c3)
- [C5. Tài khoản bị khóa nhưng token cũ còn hạn](../PITFALLS.md#c5)
- [C6. Rate limit sau proxy](../PITFALLS.md#c6)

## Tài liệu chính thức nên mở song song
- https://vitest.dev/guide/
- https://playwright.dev/docs/intro
- https://owasp.org/www-project-top-ten/

## Theo dõi tiến độ của bạn
| Mã task | PR (link) | Test pass | Ảnh/diff | Mục AI-LOG | Ngày merge |
|---|---|---|---|---|---|
| PRJ-P0-QA-1 |  |  |  |  |  |
| PRJ-P1-QA-1 |  |  |  |  |  |
| PRJ-P2-QA-1 |  |  |  |  |  |
| PRJ-P3-QA-1 |  |  |  |  |  |
| PRJ-P4-QA-1 |  |  |  |  |  |
| PRJ-P5-QA-1 |  |  |  |  |  |
| PRJ-P6-QA-1 |  |  |  |  |  |

| Phase | Tiêu chí học đạt |
|---|---|
| P1 | __/4 |
| P2 | __/2 |
| P3 | __/3 |
| P4 | __/2 |
| P5 | __/2 |
| P6 | __/4 |
