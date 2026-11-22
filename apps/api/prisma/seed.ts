
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { hashPassword } from '../src/auth/password.js';
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

// Task #151: Kiểu dữ liệu một SKU
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

// Các useType cần đối chiếu với quy tắc Kit Builder.
// TM-005 sử dụng quy ước biến thể tại mục 3.1.
// Giá TM-005 tạm dùng giá TM-002 theo phương án đã chọn.

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

type SeedScenario = 'PICNIC' | 'DATE' | 'BEACH';

const scenariosByProductName: Record<string, SeedScenario[]> = {
  // TM - Tham picnic (4 Product)
  'Thảm picnic gấp gọn 2 người': ['PICNIC', 'DATE', 'BEACH'],
  'Thảm picnic gấp gọn 4 người': ['PICNIC', 'BEACH'],
  'Thảm picnic gia đình 6 người': ['PICNIC', 'BEACH'],
  'Thảm picnic cá nhân': ['PICNIC', 'BEACH'],

  // BL - Binh va ly (4 Product)
  'Bình nước cá nhân 750 ml': ['PICNIC', 'BEACH'],
  'Ly picnic có nắp 350 ml': ['PICNIC', 'DATE'],
  'Bình nước cá nhân 500 ml': ['BEACH'],
  'Bình nước quai xách 1.000 ml': ['PICNIC', 'BEACH'],

  // HD - Hop dung thuc pham (4 Product)
  'Hộp đựng thực phẩm 1.000 ml': ['PICNIC', 'DATE'],
  'Hộp đựng thực phẩm 600 ml': ['PICNIC', 'DATE'],
  'Hộp đựng thực phẩm 1.500 ml': ['PICNIC', 'BEACH'],
  'Hộp đựng thực phẩm 2 ngăn 1.000 ml': ['PICNIC', 'DATE'],

  // GN - Tui giu nhiet (4 Product)
  'Túi giữ nhiệt xách tay 15 lít': ['PICNIC', 'BEACH'],
  'Túi giữ nhiệt nhỏ 8 lít': ['DATE', 'BEACH'],
  'Túi giữ nhiệt nhóm 25 lít': ['PICNIC', 'BEACH'],
  'Túi giữ nhiệt đeo vai 12 lít': ['PICNIC', 'BEACH'],

  // VS - Ve sinh (5 Product)
  'Túi thu gom rác 20 lít cuộn 20 túi': ['PICNIC', 'BEACH'],
  'Khăn giấy khô gói 100 tờ': ['PICNIC', 'DATE', 'BEACH'],
  'Khăn lau vải dùng lại': ['PICNIC', 'DATE'],
  'Túi thu gom rác 35 lít cuộn 15 túi': ['PICNIC', 'BEACH'],
  'Túi đựng đồ đã dùng 5 lít': ['BEACH'],

  // PK - Phu kien (5 Product)
  'Giỏ picnic có nắp 18 lít': ['PICNIC', 'DATE'],
  'Bộ muỗng nĩa đũa cá nhân': ['PICNIC', 'DATE'],
  'Túi tote đựng đồ picnic': ['PICNIC', 'DATE', 'BEACH'],
  'Kẹp cố định thảm bộ 4 chiếc': ['PICNIC', 'BEACH'],
  'Dây đai cuộn thảm': ['PICNIC', 'BEACH'],
};

function validateScenarioAssignments(): void {
  const productNames = new Set(items.map(getProductName));
  const assignedNames = Object.keys(scenariosByProductName);

  if (productNames.size !== 26 || assignedNames.length !== 26) {
    throw new Error(
      'Scenario mapping must contain exactly 26 products',
    );
  }

  for (const productName of productNames) {
    const scenarios = scenariosByProductName[productName];

    if (!scenarios || scenarios.length === 0) {
      throw new Error(
        `Missing scenarios for product: ${productName}`,
      );
    }

    if (new Set(scenarios).size !== scenarios.length) {
      throw new Error(
        `Duplicate scenarios for product: ${productName}`,
      );
    }
  }

  for (const productName of assignedNames) {
    if (!productNames.has(productName)) {
      throw new Error(
        `Unknown product in scenario mapping: ${productName}`,
      );
    }
  }
}

