import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { hashPassword } from '../src/auth/password.js';

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
// Dữ liệu 6 nhóm hàng theo D02
const categories = [
  ['TM', 'Thảm picnic'],
  ['BL', 'Bình nước và ly'],
  ['HD', 'Hộp đựng thực phẩm'],
  ['GN', 'Túi giữ nhiệt'],
  ['VS', 'Vật dụng vệ sinh'],
  ['PK', 'Phụ kiện tiện ích'],
] as const;
// Dữ liệu 3 mức phí giao hàng theo D02
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
async function main() {
  // TODO: Bước 2 - Seed 6 Category + Seed 3 ShippingRate
for (const [i, [code, name]] of categories.entries()) {
  await prisma.category.upsert({
    where: { code },
    update: { name },
    create: {
      code,
      name,
      sortOrder: i,
    },
  });
}
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
  // TODO: Bước 3 - Product + Sku
  // TODO: Bước 4 - Admin
  // TODO: Bước 5 - RuleSet v1
}
await main().finally(() => prisma.$disconnect());

