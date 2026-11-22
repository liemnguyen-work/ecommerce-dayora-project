# Bài tập nhóm Buổi 2: HTML5 & CSS3 — hướng dẫn cho DAYORA

Đề gốc: `BaiTap_Nhom_Buoi2.pdf` (TS Nguyễn Mạnh Tuấn). File này chia đề thành việc cụ thể cho 8 người, điền sẵn thông tin DAYORA vào prompt của đề, và ghi rõ khi nào một việc được tính là xong. Cách dùng AI trong repo: `docs/AI-SETUP.md`.

## 0. Luật chơi: làm từ đầu, không đi vượt

Buổi 2 chỉ học HTML5 và CSS3. Công nghệ React/NestJS trong `AGENTS.md` là kế hoạch các phase sau, chưa dùng ở đây.

| Được dùng                                                                          | Không được dùng                                                      |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| File `.html` và `.css` viết tay                                                    | JavaScript (kể cả `onclick`, `<script>`)                             |
| Flexbox, CSS Grid, `@media`, `:hover`, `:focus-visible`, `transition`              | Bootstrap, Tailwind hay bất kỳ framework CSS nào                     |
| Biến CSS (`--mau-nhan`)                                                            | React, Vite, npm, Node, backend, database                            |
| Ảnh có sẵn trong `assets/images/` (8 ảnh sản phẩm, banner, logo, 2 ảnh giới thiệu) | Chép nguyên trang mẫu trên mạng hoặc trang AI viết sẵn mà không hiểu |
| Dữ liệu Buổi 1: tên, giá, chất liệu sản phẩm (bảng ở Bước 5), màu và font (Bước 3) | Giỏ hàng chạy được, đăng nhập thật, thanh toán, bộ lọc chạy được     |

Nút "Thêm vào giỏ", "Mua ngay", ô tìm kiếm: **chỉ là giao diện**, bấm không làm gì (dùng `<button type="button">` hoặc link về trang khác).

Kiểm tra nhanh trước khi nộp:
```bash
grep -rn --include=*.html --include=*.css "<script\|onclick\|bootstrap\|tailwind" session2/   # phải không in gì
```

## 1. Nơi làm bài

Làm trong repo GitHub của nhóm (repo đã tạo ở Buổi 1), thư mục `session2/` ở gốc repo, để sau này không lẫn với phần xây lại React. Cấu trúc theo đề:

```
session2/
├─ index.html            # Trang chủ
├─ products.html         # Danh sách sản phẩm
├─ product-detail.html   # Chi tiết sản phẩm
├─ about.html            # Giới thiệu cửa hàng
├─ css/style.css         # MỘT file CSS chung, chia khu theo người
├─ images/               # banner.jpg, logo.png, product-1.jpg … product-8.jpg, about-*.jpg
├─ docs/
│  ├─ plan.md        # Bước 1: kế hoạch + bảng phân công
│  ├─ ui-design.md       # Bước 3: đặc tả giao diện
│  ├─ test-report.md        # Bước 7, 9: lỗi, cách xử lý, kết quả + ảnh 3 kích thước
│  ├─ ai-usage.md        # Báo cáo sử dụng AI Buổi 2: ít nhất 2 ví dụ, dẫn tới mục trong docs/ai-logs/<tên>.md
│  ├─ screenshots/       # ảnh 1366 / 768 / 390 px
│  └─ answers/<Tên>.md   # Bước 10: mỗi người tự trả lời 6 câu
└─ README.md             # Bước 9C
```

Mở website: bấm đúp `session2/index.html`, hoặc dùng extension Live Server của VS Code. Không cần cài gì thêm.

## 2. Phân công

Mỗi người sở hữu file của mình và **một khu** trong `css/style.css`. Không sửa khu của người khác; cần đổi thì nhắn người sở hữu hoặc ghi vào PR.