// Tạo slug từ tên Product
function makeSlug(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function getProductName(item: Item): string {
  return item.productName ?? item.name;
}

// Bốn cặp SKU dùng chung một Product theo mục 3.1
const variantPairs = [
  ['TM-002', 'TM-005'],
  ['BL-002', 'BL-005'],
  ['HD-001', 'HD-005'],
  ['GN-001', 'GN-004'],
] as const;

// Kiểm tra toàn bộ danh mục trước khi ghi database
function validateCatalog(): void {
  const groups = ['TM', 'BL', 'HD', 'GN', 'VS', 'PK'];
  const codes = items.map((item) => item.code);

  // 1. Chính xác 30 SKU
  if (items.length !== 30) {
    throw new Error('Catalog must contain exactly 30 SKUs');
  }

  // 2. Mã SKU không trùng
  if (new Set(codes).size !== 30) {
    throw new Error('Catalog contains duplicate SKU codes');
  }

  // 3. Mã SKU theo chuẩn TM-001, BL-001...
  for (const item of items) {
    if (!/^(TM|BL|HD|GN|VS|PK)-00[1-5]$/.test(item.code)) {
      throw new Error(`Invalid SKU code: ${item.code}`);
    }
  }

  // 4. Sáu nhóm, mỗi nhóm đúng năm SKU
  for (const group of groups) {
    const groupItems = items.filter((item) =>
      item.code.startsWith(`${group}-`)
    );

    if (groupItems.length !== 5) {
      throw new Error(`Group ${group} must contain 5 SKUs`);
    }

    for (let index = 1; index <= 5; index++) {
      const expected = `${group}-${String(index).padStart(3, '0')}`;

      if (!codes.includes(expected)) {
        throw new Error(`Missing SKU: ${expected}`);
      }
    }
  }

  // 5. Kiểm tra trường bắt buộc và giá trị số
  for (const item of items) {
    if (
      !item.name.trim() ||
      !item.material.trim() ||
      !item.color.trim() ||
      !item.unit.trim() ||
      !item.useType.trim()
    ) {
      throw new Error(`Missing required data: ${item.code}`);
    }

    if (!Number.isInteger(item.price) || item.price <= 0) {
      throw new Error(`Invalid price: ${item.code}`);
    }

    const integerFields = [
      'unitQty',
      'volumeMl',
      'capacityPeople',
    ] as const;

    for (const field of integerFields) {
      const value = item[field];

      if (
        value !== undefined &&
        (!Number.isInteger(value) || value <= 0)
      ) {
        throw new Error(`Invalid ${field}: ${item.code}`);
      }
    }

    const dimensionFields = [
      'lengthCm',
      'widthCm',
      'heightCm',
    ] as const;

    for (const field of dimensionFields) {
      const value = item[field];

      if (
        value !== undefined &&
        (!Number.isFinite(value) || value <= 0)
      ) {
        throw new Error(`Invalid ${field}: ${item.code}`);
      }
    }
  }

  // 6. Kiểm tra đúng bốn cặp biến thể
  for (const [firstCode, secondCode] of variantPairs) {
    const first = items.find((item) => item.code === firstCode);
    const second = items.find((item) => item.code === secondCode);

    if (!first || !second) {
      throw new Error(
        `Missing variant pair: ${firstCode}, ${secondCode}`
      );
    }

    const firstSlug = makeSlug(getProductName(first));
    const secondSlug = makeSlug(getProductName(second));

    if (firstSlug !== secondSlug) {
      throw new Error(
        `Variant pair must share Product: ${firstCode}, ${secondCode}`
      );
    }
  }

  // 7. Kiểm tra không ghép nhầm các SKU khác
  const slugGroups = new Map<string, string[]>();

  for (const item of items) {
    const slug = makeSlug(getProductName(item));
    const existingCodes = slugGroups.get(slug) ?? [];

    existingCodes.push(item.code);
    slugGroups.set(slug, existingCodes);
  }

  if (slugGroups.size !== 26) {
    throw new Error('Catalog must contain 26 unique Product slugs');
  }

  const expectedPairs = new Set(
    variantPairs.map(([a, b]) => [a, b].sort().join('|'))
  );

  for (const skuCodes of slugGroups.values()) {
    if (skuCodes.length === 1) {
      continue;
    }

    const pairKey = [...skuCodes].sort().join('|');

    if (skuCodes.length !== 2 || !expectedPairs.has(pairKey)) {
      throw new Error(
        `Unexpected Product variants: ${skuCodes.join(', ')}`
      );
    }
  }

  console.log('Catalog validated: 30 SKUs and 26 Products');
}

async function seedAdmin(): Promise<string | null> {
  const email = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!email || !password) {
    console.log(
      'Thiếu SEED_ADMIN_EMAIL hoặc SEED_ADMIN_PASSWORD; bỏ qua admin và RuleSet'
    );
    return null;
  }

  if (password.length < 8) {
    throw new Error('SEED_ADMIN_PASSWORD phải có ít nhất 8 ký tự');
  }
  const passwordHash = await hashPassword(password);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      role: 'ADMIN',
    },
    create: {
      email,
      passwordHash,
      fullName: 'Admin',
      role: 'ADMIN',
    },
  });

  console.log('Admin seed completed');
  return admin.id;
}
// Kiểm tra dữ liệu thực tế sau khi upsert
async function verifyCatalogInDatabase(): Promise<void> {
  const [dbProducts, dbSkus] = await Promise.all([
    prisma.product.count(),
    prisma.sku.findMany({
      select: { code: true },
    }),
  ]);

  const expectedCodes = new Set(
    items.map((item) => `DAY-${item.code}`)
  );

  const actualCodes = new Set(dbSkus.map((sku) => sku.code));

  const missingCodes = [...expectedCodes].filter(
    (code) => !actualCodes.has(code)
  );

  const unexpectedCodes = [...actualCodes].filter(
    (code) => !expectedCodes.has(code)
  );

  if (
    dbProducts !== 26 ||
    dbSkus.length !== 30 ||
    missingCodes.length > 0 ||
    unexpectedCodes.length > 0
  ) {
    throw new Error(
      [
        `Database catalog mismatch: ${dbProducts} Products, ${dbSkus.length} SKUs`,
        `Missing SKU codes: ${missingCodes.join(', ') || 'none'}`,
        `Unexpected SKU codes: ${unexpectedCodes.join(', ') || 'none'}`,
      ].join('\n')
    );
  }

  console.log('Database verified: 26 Products and 30 SKUs');
}


