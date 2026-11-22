// Kết nối ô tìm kiếm trên header với trang sản phẩm
document.addEventListener("DOMContentLoaded", () => {
  const headerSearch = document.getElementById("search");
  const productSearch = document.getElementById("filter-search");

  if (!headerSearch) return;

  // Nếu đang ở trang sản phẩm
  if (productSearch) {
    const params = new URLSearchParams(window.location.search);
    const keyword = params.get("q") || "";

    if (keyword) {
      headerSearch.value = keyword;
      productSearch.value = keyword;
      productSearch.dispatchEvent(new Event("input"));
    }

    // Gõ trên header thì bộ lọc bên dưới cập nhật theo
    headerSearch.addEventListener("input", () => {
      productSearch.value = headerSearch.value;
      productSearch.dispatchEvent(new Event("input"));
    });

    // Gõ ở bộ lọc thì ô header cập nhật theo
    productSearch.addEventListener("input", () => {
      headerSearch.value = productSearch.value;
    });

    return;
  }

  // Ở các trang khác: nhấn Enter để sang trang sản phẩm
  headerSearch.addEventListener("keydown", event => {
    if (event.key !== "Enter") return;

    const keyword = headerSearch.value.trim();
    if (!keyword) return;

    window.location.href =
      `products.html?q=${encodeURIComponent(keyword)}`;
  });
});