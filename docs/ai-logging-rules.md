# Quy tắc ghi nhật ký sử dụng AI cho DAYORA

## 1. Mục tiêu và tổ chức

AI_USAGE_LOG.md là trang tổng hợp chung. Log chi tiết được ghi riêng trong docs/ai-logs/ để hạn chế nhiều người sửa cùng tệp. Mỗi thành viên vẫn chia theo phase và phiên, từ brainstorm đến phát triển, kiểm thử, triển khai khi thực sự phát sinh.

Các tệp: liem.md (Liêm), dat.md (Đạt), thanh.md (Thành), phuc.md (Phúc), hoan.md (Hoàn), chau.md (Châu), ngoc.md (Ngọc), kiet.md (Kiệt).

Không tạo hoạt động mẫu dưới tên thành viên như thể đã diễn ra. Tệp chưa có hoạt động chỉ có phần giới thiệu. Các bảng phân công không phải bằng chứng người đó đã dùng AI.

## 2. Ai ghi và khi nào ghi

Codex đang làm trực tiếp trong bản repository của một thành viên phải chủ động ghi mục log sau mỗi công việc đáng kể, trước khi bàn giao kết quả, không cần người dùng lặp lại yêu cầu.

Xác nhận tên người prompt một lần trong phiên; nếu thay đổi người dùng hoặc danh tính không rõ thì hỏi lại. Không lấy Git author làm căn cứ duy nhất, không ghi tên tài khoản hay model chưa xác minh.

Các hoạt động được ghi gồm brainstorm, phân tích, phản biện, soạn tài liệu, thiết kế, viết mã, debug, kiểm thử và triển khai thực tế. Gộp các tin nhắn của cùng một đầu việc thành bản tóm tắt, không ghi từng phím bấm.

Nếu đang tiếp tục phiên cũ, dùng lại mã phiên đã ghi. Một phiên nhật ký là một phiên làm việc được nhóm nhận diện, không mặc định trùng với session ID nội bộ của công cụ. Nếu không xác định được phiên trước, tạo mã mới và dẫn mục liên quan; không đoán.

## 3. Thời gian, phase và định danh

* Thời gian ghi: lấy đồng hồ thực tế, theo ISO 8601 có UTC+07:00, ví dụ YYYY-MM-DDTHH:MM:SS+07:00. Không điền thời gian từ ví dụ này.
* Thời gian thực hiện: chỉ ghi bắt đầu, kết thúc khi có căn cứ. Tổng hợp muộn phải ghi là hồi cứu; nếu không biết mốc cũ thì ghi chưa xác minh.
* Mã phiên: tên thành viên không dấu + ngày bắt đầu + hậu tố ngẫu nhiên. Không chứa thông tin bí mật.
* Mã mục: riêng và duy nhất, gồm mã phiên và số thứ tự hoặc hậu tố riêng.
* Phase: ghi tên giai đoạn thực tế. Chưa chuyển sang phát triển hoặc triển khai thì không điền kết quả phase đó.
* Loại mục: Hoạt động, Phản biện, Kiểm tra, Quyết định hoặc Đính chính. Mục bổ sung dẫn mã mục liên quan.

## 4. Nội dung mỗi mục

Bắt buộc có đủ 7 trường theo mẫu môn học:

1. Công cụ: tên thực tế; model chỉ ghi khi được xác minh.
2. Mục đích: người dùng cần giải quyết việc gì và hướng thực hiện.
3. Prompt: yêu cầu chính thực tế hoặc bản tóm lược ghi rõ là tóm lược. Không tự bịa câu lệnh nguyên văn.
4. Kết quả đề xuất: AI đưa ra gì, đã tạo hoặc sửa gì, phần nào được giữ; phân biệt đề xuất và thực hiện.
5. Phản biện: ai kiểm tra hoặc phản biện, điểm sửa/bỏ và lý do. Chưa có thì ghi chưa có, không tạo phản hồi giả.
6. Quyết định của nhóm: ghi đúng phạm vi đã được xác nhận, ai xác nhận và minh chứng nếu có. Liêm duyệt công việc cá nhân không mặc nhiên là toàn nhóm duyệt mọi chính sách.
7. Người kiểm tra: người thực tế đã kiểm tra và kết quả; nếu mới chỉ chỉ định người dự kiến thì ghi rõ chưa kiểm tra.

