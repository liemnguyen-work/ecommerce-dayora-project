# Bài tập nhóm Buổi 3: JavaScript — hướng dẫn chi tiết cho DAYORA

Tài liệu hướng dẫn thực hiện bài tập nhóm Buổi 3 môn Phát triển Ứng dụng Web (Đề gốc: `BaiTap_Nhom_Buoi3.pdf` của TS Nguyễn Mạnh Tuấn).

Tài liệu này được viết chi tiết từng bước cho sinh viên mới học lập trình, phân chia khối lượng công việc rõ ràng cho 8 thành viên, hướng dẫn chi tiết cách thao tác Git, mở và sử dụng Chrome DevTools để kiểm tra, cũng như các lưu ý để tránh các lỗi thường gặp khi lập trình JavaScript thuần.

**Hạn nộp bài:** 11/11/2026.
**Quản lý tiến độ trên GitHub:** Mỗi người sở hữu một issue cha `HW-P1-<VAI>-1` ở repo Minh, theo dõi trên view **BTVN 3** trong Project "DAYORA — Tiến độ nhóm". Mỗi task cha được chia thành các sub-issue nhỏ, **mỗi sub-issue tương ứng với đúng 1 commit** trong repo nhóm (repo Liêm: `liemnguyen-work/ecommerce-dayora-project`).

> [!IMPORTANT]
> **Quy tắc nhận task:** Roadmap BTVN chỉ hiện các bước nhỏ (sub-issue). Trước khi làm bước `.1`, bấm link **task cha** trong khung "Bối cảnh" ở đầu sub-issue, đọc mục "Học trước khi làm" và file hướng dẫn riêng của bạn, rồi tích ô "Tôi đã đọc…" ở sub-issue `.1`. Các bước sau: đọc khung Bối cảnh trước khi làm.

---

## 0. Luật chơi và tiêu chuẩn kỹ thuật

Mục tiêu của Buổi 3 là tích hợp tính năng động bằng **JavaScript thuần (Vanilla JavaScript)** vào giao diện website tĩnh đã xây dựng ở Buổi 2. **Tuyệt đối không làm lại website từ đầu**, giữ nguyên phong cách thiết kế và các class CSS đã có từ Buổi 2.

### Bảng quy định công nghệ

