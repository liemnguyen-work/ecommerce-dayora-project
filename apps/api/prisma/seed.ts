
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

// Task #150: 6 Category
const categories = [
  ['TM', 'Thảm picnic'],
  ['BL', 'Bình nước và ly'],
  ['HD', 'Hộp đựng thực phẩm'],
  ['GN', 'Túi giữ nhiệt'],
  ['VS', 'Vật dụng vệ sinh'],
  ['PK', 'Phụ kiện tiện ích'],
] as const;

// Task #150: 3 ShippingRate
const shippingRates = [
  {
    zone: 'HCM_INNER',
    label: 'TP.HCM nội thành',
    fee: 20000,
    freeFromValue: 500000,
  },
  {
    zone: 'HCM_OUTER',
    label: 'TP.HCM ngoại thành',
    fee: 30000,
    freeFromValue: 500000,
  },
  {
    zone: 'OTHER',
    label: 'Tỉnh/thành khác',
    fee: 40000,
    freeFromValue: null,
  },
];

// Task #151: Khai báo dữ liệu SKU
type Item = {
  code: string;
  name: string;
  productName?: string;
  material: string;
  color: string;
  price: number;
  unit: string;
  unitQty?: number;
  lengthCm?: number;
  widthCm?: number;
  heightCm?: number;
  volumeMl?: number;
  capacityPeople?: number;
  useType: string;
};

// Mã useType là đề xuất, cần xác nhận với nhóm.
// TM-005 tạm ghép Product với TM-002 theo mục 3.1.
// Cần PM xác nhận vì bảng 3.3.1 mô tả TM-005 khác kích thước.

