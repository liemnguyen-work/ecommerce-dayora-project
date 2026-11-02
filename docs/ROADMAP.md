---
tags: [team, roadmap]
---
# ROADMAP — Lộ trình xây dựng DAYORA từ đầu đến cuối

Nhóm tự xây DAYORA trong repo này theo 8 phase ([PHASES](../phases/PHASES.md)): P0 nền móng → P1 catalog, tài khoản → P2 giỏ, checkout → P3 VNPay, đơn hàng → P4 Kit Builder → P5 quản trị, bảo mật → P6 kiểm thử tổng, Innovation → P7 đóng gói, bảo vệ.

Đọc kèm:
- [ASSIGNMENTS](ASSIGNMENTS.md): bài tập trên lớp theo buổi. **Bài tập trong phase làm trước, task đồ án làm sau.**
- [LEARNING-PATH](learning/LEARNING-PATH.md): cách học, 7 bước prompt, nhật ký AI.
- [PITFALLS](learning/PITFALLS.md): lỗi hay gặp, để tránh từ đầu.
- Yêu cầu: [REQUIREMENTS](../REQUIREMENTS.md) (FR01–FR18), quyết định: [DECISIONS](DECISIONS.md).

## Hai loại task
| Loại | Mã | Nhánh | Label | Ưu tiên |
|---|---|---|---|---|
| Bài tập trên lớp | `HW-P<phase>-<VAI>-<số>` | `hw/p<phase>-<vai>-<số>` | `homework` | Làm trước trong phase |
| Đồ án | `PRJ-P<phase>-<VAI>-<số>` | `prj/p<phase>-<vai>-<số>` | `project` | Sau khi bài tập của mình trong phase đã merge |

Cột "Phải merge trước" giữ thứ tự này: task đồ án đầu tiên của mỗi người phụ thuộc task bài tập của chính người đó. Bài tập chiếm thời gian của phase thì PM dời task đồ án và ghi vào [CHANGELOG](CHANGELOG.md).

## Quy trình một task
Chi tiết từng task PRJ (file phải viết, các bước, tiêu chí xong) nằm ở mục 6 trong file phase của người phụ trách: `docs/learning/<VAI>-<Tên>/LP-<VAI>-<Tên>-P<số>.md` (việc P0 nằm trong `LP-<VAI>-<Tên>.md`). Chi tiết task bài tập nằm trong hướng dẫn của buổi đó (Buổi 2: [SESSION2-GUIDE](SESSION2-GUIDE.md)).

1. **Nhận việc:** PM tạo issue đúng mã (`npm run roadmap:issues`). Bạn tự gán issue cho mình. Kiểm tra cột "Phải merge trước" đã xong.
2. **Tạo nhánh:**
   ```bash
   git checkout main && git pull
   git checkout -b prj/<mã-task-viết-thường>     # bài tập: hw/<mã-task-viết-thường>
   ```
3. **Viết test hoặc ca kiểm thử trước** (cột "Kiểm chứng"):
   - Có tên file test: viết test cạnh file code, commit riêng `test(<phạm vi>): thêm test cho <mã task>`. Lúc này `npm test` đỏ: việc của bạn là làm nó xanh.
   - Không có test tự động: viết ca kiểm thử tay vào `docs/testing/TEST-CASES.md` (bước, dữ liệu, kết quả mong đợi).
   - QA duyệt ca test trước khi bạn code tiếp. Sau khi duyệt, không nới lỏng test cho dễ pass; cần đổi thì ghi lý do trong PR.
4. **Tự viết code** theo bước 5 của lộ trình prompt. Commit nhỏ, mỗi commit một ý:
   ```bash
   git commit -m "feat(cart): thêm món vào giỏ"
   ```
5. **Kiểm tra:**
   ```bash
   npm test -w api -- <tên>
   npm run lint
   npm run build
   ```
   - Giao diện: ảnh 1366 px và 390 px, đối chiếu [DESIGN-SYSTEM](DESIGN-SYSTEM.md).
   - Bài tập Buổi 2: `python tools/check-session2.py session2`.
