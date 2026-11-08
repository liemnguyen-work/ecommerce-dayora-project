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
