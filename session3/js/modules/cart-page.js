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
          <button type="button" class="qty-btn"
            data-action="decrease" data-id="${item.id}">−</button>
          <span>${item.quantity}</span>
          <button type="button" class="qty-btn"
            data-action="increase" data-id="${item.id}">+</button>
        </td>

        <td data-label="Thành tiền">
          ${formatPrice(subtotal)}
        </td>

        <td data-label="Xóa">
          <button type="button" class="btn-remove"
            data-action="remove" data-id="${item.id}">
            Xóa
          </button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = rows.join("");
}

document.addEventListener("DOMContentLoaded", renderCart);
