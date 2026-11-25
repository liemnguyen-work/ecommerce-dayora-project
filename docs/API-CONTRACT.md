# API-CONTRACT — hợp đồng dữ liệu và route

Đây là đặc tả schema Prisma và các route API mà cả nhóm phải theo. Khi code chưa khớp, sửa code cho khớp; nếu bạn thấy hợp đồng chưa hợp lý, hỏi PM trước khi tự đổi. Kiểm tra tự động bằng `node tools/contract-check.mjs apps/api`.

## Enum

- `Role`: CUSTOMER, ADMIN
- `ProductStatus`: ACTIVE, INACTIVE
- `Scenario`: PICNIC, DATE, BEACH
- `OrderStatus`: PENDING_PAYMENT, CONFIRMED, CANCELLED, COMPLETED
- `PaymentStatus`: UNPAID, PAID, FAILED, EXPIRED
- `ShippingStatus`: NOT_SHIPPED, PREPARING, SHIPPING, DELIVERED, RETURNED
- `RuleSetStatus`: DRAFT, PUBLISHED, ARCHIVED

## Model

### User

| Trường | Kiểu | Rỗng được |
|---|---|---|
| `id` | `String` | không |
| `email` | `String` | không |
| `passwordHash` | `String` | không |
| `fullName` | `String` | không |
| `phone` | `String` | có |
| `role` | `Role` | không |
| `isActive` | `Boolean` | không |
| `createdAt` | `DateTime` | không |
| `cart` | `Cart` (quan hệ) | có |
| `orders` | `Order[]` (quan hệ) | không |
| `reviews` | `Review[]` (quan hệ) | không |
| `viewed` | `ViewedProduct[]` (quan hệ) | không |

### Category

| Trường | Kiểu | Rỗng được |
|---|---|---|
| `id` | `String` | không |
| `code` | `String` | không |
| `name` | `String` | không |
| `sortOrder` | `Int` | không |
| `products` | `Product[]` (quan hệ) | không |

### Product

| Trường | Kiểu | Rỗng được |
|---|---|---|
| `id` | `String` | không |
| `slug` | `String` | không |
| `name` | `String` | không |
| `description` | `String` | không |
| `guide` | `String` | có |
| `categoryId` | `String` | không |
| `category` | `Category` (quan hệ) | không |
| `scenarios` | `Scenario[]` | không |
| `material` | `String` | không |
| `status` | `ProductStatus` | không |
| `isFeatured` | `Boolean` | không |
| `createdAt` | `DateTime` | không |
| `updatedAt` | `DateTime` | không |
| `skus` | `Sku[]` (quan hệ) | không |
| `reviews` | `Review[]` (quan hệ) | không |
| `viewedBy` | `ViewedProduct[]` (quan hệ) | không |

### Sku

| Trường | Kiểu | Rỗng được |
|---|---|---|
| `id` | `String` | không |
| `code` | `String` | không |
| `productId` | `String` | không |
| `product` | `Product` (quan hệ) | không |
| `color` | `String` | không |
| `price` | `Int` | không |
| `salePrice` | `Int` | có |
| `stock` | `Int` | không |
| `reserved` | `Int` | không |
| `unit` | `String` | không |
| `unitQty` | `Int` | không |
| `lengthCm` | `Decimal` | có |
| `widthCm` | `Decimal` | có |
| `heightCm` | `Decimal` | có |
| `volumeMl` | `Int` | có |
| `capacityPeople` | `Int` | có |
| `useType` | `String` | không |
| `imageUrl` | `String` | có |
| `imageSource` | `String` | có |
| `status` | `ProductStatus` | không |
| `cartItems` | `CartItem[]` (quan hệ) | không |
| `orderItems` | `OrderItem[]` (quan hệ) | không |

### ViewedProduct

| Trường | Kiểu | Rỗng được |
|---|---|---|
| `userId` | `String` | không |
| `productId` | `String` | không |
| `viewedAt` | `DateTime` | không |
| `user` | `User` (quan hệ) | không |
| `product` | `Product` (quan hệ) | không |

### Cart

| Trường | Kiểu | Rỗng được |
|---|---|---|
| `id` | `String` | không |
| `userId` | `String` | không |
| `user` | `User` (quan hệ) | không |
| `updatedAt` | `DateTime` | không |
| `items` | `CartItem[]` (quan hệ) | không |

