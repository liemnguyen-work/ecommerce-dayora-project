import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  OrdersQueryDto,
  UpdateStatusDto,
} from './admin-orders.dto.js';

import { AdminOrdersService } from './admin-orders.service.js';

// Thêm import JwtAuthGuard, RolesGuard và Roles
// theo đúng đường dẫn tìm được ở Bước 1.
import {
  JwtAuthGuard,
  RolesGuard,
  Roles,
} from '../auth/auth.guard.js';
@Controller('admin/orders')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminOrdersController {
  constructor(private readonly orders: AdminOrdersService) {}

  @Get()
  list(@Query() query: OrdersQueryDto) {
    return this.orders.list(query);
  }

  @Get(':id')
  detail(@Param('id') id: string) {
    return this.orders.detail(id);
  }

  @Patch(':id/status')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateStatusDto,
  ) {
    // #266 sẽ triển khai máy trạng thái và ghi log.
    void id;
    void dto;

    throw new Error('Chưa triển khai chuyển trạng thái D08');
  }
}
