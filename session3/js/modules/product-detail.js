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