| Vai | Người | Việc chính (bước của đề)                                                   | File sở hữu                                                       | Khu trong `style.css`                                                               | Reviewer  |
| --- | ----- | -------------------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------- |
| PM  | Liêm  | B1 kế hoạch, B9C README, gom bài nộp, `ai-usage.md`                        | `session2/docs/plan.md`, `README.md`, `session2/docs/ai-usage.md` | —                                                                                   | QA Ngọc   |
| DO  | Kiệt  | B2 cấu trúc thư mục, ảnh, quy ước đặt tên, gác cổng PR, B9 phần C (GitHub) | `images/`, khung 4 file HTML rỗng                                 | —                                                                                   | PM Liêm   |
| PD  | Đạt   | B3 đặc tả giao diện, biến màu/font/khoảng cách, B8 hover + focus           | `session2/docs/ui-design.md`                                      | `/* 1. BIẾN VÀ NỀN */`, `/* 8. HOVER, FOCUS */`                                     | FD1 Thành |
| FD1 | Thành | B4 header, menu, banner, footer; trang chủ                                 | `index.html`                                                      | `/* 2. HEADER, MENU, FOOTER */`, `/* 3. TRANG CHỦ */`                               | PD Đạt    |
| FD2 | Phúc  | B5 danh sách sản phẩm (8 sản phẩm)                                         | `products.html`                                                   | `/* 4. DANH SÁCH SẢN PHẨM */`                                                       | FD1 Thành |
| BD1 | Hoàn  | B6A chi tiết sản phẩm                                                      | `product-detail.html`                                             | `/* 5. CHI TIẾT SẢN PHẨM */`                                                        | BD2 Châu  |
| BD2 | Châu  | B6B giới thiệu cửa hàng                                                    | `about.html`                                                      | `/* 6. GIỚI THIỆU */`                                                               | BD1 Hoàn  |
| QA  | Ngọc  | B7 responsive 3 kích thước, B9A rà soát, B9B đánh giá bằng AI              | `session2/docs/test-report.md`, `session2/docs/screenshots/`      | `/* 7. RESPONSIVE */` (chỉ sửa lỗi đã ghi trong `test-report.md`, báo người sở hữu) | PM Liêm   |

Mọi người: B10 trả lời 6 câu trong `session2/docs/answers/<Tên>.md`; mỗi lần dùng AI thì nối mục vào nhật ký cá nhân `docs/ai-logs/<tên>.md` (ở gốc repo, theo `docs/ai-logs/ai-logging-rules.md`).

## 3. Thứ tự làm (ai chờ ai)

```
Đợt 1  B1 kế hoạch (Liêm) ──► B2 khung thư mục + 4 file HTML rỗng (Kiệt) ──► B3 biến CSS + ui-design (Đạt)
Đợt 2  B4 header/footer (Thành) ──► dán header/footer vào 4 trang
Đợt 3  B5 products (Phúc) ║ B6A detail (Hoàn) ║ B6B about (Châu) ║ trang chủ (Thành)   ← làm song song
Đợt 4  B7 responsive (Ngọc + người sở hữu sửa) ──► B8 hover/focus (Đạt)
Đợt 5  B9 rà soát, đánh giá AI, README (Ngọc, Liêm) ──► B10 mỗi người trả lời 6 câu ──► nộp
```

Vì không có JavaScript, header và footer phải **dán giống hệt** vào cả 4 trang. Chỉ Thành sửa header/footer; sửa xong thì Thành tự cập nhật cả 4 trang trong cùng một PR.

## 4. Git cho bài này

1. Mỗi việc một nhánh: `git checkout main && git pull && git checkout -b b2/<ten-viec>` (ví dụ `b2/products`).
2. Commit nhỏ, mỗi commit một ý: `git commit -m "feat(products): thêm lưới 8 sản phẩm"`.
3. Mở PR về `main`, gắn reviewer theo bảng mục 2, kèm ảnh chụp trang ở 1366 px.
4. Reviewer mở trang trên máy mình, bấm hết link, xem ảnh không vỡ rồi mới duyệt.
5. Không ai push thẳng vào `main`. Hai người sửa cùng `style.css` thì chỉ sửa khu của mình, nên khi gộp không đè nhau.

## 5. Các bước

Mỗi bước có: người làm, việc, prompt (đã điền thông tin DAYORA, dán nguyên vào AI), dấu hiệu xong. **AI chỉ giải thích và gợi ý; bạn tự gõ code**, rồi nối mục vào nhật ký `docs/ai-logs/<tên>.md`: đề xuất nào dùng, sửa, hay bỏ và vì sao. Câu hỏi kiểm tra kiến thức ở mỗi bước: tự trả lời trong `session2/docs/answers/<Tên>.md`, không hỏi AI đáp án.