6. **Mở PR** về `main`. Mô tả gồm:
   - `Closes #<số issue>`;
   - lệnh đã chạy và kết quả;
   - ảnh (nếu là giao diện);
   - link mục nhật ký AI trong `docs/ai-logs/<tên>.md`.
7. **Review:**
   - Reviewer chạy lại lệnh kiểm tra, để lại ít nhất 1 nhận xét có nội dung.
   - QA xác nhận test không bị nới lỏng sau khi đã duyệt (`git log -p -- <file test>`).
   - Đạt thì merge (nhóm thống nhất Squash hoặc Rebase). Issue tự đóng = task xong.

## Theo dõi tiến độ repo chung
Bảng task bên dưới là nguồn gốc. Hai script đọc bảng này và `docs/ROLES.md` (cột GitHub):

```bash
npm run roadmap:issues                                       # dry run: in mọi issue sẽ tạo, gán ai, số bước
npm run roadmap:issues -- --show PRJ-P1-BD1-1                 # xem trước nội dung một issue
npm run roadmap:issues -- --repo <owner>/<repo-nhom> --apply # tạo label, milestone theo phase, mỗi task một issue
npm run roadmap:report -- --repo <owner>/<repo-nhom>         # ghi docs/PROGRESS.md
```

- PR ghi `Closes #<số issue>`; merge xong issue tự đóng = task xong.
- `roadmap:issues` chạy lại an toàn: issue đã có (tiêu đề bắt đầu bằng mã task) thì bỏ qua. Thêm task mới vào bảng rồi chạy lại.
- [PROGRESS](PROGRESS.md): task xong/tổng của từng người (tách bài tập và đồ án), PR đã merge, số commit theo GitHub login; bảng theo phase; danh sách task làm được ngay (mọi phụ thuộc đã xong). Dùng làm nguồn cho bảng mức độ tham gia trong báo cáo ([REPORT-OUTLINE](REPORT-OUTLINE.md)).
- PM chạy `roadmap:report` cuối mỗi tuần (thứ 3) và trước họp chốt phase.
- Cần `gh auth login` bằng tài khoản có quyền ghi repo nhóm. Username sai thì sửa ở `docs/ROLES.md`.

## Quy tắc dùng AI và tài liệu ngoài
Mục tiêu là **tự viết và hiểu**. Liêm chính học thuật áp dụng như nhật ký AI ([quy tắc ghi log](ai-logs/ai-logging-rules.md)).

| Được | Không được |
|---|---|
| Hỏi AI giải thích khái niệm, gợi ý bước làm, review diff của bạn | Để AI viết nguyên file rồi commit đứng tên mình |
| Đọc tài liệu chính thức, ví dụ mẫu trên mạng (ghi nguồn) | Chép nguyên code người khác không ghi nguồn |
| Viết theo cách của bạn nếu đạt tiêu chí và giải thích được | Nới lỏng test đã duyệt cho dễ pass |
| Dùng tài sản có quyền: ảnh, logo, font, dữ liệu SKU của nhóm | Ghi nhật ký cho việc mình không làm |

Mỗi lần dùng mã hay ý tưởng từ nguồn ngoài, ghi rõ trong PR và nhật ký: "đã tham khảo … vì …, phần tôi tự viết là …".

## Những gì không có test tự động
- **Giao diện:**
  - Ảnh 1366 px và 390 px, đối chiếu [DESIGN-SYSTEM](DESIGN-SYSTEM.md); PD duyệt.
  - Chức năng bấm thử được (QA chạy ca tay trong `docs/testing/TEST-CASES.md`).
- **Seed, Kit service:** đối chiếu số liệu với REQUIREMENTS và DECISIONS. Ví dụ: 30 SKU, 6 nhóm; `POST /api/kits/build` với PICNIC 4 người, 800.000đ cho kết quả khớp tính tay.
- **Tài liệu, cấu hình:** reviewer đối chiếu với kết quả chạy thật.