type Scenario = 'PICNIC' | 'DATE' | 'BEACH';

type KitRule = {
  scenario: Scenario;
  useType: string;
  essential: boolean;
  mode: 'shared' | 'per_person';
  perPerson: number;
  unit: string;
};

const scenarios: Scenario[] = ['PICNIC', 'DATE', 'BEACH'];

// Task #153: RuleSet v1
// Định mức demo theo tài liệu KIT-RULES-PROPOSAL.
// TC mặc định không được tự thêm vào bộ kit.

const ruleTemplates = [
  {
    useType: 'seating',
    mode: 'shared',
    perPerson: 1,
    unit: 'người được đáp ứng',
  },
  {
    useType: 'drink_personal',
    mode: 'per_person',
    perPerson: 1,
    unit: 'bình',
  },
  {
    useType: 'food_container',
    mode: 'per_person',
    perPerson: 1,
    unit: 'hộp',
  },
  {
    useType: 'utensils',
    mode: 'per_person',
    perPerson: 1,
    unit: 'bộ',
  },
  {
    useType: 'drink_cup',
    mode: 'per_person',
    perPerson: 1,
    unit: 'ly',
  },
  {
    useType: 'tissue',
    mode: 'per_person',
    perPerson: 5,
    unit: 'tờ',
  },
  {
    useType: 'trash_bag',
    mode: 'per_person',
    perPerson: 1,
    unit: 'túi rời',
  },
] as const;

// Phân loại thiết yếu theo tài liệu đã chọn
const essentialByScenario: Record<Scenario, string[]> = {
  PICNIC: [
    'seating',
    'drink_personal',
    'food_container',
    'tissue',
    'trash_bag',
  ],
  DATE: [
    'seating',
    'drink_personal',
    'tissue',
    'trash_bag',
  ],
  BEACH: [
    'seating',
    'drink_personal',
    'tissue',
    'trash_bag',
  ],
};

// Tạo 21 quy tắc: 3 tình huống x 7 công dụng
const rules: KitRule[] = scenarios.flatMap((scenario) =>
  ruleTemplates.map((template) => ({
    ...template,
    scenario,
    essential: essentialByScenario[scenario].includes(
      template.useType
    ),

    // BEACH cần 10 tờ khăn giấy/người
    perPerson:
      scenario === 'BEACH' && template.useType === 'tissue'
        ? 10
        : template.perPerson,
  }))
);