### Bước 1 — Kế hoạch (Liêm)
- [ ] Dán Prompt 1 dưới đây vào AI, đọc kết quả, sửa lại cho khớp nhóm.
- [ ] Ghi `session2/docs/plan.md`: 4 trang và nội dung mỗi trang, thành phần dùng chung (header, footer, nút, thẻ sản phẩm), bảng phân công mục 2, thứ tự mục 3.
- [ ] Trả lời 3 câu hỏi kiểm tra ở mục 2.2 của đề.

Xong khi: cả nhóm đọc `plan.md` và biết mình làm file nào, chờ ai.

```text
Nhóm tôi đang thực hiện dự án website thương mại điện tử trong môn Phát triển ứng dụng thương mại điện tử.

Ở Buổi 1, nhóm đã hoàn thành:
- Chủ đề cửa hàng: DAYORA, cửa hàng bán đồ dùng cho chuyến đi ngắn trong ngày: thảm picnic, bình nước và ly, hộp đựng thực phẩm, túi giữ nhiệt, vật dụng vệ sinh, phụ kiện. Có 3 tình huống: picnic, hẹn hò, đi biển.
- Đối tượng khách hàng: người chuẩn bị một chuyến đi ngắn cho 1–8 người, hay mua thiếu đồ hoặc mua trùng món đã có.
- Website tham khảo: FanFan, Đi Outdoor, WeTrek.
- Các yêu cầu đã xác định: trang chủ có 6 nhóm hàng và 3 tình huống; danh sách sản phẩm có ảnh, tên, giá; chi tiết sản phẩm có màu, chất liệu, kích thước; trang giới thiệu cửa hàng.
- Bản phác thảo giao diện: nền sáng màu kem, chữ xanh đậm, nút màu đỏ đất; trang chủ có banner lớn ảnh gia đình đi picnic.
- Thành viên và thế mạnh: Liêm (PM), Đạt (thiết kế giao diện), Thành và Phúc (frontend), Hoàn và Châu (backend, nay làm HTML/CSS), Ngọc (kiểm thử), Kiệt (GitHub, cấu hình).

Hãy giúp nhóm lập kế hoạch triển khai giao diện ở Buổi 2.

Yêu cầu:
1. Xác định nội dung cần xây dựng cho ít nhất 4 trang HTML.
2. Xác định các thành phần giao diện dùng chung.
3. Đề xuất cách tổ chức CSS và hình ảnh.
4. Chia công việc thành các nhiệm vụ nhỏ.
5. Đề xuất thứ tự thực hiện và tiêu chí hoàn thành.
6. Xác định các vấn đề có thể xảy ra khi tích hợp mã nguồn.

Chưa viết mã HTML/CSS.
Không đề xuất backend, cơ sở dữ liệu hoặc thanh toán trực tuyến.
Kế hoạch phải kế thừa kết quả Buổi 1 và phù hợp với sinh viên mới học HTML5, CSS3.
```

### Bước 2 — Cấu trúc thư mục (Kiệt)
- [ ] Tạo cây thư mục mục 1. Bốn file HTML có khung tối thiểu: `<!DOCTYPE html>`, `<html lang="vi">`, `<meta charset="UTF-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`, `<title>`, `<link rel="stylesheet" href="css/style.css">`.
- [ ] `css/style.css` chỉ có 8 dòng chú thích chia khu (`/* 1. BIẾN VÀ NỀN */` … `/* 8. HOVER, FOCUS */`) theo bảng mục 2.
- [ ] Chép ảnh từ `assets/images/` (đã đặt sẵn tên `product-1.jpg` … `product-8.jpg`, `banner.jpg`, `logo.png`, `about-1.jpg`, `about-2.jpg`) vào `session2/images/`, rồi xóa thư mục `assets/`. Ảnh tự thêm sau này đặt tên theo quy ước: chữ thường, không dấu, nối bằng gạch ngang (`product-1.jpg`, không phải `Ảnh Thảm 1.JPG`). 
- [ ] Ghi quy ước vào `session2/docs/plan.md`: tên file, tên class (chữ thường, gạch ngang, ví dụ `product-card`, `product-card__price`), đường dẫn tương đối (`images/product-1.jpg`, không dùng `C:\Users\...`).
- [ ] Dán Prompt 2 của đề (mục 3.2) kèm cây thư mục vừa tạo để AI kiểm tra.

