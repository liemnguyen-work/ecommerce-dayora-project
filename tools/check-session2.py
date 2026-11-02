"""Kiểm bài tập nhóm Buổi 2 (HTML5 & CSS3) theo docs/SESSION2-GUIDE.md.

Chạy:  python tools/check-session2.py            (kiểm thư mục session2/)
       python tools/check-session2.py <thư-mục>
Mã thoát 1 khi có lỗi [LOI]; [CANH BAO] không chặn merge (thường là phần nộp bài chưa có).
Chỉ dùng thư viện chuẩn của Python, không cần cài gì.
"""
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

PAGES = ['index.html', 'products.html', 'product-detail.html', 'about.html']
errors, warnings = [], []


def err(msg):
    errors.append(msg)


def warn(msg):
    warnings.append(msg)


class Page(HTMLParser):
    """Gom thẻ, thuộc tính và khối <header>/<footer> của một trang."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.tags = []          # (tag, attrs dict)
        self.text = []
        self.blocks = {'header': [], 'footer': []}
        self.depth = {'header': 0, 'footer': 0}
        self.stack = []         # class của các thẻ đang mở, để biết text/thẻ nằm trong thẻ sản phẩm nào
        self.nav_depth = 0
        self.nav_links = set()  # href của các link nằm trong <nav>

    def handle_starttag(self, tag, attrs):
        a = {k: (v or '') for k, v in attrs}
        if tag == 'nav':
            self.nav_depth += 1
        if tag == 'a' and self.nav_depth:
            self.nav_links.add(a.get('href', '').split('#')[0])
        self.tags.append((tag, a, [c for cls in self.stack for c in cls]))
        for name in self.blocks:
            if tag == name:
                self.depth[name] += 1
            if self.depth[name]:
                # Bỏ aria-current: mỗi trang đánh dấu link của chính nó, phần còn lại phải giống nhau.
                kept = sorted((k, v) for k, v in a.items() if k != 'aria-current')
                self.blocks[name].append(f'<{tag} {kept}>')
        if tag not in ('img', 'meta', 'link', 'br', 'hr', 'input', 'source'):
            self.stack.append(a.get('class', '').split())

    def handle_endtag(self, tag):
        if tag == 'nav' and self.nav_depth:
            self.nav_depth -= 1
        for name in self.blocks:
            if self.depth[name]:
                self.blocks[name].append(f'</{tag}>')
            if tag == name and self.depth[name]:
                self.depth[name] -= 1
        if tag not in ('img', 'meta', 'link', 'br', 'hr', 'input', 'source') and self.stack:
            self.stack.pop()

    def handle_data(self, data):
        self.text.append((data, [c for cls in self.stack for c in cls]))
        for name in self.blocks:
            if self.depth[name] and data.strip():
                self.blocks[name].append(' '.join(data.split()))

    def handle_decl(self, decl):
        self.doctype = decl


def parse(path):
    p = Page()
    p.doctype = ''
    p.raw = path.read_text(encoding='utf-8')
    p.feed(p.raw)
    return p


def find(p, tag, **attrs):
    return [a for t, a, _ in p.tags if t == tag and all(v in a.get(k, '').split() or a.get(k) == v for k, v in attrs.items())]


def text_in(p, cls):
    return ' '.join(d for d, classes in p.text if cls in classes)


def check_links(root, name, p):
    for tag, a, _ in p.tags:
        for attr in ('href', 'src'):
            url = a.get(attr, '').strip()
            if not url or tag == 'a' and url.startswith('#'):
                continue
            if re.match(r'(?i)^(https?:|mailto:|tel:|data:)', url):
                continue
            if re.match(r'(?i)^(file:|[a-z]:[\\/]|/)', url):
                err(f'{name}: đường dẫn tuyệt đối "{url}" (dùng đường dẫn tương đối như images/product-1.jpg)')
                continue
            target = (root / url.split('#')[0].split('?')[0])
            if not target.exists():
                err(f'{name}: {tag} {attr}="{url}" trỏ tới file không có')
                continue
            # Windows không phân biệt hoa/thường nên exists() vẫn đúng; so với tên thật trong thư mục.
            real = {f.name for f in target.parent.iterdir()}
            if target.name not in real:
                actual = next((f for f in real if f.lower() == target.name.lower()), '?')
                err(f'{name}: "{url}" sai chữ hoa/thường so với file thật "{actual}" (GitHub và máy Mac/Linux phân biệt hoa thường)')
        if tag == 'img' and not a.get('alt', '').strip():
            err(f'{name}: ảnh "{a.get("src", "?")}" thiếu alt')


def check_page_basics(name, p):
    if 'doctype html' not in p.doctype.lower():
        err(f'{name}: thiếu <!DOCTYPE html> ở dòng đầu')
    if not any(a.get('lang') for a in find(p, 'html')):
        err(f'{name}: <html> thiếu lang="vi"')
    if not any('charset' in a for a in find(p, 'meta')):
        err(f'{name}: thiếu <meta charset="UTF-8">')
    if not any(a.get('name') == 'viewport' for a in find(p, 'meta')):
        err(f'{name}: thiếu <meta name="viewport" ...> (không có thì điện thoại hiển thị như máy tính thu nhỏ)')
    if not any(a.get('href', '').endswith('css/style.css') for a in find(p, 'link')):
        err(f'{name}: chưa nối css/style.css')
    if not re.search(r'<title>\s*[^<\s]', p.raw, re.I):
        err(f'{name}: thiếu <title> có nội dung')
    for tag in ('header', 'nav', 'main', 'footer'):
        if not find(p, tag):
            err(f'{name}: thiếu thẻ <{tag}> (HTML semantic)')
    # Phạm vi Buổi 2: không JavaScript, không framework.
    if find(p, 'script'):
        err(f'{name}: có <script> — Buổi 2 không dùng JavaScript')
    for tag, a, _ in p.tags:
        for k in a:
            if k.startswith('on'):
                err(f'{name}: thuộc tính {k}="..." trên <{tag}> là JavaScript — bỏ đi')
    if re.search(r'(?i)bootstrap|tailwind|bulma|foundation\.css', p.raw):
        err(f'{name}: có dấu hiệu framework CSS (bootstrap/tailwind...) — Buổi 2 chỉ CSS tự viết')


def check_nav(name, p):
    for page in ('index.html', 'products.html', 'about.html'):
        if page not in p.nav_links:
            err(f'{name}: menu chưa có link tới {page}')
    if not any(a.get('aria-current') == 'page' for _, a, _ in p.tags):
        warn(f'{name}: menu chưa đánh dấu trang hiện tại (aria-current="page")')


def check_content(pages):
    idx = pages['index.html']
    if not any('banner' in a.get('class', '') or 'hero' in a.get('class', '') for _, a, _ in idx.tags):
        err('index.html: chưa có khối banner (đặt class="banner" cho phần tử bao banner)')
    if not any(a.get('href') == 'products.html' for a in find(idx, 'a')) or not any(a.get('href') == 'about.html' for a in find(idx, 'a')):
        err('index.html: cần link tới products.html và about.html')
    if len(find(idx, 'article', **{'class': 'product-card'})) < 1:
        warn('index.html: chưa có sản phẩm nổi bật dạng thẻ product-card')

    prod = pages['products.html']
    cards = [c for t, a, _ in prod.tags if t == 'article' and 'product-card' in a.get('class', '').split() for c in [a]]
    if len(cards) < 8:
        err(f'products.html: có {len(cards)} thẻ <article class="product-card">, đề yêu cầu ít nhất 8')
    inside = [(t, a) for t, a, parents in prod.tags if 'product-card' in parents]
    if sum(1 for t, _ in inside if t == 'img') < len(cards):
        err('products.html: có thẻ sản phẩm thiếu ảnh')
    if sum(1 for t, a in inside if t == 'a' and a.get('href', '').startswith('product-detail.html')) < len(cards):
        err('products.html: có thẻ sản phẩm thiếu link "Xem chi tiết" tới product-detail.html')
    prices = re.findall(r'\d{1,3}(?:[.,]\d{3})+\s*(?:₫|đ|VND)', text_in(prod, 'product-card'))
    if len(prices) < len(cards):
        err(f'products.html: tìm thấy {len(prices)} giá dạng "149.000 ₫" trong {len(cards)} thẻ sản phẩm')

    det = pages['product-detail.html']
    if not find(det, 'h1'):
        err('product-detail.html: thiếu tên sản phẩm trong <h1>')
    if not find(det, 'img'):
        err('product-detail.html: thiếu ảnh sản phẩm')
    if not re.search(r'\d{1,3}(?:[.,]\d{3})+\s*(?:₫|đ|VND)', ' '.join(d for d, _ in det.text)):
        err('product-detail.html: thiếu giá dạng "229.000 ₫"')
    if not (find(det, 'table') or find(det, 'dl')):
        err('product-detail.html: thuộc tính sản phẩm nên đặt trong <table> hoặc <dl>')
    if not find(det, 'button'):
        err('product-detail.html: thiếu nút mua hàng (<button type="button">)')
    for a in find(det, 'button'):
        if a.get('type') != 'button':
            warn('product-detail.html: <button> nên có type="button" (nút chỉ là giao diện)')
    # Link trong menu không tính: phải có link quay lại nằm trong <main>.
    main = re.search(r'<main\b.*?</main>', det.raw, re.S | re.I)
    if not main or not re.search(r'href\s*=\s*"products\.html', main.group(0)):
        err('product-detail.html: thiếu link quay lại products.html trong <main>')

    about = pages['about.html']
    if len(find(about, 'section')) < 2:
        err('about.html: nội dung nên chia ít nhất 2 <section>')
    if not find(about, 'img'):
        err('about.html: thiếu hình ảnh minh họa')


def check_shared(pages):
    for block in ('header', 'footer'):
        ref = pages['index.html'].blocks[block]
        for name, p in pages.items():
            if p.blocks[block] != ref:
                err(f'{name}: <{block}> khác với index.html — header/footer phải dán giống hệt ở 4 trang (chỉ khác aria-current)')


def check_css(root):
    css_path = root / 'css' / 'style.css'
    if not css_path.exists():
        return
    css = css_path.read_text(encoding='utf-8')
    body = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    if re.search(r'(?i)bootstrap|tailwind|@import\s+url\([^)]*(bootstrap|tailwind)', css):
        err('style.css: có dấu hiệu framework CSS')
    if not re.search(r'--[\w-]+\s*:', body):
        err('style.css: chưa khai biến màu (:root { --mau-nhan: ...; })')
    if not re.search(r'display\s*:\s*(grid|flex)', body):
        err('style.css: chưa dùng Grid hoặc Flexbox')
    if not re.search(r'display\s*:\s*grid', body):
        warn('style.css: chưa dùng CSS Grid (gợi ý cho lưới sản phẩm)')
    if not re.search(r'@media', body):
        err('style.css: chưa có @media (responsive)')
    if not re.search(r':hover', body):
        err('style.css: chưa có :hover')
    if not re.search(r':focus-visible|:focus\b', body):
        err('style.css: chưa có :focus-visible cho bàn phím')
    visible_focus = r':focus-visible[^{]*\{[^}]*(outline\s*:(?!\s*(none|0)\b)|box-shadow\s*:)'
    if re.search(r'outline\s*:\s*(none|0)\b', body) and not re.search(visible_focus, body):
        err('style.css: có outline: none nhưng không có viền thay thế ở :focus-visible')
    loose = set(re.findall(r'#[0-9a-fA-F]{3,8}\b', re.sub(r':root\s*\{[^}]*\}', '', body)))
    if len(loose) > 6:
        warn(f'style.css: {len(loose)} mã màu viết rời ngoài :root — nên dùng var(--...) cho thống nhất')
    for owner in ('1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.'):
        if not re.search(r'/\*\s*' + re.escape(owner), css):
            warn(f'style.css: thiếu chú thích chia khu "/* {owner} ... */" (bảng phân công trong guide)')
            break


def check_deliverables(root):
    docs = root / 'docs'
    for f in ('plan.md', 'ui-design.md', 'test-report.md', 'ai-usage.md'):
        if not (docs / f).exists():
            warn(f'nộp bài: chưa có docs/{f}')
    answers = list((docs / 'answers').glob('*.md')) if (docs / 'answers').exists() else []
    if len(answers) < 8:
        warn(f'nộp bài: docs/answers/ có {len(answers)}/8 file trả lời câu hỏi kiến thức')
    shots = [f for f in (docs / 'screenshots').glob('*') if f.suffix.lower() in ('.png', '.jpg', '.jpeg', '.webp')] if (docs / 'screenshots').exists() else []
    if len(shots) < 12:
        warn(f'nộp bài: docs/screenshots/ có {len(shots)}/12 ảnh (4 trang × 1366, 768, 390 px)')


def main():
    root = Path(sys.argv[1] if len(sys.argv) > 1 else 'session2')
    if not root.is_dir():
        print(f'Không thấy thư mục {root}')
        return 1
    pages = {}
    for name in PAGES:
        path = root / name
        if not path.exists():
            err(f'thiếu {name}')
            continue
        pages[name] = p = parse(path)
        check_page_basics(name, p)
        check_links(root, name, p)
        check_nav(name, p)
    if not (root / 'css' / 'style.css').exists():
        err('thiếu css/style.css')
    if len(pages) == len(PAGES):
        check_content(pages)
        check_shared(pages)
    check_css(root)
    check_deliverables(root)

    for m in errors:
        print(f'[LOI] {m}')
    for m in warnings:
        print(f'[CANH BAO] {m}')
    print(f'\nKết quả: {len(errors)} lỗi, {len(warnings)} cảnh báo.', 'ĐẠT' if not errors else 'CHƯA ĐẠT')
    print('Script chỉ kiểm phần đo được bằng máy. Ảnh méo, menu chồng, màu khó đọc: kiểm bằng mắt ở 1366/768/390 px.')
    return 1 if errors else 0


if __name__ == '__main__':
    sys.exit(main())
