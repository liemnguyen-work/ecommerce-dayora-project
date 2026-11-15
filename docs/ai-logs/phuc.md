# Nhật ký sử dụng AI của Phúc

Chỉ ghi hoạt động thực tế theo [quy tắc chung](ai-logging-rules.md) và [mẫu mục log](TEMPLATE.md). Mục đã ghi chỉ được bổ sung bằng mục mới, không sửa hoặc xóa.

## Buổi 2 — Khôi phục HW-P0-FD2-1 sau pull main / PHUC-20261102-C6B827-001

* Thời gian ghi: 2026-11-02T23:42:00+07:00
* Thời gian thực hiện: 2026-11-02; chi tiết bắt đầu/kết thúc chưa xác minh
* Mã phiên nhật ký: PHUC-20261102-C6B827
* Người prompt: Phúc
* Loại mục: Hoạt động
* Liên quan: HW-P0-FD2-1; các trao đổi trước về task này trong lịch sử hội thoại, mục PHUC-20261102-A7D91C-003/004 không có trong working tree sau pull

### Công cụ

Codex trong IDE; PowerShell để đọc repo và ghi lại tệp.

### Mục đích

Khôi phục phần bài tập danh sách sản phẩm FD2 bị mất sau khi pull main; nối lại log AI dựa trên cuộc trao đổi đã có.

### Prompt

Tóm lược yêu cầu: Phúc báo đã pull nhánh main trước khi commit nên mất file; yêu cầu làm lại task đã trao đổi từ đầu và cập nhật AI log theo trao đổi giữa hai bên.

### Kết quả đề xuất

Trước khi dựng lại, xác nhận working tree sạch ở commit `0f7d2c8`, nhánh `HongPhuc`; trong `session2/` chỉ còn AGENTS.md và CLAUDE.md, không có `products.html` hoặc `css/style.css`. Tám ảnh `assets/images/product-1.jpg` đến `product-8.jpg` còn tồn tại và đều 900×900.

Đã tạo lại `session2/products.html` với 8 thẻ sản phẩm theo bảng trong SESSION2-GUIDE, alt, giá, link chi tiết, cùng header/footer scaffold và CSS link. Đã tạo `session2/css/style.css` với marker 8 khu, chỉ thêm CSS trong khu 4 của Phúc: Grid 4/2/1 cột theo breakpoint, ảnh vuông, Flexbox cho nội dung thẻ và link ở cuối. Ảnh tham chiếu qua đường dẫn tương đối `../assets/images/` vì ảnh hiện nằm ở thư mục gốc `assets/images/`.

Các trao đổi trước gồm hướng dẫn học từng bước, triển khai rồi review tĩnh; thay đổi trước đó không còn trong working tree sau pull. Bản hiện tại được dựng lại từ tiêu chí local và nội dung đã xác nhận trong lịch sử trao đổi, không khẳng định khôi phục chính xác byte-for-byte file đã mất. Issue GitHub riêng HW-P0-FD2-1 chưa được tìm thấy trong lần tra cứu trước; dùng ROADMAP/SESSION2-GUIDE làm tiêu chí.

### Phản biện

Chưa có phản biện mới từ thành viên. Quy ước vị trí media queries giữa khu 4 và khu 7 từng được nêu là điểm cần Phúc/Ngọc thống nhất; không sửa khu của thành viên khác.

### Quyết định của nhóm

Phúc yêu cầu dựng lại phần task của mình sau pull main. Chưa có quyết định chung về vị trí cuối cùng của media queries.

### Người kiểm tra

Chờ Phúc review; chưa có kết quả kiểm tra trình duyệt.

### Kiểm tra và minh chứng

Đã đọc trạng thái Git, hướng dẫn Buổi 2, ROADMAP, AGENTS cục bộ, checker source, quy tắc và mẫu log. Đã xác nhận 8 tệp ảnh và kích thước 900×900. Không chạy checker, test hoặc trình duyệt. Hiện các trang `index.html`, `product-detail.html`, `about.html`, ảnh trong `session2/images/` và CSS khu của các vai khác chưa có trong working tree; đường dẫn menu/chi tiết được giữ theo cấu trúc dự án dự kiến, chưa xác nhận mở được trong checkout này.

Tệp mới: `session2/products.html`, `session2/css/style.css`. Tệp log: `docs/ai-logs/phuc.md`, `docs/ai-logs/AI_USAGE_LOG.md`.
## Buổi 2 — Bổ sung hồi cứu trao đổi và đồng bộ nhánh / PHUC-20261102-C6B827-002

* Thời gian ghi: 2026-11-02T23:51:09+07:00
* Thời gian thực hiện: Các trao đổi hướng dẫn và review trước khi pull main: chưa xác minh; commit/push: 2026-11-02, theo kết quả Git trong phiên này
* Mã phiên nhật ký: PHUC-20261102-C6B827
* Người prompt: Phúc
* Loại mục: Hoạt động
* Liên quan: PHUC-20261102-C6B827-001; HW-P0-FD2-1

### Công cụ

Codex trong IDE; Git qua PowerShell.

### Mục đích

Bổ sung hồi cứu các yêu cầu trước đây liên quan bài Buổi 2 và ghi nhận việc commit, push bản dựng lại sau khi Phúc yêu cầu.

### Prompt

Tóm lược các yêu cầu có trong lịch sử hội thoại: Phúc (FD2) xin giải thích từng bước về HTML danh sách, CSS Grid, ảnh/tỷ lệ và dữ liệu/thẻ; sau đó thu hẹp phạm vi sang HW-P0-FD2-1, yêu cầu hướng dẫn tự làm `session2/products.html` và CSS bằng HTML5/CSS3; tiếp tục yêu cầu phát triển code trong phạm vi để Phúc review; rồi yêu cầu đọc issue và git diff, nêu phần ngoài phạm vi cùng các hạng mục HTML/CSS, link/ảnh, responsive và focus cần tự kiểm, không bịa kết quả. Sau khi dựng lại, Phúc yêu cầu commit và push lên nhánh của mình; hiện yêu cầu bổ sung log cho các trao đổi trước đó.

### Kết quả đề xuất

Các trao đổi học từng bước, phát triển, review và lần dựng lại sau pull được ghi nhận theo phần tóm lược trên; chi tiết câu trả lời/review cũ không được chép lại vì không có đủ nội dung để xác nhận trong working tree hiện tại. Mục PHUC-20261102-C6B827-001 ghi chi tiết phần khôi phục file và giới hạn kiểm tra.

Theo yêu cầu commit/push, đã commit bốn tệp liên quan bằng `ebc9a23` (`feat(products): restore session2 product list`) và push thành công `HongPhuc` lên `origin/HongPhuc`. Kết quả Git sau push cho thấy working tree sạch trước khi thêm mục log hồi cứu này.