| Được phép sử dụng | Nghiêm cấm sử dụng |
|---|---|
| JavaScript thuần (ES6+) viết trong các file `.js` riêng biệt, nạp vào HTML bằng thẻ `<script src="..." defer>` | React, Vue, Angular, jQuery hoặc bất kỳ thư viện / framework JavaScript bên ngoài nào |
| Các phương thức mảng tiêu chuẩn: `Array.map`, `filter`, `sort`, `find`, `findIndex`, `reduce`, `new Set` | Backend thật, cơ sở dữ liệu SQL/NoSQL, Node.js server, API mạng bên ngoài |
| Chuỗi mẫu Template Literal (dấu backtick `` ` ``), đối tượng `URLSearchParams`, `localStorage`, `Intl.NumberFormat` | Thanh toán thật, cổng thanh toán ngân hàng, chức năng đăng nhập tài khoản người dùng thật |
| Tái sử dụng toàn bộ cấu trúc HTML, CSS và hình ảnh đã có ở `session2/` | Viết mã JavaScript nội dòng `onclick="..."`, `onchange="..."` trực tiếp trong thẻ HTML |
| Bổ sung các khối CSS mới vào cuối file `session3/css/style.css` (khu 9 và khu 10) | Chép mã nguồn từ thư mục `apps/web/` của repo DAYORA (khác công nghệ React/TypeScript) |

### Lệnh kiểm tra tuân thủ trước khi nộp bài

Mở terminal tại thư mục gốc của repo nhóm và chạy 2 lệnh sau:

```bash
# 1. Quét kiểm tra mã inline sự kiện và thẻ <script> không có src
grep -rn --include=*.html "onclick=\|<script>" session3/

# 2. Quét kiểm tra việc sử dụng thư viện cấm
grep -rln "jquery\|react\|vue" session3/
```

*Kết quả mong đợi:* Cả 2 lệnh đều chạy xong im lặng (không in ra bất kỳ dòng nào). Nếu có dòng nào xuất hiện, bạn cần mở file đó ra và sửa lại ngay.

---

## 1. Nơi làm bài và cấu trúc thư mục

Toàn bộ bài tập Buổi 3 được thực hiện trong thư mục **`session3/`** của repo nhóm (`liemnguyen-work/ecommerce-dayora-project`).

Ở bước đầu tiên, Kiệt (DevOps) sao chép nguyên vẹn thư mục `session2/` sang `session3/`. Toàn bộ bài làm Buổi 2 trong `session2/` được giữ nguyên làm bằng chứng đối chiếu.

### Cây thư mục chuẩn của `session3/`

```text
session3/
├─ index.html                     # Trang chủ (nạp products.js, cart.js, cart-page.js)
├─ products.html                  # Danh sách sản phẩm (nạp products.js, cart.js, render-products.js, search-filter.js, cart-page.js)
├─ product-detail.html            # Chi tiết sản phẩm (nạp products.js, cart.js, product-detail.js, cart-page.js)
├─ about.html                     # Giới thiệu (nạp products.js, cart.js, cart-page.js)
├─ cart.html                      # MỚI: Trang giỏ hàng (nạp products.js, cart.js, cart-page.js)
├─ css/
│  └─ style.css                   # Thêm khu 9 (Giỏ hàng - Đạt) và khu 10 (Tìm kiếm/lọc - Thành)
├─ images/                        # Giữ nguyên toàn bộ logo và 8 ảnh sản phẩm từ Buổi 2
├─ js/
│  ├─ data/
│  │  └─ products.js              # Châu: mảng dữ liệu products dùng chung, formatPrice, getProductById
│  └─ modules/
│     ├─ cart.js                  # Châu: logic giỏ hàng, loadCart, saveCart, addToCart, localStorage
│     ├─ render-products.js       # Phúc: render danh sách sản phẩm động vào products.html
│     ├─ search-filter.js         # Thành: tìm kiếm theo tên, lọc danh mục, sắp xếp giá
│     ├─ product-detail.js        # Hoàn: đọc id từ URL, hiển thị thông tin sản phẩm tương ứng
│     └─ cart-page.js             # Đạt: giao diện bảng giỏ hàng trong cart.html và cập nhật badge menu
├─ docs/
│  ├─ ke-hoach.md                 # Liêm: kế hoạch phân công, mốc thời gian, phụ thuộc
│  ├─ quy-uoc.md                  # Liêm: 7 quy ước chung của nhóm về dữ liệu và hàm
│  ├─ kiem-thu.md                 # Ngọc: bảng 16 ca kiểm thử, kết quả thực tế, danh sách lỗi
│  ├─ github.md                   # Kiệt: thống kê commit, PR và bằng chứng tích hợp
│  ├─ trinh-bay.md                # Liêm: kịch bản trình bày báo cáo 5 phút
│  ├─ screenshots/                # Ngọc: 15 ảnh chụp màn hình kiểm tra (1366px, 768px, 390px)
│  ├─ ai-usage.md                 # Cả nhóm: ghi lại các prompt AI đã sử dụng
│  └─ answers/
│     ├─ Liem.md                  # Liêm: tự trả lời kiểm tra kiến thức
│     ├─ Kiet.md                  # Kiệt: tự trả lời kiểm tra kiến thức
│     ├─ Chau.md                  # Châu: tự trả lời kiểm tra kiến thức
│     ├─ Phuc.md                  # Phúc: tự trả lời kiểm tra kiến thức
│     ├─ Thanh.md                 # Thành: tự trả lời kiểm tra kiến thức
│     ├─ Hoan.md                  # Hoàn: tự trả lời kiểm tra kiến thức
│     ├─ Dat.md                   # Đạt: tự trả lời kiểm tra kiến thức
│     └─ Ngoc.md                  # Ngọc: tự trả lời kiểm tra kiến thức
└─ README.md                      # Liêm: tổng quan dự án đủ 10 mục chuẩn
```

### Quy tắc nạp thẻ `<script defer>`

Mọi file JavaScript phải được nạp bằng thẻ `<script src="..." defer></script>` đặt trong thẻ `<head>` hoặc trước thẻ đóng `</body>`.
- **Vì sao cần `defer`?** Thuộc tính `defer` yêu cầu trình duyệt tải file script song song nhưng chỉ thực thi mã sau khi toàn bộ cây HTML đã được phân tích cú pháp (parsed) xong. Điều này giúp các lệnh `document.querySelector` không bao giờ bị trả về `null`.
- **Thứ tự nạp script:** Trình duyệt thực thi các file có `defer` theo đúng thứ tự xuất hiện từ trên xuống dưới. Vì vậy, file dữ liệu `products.js` luôn phải đứng trước, tiếp theo là `cart.js`, rồi mới đến module điều khiển giao diện của từng trang.

```html
<!-- Ví dụ trong products.html -->
<script src="js/data/products.js" defer></script>
<script src="js/modules/cart.js" defer></script>
<script src="js/modules/render-products.js" defer></script>
<script src="js/modules/search-filter.js" defer></script>
<script src="js/modules/cart-page.js" defer></script>
```

### Cách khởi chạy website để làm bài

1. Cài đặt tiện ích mở rộng **Live Server** trong Visual Studio Code.
2. Bấm chuột phải vào file `session3/index.html` hoặc `products.html`, chọn **Open with Live Server**.
3. Trình duyệt sẽ tự động mở trang web tại địa chỉ `http://127.0.0.1:5500/session3/...`. Mỗi khi bạn lưu file, trang web sẽ tự động làm mới để cập nhật thay đổi.

---

## 2. Hướng dẫn sử dụng Chrome DevTools cho người mới học

Chrome DevTools là bộ công cụ tích hợp sẵn trong trình duyệt Google Chrome giúp lập trình viên kiểm tra mã nguồn, bắt lỗi và xem trạng thái dữ liệu. Trong suốt quá trình làm bài, bạn phải luôn mở DevTools.

### Cách mở DevTools
- Nhấn phím **F12** trên bàn phím.
- Hoặc nhấn tổ hợp phím **Ctrl + Shift + I** (trên Windows) / **Cmd + Option + I** (trên macOS).
- Hoặc bấm chuột phải vào bất kỳ vị trí nào trên trang web, chọn **Inspect (Kiểm tra)**.

### Các tab quan trọng cần nắm vững

#### 1. Tab Console (Bảng điều khiển)
- **Xem lỗi JavaScript:** Nếu mã nguồn có lỗi (lỗi cú pháp, gọi hàm chưa định nghĩa, truy cập thuộc tính của `undefined`), Console sẽ in ra dòng chữ màu đỏ kèm theo tên file và số dòng gây lỗi. Bấm vào liên kết số dòng đó để nhảy thẳng đến chỗ sai.
- **Thử nghiệm lệnh trực tiếp:** Bạn có thể gõ trực tiếp tên biến hoặc hàm vào Console để kiểm tra:
  - Gõ `products.length` rồi Enter: kiểm tra số lượng sản phẩm (phải ra `8`).
  - Gõ `formatPrice(149000)` rồi Enter: kiểm tra hàm định dạng giá (phải ra `"149.000 ₫"`).
  - Gõ `loadCart()` rồi Enter: xem nội dung mảng giỏ hàng hiện tại.
  - Gõ `localStorage.clear()` rồi Enter: xóa sạch dữ liệu giỏ để thử nghiệm trạng thái ban đầu.

#### 2. Tab Application (Ứng dụng) -> Local Storage
- Chọn mục **Storage** ở cột bên trái, bấm mở rộng **Local Storage**, sau đó bấm vào địa chỉ trang web (ví dụ: `http://127.0.0.1:5500`).
- Ở bảng bên phải, bạn sẽ thấy cột **Key** và cột **Value**.
- Tìm khóa `"cart"`: giá trị của nó là chuỗi JSON đại diện cho giỏ hàng (ví dụ: `[{"id":1,"quantity":2}]`).
- Bạn có thể bấm chuột phải vào dòng `"cart"` và chọn **Delete** để xóa dữ liệu giỏ hàng nhằm kiểm tra xem ứng dụng có bị lỗi khi giỏ rỗng không.

#### 3. Tab Network (Mạng)
- Nhấn F5 để tải lại trang khi tab Network đang mở.
- Bấm chọn bộ lọc **JS** hoặc **Img**.
- Quan sát cột **Status**: tất cả các file phải có mã trạng thái `200 OK`. Nếu có file nào báo màu đỏ `404 Not Found`, nghĩa là đường dẫn trong thẻ `<script src="...">` hoặc thẻ `<img src="...">` của bạn đang bị sai tên file hoặc sai thư mục.

#### 4. Chế độ giả lập thiết bị (Device Toolbar)
- Nhấn tổ hợp phím **Ctrl + Shift + M** (trên Windows) / **Cmd + Shift + M** (trên Mac) để bật thanh công cụ thiết bị.
- Ở thanh trên cùng, bạn có thể nhập kích thước màn hình tùy chỉnh:
  - **Desktop:** Nhập `1366` x `768` (kiểm tra giao diện máy tính).
  - **Tablet:** Chọn iPad hoặc nhập `768` x `1024` (kiểm tra giao diện máy tính bảng).
  - **Mobile:** Chọn iPhone 12 Pro hoặc nhập `390` x `844` (kiểm tra giao diện điện thoại).
- Kiểm tra xem thanh cuộn ngang có vô tình xuất hiện không (nếu có thanh cuộn ngang là giao diện bị vỡ layout).

---

## 3. Quy trình Git chi tiết từng bước

Mỗi thành viên làm việc trên một nhánh riêng biệt, **mỗi sub-issue là một commit độc lập**. Tuyệt đối không đẩy mã nguồn trực tiếp vào nhánh `main`.

### Lộ trình lệnh Git chuẩn cho từng thành viên

#### Bước 1: Đồng bộ mã nguồn mới nhất từ `main`
```bash
git switch main
git pull origin main
```

#### Bước 2: Tạo nhánh riêng cho công việc của bạn
Tên nhánh được đặt theo mẫu `hw/p1-<vai>-1`:
```bash
# Ví dụ Châu (BD2):
git checkout -b hw/p1-bd2-1

# Ví dụ Phúc (FD2):
git checkout -b hw/p1-fd2-1
```

#### Bước 3: Thực hiện từng sub-issue và commit
Mỗi khi hoàn thành xong yêu cầu của một sub-issue, bạn chỉ thêm các file do mình sở hữu vào commit:
```bash
# Xem các file vừa sửa
git status

# Chỉ thêm đúng file của bước đó (KHÔNG dùng git add . bừa bãi)
git add session3/js/data/products.js

# Tạo commit có kèm mã Task/Sub-issue rõ ràng
git commit -m "feat(data): define products array with 8 items" -m "Task: HW-P1-BD2-1.1"

# Đẩy commit lên nhánh của mình trên GitHub
git push -u origin hw/p1-bd2-1
# (Các lần sau chỉ cần gõ git push)
```

#### Bước 4: Đóng sub-issue tương ứng
- Sau khi `git push`, vào issue của bước đó trên GitHub (repo Minh).
- Để lại bình luận (comment) chứa đường dẫn commit bạn vừa đẩy trên repo Liêm.
- Bấm nút **Close issue** để xác nhận bước đó đã xong.

#### Bước 5: Mở Pull Request khi đã làm xong toàn bộ các bước
- Khi mọi sub-issue thuộc task của bạn đã hoàn thành và bạn đã trả lời câu hỏi trong file `session3/docs/answers/<Tên>.md`, vào GitHub repo nhóm (`liemnguyen-work/ecommerce-dayora-project`).
- Bấm **Compare & pull request** từ nhánh của bạn vào nhánh `main`.
- Điền đầy đủ thông tin vào mẫu PR: Mã task (ví dụ: `HW-P1-BD2-1`), tóm tắt việc đã làm, đính kèm ảnh chụp màn hình kiểm tra (desktop 1366px và mobile 390px nếu là phần giao diện).
- Gán Reviewer theo bảng phân công ở mục 4.

#### Bước 6: Reviewer nghiệm thu và Merge
- Người review kéo mã của nhánh đó về máy hoặc tải bản zip về để mở thử trên trình duyệt.
- Thử nghiệm các chức năng, kiểm tra Console xem có lỗi không.
- Nếu đạt: Bấm nút mũi tên bên cạnh nút Merge trên GitHub, chọn **Rebase and merge** (giữ nguyên từng commit mang tên người làm, không tạo commit merge trung gian).
- Sau khi merge thành công, người làm comment link PR vào issue cha trên repo Minh và nhờ Reviewer đóng issue cha.

*Quy tắc cứng:* Không đưa đường dẫn từ repo nhóm (repo Liêm) trỏ sang repo Minh. Trong commit và PR ở repo nhóm chỉ ghi mã định danh task (ví dụ: `Task: HW-P1-BD2-1.1`).

---

## 4. Phân công, thứ tự thực hiện và quy ước chung

### Bảng phân công 8 thành viên

| Vai | Thành viên | Mã Task | Trách nhiệm chính trong Buổi 3 | File sở hữu trong `session3/` | Reviewer |
|---|---|---|---|---|---|
| **PM** | Liêm | `HW-P1-PM-1` | Kế hoạch, quy ước, README đủ 10 mục, kịch bản thuyết trình, bảng nộp bài | `docs/ke-hoach.md`, `docs/quy-uoc.md`, `README.md`, `docs/trinh-bay.md` | QA Ngọc |
| **DO** | Kiệt | `HW-P1-DO-1` | Khởi tạo thư mục `session3/`, cấu trúc `js/`, khung `cart.html`, mẫu PR, kiểm tra GitHub | Khung thư mục, `cart.html` (khung), thẻ `<script>`, `.github/`, `docs/github.md` | PM Liêm |
| **BD2** | Châu | `HW-P1-BD2-1` | Mảng dữ liệu 8 sản phẩm `products.js`, hàm giá tiền, logic giỏ hàng và `localStorage` | `js/data/products.js`, `js/modules/cart.js` | BD1 Hoàn |
| **FD2** | Phúc | `HW-P1-FD2-1` | Hiển thị danh sách sản phẩm động từ JavaScript, nút thêm giỏ trên lưới sản phẩm | `js/modules/render-products.js`, vùng chứa lưới trong `products.html` | FD1 Thành |
| **FD1** | Thành | `HW-P1-FD1-1` | Thanh công cụ tìm kiếm theo tên, lọc theo danh mục động, sắp xếp giá tăng/giảm | `js/modules/search-filter.js`, thanh công cụ `products.html`, CSS khu 10 | FD2 Phúc |
| **BD1** | Hoàn | `HW-P1-BD1-1` | Đọc mã ID từ URL, hiển thị chi tiết sản phẩm, xử lý sản phẩm không tồn tại | `js/modules/product-detail.js`, `product-detail.html` | BD2 Châu |
| **PD** | Đạt | `HW-P1-PD-1` | Bảng giao diện giỏ hàng trong `cart.html`, tính tổng tiền, đồng bộ số lượng badge | `js/modules/cart-page.js`, phần thân `cart.html`, CSS khu 9 | FD1 Thành |
| **QA** | Ngọc | `HW-P1-QA-1` | Lập bảng 16 ca kiểm thử, chạy kiểm thử, chụp 15 ảnh giao diện, quản lý danh sách lỗi | `docs/kiem-thu.md`, `docs/screenshots/` | PM Liêm |

*Mọi thành viên:* Đều phải tự trả lời câu hỏi kiểm tra kiến thức trong `session3/docs/answers/<Tên>.md` và ghi nhận prompt AI đã dùng vào `session3/docs/ai-usage.md`.

### Sơ đồ thứ tự làm việc (Ai chờ ai)

Ký hiệu: `──►` là phải đợi bước trên xong mới được làm tiếp; `║` là làm việc độc lập song song.

```text
05/11  Kiệt: chép session2 → session3/, tạo khung js/ + gắn thẻ <script> (B1–2, cả nhóm chờ bước này)
  ──►
06/11  Liêm: ke-hoach.md + quy-uoc.md (B1–2)  ║  Kiệt: khung cart.html, mẫu PR (B3–4)
  ──►
07/11  Châu: products.js, formatPrice, getProductById, loadCart/saveCart (B1–3)  ║  Ngọc: lập 16 ca kiểm thử (B1)
  ──►
08/11  Châu: addToCart, update/remove/tổng (B4–5)  ║  Phúc: danh sách B1–3  ║  Hoàn: chi tiết B1–3
  ──►
09/11  Phúc: nút Thêm giỏ (B4)  ║  Hoàn: Thêm giỏ (B4)  ║  Thành: tìm/lọc/sắp xếp (B1–5)  ║  Đạt: trang giỏ (B1–5)
  ──►
10/11  Ngọc: chạy kiểm thử chức năng, chụp ảnh giao diện, kiểm tra tích hợp, báo lỗi (B2–5); các bạn sửa lỗi trong ngày
  ──►
11/11  Liêm: hoàn thiện README, kịch bản thuyết trình, bảng nộp bài (B3–5)  ║  Kiệt: kiểm tra tích hợp cuối, docs/github.md (B5)  →  Nộp bài
```

### 7 quy ước kỹ thuật bắt buộc phải tuân thủ

| TT | Tên quy ước | Quy cách kỹ thuật | Giải thích ý nghĩa |
|---|---|---|---|
| 1 | **Mảng sản phẩm** | `const products = [{ id, name, price, category, image, description }]` | Nguồn dữ liệu dùng chung duy nhất; `id` là số nguyên từ 1 đến 8; `price` là số nguyên VNĐ không có dấu chấm. |
| 2 | **Định dạng tiền tệ** | `formatPrice(number)` | Hàm trong `products.js`, sử dụng `Intl.NumberFormat("vi-VN")`, chuyển số thành chuỗi hiển thị có dấu chấm và ký hiệu `₫` (ví dụ: `149000` -> `"149.000 ₫"`). |
| 3 | **Tìm kiếm theo ID** | `getProductById(id)` | Hàm trong `products.js`, nhận vào `id` (tự ép kiểu sang số bằng `Number(id)`), trả về đối tượng sản phẩm hoặc `undefined` nếu không tìm thấy. |
| 4 | **Cấu trúc giỏ hàng** | Mảng `[{ id, quantity }]` | Giỏ hàng chỉ lưu mã sản phẩm và số lượng mua; tuyệt đối không lưu tên và giá vào giỏ để tránh bị sai lệch khi giá gốc thay đổi. |
| 5 | **Khóa localStorage** | `"cart"` | Sử dụng đúng chuỗi ký tự viết thường `"cart"` làm khóa lưu trữ trong trình duyệt. |
| 6 | **Các hàm giỏ hàng** | Khai báo trong `cart.js` | Bao gồm: `loadCart()`, `saveCart(cart)`, `addToCart(id, qty)`, `updateQuantity(id, qty)`, `removeFromCart(id)`, `getCartTotals()`. |
| 7 | **Sự kiện đồng bộ** | `"cart:changed"` | **Chỉ duy nhất** hàm `saveCart(cart)` phát sự kiện `document.dispatchEvent(new CustomEvent("cart:changed"))` sau khi ghi `localStorage` thành công. Các hàm khác (`addToCart`, `updateQuantity`, `removeFromCart`) gọi `saveCart` nên **tuyệt đối không tự phát lại** sự kiện này (để tránh phát lặp 2 lần). |

---

## 5. Hướng dẫn chi tiết từng bước (Bước 1 đến Bước 10)

Mỗi bước đều có mô tả chi tiết, hướng dẫn cụ thể từng thao tác, cách tự kiểm tra và prompt AI mẫu đã điền sẵn ngữ cảnh của DAYORA.

### Bước 1 — Kế hoạch, phân công, quy ước (Liêm phụ trách)
- **File sở hữu:** `session3/docs/ke-hoach.md`, `session3/docs/quy-uoc.md`.
- **Vì sao cần:** Tránh tình trạng các thành viên làm việc lộn xộn, không biết phải đợi ai hoặc tự ý đặt tên hàm khác nhau dẫn đến khi ghép mã nguồn bị hỏng toàn bộ website.
- **Lộ trình thực hiện:**
  1. Đợi Kiệt tạo xong thư mục `session3/`. Tạo thư mục `session3/docs/` nếu chưa có.
  2. Tạo file `session3/docs/ke-hoach.md`, lập bảng phân công 8 người gồm 5 cột: `Thành viên | Nhiệm vụ | Sản phẩm bàn giao | Phụ thuộc | Tiêu chí hoàn thành`.
  3. Tạo file `session3/docs/quy-uoc.md`, chép đầy đủ 7 quy ước ở mục 4 và viết thêm ví dụ minh họa bằng code ngắn cho từng quy ước.
  4. Mở PR đầu tiên của nhóm và nhắc 7 bạn vào thả reaction xác nhận đã đọc.
- **Tự kiểm tra:** Mở 2 file trong VS Code, kiểm tra bảng phân công đủ 8 người, nội dung quy ước rõ ràng, không có chỗ viết tắt khó hiểu.
- **Prompt AI mẫu (Prompt 1 của đề):**
  ```text
  Nhóm tôi đã xây dựng giao diện website thương mại điện tử bằng HTML5 và CSS3 ở Buổi 1 và Buổi 2.
  Thông tin dự án:
  - Chủ đề website: DAYORA, bán đồ dã ngoại, picnic, cắm trại (6 nhóm hàng).
  - Các trang hiện có: index.html, products.html, product-detail.html, about.html (thư mục session2/).
  - Số thành viên: 8.
  - Các thành viên: Liêm (PM), Kiệt (DevOps), Châu (dữ liệu), Phúc (danh sách), Thành (tìm/lọc), Hoàn (chi tiết), Đạt (giỏ hàng UI), Ngọc (kiểm thử).
  Hãy giúp nhóm lập kế hoạch thực hiện bài tập nhóm Buổi 3.
  Yêu cầu: 1. Xác định các chức năng JavaScript cần tích hợp. 2. Phân chia nhiệm vụ phù hợp với số thành viên. 3. Xác định đầu vào, đầu ra và sản phẩm bàn giao của từng nhiệm vụ. 4. Đề xuất cấu trúc thư mục JavaScript phù hợp với dự án hiện tại. 5. Xác định những phần mã nguồn cần thống nhất trước khi lập trình. 6. Đề xuất kế hoạch kiểm thử và tích hợp.
  Trình bày thành bảng gồm: Thành viên, nhiệm vụ, sản phẩm bàn giao, phụ thuộc và tiêu chí hoàn thành.
  Không tạo lại website từ đầu.
  ```

### Bước 2 — Chuẩn bị thư mục và khung trang giỏ hàng (Kiệt phụ trách)
- **File sở hữu:** Khung thư mục `session3/`, `session3/cart.html`, các thẻ `<script>` trong 5 file HTML, `.github/pull_request_template.md`.
- **Vì sao cần:** Thiết lập môi trường sạch sẽ, cấu trúc file đúng chuẩn và nạp script đúng cách bằng `defer` để các bạn khác chỉ việc tập trung viết code vào file của mình.
- **Lộ trình thực hiện:**
  1. Dùng lệnh `cp -r session2 session3` để sao chép nguyên vẹn bài làm Buổi 2.
  2. Tạo thư mục `session3/js/data/` và `session3/js/modules/`. Tạo các file rỗng kèm 1 dòng chú thích tên người phụ trách.
  3. Tạo file `session3/cart.html` từ `index.html`, thay `<main>` thành `<main class="cart-page" id="cart-root"></main>`.
  4. Thêm `<a href="cart.html" class="nav-cart">Giỏ hàng <span class="cart-count">0</span></a>` vào menu của cả 5 trang HTML.
  5. Gắn các thẻ `<script defer>` theo đúng thứ tự quy định cho từng trang HTML.
  6. Tạo file `.github/pull_request_template.md` chứa mẫu PR chuẩn.
- **Tự kiểm tra:** Mở cả 5 file HTML trên trình duyệt, mở tab Console (F12) không có lỗi đỏ 404 file JS nào; bấm vào chữ "Giỏ hàng" trên menu ở bất kỳ trang nào đều mở được `cart.html`.

### Bước 3 — Dữ liệu sản phẩm dùng chung (Châu phụ trách)
- **File sở hữu:** `session3/js/data/products.js`.
- **Vì sao cần:** Đóng vai trò như một "cơ sở dữ liệu tại chỗ" (in-memory database). Tất cả các trang web đều đọc dữ liệu từ file này để hiển thị danh sách, lọc, tìm kiếm và tính tiền giỏ hàng.
- **Lộ trình thực hiện:**
  1. Mở `session2/products.html` lấy thông tin chính xác của 8 sản phẩm (tên, giá tiền, ảnh `images/product-X.jpg`, danh mục, mô tả).
  2. Khai báo mảng `const products = [ ... ];` chứa 8 đối tượng sản phẩm, đảm bảo `id` từ 1 đến 8 và `price` là số nguyên.
  3. Viết hàm `formatPrice(number)` sử dụng `Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })`.
  4. Viết hàm `getProductById(id)` sử dụng `Number(id)` và phương thức `products.find(...)`.
- **Tự kiểm tra:** Vào Console gõ `products.length` ra `8`; gõ `formatPrice(149000)` ra `"149.000 ₫"`; gõ `getProductById(3)` ra đúng sản phẩm 3; gõ `getProductById(999)` ra `undefined`.
- **Prompt AI mẫu (Prompt 2 của đề - phần dữ liệu):**
  ```text
  Tôi đang phát triển website thương mại điện tử theo nhóm (DAYORA, đồ dã ngoại). Website đã có giao diện HTML5 và CSS3 từ Buổi 1 và Buổi 2, với 8 sản phẩm viết tay trong products.html.
  Nhóm cần chuẩn hóa dữ liệu sản phẩm vào tệp js/data/products.js.
  Yêu cầu: 1. Mảng products chứa đúng 8 sản phẩm đang có trong products.html (cùng tên, giá, ảnh images/product-1.jpg đến product-8.jpg). 2. Mỗi sản phẩm có id, name, price (số), category, image, description. 3. Viết formatPrice(number) định dạng tiền Việt Nam bằng Intl.NumberFormat. 4. Viết getProductById(id).
  Đừng viết code hoàn chỉnh thay tôi: hãy giải thích cấu trúc, chỉ ra lỗi khi tôi dán code.
  ```

### Bước 4 — Hiển thị danh sách sản phẩm động (Phúc phụ trách)
- **File sở hữu:** `session3/js/modules/render-products.js`, thẻ `<ul class="product-grid">` trong `products.html`.
- **Vì sao cần:** Chuyển đổi trang web từ dạng tĩnh viết tay sang dạng động. Khi dữ liệu sản phẩm thay đổi hoặc khi lọc tìm kiếm, hàm sẽ tự động vẽ lại danh sách tương ứng.
- **Lộ trình thực hiện:**
  1. Trong `products.html`, xóa bỏ 8 thẻ `<li>` viết tay cũ bên trong `<ul class="product-grid">`.
  2. Viết hàm `renderProducts(list)`:
     - Lấy phần tử `.product-grid`.
     - Kiểm tra nếu `!list || list.length === 0`: hiển thị khối thông báo rỗng thân thiện `.no-products`.
     - Nếu có sản phẩm: dùng `list.map(...).join("")` để tạo các thẻ `<li class="product-grid-item">`.
     - Mỗi thẻ chứa: ảnh, tên, giá format bằng `formatPrice`, link "Xem chi tiết" dẫn tới `product-detail.html?id=${product.id}` và nút "Thêm vào giỏ" có thuộc tính `data-id="${product.id}"`.
  3. Dùng kỹ thuật Event Delegation: gắn sự kiện `click` một lần duy nhất trên vùng chứa `.product-grid`, bắt sự kiện khi bấm nút có class `.btn-add-cart` và gọi hàm `addToCart(id, 1)` (hàm này gọi `saveCart` để lưu và phát `cart:changed` cập nhật badge).
- **Tự kiểm tra:** Mở `products.html` thấy 8 sản phẩm hiển thị đầy đủ như Buổi 2; gõ `renderProducts([])` trong Console thấy hiện thông báo danh sách rỗng; bấm "Xem chi tiết" của món thứ 3 mở được `product-detail.html?id=3`.
- **Prompt AI mẫu (Prompt 2 của đề - phần hiển thị):**
  ```text
  Website DAYORA đã có mảng products trong js/data/products.js và hàm formatPrice.
  Hãy hướng dẫn tôi viết renderProducts(list) trong js/modules/render-products.js để hiển thị lưới sản phẩm trên products.html.
  Yêu cầu: 1. Mỗi thẻ có hình ảnh, tên, giá (formatPrice), nút "Xem chi tiết" dẫn tới product-detail.html?id=<id> và nút "Thêm vào giỏ". 2. Dùng map() và template literal. 3. Hiển thị thông báo khi danh sách rỗng. 4. Giữ nguyên class CSS của thẻ sản phẩm Buổi 2. 5. Thay 8 thẻ viết tay bằng dữ liệu JS.
  Trước tiên, hãy kiểm tra HTML hiện có. Giải thích rõ thay đổi, không viết lại toàn bộ website, không viết code hoàn chỉnh thay tôi.
  ```

### Bước 5 — Tìm kiếm, lọc và sắp xếp sản phẩm (Thành phụ trách)
- **File sở hữu:** `session3/js/modules/search-filter.js`, thanh công cụ trong `products.html`, khu CSS 10 trong `style.css`.
- **Vì sao cần:** Giúp người mua hàng dễ dàng tìm kiếm món đồ phù hợp theo tên gọi, nhóm sản phẩm và mức giá mong muốn một cách nhanh chóng.
- **Lộ trình thực hiện:**
  1. Trong `products.html`, thêm thanh công cụ `.filter-toolbar` phía trên danh sách sản phẩm gồm ô input tìm kiếm (`#filter-search`), select danh mục (`#filter-category`) và select sắp xếp (`#filter-sort`).
  2. Viết CSS định dạng cho thanh công cụ ở cuối file `style.css` (khu vực `/* 10. TÌM KIẾM, LỌC — Thành */`), đảm bảo co giãn tốt trên 1366px và 390px.
  3. Viết hàm tự động tạo các `<option>` cho thẻ select danh mục bằng cách lấy danh mục không trùng từ `new Set(products.map(p => p.category))`.
  4. Viết hàm trung tâm `applyFilters()` kết hợp tuần tự 3 bước:
     - Lọc theo danh mục đã chọn (nếu có).
     - Lọc theo từ khóa tìm kiếm (bỏ khoảng trắng thừa bằng `.trim()`, không phân biệt hoa thường bằng `.toLowerCase()`).
     - Sắp xếp theo giá trên một bản sao mảng (`[...list].sort(...)`, tuyệt đối không sort mảng `products` gốc).
     - Gọi hàm `renderProducts` với danh sách kết quả sau cùng.
  5. Lắng nghe sự kiện `input` trên ô tìm kiếm và sự kiện `change` trên 2 thẻ select để gọi `applyFilters()`.
- **Tự kiểm tra:** Chọn danh mục "Thảm picnic" + gõ từ khóa "4 người" + chọn "Giá: Thấp đến Cao" -> kết quả lọc ra chính xác; mở Console kiểm tra `products[0].id` vẫn là `1` (mảng gốc không bị thay đổi).
- **Prompt AI mẫu (Prompt 3 của đề):**
  ```text
  Website DAYORA đã có mảng products và hàm renderProducts(list) để hiển thị danh sách sản phẩm.
  Hãy giúp tôi tích hợp chức năng tìm kiếm, lọc và sắp xếp vào giao diện products.html hiện có (file js/modules/search-filter.js).
  Yêu cầu: 1. Tìm kiếm theo tên sản phẩm (không phân biệt hoa thường). 2. Lọc theo danh mục (danh sách danh mục lấy từ dữ liệu). 3. Sắp xếp theo giá tăng dần và giảm dần. 4. Cho phép kết hợp nhiều điều kiện. 5. Cập nhật danh sách sau mỗi thao tác. 6. Hiển thị thông báo khi không có kết quả. 7. Không làm thay đổi mảng products ban đầu. 8. Giữ nguyên phong cách giao diện.
  Hãy kiểm tra các thành phần HTML hiện có, xác định phần cần bổ sung, gợi ý cách tách hàm, giải thích cách các chức năng phối hợp và đề xuất ca kiểm thử. Không viết code hoàn chỉnh thay tôi.
  ```

### Bước 6 — Trang chi tiết sản phẩm theo URL (Hoàn phụ trách)
- **File sở hữu:** `session3/js/modules/product-detail.js`, `session3/product-detail.html`.
- **Vì sao cần:** Cho phép một file HTML duy nhất có thể hiển thị chi tiết cho bất kỳ sản phẩm nào dựa trên tham số mã ID truyền trên thanh địa chỉ URL.
- **Lộ trình thực hiện:**
  1. Trong `product-detail.html`, xóa các khối chi tiết viết tay cũ, tạo vùng chứa thẻ trống duy nhất: `<article class="detail-grid" id="detail-card"></article>`.
  2. Viết hàm `getProductIdFromUrl()` sử dụng `new URLSearchParams(window.location.search)` để lấy tham số `id` và đổi sang dạng số.
  3. Lấy thông tin sản phẩm bằng `getProductById(id)`.
  4. Nếu tìm thấy: hiển thị hình ảnh, tên, danh mục, giá tiền, mô tả, ô nhập số lượng và nút "Thêm vào giỏ". Đồng thời cập nhật `document.title`.
  5. Nếu không tìm thấy (`?id=999`, `?id=abc`, hoặc thiếu `?id`): hiển thị thông báo "Sản phẩm không tồn tại" kèm liên kết quay lại danh sách sản phẩm.
  6. Gắn sự kiện cho nút "Thêm vào giỏ": đọc số lượng từ ô nhập liệu và gọi `addToCart(product.id, qty)` (hàm này gọi `saveCart` để lưu và phát `cart:changed` đồng bộ số lượng).
- **Tự kiểm tra:** Mở `product-detail.html?id=3` hiển thị đúng Bình nước cá nhân; mở `?id=999` hoặc `?id=abc` hiển thị thông báo không tìm thấy và Console không có lỗi đỏ; chọn số lượng 3 rồi bấm thêm giỏ, số trên badge giỏ tăng thêm 3.
- **Prompt AI mẫu (Prompt 4 của đề):**
  ```text
  Website DAYORA có mảng products và trang danh sách hiển thị bằng JavaScript.
  Hãy hướng dẫn tôi tích hợp trang chi tiết sản phẩm (product-detail.html, file js/modules/product-detail.js).
  Yêu cầu: 1. Đọc mã sản phẩm từ URL bằng URLSearchParams (product-detail.html?id=3). 2. Tìm sản phẩm bằng getProductById. 3. Hiển thị hình ảnh, tên, giá, danh mục và mô tả vào khung HTML Buổi 2. 4. Có ô chọn số lượng và nút thêm vào giỏ (gọi addToCart của cart.js). 5. Xử lý mã không tồn tại. 6. Có đường dẫn quay lại danh sách.
  Hãy kiểm tra HTML hiện có trước khi đề xuất thay đổi. Giải thích cách dữ liệu đi từ trang danh sách sang trang chi tiết và cách kiểm thử. Không viết code hoàn chỉnh thay tôi.
  ```

### Bước 7 — Logic giỏ hàng và lưu trữ LocalStorage (Châu phụ trách)
- **File sở hữu:** `session3/js/modules/cart.js`.
- **Vì sao cần:** Giúp lưu giữ trạng thái giỏ hàng xuyên suốt khi người dùng chuyển qua lại giữa các trang web hoặc khi tải lại trình duyệt.
- **Lộ trình thực hiện:**
  1. Khai báo khóa lưu trữ: `const CART_KEY = "cart";`.
  2. Viết hàm `saveCart(cart)`: lưu mảng giỏ hàng vào `localStorage.setItem(CART_KEY, JSON.stringify(cart))` và phát sự kiện duy nhất `document.dispatchEvent(new CustomEvent("cart:changed"))`. Lưu ý: chỉ duy nhất `saveCart` phát sự kiện này; các hàm `addToCart`, `updateQuantity`, `removeFromCart` gọi `saveCart` nên không tự phát lại để tránh sự kiện bị bắn 2 lần.
  3. Viết hàm `loadCart()`: đọc chuỗi từ `localStorage`, bọc trong khối `try...catch` để nếu dữ liệu bị lỗi cú pháp thì trả về mảng rỗng `[]` an toàn.
  4. Viết hàm `addToCart(id, qty)`: nếu món hàng đã có trong giỏ thì tăng số lượng (`item.quantity += qty`), nếu chưa có thì thêm phần tử mới `{ id, quantity }`, sau đó gọi `saveCart(cart)` để lưu (không tự phát lại `cart:changed`).
  5. Viết hàm `updateQuantity(id, qty)` (đảm bảo số lượng tối thiểu là 1, gọi `saveCart`), hàm `removeFromCart(id)` (lọc bỏ sản phẩm, gọi `saveCart`) và hàm `getCartTotals()` (tính tổng số lượng và tổng tiền từ `products`).
- **Tự kiểm tra:** Trong Console gõ `addToCart(1, 2); addToCart(1, 1);` -> mảng giỏ chỉ có 1 phần tử `{ id: 1, quantity: 3 }`; tải lại trang dữ liệu vẫn còn; xóa khóa `"cart"` trong tab Application rồi tải lại trang không bị lỗi.
- **Prompt AI mẫu (Prompt 5 & 6 của đề - phần logic giỏ):**
  ```text
  Website DAYORA đã có products.js. Tôi phụ trách js/modules/cart.js: dữ liệu giỏ hàng dùng chung cho mọi trang.
  Quy ước nhóm: giỏ là mảng [{ id, quantity }], khóa localStorage "cart", các hàm loadCart, saveCart, addToCart(id, qty), updateQuantity(id, qty), removeFromCart(id), getCartTotals(); chỉ saveCart phát sự kiện "cart:changed" sau khi lưu.
  Yêu cầu: 1. Thêm lại sản phẩm đã có thì tăng số lượng, không tạo dòng trùng. 2. Số lượng tối thiểu 1. 3. getCartTotals trả tổng số lượng và tổng tiền (tính từ giá trong products). 4. loadCart xử lý khi chưa có dữ liệu hoặc dữ liệu hỏng (JSON.parse lỗi). 5. Lưu sau mỗi thao tác.
  Giải thích từng hàm và cách kiểm tra trong Chrome DevTools (Application → Local Storage). Không viết code hoàn chỉnh thay tôi.
  ```

### Bước 8 — Giao diện giỏ hàng và số trên biểu tượng giỏ (Đạt phụ trách)
- **File sở hữu:** `session3/js/modules/cart-page.js`, phần thân thẻ `<main>` trong `cart.html`, khu CSS 9 trong `style.css`.
- **Vì sao cần:** Cung cấp màn hình trực quan để khách hàng rà soát danh sách món đồ đã chọn, chỉnh sửa số lượng, xóa bớt đồ và nhìn thấy tổng số tiền phải trả trước khi đặt hàng.
- **Lộ trình thực hiện:**
  1. Trong `cart.html`, tạo cấu trúc bảng giỏ hàng gồm các cột: Sản phẩm, Đơn giá, Số lượng, Thành tiền, Thao tác xóa và vùng hiển thị tổng thanh toán.
  2. Viết CSS cho bảng giỏ hàng ở khu vực `/* 9. GIỎ HÀNG — Đạt */` trong file `style.css`. Thêm media query để trên màn hình điện thoại 390px bảng hiển thị gọn gàng, không bị tràn viền.
  3. Viết hàm `renderCart()`: đọc mảng giỏ hàng bằng `loadCart()`. Nếu rỗng, hiển thị thông báo giỏ trống kèm nút quay lại mua sắm. Nếu có hàng, duyệt mảng kết hợp `getProductById` để render từng dòng `<tr>`.
  4. Bắt sự kiện bằng Event Delegation trên vùng chứa `#cart-root`: bấm nút `+` gọi `updateQuantity`, bấm nút `-` giảm số lượng, bấm nút xóa gọi `removeFromCart`. Sau mỗi thao tác đều gọi lại `renderCart()` để cập nhật màn hình ngay lập tức.
  5. Viết hàm `updateCartCountBadge()` cập nhật số lượng trên tất cả các thẻ `.cart-count` ở menu của cả 5 trang. Lắng nghe sự kiện `cart:changed` (được phát duy nhất từ `saveCart`) để tự động kích hoạt hàm này.
- **Tự kiểm tra:** Thử nghiệm đúng ví dụ của đề bài (2 sản phẩm 100k + 1 sản phẩm 200k = 400k tổng); bấm tăng giảm số lượng thì tổng tiền đổi ngay; xóa hết hàng thì hiện giao diện giỏ trống; số trên biểu tượng giỏ ở header đồng bộ chính xác trên cả 5 trang.
- **Prompt AI mẫu (Prompt 5 của đề - phần giao diện giỏ):**
  ```text
  Website DAYORA đã có products.js và cart.js (loadCart, updateQuantity, removeFromCart, getCartTotals, sự kiện "cart:changed").
  Hãy hướng dẫn tôi xây giao diện cart.html (file js/modules/cart-page.js, khu CSS "9. GIỎ HÀNG").
  Yêu cầu: 1. Bảng giỏ có hình ảnh, tên, đơn giá, số lượng với nút tăng/giảm, thành tiền, nút xóa. 2. Tổng số lượng và tổng tiền. 3. Thông báo khi giỏ trống, có link về trang sản phẩm. 4. Cập nhật giao diện ngay sau mỗi thao tác. 5. Cập nhật số trên biểu tượng giỏ (span.cart-count) ở mọi trang. 6. Bảng hiển thị gọn trên màn hình 390 px. 7. Giữ phong cách Buổi 2.
  Không viết code hoàn chỉnh thay tôi, chỉ gợi ý và review code tôi dán.
  ```

### Bước 9 — Kế hoạch và chạy kiểm thử toàn diện (Ngọc phụ trách)
- **File sở hữu:** `session3/docs/kiem-thu.md`, thư mục `session3/docs/screenshots/`.
- **Vì sao cần:** Đảm bảo toàn bộ sản phẩm của nhóm không có lỗi nghiêm trọng, chạy mượt mà trên nhiều kích thước thiết bị và có tài liệu kiểm thử làm minh chứng nộp bài.
- **Lộ trình thực hiện:**
  1. Tạo file `session3/docs/kiem-thu.md`, lập bảng 16 ca kiểm thử (12 ca chuẩn theo đề bài + 4 ca kiểm tra dữ liệu biên và bất thường).
  2. Mở website bằng Live Server, mở tab Console trong Chrome DevTools và lần lượt chạy từng ca kiểm thử. Ghi kết quả thực tế ("Đạt" hoặc mô tả lỗi) vào bảng.
  3. Bật Device Toolbar (Ctrl + Shift + M), chụp ảnh màn hình cả 5 trang ở 3 kích thước: 1366px, 768px, 390px (tổng cộng 15 ảnh) và lưu vào `session3/docs/screenshots/`.
  4. Thực hiện kiểm tra tích hợp: kiểm tra trùng tên hàm, kiểm tra sự kiện bắn lặp 2 lần, kiểm tra lỗi 404 hình ảnh/script, kiểm tra đồng bộ dữ liệu giỏ hàng giữa nhiều tab trình duyệt.
  5. Lập bảng Bug Tracker ghi nhận các lỗi phát hiện được, comment vào issue của bạn phụ trách và kiểm tra lại sau khi bạn đó đã sửa.
- **Tự kiểm tra:** File `kiem-thu.md` có đầy đủ kết quả thực tế cho 16 ca test; thư mục `screenshots/` có đủ 15 ảnh rõ nét; toàn bộ lỗi đều có trạng thái "Đã sửa".
- **Prompt AI mẫu (Prompt 7 của đề):**
  ```text
  Tôi đang hỗ trợ nhóm kiểm thử website thương mại điện tử DAYORA được xây dựng bằng HTML5, CSS3 và JavaScript (thư mục session3/).
  Website đã tích hợp: danh sách sản phẩm, trang chi tiết, tìm kiếm/lọc/sắp xếp, giỏ hàng, localStorage.
  Hãy giúp tôi xây dựng kế hoạch kiểm thử toàn bộ website.
  Yêu cầu: 1. Bảng gồm mã kiểm thử, chức năng, dữ liệu đầu vào, các bước, kết quả mong đợi và kết quả thực tế. 2. Gồm kiểm thử chức năng và giao diện. 3. Kiểm tra dữ liệu trống hoặc không hợp lệ. 4. Kiểm tra đồng bộ giỏ hàng giữa các trang. 5. Hướng dẫn dùng Chrome DevTools để phát hiện lỗi. 6. Đề xuất thứ tự ưu tiên sửa lỗi.
  Khi phát hiện lỗi, giải thích nguyên nhân và đề xuất cách sửa dựa trên mã nguồn hiện có. Không tự ý viết lại toàn bộ website.
  ```

### Bước 10 — README, kịch bản thuyết trình và nộp bài (Liêm phụ trách)
- **File sở hữu:** `session3/README.md`, `session3/docs/trinh-bay.md`.
- **Vì sao cần:** Giúp giảng viên có cái nhìn toàn diện về dự án, nắm được cách chạy thử nghiệm và đánh giá cao tính chuyên nghiệp, trung thực của nhóm qua phần trình bày thuyết phục.
- **Lộ trình thực hiện:**
  1. Mở file `session3/README.md`, hoàn thiện đầy đủ 10 mục theo cấu trúc chuẩn. Rà soát với file `kiem-thu.md` để đảm bảo chỉ công bố các chức năng đã thực sự chạy đạt.
  2. Tạo file `session3/docs/trinh-bay.md`, xây dựng kịch bản báo cáo ngắn gọn trong 5 phút, phân chia rõ bạn nào nói phần nào và thao tác demo màn hình ra sao.
  3. Kiểm tra từng dòng trong Bảng nộp bài ở mục 7, đối chiếu các đường dẫn minh chứng.
  4. Đảm bảo toàn bộ 8 bạn đã hoàn thành câu trả lời trong `session3/docs/answers/<Tên>.md` và nộp bài đúng hạn 11/11/2026.
- **Tự kiểm tra:** `README.md` đủ 10 mục; kịch bản trình bày đủ 8 người; bảng nộp bài đủ 12 mục hoàn thành.
- **Prompt AI mẫu (Prompt 8 của đề):**
  ```text
  Nhóm tôi đã hoàn thành website thương mại điện tử DAYORA bằng HTML, CSS và JavaScript (thư mục session3/).
  Hãy giúp nhóm rà soát dự án và xây dựng README.md.
  README cần có: 1. Tên dự án và mục tiêu. 2. Thành viên và nhiệm vụ. 3. Công nghệ sử dụng. 4. Cấu trúc thư mục. 5. Các chức năng đã hoàn thành. 6. Hướng dẫn chạy website. 7. Hướng dẫn kiểm thử các chức năng chính. 8. Những vấn đề đã gặp và cách khắc phục. 9. Đường dẫn repository GitHub. 10. Các phần đã sử dụng AI hỗ trợ.
  Không tự khẳng định chức năng nào đã hoàn thành nếu chưa có minh chứng. Hãy giúp nhóm trình bày ngắn gọn, rõ ràng và trung thực với kết quả thực tế.
  ```

---

## 6. Kiểm tra kiến thức sau khi làm

Mỗi thành viên tự trả lời các câu hỏi tương ứng với phần việc của mình vào file `session3/docs/answers/<Tên>.md` trong repo nhóm, **mỗi câu trả lời từ 1 đến 3 dòng ngắn gọn, súc tích bằng chính lời văn của mình (không mở xem lại code và không sao chép nguyên văn câu trả lời của AI)**.

Trong buổi thuyết trình, giảng viên có thể chọn hỏi bất kỳ câu nào trong bảng dưới đây:

| Thành viên | Câu hỏi kiểm tra trọng tâm |
|---|---|
| **Châu (BD2)** | 1. Nhóm tổ chức dữ liệu sản phẩm như thế nào để các trang dùng chung?<br>2. Khi thêm một sản phẩm đã có trong giỏ hàng thì hàm xử lý thế nào?<br>3. Vì sao phải lưu giỏ hàng vào `localStorage`? Dữ liệu được khôi phục ra sao và nếu dữ liệu hỏng thì xử lý thế nào?<br>4. Vì sao mảng giỏ hàng chỉ lưu `id` và `quantity` mà không lưu luôn `name` và `price`? |
| **Phúc (FD2)** | 1. Dữ liệu sản phẩm từ file `products.js` đi lên giao diện hiển thị qua những hàm nào?<br>2. Vì sao nên dùng phương thức `map()` và template literal thay cho việc viết sẵn thẻ HTML tĩnh?<br>3. Vì sao phải gắn sự kiện trên vùng chứa cha (Event Delegation) thay vì gắn trực tiếp lên từng nút con? |
| **Thành (FD1)** | 1. Khi người dùng vừa tìm kiếm vừa lọc danh mục và sắp xếp giá thì dữ liệu được xử lý theo trình tự nào?<br>2. Vì sao tuyệt đối không được sắp xếp trực tiếp trên mảng `products` gốc?<br>3. Danh sách các danh mục trong ô select được tạo ra từ đâu và vì sao không nên viết cứng trong HTML? |
| **Hoàn (BD1)** | 1. Làm thế nào để trang chi tiết xác định được đúng sản phẩm cần hiển thị từ đường dẫn URL?<br>2. Trong trường hợp mã sản phẩm không tồn tại hoặc người dùng nhập chữ trên URL thì trang web xử lý thế nào?<br>3. Nhờ cơ chế nào mà chỉ một file `product-detail.html` duy nhất có thể hiển thị được cho cả 8 sản phẩm khác nhau? |
| **Đạt (PD)** | 1. Khi số lượng của một món hàng thay đổi thì những thành phần giao diện nào trên trang web phải cập nhật theo?<br>2. Nếu giỏ hàng hiển thị đúng ở một trang nhưng sang trang khác lại bị sai hoặc không nhận thì nhóm sẽ kiểm tra những phần nào?<br>3. Sự kiện tùy biến `cart:changed` đóng vai trò gì trong việc đồng bộ số lượng trên biểu tượng giỏ hàng ở header? |
| **Ngọc (QA)** | 1. Khi phát hiện một chức năng chạy đúng trên máy tính nhưng bị tràn viền trên điện thoại 390px, bạn xác định nguyên nhân và phối hợp sửa thế nào?<br>2. Khi AI đề xuất một đoạn mã JavaScript, nhóm kiểm tra và xác nhận mã đó hoạt động an toàn, chính xác bằng những cách nào?<br>3. Hãy hướng dẫn cách dùng Chrome DevTools để kiểm tra lỗi đỏ trong Console và xem dữ liệu đã lưu trong Local Storage? |
| **Kiệt (DO)** | 1. Nhóm xử lý xung đột mã nguồn khi ghép code và kiểm soát tích hợp bằng GitHub như thế nào?<br>2. Vì sao thứ tự khai báo các thẻ `<script>` lại cực kỳ quan trọng? Thuộc tính `defer` hoạt động ra sao?<br>3. Nếu đường dẫn file JS hoặc file ảnh bị sai thì biểu hiện nhìn thấy trong tab Network của DevTools là gì? |
| **Liêm (PM)** | 1. Muốn thêm một chức năng mới vào website hiện có, nhóm tiến hành phân tích và xác định những thành phần cần chỉnh sửa theo quy trình nào?<br>2. Vì sao cả nhóm bắt buộc phải thống nhất bảng quy ước chung (tên hàm, khóa `"cart"`) trước khi bắt đầu viết code? Nếu không thống nhất trước thì hậu quả là gì? |

---

## 7. Bảng rà soát trước khi nộp bài

Trước khi nộp bài chính thức vào ngày 11/11/2026, trưởng nhóm (Liêm) cùng các thành viên rà soát lại đủ 12 mục trong bảng dưới đây:

| STT | Hạng mục bàn giao | Yêu cầu kiểm tra chi tiết | Người phụ trách | Tự đánh giá |
|:---:|---|---|:---:|:---:|
| 1 | **Mã nguồn website** | Thư mục `session3/` chứa đầy đủ các file HTML, CSS, JavaScript và ảnh; chạy mượt mà trên Live Server. | Kiệt | [ ] |
| 2 | **Dữ liệu sản phẩm** | File `js/data/products.js` có đúng 8 sản phẩm với giá dạng số, hàm `formatPrice` và `getProductById` hoạt động tốt. | Châu | [ ] |
| 3 | **Trang danh sách** | `products.html` hiển thị 8 thẻ sản phẩm từ dữ liệu JS; có thông báo khi danh sách rỗng; nút thêm giỏ hoạt động. | Phúc | [ ] |
| 4 | **Tìm kiếm, lọc, sắp xếp** | Thanh công cụ trong `products.html` tìm đúng tên, lọc đúng danh mục, sắp xếp giá chuẩn và không đổi mảng gốc. | Thành | [ ] |
| 5 | **Trang chi tiết** | `product-detail.html?id=3` hiển thị đúng; xử lý tốt khi `?id=999` hoặc `?id=abc`; có ô chọn số lượng và nút thêm giỏ. | Hoàn | [ ] |
| 6 | **Giao diện giỏ hàng** | `cart.html` hiển thị đầy đủ bảng giỏ hàng, nút tăng giảm xóa cập nhật tức thì; tính đúng tổng tiền; có giao diện giỏ trống. | Đạt | [ ] |
| 7 | **Lưu trữ LocalStorage** | Dữ liệu giỏ hàng lưu vào khóa `"cart"`, không mất khi tải lại trang; ứng dụng không bị sập khi dữ liệu rác. | Châu | [ ] |
| 8 | **Báo cáo kiểm thử** | File `docs/kiem-thu.md` có ít nhất 16 ca kiểm thử kèm kết quả thực tế và danh sách lỗi đã được xử lý. | Ngọc | [ ] |
| 9 | **Lịch sử GitHub** | File `docs/github.md` ghi nhận đủ 8 thành viên đều có các commit và PR hợp lệ được merge vào `main`. | Kiệt | [ ] |
| 10 | **Tài liệu README** | File `session3/README.md` được viết đầy đủ 10 đề mục lớn, trung thực với kết quả đạt được. | Liêm | [ ] |
| 11 | **Ảnh minh chứng** | Thư mục `docs/screenshots/` có đủ 15 ảnh chụp màn hình rõ nét của 5 trang web ở 3 kích thước 1366, 768, 390px. | Ngọc | [ ] |
| 12 | **Kịch bản thuyết trình** | File `docs/trinh-bay.md` có kịch bản 5 phút rõ ràng, phân vai cho cả 8 thành viên tham gia nói và demo. | Cả nhóm | [ ] |

*Lưu ý cuối cùng:* Toàn bộ các trang web và tính năng phải hoạt động liên kết liền mạch trên **cùng một website trong `session3/`**, không tách thành các trang demo độc lập.