Xong khi: mở 4 file trên trình duyệt đều ra trang trắng có tiêu đề tab đúng, DevTools → Network không có file CSS hay ảnh lỗi 404.

### Bước 3 — Đặc tả giao diện (Đạt)
- [ ] Dán Prompt 3 dưới đây, đối chiếu với wireframe Buổi 1.
- [ ] Viết `session2/docs/ui-design.md`: bố cục từng trang (vẽ khung bằng chữ như ví dụ của đề), bảng màu, font, cỡ chữ, khoảng cách, kiểu nút, kiểu thẻ sản phẩm.
- [ ] Khu `/* 1. BIẾN VÀ NỀN */` trong `style.css`: biến màu và nền chung, để mọi người dùng `var(--...)` thay vì tự gõ mã màu.

```css
:root {
  --mau-nen: #FFFDF7;      /* paper: nền */
  --mau-chu: #23412E;      /* ink: chữ */
  --mau-nhan: #C8483C;     /* berry: nút chính */
  --mau-nang: #F2C14E;     /* butter: trang trí, không dùng làm màu chữ */
  --mau-la: #DDE8C9;       /* leaf: mảng nền */
  --khoang: 16px;
  --bo-goc: 12px;
}
```
Font: Be Vietnam Pro qua Google Fonts (`<link>` trong `<head>`, được phép vì chỉ là CSS).

Xong khi: 4 người làm trang đọc `ui-design.md` mà không phải hỏi lại màu hay font.

```text
Nhóm tôi đang xây dựng website thương mại điện tử với 4 trang HTML:
1. Trang chủ.
2. Danh sách sản phẩm.
3. Chi tiết sản phẩm.
4. Giới thiệu cửa hàng.

Chủ đề cửa hàng: DAYORA, đồ dùng cho chuyến đi ngắn trong ngày (picnic, hẹn hò, đi biển).
Đối tượng khách hàng: người chuẩn bị chuyến đi cho 1–8 người, thường xem trên điện thoại.
Phong cách giao diện: sáng, ấm, tự nhiên; nền kem #FFFDF7, chữ xanh đậm #23412E, nút đỏ đất #C8483C, điểm nhấn vàng #F2C14E, mảng nền xanh lá nhạt #DDE8C9; font Be Vietnam Pro.
Bản phác thảo Buổi 1: header có logo và menu; banner lớn ảnh gia đình đi picnic; lưới sản phẩm có ảnh, tên, giá.

Hãy giúp nhóm xác định:
1. Bố cục cụ thể của từng trang.
2. Các thành phần dùng chung giữa các trang.
3. Bảng màu và kiểu chữ thống nhất.
4. Cách bố trí nội dung và hình ảnh.
5. Cách điều hướng giữa 4 trang.
6. Những điểm cần lưu ý để giao diện dễ sử dụng.

Chỉ xây dựng đặc tả giao diện và giải thích.
Chưa viết mã HTML/CSS.
Không tự bổ sung chức năng ngoài phạm vi bài tập.
```

### Bước 4 — Header, menu, banner (Thành)
- [ ] Header dùng thẻ `<header>` + `<nav>`: logo DAYORA, menu Trang chủ / Sản phẩm / Giới thiệu trỏ đúng `index.html`, `products.html`, `about.html`; ô tìm kiếm chỉ giao diện (`<input type="search">`, không có `<form action>`).
- [ ] Bố trí header bằng Flexbox (`display: flex; justify-content: space-between; align-items: center`).
- [ ] Trang đang mở có link menu được đánh dấu (`aria-current="page"` + CSS cho `[aria-current="page"]`).
- [ ] Banner trên `index.html`: phần tử bao có `class="banner"`; ảnh (`images/banner.jpg`), tiêu đề, một câu giới thiệu, nút "Xem sản phẩm" trỏ `products.html`.
- [ ] Footer: tên cửa hàng, liên hệ, link 3 trang.
- [ ] Dán header + footer giống hệt vào 4 trang (mỗi trang đổi `aria-current`).
- [ ] Trang chủ: khu sản phẩm nổi bật (4 sản phẩm, dùng lại kiểu thẻ của Phúc khi Phúc xong), khu 3 tình huống, link sang trang giới thiệu.
- [ ] Dán Prompt 4 của đề (mục 5.2), điền: tên cửa hàng DAYORA, các trang `index.html, products.html, product-detail.html, about.html`, HTML/CSS hiện có.

