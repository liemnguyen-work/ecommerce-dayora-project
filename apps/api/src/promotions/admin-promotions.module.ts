import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AdminPromotionsController } from './admin-promotions.controller.js';
import { AdminPromotionsService } from './admin-promotions.service.js';

@Module({ imports: [AuthModule, PrismaModule], controllers: [AdminPromotionsController], providers: [AdminPromotionsService] })
export class AdminPromotionsModule {}
