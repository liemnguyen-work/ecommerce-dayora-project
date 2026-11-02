---
tags: [team, learning]
---
# Lộ trình học DAYORA

Nhóm tự xây DAYORA từ đầu trong repo này, theo lịch P0 → P7 ở [PHASES](../../phases/PHASES.md). Mục tiêu của mỗi người:
1. **Tự xây phần mình phụ trách** theo [ROADMAP](../ROADMAP.md) (task `PRJ-P<phase>-<VAI>-<số>`). Mỗi task có tiêu chí xong và cách kiểm chứng (test nhóm tự viết hoặc ca kiểm thử tay). Lịch sử git là bằng chứng mỗi người tự làm.
2. **Hiểu phần code đó** đủ để tự giải thích và tự sửa khi GV yêu cầu.
3. **Ghi nhật ký AI thật** trong log cá nhân, có bằng chứng kiểm chứng.

**Bài tập trên lớp làm trước.** Phase nào có bài tập ([ASSIGNMENTS](../ASSIGNMENTS.md)) thì làm xong bài tập (task `HW-*`) rồi mới nhận task đồ án của phase đó.

Thứ tự trong mỗi phase: bài tập trên lớp (nếu có) → học khái niệm → viết test/ca kiểm thử → **tự xây task PRJ** (mục 6) → luyện bảo vệ, ghi log → bài tập mở rộng nếu còn thời gian. Chi tiết ở đầu mỗi file phase.

## Thư mục học của từng người
Mỗi người một thư mục. Chỉ cần đọc thư mục của mình, cộng file này và [PITFALLS](PITFALLS.md).

| Vai | Thành viên | Bắt đầu từ                                | Review PR bởi |
| --- | ---------- | ----------------------------------------- | ------------- |
| PM  | Liêm       | [LP-PM-Liem](PM-Liem/LP-PM-Liem.md)       | QA Ngọc       |
| PD  | Đạt        | [LP-PD-Dat](PD-Dat/LP-PD-Dat.md)          | FD1 Thành     |
| FD1 | Thành      | [LP-FD1-Thanh](FD1-Thanh/LP-FD1-Thanh.md) | PD Đạt        |
| FD2 | Phúc       | [LP-FD2-Phuc](FD2-Phuc/LP-FD2-Phuc.md)    | FD1 Thành     |
| BD1 | Hoàn       | [LP-BD1-Hoan](BD1-Hoan/LP-BD1-Hoan.md)    | BD2 Châu      |
| BD2 | Châu       | [LP-BD2-Chau](BD2-Chau/LP-BD2-Chau.md)    | BD1 Hoàn      |
| QA  | Ngọc       | [LP-QA-Ngoc](QA-Ngoc/LP-QA-Ngoc.md)       | PM Liêm       |
| DO  | Kiệt       | [LP-DO-Kiet](DO-Kiet/LP-DO-Kiet.md)       | BD2 Châu      |

Cấu trúc thư mục:
```
docs/
├─ ROADMAP.md              ← bảng task theo phase (bài tập + đồ án), quy trình một task, theo dõi tiến độ
├─ ASSIGNMENTS.md              ← sổ bài tập trên lớp: buổi, phase, hạn nộp, hướng dẫn
└─ learning/
   ├─ LEARNING-PATH.md     ← file này: cách học chung, quy trình commit, nhật ký AI
   ├─ PITFALLS.md    ← lỗi hay gặp: dấu hiệu, nguyên nhân, cách tránh, cách kiểm
   └─ <VAI>-<Tên>/
      ├─ LP-<VAI>-<Tên>.md        ← tổng quan: code bạn sở hữu, task PRJ của bạn (gồm P0), bảng tiến độ
      └─ LP-<VAI>-<Tên>-P1..P6.md ← mỗi phase: kiến thức, tiêu chí, lỗi hay gặp, prompt, task PRJ, bài tập mở rộng
```

Hướng dẫn trong `phases/P<số>-*/<VAI>-<Tên>/` dùng song song: ở đó có việc của bạn trong phase, prompt khởi động phiên (mục 4.1) và minh chứng cần có.

## Thứ tự học
1. **Buổi 0 (ai cũng làm):**
   - Đọc `README.md`, `REQUIREMENTS.md`, `PROJECT_PLAN.md`.
   - Đọc [PITFALLS](PITFALLS.md) phần mục lục và 3 mục có ghi vai của bạn.
