// Chủ sở hữu: FD1 Thành — tìm kiếm, lọc và sắp xếp.

function populateCategories() {
  const categories = [...new Set(products.map(product => product.category))];
  const select = document.getElementById("filter-category");

  if (!select) return;

  select.innerHTML = '<option value="">Tất cả danh mục</option>';

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    select.appendChild(option);
  });
}

populateCategories();

const searchInput = document.getElementById("filter-search");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    const matchingProducts = products.filter(product =>
      product.name.toLowerCase().includes(query)
    );

    renderProducts(matchingProducts);
  });
}
