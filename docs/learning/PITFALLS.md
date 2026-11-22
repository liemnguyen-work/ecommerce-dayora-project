---
tags: [team, learning, pitfalls]
---
# Lỗi hay gặp khi làm DAYORA

Các lỗi dưới đây hay gặp khi làm một web bán hàng có giỏ, thanh toán và Kit Builder như DAYORA. Đọc **trước** khi làm phần liên quan.

Mỗi mục có:
- **Dấu hiệu:** thấy gì thì biết có vấn đề.
- **Nguyên nhân:** gốc rễ, không phải triệu chứng.
- **Cách tránh:** làm thế nào ngay từ đầu.
- **Cách kiểm:** bằng chứng cho thấy đã tránh được.
- **Vai cần đọc.**

> [!TIP] Cách học: đọc phần Dấu hiệu, **dừng lại tự đoán** nguyên nhân và cách sửa (ghi ra giấy), rồi mới đọc tiếp. Ghi chỗ mình đoán sai vào nhật ký AI: đó là bằng chứng học thật.

Mục lục: [A. Sản phẩm và giao diện](#a-sản-phẩm-và-giao-diện) · [B. Dữ liệu và quyết định](#b-dữ-liệu-và-quyết-định) · [C. Backend và giao dịch](#c-backend-và-giao-dịch) · [D. Frontend](#d-frontend) · [E. Quy trình và kiểm chứng](#e-quy-trình-và-kiểm-chứng)

## A. Sản phẩm và giao diện

<a id="a1"></a>
### A1. Thiết kế đẹp nhưng sai mục đích
- **Dấu hiệu:** Trang nhìn "nghệ thuật": chữ rất to, bố cục lạ, nhiều chuyển cảnh. Người xem phải cuộn nhiều mới thấy sản phẩm.
- **Nguyên nhân:** Tham khảo sai loại trang (portfolio, landing quảng cáo). Portfolio muốn người xem **ngắm**; web bán hàng muốn người xem **tìm và mua nhanh**.
- **Cách tránh:** Tham khảo web bán lẻ thật; nói rõ lấy phần nào (bố cục / màu / ảnh / chuyển động). Ghi lựa chọn vào `docs/DECISIONS.md`, kể cả phương án bị loại và lý do.
- **Cách kiểm:** Trang chủ có đủ thành phần của web bán hàng: menu, nhóm hàng, sản phẩm, ưu đãi, phí giao, nút giỏ. Đếm số lần cuộn để tới sản phẩm đầu tiên.
- **Vai:** PD, PM, FD1.

<a id="a3"></a>
### A3. Video intro "giật một nhịp" khi kết thúc
- **Dấu hiệu:** Hết video, trang co lại vài pixel rồi mới hiện hero.
- **Nguyên nhân:** Hai lỗi chồng nhau: video lớn hơn khung nên khung co lại khi đổi nội dung; thanh cuộn xuất hiện/biến mất làm chiều rộng trang đổi.
- **Cách tránh:** Hero cao cố định (`100svh`), video phủ đúng khung; `scrollbar-gutter: stable` để luôn chừa chỗ thanh cuộn.
- **Cách kiểm:** Quay màn hình chậm lúc video kết thúc, không thấy khung đổi kích thước.
- **Vai:** FD1, PD.

<a id="a4"></a>
### A4. Hiệu ứng lúc có lúc không
- **Dấu hiệu:** Tải lại trang thì không có hiệu ứng vào trang, chuyển trang trong app thì có.
- **Nguyên nhân:** Cấu hình tắt hiệu ứng ở lần hiển thị đầu (ví dụ `AnimatePresence initial={false}`).
- **Cách tránh:** Khi hai cách vào cùng một trang cho kết quả khác nhau, hỏi "điều gì khác giữa hai cách": lần render đầu và lần render sau.
- **Cách kiểm:** Thử cả hai cách (F5 và bấm menu), cùng có hiệu ứng.
- **Vai:** FD1.

<a id="a5"></a>
### A5. Khi nào cho xem lại intro
- **Dấu hiệu:** Khách quay lại trang chủ là phải xem intro lần nữa, hoặc ngược lại không bao giờ xem lại được.
- **Nguyên nhân:** Chưa quyết định dữ liệu "đã xem intro" cần sống bao lâu.
- **Cách tránh:** Chọn quy tắc đơn giản, giải thích được (ví dụ "tải lại trang thì xem lại"). Biết khác biệt: biến cấp module (mất khi tải lại), `sessionStorage` (sống trong tab), `localStorage` (sống lâu).
- **Cách kiểm:** Thử: tải lại, chuyển trang, mở tab mới; ghi kết quả từng cách.
- **Vai:** FD1, PD.

<a id="a6"></a>
### A6. Tài nguyên có watermark hoặc không rõ quyền
- **Dấu hiệu:** Ảnh/video lấy từ công cụ AI hoặc trên mạng có watermark, logo bên thứ ba, hoặc không biết nguồn.
- **Nguyên nhân:** Lấy tài nguyên trước, nghĩ tới quyền sử dụng sau.
- **Cách tránh:** Chỉ dùng tài nguyên có quyền; ghi nguồn từng file. Phần tử đặt trên video/ảnh thì **tính vị trí theo khung**, không đặt cứng theo pixel.
- **Cách kiểm:** Bảng nguồn tài nguyên đủ mọi file trong `public/`; xem ở 1366 px và 390 px không lộ watermark.
- **Vai:** FD1, PD.

<a id="a8"></a>
### A8. Thu hẹp phạm vi có chủ đích
- **Dấu hiệu:** Làm song song quá nhiều thứ (nhiều kích thước màn hình, nhiều hiệu ứng) khiến phần nào cũng dở.
- **Nguyên nhân:** Không chốt phạm vi tối thiểu phải đạt.
- **Cách tránh:** Chốt phần bắt buộc theo `REQUIREMENTS.md` và đề bài; phần cắt bớt thì ghi vào `docs/CHANGELOG.md` với lý do, báo GV trước.
- **Cách kiểm:** Mọi phần cắt đều có dòng trong CHANGELOG và trong báo cáo.
- **Vai:** PM, PD.

<a id="a9"></a>
### A9. Trang danh mục không "vừa một màn hình"
- **Dấu hiệu:** Phải cuộn mới chọn hết bộ lọc; tiêu đề, slogan chiếm chỗ; sản phẩm bị đẩy xuống; bộ lọc có thanh cuộn riêng.
- **Nguyên nhân:** Không ưu tiên sản phẩm trên trang bán hàng.
- **Cách tránh:** Bộ lọc gọn bên trái, cố định khi cuộn và vừa chiều cao màn hình; bỏ khối tiêu đề lớn; lưới sản phẩm nhiều cột.
- **Cách kiểm:** Ở 1366 px thấy được bộ lọc và hàng sản phẩm đầu mà không cuộn.
- **Vai:** PD, FD1.

<a id="a10"></a>
### A10. Font không đọc được tiếng Việt
- **Dấu hiệu:** Chữ có dấu bị lệch, thiếu dấu, hoặc rơi về font mặc định.
- **Nguyên nhân:** Font không có bộ ký tự tiếng Việt (vietnamese subset).
- **Cách tránh:** Chọn font hỗ trợ tiếng Việt (ví dụ Be Vietnam Pro), tải đúng subset và độ đậm cần dùng.
- **Cách kiểm:** Gõ thử "Ố Ể Ữ ặ ỹ" ở mọi cỡ chữ.
- **Vai:** PD, FD1.

## B. Dữ liệu và quyết định

<a id="b1"></a>
### B1. Dữ liệu nguồn mâu thuẫn
- **Dấu hiệu:** Bảng sản phẩm nói một đằng, phần chữ mô tả nói một nẻo (ví dụ một mẫu thảm ghi 4 người ở chỗ này, 8 người ở chỗ kia).
- **Nguyên nhân:** Tài liệu nhiều người viết, không đối chiếu.
- **Cách tránh:** **Không tự đoán.** Hỏi người có quyền quyết (PM), ghi câu trả lời vào `docs/DECISIONS.md`, trong lúc chờ thì làm việc không phụ thuộc.
- **Cách kiểm:** Mọi chỗ mâu thuẫn đã có dòng quyết định kèm ngày.
- **Vai:** PM, BD2, QA.

<a id="b2"></a>
### B2. Code khi quy tắc nghiệp vụ chưa chốt
- **Dấu hiệu:** Phí giao, voucher, giữ tồn, IPN trễ, trạng thái đơn, dashboard... chưa ai chốt mà đã code.
- **Nguyên nhân:** Muốn làm nhanh, bỏ qua bước chốt.
- **Cách tránh:** Chốt D01–D10 trong `docs/DECISIONS.md` trước khi code phần liên quan. Mỗi quy tắc một mã để code, test, báo cáo cùng trích.
- **Cách kiểm:** Mỗi test nghiệp vụ ghi mã quyết định nó kiểm.
- **Vai:** PM, BD1, BD2, QA.

<a id="b3"></a>
### B3. Thấy schema thiếu trường là sửa schema ngay
- **Dấu hiệu:** Cần biểu diễn "đơn hết hạn", "thanh toán đang chờ", "giá web đang thấy" mà schema chưa có chỗ.
- **Nguyên nhân:** Không thử biểu diễn bằng cấu trúc có sẵn trước.
- **Cách tránh:** Thử ánh xạ vào trường có sẵn (ví dụ hết hạn = `CANCELLED` + `paymentStatus EXPIRED`). Đổi schema thì phải được nhóm đồng ý. Mọi ánh xạ ghi lại.
- **Cách kiểm:** Bảng ánh xạ có trong `docs/ARCHITECTURE.md` hoặc CHANGELOG.
- **Vai:** BD1, BD2, PM.

<a id="b4"></a>
### B4. Chạy lại seed làm sai tồn kho
- **Dấu hiệu:** Chạy `db:seed` lần hai thì tồn kho quay về số ban đầu.
- **Nguyên nhân:** `upsert` đặt `stock` ở cả nhánh `update`.
- **Cách tránh:** Seed "chạy lại an toàn" phải nghĩ cho database **đã có dữ liệu thật**: nhánh `update` không ghi đè số liệu vận hành.
- **Cách kiểm:** Đổi tồn một SKU, chạy seed lần hai, tồn giữ nguyên; số SKU không tăng.
- **Vai:** BD2, DO, QA.

<a id="b5"></a>
### B5. Email admin viết hoa không đăng nhập được
- **Dấu hiệu:** Seed admin bằng `Admin@...` rồi không đăng nhập được.
- **Nguyên nhân:** Seed chỉ `trim()`, còn đăng nhập chuyển email về chữ thường trước khi tìm.
- **Cách tránh:** Hai nơi xử lý cùng một dữ liệu phải chuẩn hóa giống nhau. Viết ở nơi thứ hai thì tìm xem nơi thứ nhất làm gì.
- **Cách kiểm:** Test đăng nhập với email viết hoa.
- **Vai:** BD1, BD2.

## C. Backend và giao dịch

<a id="c1"></a>
### C1. Hai người cùng mua món cuối cùng
- **Dấu hiệu:** Tồn còn 1, hai khách đặt cùng lúc, cả hai đều thành công.
- **Nguyên nhân:** "Đọc tồn rồi mới ghi" trong code: giữa lúc đọc và lúc ghi, người khác đã ghi.
- **Cách tránh:** Đẩy điều kiện vào **câu lệnh ghi**: `UPDATE ... SET reserved = reserved + n WHERE id = ... AND stock - reserved >= n`; không có dòng nào được cập nhật thì trả 409. Khóa nhiều SKU theo thứ tự id để tránh deadlock. Tất cả trong một transaction.
- **Cách kiểm:** Chạy 2 request song song trên database thật (không chỉ mock): đúng 1 đơn 201, đơn kia 409.
- **Vai:** BD1, BD2, QA.

<a id="c2"></a>
### C2. Tin giá trình duyệt gửi lên
- **Dấu hiệu:** Sửa giá trong DevTools rồi đặt hàng được với giá đó.
- **Nguyên nhân:** Server dùng giá/tổng do web gửi.
- **Cách tránh:** Server luôn tự tính lại giá, giảm giá, phí giao. Web gửi kèm giá mình đang thấy; lệch thì server trả 409 kèm bảng mới để khách xác nhận.
- **Cách kiểm:** Ca kiểm thử sửa giá từ client (AC07) bị từ chối.
- **Vai:** BD1, BD2, FD1, QA.

<a id="c3"></a>
### C3. Kit Builder chọn hàng "rẻ" mà tổng lại đắt
- **Dấu hiệu:** Picnic 4 người, engine chọn 4 thảm 1 người × 89.000đ = 356.000đ thay vì 1 thảm 4 người 229.000đ.
- **Nguyên nhân:** So **đơn giá** rồi mới tính số lượng. Đồ dùng chung phải so **tổng tiền dòng** = `ceil(số người / sức chứa) × giá`.
- **Cách tránh:** So tổng tiền dòng; bằng tiền thì chọn số lượng ít hơn. Viết test với 1/4/6 người.
- **Cách kiểm:** Test 1/4/6 người cho kết quả khớp tính tay.
- **Vai:** BD1, BD2, QA, PM.

<a id="c4"></a>
### C4. VNPay gọi IPN hai lần, hoặc gọi trễ
- **Dấu hiệu:** Đơn bị trừ tồn hai lần, hoặc IPN đến sau khi đơn đã hủy.
- **Nguyên nhân:** Coi mỗi IPN là sự kiện mới; không khóa đơn.
- **Cách tránh:** Kiểm chữ ký trước (sai → `97`); khóa đơn (`FOR UPDATE`); số tiền phải bằng `total × 100` (sai → `04`); đơn đã xử lý → `02`, không trừ tồn lần hai. Chỉ IPN được đánh dấu đã trả tiền; trang Return chỉ để hiển thị. Xử lý IPN trễ theo D07.
- **Cách kiểm:** Gửi IPN giả lập lặp, sai chữ ký, sai tiền, đến trễ; ghi mã trả về từng ca.
- **Vai:** BD1, QA, DO.

<a id="c5"></a>
### C5. Tài khoản bị khóa nhưng token cũ còn hạn
- **Dấu hiệu:** Admin khóa tài khoản, người đó vẫn đặt hàng được bằng phiên cũ.
- **Nguyên nhân:** Chỉ kiểm chữ ký token, không kiểm trạng thái hiện tại.
- **Cách tránh:** Guard đọc trạng thái tài khoản từ database cho thao tác quan trọng.
- **Cách kiểm:** Test: khóa tài khoản rồi gọi API bằng token cũ → 401/403.
- **Vai:** BD1, BD2, QA.

<a id="c6"></a>
### C6. Rate limit sau proxy
- **Dấu hiệu:** Trên bản deploy, một người đăng nhập sai 5 lần làm người khác cũng bị chặn.
- **Nguyên nhân:** Sau proxy, API thấy cùng một IP cho mọi người.
- **Cách tránh:** Cấu hình `trust proxy` đúng nền tảng deploy; giới hạn theo IP + email; ghi rõ giới hạn của cách lưu (bộ nhớ một instance).
- **Cách kiểm:** Thử trên bản deploy với hai tài khoản khác nhau.
- **Vai:** DO, BD2, BD1.

## D. Frontend

<a id="d1"></a>
### D1. Header nhấp nháy mỗi lần đổi trang
- **Dấu hiệu:** Đổi trang thì header mờ đi rồi hiện lại.
- **Nguyên nhân:** Header nằm **bên trong** khối có `key={location.pathname}`; đổi trang thì React tạo lại header.
- **Cách tránh:** Thứ cần "đứng yên" đặt ngoài phần có `key` thay đổi.
- **Cách kiểm:** Bấm qua 5 trang, header không nhấp nháy.
- **Vai:** FD1, FD2.

<a id="d2"></a>
### D2. Chữ tiếng Việt biến thành dấu "?"
- **Dấu hiệu:** Chữ hiện thành `?ang t?i s?n ph?m`.
- **Nguyên nhân:** Công cụ ghi file dùng sai bảng mã. Đây là **mất dữ liệu**, build vẫn pass.
- **Cách tránh:** Lưu file UTF-8. Sau khi AI hoặc script sửa file có tiếng Việt, xem diff để chắc không có `?` lạ.
- **Cách kiểm:** `git diff` trước khi commit; tìm chuỗi `?` bất thường.
- **Vai:** FD1, QA, mọi người.

<a id="d3"></a>
### D3. Gửi thừa trường bị 400
- **Dấu hiệu:** Gọi API với object đầy đủ thì nhận 400.
- **Nguyên nhân:** API bật `forbidNonWhitelisted`: chỉ nhận đúng trường đã khai báo. Đây là tính năng bảo mật (chặn gửi kèm `role: ADMIN`).
- **Cách tránh:** Thống nhất DTO trước khi nối; dùng kiểu TypeScript để khóa hợp đồng web–API. Đọc kỹ thông báo 400.
- **Cách kiểm:** Test gửi thừa trường → 400; gửi đúng → 200.
- **Vai:** FD1, BD2.

<a id="d4"></a>
### D4. Dấu tiếng Việt bị cắt ở tiêu đề có hiệu ứng
- **Dấu hiệu:** Dấu của chữ hoa "Ố", "Ể" bị cắt phần trên.
- **Nguyên nhân:** Khung `overflow: hidden` vừa khít dòng chữ.
- **Cách tránh:** Chừa khoảng trên (ví dụ `padding-top: 0.22em`); luôn thử với chữ có dấu cao nhất.
- **Cách kiểm:** Ảnh tiêu đề có "Ố Ể" ở mọi cỡ.
- **Vai:** FD1, PD.

<a id="d5"></a>
### D5. Lỗi build TS1294
- **Dấu hiệu:** Build web báo TS1294.
- **Nguyên nhân:** Bật `erasableSyntaxOnly`, không cho cú pháp TypeScript "sinh code" như `constructor(public x: …)`.
- **Cách tránh:** Tra **mã lỗi** kèm tùy chọn trong `tsconfig`; viết thuộc tính tường minh.
- **Cách kiểm:** `npm run build` xanh.
- **Vai:** FD1, FD2.

<a id="d6"></a>
### D6. Mất bộ Kit khi phải đi đăng nhập
- **Dấu hiệu:** Khách dựng bộ xong, bấm "thêm vào giỏ", bị chuyển sang đăng nhập, quay về thì mất bộ.
- **Nguyên nhân:** Bộ chỉ nằm trong state của trang.
- **Cách tránh:** Lưu bộ vào `sessionStorage` trước khi chuyển; chuyển sang `/login?next=...`; quay về đọc lại, xóa khóa, thêm vào giỏ. Bọc `try/catch` vì trình duyệt có thể chặn storage.
- **Cách kiểm:** Ca kiểm thử: chưa đăng nhập → dựng bộ → thêm giỏ → đăng nhập → bộ có trong giỏ.
- **Vai:** FD1, PD.

## E. Quy trình và kiểm chứng

<a id="e1"></a>
### E1. Chưa commit thì không có điểm quay lại
- **Dấu hiệu:** Máy lỗi, xóa nhầm thư mục, hoặc sửa hỏng mà không quay lại được.
- **Nguyên nhân:** Làm cả buổi không commit.
- **Cách tránh:** **Commit sớm, commit nhỏ**, mỗi commit một ý; push nhánh lên GitHub cuối buổi. Sau sự cố, kiểm kê "đã xong / dở / chưa làm" trước khi làm lại.
- **Cách kiểm:** Lịch sử nhánh có nhiều commit nhỏ, có mô tả rõ.
- **Vai:** DO, PM, mọi người.

<a id="e3"></a>
### E3. Test pass chưa chắc đúng: mock và database thật
- **Dấu hiệu:** Test transaction, khóa dòng đều pass nhưng chỉ dùng mock.
- **Nguyên nhân:** Mock không có khóa, không có tranh chấp thật.
- **Cách tránh:** Hỏi "test này chứng minh được gì, **không** chứng minh được gì?". Ca tranh chấp chạy thêm trên PostgreSQL thật. Ghi rõ giới hạn trong PR.
- **Cách kiểm:** PR ghi phần "chưa kiểm" và ca đã chạy trên database thật.
- **Vai:** QA, BD1, BD2.

<a id="e4"></a>
### E4. "Báo đã click" không phải bằng chứng
- **Dấu hiệu:** Công cụ hoặc AI báo "đã làm, đã chạy" nhưng URL không đổi, dữ liệu không hiện.
- **Nguyên nhân:** Tin lời báo thay vì nhìn kết quả.
- **Cách tránh:** Chỉ ghi "đạt" khi thấy **kết quả** (URL đổi, dữ liệu hiện ra, ảnh chụp). Áp dụng cả khi ghi nhật ký AI.
- **Cách kiểm:** Mỗi tiêu chí xong có ảnh/lệnh/kết quả đi kèm.
- **Vai:** QA, mọi người.

<a id="e5"></a>
### E5. Một task, một người chịu trách nhiệm, một vòng sửa
- **Dấu hiệu:** Việc chung chung, nhiều người cùng sửa một file, lỗi không ai nhận.
- **Nguyên nhân:** Không chia việc theo ranh giới file/module, tiêu chí xong không kiểm được.
- **Cách tránh:** Mỗi việc là một issue (hoặc `tasks/T<số>.md` theo [mẫu](../../tasks/TASK-TEMPLATE.md)): mục tiêu, file được sửa, file **không được đụng**, tiêu chí xong, lệnh kiểm tra. Mỗi lỗi review có mức và **owner**. Tối đa một vòng sửa trước khi PM can thiệp.
- **Cách kiểm:** Mỗi PR có `Closes #<số>`, reviewer, kết quả lệnh kiểm tra.
- **Vai:** PM, mọi người.
