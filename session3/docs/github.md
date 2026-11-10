# Minh chứng GitHub — Bài tập nhóm Buổi 3

## Phạm vi thống kê

Bảng được đối chiếu với lịch sử nhánh `main` và các PR Buổi 3 ngày 10/11/2026. Thành viên và vai trò dựa trên `session3/docs/ke-hoach.md`.

Số commit là các commit của từng người có thay đổi trong `session3/`, thống kê bằng:

```bash
git shortlog -sn --no-merges HEAD -- session3/
```

Không tính merge commit. Hai tên Git `liemnguyen-work` và `liemnguyen31241023460-cell` được cộng cho Liêm; `Nguyễn Châu` và `nbchau571` được cộng cho Châu. Số liệu có tính các commit sửa lỗi và tài liệu trong `session3/`, nhưng không tính commit chỉ sửa thư mục khác. Số commit không dùng để đánh giá chất lượng đóng góp.

## Bảng đóng góp tám thành viên

| Thành viên | Vai trò | Nhánh làm việc | Số commit | Mã PR đã merge |
|---|---|---|---:|---|
| Liêm | PM | `hw/p1-pm-1` | 7 | [#19](https://github.com/liemnguyen-work/ecommerce-dayora-project/pull/19), [#20](https://github.com/liemnguyen-work/ecommerce-dayora-project/pull/20), [#21](https://github.com/liemnguyen-work/ecommerce-dayora-project/pull/21), [#155](https://github.com/liemnguyen-work/ecommerce-dayora-project/pull/155) |
| Kiệt | DO | `hw/p1-do-1`, `docs/session3-github-evidence` | 4 | [#15](https://github.com/liemnguyen-work/ecommerce-dayora-project/pull/15), [#18](https://github.com/liemnguyen-work/ecommerce-dayora-project/pull/18), [#23](https://github.com/liemnguyen-work/ecommerce-dayora-project/pull/23), [#159](https://github.com/liemnguyen-work/ecommerce-dayora-project/pull/159) |
| Châu | BD2 | `hw/p1-bd2-1` | 7 | [#116](https://github.com/liemnguyen-work/ecommerce-dayora-project/pull/116), [#117](https://github.com/liemnguyen-work/ecommerce-dayora-project/pull/117), [#119](https://github.com/liemnguyen-work/ecommerce-dayora-project/pull/119), [#121](https://github.com/liemnguyen-work/ecommerce-dayora-project/pull/121), [#124](https://github.com/liemnguyen-work/ecommerce-dayora-project/pull/124) |
| Phúc | FD2 | `hw/p1-fd2-1` | 5 | [#126](https://github.com/liemnguyen-work/ecommerce-dayora-project/pull/126) |
| Thành | FD1 | `hw/p1-fd1-1` | 6 | [#148](https://github.com/liemnguyen-work/ecommerce-dayora-project/pull/148) |
| Hoàn | BD1 | `hw/p1-bd1-1` | 6 | [#135](https://github.com/liemnguyen-work/ecommerce-dayora-project/pull/135), [#137](https://github.com/liemnguyen-work/ecommerce-dayora-project/pull/137), [#139](https://github.com/liemnguyen-work/ecommerce-dayora-project/pull/139), [#144](https://github.com/liemnguyen-work/ecommerce-dayora-project/pull/144) |
| Đạt | PD | `hw/p1-pd-1` | 8 | [#150](https://github.com/liemnguyen-work/ecommerce-dayora-project/pull/150), [#158](https://github.com/liemnguyen-work/ecommerce-dayora-project/pull/158) |
| Ngọc | QA | `hw/p1-qa-1` | 6 | [#125](https://github.com/liemnguyen-work/ecommerce-dayora-project/pull/125), [#151](https://github.com/liemnguyen-work/ecommerce-dayora-project/pull/151) |

Tất cả PR trong bảng đã merge vào `main` tại thời điểm đối chiếu. Commit cập nhật tài liệu lần này chưa được tính trong số liệu trên.

## Commit tiêu biểu của từng thành viên

| Thành viên | Công việc | Link commit |
|---|---|---|
| Liêm | Kế hoạch làm việc nhóm | [9b9287e](https://github.com/liemnguyen-work/ecommerce-dayora-project/commit/9b9287e74ac94dec8fbd6347b2e7b65781650049) |
| Kiệt | Tạo khung trang giỏ hàng và liên kết điều hướng | [e48cd49](https://github.com/liemnguyen-work/ecommerce-dayora-project/commit/e48cd4924a9f26417811b60f66b262789b3a25fa) |
| Châu | Cập nhật số lượng, xóa và tính tổng giỏ hàng | [f41b551](https://github.com/liemnguyen-work/ecommerce-dayora-project/commit/f41b5513f089809739fda4e8935998b80bf2d19d) |
| Phúc | Hiển thị danh sách sản phẩm bằng JavaScript | [85048f4](https://github.com/liemnguyen-work/ecommerce-dayora-project/commit/85048f4f1486266de0757f3dd6abe173ee93fa43) |
| Thành | Kết hợp các bộ lọc sản phẩm | [169eb5a](https://github.com/liemnguyen-work/ecommerce-dayora-project/commit/169eb5a915ab7cac222bda2ff77e52eafc8f5820) |
| Hoàn | Thêm số lượng sản phẩm đã chọn vào giỏ | [6483a15](https://github.com/liemnguyen-work/ecommerce-dayora-project/commit/6483a150ad27f28e3e743c855fdca9aae83a99dc) |
| Đạt | Đồng bộ số lượng giỏ và cải thiện giao diện mobile | [cdf7691](https://github.com/liemnguyen-work/ecommerce-dayora-project/commit/cdf7691612b571b2c195754290b279ebe9b8b9e3) |
| Ngọc | Ghi kết quả kiểm thử tích hợp | [a40dfc2](https://github.com/liemnguyen-work/ecommerce-dayora-project/commit/a40dfc26921de9403de413d171b9ecfc9e5bf3e6) |

Các commit khác có thể xem trong tab **Commits** của từng PR.

## Kiểm tra tích hợp cuối

Đã kiểm tra mã nguồn `session3/` trên nhánh `main` tại commit `909f1bd`. Hai lệnh dưới đây không in ra kết quả nào:

```bash
grep -rnP --include='*.html' 'onclick\s*=|<script\b(?![^>]*\bsrc\s*=)[^>]*>' session3/
grep -rIln 'jquery\|react\|vue' session3/
```

Lệnh grep thứ nhất trong hướng dẫn gốc khớp cả `</script>` của thẻ nạp file hợp lệ. Lệnh thứ hai quét cả ảnh PNG nên có thể báo nhầm dữ liệu nhị phân. Vì vậy, lần kiểm tra này dùng biểu thức tìm đúng `onclick` hoặc thẻ script không có `src`, đồng thời dùng `-I` để bỏ qua file nhị phân.

## Giới hạn

- Người mở PR có thể là Liêm; bảng đối chiếu nhánh làm việc, tác giả commit và phân công để ghi đóng góp.
- Bảng là minh chứng GitHub, không thay thế kết quả kiểm thử chức năng.
- Số liệu phản ánh `main` tại thời điểm kiểm tra; cần cập nhật nếu có thêm PR hoặc commit được merge sau đó.