## Thứ tự phụ thuộc quan trọng
- `auth` (PRJ-P1-BD1-1) đi đầu. Phần lớn API admin dùng `auth.service`.
- `me` cần cả `me/` (BD1) và `admin-users/` (BD2). Hai người phối hợp, merge gần nhau.
- Chuỗi P2: `pricing` → `cart` → `orders.service` (preview) → `checkout.service`.
- Chuỗi P3 và P5:
  - `admin-orders` (BD2) phải có trước test HTTP của `reviews`.
  - `admin-dashboard` phải có trước test HTTP của `admin-rulesets`.
- Frontend chạy sau API tương ứng. Trong lúc chờ API, có thể dựng giao diện với dữ liệu giả **trong nhánh**; trước khi merge phải nối API thật.

## Bảng task theo phase

### P0 Khởi động (28/10–03/11)

**Bài tập trên lớp (làm trước): Buổi 2, hạn 04/11/2026.** Hướng dẫn và phân công: [SESSION2-GUIDE](SESSION2-GUIDE.md).

| Mã | Người | Việc | Kiểm chứng (test nhóm tự viết) | Phải merge trước |
|---|---|---|---|---|
| HW-P0-PM-1 | PM Liêm | Buổi 2 · B1 kế hoạch `session2/docs/plan.md` ([hướng dẫn](SESSION2-GUIDE.md)) | — | — |
| HW-P0-DO-1 | DO Kiệt | Buổi 2 · B2 khung thư mục, 4 file HTML rỗng, ảnh, quy ước đặt tên, gác cổng PR | `check-session2.py` chạy được | HW-P0-PM-1 |
| HW-P0-PD-1 | PD Đạt | Buổi 2 · B3 `session2/docs/ui-design.md`, biến màu/font/khoảng cách | — | HW-P0-DO-1 |
| HW-P0-FD1-1 | FD1 Thành | Buổi 2 · B4 header, menu, banner, footer; trang chủ `index.html` | `check-session2.py` không lỗi ở `index.html` | HW-P0-PD-1 |
| HW-P0-FD2-1 | FD2 Phúc | Buổi 2 · B5 danh sách 8 sản phẩm `products.html` | `check-session2.py` không lỗi ở `products.html` | HW-P0-FD1-1 |
| HW-P0-BD1-1 | BD1 Hoàn | Buổi 2 · B6A chi tiết sản phẩm `product-detail.html` | `check-session2.py` không lỗi ở `product-detail.html` | HW-P0-FD1-1 |
| HW-P0-BD2-1 | BD2 Châu | Buổi 2 · B6B giới thiệu cửa hàng `about.html` | `check-session2.py` không lỗi ở `about.html` | HW-P0-FD1-1 |
| HW-P0-QA-1 | QA Ngọc | Buổi 2 · B7 responsive 3 kích thước, B9A rà soát, B9B đánh giá bằng AI | ảnh 1366/768/390 px trong `session2/docs/screenshots/` | HW-P0-FD2-1, HW-P0-BD1-1, HW-P0-BD2-1 |
| HW-P0-PD-2 | PD Đạt | Buổi 2 · B8 hover + focus | ca hover/focus trong `session2/docs/test-report.md` | HW-P0-QA-1 |
| HW-P0-PM-2 | PM Liêm | Buổi 2 · B9C README, gom bài nộp, `ai-usage.md`, nhắc B10 cả nhóm; nộp trước 04/11 | `check-session2.py session2` báo 0 lỗi | HW-P0-QA-1, HW-P0-PD-2 |
| PRJ-P0-DO-1 | DO Kiệt | Bộ khung chạy được trong repo nhóm | `app.controller.spec.ts` | HW-P0-DO-1 |
| PRJ-P0-DO-2 | DO Kiệt | CI chạy lint + test + build mỗi PR | — | PRJ-P0-DO-1 |
| PRJ-P0-BD2-1 | BD2 Châu | Schema + migration đầu | — | HW-P0-BD2-1, PRJ-P0-DO-1 |
| PRJ-P0-PD-1 | PD Đạt | Design token + font | — | HW-P0-PD-2, PRJ-P0-DO-1 |
| PRJ-P0-QA-1 | QA Ngọc | Quy trình gác cổng PR (test nghiệm thu không bị sửa) | — | HW-P0-QA-1 |
| PRJ-P0-PM-1 | PM Liêm | Bảng việc: issue cho mọi task (bài tập + đồ án), milestone theo phase | — | — |

