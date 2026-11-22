import { ReviewsModule } from './reviews/reviews.module.js';
import { PaymentsModule } from './payments/payments.module.js';
import { CartModule } from './cart/cart.module.js';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CatalogModule } from './catalog/catalog.module';
import { PromotionsModule } from './promotions/promotions.module';
import { AdminCatalogModule } from './admin-catalog/admin-catalog.module.js';
import { AdminUsersModule } from './admin-users/admin-users.module.js';
import { MeModule } from './me/me.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { AdminVouchersModule } from './admin-vouchers/admin-vouchers.module.js';
import { AdminPromotionsModule } from './promotions/admin-promotions.module.js';
import { AdminOrdersModule } from './admin-orders/admin-orders.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    CatalogModule,
    CartModule,
    AdminCatalogModule,
    AdminUsersModule,
    PromotionsModule,
    MeModule,
    OrdersModule,
    AdminVouchersModule,
    AdminPromotionsModule,
    AdminOrdersModule,
    PaymentsModule,
    ReviewsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
