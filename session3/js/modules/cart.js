const CART_KEY = "cart";
// Lưu giỏ hàng vào LocalStorage
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  document.dispatchEvent(new CustomEvent("cart:changed"));
}
// Đọc giỏ hàng từ LocalStorage
function loadCart() {
  const raw = localStorage.getItem(CART_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed)) {
      return parsed;
    }

    console.warn("Dữ liệu giỏ hàng không phải là mảng.");
    return [];
  } catch (error) {
    console.warn("Không thể đọc dữ liệu giỏ hàng:", error);
    return [];
  }
}
// Thêm sản phẩm vào giỏ hàng
function addToCart(id, qty = 1) {
  // Chuyển ID và số lượng thành số
  const productId = Number(id);
  const quantity = Math.max(1, Number(qty) || 1);

  // Lấy giỏ hàng hiện tại
  const cart = loadCart();

  // Tìm sản phẩm trong giỏ hàng
  const index = cart.findIndex(item => item.id === productId);

  if (index !== -1) {
    // Sản phẩm đã tồn tại: cộng dồn số lượng
    cart[index].quantity += quantity;
  } else {
    // Sản phẩm chưa tồn tại: thêm mới
    cart.push({
      id: productId,
      quantity: quantity
    });
  }

  // Lưu giỏ hàng đã cập nhật
  saveCart(cart);
}