const items: Item[] = [
  // TM - Thảm picnic
  {
    code: 'TM-001',
    name: 'Thảm picnic gấp gọn 2 người',
    material: 'Vải polyester, lớp đế PE',
    color: 'Kem – teal',
    price: 149000,
    unit: 'Tấm',
    lengthCm: 140,
    widthCm: 150,
    capacityPeople: 2,
    useType: 'seating',
  },
  {
    code: 'TM-002',
    name: 'Thảm picnic gấp gọn 4 người',
    material: 'Vải polyester, lớp đế PE',
    color: 'Caro kem – olive',
    price: 229000,
    unit: 'Tấm',
    lengthCm: 200,
    widthCm: 200,
    capacityPeople: 4,
    useType: 'seating',
  },
  {
    code: 'TM-003',
    name: 'Thảm picnic gia đình 6 người',
    material: 'Vải polyester, lớp đế PE',
    color: 'Caro kem – đỏ đất',
    price: 319000,
    unit: 'Tấm',
    lengthCm: 240,
    widthCm: 240,
    capacityPeople: 6,
    useType: 'seating',
  },
  {
    code: 'TM-004',
    name: 'Thảm picnic cá nhân',
    material: 'Vải polyester, lớp đế PE',
    color: 'Olive',
    price: 89000,
    unit: 'Tấm',
    lengthCm: 90,
    widthCm: 140,
    capacityPeople: 1,
    useType: 'seating',
  },
  
{
  code: 'TM-005',
  name: 'Thảm picnic gấp gọn 4 người',
  productName: 'Thảm picnic gấp gọn 4 người',
  material: 'Vải polyester, lớp đế PE',
  color: 'Caro be - xanh',
  price: 229000,
  unit: 'Tấm',
  lengthCm: 200,
  widthCm: 200,
  capacityPeople: 4,
  useType: 'seating',
},

  // BL - Bình nước và ly
  {
    code: 'BL-001',
    name: 'Bình nước cá nhân 750 ml',
    material: 'Thân inox, nắp PP',
    color: 'Teal',
    price: 159000,
    unit: 'Bình',
    volumeMl: 750,
    heightCm: 25,
    useType: 'drink_personal',
  },
  {
    code: 'BL-002',
    name: 'Ly picnic có nắp 350 ml',
    material: 'Thân inox, nắp PP',
    color: 'Kem',
    price: 79000,
    unit: 'Ly',
    volumeMl: 350,
    heightCm: 11,
    useType: 'drink_cup',
  },
  {
    code: 'BL-003',
    name: 'Bình nước cá nhân 500 ml',
    material: 'Thân inox, nắp PP',
    color: 'Đỏ đất',
    price: 129000,
    unit: 'Bình',
    volumeMl: 500,
    heightCm: 22,
    useType: 'drink_personal',
  },
  {
    code: 'BL-004',
    name: 'Bình nước quai xách 1.000 ml',
    material: 'Thân inox, nắp PP',
    color: 'Olive',
    price: 199000,
    unit: 'Bình',
    volumeMl: 1000,
    heightCm: 28,
    useType: 'drink_personal',
  },
  {
    code: 'BL-005',
    name: 'Ly picnic có nắp 350 ml màu teal',
    productName: 'Ly picnic có nắp 350 ml',
    material: 'Thân inox, nắp PP',
    color: 'Teal',
    price: 79000,
    unit: 'Ly',
    volumeMl: 350,
    heightCm: 11,
    useType: 'drink_cup',
  },

  // HD - Hộp đựng thực phẩm
  {
    code: 'HD-001',
    name: 'Hộp đựng thực phẩm 1.000 ml',
    material: 'Thân và nắp PP, gioăng silicone',
    color: 'Nắp kem – thân trong',
    price: 89000,
    unit: 'Hộp',
    volumeMl: 1000,
    lengthCm: 20,
    widthCm: 14,
    heightCm: 7,
    useType: 'food_container',
  },
  {
    code: 'HD-002',
    name: 'Hộp đựng thực phẩm 600 ml',
    material: 'Thân và nắp PP, gioăng silicone',
    color: 'Nắp teal – thân trong',
    price: 59000,
    unit: 'Hộp',
    volumeMl: 600,
    lengthCm: 16,
    widthCm: 11,
    heightCm: 6,
    useType: 'food_container',
  },
  {
    code: 'HD-003',
    name: 'Hộp đựng thực phẩm 1.500 ml',
    material: 'Thân và nắp PP, gioăng silicone',
    color: 'Nắp olive – thân trong',
    price: 119000,
    unit: 'Hộp',
    volumeMl: 1500,
    lengthCm: 22,
    widthCm: 16,
    heightCm: 8,
    useType: 'food_container',
  },
  {
    code: 'HD-004',
    name: 'Hộp đựng thực phẩm 2 ngăn 1.000 ml',
    material: 'PP',
    color: 'Kem',
    price: 99000,
    unit: 'Hộp',
    volumeMl: 1000,
    lengthCm: 21,
    widthCm: 15,
    heightCm: 7,
    useType: 'food_container',
  },
  {
    code: 'HD-005',
    name: 'Hộp đựng thực phẩm 1.000 ml nắp teal',
    productName: 'Hộp đựng thực phẩm 1.000 ml',
    material: 'Thân và nắp PP, gioăng silicone',
    color: 'Nắp teal – thân trong',
    price: 89000,
    unit: 'Hộp',
    volumeMl: 1000,
    lengthCm: 20,
    widthCm: 14,
    heightCm: 7,
    useType: 'food_container',
  },

  // GN - Túi giữ nhiệt
  {
    code: 'GN-001',
    name: 'Túi giữ nhiệt xách tay 15 lít',
    material: 'Vải polyester, đệm PE, lớp lót phủ nhôm',
    color: 'Teal',
    price: 249000,
    unit: 'Túi',
    volumeMl: 15000,
    lengthCm: 30,
    widthCm: 22,
    heightCm: 23,
    useType: 'cooler',
  },
  {
    code: 'GN-002',
    name: 'Túi giữ nhiệt nhỏ 8 lít',
    material: 'Vải polyester, đệm PE, lớp lót phủ nhôm',
    color: 'Kem',
    price: 169000,
    unit: 'Túi',
    volumeMl: 8000,
    lengthCm: 25,
    widthCm: 18,
    heightCm: 18,
    useType: 'cooler',
  },
  {
    code: 'GN-003',
    name: 'Túi giữ nhiệt nhóm 25 lít',
    material: 'Vải polyester, đệm PE, lớp lót phủ nhôm',
    color: 'Olive',
    price: 329000,
    unit: 'Túi',
    volumeMl: 25000,
    lengthCm: 36,
    widthCm: 26,
    heightCm: 27,
    useType: 'cooler',
  },
  {
    code: 'GN-004',
    name: 'Túi giữ nhiệt xách tay 15 lít màu kem',
    productName: 'Túi giữ nhiệt xách tay 15 lít',
    material: 'Vải polyester, đệm PE, lớp lót phủ nhôm',
    color: 'Kem',
    price: 249000,
    unit: 'Túi',
    volumeMl: 15000,
    lengthCm: 30,
    widthCm: 22,
    heightCm: 23,
    useType: 'cooler',
  },
  {
    code: 'GN-005',
    name: 'Túi giữ nhiệt đeo vai 12 lít',
    material: 'Vải polyester, đệm PE, lớp lót phủ nhôm',
    color: 'Đỏ đất',
    price: 219000,
    unit: 'Túi',
    volumeMl: 12000,
    lengthCm: 28,
    widthCm: 20,
    heightCm: 22,
    useType: 'cooler',
  },

  // VS - Vật dụng vệ sinh
  {
    code: 'VS-001',
    name: 'Túi thu gom rác 20 lít cuộn 20 túi',
    material: 'Nhựa PE',
    color: 'Xanh đậm',
    price: 29000,
    unit: 'Cuộn',
    unitQty: 20,
    volumeMl: 20000,
    lengthCm: 45,
    widthCm: 50,
    useType: 'waste_bag',
  },
  {
    code: 'VS-002',
    name: 'Khăn giấy khô gói 100 tờ',
    material: 'Giấy',
    color: 'Trắng – bao kem',
    price: 19000,
    unit: 'Gói',
    unitQty: 100,
    lengthCm: 18,
    widthCm: 20,
    useType: 'cleaning',
  },
  {
    code: 'VS-003',
    name: 'Khăn lau vải dùng lại',
    material: 'Vải cotton',
    color: 'Kem',
    price: 39000,
    unit: 'Khăn',
    lengthCm: 30,
    widthCm: 30,
    useType: 'cleaning',
  },
  {
    code: 'VS-004',
    name: 'Túi thu gom rác 35 lít cuộn 15 túi',
    material: 'Nhựa PE',
    color: 'Đen',
    price: 39000,
    unit: 'Cuộn',
    unitQty: 15,
    volumeMl: 35000,
    lengthCm: 55,
    widthCm: 65,
    useType: 'waste_bag',
  },
  {
    code: 'VS-005',
    name: 'Túi đựng đồ đã dùng 5 lít',
    material: 'Vải polyester',
    color: 'Olive',
    price: 49000,
    unit: 'Túi',
    volumeMl: 5000,
    lengthCm: 22,
    widthCm: 12,
    heightCm: 20,
    useType: 'used_items',
  },

  // PK - Phụ kiện tiện ích
  {
    code: 'PK-001',
    name: 'Giỏ picnic có nắp 18 lít',
    material: 'Mây, vải cotton',
    color: 'Mây tự nhiên – lót kem',
    price: 289000,
    unit: 'Giỏ',
    volumeMl: 18000,
    lengthCm: 38,
    widthCm: 26,
    heightCm: 25,
    useType: 'carry',
  },
  {
    code: 'PK-002',
    name: 'Bộ muỗng nĩa đũa cá nhân',
    material: 'Inox, túi vải polyester',
    color: 'Inox bạc – túi teal',
    price: 59000,
    unit: 'Bộ',
    unitQty: 1,
    useType: 'utensils',
  },
  {
    code: 'PK-003',
    name: 'Túi tote đựng đồ picnic',
    material: 'Vải canvas cotton',
    color: 'Kem',
    price: 89000,
    unit: 'Túi',
    lengthCm: 38,
    widthCm: 12,
    heightCm: 40,
    useType: 'carry',
  },
  {
    code: 'PK-004',
    name: 'Kẹp cố định thảm bộ 4 chiếc',
    material: 'Nhựa PP',
    color: 'Teal',
    price: 39000,
    unit: 'Bộ',
    unitQty: 4,
    lengthCm: 12,
    widthCm: 3,
    useType: 'mat_accessory',
  },
  {
    code: 'PK-005',
    name: 'Dây đai cuộn thảm',
    material: 'Dây polyester, khóa nhựa PP',
    color: 'Olive',
    price: 29000,
    unit: 'Dây',
    widthCm: 2.5,
    useType: 'mat_accessory',
  },
];