### P1 Catalog, tài khoản, giao diện nền (04/11–10/11)

Bài tập trên lớp: chưa có. Khi GV giao, PM thêm vào [ASSIGNMENTS](ASSIGNMENTS.md) và thêm task `HW-P<n>-*` vào đầu bảng.


| Mã | Người | Việc | Kiểm chứng (test nhóm tự viết) | Phải merge trước |
|---|---|---|---|---|
| PRJ-P1-DO-1 | DO Kiệt | Supabase riêng cho nhóm + hướng dẫn cài máy mới | — | PRJ-P0-BD2-1 |
| PRJ-P1-BD2-1 | BD2 Châu | Seed catalog: 6 nhóm, 30 SKU, phí giao, admin, RuleSet v1 | — | PRJ-P0-BD2-1 |
| PRJ-P1-BD2-2 | BD2 Châu | API admin tài khoản | — | PRJ-P1-BD1-1 |
| PRJ-P1-BD2-3 | BD2 Châu | API admin danh mục, sản phẩm, SKU | `admin-catalog.spec.ts` | PRJ-P1-BD1-1 |
| PRJ-P1-BD1-1 | BD1 Hoàn | Đăng ký, đăng nhập, guard | `auth.spec.ts` | HW-P0-BD1-1, PRJ-P0-BD2-1 |
| PRJ-P1-BD1-2 | BD1 Hoàn | API catalog (lọc, sắp xếp, chi tiết) | `catalog.spec.ts` | PRJ-P0-BD2-1 |
| PRJ-P1-BD1-3 | BD1 Hoàn | API ưu đãi công khai | `promotions.spec.ts` | — |
| PRJ-P1-BD1-4 | BD1 Hoàn | Hồ sơ, đổi mật khẩu, sản phẩm đã xem | `me.spec.ts` | PRJ-P1-BD2-2 |
| PRJ-P1-FD1-1 | FD1 Thành | Router, layout, header, footer, gọi API | — | HW-P0-FD1-1, PRJ-P0-PD-1 |
| PRJ-P1-FD1-2 | FD1 Thành | Trang chủ: intro video, chữ hiện từng từ, các section | — | PRJ-P1-FD1-1, PRJ-P1-BD1-2 |
| PRJ-P1-FD1-3 | FD1 Thành | Danh mục: bộ lọc trái, URL, thẻ sản phẩm | — | PRJ-P1-FD1-1, PRJ-P1-BD1-2 |
| PRJ-P1-FD1-4 | FD1 Thành | Chi tiết sản phẩm: biến thể, giá, tồn | — | PRJ-P1-FD1-3 |
| PRJ-P1-FD2-1 | FD2 Phúc | Đăng nhập, đăng ký, trạng thái đăng nhập | — | HW-P0-FD2-1, PRJ-P1-FD1-1, PRJ-P1-BD1-1 |
| PRJ-P1-FD2-2 | FD2 Phúc | Khung quản trị + Sản phẩm + Tài khoản | — | PRJ-P1-FD2-1, PRJ-P1-BD2-3, PRJ-P1-BD2-2 |
| PRJ-P1-PD-1 | PD Đạt | Trang Về chúng tôi | — | PRJ-P1-FD1-1 |
| PRJ-P1-PD-2 | PD Đạt | Đối chiếu giao diện P1 với DESIGN-SYSTEM | — | PRJ-P1-FD1-4 |
| PRJ-P1-QA-1 | QA Ngọc | Ca kiểm thử P1 + chạy thật | — | — |
| PRJ-P1-PM-1 | PM Liêm | Bảng truy vết yêu cầu + CHANGELOG | — | — |

