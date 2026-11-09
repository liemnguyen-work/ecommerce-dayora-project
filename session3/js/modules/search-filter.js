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
const sortSelect = document.getElementById("filter-sort");

function updateSearchAndSort() {
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const matchingProducts = products.filter(product =>
    product.name.toLowerCase().includes(query)
  );
  const sortedList = [...matchingProducts];
  const sortOrder = sortSelect ? sortSelect.value : "default";

  if (sortOrder === "price-asc") {
    sortedList.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "price-desc") {
    sortedList.sort((a, b) => b.price - a.price);
  }

  renderProducts(sortedList);
}

if (searchInput) {
  searchInput.addEventListener("input", updateSearchAndSort);
}

if (sortSelect) {
  sortSelect.addEventListener("change", updateSearchAndSort);
}
