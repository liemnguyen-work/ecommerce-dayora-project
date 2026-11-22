# Hệ thiết kế DAYORA

Tài liệu hướng dẫn cho PRJ-P0-PD-1.5, thuộc task #25. Bản đề xuất để PD Đạt và FD1/FD2 kiểm tra; chưa có xác nhận FD1 Thành review hoặc nhóm phê duyệt.

## 1. Phạm vi và nguồn đối chiếu

Nguồn hiện trạng: [index.css](../apps/web/src/index.css), [main.tsx](../apps/web/src/main.tsx), [App.tsx](../apps/web/src/App.tsx). [Bản khung trong docs](../docs/DESIGN-SYSTEM.md) được giữ nguyên. Tài liệu này hướng dẫn giao diện React/Tailwind của `apps/web`, không tự áp dụng token Tailwind cho các bài HTML/CSS thuần ở `session2` hoặc `session3`.

- **Đã triển khai:** quan sát trực tiếp trong các file nguồn nêu trên; chưa đồng nghĩa đã kiểm thử trình duyệt.
- **Quy chuẩn đề xuất:** hướng dẫn cho các thành phần tiếp theo; cần review trước khi áp dụng rộng. Việc viết tài liệu không tự sửa code hoặc xác nhận nghiệm thu.

## 2. Năm màu chính và tương phản chữ

Các biến `--color-*` dưới đây đã được khai báo trong `@theme`. Tailwind dùng chúng để tạo utility như `bg-paper`, `text-ink`, `border-ink` khi class xuất hiện trong nguồn.

| Màu | Token Tailwind trong CSS | Utility tiêu biểu | HEX | Mục đích | Cặp chữ / nền được đánh giá | Tỷ lệ | WCAG AA chữ thường |
|---|---|---|---|---|---|---|---|
| Paper | `--color-paper` | `bg-paper`, `text-paper` | `#FFFDF7` | Nền chính; chữ trên nền tối phù hợp | Ink / Paper | 11,06:1 | Đạt |
| Ink | `--color-ink` | `text-ink`, `bg-ink`, `border-ink` | `#23412E` | Chữ chính, đường nét; nền tối | Paper / Ink | 11,06:1 | Đạt |
| Berry | `--color-berry` | `bg-berry`, `text-berry` | `#C8483C` | CTA và điểm nhấn hành động | Paper / Berry | 4,64:1 | Đạt |
| Butter | `--color-butter` | `bg-butter` | `#F2C14E` | Highlight, trang trí; không thay Berry cho CTA chính | Ink / Butter | 6,70:1 | Đạt |
| Leaf | `--color-leaf` | `bg-leaf` | `#DDE8C9` | Mảng nền phụ, gợi thiên nhiên | Ink / Leaf | 8,82:1 | Đạt |

Tỷ lệ thuộc **cặp chữ/nền cụ thể**, không phải chứng nhận một màu luôn đạt. Các cặp nền/chữ trong năm ô mẫu và CTA của App.tsx khớp bảng trên. Không suy ra mọi utility liệt kê đều đã được sử dụng.

Theo [W3C — Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), chữ thường cần ít nhất 4,5:1; chữ lớn cần 3:1. DAYORA đề xuất dùng ngưỡng 4,5:1 cho mọi chữ để dễ áp dụng. Không kết luận toàn bộ giao diện đạt WCAG chỉ từ bảng màu.

### Cách tính và giới hạn

Các tỷ lệ được tính từ HEX sRGB đặc, không opacity hoặc ảnh nền. Với từng kênh `s = giá trị 8-bit / 255`: nếu `s <= 0.04045` thì `c = s / 12.92`; ngược lại `c = ((s + 0.055) / 1.055)^2.4`. Độ chói `L = 0.2126R + 0.7152G + 0.0722B`; tỷ lệ `(L sáng + 0.05) / (L tối + 0.05)`. Đánh giá trên số chưa làm tròn; bảng hiển thị hai chữ số thập phân. Ví dụ Paper/Berry thực tế khoảng 4,6414:1, đạt ngưỡng 4,5:1 nhưng cần tính lại nếu thêm opacity/gradient.

## 3. Màu phụ

Các biến sau đã có trong `:root`, là biến CSS thường, chưa được đăng ký thành token `--color-*`. Không tự dùng `bg-surface` hay `text-ink-soft` như utility đã tồn tại; dùng `bg-[var(--surface)]`, `text-[var(--ink-soft)]` hoặc CSS `var(...)` khi triển khai.

