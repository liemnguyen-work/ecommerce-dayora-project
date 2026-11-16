# Kiểm tra kiến thức PRJ-P1-QA-1

- [x] **Bước 1 — Liệt kê ca kiểm thử P1**

  Mình liệt kê ca trước để lúc test biết cần làm gì và nhìn vào đâu để chốt Pass hay Fail. Nếu bỏ bước này thì web vẫn chạy, nhưng mình dễ bị sót mấy trường hợp như đăng ký trùng email, tài khoản bị khóa hoặc mở link sản phẩm bị sai.

- [x] **Bước 2 — Chạy từng ca trên bản nhóm, ghi Actual và ngày chạy**

  Mình ghi Actual để lưu lại web thật sự phản hồi ra sao, còn ngày chạy giúp nhóm biết đó là kết quả của lần test nào. Nếu bỏ bước này thì lúc có bản fix, nhóm khó đối chiếu lỗi cũ với kết quả test lại để chốt ca.

- [x] **Bước 3 — Chạy toàn bộ test API và đối chiếu với CI**

  Mình chạy `npm test -w api` để xem bộ test API có ca nào bị lỗi không, rồi so với CI trên cùng bản code. Lần này máy mình với CI đều đạt 7/7 file và 51/51 ca. Nếu bỏ bước này thì nhóm thiếu kết quả để đối chiếu hai lần chạy.

- [x] **Chỗ khó nhất — Phân biệt lỗi lọc với thiếu dữ liệu ở ca 12 và 16**

  Lúc đầu mình lọc theo chuyến đi thì danh sách trống, nên chưa rõ do bộ lọc hay do dữ liệu. Tớ để hai ca ở Blocked vì sản phẩm chưa được gắn tình huống. Sau khi Châu cập nhật dữ liệu, tớ test lại từng chuyến đi rồi thử kết hợp Hẹn hò, nhóm Hộp đựng thực phẩm và giá 80.000–110.000 ₫. Kết quả còn đúng hai sản phẩm trong khoảng giá.
  