Xong khi: từ trang bất kỳ bấm được sang 3 trang còn lại; thu cửa sổ còn 390 px menu không chồng lên logo.

### Bước 5 — Danh sách sản phẩm (Phúc)
- [ ] `products.html`: tiêu đề trang, lưới **8 thẻ** sản phẩm. Mỗi thẻ: `<article class="product-card">` có ảnh (`alt` mô tả sản phẩm), tên, giá, link "Xem chi tiết" trỏ `product-detail.html`.
- [ ] Lưới bằng CSS Grid: 4 cột ở máy tính, 2 cột ở tablet, 1–2 cột ở điện thoại (`@media`).
- [ ] Ảnh cùng tỉ lệ, không méo: `aspect-ratio: 1; object-fit: cover; width: 100%`.
- [ ] Tên dài thì thẻ vẫn cao đều (giới hạn 2 dòng hoặc đẩy giá xuống đáy thẻ bằng Flexbox cột).
- [ ] Dán Prompt 5 của đề (mục 6.2) với danh sách sản phẩm dưới đây.

8 sản phẩm gợi ý (ảnh đã có trong `images/`, mã SKU để đối chiếu dữ liệu Buổi 1):

| Ảnh | Tên | Giá |
|---|---|---|
| `product-1.jpg` (DAY-TM-001) | Thảm picnic gấp gọn 2 người | 149.000 ₫ |
| `product-2.jpg` (DAY-TM-002) | Thảm picnic gấp gọn 4 người | 229.000 ₫ |
| `product-3.jpg` (DAY-BL-001) | Bình nước cá nhân 750 ml | 159.000 ₫ |
| `product-4.jpg` (DAY-BL-002) | Ly picnic có nắp 350 ml | 79.000 ₫ |
| `product-5.jpg` (DAY-HD-001) | Hộp đựng thực phẩm 1.000 ml | 89.000 ₫ |
| `product-6.jpg` (DAY-GN-001) | Túi giữ nhiệt xách tay 15 lít | 249.000 ₫ |
| `product-7.jpg` (DAY-GN-002) | Túi giữ nhiệt nhỏ 8 lít | 169.000 ₫ |
| `product-8.jpg` (DAY-VS-002) | Khăn giấy khô gói 100 tờ | 19.000 ₫ |

Xong khi: đếm được 8 thẻ, thẻ cùng hàng cao bằng nhau, 390 px không có thanh cuộn ngang.

### Bước 6A — Chi tiết sản phẩm (Hoàn)
- [ ] `product-detail.html` cho một sản phẩm (gợi ý Thảm picnic gấp gọn 4 người): ảnh lớn bên trái, thông tin bên phải (Grid 2 cột ở máy tính, 1 cột ở điện thoại).
- [ ] Tên, giá, mô tả ngắn, bảng thuộc tính bằng `<table>` hoặc `<dl>`: màu (Caro kem – olive), chất liệu (Vải polyester, lớp đế PE), kích thước (200 × 200 cm), đơn vị bán (Tấm).
- [ ] Nút "Thêm vào giỏ" và "Mua ngay" chỉ giao diện (`<button type="button">`).
- [ ] Link "← Quay lại danh sách sản phẩm" trỏ `products.html`.
- [ ] Dán Prompt 6A của đề (mục 7.2) với thông tin sản phẩm trên.

Xong khi: nút mua nổi bật hơn mọi thứ khác trên trang; 390 px ảnh nằm trên, thông tin nằm dưới.

