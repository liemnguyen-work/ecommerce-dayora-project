const products = [
  {
    id: 1,
    name: "Thảm picnic gấp gọn 2 người",
    price: 149000,
    category: "Thảm picnic",
    image: "images/product-1.jpg",
    description: "Thảm trải ngồi có quai gấp, phù hợp với buổi hẹn hò hoặc chuyến picnic dành cho hai người."
  },
  {
    id: 2,
    name: "Thảm picnic gấp gọn 4 người",
    price: 229000,
    category: "Thảm picnic",
    image: "images/product-2.jpg",
    description: "Thảm trải ngồi cỡ nhóm, có thể gấp gọn để mang theo trong các chuyến đi ban ngày."
  },
{
    id: 3,
    name: "Bình nước cá nhân 750 ml",
    price: 159000,
    category: "Bình nước và ly",
    image: "images/product-3.jpg",
    description: "Bình có nắp vặn, phù hợp để mang theo phần nước uống cá nhân trong chuyến đi."
  },
{
    id: 4,
    name: "Ly picnic có nắp 350 ml",
    price: 79000,
    category: "Bình nước và ly",
    image: "images/product-4.jpg",
    description: "Ly có nắp để sử dụng đồ uống tại chỗ; không mặc định thay thế bình kín khi di chuyển."
  },
  {
    id: 5,
    name: "Hộp đựng thực phẩm 1.000 ml",
    price: 89000,
    category: "Hộp đựng thực phẩm",
    image: "images/product-5.jpg",
    description: "Hộp có nắp để sắp xếp phần đồ ăn do khách tự chuẩn bị."
  },
  {
    id: 6,
    name: "Túi giữ nhiệt xách tay 15 lít",
    price: 249000,
    category: "Túi giữ nhiệt",
    image: "images/product-6.jpg",
    description: "Túi có quai xách để gom hộp thực phẩm và đồ uống đã đóng kín."
  },
  {
    id: 7,
    name: "Túi giữ nhiệt nhỏ 8 lít",
    price: 169000,
    category: "Túi giữ nhiệt",
    image: "images/product-7.jpg",
    description: "Túi cỡ nhỏ dành cho lượng đồ mang theo ít và các chuyến đi ngắn."
  },
  {
    id: 8,
    name: "Khăn giấy khô gói 100 tờ",
    price: 19000,
    category: "Vật dụng vệ sinh",
    image: "images/product-8.jpg",
    description: "Khăn giấy dùng để lau tay và phục vụ vệ sinh thông thường."
  }
];
// Format product price to Vietnamese Dong
function formatPrice(number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(number);
}
// Find product by ID
function getProductById(id) {
  const numId = Number(id);
  return products.find(item => item.id === numId);
}
