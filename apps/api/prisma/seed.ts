import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { hashPassword } from '../src/auth/password.js';

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
async function main() {
  // TODO: Bước 2 - Category + ShippingRate
  // TODO: Bước 3 - Product + Sku
  // TODO: Bước 4 - Admin
  // TODO: Bước 5 - RuleSet v1
}
await main().finally(() => prisma.$disconnect());