### P2 Giỏ hàng, voucher, phí giao, checkout (11/11–17/11)

Bài tập trên lớp: chưa có. Khi GV giao, PM thêm vào [ASSIGNMENTS](ASSIGNMENTS.md) và thêm task `HW-P<n>-*` vào đầu bảng.


| Mã | Người | Việc | Kiểm chứng (test nhóm tự viết) | Phải merge trước |
|---|---|---|---|---|
| PRJ-P2-DO-1 | DO Kiệt | Checklist dữ liệu demo | — | PRJ-P2-BD2-3 |
| PRJ-P2-BD2-1 | BD2 Châu | API giỏ hàng | `cart.service.spec.ts` | PRJ-P1-BD1-1 |
| PRJ-P2-BD2-2 | BD2 Châu | Xem trước đơn (preview) | `orders.service.spec.ts` | PRJ-P2-BD2-1, PRJ-P2-BD1-1 |
| PRJ-P2-BD2-3 | BD2 Châu | Seed voucher DAYORA10, PICNIC50K + 1 khuyến mãi | — | PRJ-P1-BD2-1 |
| PRJ-P2-BD1-1 | BD1 Hoàn | Tính tiền thuần (voucher, phí giao) | `pricing.spec.ts` | — |
| PRJ-P2-BD1-2 | BD1 Hoàn | Tạo đơn, giữ tồn, hủy, hết hạn 15 phút | `checkout.service.spec.ts` | PRJ-P2-BD2-2 |
| PRJ-P2-BD1-3 | BD1 Hoàn | Admin voucher + khuyến mãi | `admin-vouchers.spec.ts` | PRJ-P1-BD1-1 |
| PRJ-P2-FD1-1 | FD1 Thành | Giỏ hàng + voucher | — | PRJ-P2-BD2-2 |
| PRJ-P2-FD1-2 | FD1 Thành | Thanh toán + hộp đối chiếu 409 | — | PRJ-P2-FD1-1, PRJ-P2-BD1-2 |
| PRJ-P2-FD1-3 | FD1 Thành | Thêm vào giỏ, ghi sản phẩm đã xem | — | PRJ-P2-FD1-1, PRJ-P1-BD1-4 |
| PRJ-P2-FD2-1 | FD2 Phúc | Admin Voucher + Khuyến mãi | — | PRJ-P2-BD1-3 |
| PRJ-P2-PD-1 | PD Đạt | Đối chiếu giao diện giỏ/thanh toán | — | PRJ-P2-FD1-2 |
| PRJ-P2-QA-1 | QA Ngọc | Ca kiểm thử P2 (gồm tranh tồn) | — | — |
| PRJ-P2-PM-1 | PM Liêm | Chương checkout/voucher | — | — |

### P3 Thanh toán VNPay, đơn hàng, đánh giá (18/11–24/11)

Bài tập trên lớp: chưa có. Khi GV giao, PM thêm vào [ASSIGNMENTS](ASSIGNMENTS.md) và thêm task `HW-P<n>-*` vào đầu bảng.


