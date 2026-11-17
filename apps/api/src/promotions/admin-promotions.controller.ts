import { Inject, Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, Roles, RolesGuard } from '../auth/auth.guard.js';
import { AdminPromotionsService } from './admin-promotions.service.js';

@Controller('admin/promotions')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminPromotionsController {
  constructor(@Inject(AdminPromotionsService) private readonly service: AdminPromotionsService) {}

  @Get()
  list() {
    return this.service.list();
  }
}
