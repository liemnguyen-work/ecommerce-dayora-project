import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthController } from './auth.controller.js';
import { JwtAuthGuard, RolesGuard } from './auth.guard.js';
import { AuthService } from './auth.service.js';
import { AuthRateLimit } from './auth-rate-limit.js';

@Module({
  imports: [ConfigModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, RolesGuard, AuthRateLimit],
  exports: [AuthService, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}