function validateRules(rulesToValidate: KitRule[]): void {
  if (rulesToValidate.length !== 21) {
    throw new Error('RuleSet v1 must contain exactly 21 rules');
  }

  for (const scenario of scenarios) {
    const scenarioRules = rulesToValidate.filter(
      (rule) => rule.scenario === scenario
    );

    if (scenarioRules.length !== 7) {
      throw new Error(
        `${scenario} must contain exactly 7 rules`
      );
    }

    const useTypes = scenarioRules.map(
      (rule) => rule.useType
    );

    if (new Set(useTypes).size !== 7) {
      throw new Error(
        `Duplicate useType in scenario ${scenario}`
      );
    }

    for (const rule of scenarioRules) {
      if (
        !Number.isFinite(rule.perPerson) ||
        rule.perPerson <= 0 ||
        !rule.unit.trim()
      ) {
        throw new Error(
          `Invalid rule: ${scenario}/${rule.useType}`
        );
      }
    }
  }

  console.log('RuleSet validated: 21 rules');
}

async function seedRuleSet(adminId: string): Promise<void> {
  validateRules(rules);

  const existing = await prisma.ruleSet.findUnique({
    where: { version: 1 },
  });

  if (existing) {
    if (
      existing.status !== 'PUBLISHED' ||
      !Array.isArray(existing.rules) ||
      existing.rules.length !== 21
    ) {
      throw new Error(
        'RuleSet v1 already exists with unexpected data. Review it before publishing.'
      );
    }

    console.log('RuleSet v1 already published');
    return;
  }

  await prisma.ruleSet.upsert({
    where: { version: 1 },
    update: {},
    create: {
      version: 1,
      status: 'PUBLISHED',
      rules: rules.map((rule) => ({ ...rule })),
      createdById: adminId,
      publishedAt: new Date(),
      logs: {
        create: {
          actorId: adminId,
          action: 'PUBLISH',
        },
      },
    },
  });

  console.log('RuleSet v1 published: 21 rules');
}
async function main(): Promise<void> {
  // Kiểm tra dữ liệu trước khi ghi vào database
  validateCatalog();
  validateScenarioAssignments();

  // Task #150: Seed 6 Category
  const categoryIds = new Map<string, string>();

  for (const [i, [code, name]] of categories.entries()) {
    const category = await prisma.category.upsert({
      where: { code },
      update: {
        name,
        sortOrder: i,
      },
      create: {
        code,
        name,
        sortOrder: i,
      },
    });

    categoryIds.set(code, category.id);
  }

  // Task #150: Seed 3 ShippingRate
  for (const rate of shippingRates) {
    await prisma.shippingRate.upsert({
      where: { zone: rate.zone },
      update: {
        fee: rate.fee,
        freeFromValue: rate.freeFromValue,
      },
      create: {
        zone: rate.zone,
        fee: rate.fee,
        freeFromValue: rate.freeFromValue,
      },
    });
  }

  // Task #151: Seed 26 Product và 30 Sku
  for (const item of items) {
    const group = item.code.split('-')[0];
    const categoryId = categoryIds.get(group);

    if (!categoryId) {
      throw new Error(`Unknown category: ${item.code}`);
    }

    const productName = getProductName(item);
    const slug = makeSlug(productName);

    // Chỉ các trường cần đồng bộ khi chạy seed lại
const productData = {
  name: productName,
  categoryId,
  material: item.material,
};

const scenarios = scenariosByProductName[productName];

if (!scenarios || scenarios.length === 0) {
  throw new Error(
    `Missing scenarios for product: ${productName}`,
  );
}
const product = await prisma.product.upsert({
  where: { slug },
  update: {
    ...productData,
    scenarios: {
      set: scenarios,
    },
  },
  create: {
    slug,
    ...productData,
    scenarios,
  },
});
    const code = `DAY-${item.code}`;

    // Không đưa stock và reserved vào skuData
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

      // Không thay đổi tồn kho khi SKU đã tồn tại
      update: skuData,

      // Chỉ khởi tạo tồn kho ở lần tạo SKU đầu tiên
      create: {
        code,
        ...skuData,
        stock: 50,
        reserved: 0,
      },
    });
  }
  console.log('Product and Sku seed completed');

  // Kiểm tra số lượng và mã SKU thực tế trong database
  await verifyCatalogInDatabase();

  // TODO: Bước 4 - Admin
  // Task #152: Seed Admin
  const adminId = await seedAdmin();

  // Task #153: Seed RuleSet v1
  if (adminId) {
    await seedRuleSet(adminId);
  } else {
    console.warn(
      'Không có Admin từ biến môi trường; bỏ qua RuleSet v1'
    );
  }
}
await main().finally(() => prisma.$disconnect());