### Phản biện

Chưa có phản biện mới của Phúc về nội dung code. Yêu cầu trước đó là review; chưa có phản hồi review của Phúc được cung cấp.

### Quyết định của nhóm

Phúc yêu cầu làm lại phần task của mình, commit và push lên nhánh `HongPhuc`. Không ghi nhận quyết định chung khác của nhóm.

### Người kiểm tra

Chờ Phúc review code và mục log mới; chưa có xác nhận duyệt.

### Kiểm tra và minh chứng

Đối chiếu các yêu cầu đã nêu trong lịch sử hội thoại, mục khôi phục PHUC-20261102-C6B827-001, và kết quả Git của commit `ebc9a23` cùng push `HongPhuc -> origin/HongPhuc`. Không chạy kiểm thử trình duyệt hoặc checker trong lần bổ sung log này. Thời điểm chính xác của các trao đổi trước khi pull main chưa xác minh.

Tệp log được nối thêm: `docs/ai-logs/phuc.md`, `docs/ai-logs/AI_USAGE_LOG.md`.

---

## Buổi 3 — Hồi cứu HW-P1-FD2-1 và kiểm tra log / PHUC-20261108-A7D392-001

* Thời gian ghi: 2026-11-08T15:56:28+07:00
* Thời gian thực hiện: Hồi cứu các trao đổi và thao tác trong phiên hiện tại; giờ bắt đầu/kết thúc từng bước chưa xác minh. Không dùng ngày làm dự kiến trong Issue làm thời gian thực hiện.
* Mã phiên nhật ký: PHUC-20261108-A7D392
* Người prompt: Phúc — người dùng yêu cầu ghi nhật ký cho Phúc trong trao đổi hiện tại; không xác định từ Git author.
* Loại mục: Hoạt động
* Liên quan: HW-P1-FD2-1; HW-P1-FD2-1.1 đến HW-P1-FD2-1.5; Issues #529–#534 chưa xác minh đầy đủ trên GitHub (nội dung #529–#533 do người dùng cung cấp; không xác nhận số Issue của bước 5).

### Công cụ

Codex trong IDE; PowerShell; Git; Node.js với `node:vm` và `node:assert/strict`. Người dùng cung cấp kết quả Console trình duyệt và một ảnh chụp. Không ghi model hoặc công cụ AI bên ngoài chưa xác minh.

### Mục đích

Hỗ trợ Phúc học và thực hiện danh sách sản phẩm bằng JavaScript thuần trong `session3/`: lấy phần phụ thuộc của Châu, render thẻ từ dữ liệu, link chi tiết, trạng thái rỗng, nút thêm giỏ và câu hỏi kiến thức. Ghi đúng phần AI làm trực tiếp, phần người dùng cung cấp và giới hạn kiểm chứng.

### Prompt

Tóm lược yêu cầu thực tế: đọc task HW-P1-FD2-1, hướng dẫn lấy phần Châu và làm từng bước; kiểm tra các đoạn code tự gửi; chỉnh trực tiếp Bước 2; thực hiện Bước 3 và Bước 4; kiểm tra, commit và push từng bước. Sau đó người dùng báo không thêm giỏ được, cung cấp lỗi `loadCart is not defined` và ảnh Console; hỏi hiệu ứng nhãn nút 800 ms có cần thiết không; nhờ trả lời câu hỏi kiến thức, đưa vào file, rồi báo đã viết câu trả lời và yêu cầu commit/push Bước 5. Người dùng yêu cầu tạm chưa ghi log, chờ hướng dẫn sau; nay yêu cầu viết log cho Phúc, có phản biện và để kiểm tra.

### Kết quả đề xuất

- Git fetch đã thành công; kiểm tra lúc đó cho thấy commit của `origin/hw/p1-bd2-1` đã nằm trong `origin/main`. Codex hướng dẫn cập nhật main và tạo nhánh; trạng thái Git sau đó xác nhận đang ở `hw/p1-fd2-1`. Không nhận việc viết `products.js`, `formatPrice` hoặc `cart.js` của Châu là đóng góp của Phúc.
- Bước 1: Codex giải thích `querySelector`, `map`, template literal, `join` và `innerHTML`; người dùng gửi code để kiểm tra. Sau khi lưu, bản code được kiểm tra có một mẫu thẻ dùng dữ liệu, guard thiếu container và gọi `renderProducts(products)`; HTML bỏ tám thẻ viết tay. Commit `85048f4`.
- Bước 2: theo yêu cầu sửa trực tiếp, Codex đổi link từ fragment sang `product-detail.html?id=${product.id}` và thêm nút có class `btn-add-cart`, thuộc tính `data-id`. Commit `1290a83`.
- Bước 3: Codex trực tiếp thêm điều kiện `!list || list.length === 0`, thông báo trong `li.no-products` và `return` trước `map()`. Commit `764760e`.
- Bước 4: Codex trực tiếp gắn một listener click ngoài hàm render trên `.product-grid`, tìm nút bằng `closest`, chuyển ID sang số và gọi `addToCart(productId, 1)`. Commit `7c9e883`. Hiệu ứng đổi nhãn 800 ms chỉ được trao đổi là tùy chọn, chưa triển khai.
- Bước 5: ban đầu Codex gợi mở để người dùng tự trả lời; sau yêu cầu trả lời giúp, Codex soạn tám câu tham khảo và thêm vào `session3/docs/answers/Phuc.md`, có ghi rõ AI hỗ trợ. Người dùng sau đó báo đã viết câu trả lời; diff bản lưu cho thấy đã thay nội dung nháp bằng tám câu, phần lớn theo câu tham khảo. Commit `caecab4`. Không coi việc lưu câu trả lời là bằng chứng Phúc tự giải thích được toàn bộ kiến thức.
- Cả năm commit đã push thành công lên nhánh `hw/p1-fd2-1` của repo Liêm, theo kết quả lệnh Git trong phiên. Chưa tạo PR, chưa xác minh đóng Issue hoặc merge.

### Phản biện

