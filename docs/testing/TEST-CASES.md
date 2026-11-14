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

## Phase 1 — Trang chủ, danh mục, tài khoản và quản trị cơ bản

| Mã ca | Chức năng | Tiền điều kiện | Các bước thao tác | Dữ liệu đầu vào | Kết quả kỳ vọng (Expected) | Kết quả thực tế (Actual) | Ngày chạy | Trạng thái |
|---|---|---|---|---|---|---|---|---|
| TC-P1-01 | FR04 — Đăng ký thành công | Chưa đăng nhập. Email thử nghiệm chưa được dùng. | Mở trang đăng ký, điền form và bấm **Đăng ký**. Xem phản hồi trong Network. | Tên `Ngọc QA`, email mới và mật khẩu hợp lệ. Nếu có ô xác nhận, nhập lại cùng mật khẩu. | Yêu cầu đăng ký trả HTTP 201. Người dùng vào được trang tài khoản. | | | |
| TC-P1-02 | FR04 — Đăng ký trùng email | Chưa đăng nhập. Đã có một tài khoản thử nghiệm. | Mở trang đăng ký, nhập lại email đã dùng, điền hợp lệ các ô còn lại rồi gửi form. | Email của tài khoản thử nghiệm đã tồn tại. | Form báo email đã tồn tại. Yêu cầu đăng ký trả HTTP 409. | | | |
| TC-P1-03 | FR04 — Đăng nhập thành công | Chưa đăng nhập. Có tài khoản thử nghiệm đang hoạt động. | Nhập thông tin đúng trên trang đăng nhập. Sau khi gửi form, mở trang tài khoản. | Email và mật khẩu đúng của tài khoản thử nghiệm. | Mở được trang tài khoản và thấy thông tin của tài khoản vừa đăng nhập. | | | |
| TC-P1-04 | FR04 — Đăng nhập sai mật khẩu | Chưa đăng nhập. Tài khoản đang hoạt động và chưa bị giới hạn lượt thử. | Nhập đúng email và sai mật khẩu rồi bấm **Đăng nhập**. Xem phản hồi trong Network. | Email đúng và một mật khẩu sai. | Form báo đăng nhập thất bại. Người dùng vẫn chưa đăng nhập. Yêu cầu trả HTTP 401. | | | |
| TC-P1-05 | FR04 — Đăng nhập sai nhiều lần | Dùng tài khoản thử nghiệm đang hoạt động. Bộ đếm lượt thử sai đang ở mức 0. | Mở trang đăng nhập và tab Network. Gửi form sáu lần liên tiếp và xem mã phản hồi từng lần. | Cùng một email thử nghiệm và một mật khẩu sai cho cả sáu lần. | Năm lần đầu trả HTTP 401. Lần thứ sáu bị chặn tạm thời và trả HTTP 429. | | | |
| TC-P1-06 | FR04 — Đăng nhập bằng tài khoản đã bị khóa | Admin đã khóa tài khoản thử nghiệm. Tài khoản chưa bị giới hạn do nhập sai nhiều lần. | Nhập đúng email và mật khẩu của tài khoản đã bị khóa rồi gửi form. Xem phản hồi trong Network. | Thông tin đăng nhập đúng của tài khoản đã bị khóa. | Hệ thống từ chối đăng nhập. Người dùng vẫn chưa đăng nhập. Yêu cầu trả HTTP 401 hoặc 403 theo tiêu chí của task. | | | |
| TC-P1-07 | FR02 — Tìm kiếm có kết quả | Biết một sản phẩm khớp từ khóa và một sản phẩm không khớp. | Mở danh mục, xóa bộ lọc đang chọn rồi nhập từ khóa. | Dùng `thảm` hoặc một từ khóa có trong dữ liệu thử nghiệm. Ghi lại hai sản phẩm dùng để đối chiếu. | Sản phẩm khớp từ khóa xuất hiện. Sản phẩm đối chiếu không khớp vắng mặt. | | | |
| TC-P1-08 | FR02 — Tìm kiếm không có kết quả | Đã xác nhận từ khóa thử không khớp sản phẩm nào. | Mở danh mục, xóa bộ lọc đang chọn rồi tìm theo từ khóa. | `khongcosanpham123` hoặc một từ khóa đã xác nhận không có kết quả. | Trang hiện thông báo không có kết quả và không còn thẻ sản phẩm trong danh sách tìm kiếm. | | | |
| TC-P1-09 | FR02 — Lọc theo nhóm hàng | Có sản phẩm thuộc cả hai nhóm sẽ chọn. | Xóa bộ lọc cũ, chọn một nhóm rồi xem kết quả. Đổi sang nhóm còn lại và kiểm tra lần nữa. | Hai nhóm có sẵn trên bản thử nghiệm, chẳng hạn `CAMPING` và `PICNIC`. | Mỗi lần chọn, danh sách chỉ hiển thị sản phẩm thuộc nhóm đang chọn. | | | |
| TC-P1-10 | FR02 — Lọc theo khoảng giá | Có sản phẩm nằm giữa hai mốc, có sản phẩm ngoài khoảng và có sản phẩm đúng bằng mỗi mốc. | Xóa bộ lọc cũ, nhập hai mốc giá rồi xem kết quả. Ghi lại sản phẩm nào xuất hiện ở đúng từng mốc. | Hai mốc giá lấy từ giá sản phẩm trong danh mục thử nghiệm. | Sản phẩm nằm giữa hai mốc xuất hiện. Sản phẩm ngoài khoảng bị loại. Hai sản phẩm đúng bằng mốc được đánh giá theo quy tắc lọc giá của nhóm. | | | |
| TC-P1-11 | FR02 — Giá thấp nhất lớn hơn giá cao nhất | Danh mục có hai ô nhập khoảng giá. | Nhập giá thấp nhất lớn hơn giá cao nhất rồi thử áp dụng. Quan sát giao diện và xem Network nếu có yêu cầu gửi đi. | Giá thấp nhất `500000`, giá cao nhất `100000`. | Khoảng giá nhập ngược không được áp dụng nguyên trạng như một khoảng hợp lệ. | | | |
| TC-P1-12 | FR02 — Lọc theo tình huống | Có sản phẩm phù hợp và không phù hợp với tình huống sẽ chọn. | Xóa bộ lọc cũ, chọn một tình huống và xem danh sách. | Một tình huống có trên giao diện và hai sản phẩm để đối chiếu. | Sản phẩm phù hợp với tình huống đã chọn xuất hiện. Sản phẩm đối chiếu không phù hợp vắng mặt. | | | |
| TC-P1-13 | FR02 — Lọc theo sức chứa | Có sản phẩm phù hợp và không phù hợp với mức sức chứa sẽ chọn. | Xóa bộ lọc cũ, chọn một mức sức chứa và xem danh sách. | Một mức sức chứa có trên giao diện và hai sản phẩm để đối chiếu. | Sản phẩm phù hợp với mức đã chọn xuất hiện. Sản phẩm đối chiếu không phù hợp vắng mặt. | | | |
| TC-P1-14 | FR02 — Sắp xếp giá tăng dần | Danh sách có ít nhất ba sản phẩm với giá khác nhau. | Chọn sắp xếp giá từ thấp đến cao. Đọc giá theo thứ tự hiển thị. | Tùy chọn sắp xếp giá tăng dần. | Giá mỗi sản phẩm bằng hoặc cao hơn giá của sản phẩm đứng trước. | | | |
| TC-P1-15 | FR02 — Sắp xếp giá giảm dần | Danh sách có ít nhất ba sản phẩm với giá khác nhau. | Chọn sắp xếp giá từ cao đến thấp. Đọc giá theo thứ tự hiển thị. | Tùy chọn sắp xếp giá giảm dần. | Giá mỗi sản phẩm bằng hoặc thấp hơn giá của sản phẩm đứng trước. | | | |
| TC-P1-16 | FR02 — Kết hợp ba bộ lọc | Có một sản phẩm thỏa cả ba điều kiện và một sản phẩm chỉ thỏa một hoặc hai điều kiện. | Xóa bộ lọc cũ. Chọn nhóm hàng, nhập khoảng giá và chọn tình huống. | Một nhóm hàng, một khoảng giá và một tình huống lấy từ dữ liệu thử nghiệm. | Sản phẩm thỏa cả ba điều kiện xuất hiện. Sản phẩm chỉ thỏa một hoặc hai điều kiện bị loại. | | | |
| TC-P1-17 | FR03 — Mở chi tiết sản phẩm | Có sản phẩm đang hiển thị trong danh mục. Đã biết slug và thông tin của sản phẩm đó. | Bấm vào thẻ sản phẩm. Kiểm tra thanh địa chỉ và nội dung trang chi tiết. | Một sản phẩm có sẵn cùng slug, tên, ảnh và giá dùng để đối chiếu. | URL có đúng slug. Tên, ảnh và giá khớp với sản phẩm vừa chọn. | | | |
| TC-P1-18 | FR03 — Mở chi tiết bằng slug không tồn tại | Đã biết cấu trúc URL của trang chi tiết. | Thay slug trong URL bằng một slug chưa dùng. Mở URL đó rồi xem phản hồi trong Network. | `san-pham-khong-ton-tai-qa`, sau khi xác nhận slug chưa được dùng. | Trang báo không tìm thấy sản phẩm. Yêu cầu lấy chi tiết trả HTTP 404. | | | |
| TC-P1-19 | FR03 — Đổi biến thể SKU | Có một sản phẩm với hai biến thể. Đã biết mã SKU, giá, ảnh và tồn kho của mỗi biến thể. | Mở trang chi tiết, chọn biến thể thứ nhất rồi chuyển sang biến thể thứ hai. Đối chiếu thông tin sau mỗi lần chọn. | Hai biến thể của cùng một sản phẩm, chẳng hạn hai màu hoặc hai kích thước. | Biến thể đang chọn được đánh dấu. Mã SKU, giá, ảnh và thông tin tồn kho khớp dữ liệu của biến thể đó. | | | |
| TC-P1-20 | FR14 — ADMIN mở trang quản trị | Đã đăng nhập bằng tài khoản thử nghiệm có vai trò `ADMIN`. | Mở `/admin` rồi vào mục quản lý sản phẩm. | Tài khoản `ADMIN`. | Trang quản trị mở được và hiển thị danh sách sản phẩm trong mục quản lý. | | | |
| TC-P1-21 | FR14 — CUSTOMER bị chặn ở trang quản trị | Đã đăng nhập bằng tài khoản thử nghiệm có vai trò `CUSTOMER`. | Mở `/admin` và quan sát giao diện. Nếu trang gửi yêu cầu lấy dữ liệu quản trị, kiểm tra phản hồi trong Network. | Tài khoản `CUSTOMER`. | Khách không vào được chức năng quản trị và không thấy dữ liệu quản trị. Nếu trình duyệt gửi yêu cầu đến API quản trị, API trả HTTP 403. | | | |
| TC-P1-22 | FR14 — Sửa sản phẩm | Đã đăng nhập bằng `ADMIN`. Có sản phẩm thử nghiệm được phép chỉnh sửa. | Mở mục quản lý sản phẩm, đổi tên sản phẩm rồi lưu. Tải lại danh sách và tìm lại sản phẩm. | Một sản phẩm thử nghiệm và một tên mới hợp lệ. | Sau khi tải lại, đúng sản phẩm đã sửa hiển thị tên mới. | | | |
| TC-P1-23 | FR14 — Khóa tài khoản khách hàng | Đã đăng nhập bằng `ADMIN`. Có tài khoản `CUSTOMER` thử nghiệm đang hoạt động. | Mở mục quản lý tài khoản, tìm đúng email rồi khóa tài khoản. Tải lại danh sách và tìm lại email đó. | Email của tài khoản `CUSTOMER` thử nghiệm. | Sau khi tải lại, đúng tài khoản được chọn hiển thị trạng thái đã khóa. | | | |
| TC-P1-24 | FR01 — Điều hướng từ trang chủ | Mở trang chủ khi chưa đăng nhập. | Ở cả 1366 px và 390 px, bấm lối vào mua lẻ. Quay về trang chủ rồi bấm lối vào Kit Builder nếu có trên bản P1. | Các liên kết trên trang chủ và hai độ rộng màn hình. | Lối vào mua lẻ mở danh mục. Lối vào Kit Builder dẫn đến màn hình bắt đầu tạo bộ nếu đã có. Các nút được kiểm tra đều bấm được ở cả hai độ rộng. | | | |
| TC-P1-25 | FR02 — Xóa bộ lọc | Danh mục có sản phẩm thuộc nhiều nhóm. Chưa nhập từ khóa hoặc chọn bộ lọc. | Ghi lại danh sách ban đầu. Chọn một nhóm hàng rồi bấm **Xóa bộ lọc**. | Một nhóm hàng có sẵn trên danh mục. | Nhóm hàng được bỏ chọn. Danh sách trở về kết quả trước khi lọc. | | | |
| TC-P1-26 | FR02 — Lọc theo kích thước | Có sản phẩm khớp kích thước sẽ chọn và sản phẩm có kích thước khác. | Xóa bộ lọc cũ, chọn một kích thước và xem danh sách. | Một kích thước có trên danh mục và hai sản phẩm để đối chiếu. | Sản phẩm khớp kích thước xuất hiện. Sản phẩm đối chiếu không khớp vắng mặt. | | | |
| TC-P1-27 | FR02 — Lọc theo chất liệu | Danh mục có sản phẩm thuộc ít nhất hai chất liệu. | Xóa bộ lọc cũ, chọn một chất liệu và xem danh sách. | Một chất liệu có trên danh mục và hai sản phẩm để đối chiếu. | Sản phẩm có chất liệu đã chọn xuất hiện. Sản phẩm đối chiếu có chất liệu khác vắng mặt. | | | |
| TC-P1-28 | FR04 — Đăng xuất | Đã đăng nhập bằng tài khoản thử nghiệm và mở được trang hồ sơ. | Bấm **Đăng xuất**, sau đó mở lại đường dẫn trang hồ sơ. | Phiên đăng nhập của tài khoản thử nghiệm. | Sau khi đăng xuất, trang hồ sơ yêu cầu đăng nhập lại và không hiển thị thông tin tài khoản. | | | |