Bổ sung cách kiểm tra, kết quả mong đợi/thực tế nếu đã kiểm thử, lỗi/giới hạn còn lại, tệp và Issue/commit đã tồn tại. Có thể ghi Không áp dụng khi thực sự không liên quan; không thay bằng kết quả giả.

Một câu hướng dẫn đã gửi không chứng minh người dùng đã thực hiện. Chỉ xác nhận thao tác khi có quan sát hoặc phản hồi người dùng và nêu nguồn xác nhận.

## 5. Chỉ nối thêm, không sửa lịch sử

Sau khi ghi một mục, không sửa, xóa, đánh số lại hoặc chuyển vị trí mục đó. Không đổi nội dung prompt và kết quả cũ cho khớp phương án mới. Không cập nhật ngược trạng thái Chờ kiểm tra thành Đã duyệt.

Nếu có sai sót, nối mục Đính chính với mã mục cũ, phần sai, thông tin đúng, lý do và nguồn. Nếu có kết quả test, phản hồi hoặc quyết định mới, nối mục tương ứng. Quyết định sau phải nêu rõ thay thế quyết định nào; lịch sử trước vẫn giữ.

Trước mỗi lần nối, đọc bản mới nhất và kiểm tra nội dung cũ còn nguyên. Khi giải quyết xung đột Git, giữ cả các mục hợp lệ, không bỏ mất phần của người khác. Không force push để xóa log.

Ngoại lệ: nếu vô tình ghi bí mật hoặc dữ liệu không được phép công khai, không sao chép giá trị đó vào mục đính chính. Báo người phụ trách, thu hồi khóa nếu cần và thực hiện xử lý theo chỉ dẫn rõ ràng, thay vì giữ dữ liệu nhạy cảm công khai vì quy tắc bất biến. Chỉ ghi thông báo sự cố đã làm sạch và hành động xử lý.

Đây là quy tắc làm việc được kiểm tra qua Git, không phải cơ chế khóa kỹ thuật tuyệt đối hoặc bằng chứng chống sửa giả mạo. Chưa cấu hình CI hay branch protection để cưỡng chế.

## 6. Nhiều thành viên và nguồn bên ngoài

Mỗi người chỉ ghi hoạt động của mình trong tệp được phân. Một người tổng hợp hộ phải nêu rõ người thực hiện, người cung cấp và nguồn, không tự nhận đóng góp.

ChatGPT/Gemini hoặc công cụ khác không được Codex tự giám sát. Thành viên cung cấp prompt/kết quả hoặc link được phép chia sẻ; Codex mới ghi bản tổng hợp trung thực.

Các hoạt động ChatGPT phân tích và Gemini phản biện đã có trong lịch sử dự án cần được ghi hồi cứu khi xác nhận được người thực hiện. Minh chứng Gemini: https://share.gemini.google/2hKwXgfvRPRZ . Không gán người thực hiện theo phỏng đoán. Mẫu ghi này không được dùng để né việc ghi quá trình phân tích, phản biện và quyết định nhóm.

Quyết định chung được ghi một lần tại người ghi nhận, dẫn sang log liên quan nếu cần. Các thành viên không được tự ghi "Nhóm thống nhất" khi chưa có căn cứ.

## 7. Kiểm tra và đồng bộ

Thành viên kiểm tra diff, log, nguồn minh chứng và phần bí mật trước commit/push. Sau đó cập nhật kho theo quy trình Git của nhóm. Đừng ghi commit hash của commit chưa được tạo.

Codex báo tệp log và mã mục mới trong kết quả bàn giao. Nếu thiếu quyền ghi, log chưa được cập nhật; phải báo rõ và đưa nội dung chờ ghi. Không tuyên bố tự động cập nhật thành công trong trường hợp này.

## 8. Mẫu và cách sử dụng

Dùng [TEMPLATE.md](ai-logs/TEMPLATE.md). Chỉ thay dữ liệu của mẫu khi tạo mục mới; không sửa các mục đã ghi.

Khi bắt đầu, thành viên có thể nói: "Mình là [tên], làm [Issue/công việc]. Đọc AGENTS.md và quy tắc log, thực hiện trong phạm vi đã giao và ghi hoạt động thực tế vào log của mình."

Quy tắc dùng trong các phiên sau khi Codex mở đúng repo và nạp AGENTS.md. Chỉ tạo tệp rule không phải là bật một dịch vụ giám sát nền.