2. **P0 (28/10–03/11):** Bài tập Buổi 2 trước (hạn 04/11, [hướng dẫn](../SESSION2-GUIDE.md)), sau đó việc P0 trong `LP-<VAI>-<Tên>.md` (DO dựng bộ khung + CI, BD2 schema, PD token, QA quy trình gác cổng, PM bảng việc).
3. **P1 → P6 theo lịch phase.** Mỗi phase: xem mục "0. Bài tập trên lớp" trong `P<n>-OVERVIEW.md` trước, rồi mở `LP-<VAI>-<Tên>-P<số>.md` và làm theo "Thứ tự làm" ở đầu file:
   1. Khái niệm (mục 2, bước 1).
   2. Viết test hoặc ca kiểm thử, rồi tự xây task PRJ (mục 6, bước 5).
   3. Đọc lại code của chính mình, giải thích được từng file (mục 1, bước 2).
   4. Tiêu chí, lỗi hay gặp, dự đoán–thử, luyện bảo vệ (mục 3–4, bước 3, 4, 6).
   5. Nhật ký AI và bằng chứng (bước 7, mục 7).
4. **P6:** kiểm thử tổng + Innovation (nếu nhóm chốt). BD1, FD1, QA, DO có file `LP-<VAI>-<Tên>-P6.md`; các vai khác dùng [USABILITY](../testing/USABILITY.md) và [RELEASE-CHECKLIST](../RELEASE-CHECKLIST.md).
5. **P7:** báo cáo, bảo vệ. Dùng [REPORT-OUTLINE](../REPORT-OUTLINE.md), [DEMO-SCRIPT](../DEMO-SCRIPT.md), và câu hỏi GV ở các phase trước để ôn.

## Lộ trình prompt 7 bước (dùng chung, chi tiết trong từng file phase)
Mỗi bước là một phiên AI riêng và một mục nhật ký riêng.

| Bước                 | Mục đích                                    | Bạn tự làm gì                                   | Chống "học giả"                          |
| -------------------- | ------------------------------------------- | ----------------------------------------------- | ---------------------------------------- |
| 1. Khái niệm         | Hiểu ý tưởng trước khi code                 | Trả lời câu hỏi kiểm tra của AI                 | Đóng AI, tự viết lại mỗi khái niệm 1 câu |
| 2. Đọc code          | Hiểu file mình (hoặc bạn cùng nhóm) đã viết | Tìm đúng dòng AI chỉ trong VS Code              | Ghi lại khi AI chỉ sai dòng hoặc bịa hàm |
| 3. Dự đoán rồi thử   | Kiểm hiểu biết bằng thực tế                 | Viết dự đoán **trước**, rồi chạy                | Ghi cả dự đoán sai                       |
| 4. Lỗi hay gặp       | Học tư duy gỡ lỗi                           | Tự suy luận nguyên nhân trước khi xem lời giải  | Ghi chỗ suy luận khác lời giải           |
| 5. Tự xây (task PRJ) | Tạo đóng góp thật trong repo nhóm           | **Tự gõ code**; AI chỉ hướng dẫn và review diff | Diff, test, PR là bằng chứng             |
| 6. Luyện bảo vệ      | Trả lời GV không xem code                   | Trả lời trong 30 giây                           | Ghi điểm và chỗ cần học lại              |
| 7. Nhật ký AI        | Ghi chân thực                               | Tự viết Phản biện, Quyết định, Người kiểm tra   | AI chỉ soạn phần có trong hội thoại      |

Vì sao làm theo thứ tự này:
- Bước 1–2 cho bạn **ngôn ngữ** để nói về code.
- Bước 3–4 cho bạn **trải nghiệm** sai rồi sửa: đây là thứ GV nhìn ra ngay khi hỏi vặn.
- Bước 5 cho bạn **commit thật**.
- Bước 6 kiểm tra bạn có thật sự hiểu không.

## Quy trình commit của mỗi người
Ai cũng phải có commit thật, đứng tên mình, trong phần mình sở hữu ([PROJECT](../../PROJECT.md) mục Ghi công).
- **Task bài tập / XL:** nhánh theo mã task, ví dụ `hw/b2-fd1-1`, `prj/p1-bd1-1`. Quy trình đầy đủ ở [ROADMAP](../ROADMAP.md).
- **Bài tập mở rộng:** nhánh `study/<vai>-p<số>`, theo các bước dưới.

1. **Chuẩn bị một lần:**
   - Liêm mời bạn làm collaborator: GitHub → Settings → Collaborators.
   - Bạn chạy trên máy mình:
     ```bash
     git config user.name "<tên GitHub>"
     git config user.email "<email GitHub>"
     ```
2. **Mỗi việc:**
   ```bash
   git checkout main && git pull
   git checkout -b study/<vai>-p<số>          # ví dụ study/bd1-p1
   # sửa code, chạy lệnh kiểm tra
   git add <đúng file của việc này>
   git commit -m "<loại>(<phạm vi>): <việc đã làm>"   # ví dụ: test(pricing): thêm ca biên 499.999đ
   git push -u origin study/<vai>-p<số>
   ```
