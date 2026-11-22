# Dùng AI để làm bài trong repo DAYORA

Repo đã có sẵn quy tắc cho AI. Khi mở đúng thư mục repo, công cụ tự đọc:

| File | Ai đọc | Nội dung |
|---|---|---|
| `AGENTS.md` | Codex, Claude Code (qua `CLAUDE.md`) | Quy tắc chung, bảo mật, ghi nhật ký AI |
| `session2/AGENTS.md` | như trên, khi làm trong `session2/` | Phạm vi Buổi 2: chỉ HTML5/CSS3 |
| `docs/SESSION2-GUIDE.md` | bạn và AI | Phân công, thứ tự, checklist từng bước |
| `docs/ai-logs/ai-logging-rules.md` | AI | Cách nối mục vào `docs/ai-logs/<tên>.md` |
| `.claude/skills/*/SKILL.md` | Claude Code tự nạp; Codex đọc khi `session2/AGENTS.md` trỏ tới | Thiết kế giao diện, responsive, hover/focus, review PR |
| `tools/check-session2.py` | bạn, AI, GitHub Actions | Kiểm tự động bài Buổi 2; PR có `[LOI]` thì check đỏ |

## 1. Cài (chọn một)

| Công cụ | Cài | Mở phiên |
|---|---|---|
| Claude Code | https://claude.com/claude-code (CLI hoặc extension VS Code) | Mở terminal **trong thư mục repo**, gõ `claude` |
| Codex | https://developers.openai.com/codex (CLI hoặc extension VS Code) | Mở terminal **trong thư mục repo**, gõ `codex` |
| ChatGPT, Gemini (web) | — | Không tự đọc repo: dán phần cần thiết của `session2/AGENTS.md` vào đầu cuộc chat; tự ghi log bằng tay theo `docs/ai-logs/TEMPLATE.md` |

Mở sai thư mục (ví dụ Desktop) thì AI không thấy quy tắc. Kiểm: hỏi "Phạm vi Buổi 2 là gì?", AI phải trả lời "chỉ HTML5/CSS3, không JavaScript".

## 2. Vòng làm việc một bước

1. **Lấy code mới, tạo nhánh**
   ```bash
   git checkout main && git pull
   git checkout -b b2/<ten-viec>
   ```
2. **Mở phiên**
   - Claude Code: `/start Phúc Bước 5`
   - Codex, web: `Mình là Phúc, làm Bước 5 trong docs/SESSION2-GUIDE.md. Đọc AGENTS.md và session2/AGENTS.md, cho mình biết checklist, file mình được sửa, mình phải chờ ai. Chưa viết code.`
3. **Hỏi để hiểu, tự gõ code.** Mẫu câu hỏi tốt:
   - "Giải thích `grid-template-columns: repeat(auto-fill, minmax(220px, 1fr))` bằng ví dụ, đừng viết code cho trang của mình."
   - "Đây là CSS của mình [dán]. Thẻ sản phẩm cao không đều, chỉ ra nguyên nhân và gợi ý thuộc tính, mình tự sửa."
   - Dùng prompt có sẵn của đề trong guide (đã điền thông tin DAYORA ở Bước 1, 3).
4. **Kiểm trên trình duyệt** ở 1366, 768, 390 px (DevTools → Ctrl+Shift+M). AI nói "đã sửa" chưa đủ; bạn phải nhìn thấy.
5. **Kiểm toàn bài**: `python tools/check-session2.py session2` (cần Python 3: https://www.python.org/downloads/, khi cài tick "Add python.exe to PATH"). Hoặc Claude Code `/check-s2`. Không cài được Python thì mở PR, GitHub tự chạy và báo trong tab Checks.
6. **Ghi nhật ký AI**: Claude Code `/log Phúc`; Codex tự ghi theo `AGENTS.md`. Đọc lại mục log, sửa chỗ AI ghi sai trước khi commit.
7. **Commit, PR**
   ```bash
   git add session2/products.html session2/css/style.css docs/ai-logs/phuc.md
   git commit -m "feat(products): them luoi 8 san pham"
   git push -u origin b2/<ten-viec>
   ```
   Mở PR trên GitHub, điền mẫu có sẵn, gắn reviewer theo guide.

## 3. Luật dùng AI để còn học được

- AI giải thích và gợi ý; **bạn gõ code**. Đoạn nào AI viết mà bạn giữ lại thì phải giải thích được từng thuộc tính (giảng viên gọi bất kỳ ai).
- Không nhờ AI trả lời 6 câu hỏi kiến thức Bước 10.
- Không dán mật khẩu, token, file `.env` vào AI.
- Đề xuất nào của AI bạn bỏ hoặc sửa thì ghi lại lý do: đó chính là nội dung "Báo cáo sử dụng AI" (cần ít nhất 2 ví dụ).

## 4. Lỗi hay gặp

| Hiện tượng                             | Cách xử lý                                                                                             |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| AI đề xuất React, Tailwind, JavaScript | Nhắc "Đọc session2/AGENTS.md, chỉ HTML/CSS". Nếu vẫn lặp lại thì kiểm xem đã mở đúng thư mục repo chưa |
| Check `check-session2` đỏ              | Mở tab Checks → Details, đọc dòng `[LOI]`, sửa đúng chỗ đó rồi push lại nhánh                          |
| AI sửa file của người khác             | Từ chối, `git restore <file>`; chỉ sửa file và khu CSS của mình                                        |
| `git push` bị từ chối                  | Chưa được mời làm collaborator, hoặc đang push thẳng `main`; push nhánh `b2/...` rồi mở PR             |
| Xung đột ở `style.css`                 | Mỗi người chỉ sửa khu của mình; khi xung đột giữ cả hai khu, hỏi người sở hữu khu kia                  |
