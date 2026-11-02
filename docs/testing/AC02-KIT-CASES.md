---
tags: [testing, kit-builder]
---
# Các ca Kit Builder AC02

QA viết ca, BD1/BD2 viết test tương ứng (ví dụ trong `kit-engine.spec.ts`). Cột Actual điền sau khi chạy: PASS/FAIL + ngày + commit. Giá và phí trong dữ liệu thử là giả định.

| Mã | Nhóm | Đầu vào | Expected | Actual | Test tương ứng |
|---|---|---|---|---|---|
| KB-01 | Biên / PICNIC | 1 người | đủ; 1 thảm 4 chỗ, 5 tờ | | |
| KB-02 | Biên / PICNIC | 8 người | đủ; 2 thảm 4 chỗ, 40 tờ | | |
| KB-03 | DATE | 4 người | đủ; 1 thảm, 20 tờ | | |
| KB-04 | BEACH | 4 người | đủ; 1 thảm, 40 tờ | | |
| KB-05 | Biên | 0 người | DTO từ chối | | |
| KB-06 | Biên | 9 người | DTO từ chối | | |
| KB-07 | Đồ đã có | 4 người, 4 bình | cần mua 0 bình | | |
| KB-08 | Đồ đã có | 4 người, 2 bình | cần mua 2 bình | | |
| KB-09 | Đồ đã có | 4 người, 4 ly | vẫn cần 4 bình | | |
| KB-10 | Sức chứa | 4 người, thảm 2 chỗ | 2 thảm | | |
| KB-11 | Sức chứa | 4 người, thảm 4 chỗ | 1 thảm | | |
| KB-12 | Sức chứa | 5 người, thảm 4 chỗ | 2 thảm làm tròn lên | | |
| KB-13 | Sức chứa | 5 người, có thảm 2 chỗ | còn 3 chỗ, mua 1 thảm 4 chỗ | | |
| KB-14 | Ngân sách | 4 người, ngân sách 100 | báo số vượt, giữ tất cả món thiết yếu | | |
| KB-15 | Ngân sách | ngân sách bằng tổng | không vượt | | |
| KB-16 | Không kết quả | thiếu SKU bình | kit thiếu, có cảnh báo | | |
| KB-17 | Hết tồn | bình bị giữ hết tồn | không chọn SKU | | |
| KB-18 | Hết tồn | cần 4 bình, tồn 3 | không chọn SKU | | |
| KB-19 | Thay món | thay bình bằng ly | từ chối sai công dụng | | |
| KB-20 | Thay món | 8 người, thay bằng 1 thảm 4 chỗ | từ chối thiếu sức chứa | | |
| KB-21 | Thay món | chọn 21 bình, tồn 20 | từ chối vượt tồn | | |
| KB-22 | Tùy chọn | cutlery và drink_cup có SKU | chưa chọn mặc định, SKU null | | |
| KB-23 | Tùy chọn | chọn 4 ly hợp lệ | 4 ly, 400 đồng | | |
| KB-24 | Không đầy đủ | bỏ bình thiết yếu | complete=false | | |
| KB-25 | Tùy chọn | bật cutlery hoặc drink_cup với SKU null | chọn SKU rẻ nhất đủ tồn, đủ số lượng | | |
| KB-26 | Thay món / R05 | change thay bình giá 500, ngân sách 30.300 | từ chối vượt ngân sách, đúng ruleId | | |
| KB-27 | Thay món / R05 | change thay bình giá 500, không nhập ngân sách | chấp nhận SKU mới | | |
| KB-28 | Ngân sách | giảm từ 8 xuống 4 ly khi đã vượt | chấp nhận, vẫn báo vượt | | |
| KB-29 | Tương thích | lines vượt ngân sách, không có change | chấp nhận, báo vượt | | |
| KB-30 | Thay món | change có ruleId không nằm trong lines | từ chối | | |

Chạy tại thư mục gốc:

```bash
npm run lint -w api
npm test -w api
npm run build -w api
```