### CartItem

| Trường | Kiểu | Rỗng được |
|---|---|---|
| `id` | `String` | không |
| `cartId` | `String` | không |
| `cart` | `Cart` (quan hệ) | không |
| `skuId` | `String` | không |
| `sku` | `Sku` (quan hệ) | không |
| `quantity` | `Int` | không |
| `kitGroupId` | `String` | có |
| `ruleSetId` | `String` | có |
| `kitComplete` | `Boolean` | có |

### Voucher

| Trường | Kiểu | Rỗng được |
|---|---|---|
| `id` | `String` | không |
| `code` | `String` | không |
| `description` | `String` | không |
| `percentOff` | `Int` | có |
| `amountOff` | `Int` | có |
| `maxDiscount` | `Int` | có |
| `minOrderValue` | `Int` | không |
| `usageLimit` | `Int` | có |
| `perUserLimit` | `Int` | không |
| `usedCount` | `Int` | không |
| `startsAt` | `DateTime` | không |
| `endsAt` | `DateTime` | không |
| `isActive` | `Boolean` | không |
| `usages` | `VoucherUsage[]` (quan hệ) | không |

### VoucherUsage

| Trường | Kiểu | Rỗng được |
|---|---|---|
| `id` | `String` | không |
| `voucherId` | `String` | không |
| `voucher` | `Voucher` (quan hệ) | không |
| `userId` | `String` | không |
| `orderId` | `String` | không |
| `createdAt` | `DateTime` | không |

### Promotion

| Trường | Kiểu | Rỗng được |
|---|---|---|
| `id` | `String` | không |
| `title` | `String` | không |
| `subtitle` | `String` | có |
| `imageUrl` | `String` | có |
| `link` | `String` | có |
| `startsAt` | `DateTime` | không |
| `endsAt` | `DateTime` | không |
| `isActive` | `Boolean` | không |

### ShippingRate

| Trường | Kiểu | Rỗng được |
|---|---|---|
| `id` | `String` | không |
| `zone` | `String` | không |
| `label` | `String` | không |
| `fee` | `Int` | không |
| `freeFromValue` | `Int` | có |

### Order

| Trường | Kiểu | Rỗng được |
|---|---|---|
| `id` | `String` | không |
| `code` | `String` | không |
| `userId` | `String` | không |
| `user` | `User` (quan hệ) | không |
| `status` | `OrderStatus` | không |
| `paymentStatus` | `PaymentStatus` | không |
| `shippingStatus` | `ShippingStatus` | không |
| `recipientName` | `String` | không |
| `recipientPhone` | `String` | không |
| `address` | `String` | không |
| `shippingZone` | `String` | không |
| `subtotal` | `Int` | không |
| `discount` | `Int` | không |
| `shippingFee` | `Int` | không |
| `total` | `Int` | không |
| `voucherCode` | `String` | có |
| `reserveExpiresAt` | `DateTime` | có |
| `createdAt` | `DateTime` | không |
| `updatedAt` | `DateTime` | không |
| `items` | `OrderItem[]` (quan hệ) | không |
| `payments` | `Payment[]` (quan hệ) | không |
| `statusLogs` | `OrderStatusLog[]` (quan hệ) | không |

### OrderItem

| Trường | Kiểu | Rỗng được |
|---|---|---|
| `id` | `String` | không |
| `orderId` | `String` | không |
| `order` | `Order` (quan hệ) | không |
| `skuId` | `String` | không |
| `sku` | `Sku` (quan hệ) | không |
| `skuCode` | `String` | không |
| `productName` | `String` | không |
| `color` | `String` | không |
| `unitPrice` | `Int` | không |
| `quantity` | `Int` | không |
| `lineTotal` | `Int` | không |
| `kitGroupId` | `String` | có |
| `ruleSetVersion` | `Int` | có |

### OrderStatusLog

| Trường | Kiểu | Rỗng được |
|---|---|---|
| `id` | `String` | không |
| `orderId` | `String` | không |
| `order` | `Order` (quan hệ) | không |
| `field` | `String` | không |
| `fromValue` | `String` | không |
| `toValue` | `String` | không |
| `actorId` | `String` | có |
| `note` | `String` | có |
| `createdAt` | `DateTime` | không |

### Payment