| Biến | HEX | Cách dùng đề xuất | Chữ / nền kiểm tra | Tỷ lệ |
|---|---|---|---|---|
| `--surface` | `#F5F2E8` | Nền thẻ hoặc vùng phụ cần tách khỏi Paper | Ink / surface | 10,04:1 |
| `--ink-soft` | `#4A5F51` | Nội dung phụ, mô tả; vẫn phải đọc rõ | ink-soft / Paper | 6,78:1 |
| `--ink-deep` | `#17291D` | Tiêu đề/đường nét cần nhấn mạnh; nền tối khi dùng chữ Paper | ink-deep / Paper | 15,05:1 |
| `--berry-deep` | `#A93A30` | Nền hover của CTA Berry | Paper / berry-deep | 6,19:1 |

Các cặp ở bảng này đều đạt 4,5:1. Màu phụ đã khai báo nhưng App.tsx chưa dùng các biến đó trực tiếp. CTA hiện dùng `hover:bg-[#A93A30]`, trùng giá trị berry-deep; đề xuất chuyển sang `hover:bg-[var(--berry-deep)]` trong lần triển khai được giao để tránh lặp mã màu. Phiên soạn tài liệu này không sửa CTA.

## 4. Chữ

| Vai trò | Font | Độ đậm | Class đề xuất | Hiện trạng |
|---|---|---|---|---|
| Tiêu đề | Be Vietnam Pro | 800 | `font-display font-extrabold` | Tiêu đề trang `h1` dùng `text-3xl`; mẫu chữ lớn dùng `text-4xl` |
| Phụ đề | Be Vietnam Pro | 600 | `font-sans font-semibold` | Mẫu chữ `text-2xl font-semibold` |
| Nút | Be Vietnam Pro | 600 | `font-sans font-semibold` | CTA mẫu có `font-semibold`, kế thừa họ font từ body |
| Đoạn văn | Be Vietnam Pro | 400 | `font-sans font-normal` | Mẫu đoạn văn `text-base font-normal` |

`main.tsx` đã import `@fontsource/be-vietnam-pro/400.css`, `600.css`, `800.css` trước `index.css`. Hai token `--font-display`, `--font-sans` đều dùng `'Be Vietnam Pro', system-ui, sans-serif`. Body đã đặt 17px và line-height 1.6; utility `text-base` trên phần tử có thể thay cỡ chữ kế thừa.

Quy chuẩn đề xuất: dùng heading HTML đúng cấp, không chọn thẻ chỉ để có cỡ chữ; dùng 800/600/400 theo vai trò trên. Base style hiện chỉ đặt font/màu cho h1/h2 trong `@layer base`, chưa tự gán weight 800 cho mọi heading. FD phải khai báo weight ở component. Kiểm tra dấu tiếng Việt và font thực tế trong Firefox Fonts; chuỗi `font-family` ở Computed chưa đủ chứng minh mọi ký tự đã dùng font mong muốn.

## 5. Khoảng cách và bo góc

| Hạng mục | Giá trị | Trạng thái và cách áp dụng |
|---|---|---|
| Lề ngang khối lớn | `--gutter: clamp(24px, 5vw, 80px)` | Đã khai báo; đề xuất `padding-inline: var(--gutter)` hoặc `px-[var(--gutter)]` |
| Khoảng giữa section | `--section-gap: clamp(112px, 9vw, 152px)` | Đã khai báo; đề xuất `gap`/`margin-block` theo biến, tránh cộng hai khoảng trùng nhau |
| Bán kính mặc định | `--radius: 24px` | Đã khai báo; đề xuất thẻ sản phẩm dùng `border-radius: var(--radius)` |
| Nút dạng viên | `border-radius: 999px` | Quy chuẩn đề xuất giá trị cụ thể; CTA hiện dùng `rounded-full` tạo dạng viên, không khẳng định CSS tính ra đúng 999px |
| Thẻ sản phẩm | 20–24px | Quy chuẩn đề xuất: `rounded-[20px]` hoặc `rounded-[var(--radius)]`; App hiện có ô màu `rounded-3xl`, chưa có component thẻ sản phẩm |

Ở viewport 1366px: gutter khoảng 68,3px và section-gap khoảng 122,94px. Ở 390px: gutter 24px và section-gap 112px. Đây là kết quả tính biến, không phải số đo bố cục thực tế. Trang mẫu hiện dùng `px-4 sm:px-8`, `py-8`, `space-y-8`, `gap-4`, `p-6` và `max-w-4xl`; chưa áp dụng gutter/section-gap vào layout. FD1/FD2 cần chọn layout theo nội dung và review khoảng trống trên mobile, không ghi trang mẫu đã dùng các biến chỉ vì đã khai báo.

## 6. Nút và trạng thái tương tác

| Trạng thái | Quy chuẩn đề xuất | Hiện trạng CTA trong App.tsx |
|---|---|---|
| Thường | Berry, chữ Paper, weight 600, bo 999px, vùng bấm cao ít nhất 44px | `bg-berry text-paper font-semibold rounded-full min-h-11 px-8 py-4` |
| Hover | Đổi nền berry-deep, chữ Paper; giữ nhãn rõ | Đã có `hover:bg-[#A93A30]` và `transition-colors` |
| Focus bàn phím | Viền Ink 2px, offset 2px trên Paper; không xóa outline | Đã có `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink` |
| Disabled | Dùng `disabled` thật cho button, chặn hành động, giữ nhãn dễ đọc; kèm lý do gần nút khi cần | Chưa có trạng thái disabled trong CTA mẫu |

