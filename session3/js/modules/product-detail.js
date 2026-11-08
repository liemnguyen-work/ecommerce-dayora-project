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
      <label for="detail-qty">Số lượng</label>
      <input id="detail-qty" type="number" min="1" max="99" value="1">
      <div class="detail-actions">
        <button id="btn-add-detail" class="detail-button detail-button-secondary" type="button">Thêm vào giỏ</button>
        <a class="detail-button detail-button-primary" href="cart.html">Xem giỏ hàng</a>
      </div>
    </div>
  `;

  document.title = `${product.name} — DAYORA`;
}

renderProductDetail();
