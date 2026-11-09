
window.addEventListener("DOMContentLoaded", () => {
  renderCart();
  setupCartActions();
});

// Chủ sở hữu: PD Đạt — giao diện giỏ hàng và số lượng trên biểu tượng giỏ.

function renderCart() {
  const tbody = document.getElementById("cart-tbody");

  // Các trang khác không có bảng giỏ hàng
  if (!tbody) return;

  const cart = loadCart();

  // Chưa có sản phẩm
  if (cart.length === 0) {
    tbody.innerHTML = "";
    return;
  }

  const rows = cart.map(item => {
    const product = getProductById(item.id);

    // Bỏ qua sản phẩm không tồn tại
    if (!product) return "";

    const subtotal = product.price * item.quantity;

    return `
      <tr>
        <td data-label="Sản phẩm">
          <img
            class="cart-item-img"
            src="${product.image}"
            alt="${product.name}"
          >
          <a
            class="cart-item-title"
            href="product-detail.html?id=${product.id}"
          >
            ${product.name}
          </a>
        </td>

        <td data-label="Đơn giá">
          ${formatPrice(product.price)}
        </td>

        <td data-label="Số lượng">
          <button
            type="button"
            class="qty-btn btn-qty-minus"
            data-action="decrease"
            data-id="${item.id}"
          >−</button>

          <span>${item.quantity}</span>

          <button
            type="button"
            class="qty-btn btn-qty-plus"
            data-action="increase"
            data-id="${item.id}"
          >+</button>
        </td>

        <td data-label="Thành tiền">
          ${formatPrice(subtotal)}
        </td>

        <td data-label="Xóa">
          <button
            type="button"
            class="btn-remove btn-cart-remove"
            data-action="remove"
            data-id="${item.id}"
          >
            Xóa
          </button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = rows.join("");
}

// Gắn một sự kiện click duy nhất trên vùng chứa giỏ hàng
function setupCartActions() {
  const root = document.getElementById("cart-root");

  if (!root) return;

  root.addEventListener("click", event => {
    const button = event.target.closest(
      ".btn-qty-plus, .btn-qty-minus, .btn-cart-remove"
    );

    if (!button || !root.contains(button)) return;

    const id = Number(button.dataset.id);

    // Xóa sản phẩm
    if (button.classList.contains("btn-cart-remove")) {
      removeFromCart(id);
      renderCart();
      return;
    }

    const item = loadCart().find(
      product => product.id === id
    );

    if (!item) return;

    // Tăng số lượng
    if (button.classList.contains("btn-qty-plus")) {
      updateQuantity(id, item.quantity + 1);
      renderCart();
      return;
    }

    // Giảm số lượng, không cho xuống dưới 1
    if (button.classList.contains("btn-qty-minus")) {
      if (item.quantity > 1) {
        updateQuantity(id, item.quantity - 1);
        renderCart();
      }
    }
  });
}
