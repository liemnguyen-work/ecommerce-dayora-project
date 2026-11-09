# Quy ước chung — DAYORA Buổi 3

Các file JavaScript trong `session3/` dùng chung tên dữ liệu, hàm và sự kiện dưới đây. Mỗi thành viên kiểm tra quy ước trước khi tích hợp phần việc của mình.

## 1. Mảng sản phẩm `products`

Dữ liệu sản phẩm được lưu trong mảng đối tượng `products`. Mỗi sản phẩm có các trường `id`, `name`, `price`, `category`, `image`, `description`. `id` là số nguyên từ 1 đến 8; `price` là số nguyên tính bằng đồng Việt Nam.

Ví dụ một phần tử trong mảng:

```js
{ id: 1, name: "Sản phẩm mẫu", price: 149000, category: "Picnic", image: "images/example.jpg", description: "Mô tả mẫu" }
```

Tên và đường dẫn trên chỉ dùng để minh họa cấu trúc.

## 2. Định dạng giá: `formatPrice(number)`

Hàm `formatPrice` nhận giá dạng số và trả về chuỗi tiền Việt Nam để hiển thị. Dữ liệu giá trong mảng vẫn được lưu dưới dạng số.

Hàm `formatPrice` được định nghĩa trong `session3/js/data/products.js`. Hàm dùng `Intl.NumberFormat` với ngôn ngữ `vi-VN`, kiểu `currency` và đơn vị `VND` để chuyển giá dạng số thành chuỗi tiền Việt Nam.

```js
formatPrice(149000); // Ví dụ kết quả: "149.000 ₫"
```

## 3. Tìm sản phẩm: `getProductById(id)`

Hàm `getProductById` tìm sản phẩm theo ID và trả về đối tượng tương ứng. Nếu không tìm thấy, hàm trả về `undefined`; ID được chuyển sang kiểu số khi tìm.

Hàm `getProductById` được định nghĩa trong `session3/js/data/products.js`.

```js
getProductById(1);   // Sản phẩm có id là 1, nếu có
getProductById(999); // undefined, nếu không tồn tại
```

## 4. Cấu trúc giỏ hàng

Giỏ hàng là mảng các đối tượng chỉ gồm `id` và `quantity`. Tên và giá được lấy từ dữ liệu sản phẩm khi cần hiển thị hoặc tính tiền.

```js
[{ id: 1, quantity: 2 }]
```

Ví dụ trên biểu thị sản phẩm ID 1 có số lượng 2.

## 5. Khóa lưu trữ `"cart"`

Mọi trang sử dụng đúng khóa `"cart"` trong `localStorage` để lưu và đọc giỏ hàng. Không tự đặt khóa khác như `"gioHang"`.

```js
localStorage.getItem("cart"); // Đọc dữ liệu đã lưu dưới khóa cart
```

## 6. Các hàm dùng chung trong `cart.js`

| Hàm | Mục đích |
|---|---|
| `loadCart()` | Đọc dữ liệu giỏ hàng đã lưu. |
| `saveCart(cart)` | Lưu giỏ hàng và phát sự kiện đồng bộ sau khi lưu thành công. |
| `addToCart(id, qty)` | Thêm sản phẩm vào giỏ hoặc tăng số lượng nếu đã có. |
| `updateQuantity(id, qty)` | Cập nhật số lượng của sản phẩm trong giỏ. |
| `removeFromCart(id)` | Xóa sản phẩm khỏi giỏ. |
| `getCartTotals()` | Lấy tổng số lượng và tổng tiền của giỏ. |

Các hàm giỏ hàng được định nghĩa trong `session3/js/modules/cart.js`.

- `loadCart()` trả về mảng giỏ hàng. Nếu chưa có dữ liệu, JSON không hợp lệ hoặc dữ liệu đọc được không phải mảng, hàm trả về `[]`. Hàm hiện chưa kiểm tra tính hợp lệ của từng phần tử trong mảng.
- `getCartTotals()` trả về đối tượng `{ totalItems, totalPrice }`, gồm tổng số lượng và tổng tiền. Khi giỏ hàng rỗng, hai giá trị đều bằng `0`.
- `updateQuantity(id, qty)` cập nhật số lượng của sản phẩm tìm thấy rồi lưu giỏ hàng. Hàm không có lệnh `return` tường minh nên trả về `undefined`.
  Số lượng được giữ tối thiểu là 1. Nếu muốn xóa sản phẩm khỏi giỏ, gọi `removeFromCart(id)`.

Ví dụ:

```js
loadCart();             // Ví dụ khi giỏ hàng rỗng: []
getCartTotals();        // Ví dụ khi giỏ hàng rỗng: { totalItems: 0, totalPrice: 0 }
updateQuantity(1, 2);   // Cập nhật số lượng sản phẩm ID 1 nếu sản phẩm có trong giỏ
```

Ví dụ gọi hàm:

```js
addToCart(1, 2); // Yêu cầu thêm 2 sản phẩm có ID 1
```

## 7. Sự kiện đồng bộ `"cart:changed"`

Chỉ `saveCart(cart)` phát sự kiện `"cart:changed"` **sau khi lưu vào `localStorage` thành công**. Các hàm `addToCart`, `updateQuantity` và `removeFromCart` gọi `saveCart`; chúng không tự phát lại sự kiện để tránh thông báo trùng.

Ví dụ lệnh phát sự kiện trong `saveCart`, sau bước lưu thành công:

```js
document.dispatchEvent(new CustomEvent("cart:changed"));
```

Các phần giao diện cần cập nhật, như số lượng trên biểu tượng giỏ, có thể lắng nghe sự kiện này.