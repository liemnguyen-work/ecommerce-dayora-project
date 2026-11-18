import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AdminVouchersController } from './admin-vouchers.controller.js';
import { AdminVouchersService } from './admin-vouchers.service.js';

@Module({ imports: [AuthModule, PrismaModule], controllers: [AdminVouchersController], providers: [AdminVouchersService] })
export class AdminVouchersModule {}