- Phản hồi thực tế của Phúc với kết quả AI: sau khi Bước 4 qua kiểm tra mô phỏng, Phúc hỏi “sao chưa thêm vào giỏ hàng được”, rồi cung cấp lỗi `loadCart is not defined`. Đây là phản hồi cho thấy kiểm tra Node chưa đủ để kết luận hoạt động trong trình duyệt của người dùng. Codex kiểm tra mã nguồn và đề nghị kiểm tra đúng trang `session3/`, tải lại và dùng `typeof loadCart`; nguyên nhân trang mở sai chưa được xác nhận bằng URL.
- Minh chứng bổ sung của Phúc: ảnh Console cho thấy `typeof loadCart` là `function` và `loadCart()` trả mảng có ba phần tử. Giữ kết luận hàm đã được tải và có dữ liệu giỏ; không suy ra đã đạt phép thử hai lần bấm, số lượng 2 vì ảnh chưa mở chi tiết từng phần tử.
- Kiểm tra kỹ thuật do AI thực hiện khi đọc code người dùng: chỉ ra dấu HTML thừa, đặt `list.map()` ngoài phạm vi hàm, trả về cả tám thẻ trong mỗi vòng map dẫn tới 64 thẻ nếu đầu vào có tám sản phẩm, và dữ liệu còn viết cố định. Hướng sửa là đưa render vào trong hàm, chỉ giữ một mẫu thẻ và chèn dữ liệu. Đây là phản biện của AI về code, không ghi thành phản biện của Phúc về AI.
- Phúc hỏi tính cần thiết của hiệu ứng “Đã thêm ✓”; Codex giải thích đây là tùy chọn, không phải điều kiện đạt. Chưa có yêu cầu triển khai hiệu ứng sau trao đổi đó.
- Giới hạn cần Phúc phản biện tiếp: câu trả lời kiến thức chủ yếu do AI soạn; cần tự đối chiếu và giải thích được, đặc biệt cơ chế sự kiện truyền lên cha và phạm vi biến. Chưa có phản hồi của Phúc xác nhận mức hiểu hoặc reviewer duyệt. Không tạo nhận xét giả hay ghi “đã hiểu/đã tự viết hoàn toàn”.

### Quyết định của nhóm

Phúc đã yêu cầu Codex sửa trực tiếp các phần nêu trên và commit/push từng bước; hiện yêu cầu tổng hợp log để kiểm tra. Không có bằng chứng toàn nhóm hoặc Thành đã duyệt. Việc tạm hoãn log theo yêu cầu người dùng được ghi nhận là ghi hồi cứu, không mô tả như đã ghi đồng thời với từng commit. Bản log hiện tại chưa được phép commit/push qua yêu cầu này.

### Người kiểm tra

Codex đã đọc diff, kiểm tra cú pháp và chạy mô phỏng Node như mô tả dưới đây. Phúc cung cấp lỗi và ảnh Console, chưa cung cấp đầy đủ kết quả kiểm tra giao diện và thao tác hai lần bấm. Thành là reviewer theo Issue được cung cấp, chưa có kết quả review của Thành. Log này chờ Phúc kiểm tra và phản hồi; chưa duyệt.

### Kiểm tra và minh chứng

- `node --check session3/js/modules/render-products.js` và `git diff --check` không báo lỗi ở các lần kiểm tra trước commit.
- Mô phỏng Node dùng dữ liệu thật và vùng chứa giả: render đủ tám thẻ/đường dẫn ảnh; không lỗi khi thiếu container; mảng rỗng, thiếu tham số, `null` cho thông báo; gọi lại bằng `products` khôi phục tám thẻ.
- Mô phỏng Node dùng `cart.js` thật, localStorage và sự kiện giả: hai click cho một dòng `{id: 1, quantity: 2}`; render lại nhiều lần vẫn chỉ một listener; click tiếp cho quantity 3; click ngoài nút không thêm; `cart:changed` phát một lần mỗi lần thêm. Đây là mô phỏng, không phải kiểm thử DOM/trình duyệt thật.
- Khi điều tra phản hồi không thêm giỏ, bản local của `cart-page.js` chỉ có chú thích và `cart.html` chứa giao diện trang chủ; chưa có mã cập nhật số menu. Không tự sửa phần của Đạt. Trạng thái này không chứng minh dữ liệu giỏ không được lưu.
- Chưa xác minh trên trình duyệt: link sản phẩm 3 mở đúng trang chi tiết, phép thử giỏ đúng số lượng sau hai lần bấm, responsive 1366/390 px, ảnh minh chứng và các lệnh kiểm tra toàn bài theo hướng dẫn. Chưa xác minh toàn bộ tiêu chí task cha; chưa PR/review/merge.
- Hai tài liệu HW3 được dẫn trong Issue không có tại đường dẫn tương ứng trong `origin/main` khi kiểm tra đầu phiên; không tuyên bố đã đọc được chúng. Hướng dẫn dựa trên nội dung Issue do người dùng cung cấp và mã nguồn/quy ước local đã đọc.
- Tệp chức năng: `session3/products.html`, `session3/js/modules/render-products.js`, `session3/docs/answers/Phuc.md`. Chỉ các tệp liên quan từng bước được commit; không sửa `products.js` hoặc `cart.js`.
- Repo nhận push: `https://github.com/liemnguyen-work/ecommerce-dayora-project`; commit: `85048f4`, `1290a83`, `764760e`, `7c9e883`, `caecab4`. Git được kiểm tra trước khi ghi mục này: nhánh đồng bộ, working tree sạch.
- Mục này chỉ tổng hợp phiên hiện tại từ hội thoại và kết quả công cụ; không xác nhận hoạt động ở cuộc chat khác. Khi có phản hồi hoặc kết quả mới, nối mục bổ sung dẫn mã PHUC-20261108-A7D392-001, không sửa ngược mục này.

---

## Buổi 3 — PHUC-20261108-A7D392-002

* Thời gian ghi: 2026-11-08T16:01:30+07:00
* Thời gian thực hiện: Tổng hợp hồi cứu; thời gian thực hiện từng hoạt động trong bản cung cấp chưa xác minh.
* Mã phiên nhật ký: PHUC-20261108-A7D392
* Người prompt: Nguyễn Hồng Phúc — tên đầy đủ theo nội dung người dùng cung cấp.
* Loại mục: Hoạt động
* Liên quan: PHUC-20261108-A7D392-001; HW-P1-FD2-1.1.

### Công cụ

Codex thực hiện nối nhật ký. Bản tự thuật bên dưới ghi công cụ ChatGPT theo thông tin Phúc cung cấp; chưa có nguồn độc lập để xác nhận một cuộc trao đổi ChatGPT ngoài phiên Codex hiện tại.

### Mục đích

Lưu bổ sung nội dung tự thuật người dùng gửi về quá trình dùng AI ở Bước 1, có thời gian ghi và giữ nguyên lịch sử trước đó.

### Prompt

Yêu cầu thực tế: “từ nội dung trên, thêm vào AI usage log của Phúc, có ghi thời gian, giữ nguyên lịch sử trước đó, chỉ thêm vào thôi nha”. Nguồn: tệp văn bản đính kèm do người dùng cung cấp trong lượt yêu cầu này.

### Kết quả đề xuất