// Chuyển tên sản phẩm thành slug
function makeSlug(name: string) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Tên Product gốc dùng chung cho các biến thể
function getProductName(item: Item) {
  return item.productName ?? item.name;
}

// Kiểm tra dữ liệu trước khi ghi database
function validateCatalog() {
  const groups = ['TM', 'BL', 'HD', 'GN', 'VS', 'PK'];

  const codes = items.map((item) => item.code);

  if (items.length !== 30) {
    throw new Error('Catalog must contain exactly 30 SKUs');
  }

  if (new Set(codes).size !== 30) {
    throw new Error('Catalog contains duplicate SKU codes');
  }

  for (const group of groups) {
    const groupItems = items.filter((item) =>
      item.code.startsWith(`${group}-`)
    );

    if (groupItems.length !== 5) {
      throw new Error(`Group ${group} must contain 5 SKUs`);
    }

    const expectedCodes = Array.from(
      { length: 5 },
      (_, index) => `${group}-${String(index + 1).padStart(3, '0')}`
    );

    for (const expected of expectedCodes) {
      if (!codes.includes(expected)) {
        throw new Error(`Missing SKU: ${expected}`);
      }
    }
  }

  const slugs = items.map((item) =>
    makeSlug(getProductName(item))
  );

  if (new Set(slugs).size !== 26) {
    throw new Error('Catalog must contain 26 unique Product slugs');
  }

  for (const item of items) {
    if (!item.name.trim() || !item.color.trim()) {
      throw new Error(`Missing product information: ${item.code}`);
    }

    if (!item.useType.trim() || !item.material.trim()) {
      throw new Error(`Missing Kit Builder data: ${item.code}`);
    }

    if (!Number.isInteger(item.price) || item.price <= 0) {
      throw new Error(`Invalid price: ${item.code}`);
    }
  }

  console.log('Catalog validated: 30 SKUs and 26 Products');
}

