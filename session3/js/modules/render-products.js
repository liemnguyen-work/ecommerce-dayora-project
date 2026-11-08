
// Chủ sở hữu: FD2 Phúc — hiển thị danh sách sản phẩm.

function renderProducts(list) {
  // 1. Lấy vùng chứa danh sách sản phẩm
  const container = document.querySelector(".product-grid");

  // 2. Kiểm tra vùng chứa có tồn tại không
  if (!container) {
    return;
  }

  // 3. Chuyển danh sách sản phẩm thành các thẻ HTML
  const html = list.map(product => `
    <li class="product-grid-item">
      <article class="product-card">
        <img
          src="${product.image}"
          alt="${product.name}"
          width="900"
          height="900"
          loading="lazy"
        >

        <div class="product-info">
          <h2>${product.name}</h2>

          <p class="product-price">
            ${formatPrice(product.price)}
          </p>

          <a
            class="product-detail-link"
            href="product-detail.html#san-pham-${product.id}"
            aria-label="Xem chi tiết ${product.name}"
          >
            Xem chi tiết
          </a>
        </div>
      </article>
    </li>
  `).join("");

  // 4. Hiển thị HTML vào vùng chứa
  container.innerHTML = html;
}

// 5. Hiển thị danh sách sản phẩm ban đầu
renderProducts(products);
