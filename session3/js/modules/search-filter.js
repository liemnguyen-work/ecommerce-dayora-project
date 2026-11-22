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
const categorySelect = document.getElementById("filter-category");
const sortSelect = document.getElementById("filter-sort");

function applyFilters() {
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const category = categorySelect ? categorySelect.value : "";
  const sortOrder = sortSelect ? sortSelect.value : "default";
  let result = [...products];

  if (category) {
    result = result.filter(product => product.category === category);
  }

  if (query) {
    result = result.filter(product => product.name.toLowerCase().includes(query));
  }

  if (sortOrder === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  }

  renderProducts(result);
}

if (searchInput) {
  searchInput.addEventListener("input", applyFilters);
}

if (categorySelect) {
  categorySelect.addEventListener("change", applyFilters);
}

if (sortSelect) {
  sortSelect.addEventListener("change", applyFilters);
}