Đề xuất disabled dùng nền Leaf, chữ Ink (8,82:1), viền Ink và `cursor: not-allowed`; không chỉ giảm opacity rồi mặc định tương phản vẫn đạt. Dùng `<button>` cho thao tác, `<a>` cho điều hướng; không dùng link giả để mô phỏng disabled. Focus Ink/Paper có tương phản khoảng 11,06:1; khi nền đổi cần kiểm tra lại viền với vùng kề. Hover không được là cách duy nhất để lộ thông tin hoặc hành động. Đề xuất giảm/tắt chuyển động khi `prefers-reduced-motion`, chưa có quy tắc này trong CSS đang đối chiếu.

## 7. Điều cấm và thông báo lỗi

- Không dùng chữ vàng Butter trên Paper hoặc nền sáng: Butter/Paper chỉ 1,65:1, không đạt cả 3:1. Nếu dùng nền Butter, chọn chữ Ink.
- Không chỉ dùng màu sắc để thông báo lỗi. Thêm mô tả như “Vui lòng nhập email hợp lệ”, nhãn/icon có ý nghĩa và liên kết lỗi với ô nhập; khi triển khai form dùng `aria-invalid` và `aria-describedby` phù hợp. Đây là quy chuẩn đề xuất, form lỗi chưa có trong App mẫu.
- Không đổi Butter thành CTA chính; Berry dành cho CTA, Butter dành cho highlight/trang trí.
- Không bỏ focus, gộp chữ vào ảnh hoặc đặt chữ lên ảnh/gradient mà chưa đo tương phản.

Nguyên tắc lỗi có dấu hiệu ngoài màu dựa trên [W3C — Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html).

## 8. Thực hành cho FD1/FD2

1. FD1 đối chiếu component với token trong index.css; dùng utility token chính và biến CSS phụ đúng tên. Khi cần giá trị mới, đề xuất PD review thay vì thêm màu tùy ý.
2. FD2 khi dựng form và trạng thái tải/lỗi/disabled áp dụng bảng chữ và trạng thái nút; lỗi phải có nội dung giải thích. Phân công này là hướng dẫn thực hành, không khẳng định ai đã triển khai hoặc review.
3. Dùng token/class có sẵn, kiểm tra cascade trong DevTools. Không thêm utility cho biến phụ chưa đăng ký; dùng cú pháp arbitrary value chứa `var(...)` như mục 3.
4. Chạy build/lint theo workspace khi sửa ứng dụng; so sánh ảnh desktop/mobile, keyboard và font thực tế. Ghi kết quả, file, viewport, vấn đề còn tồn tại vào PR/issue khi được phép tạo.
5. Gửi PD/reviewer kiểm tra khác biệt giữa quy chuẩn đề xuất và hiện trạng; không đánh dấu nghiệm thu chỉ từ tài liệu này.

## 9. Checklist kiểm tra giao diện

Các ô dưới đây là việc cần thực hiện, chưa phải kết quả đã đạt.

| Kiểm tra | 1366px | 390px |
|---|---|---|
| Không tràn ngang, không cắt chữ hoặc CTA; tên dài xuống dòng | [ ] | [ ] |
| Màu đúng token, Butter trang trí và Berry CTA; đo đúng chữ/nền thực tế | [ ] | [ ] |
| Be Vietnam Pro hiển thị đủ dấu tiếng Việt ở 400/600/800 | [ ] | [ ] |
| Lề/section gap có chủ đích; không cộng khoảng cách dư | [ ] | [ ] |
| Thẻ 20–24px, nút viên, vùng bấm cao ≥44px theo đề xuất | [ ] | [ ] |
| Tab tới nút/link có focus rõ, kích hoạt bằng bàn phím phù hợp | [ ] | [ ] |
| Hover/focus/disabled dễ phân biệt; disabled không thực hiện hành động | [ ] | [ ] |
| Lỗi có lời giải thích ngoài màu; nhãn liên kết đúng ô nhập | [ ] | [ ] |
| Sở thích dark mode không tự làm lệch màu DAYORA; kiểm tra reduced motion nếu có chuyển động | [ ] | [ ] |

Ghi chiều rộng **viewport** và chiều cao thực tế cùng ảnh; thử zoom 200%, nội dung dài và thao tác cảm ứng ở mobile. Các kết quả trình duyệt trước đây trong AI log không tự xác nhận các checklist này đã hoàn tất. Tài nguyên ảnh/font phải ghi nguồn trong [SOURCE-INVENTORY](../docs/SOURCE-INVENTORY.md).
