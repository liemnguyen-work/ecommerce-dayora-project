---
tags: [testing, p6]
---
# Kịch bản thử nghiệm người dùng (NFR07, P6)

Người điều phối: PM Liêm. Người ghi: QA Ngọc. Người sửa UX: PD Đạt + FD1/FD2. Về [P6-OVERVIEW](../../phases/P6-testing-innovation/P6-OVERVIEW.md).

## Chuẩn bị
- Website: <URL-web-cua-nhom> (gọi `/api/health` trước 1 phút để Render thức dậy).
- 8 người tham gia, chưa từng dùng DAYORA; ghi tuổi, nhóm (sinh viên, đi làm), thiết bị (máy tính 1366 px hay điện thoại).
- Tối thiểu 3 người dùng điện thoại, 3 người dùng máy tính.
- Mỗi người một tài khoản thử dạng `ut<số>@example.com`, tạo ngay trong buổi. Thanh toán dùng thẻ test VNPay NCB `9704198526191432198`, NGUYEN VAN A, 07/15, OTP `123456`. Nói rõ với người tham gia: không có tiền thật.
- Không ghi họ tên thật, số điện thoại thật vào phiếu (dùng mã UT01–UT08).

## Lời dẫn (đọc nguyên văn)
"Bạn đang chuẩn bị một buổi picnic. Hãy làm các việc dưới đây trên trang DAYORA. Không có câu trả lời sai; chúng tôi kiểm tra website, không kiểm tra bạn. Vừa làm vừa nói ra điều bạn nghĩ."

## Nhiệm vụ
| # | Nhiệm vụ | Hoàn thành khi | Yêu cầu liên quan |
|---|---|---|---|
| N1 | Tìm một thảm picnic dưới 250.000đ cho 4 người | Mở đúng trang chi tiết thảm | FR02, FR03 |
| N2 | Tạo bộ đồ cho nhóm 5 người đi biển, ngân sách 800.000đ | Bộ hiện đủ món thiết yếu, không vượt ngân sách | FR06–FR08 |
| N3 | Đổi bình nước trong bộ sang mẫu khác | Bộ cập nhật tổng tiền | R05 |
| N4 | Đưa bộ vào giỏ, áp mã DAYORA10 | Giỏ hiện giảm giá | FR09, FR13 |
| N5 | Đặt hàng giao nội thành TP.HCM và thanh toán VNPay | Trang "Thanh toán thành công", đơn "Đã thanh toán" | FR10–FR12 |
| N6 | Xem lại đơn vừa đặt trong tài khoản | Mở được chi tiết đơn | FR04, FR15 |

## Ghi nhận mỗi nhiệm vụ
- Thời gian (giây), hoàn thành / hoàn thành có trợ giúp / bỏ cuộc.
- Số lần bấm nhầm, chỗ do dự, câu nói đáng chú ý (trích nguyên văn).

## Câu hỏi sau buổi (thang 1–5)
1. Tôi dễ dàng tìm được sản phẩm cần.
2. Bộ gợi ý của Tạo bộ hợp lý với chuyến đi.
3. Tôi hiểu vì sao mỗi món được gợi ý.
4. Thanh toán rõ ràng, tôi biết đơn đã thành công.
5. Tôi sẽ dùng lại DAYORA.
6. Điều bạn thích nhất / khó chịu nhất? (câu mở)

## Phiếu tổng hợp (QA điền)
| Mã | Thiết bị | N1 | N2 | N3 | N4 | N5 | N6 | Điểm TB Q1–Q5 | Vấn đề chính |
|---|---|---|---|---|---|---|---|---|---|
| UT01 | | | | | | | | | |
| UT02 | | | | | | | | | |
| UT03 | | | | | | | | | |
| UT04 | | | | | | | | | |
| UT05 | | | | | | | | | |
| UT06 | | | | | | | | | |
| UT07 | | | | | | | | | |
| UT08 | | | | | | | | | |

## Phân loại vấn đề
| Mức | Định nghĩa | Xử lý |
|---|---|---|
| Critical | Không mua được / mất tiền / lộ dữ liệu | Sửa ngay trong P6 |
| High | ≥3 người kẹt cùng chỗ | Sửa trong P6 |
| Medium | 1–2 người kẹt, có cách vượt | Sửa nếu kịp, ghi CHANGELOG |
| Low | Góp ý thẩm mỹ | Ghi lại, hướng phát triển |

Sau buổi: dọn tài khoản `ut*@example.com` và đơn thử (hỏi PM trước khi xóa).
