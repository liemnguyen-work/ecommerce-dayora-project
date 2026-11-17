import { Inject, Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, Roles, RolesGuard } from '../auth/auth.guard.js';
import { AdminVouchersService } from './admin-vouchers.service.js';

@Controller('admin/vouchers')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminVouchersController {
  constructor(@Inject(AdminVouchersService) private readonly service: AdminVouchersService) {}

  @Get()
  list() {
    return this.service.list();
  }
}