### Bước 6B — Giới thiệu cửa hàng (Châu)
- [ ] `about.html` chia phần bằng `<section>`, mỗi phần một `<h2>`: DAYORA bán gì, dành cho ai, điểm nổi bật (gợi ý bộ đồ theo số người và ngân sách, 3 tình huống picnic / hẹn hò / đi biển), hình ảnh (`images/about-1.jpg`, `images/about-2.jpg`), liên hệ.
- [ ] Chỉ dùng thông tin có trong tài liệu Buổi 1 (Charter, báo cáo). Thông tin chưa có (số điện thoại, địa chỉ thật) thì ghi rõ "đang cập nhật", không tự bịa.
- [ ] Ảnh và chữ xếp 2 cột bằng Flexbox hoặc Grid ở máy tính, 1 cột ở điện thoại.
- [ ] Dán Prompt 6B của đề (mục 7.4), điền tên DAYORA, lĩnh vực, đối tượng, điểm nổi bật như trên.

Xong khi: trang đọc được trong 1 phút, không có đoạn văn dài quá 5 dòng.

### Bước 7 — Responsive 3 kích thước (Ngọc)
- [ ] DevTools → Toggle device toolbar (Ctrl+Shift+M), nhập đúng chiều rộng 1366, 768, 390 px. Chụp 4 trang × 3 kích thước = 12 ảnh vào `session2/docs/screenshots/`.
- [ ] Mỗi trang kiểm: tràn ngang (gõ `document.documentElement.scrollWidth > innerWidth` trong Console; `true` là có tràn), ảnh méo, lưới đổi số cột, menu chồng, banner mất chữ, nút quá nhỏ (dưới 44 px).
- [ ] Ghi mỗi lỗi vào `session2/docs/test-report.md`: trang, kích thước, mô tả, ảnh, người sửa, cách sửa, kết quả kiểm lại.
- [ ] Lỗi dùng Prompt 7 của đề (mục 8.2) kèm CSS liên quan và ảnh. Không ghi "đã sửa" khi chưa mở lại trình duyệt kiểm.

Xong khi: 12 ảnh, mọi lỗi đã ghi có cột "kết quả kiểm lại", `python tools/check-session2.py session2` không còn `[LOI]`.

### Bước 8 — Hover, focus (Đạt)
- [ ] Khu `/* 8. HOVER, FOCUS */`: hover cho link menu, thẻ sản phẩm, nút "Xem chi tiết", nút mua; `:focus-visible` có viền rõ cho mọi link và nút.
- [ ] Không xóa `outline` mà không có viền thay thế. Hiệu ứng không làm xê dịch bố cục (dùng `transform`, không đổi `width`/`margin`).
- [ ] Thử bằng bàn phím: bấm Tab đi hết trang chủ, luôn nhìn thấy đang ở đâu.
- [ ] Dán Prompt 8 của đề (mục 9.2).

Xong khi: Tab qua mọi trang không lần nào mất dấu con trỏ; chữ trên nút vẫn đọc rõ khi hover.

### Bước 9 — Tích hợp, rà soát, AI, GitHub (Ngọc, Liêm, Kiệt)
- [ ] **A (Ngọc):** bấm hết link trên 4 trang, kiểm đường dẫn ảnh, CSS áp dụng giống nhau. Dùng Prompt 9A của đề (mục 10.2). Ghi kết quả vào `test-report.md`.
- [ ] **B (Ngọc):** dùng Prompt 9B của đề (mục 10.4) cho code từng trang. Chọn **ít nhất 2 vấn đề thật**: tìm đúng dòng code, kiểm trên trình duyệt, quyết định áp dụng hay không, ghi vào `session2/docs/ai-usage.md` (đề xuất, cách kiểm, kết quả, quyết định).
- [ ] **C (Kiệt):** mọi PR đã merge, `main` có đủ 4 trang + ảnh; repo Public hoặc đã mời giảng viên.
- [ ] **README (Liêm):** dùng Prompt 9C của đề (mục 10.6). README có: giới thiệu, cấu trúc thư mục, 4 trang, công nghệ (HTML5, CSS3, Grid/Flexbox, media query), cách mở (bấm đúp `session2/index.html`), cách kiểm responsive, hạn chế (chưa có giỏ hàng, tìm kiếm, thanh toán thật).

