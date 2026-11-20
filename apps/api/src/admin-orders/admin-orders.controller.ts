import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import {
  JwtAuthGuard,
  RolesGuard,
  Roles,
  type AuthRequest,
} from '../auth/auth.guard.js';

import {
  OrdersQueryDto,
  UpdateStatusDto,
} from './admin-orders.dto.js';

import { AdminOrdersService } from './admin-orders.service.js';

@Controller('admin/orders')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminOrdersController {
  constructor(
    private readonly orders: AdminOrdersService,
  ) {}

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
    @Req() req: AuthRequest,
  ) {
    if (!req.user) {
      throw new UnauthorizedException(
        'Phiên đăng nhập không hợp lệ',
      );
    }

    return this.orders.update(id, dto, req.user.id);
  }
}