Nối nguyên văn bản tự thuật ở cuối mục này. Đây là nội dung do Phúc cung cấp, không phải xác nhận độc lập của Codex cho mọi hành động hoặc nhận định trong bản tự thuật. Không thay thế mục 001 hoặc cập nhật ngược trạng thái cũ.

### Phản biện

Phúc cung cấp tự thuật về việc đối chiếu phạm vi, giữ dữ liệu và class hiện có, kiểm tra Git, cùng các điểm cần kiểm trong hàm render; ghi nhận đây là phản biện do người dùng báo cáo. Một số chi tiết như yêu cầu AI cung cấp code hoàn chỉnh ở Bước 1, tự chạy từng lệnh Git hoặc tự đối chiếu toàn bộ code chưa có bằng chứng độc lập trong phiên hiện tại. Bảng trạng thái bên dưới là trạng thái được nêu trong bản tự thuật hồi cứu, không phủ nhận kết quả kiểm tra mô phỏng/commit đã ghi tại mục 001 và không chứng minh đã kiểm tra trình duyệt. Không suy ra Phúc đã hiểu toàn bộ code từ bản tự thuật.

### Quyết định của nhóm

Phúc yêu cầu lưu bổ sung bản cung cấp và giữ lịch sử. Chưa có xác nhận duyệt của toàn nhóm hoặc reviewer; chưa có yêu cầu commit/push phần bổ sung này.

### Người kiểm tra

Codex kiểm tra thao tác chỉ nối thêm; Phúc là người cung cấp bản tự thuật. Chờ Phúc kiểm tra tính chính xác, phân biệt hoạt động trực tiếp với nội dung tham khảo; chưa có reviewer xác nhận.

### Kiểm tra và minh chứng

Nguồn nội dung được giữ nguyên văn dưới đây; thời gian ghi thực tế lấy từ đồng hồ UTC chuyển sang UTC+07:00. Kiểm tra phần byte cũ của log không thay đổi sau khi nối và chạy `git diff --check`. Các kiểm thử chức năng/commit trước đó xem mục 001; không chạy lại hoặc tuyên bố thêm kết quả trình duyệt trong lần ghi này. Phản hồi hoặc đính chính sau đó phải nối mục mới dẫn mã 002.


# AI USAGE LOG – BUỔI 3
## Hiển thị danh sách sản phẩm từ dữ liệu JavaScript

**Thông tin người thực hiện**

| Nội dung | Thông tin |
|---|---|
| Họ và tên | Nguyễn Hồng Phúc |
| Vai trò | FD2 – Phúc |
| Dự án | DAYORA – Website thương mại điện tử |
| Buổi học | Buổi 3 |
| Nhiệm vụ | HW-P1-FD2-1 – Hiển thị danh sách sản phẩm từ dữ liệu JS |
| Repository | `liemnguyen-work/ecommerce-dayora-project` |
| Branch | `hw/p1-fd2-1` |
| AI hỗ trợ | ChatGPT |

---

## 1. Mục đích sử dụng AI

Trong quá trình thực hiện BTVN Buổi 3, tôi sử dụng ChatGPT như một công cụ hỗ trợ học tập và giải quyết vấn đề kỹ thuật trong quá trình lập trình JavaScript thuần (Vanilla JavaScript).

Mục đích sử dụng AI bao gồm:

- Hỗ trợ phân tích yêu cầu của từng sub-issue trước khi triển khai.
- Giải thích các kiến thức JavaScript liên quan như DOM, `querySelector()`, `innerHTML`, `map()`, `join()` và template literal.
- Hỗ trợ đọc hiểu cấu trúc code hiện có và xác định những phần cần chỉnh sửa.
- Tham khảo cách triển khai chức năng hiển thị danh sách sản phẩm từ dữ liệu JavaScript.
- Hỗ trợ phát hiện lỗi, kiểm tra điều kiện hoàn thành và đề xuất hướng khắc phục.

AI được sử dụng với vai trò trợ lý kỹ thuật, không thay thế việc tự đọc yêu cầu, tìm hiểu kiến thức, kiểm tra code và chịu trách nhiệm đối với sản phẩm cuối cùng.

## 2. Nhật ký sử dụng AI

### 2.1. Phân tích yêu cầu và chuẩn bị môi trường

**Mục tiêu:** Hiểu phạm vi công việc, xác định repository, branch và các file cần chỉnh sửa trước khi lập trình.

**Nội dung trao đổi với AI:**

Yêu cầu AI hướng dẫn thực hiện task `HW-P1-FD2-1`, bao gồm việc cập nhật code từ repository nhóm, chuyển sang branch `hw/p1-fd2-1` và triển khai lần lượt 5 sub-issue.

**AI đã hỗ trợ:**
- Phân chia công việc thành các giai đoạn.
- Hướng dẫn sử dụng `git status`, `git fetch`, `git switch` và `git pull`.
- Giải thích mục đích của từng lệnh Git.
- Nhắc nhở kiểm tra thay đổi chưa commit trước khi cập nhật code.

**Phản biện và xử lý của người thực hiện:**

Tôi không thực hiện các lệnh Git một cách máy móc mà kiểm tra trạng thái repository trước khi thao tác. Sau khi tạo branch `hw/p1-fd2-1`, tôi sử dụng `git status` và `git branch` để xác nhận branch đang hoạt động.

Kết quả kiểm tra tại thời điểm trao đổi cho thấy tôi đã chuyển sang đúng branch và working tree sạch. Tôi cũng yêu cầu kiểm tra remote trước khi tiếp tục đồng bộ code để tránh thao tác nhầm repository.

### 2.2. Phân tích yêu cầu HW-P1-FD2-1.1

**Mục tiêu:** Xây dựng vùng chứa danh sách sản phẩm trong `products.html` và hàm `renderProducts(list)` trong `render-products.js`.

**Nội dung trao đổi với AI:**

Tôi cung cấp nội dung Issue #530 và yêu cầu AI hướng dẫn thực hiện bước 1/5, tập trung vào việc thay thế 8 thẻ sản phẩm HTML viết thủ công bằng các thẻ được tạo động từ dữ liệu JavaScript.

**AI đã hỗ trợ:**
- Giải thích luồng dữ liệu từ `products.js` đến giao diện.
- Xác định hai file cần chỉnh sửa:
  - `session3/products.html`.
  - `session3/js/modules/render-products.js`.
- Giải thích vai trò của `querySelector()`, `map()`, template literal, `join("")` và `innerHTML`.
- Đưa ra khung triển khai để tôi hiểu cấu trúc hàm trước khi viết code.

**Phản biện và xử lý của người thực hiện:**

