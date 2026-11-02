---
tags: [testing]
---
# Ca kiểm thử AC03–AC07 và ca thử tay

QA viết ca trước khi code (xem [ROADMAP](../ROADMAP.md) bước 3), người làm task viết test tương ứng. Cột **Actual** điền khi chạy: Đạt/Không đạt + ngày + commit; ghi rõ "ở mock" nếu chưa chạy trên database thật ([E3](../learning/PITFALLS.md#e3)). Cột **Test**: tên file và tên ca test, hoặc "thử tay".

## AC03–AC07

| Mã | AC | Đầu vào | Kỳ vọng | Actual | Test |
|---|---|---|---|---|---|
| RS-01 | AC03 | Phát hành draft v2 với định mức gấp đôi | Build sau dùng v2, số lượng đổi | | |
| RS-02 | AC03 | Checkout kit v2 | Snapshot phiên bản 2 và đơn giá server | | |
| RS-03 | AC03 | Phát hành sau khi đơn v1 đã tạo | Đơn cũ giữ v1 | | |
| OD-01 | AC04 | Hai checkout tranh SKU cuối | Một thành công | | |
| OD-02 | AC04 | Giá preview đổi | 409 kèm preview | | |
| OD-03 | AC04 | Đặt hàng giá sale | Snapshot giá và giữ tồn | | |
| PAY-01 | AC05 | IPN 00 | Xác nhận, trừ tồn | | |
| PAY-02 | AC05 | ResponseCode 51 | Hủy, trả tồn | | |
| PAY-03 | AC05 | ResponseCode 24 | Hủy, trả tồn | | |
| PAY-04 | AC05 | Sai chữ ký | 97, không truy cập DB | | |
| PAY-05 | AC05 | Sai số tiền | 04, không cập nhật | | |
| PAY-06 | AC05 | IPN thành công lặp | 02, không trừ tồn lần hai | | |
| PAY-07 | AC05 | IPN sau hết hạn, còn/thiếu tồn | Xác nhận nếu còn tồn; thiếu tồn ghi hoàn tiền thủ công | | |
| VC-01 | AC06 | Voucher hết hạn/chưa tới hạn | Không áp dụng | | |
| VC-02 | AC06 | Dưới ngưỡng/hết lượt | Không áp dụng | | |
| VC-03 | AC06 | Giảm phần trăm vượt trần | Giảm bằng trần | | |
| VC-04 | AC06 | Khách đã dùng hết lượt cá nhân | Không áp dụng | | |
| VC-05 | AC06 | Voucher sai đối tượng | Từ chối | | |
| SH-01 | AC06 | Nội/ngoại thành HCM và tỉnh khác | 20.000/30.000/40.000 | | |
| SH-02 | AC06 | Tiền hàng sau giảm từ 500.000 | Miễn phí HCM | | |
| SEC-01 | AC07 | A đọc/hủy đơn B | 404 | | |
| SEC-02 | AC07 | Khách gọi admin | 403 | | |
| SEC-03 | AC07 | Giá kỳ vọng từ client khác giá server | Không dùng giá client tính tổng, yêu cầu xác nhận | | |
| SEC-04 | AC07 | Review chứa `<script>` | Lưu/trả chuỗi | | |
| SEC-05 | AC07 | Tìm `' OR 1=1 --` | Giá trị lọc Prisma, không ghép SQL | | |
| SEC-06 | AC07 | Đăng nhập, origin cho phép và origin lạ | Cookie SameSite=Lax; CORS chỉ cho phép origin cấu hình | | |
| SEC-07 | AC07 | File Git theo dõi | Không có .env thật hoặc các mẫu khóa phổ biến | | |

## Ca thử tay giao diện

Mỗi task giao diện thêm ca vào đây (QA duyệt). Kiểm ở 1366 px và 390 px.

| Mã | Bước | Kỳ vọng | Actual | Test |
|---|---|---|---|---|
| UI-01 | | | | thử tay |

## Chạy

```bash
npm run lint
npm test
npm run build
```