| Trường | Kiểu | Rỗng được |
|---|---|---|
| `id` | `String` | không |
| `orderId` | `String` | không |
| `order` | `Order` (quan hệ) | không |
| `provider` | `String` | không |
| `amount` | `Int` | không |
| `txnNo` | `String` | có |
| `responseCode` | `String` | có |
| `status` | `PaymentStatus` | không |
| `rawPayload` | `Json` | không |
| `createdAt` | `DateTime` | không |

### Review

| Trường | Kiểu | Rỗng được |
|---|---|---|
| `id` | `String` | không |
| `userId` | `String` | không |
| `user` | `User` (quan hệ) | không |
| `productId` | `String` | không |
| `product` | `Product` (quan hệ) | không |
| `orderId` | `String` | không |
| `rating` | `Int` | không |
| `comment` | `String` | có |
| `createdAt` | `DateTime` | không |

### RuleSet

| Trường | Kiểu | Rỗng được |
|---|---|---|
| `id` | `String` | không |
| `version` | `Int` | không |
| `status` | `RuleSetStatus` | không |
| `rules` | `Json` | không |
| `note` | `String` | có |
| `createdById` | `String` | không |
| `publishedAt` | `DateTime` | có |
| `createdAt` | `DateTime` | không |
| `logs` | `RuleChangeLog[]` (quan hệ) | không |

### RuleChangeLog

| Trường | Kiểu | Rỗng được |
|---|---|---|
| `id` | `String` | không |
| `ruleSetId` | `String` | không |
| `ruleSet` | `RuleSet` (quan hệ) | không |
| `actorId` | `String` | không |
| `action` | `String` | không |
| `diff` | `Json` | có |
| `createdAt` | `DateTime` | không |

## Route

