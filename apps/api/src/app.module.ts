
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CatalogModule } from './catalog/catalog.module';
import { PromotionsModule } from './promotions/promotions.module';
import { AdminCatalogModule } from './admin-catalog/admin-catalog.module.js';
import { AdminUsersModule } from './admin-users/admin-users.module.js';
import { MeModule } from './me/me.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    CatalogModule,
    AdminCatalogModule,
    AdminUsersModule,
    PromotionsModule,
    MeModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