Tôi nhận thấy việc triển khai không nên làm thay đổi giao diện Buổi 2 hoặc tạo lại dữ liệu sản phẩm, vì dự án đã có sẵn `products.js` với 8 sản phẩm.

Do đó, tôi cung cấp code HTML và JavaScript hiện tại để AI phân tích dựa trên cấu trúc thực tế, thay vì yêu cầu AI xây dựng một ví dụ độc lập không liên quan đến dự án.

### 2.3. Kiểm tra cấu trúc code hiện có

**Mục tiêu:** Xác định khả năng tái sử dụng dữ liệu và các hàm đã được xây dựng trước đó.

**Thông tin tôi cung cấp cho AI:**

- Nội dung `products.html`, bao gồm 8 thẻ sản phẩm viết sẵn.
- Nội dung `products.js`, bao gồm mảng `products` với 8 đối tượng sản phẩm.
- Hàm `formatPrice(number)`.
- Hàm `getProductById(id)`.
- Cấu trúc các file JavaScript được khai báo trong HTML.

**AI đã hỗ trợ:**
- Xác nhận dữ liệu sản phẩm đã có đủ các thuộc tính cần thiết: `id`, `name`, `price`, `image`, `category`, `description`.
- Xác định có thể sử dụng lại `formatPrice()` để định dạng giá tiền.
- Phân tích thứ tự tải các file JavaScript có thuộc tính `defer`.
- Đề xuất chỉ xóa 8 thẻ `<li>` viết tay và giữ nguyên thẻ `<ul class="product-grid">`.
- Đề xuất giữ nguyên các class CSS để hạn chế ảnh hưởng đến giao diện cũ.

**Phản biện và xử lý của người thực hiện:**

Tôi đối chiếu đề xuất của AI với cấu trúc thực tế của dự án. Tôi lựa chọn giữ nguyên dữ liệu trong `products.js`, không tạo thêm một mảng sản phẩm mới trong `render-products.js`.

Tôi cũng giữ nguyên cấu trúc HTML tổng thể, header, footer, CSS và các script khác vì chúng không thuộc phạm vi chỉnh sửa của sub-issue này.

### 2.4. Tham khảo và hoàn thiện hàm renderProducts(list)

**Mục tiêu:** Tạo danh sách sản phẩm bằng JavaScript thay vì viết cố định trong HTML.

**Nội dung trao đổi với AI:**

Sau khi nhận được khung code và hiểu cấu trúc cần triển khai, tôi yêu cầu AI cung cấp phiên bản code hoàn chỉnh để đối chiếu và thực hiện.

**AI đã hỗ trợ:**

Đề xuất triển khai hàm `renderProducts(list)` với các thành phần:

1. Sử dụng `document.querySelector(".product-grid")` để tìm vùng chứa.
2. Kiểm tra sự tồn tại của vùng chứa trước khi thao tác.
3. Sử dụng `list.map()` để chuyển từng đối tượng sản phẩm thành chuỗi HTML.
4. Sử dụng template literal để đưa dữ liệu sản phẩm vào các thẻ HTML.
5. Sử dụng `.join("")` để nối các chuỗi HTML.
6. Sử dụng `container.innerHTML` để hiển thị danh sách sản phẩm.
7. Gọi `renderProducts(products)` để hiển thị dữ liệu ban đầu.

**Phản biện và xử lý của người thực hiện:**

Tôi đối chiếu code AI đề xuất với tiêu chí của Issue #530 và nhận thấy cần đặc biệt chú ý những điểm sau:

- Không thay đổi tên hàm `renderProducts(list)`.
- Không thay đổi selector `.product-grid`.
- Không thay đổi class `product-grid-item` và `product-card`.
- Phải sử dụng `formatPrice(product.price)` thay vì tự định dạng giá thủ công.
- Phải có `.join("")` để tránh dấu phẩy xuất hiện giữa các thẻ HTML.
- Phải có điều kiện kiểm tra container trước khi gán `innerHTML`.
- Không đưa chức năng của các bước sau vào phạm vi bước 1 khi chưa được yêu cầu.

Tôi xác định đây là phần code tham khảo cần được kiểm tra và hiểu rõ trước khi sử dụng, không mặc định mọi đề xuất của AI đều phù hợp với quy ước dự án.

## 3. Đánh giá và kiểm chứng kết quả

Việc sử dụng AI không được xem là bằng chứng cho thấy chức năng đã hoàn thành. Kết quả cần được kiểm tra trực tiếp trên dự án.

Các tiêu chí kiểm chứng đối với HW-P1-FD2-1.1:

| Tiêu chí | Cách kiểm tra | Trạng thái |
|---|---|---|
| Xóa 8 thẻ HTML viết tay | Kiểm tra `products.html` | Cần xác nhận |
| Giữ vùng chứa `.product-grid` | Kiểm tra HTML | Cần xác nhận |
| Có hàm `renderProducts(list)` | Kiểm tra JavaScript | Đã có code đề xuất |
| Sử dụng `map()` và template literal | Kiểm tra hàm render | Đã có code đề xuất |
| Sử dụng `join("")` | Kiểm tra hàm render | Đã có code đề xuất |
| Có kiểm tra container | Kiểm tra điều kiện `if` | Đã có code đề xuất |
| Gọi `renderProducts(products)` | Kiểm tra cuối file | Đã có code đề xuất |
| Hiển thị đủ 8 sản phẩm | Kiểm tra trên trình duyệt | Chưa xác nhận |
| Giao diện giống Buổi 2 | So sánh giao diện | Chưa xác nhận |
| Không có lỗi JavaScript | Kiểm tra DevTools Console | Chưa xác nhận |

**Lưu ý:** Các trạng thái trên phân biệt rõ code AI đã đề xuất với kết quả thực tế đã được kiểm chứng. Chỉ cập nhật thành hoàn thành sau khi trực tiếp chạy thử.

## 4. Tự đánh giá quá trình sử dụng AI

Thông qua Buổi 3, tôi nhận thấy AI có thể hỗ trợ rút ngắn thời gian tìm hiểu cú pháp và định hướng triển khai, nhưng vẫn cần sự kiểm soát của người lập trình.

Một số nguyên tắc tôi áp dụng:

- Cung cấp đầy đủ bối cảnh và code hiện có để AI hiểu đúng vấn đề.
- Ưu tiên yêu cầu AI giải thích và đưa ra hướng tiếp cận trước khi yêu cầu code hoàn chỉnh.
- Đối chiếu câu trả lời với issue, tiêu chí nghiệm thu và quy ước của nhóm.
- Không sao chép những phần code không thuộc phạm vi công việc.
- Tự kiểm tra kết quả bằng trình duyệt, DevTools và Git.
- Không khai báo những kết quả kiểm thử hoặc tiến độ chưa thực sự thực hiện.