- `DELETE /cart`
- `DELETE /cart/items/:id`
- `GET /admin/categories`
- `GET /admin/dashboard`
- `GET /admin/orders`
- `GET /admin/orders/:id`
- `GET /admin/products`
- `GET /admin/promotions`
- `GET /admin/rulesets`
- `GET /admin/rulesets/:id`
- `GET /admin/skus`
- `GET /admin/users`
- `GET /admin/vouchers`
- `GET /auth/me`
- `GET /cart`
- `GET /categories`
- `GET /health`
- `GET /kits/options`
- `GET /me/profile`
- `GET /me/reviewable`
- `GET /me/viewed`
- `GET /orders`
- `GET /orders/:id`
- `GET /payments/vnpay/ipn`
- `GET /payments/vnpay/return`
- `GET /products`
- `GET /products/:slug`
- `GET /products/:slug/reviews`
- `GET /promotions`
- `PATCH /admin/categories/:id`
- `PATCH /admin/orders/:id/status`
- `PATCH /admin/products/:id`
- `PATCH /admin/products/:id/hide`
- `PATCH /admin/promotions/:id`
- `PATCH /admin/promotions/:id/active`
- `PATCH /admin/rulesets/:id`
- `PATCH /admin/skus/:id`
- `PATCH /admin/skus/:id/hide`
- `PATCH /admin/users/:id`
- `PATCH /admin/vouchers/:id`
- `PATCH /admin/vouchers/:id/active`
- `PATCH /cart/items/:id`
- `PATCH /me/profile`
- `POST /admin/categories`
- `POST /admin/products`
- `POST /admin/promotions`
- `POST /admin/rulesets`
- `POST /admin/rulesets/:id/publish`
- `POST /admin/skus`
- `POST /admin/vouchers`
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/oauth`
- `POST /auth/register`
- `POST /cart/items`
- `POST /cart/items/bulk`
- `POST /kits/adjust`
- `POST /kits/ai-chat`
- `POST /kits/ai-parse`
- `POST /kits/build`
- `POST /me/password`
- `POST /me/viewed`
- `POST /orders`
- `POST /orders/:id/cancel`
- `POST /orders/preview`
- `POST /payments/vnpay/:orderId`
- `POST /reviews`

## Dữ liệu cho công cụ kiểm tra (không sửa tay)

```json contract-data
{
 "enums": {
  "Role": [
   "CUSTOMER",
   "ADMIN"
  ],
  "ProductStatus": [
   "ACTIVE",
   "INACTIVE"
  ],
  "Scenario": [
   "PICNIC",
   "DATE",
   "BEACH"
  ],
  "OrderStatus": [
   "PENDING_PAYMENT",
   "CONFIRMED",
   "CANCELLED",
   "COMPLETED"
  ],
  "PaymentStatus": [
   "UNPAID",
   "PAID",
   "FAILED",
   "EXPIRED"
  ],
  "ShippingStatus": [
   "NOT_SHIPPED",
   "PREPARING",
   "SHIPPING",
   "DELIVERED",
   "RETURNED"
  ],
  "RuleSetStatus": [
   "DRAFT",
   "PUBLISHED",
   "ARCHIVED"
  ]
 },
 "models": {
  "User": {
   "id": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "email": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "passwordHash": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "fullName": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "phone": {
    "type": "String",
    "list": false,
    "optional": true,
    "relation": false
   },
   "role": {
    "type": "Role",
    "list": false,
    "optional": false,
    "relation": false
   },
   "isActive": {
    "type": "Boolean",
    "list": false,
    "optional": false,
    "relation": false
   },
   "createdAt": {
    "type": "DateTime",
    "list": false,
    "optional": false,
    "relation": false
   },
   "cart": {
    "type": "Cart",
    "list": false,
    "optional": true,
    "relation": true
   },
   "orders": {
    "type": "Order",
    "list": true,
    "optional": false,
    "relation": true
   },
   "reviews": {
    "type": "Review",
    "list": true,
    "optional": false,
    "relation": true
   },
   "viewed": {
    "type": "ViewedProduct",
    "list": true,
    "optional": false,
    "relation": true
   }
  },
  "Category": {
   "id": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "code": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "name": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "sortOrder": {
    "type": "Int",
    "list": false,
    "optional": false,
    "relation": false
   },
   "products": {
    "type": "Product",
    "list": true,
    "optional": false,
    "relation": true
   }
  },
  "Product": {
   "id": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "slug": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "name": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "description": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "guide": {
    "type": "String",
    "list": false,
    "optional": true,
    "relation": false
   },
   "categoryId": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "category": {
    "type": "Category",
    "list": false,
    "optional": false,
    "relation": true
   },
   "scenarios": {
    "type": "Scenario",
    "list": true,
    "optional": false,
    "relation": false
   },
   "material": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "status": {
    "type": "ProductStatus",
    "list": false,
    "optional": false,
    "relation": false
   },
   "isFeatured": {
    "type": "Boolean",
    "list": false,
    "optional": false,
    "relation": false
   },
   "createdAt": {
    "type": "DateTime",
    "list": false,
    "optional": false,
    "relation": false
   },
   "updatedAt": {
    "type": "DateTime",
    "list": false,
    "optional": false,
    "relation": false
   },
   "skus": {
    "type": "Sku",
    "list": true,
    "optional": false,
    "relation": true
   },
   "reviews": {
    "type": "Review",
    "list": true,
    "optional": false,
    "relation": true
   },
   "viewedBy": {
    "type": "ViewedProduct",
    "list": true,
    "optional": false,
    "relation": true
   }
  },
  "Sku": {
   "id": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "code": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "productId": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "product": {
    "type": "Product",
    "list": false,
    "optional": false,
    "relation": true
   },
   "color": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "price": {
    "type": "Int",
    "list": false,
    "optional": false,
    "relation": false
   },
   "salePrice": {
    "type": "Int",
    "list": false,
    "optional": true,
    "relation": false
   },
   "stock": {
    "type": "Int",
    "list": false,
    "optional": false,
    "relation": false
   },
   "reserved": {
    "type": "Int",
    "list": false,
    "optional": false,
    "relation": false
   },
   "unit": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "unitQty": {
    "type": "Int",
    "list": false,
    "optional": false,
    "relation": false
   },
   "lengthCm": {
    "type": "Decimal",
    "list": false,
    "optional": true,
    "relation": false
   },
   "widthCm": {
    "type": "Decimal",
    "list": false,
    "optional": true,
    "relation": false
   },
   "heightCm": {
    "type": "Decimal",
    "list": false,
    "optional": true,
    "relation": false
   },
   "volumeMl": {
    "type": "Int",
    "list": false,
    "optional": true,
    "relation": false
   },
   "capacityPeople": {
    "type": "Int",
    "list": false,
    "optional": true,
    "relation": false
   },
   "useType": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "imageUrl": {
    "type": "String",
    "list": false,
    "optional": true,
    "relation": false
   },
   "imageSource": {
    "type": "String",
    "list": false,
    "optional": true,
    "relation": false
   },
   "status": {
    "type": "ProductStatus",
    "list": false,
    "optional": false,
    "relation": false
   },
   "cartItems": {
    "type": "CartItem",
    "list": true,
    "optional": false,
    "relation": true
   },
   "orderItems": {
    "type": "OrderItem",
    "list": true,
    "optional": false,
    "relation": true
   }
  },
  "ViewedProduct": {
   "userId": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "productId": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "viewedAt": {
    "type": "DateTime",
    "list": false,
    "optional": false,
    "relation": false
   },
   "user": {
    "type": "User",
    "list": false,
    "optional": false,
    "relation": true
   },
   "product": {
    "type": "Product",
    "list": false,
    "optional": false,
    "relation": true
   }
  },
  "Cart": {
   "id": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "userId": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "user": {
    "type": "User",
    "list": false,
    "optional": false,
    "relation": true
   },
   "updatedAt": {
    "type": "DateTime",
    "list": false,
    "optional": false,
    "relation": false
   },
   "items": {
    "type": "CartItem",
    "list": true,
    "optional": false,
    "relation": true
   }
  },
  "CartItem": {
   "id": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "cartId": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "cart": {
    "type": "Cart",
    "list": false,
    "optional": false,
    "relation": true
   },
   "skuId": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "sku": {
    "type": "Sku",
    "list": false,
    "optional": false,
    "relation": true
   },
   "quantity": {
    "type": "Int",
    "list": false,
    "optional": false,
    "relation": false
   },
   "kitGroupId": {
    "type": "String",
    "list": false,
    "optional": true,
    "relation": false
   },
   "ruleSetId": {
    "type": "String",
    "list": false,
    "optional": true,
    "relation": false
   },
   "kitComplete": {
    "type": "Boolean",
    "list": false,
    "optional": true,
    "relation": false
   }
  },
  "Voucher": {
   "id": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "code": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "description": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "percentOff": {
    "type": "Int",
    "list": false,
    "optional": true,
    "relation": false
   },
   "amountOff": {
    "type": "Int",
    "list": false,
    "optional": true,
    "relation": false
   },
   "maxDiscount": {
    "type": "Int",
    "list": false,
    "optional": true,
    "relation": false
   },
   "minOrderValue": {
    "type": "Int",
    "list": false,
    "optional": false,
    "relation": false
   },
   "usageLimit": {
    "type": "Int",
    "list": false,
    "optional": true,
    "relation": false
   },
   "perUserLimit": {
    "type": "Int",
    "list": false,
    "optional": false,
    "relation": false
   },
   "usedCount": {
    "type": "Int",
    "list": false,
    "optional": false,
    "relation": false
   },
   "startsAt": {
    "type": "DateTime",
    "list": false,
    "optional": false,
    "relation": false
   },
   "endsAt": {
    "type": "DateTime",
    "list": false,
    "optional": false,
    "relation": false
   },
   "isActive": {
    "type": "Boolean",
    "list": false,
    "optional": false,
    "relation": false
   },
   "usages": {
    "type": "VoucherUsage",
    "list": true,
    "optional": false,
    "relation": true
   }
  },
  "VoucherUsage": {
   "id": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "voucherId": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "voucher": {
    "type": "Voucher",
    "list": false,
    "optional": false,
    "relation": true
   },
   "userId": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "orderId": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "createdAt": {
    "type": "DateTime",
    "list": false,
    "optional": false,
    "relation": false
   }
  },
  "Promotion": {
   "id": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "title": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "subtitle": {
    "type": "String",
    "list": false,
    "optional": true,
    "relation": false
   },
   "imageUrl": {
    "type": "String",
    "list": false,
    "optional": true,
    "relation": false
   },
   "link": {
    "type": "String",
    "list": false,
    "optional": true,
    "relation": false
   },
   "startsAt": {
    "type": "DateTime",
    "list": false,
    "optional": false,
    "relation": false
   },
   "endsAt": {
    "type": "DateTime",
    "list": false,
    "optional": false,
    "relation": false
   },
   "isActive": {
    "type": "Boolean",
    "list": false,
    "optional": false,
    "relation": false
   }
  },
  "ShippingRate": {
   "id": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "zone": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "label": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "fee": {
    "type": "Int",
    "list": false,
    "optional": false,
    "relation": false
   },
   "freeFromValue": {
    "type": "Int",
    "list": false,
    "optional": true,
    "relation": false
   }
  },
  "Order": {
   "id": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "code": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "userId": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "user": {
    "type": "User",
    "list": false,
    "optional": false,
    "relation": true
   },
   "status": {
    "type": "OrderStatus",
    "list": false,
    "optional": false,
    "relation": false
   },
   "paymentStatus": {
    "type": "PaymentStatus",
    "list": false,
    "optional": false,
    "relation": false
   },
   "shippingStatus": {
    "type": "ShippingStatus",
    "list": false,
    "optional": false,
    "relation": false
   },
   "recipientName": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "recipientPhone": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "address": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "shippingZone": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "subtotal": {
    "type": "Int",
    "list": false,
    "optional": false,
    "relation": false
   },
   "discount": {
    "type": "Int",
    "list": false,
    "optional": false,
    "relation": false
   },
   "shippingFee": {
    "type": "Int",
    "list": false,
    "optional": false,
    "relation": false
   },
   "total": {
    "type": "Int",
    "list": false,
    "optional": false,
    "relation": false
   },
   "voucherCode": {
    "type": "String",
    "list": false,
    "optional": true,
    "relation": false
   },
   "reserveExpiresAt": {
    "type": "DateTime",
    "list": false,
    "optional": true,
    "relation": false
   },
   "createdAt": {
    "type": "DateTime",
    "list": false,
    "optional": false,
    "relation": false
   },
   "updatedAt": {
    "type": "DateTime",
    "list": false,
    "optional": false,
    "relation": false
   },
   "items": {
    "type": "OrderItem",
    "list": true,
    "optional": false,
    "relation": true
   },
   "payments": {
    "type": "Payment",
    "list": true,
    "optional": false,
    "relation": true
   },
   "statusLogs": {
    "type": "OrderStatusLog",
    "list": true,
    "optional": false,
    "relation": true
   }
  },
  "OrderItem": {
   "id": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "orderId": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "order": {
    "type": "Order",
    "list": false,
    "optional": false,
    "relation": true
   },
   "skuId": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "sku": {
    "type": "Sku",
    "list": false,
    "optional": false,
    "relation": true
   },
   "skuCode": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "productName": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "color": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "unitPrice": {
    "type": "Int",
    "list": false,
    "optional": false,
    "relation": false
   },
   "quantity": {
    "type": "Int",
    "list": false,
    "optional": false,
    "relation": false
   },
   "lineTotal": {
    "type": "Int",
    "list": false,
    "optional": false,
    "relation": false
   },
   "kitGroupId": {
    "type": "String",
    "list": false,
    "optional": true,
    "relation": false
   },
   "ruleSetVersion": {
    "type": "Int",
    "list": false,
    "optional": true,
    "relation": false
   }
  },
  "OrderStatusLog": {
   "id": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "orderId": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "order": {
    "type": "Order",
    "list": false,
    "optional": false,
    "relation": true
   },
   "field": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "fromValue": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "toValue": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "actorId": {
    "type": "String",
    "list": false,
    "optional": true,
    "relation": false
   },
   "note": {
    "type": "String",
    "list": false,
    "optional": true,
    "relation": false
   },
   "createdAt": {
    "type": "DateTime",
    "list": false,
    "optional": false,
    "relation": false
   }
  },
  "Payment": {
   "id": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "orderId": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "order": {
    "type": "Order",
    "list": false,
    "optional": false,
    "relation": true
   },
   "provider": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "amount": {
    "type": "Int",
    "list": false,
    "optional": false,
    "relation": false
   },
   "txnNo": {
    "type": "String",
    "list": false,
    "optional": true,
    "relation": false
   },
   "responseCode": {
    "type": "String",
    "list": false,
    "optional": true,
    "relation": false
   },
   "status": {
    "type": "PaymentStatus",
    "list": false,
    "optional": false,
    "relation": false
   },
   "rawPayload": {
    "type": "Json",
    "list": false,
    "optional": false,
    "relation": false
   },
   "createdAt": {
    "type": "DateTime",
    "list": false,
    "optional": false,
    "relation": false
   }
  },
  "Review": {
   "id": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "userId": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "user": {
    "type": "User",
    "list": false,
    "optional": false,
    "relation": true
   },
   "productId": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "product": {
    "type": "Product",
    "list": false,
    "optional": false,
    "relation": true
   },
   "orderId": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "rating": {
    "type": "Int",
    "list": false,
    "optional": false,
    "relation": false
   },
   "comment": {
    "type": "String",
    "list": false,
    "optional": true,
    "relation": false
   },
   "createdAt": {
    "type": "DateTime",
    "list": false,
    "optional": false,
    "relation": false
   }
  },
  "RuleSet": {
   "id": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "version": {
    "type": "Int",
    "list": false,
    "optional": false,
    "relation": false
   },
   "status": {
    "type": "RuleSetStatus",
    "list": false,
    "optional": false,
    "relation": false
   },
   "rules": {
    "type": "Json",
    "list": false,
    "optional": false,
    "relation": false
   },
   "note": {
    "type": "String",
    "list": false,
    "optional": true,
    "relation": false
   },
   "createdById": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "publishedAt": {
    "type": "DateTime",
    "list": false,
    "optional": true,
    "relation": false
   },
   "createdAt": {
    "type": "DateTime",
    "list": false,
    "optional": false,
    "relation": false
   },
   "logs": {
    "type": "RuleChangeLog",
    "list": true,
    "optional": false,
    "relation": true
   }
  },
  "RuleChangeLog": {
   "id": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "ruleSetId": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "ruleSet": {
    "type": "RuleSet",
    "list": false,
    "optional": false,
    "relation": true
   },
   "actorId": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "action": {
    "type": "String",
    "list": false,
    "optional": false,
    "relation": false
   },
   "diff": {
    "type": "Json",
    "list": false,
    "optional": true,
    "relation": false
   },
   "createdAt": {
    "type": "DateTime",
    "list": false,
    "optional": false,
    "relation": false
   }
  }
 },
 "routes": [
  "DELETE /cart",
  "DELETE /cart/items/:id",
  "GET /admin/categories",
  "GET /admin/dashboard",
  "GET /admin/orders",
  "GET /admin/orders/:id",
  "GET /admin/products",
  "GET /admin/promotions",
  "GET /admin/rulesets",
  "GET /admin/rulesets/:id",
  "GET /admin/skus",
  "GET /admin/users",
  "GET /admin/vouchers",
  "GET /auth/me",
  "GET /cart",
  "GET /categories",
  "GET /health",
  "GET /kits/options",
  "GET /me/profile",
  "GET /me/reviewable",
  "GET /me/viewed",
  "GET /orders",
  "GET /orders/:id",
  "GET /payments/vnpay/ipn",
  "GET /payments/vnpay/return",
  "GET /products",
  "GET /products/:slug",
  "GET /products/:slug/reviews",
  "GET /promotions",
  "PATCH /admin/categories/:id",
  "PATCH /admin/orders/:id/status",
  "PATCH /admin/products/:id",
  "PATCH /admin/products/:id/hide",
  "PATCH /admin/promotions/:id",
  "PATCH /admin/promotions/:id/active",
  "PATCH /admin/rulesets/:id",
  "PATCH /admin/skus/:id",
  "PATCH /admin/skus/:id/hide",
  "PATCH /admin/users/:id",
  "PATCH /admin/vouchers/:id",
  "PATCH /admin/vouchers/:id/active",
  "PATCH /cart/items/:id",
  "PATCH /me/profile",
  "POST /admin/categories",
  "POST /admin/products",
  "POST /admin/promotions",
  "POST /admin/rulesets",
  "POST /admin/rulesets/:id/publish",
  "POST /admin/skus",
  "POST /admin/vouchers",
  "POST /auth/login",
  "POST /auth/logout",
  "POST /auth/oauth",
  "POST /auth/register",
  "POST /cart/items",
  "POST /cart/items/bulk",
  "POST /kits/adjust",
  "POST /kits/ai-chat",
  "POST /kits/ai-parse",
  "POST /kits/build",
  "POST /me/password",
  "POST /me/viewed",
  "POST /orders",
  "POST /orders/:id/cancel",
  "POST /orders/preview",
  "POST /payments/vnpay/:orderId",
  "POST /reviews"
 ]
}
```
