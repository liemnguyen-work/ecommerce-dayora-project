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

// Thông số sản phẩm kế thừa từ Buổi 2
const productSpecifications = {
  1: [
    { label: "Màu sắc", value: "Kem – teal" },
    { label: "Chất liệu", value: "Vải polyester, lớp đế PE" },
    { label: "Kích thước", value: "140 × 150 cm" },
    { label: "Sức chứa", value: "2 người" },
    { label: "Đơn vị bán", value: "Tấm" }
  ],
  2: [
    { label: "Màu sắc", value: "Caro kem – olive" },
    { label: "Chất liệu", value: "Vải polyester, lớp đế PE" },
    { label: "Kích thước", value: "200 × 200 cm" },
    { label: "Sức chứa", value: "4 người" },
    { label: "Đơn vị bán", value: "Tấm" }
  ],
  3: [
    { label: "Màu sắc", value: "Teal" },
    { label: "Chất liệu", value: "Thân inox, nắp PP" },
    { label: "Thông số", value: "750 ml; Ø7,5 × 25 cm" },
    { label: "Đơn vị bán", value: "Bình" }
  ],
  4: [
    { label: "Màu sắc", value: "Kem" },
    { label: "Chất liệu", value: "Thân inox, nắp PP" },
    { label: "Thông số", value: "350 ml; Ø8 × 11 cm" },
    { label: "Đơn vị bán", value: "Ly" }
  ],
  5: [
    { label: "Màu sắc", value: "Nắp kem – thân trong" },
    { label: "Chất liệu", value: "Thân và nắp PP, gioăng silicone" },
    { label: "Thông số", value: "1.000 ml; 20 × 14 × 7 cm" },
    { label: "Đơn vị bán", value: "Hộp" }
  ],
  6: [
    { label: "Màu sắc", value: "Teal" },
    { label: "Chất liệu", value: "Vải polyester, đệm PE, lớp lót phủ nhôm" },
    { label: "Thông số", value: "15 lít; 30 × 22 × 23 cm" },
    { label: "Đơn vị bán", value: "Túi" }
  ],
  7: [
    { label: "Màu sắc", value: "Kem" },
    { label: "Chất liệu", value: "Vải polyester, đệm PE, lớp lót phủ nhôm" },
    { label: "Thông số", value: "8 lít; 25 × 18 × 18 cm" },
    { label: "Đơn vị bán", value: "Túi" }
  ],
  8: [
    { label: "Màu sắc", value: "Trắng – bao kem" },
    { label: "Chất liệu", value: "Giấy" },
    { label: "Thông số", value: "18 × 20 cm/tờ; 100 tờ/gói" },
    { label: "Đơn vị bán", value: "Gói 100 tờ" }
  ]
};

products.forEach(product => {
  product.specs = productSpecifications[product.id] || [];
});