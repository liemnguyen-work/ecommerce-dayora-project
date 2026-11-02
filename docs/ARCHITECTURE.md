---
tags: [architecture]
---
# ARCHITECTURE — Kiến trúc DAYORA (khung)

File khung. Nhóm điền dần theo phase; phần chưa làm ghi "chưa có". Người cập nhật chính: DO Kiệt (triển khai), BD2 Châu (dữ liệu), BD1 Hoàn (API khách), FD1 Thành (web). Quyết định nền: [DECISIONS](DECISIONS.md) K01–K07.

## 1. Sơ đồ tổng thể
<!-- Web (Vercel) → API (Render) → PostgreSQL (Supabase); VNPay gọi IPN về API. Vẽ bằng Mermaid hoặc ảnh. -->
chưa có

## 2. Cấu trúc thư mục
<!-- apps/web, apps/api, các module chính. -->
chưa có

## 3. Dữ liệu
### 3.1 ERD
chưa có
### 3.2 Bảng ánh xạ trạng thái
<!-- Trạng thái nghiệp vụ → trường trong schema (xem PITFALLS B3). -->
| Trạng thái nghiệp vụ | Trường | Giá trị |
|---|---|---|
| | | |

## 4. Luồng chính (sequence)
### 4.1 Đăng ký, đăng nhập
chưa có
### 4.2 Đăng nhập bên thứ ba (nếu làm)
chưa có
### 4.3 Catalog, bộ lọc
chưa có
### 4.4 Giỏ, preview, tạo đơn, giữ tồn
chưa có
### 4.5 Thanh toán VNPay (Return, IPN)
chưa có
### 4.6 Kit Builder
chưa có

## 5. API
| Method | Đường dẫn | Quyền | Mô tả | Module |
|---|---|---|---|---|
| | | | | |

## 6. Bảo mật
<!-- Cookie, CORS, header, rate limit, kiểm chủ sở hữu, guard admin. -->
chưa có

## 7. Triển khai và biến môi trường
| Biến | Ở đâu | Ý nghĩa | Bí mật? |
|---|---|---|---|
| | | | |