3. **Mở Pull Request:**
   - Mô tả: việc đã làm, lệnh đã chạy kèm kết quả, link mục nhật ký AI.
   - Gán reviewer theo bảng ở đầu file.
4. **Review:**
   - Reviewer chạy lại lệnh kiểm tra và để lại ít nhất 1 nhận xét có nội dung.
   - Đạt thì merge theo kiểu nhóm đã thống nhất (Squash hoặc Rebase).
5. **Sau khi merge:** issue tự đóng nếu PR ghi `Closes #<số>`. PM chạy `npm run roadmap:report -- --repo <owner>/<repo>` để cập nhật [PROGRESS](../PROGRESS.md).

Quy tắc:
- Một việc = một nhánh = một PR.
- Chỉ sửa file của việc đó. Cần sửa file khác thì hỏi owner file đó trước.
- Không commit `.env` hay dữ liệu thật. Không `push --force` lên `main`.
- Hai người cùng sửa một file: làm lần lượt, người sau `git pull` trước khi bắt đầu.
- Loại commit hay dùng: `feat` (tính năng), `fix` (sửa lỗi), `test`, `docs`, `refactor` (đổi cấu trúc, không đổi hành vi), `chore` (cấu hình).

## Nhật ký AI chân thực
Quy định đầy đủ: [quy tắc ghi log](../ai-logs/ai-logging-rules.md). Mẫu: [mẫu log](../ai-logs/TEMPLATE.md). Mỗi người ghi trong `docs/ai-logs/<tên>.md`, **chỉ nối thêm** ở cuối, có mã phiên, mã mục và đủ 7 trường (Công cụ, Mục đích, Prompt, Kết quả đề xuất, Phản biện, Quyết định của nhóm, Người kiểm tra).

**Một mục log có giá trị khi có đủ:**
- **Prompt nguyên văn** (copy, không viết lại cho đẹp).
- **Kiểm tra và minh chứng:** lệnh đã chạy và kết quả, test nào pass, ảnh chụp có ngày giờ, hoặc so với tài liệu chính thức.
- **Phản biện:** chỗ AI sai, chỗ bạn không làm theo. Mỗi phase ít nhất một lần ghi được "AI sai ở…". Nếu AI chưa sai lần nào, có thể bạn chưa kiểm đủ kỹ.
- **Bằng chứng:** link commit/PR, file test, ảnh.

**Không được:**
- Để AI bịa phần kiểm tra.
- Chép log của người khác.
- Ghi việc mình không làm.
- Sửa hay xóa mục cũ (sai thì thêm mục đính chính, dẫn mã mục cũ).
- Dán khóa bí mật vào AI hoặc vào log.

**Bằng chứng tốt và chưa tốt:**

| Chưa tốt | Tốt |
|---|---|
| "AI giải thích, tôi đã hiểu" | "Tôi chạy `npm test -w api -- pricing`: 12 pass. Đổi `500_000` thành `400_000` thì test X đỏ, đúng như tôi dự đoán" |
| "Code chạy được" | "Ảnh `docs/report/images/p2-checkout.png` lúc 14:05 ngày 12/11, tổng 306.200đ khớp tính tay" |
| "AI viết test giúp tôi" | "AI gợi ý ca 499.999đ. Tôi tự viết test, AI nhắc thiếu `zone`. Commit `abc123`" |

`docs/ai-logs/AI_USAGE_LOG.md` là trang tổng hợp, dẫn tới log từng người.

## Học từ lỗi hay gặp
[PITFALLS](PITFALLS.md) ghi các lỗi hay gặp khi làm web bán hàng như DAYORA. Mỗi mục: dấu hiệu → nguyên nhân → cách tránh → cách kiểm.

Cách học hiệu quả:
1. Đọc **Dấu hiệu**, dừng lại, tự đoán nguyên nhân và cách sửa.
2. Đọc tiếp, so với suy luận của mình.
3. Ghi chỗ đoán sai vào nhật ký (bước 4 của lộ trình prompt).

Sáu nguyên tắc nên thuộc:
1. **Hỏi "đẹp / đúng cho mục tiêu nào"** trước khi khen hay chê (A1).
2. **Dữ liệu mâu thuẫn thì hỏi người có quyền quyết**, ghi lại, trong lúc chờ làm việc khác (B1).
3. **Server là người quyết, web chỉ hiển thị.** Không tin số liệu từ trình duyệt (C2).
4. **Mọi thứ từ bên ngoài có thể đến lặp, trễ, sai.** Thiết kế để xử lý nhiều lần vẫn ra cùng kết quả (C4).
5. **Bằng chứng là kết quả quan sát được**, không phải lời báo của công cụ hay AI (E3, E4).
6. **Commit sớm, commit nhỏ.** Commit là điểm lưu để quay lại (E1).
