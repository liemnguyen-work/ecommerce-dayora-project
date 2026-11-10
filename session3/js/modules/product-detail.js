// Chủ sở hữu: BD1 Hoàn — hiển thị chi tiết sản phẩm.
function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id === null || id === "") {
    return null;
  }

  const numId = Number(id);
  return Number.isNaN(numId) ? null : numId;
}

function renderProductDetail() {
  const id = getProductIdFromUrl();
  const product = id === null ? undefined : getProductById(id);

  if (!product) {
    const detailWrap = document.querySelector(".detail-wrap");
    detailWrap.innerHTML = `
      <div class="product-not-found">
        <h1>Sản phẩm không tồn tại</h1>
        <a href="products.html" class="primary-link">← Quay lại danh sách sản phẩm</a>
      </div>
    `;
    document.title = "Không tìm thấy sản phẩm — DAYORA";
    return;
  }

  const detailCard = document.getElementById("detail-card");
  detailCard.innerHTML = `
    <div class="detail-image">
      <img src="${product.image}" alt="${product.name}" width="900" height="900">
    </div>
    <div class="detail-info">
      <p class="detail-label">${product.category}</p>
      <h1>${product.name}</h1>
      <p class="detail-price">${formatPrice(product.price)}</p>
      <p class="detail-desc">${product.description}</p>
      ${product.specs && product.specs.length ? `
      <dl class="detail-specs">
        ${product.specs.map(spec => `
          <div>
            <dt>${spec.label}</dt>
            <dd>${spec.value}</dd>
          </div>
        `).join("")}
      </dl>
    ` : ""}
      <label for="detail-qty">Số lượng</label>
      <input id="detail-qty" type="number" min="1" max="99" value="1">
      <div class="detail-actions">
        <button id="btn-add-detail" class="detail-button detail-button-secondary" type="button">Thêm vào giỏ</button>
        <button id="btn-buy-now" class="detail-button detail-button-primary" type="button">Mua ngay</button>
      </div>
    </div>
  `;

  document.title = `${product.name} — DAYORA`;

  const addBtn = document.getElementById("btn-add-detail");
  const qtyInput = document.getElementById("detail-qty");

  if (addBtn && qtyInput) {
    function getQuantity() {
      const qty = Math.min(99, Math.max(1, parseInt(qtyInput.value, 10) || 1));
      qtyInput.value = qty;
      return qty;
    }

        qtyInput.addEventListener("change", getQuantity);

    addBtn.addEventListener("click", () => {
      addToCart(product.id, getQuantity());
    });

    const buyNowBtn = document.getElementById("btn-buy-now");

    if (buyNowBtn) {
      buyNowBtn.addEventListener("click", () => {
        addToCart(product.id, getQuantity());
        window.location.href = "cart.html";
      });
    }
  }
}

renderProductDetail();