| Mã | Người | Việc | Kiểm chứng (test nhóm tự viết) | Phải merge trước |
|---|---|---|---|---|
| PRJ-P3-DO-1 | DO Kiệt | Cấu hình VNPay Sandbox (env, IPN URL) | — | PRJ-P3-BD1-2 |
| PRJ-P3-BD2-1 | BD2 Châu | Admin đơn hàng theo sơ đồ D08 | `admin-orders.service.spec.ts` | PRJ-P2-BD1-2 |
| PRJ-P3-BD1-1 | BD1 Hoàn | Ký và kiểm chữ ký VNPay | `vnpay.spec.ts` | — |
| PRJ-P3-BD1-2 | BD1 Hoàn | Thanh toán: tạo URL, Return, IPN | `payments.spec.ts` | PRJ-P3-BD1-1, PRJ-P2-BD1-2 |
| PRJ-P3-BD1-3 | BD1 Hoàn | Đánh giá sau mua | `reviews.service.spec.ts`, `reviews.http.spec.ts` | PRJ-P3-BD2-1 |
| PRJ-P3-FD1-1 | FD1 Thành | Chi tiết đơn + kết quả thanh toán | — | PRJ-P3-BD1-2 |
| PRJ-P3-FD1-2 | FD1 Thành | Đánh giá trên trang sản phẩm | — | PRJ-P3-BD1-3 |
| PRJ-P3-FD2-1 | FD2 Phúc | Admin Đơn hàng | — | PRJ-P3-BD2-1 |
| PRJ-P3-FD2-2 | FD2 Phúc | Trang Tài khoản 4 tab | — | PRJ-P1-BD1-4, PRJ-P3-BD1-3 |
| PRJ-P3-PD-1 | PD Đạt | Đối chiếu giao diện đơn/tài khoản | — | PRJ-P3-FD1-1 |
| PRJ-P3-QA-1 | QA Ngọc | Ca kiểm thử P3 (thanh toán, trạng thái, đánh giá) | — | — |
| PRJ-P3-PM-1 | PM Liêm | Chương thanh toán | — | — |

### P4 Kit Builder (25/11–01/12)

Bài tập trên lớp: chưa có. Khi GV giao, PM thêm vào [ASSIGNMENTS](ASSIGNMENTS.md) và thêm task `HW-P<n>-*` vào đầu bảng.


| Mã | Người | Việc | Kiểm chứng (test nhóm tự viết) | Phải merge trước |
|---|---|---|---|---|
| PRJ-P4-DO-1 | DO Kiệt | Cấu hình deploy | — | — |
| PRJ-P4-BD2-1 | BD2 Châu | Kit service + API /kits | — | PRJ-P4-BD1-1 |
| PRJ-P4-BD2-2 | BD2 Châu | RuleSet: tạo nháp, sửa, kiểm hợp lệ, phát hành | `admin-rulesets.service.spec.ts` | — |
| PRJ-P4-BD1-1 | BD1 Hoàn | Kit engine R01–R05 | `kit-engine.spec.ts` | — |
| PRJ-P4-FD1-1 | FD1 Thành | Kit Builder 3 bước + giữ bộ qua đăng nhập | — | PRJ-P4-BD2-1 |
| PRJ-P4-FD1-2 | FD1 Thành | Xem trước bộ trên trang chủ | — | PRJ-P4-FD1-1 |
| PRJ-P4-FD2-1 | FD2 Phúc | Admin Quy tắc Kit | — | PRJ-P4-BD2-2 |
| PRJ-P4-PD-1 | PD Đạt | Đối chiếu Kit Builder + thử với 2 người | — | PRJ-P4-FD1-1 |
| PRJ-P4-QA-1 | QA Ngọc | Ca kiểm thử Kit Builder ≥ 24 ca | — | — |
| PRJ-P4-PM-1 | PM Liêm | Chương Kit Builder | — | — |

### P5 Quản trị quy tắc, dashboard, bảo mật (02/12–08/12)

Bài tập trên lớp: chưa có. Khi GV giao, PM thêm vào [ASSIGNMENTS](ASSIGNMENTS.md) và thêm task `HW-P<n>-*` vào đầu bảng.


