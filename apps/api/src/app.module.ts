
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CatalogModule } from './catalog/catalog.module';
import { AdminUsersModule } from './admin-users/admin-users.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    CatalogModule,
    AdminUsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
