import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module.js';
import { CartModule } from '../cart/cart.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { OrdersController } from './orders.controller.js';
import { OrdersService } from './orders.service.js';
import { CheckoutService } from './checkout.service.js';

@Module({
  imports: [PrismaModule, AuthModule, CartModule],
  controllers: [OrdersController],
  providers: [OrdersService, CheckoutService],
  exports: [OrdersService],
})
export class OrdersModule {}
