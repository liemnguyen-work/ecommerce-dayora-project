import 'dotenv/config';
import { defineConfig } from 'prisma/config';

// Migration dùng DIRECT_URL (Supabase port 5432);
// app chạy dùng DATABASE_URL (pooler 6543).
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: process.env['DIRECT_URL'] ?? process.env['DATABASE_URL'],
  },
});