async function main() {
  // Kiểm tra danh mục trước khi ghi dữ liệu
  validateCatalog();

  // Task #150: Seed Category
  const categoryIds = new Map<string, string>();

  for (const [i, [code, name]] of categories.entries()) {
    const category = await prisma.category.upsert({
      where: { code },
      update: { name },
      create: {
        code,
        name,
        sortOrder: i,
      },
    });

    categoryIds.set(code, category.id);
  }

  // Task #150: Seed ShippingRate
  for (const r of shippingRates) {
    await prisma.shippingRate.upsert({
      where: { zone: r.zone },
      update: {
        fee: r.fee,
        freeFromValue: r.freeFromValue,
      },
      create: {
        zone: r.zone,
        fee: r.fee,
        freeFromValue: r.freeFromValue,
      },
    });
  }

  // Task #151: Seed 26 Product và 30 Sku
  for (const item of items) {
    const group = item.code.split('-')[0];
    const categoryId = categoryIds.get(group);

    if (!categoryId) {
      throw new Error(`Unknown category for ${item.code}`);
    }

    const productName = getProductName(item);
    const slug = makeSlug(productName);

    const productData = {
      name: productName,
      categoryId,
      material: item.material,
      scenarios: [],
    };

    const product = await prisma.product.upsert({
      where: { slug },
      update: productData,
      create: {
        slug,
        ...productData,
      },
    });

    const code = `DAY-${item.code}`;

    // Không đưa stock hoặc reserved vào skuData
    const skuData = {
      productId: product.id,
      color: item.color,
      price: item.price,
      unit: item.unit,
      unitQty: item.unitQty ?? 1,
      lengthCm: item.lengthCm ?? null,
      widthCm: item.widthCm ?? null,
      heightCm: item.heightCm ?? null,
      volumeMl: item.volumeMl ?? null,
      capacityPeople: item.capacityPeople ?? null,
      useType: item.useType,
      imageUrl: `/products/${code}.jpg`,
    };

    await prisma.sku.upsert({
      where: { code },
      update: skuData,
      create: {
        code,
        ...skuData,
        stock: 50,
        reserved: 0,
      },
    });
  }

  console.log('Product and Sku seed completed');

  // TODO: Bước 4 - Admin
  // TODO: Bước 5 - RuleSet v1
}

await main().finally(() => prisma.$disconnect());