Xong khi: một người ngoài nhóm clone repo, mở `session2/index.html` và đi hết 4 trang không gặp link hỏng.

### Bước 10 — Mỗi người tự trả lời 6 câu
Mỗi người viết `session2/docs/answers/<Tên>.md`, **tự viết, không dán câu trả lời của AI**. Giảng viên có thể gọi bất kỳ ai giải thích, dự đoán, sửa lỗi trực tiếp.

1. **Giải thích mã:** chọn một đoạn HTML và một đoạn CSS **trong file mình sở hữu**. Giải thích vai trò các thẻ, ít nhất 3 thuộc tính CSS, đoạn đó ảnh hưởng giao diện thế nào.
2. **Dự đoán:** `grid-template-columns: repeat(4, 1fr)` đổi thành `repeat(2, 1fr)` thì sao? Viết dự đoán trước, rồi sửa thử trên `products.html`, chụp ảnh, so với dự đoán.
3. **Phát hiện lỗi:** `.product-image { width: 100%; height: 250px; }` làm ảnh méo. Sửa thế nào, thuộc tính thêm vào có tác dụng gì? (Gợi ý tự tìm: `object-fit`.)
4. **Quyết định kỹ thuật:** phần của bạn dùng Grid hay Flexbox, vì sao? Nêu một tình huống phương án kia hợp hơn.
5. **Responsive:** trang tràn ngang ở 390 px thì kiểm thành phần nào trước, dùng công cụ gì?
6. **Đánh giá AI:** một đề xuất của AI bạn đã dùng, sửa hoặc bỏ: đề xuất gì, kiểm bằng cách nào, kết quả, rút ra gì. Phải khớp với mục của bạn trong `ai-usage.md`.

Luyện trước buổi học (theo cặp reviewer ở mục 2): người này đổi một thuộc tính CSS trong file của người kia, người kia đoán kết quả trước khi tải lại trang.

## 6. Bảng nộp bài (Liêm kiểm trước khi nộp)

| # | Sản phẩm | Yêu cầu của đề | Ở đâu | Người chịu trách nhiệm |
|---|---|---|---|---|
| 1 | GitHub repository | Tiếp tục repo Buổi 1 | thư mục `session2/` | Kiệt |
| 2 | Trang chủ | Header, menu, banner, sản phẩm nổi bật | `index.html` | Thành |
| 3 | Danh sách sản phẩm | ≥ 8 sản phẩm | `products.html` | Phúc |
| 4 | Chi tiết sản phẩm | Ảnh, tên, giá, mô tả, thuộc tính | `product-detail.html` | Hoàn |
| 5 | Giới thiệu | Nội dung và hình ảnh | `about.html` | Châu |
| 6 | Responsive | Ảnh 1366, 768, 390 px | `session2/docs/screenshots/` | Ngọc |
| 7 | Hiệu ứng | Hover và focus | khu 8 trong `style.css` | Đạt |
| 8 | Báo cáo kiểm thử | Lỗi, cách xử lý, kết quả | `session2/docs/test-report.md` | Ngọc |
| 9 | Báo cáo sử dụng AI | ≥ 2 ví dụ có phân tích, minh chứng | `session2/docs/ai-usage.md` | Ngọc, Liêm |
| 10 | README | Cách xem và chạy | `README.md` | Liêm |
| 11 | Bảng phân công | Nhiệm vụ từng người | `session2/docs/plan.md` | Liêm |
| 12 | Câu hỏi kiến thức | Mỗi người 6 câu | `session2/docs/answers/` (8 file) | cả nhóm |

Kiểm lần cuối:
- [ ] `python tools/check-session2.py session2` báo `0 lỗi` và không còn cảnh báo phần nộp bài.
- [ ] `grep -rn --include=*.html --include=*.css "<script\|onclick\|bootstrap\|tailwind" session2/` không in gì.
- [ ] Không còn đường dẫn tuyệt đối: VS Code → Ctrl+Shift+F tìm `C:\` và `file:///` trong `session2/` không ra kết quả.
- [ ] 8 file trong `session2/docs/answers/`, mỗi file đủ 6 câu.
- [ ] Mở repo bằng tài khoản khác (hoặc cửa sổ ẩn danh) xem được mã nguồn.
