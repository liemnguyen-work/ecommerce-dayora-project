---
tags: [release, p7]
---
# Checklist phát hành (AC09, P7)

Người chịu trách nhiệm: DO Kiệt (deploy), QA Ngọc (test), PM Liêm (báo cáo). Đánh dấu khi có bằng chứng, ghi commit hoặc link.

## Link (phải sống tới khi có điểm)
- [ ] Website: <URL-web-cua-nhom>
- [ ] API: <URL-API-cua-nhom>/api/health (gói free có thể ngủ; gọi trước khi demo)
- [ ] GitHub: https://github.com/liemnguyen-work/ecommerce-dayora-project
- [ ] Google Drive phụ lục (báo cáo, video, ảnh): ______
- [ ] Kiểm lại cả 4 link vào ngày nộp và ngày bảo vệ

## Source và lịch sử
- [ ] CI GitHub Actions xanh trên `main` (lint, test, build; `check-session2`)
- [ ] Lịch sử commit theo task trong [ROADMAP](ROADMAP.md), không dồn cuối kỳ
- [ ] Mỗi thành viên có commit thật trong repo nhóm ([PROGRESS](PROGRESS.md))
- [ ] Không có `.env`, khóa, mật khẩu trong git (`git ls-files | grep -i env` chỉ ra `.env.example`)

## Chức năng (không còn lỗi chặn mua)
- [ ] AC01 đi trọn: chọn hàng → giỏ → checkout → VNPay Sandbox → IPN → đơn "Đã thanh toán"
- [ ] Kit Builder đưa bộ vào giỏ, kể cả khi chưa đăng nhập
- [ ] Không còn lỗi Critical/High mở sau usability ([USABILITY](testing/USABILITY.md))
- [ ] Tài khoản demo khách + admin ghi trong phụ lục, mật khẩu riêng cho buổi chấm
- [ ] Biến môi trường trên nền tảng deploy đủ, không dán khóa vào chat hay commit

## Kiểm thử
- [ ] ≥24 ca Kit Builder có expected/actual ([AC02-KIT-CASES](testing/AC02-KIT-CASES.md))
- [ ] Bảng AC03–AC07 ([TEST-CASES](testing/TEST-CASES.md)) đã điền Actual
- [ ] Ảnh 1366 px và 390 px các trang chính
- [ ] Ảnh minh chứng có ngày giờ hoặc gắn với commit

## Báo cáo và phụ lục
- [ ] File Word đặt tên theo quy định
- [ ] Bảng đánh giá mức độ tham gia chi tiết từng người
- [ ] Chương 3 mỗi chức năng đủ 11 mục ([REPORT-OUTLINE](REPORT-OUTLINE.md))
- [ ] Phụ lục đủ mục theo REPORT-OUTLINE
- [ ] Đạo văn dưới ngưỡng của LMS
- [ ] Nhật ký AI mỗi người tự ghi ([quy tắc ghi log](ai-logs/ai-logging-rules.md)), `AI_USAGE_LOG.md` dẫn đủ 8 log

## Buổi bảo vệ
- [ ] Máy demo đã mở sẵn web, repo, VS Code; mạng dự phòng (4G)
- [ ] Video dự phòng luồng AC01 và Kit Builder (≤ 3 phút)
- [ ] Mỗi người tập một bài sửa đơn giản + một bài nâng cao trong module mình ([DEMO-SCRIPT](DEMO-SCRIPT.md))
- [ ] Trình bày 10–15 phút, bấm giờ khi tập
