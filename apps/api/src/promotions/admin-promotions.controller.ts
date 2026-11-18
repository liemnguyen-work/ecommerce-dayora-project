import { Body, Controller, Get, Inject, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard, Roles, RolesGuard } from '../auth/auth.guard.js';
import { PromotionActiveDto, PromotionDto } from './admin-promotions.dto.js';
import { AdminPromotionsService } from './admin-promotions.service.js';

@Controller('admin/promotions')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminPromotionsController {
  constructor(@Inject(AdminPromotionsService) private readonly service: AdminPromotionsService) {}
  @Get() list() { return this.service.list(); }
  @Post() create(@Body(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true })) dto: PromotionDto) { return this.service.create(dto); }
  @Patch(':id/active') setActive(@Param('id') id: string, @Body(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true })) dto: PromotionActiveDto) { return this.service.update(id, dto); }
  @Patch(':id') update(@Param('id') id: string, @Body(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true })) dto: PromotionDto) { return this.service.update(id, dto); }
}
