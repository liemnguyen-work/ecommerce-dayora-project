import { Body, Controller, Get, Inject, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard, Roles, RolesGuard } from '../auth/auth.guard.js';
import { ActiveDto, CreateVoucherDto, VoucherQueryDto } from './admin-vouchers.dto.js';
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

  @Post()
  create(@Body(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true })) dto: CreateVoucherDto) {
    return this.service.create(dto);
  }
  @Patch(':id/active')
  active(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true })) dto: ActiveDto,
  ) {
    return this.service.update(id, dto);
  }
}
