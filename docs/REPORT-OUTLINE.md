---
tags: [report, p7]
---
# Dàn ý báo cáo Word (P7)

Theo quy định môn học. Nhóm tự viết; dàn ý chỉ chỉ ra nguồn trong repo để lấy minh chứng. Nội dung do AI hỗ trợ phải được kiểm và ghi trong nhật ký AI. Tên file và bài nộp theo quy định của GV.

## Phần đầu
- Bìa: tên đề tài DAYORA, 8 thành viên, vai trò ([ROLES](ROLES.md)).
- **Bảng mức độ tham gia** (quyết định điểm): mỗi người liệt kê task, commit, file, phần báo cáo phụ trách, % đóng góp. Nguồn: [PROGRESS](PROGRESS.md) (`npm run roadmap:report`), `git log --author`, log cá nhân trong `docs/ai-logs/`.
- Mục lục nội dung, hình, bảng.

## Chương 1 — Tổng quan
1.1 Lý do (bối cảnh, vấn đề, nhu cầu, số liệu có trích nguồn) · 1.2 Mục tiêu · 1.3 Đối tượng · 1.4 Phạm vi (FR01–FR18 theo [REQUIREMENTS](../REQUIREMENTS.md), phần thay đổi theo [CHANGELOG](CHANGELOG.md)).

## Chương 2 — Phân tích hệ thống
- 2.1 Ba website tương tự ([competitor-analysis](competitor-analysis.md)): layout, navigation, product, search, filter, cart, checkout, promotion, UX; mỗi site "nhóm học được gì".
- 2.2 Kiến trúc, stack, database (ERD từ schema), sơ đồ tổng thể và sequence từng luồng ([ARCHITECTURE](ARCHITECTURE.md)).
- 2.3 Ba flow bắt buộc: Product, Cart, Checkout ([business-workflow](business-workflow.md)).
- 2.4 Hạn chế → giải pháp.

## Chương 3 — Điều chỉnh và phát triển
Mỗi chức năng đủ 11 mục: mô tả · requirement · design · database · flow · source code · giải thích code · before · after · testing · AI sử dụng.

| Chức năng | Requirement | Code chính (điền khi làm) | Test / minh chứng |
|---|---|---|---|
| Danh mục, tìm kiếm, bộ lọc | FR01–FR03 | | ca test + ảnh 1366/390 |
| Tài khoản, đánh giá | FR04, FR05 | | |
| Kit Builder | FR06–FR08, R01–R05 | | [AC02-KIT-CASES](testing/AC02-KIT-CASES.md) |
| Giỏ, voucher, phí giao | FR09, FR10, FR12, FR13 | | [TEST-CASES](testing/TEST-CASES.md) AC06 |
| Thanh toán VNPay | FR11 | | AC05 |
| Đơn hàng, tồn kho | FR15, D06–D08 | | AC04 |
| Quản trị, RuleSet, dashboard | FR14, FR16, FR17 | | AC03 |
| Innovation (nếu làm) | FR18 hoặc D11 | | |
| Deploy, CI | NFR08 | | [RELEASE-CHECKLIST](RELEASE-CHECKLIST.md) |

Ảnh before/after: lưu trong `docs/report/images/`, ghi ngày giờ hoặc commit.

## Chương 4 — Security & Testing
Rủi ro và biện pháp (rate limit, header, CORS, cookie, IDOR, lỗi không lộ thông tin, trust proxy), bảng test case ([AC02-KIT-CASES](testing/AC02-KIT-CASES.md), [TEST-CASES](testing/TEST-CASES.md)), kết quả usability ([USABILITY](testing/USABILITY.md)).

## Chương 5 — Kết luận
Kết quả cụ thể (số module, số test, link deploy) · hạn chế · hướng phát triển.

## Tài liệu tham khảo + Phụ lục
Tham khảo theo chuẩn UEH, chỉ nguồn có trích. Phụ lục: GitHub, website, database, setup guide, demo account, screenshots, test cases, nhật ký AI ([AI_USAGE_LOG](ai-logs/AI_USAGE_LOG.md)), bảng nguồn tài nguyên, bài tập trên lớp ([ASSIGNMENTS](ASSIGNMENTS.md)).