**Bài học rút ra:** AI có thể hỗ trợ tạo ra một phương án kỹ thuật, nhưng người thực hiện phải hiểu được luồng dữ liệu, lý do sử dụng từng phương thức JavaScript và khả năng ảnh hưởng đến các thành phần khác của dự án. Việc hoàn thành nhiệm vụ không chỉ là làm cho code chạy được mà còn phải giải thích được code và chịu trách nhiệm với những thay đổi đã đưa vào repository.

## 5. Kết luận

Trong Buổi 3, tôi sử dụng ChatGPT để hỗ trợ phân tích yêu cầu, tìm hiểu kiến thức JavaScript, đọc cấu trúc code hiện có và tham khảo cách triển khai chức năng hiển thị danh sách sản phẩm động.

Tôi chủ động cung cấp dữ liệu thực tế của dự án, đối chiếu các đề xuất của AI với yêu cầu kỹ thuật và giới hạn phạm vi chỉnh sửa theo từng sub-issue.

AI đóng vai trò là công cụ hỗ trợ học tập và tham khảo giải pháp. Tôi chịu trách nhiệm kiểm tra, hiểu, xác nhận tính đúng đắn và hoàn thiện sản phẩm trước khi commit và gửi reviewer.

# AI USAGE LOG — PRJ-P1-FD2-1

## Đăng nhập, đăng ký và trạng thái đăng nhập

**Thông tin người thực hiện**

