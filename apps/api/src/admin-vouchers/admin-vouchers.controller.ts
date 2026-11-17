import { Body, Controller, Get, Inject, Param, Patch, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard, Roles, RolesGuard } from '../auth/auth.guard.js';
import { ActiveDto, VoucherQueryDto } from './admin-vouchers.dto.js';
import { AdminVouchersService } from './admin-vouchers.service.js';

@Controller('admin/vouchers')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminVouchersController {
  constructor(@Inject(AdminVouchersService) private readonly service: AdminVouchersService) {}

  @Get()
  list(@Query(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true })) query: VoucherQueryDto) {
    return this.service.list(query);
  }

  @Patch(':id/active')
  active(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true })) dto: ActiveDto,
  ) {
    return this.service.update(id, dto);
  }
}