| Mã | Người | Việc | Kiểm chứng (test nhóm tự viết) | Phải merge trước |
|---|---|---|---|---|
| PRJ-P5-DO-1 | DO Kiệt | Deploy + trust proxy + biên bản kiểm tra | — | PRJ-P5-BD2-2 |
| PRJ-P5-BD2-1 | BD2 Châu | Dashboard thống kê D10 | `admin-dashboard.service.spec.ts`, `admin-rulesets.http.spec.ts` | PRJ-P4-BD2-2 |
| PRJ-P5-BD2-2 | BD2 Châu | Bảo mật chung: header, rate limit, lọc lỗi 500, ValidationPipe | `security.spec.ts` | — |
| PRJ-P5-BD1-1 | BD1 Hoàn | Khóa tài khoản chặn token cũ + biên bản IDOR | — | PRJ-P5-BD2-2 |
| PRJ-P5-FD1-1 | FD1 Thành | Rà accessibility trang khách | — | — |
| PRJ-P5-FD2-1 | FD2 Phúc | Admin Tổng quan | — | PRJ-P5-BD2-1 |
| PRJ-P5-PD-1 | PD Đạt | Kiểm tương phản + nguồn ảnh | — | — |
| PRJ-P5-QA-1 | QA Ngọc | Ca kiểm thử bảo mật + chương kiểm thử | — | — |
| PRJ-P5-PM-1 | PM Liêm | Chương bảo mật + bảng đóng góp từ git log | — | — |

### P6 Kiểm thử tổng, Innovation (09/12–15/12)

Bài tập trên lớp: chưa có. Khi GV giao, PM thêm vào [ASSIGNMENTS](ASSIGNMENTS.md) và thêm task `HW-P<n>-*` vào đầu bảng.

Innovation (thay FR18) chỉ làm khi nhóm chốt ở cuối P5 và ghi vào [DECISIONS](DECISIONS.md) D11. Các task P6 dưới đây là phương án đề xuất; nhóm có thể đổi.

| Mã | Người | Việc | Kiểm chứng (test nhóm tự viết) | Phải merge trước |
|---|---|---|---|---|
| PRJ-P6-BD1-1 | BD1 Hoàn | API AI đọc mô tả chuyến đi (`/kits/ai-parse`) | `kit-ai.spec.ts` | PRJ-P4-BD1-1 |
| PRJ-P6-FD1-1 | FD1 Thành | Ô AI + "Lộ trình chọn đồ" mẫu + dải AI Sản phẩm | — | PRJ-P6-BD1-1, PRJ-P4-FD1-1 |
| PRJ-P6-QA-1 | QA Ngọc | Ca kiểm thử Innovation AI (tự động + thử tay) | `kit-ai.spec.ts` xanh | PRJ-P6-BD1-1 |
| PRJ-P6-DO-1 | DO Kiệt | Cấu hình khóa AI trên Render + biên bản | — | PRJ-P6-BD1-1 |
| PRJ-P6-BD1-2 | BD1 Hoàn | API đăng nhập Google/Facebook qua Supabase (`POST /auth/oauth`) | `auth.spec.ts` (8 ca OAuth) | PRJ-P1-BD1-1 |
| PRJ-P6-BD1-3 | BD1 Hoàn | Engine tự tính số lượng khi đổi SKU, `overBy` trong lỗi R05, AI "mua lại" món tự lo | `kit-engine.spec.ts`, `kit-ai.spec.ts` | PRJ-P6-BD1-1 |
| PRJ-P6-FD1-2 | FD1 Thành | Kit Builder: "Chọn món", lỗi tại món, nút nâng ngân sách | — | PRJ-P6-BD1-3, PRJ-P6-FD1-1 |
| PRJ-P6-FD2-1 | FD2 Phúc | Quản trị trên điện thoại + tìm/lọc/phân trang đơn và tài khoản | — | PRJ-P5-FD2-1 |
| PRJ-P6-FD2-2 | FD2 Phúc | Nút Google/Facebook, trang `/login/callback`, trang chính sách `/privacy-policy` | — | PRJ-P6-BD1-2, PRJ-P1-FD2-1 |

Tổng: 88 task (10 bài tập Buổi 2 + 78 task đồ án). P7 không có task code mới: đóng gói, báo cáo, bảo vệ theo [P7-OVERVIEW](../phases/P7-release-defense/P7-OVERVIEW.md).