| Nội dung             | Thông tin                                  |
| -------------------- | ------------------------------------------ |
| Họ và tên            | Nguyễn Hồng Phúc                           |
| Vai trò              | FD2 – Phúc                                 |
| Dự án                | DAYORA – Website thương mại điện tử        |
| Nhiệm vụ             | PRJ-P1-FD2-1 (#29)                         |
| Repository           | `liemnguyen-work/ecommerce-dayora-project` |
| Branch               | `prj/p1-fd2-1`                             |
| Reviewer             | FD1 – Thành                                |
| Công cụ AI | ChatGPT / Codex                            |

---

## 1. Mục đích sử dụng AI

Trong quá trình thực hiện PRJ-P1-FD2-1, tôi sử dụng AI để tìm hiểu cách xây dựng hệ thống đăng nhập và quản lý trạng thái xác thực trong ứng dụng React kết hợp TypeScript.

Mục đích sử dụng AI bao gồm:

- Phân tích yêu cầu của sáu sub-issue và xác định thứ tự triển khai phù hợp.
- Giải thích cơ chế Context API, AuthProvider và custom hook `useAuth`.
- Hỗ trợ tìm hiểu cách xây dựng form đăng nhập, xử lý dữ liệu và gọi API.
- Phân tích cách hiển thị lỗi từ server và quản lý trạng thái loading.
- Đánh giá cơ chế chuyển hướng sau đăng nhập bằng `?next=`.
- Hỗ trợ tự review, phát hiện các trường hợp ngoại lệ và chuẩn bị kiểm tra kiến thức.

AI được sử dụng như một công cụ hỗ trợ học tập và phân tích giải pháp kỹ thuật. Các đề xuất cần được đối chiếu với yêu cầu của issue, cấu trúc repository và kết quả kiểm thử thực tế.

## 2. Nhật ký sử dụng AI

### 2.1. Phân tích yêu cầu và chuẩn bị môi trường

**Liên quan:** PRJ-P1-FD2-1 (#29)

**Mục tiêu:** Xác định phạm vi nhiệm vụ, các thành phần phụ thuộc và những file cần chỉnh sửa trước khi lập trình.

**Prompt:**

> Tôi đang thực hiện task PRJ-P1-FD2-1 gồm sáu sub-issue liên quan đến đăng nhập và trạng thái xác thực. Hãy giúp tôi phân tích thứ tự thực hiện, những kiến thức React cần nắm và các phụ thuộc từ frontend, backend. Tôi muốn hạn chế chỉnh sửa những phần không thuộc nhiệm vụ của mình.

**Phản hồi AI:**

- Kiểm tra việc tích hợp router, layout và API từ task FD1.
- Xác định các endpoint xác thực do backend cung cấp.
- Triển khai `auth.tsx` trước khi xây dựng giao diện đăng nhập.
- Tích hợp AuthProvider tại cấp ứng dụng.
- Xây dựng LoginPage, xử lý lỗi và bổ sung điều hướng.
- Thực hiện kiểm tra kiến thức sau khi hoàn thành các bước chức năng.

**Phản biện và xử lý của người thực hiện:**

Tôi nhận thấy không nên triển khai LoginPage ngay khi chưa xác định được cách lưu và chia sẻ trạng thái đăng nhập. Nếu mỗi trang tự quản lý thông tin người dùng thì có thể xảy ra tình trạng dữ liệu không đồng bộ.

Tôi cũng lưu ý rằng task này phụ thuộc vào router và API backend. Vì vậy, việc tự tạo thêm endpoint hoặc thay đổi cấu trúc router khi chưa kiểm tra phần việc của các thành viên khác có thể gây xung đột.

**Quyết định:** Giữ đúng phạm vi FD2, triển khai lần lượt sáu sub-issue và ưu tiên tái sử dụng các thành phần đã có trong dự án.

---

### 2.2. Xây dựng `lib/auth.tsx`

**Sub-issue:** PRJ-P1-FD2-1.1

**Mục tiêu:** Xây dựng cơ chế quản lý trạng thái xác thực dùng chung cho ứng dụng.

**Prompt:**

> Theo tôi hiểu, AuthContext giúp các component truy cập trạng thái đăng nhập mà không phải truyền props qua nhiều cấp. Tôi dự định tạo AuthProvider để quản lý user và hàm login, sau đó dùng useAuth ở những component cần thiết. Hãy kiểm tra cách hiểu này và giải thích các trường hợp dễ phát sinh lỗi.

**Phản hồi AI:**

- Sử dụng Context API để chia sẻ trạng thái xác thực.
- Tạo AuthProvider quản lý thông tin người dùng và các thao tác xác thực.
- Tạo custom hook `useAuth` để các component truy cập Context.
- Xử lý trường hợp component gọi useAuth ngoài phạm vi Provider.
- Phân biệt trạng thái chưa đăng nhập với trạng thái đang khôi phục phiên đăng nhập.

**Phản biện và xử lý của người thực hiện:**

Tôi đồng ý với cách sử dụng Context API nhưng nhận thấy AI mới giải thích cơ chế chia sẻ trạng thái ở frontend, chưa đủ để kết luận hệ thống đã xác thực an toàn.

Nếu chỉ kiểm tra biến `user` khác null thì giao diện có thể cho rằng người dùng đã đăng nhập, trong khi phiên xác thực thực tế có thể đã hết hạn hoặc không còn hợp lệ.

Tôi cũng cân nhắc việc không đưa quá nhiều logic giao diện vào AuthContext để tránh làm Context khó bảo trì.

**Quyết định:** Tập trung logic quản lý trạng thái và thao tác xác thực trong `lib/auth.tsx`, đồng thời để backend quyết định tính hợp lệ của phiên đăng nhập.

**Kiểm chứng cần thực hiện:** Kiểm tra cách useAuth hoạt động trong và ngoài Provider, phản hồi khi đăng nhập thất bại và trạng thái sau khi tải lại trang.

---

### 2.3. Tích hợp AuthProvider trong `main.tsx`

**Sub-issue:** PRJ-P1-FD2-1.2

**Mục tiêu:** Đảm bảo các component cần xác thực có thể sử dụng chung AuthContext.

**Prompt:**

> Tôi đã có AuthProvider và muốn bọc ứng dụng trong main.tsx. Theo tôi, cách này giúp Header, LoginPage và các trang khác sử dụng cùng trạng thái đăng nhập. Nếu chỉ đặt Provider trong LoginPage thì có vấn đề gì? Hãy review vị trí đặt Provider.

**Phản hồi AI:**

AuthProvider nên bao bọc các component cần sử dụng Context. Nếu Provider chỉ nằm trong LoginPage, các component bên ngoài sẽ không truy cập được trạng thái từ Provider đó.

**Phản biện và xử lý của người thực hiện:**

Ban đầu tôi nghĩ chỉ cần Provider ở trang đăng nhập vì đây là nơi gửi thông tin tài khoản. Tuy nhiên, khi xét đến Header và các trang yêu cầu xác thực, tôi nhận thấy trạng thái đăng nhập phải được chia sẻ xuyên suốt ứng dụng.

Tôi cũng lưu ý rằng vị trí Provider cần phù hợp với cấu trúc router hiện có. Không nên thay đổi toàn bộ cách tổ chức ứng dụng chỉ để thêm một Context.

**Quyết định:** Tích hợp AuthProvider ở cấp ứng dụng trong `main.tsx`, giữ nguyên các Provider và cấu trúc router khác nếu không có yêu cầu thay đổi.

**Kiểm chứng cần thực hiện:** Kiểm tra LoginPage và các component sử dụng useAuth có nhận được cùng trạng thái hay không.

---

### 2.4. Xây dựng `LoginPage.tsx`

**Sub-issue:** PRJ-P1-FD2-1.3

**Mục tiêu:** Xây dựng giao diện đăng nhập và kết nối với logic xác thực.

**Prompt:**

> Tôi muốn xây dựng form đăng nhập bằng React với hai trường email và mật khẩu. Tôi dự định dùng useState để quản lý dữ liệu, gọi login từ useAuth khi submit và điều hướng sau khi server xác nhận thành công. Hãy phân tích cách tổ chức form và những lỗi thường gặp, không viết lại toàn bộ ứng dụng.

**Phản hồi AI:**

- Sử dụng controlled input để quản lý dữ liệu form.
- Xử lý submit thông qua sự kiện `onSubmit`.
- Ngăn hành vi tải lại trang mặc định.
- Gọi hàm login bất đồng bộ từ AuthContext.
- Chỉ điều hướng sau khi đăng nhập thành công.
- Tách phần giao diện khỏi logic gọi API.

**Phản biện và xử lý của người thực hiện:**

Tôi nhận thấy việc sử dụng useState phù hợp với form có ít trường dữ liệu, chưa cần bổ sung thư viện quản lý form phức tạp.

Tuy nhiên, tôi không lựa chọn phương án chỉ kiểm tra email và mật khẩu ở frontend rồi tự cập nhật trạng thái đăng nhập. Cách này không phản ánh kết quả xác thực thực tế từ server.

Tôi cũng lưu ý việc giữ nguyên cấu trúc giao diện và các quy ước CSS của dự án thay vì tạo một trang đăng nhập hoàn toàn độc lập.

**Quyết định:** Xây dựng LoginPage theo hướng sử dụng logic từ useAuth, không lặp lại cơ chế gọi API xác thực trong từng component.

**Kiểm chứng cần thực hiện:** Kiểm tra nhập liệu, submit bằng Enter, đăng nhập thành công và đăng nhập thất bại.

---

### 2.5. Hiển thị lỗi từ server và khóa nút khi đang gửi

**Sub-issue:** PRJ-P1-FD2-1.4

**Mục tiêu:** Cải thiện xử lý lỗi và hạn chế gửi request trùng lặp.

**Prompt:**

> Khi người dùng nhập sai mật khẩu hoặc sử dụng email đã tồn tại trong luồng đăng ký, tôi muốn giao diện hiển thị lỗi phù hợp từ server. Tôi dự định sử dụng loading để khóa nút submit khi request đang xử lý. Hãy review cách làm này và chỉ ra những trường hợp có thể bị bỏ sót.

**Phản hồi AI:**

- Quản lý riêng trạng thái `loading` và `error`.
- Xóa thông báo lỗi cũ khi bắt đầu một lần submit mới.
- Sử dụng `try/catch/finally` để xử lý request.
- Vô hiệu hóa nút submit trong thời gian chờ.
- Chuyển thông báo lỗi kỹ thuật thành nội dung dễ hiểu khi cần thiết.

**Phản biện và xử lý của người thực hiện:**

Tôi nhận thấy việc chỉ đổi nội dung nút thành “Đang đăng nhập...” không ngăn được người dùng tiếp tục gửi request. Vì vậy, cần kiểm soát cả trạng thái disabled và logic submit.

Ngoài ra, không nên hiển thị nguyên văn tất cả thông báo lỗi từ server, đặc biệt khi thông báo chứa thông tin kỹ thuật hoặc dữ liệu không phù hợp với người dùng cuối.

Tôi cũng nhận thấy nếu không đặt lại loading khi xảy ra exception, nút đăng nhập có thể bị khóa vĩnh viễn.

**Quyết định:** Sử dụng loading để kiểm soát quá trình submit và đảm bảo trạng thái được khôi phục sau khi request kết thúc.

**Kiểm chứng cần thực hiện:** Thử sai mật khẩu, lỗi mạng, gửi form liên tục và gửi lại sau khi thất bại.

---

### 2.6. Xử lý chuyển hướng bằng `?next=`

**Sub-issue:** PRJ-P1-FD2-1.5

**Mục tiêu:** Đưa người dùng quay lại trang dự định truy cập sau khi đăng nhập.

**Prompt:**

> Tôi muốn sử dụng query parameter next để ghi nhớ trang người dùng đang truy cập trước khi bị chuyển đến LoginPage. Theo tôi, sau khi đăng nhập thành công chỉ cần đọc next và dùng navigate để chuyển trang. Hãy kiểm tra phương án này và phân tích những rủi ro bảo mật có thể xảy ra.

**Phản hồi AI:**

- Đọc query parameter bằng `URLSearchParams`.
- Điều hướng đến trang được chỉ định sau khi đăng nhập thành công.
- Sử dụng đường dẫn mặc định nếu không có next.
- Kiểm tra giá trị next trước khi điều hướng.
- Không chấp nhận URL ngoài hệ thống hoặc đường dẫn không hợp lệ.

**Phản biện và xử lý của người thực hiện:**

Ban đầu tôi cho rằng next chỉ là một đường dẫn nội bộ nên có thể sử dụng trực tiếp. Tuy nhiên, query parameter có thể bị thay đổi thủ công trên thanh địa chỉ.

Tôi nhận thấy nếu không kiểm tra next, hệ thống có thể phát sinh lỗi open redirect. Việc điều hướng đến một trang cũng không đồng nghĩa người dùng đã có quyền truy cập dữ liệu của trang đó.

**Quyết định:** Kiểm tra giá trị next, chỉ chấp nhận đường dẫn nội bộ phù hợp và sử dụng đường dẫn mặc định khi giá trị không hợp lệ.

**Kiểm chứng cần thực hiện:** Thử next hợp lệ, thiếu next, next chứa URL bên ngoài và trường hợp trang đích yêu cầu quyền truy cập.

---

### 2.7. Kiểm tra kiến thức và tự review

**Sub-issue:** PRJ-P1-FD2-1.6

**Mục tiêu:** Tự giải thích các kiến thức đã sử dụng và xác định những điểm cần kiểm tra trước khi gửi review.

**Prompt:**

> Tôi đã triển khai các bước liên quan đến AuthContext, AuthProvider, LoginPage, xử lý lỗi và điều hướng sau đăng nhập. Hãy đóng vai reviewer frontend, đưa ra các câu hỏi kiểm tra kiến thức và nhận xét những rủi ro có thể còn tồn tại. Không mặc định code đã đúng khi chưa có kết quả kiểm thử.

**Phản hồi AI:**

Tập trung kiểm tra các vấn đề: phạm vi chia sẻ Context, xử lý bất đồng bộ, phân biệt xác thực frontend/backend, khôi phục phiên đăng nhập, trạng thái lỗi và kiểm tra đường dẫn điều hướng.

**Phản biện và xử lý của người thực hiện:**

Tôi nhận thấy một chức năng có thể hoạt động trong trường hợp đăng nhập thành công nhưng vẫn còn lỗi ở các tình huống khác như mất kết nối, tải lại trang hoặc phiên đăng nhập hết hạn.

Tôi cũng không xem việc AI nhận xét code hợp lý là bằng chứng đã hoàn thành task. Cần kiểm tra trực tiếp bằng công cụ của dự án và đối chiếu với tiêu chí nghiệm thu.

**Quyết định:** Tự giải thích lại từng phần code, kiểm tra các trường hợp ngoại lệ và chỉ gửi review sau khi có kết quả kiểm thử thực tế.

---

## 3. Đánh giá và kiểm chứng kết quả

Theo thông tin issue được cung cấp, cả sáu sub-issue đều ở trạng thái Closed. Tuy nhiên, trạng thái issue không thay thế cho bằng chứng kiểm thử mã nguồn.

| Tiêu chí | Cách kiểm tra | Trạng thái |
|---|---|---|
| Hoàn thành 6 sub-issue | Kiểm tra sáu sub-issue | Closed theo dữ liệu cung cấp |
| AuthContext và useAuth | Đọc `lib/auth.tsx` | Chưa đối chiếu code |
| AuthProvider | Kiểm tra `main.tsx` | Chưa đối chiếu code |
| LoginPage | Kiểm tra giao diện và API | Chưa xác minh |
| Hiển thị lỗi server | Thử sai thông tin đăng nhập | Chưa xác minh |
| Khóa nút khi submit | Thử request đang xử lý | Chưa xác minh |
| Điều hướng `?next=` | Thử URL hợp lệ và không hợp lệ | Chưa xác minh |
| Kiểm tra lint | `npm run lint` | Chưa có output |
| Kiểm tra build | `npm run build` | Chưa có output |
| Kiểm tra PR | Xem PR và lịch sử merge | Chưa có mã PR |
| Review của FD1 Thành | Kiểm tra nhận xét reviewer | Chưa có minh chứng |

**Lưu ý:** Không tự chuyển các trạng thái chưa xác minh thành Pass chỉ dựa trên kết quả AI đề xuất hoặc việc issue đã được đóng.

## 4. Tự đánh giá quá trình sử dụng AI

Thông qua việc tham khảo AI cho nhiệm vụ PRJ-P1-FD2-1, tôi nhận thấy các câu hỏi hiệu quả nhất không chỉ yêu cầu AI giải thích cách viết code mà còn yêu cầu phân tích những trường hợp có thể xảy ra lỗi.

Một số nguyên tắc cần áp dụng:

- Đọc yêu cầu sub-issue và xác định phạm vi trước khi tham khảo AI.
- Nêu cách hiểu ban đầu để AI có cơ sở phản biện.
- Ưu tiên giải thích nguyên nhân và hướng xử lý thay vì sao chép giải pháp.
- Đối chiếu các đề xuất với API, router và cấu trúc code hiện có.
- Phân biệt rõ kiểm tra ở frontend và xác thực quyền ở backend.
- Không xem kết quả AI review là kết quả kiểm thử thực tế.
- Ghi nhận rõ phần AI hỗ trợ, phần tự thực hiện và những nội dung chưa xác minh.

**Bài học rút ra:** Xây dựng chức năng đăng nhập không chỉ là tạo form và gửi request. Người lập trình cần hiểu cách chia sẻ trạng thái, xử lý bất đồng bộ, quản lý lỗi, bảo vệ luồng điều hướng và phối hợp với cơ chế xác thực của backend.

## 5. Kết luận

Nhật ký này tổng hợp nội dung học tập và trao đổi với AI theo sáu bước của PRJ-P1-FD2-1, từ phân tích yêu cầu đến kiểm tra kiến thức.

Các nội dung phản biện tập trung vào việc đánh giá tính phù hợp của phản hồi AI với dự án DAYORA, xác định rủi ro và lựa chọn hướng xử lý có cơ sở kỹ thuật.

Các kết quả kiểm thử, commit và nhận xét reviewer chỉ được cập nhật khi có minh chứng tương ứng.

