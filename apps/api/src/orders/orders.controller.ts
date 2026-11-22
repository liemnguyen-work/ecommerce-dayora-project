import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/auth.guard.js';
import { CreateOrderDto, PreviewDto } from './orders.dto.js';
import { OrdersService } from './orders.service.js';
import { CheckoutService } from './checkout.service.js';

type AuthRequest = {
  user: {
    id: string;
  };
};

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(
    private readonly orders: OrdersService,
    private readonly checkout: CheckoutService,
  ) {}

  @Post()
  create(
    @Req() req: AuthRequest,
    @Body() dto: CreateOrderDto,
  ) {
    return this.checkout.create(req.user.id, dto);
  }

  @Get(':id')
  detail(
    @Req() req: AuthRequest,
    @Param('id') id: string,
  ) {
    return this.checkout.detail(req.user.id, id);
  }

  @Post(':id/cancel')
  cancel(
    @Req() req: AuthRequest,
    @Param('id') id: string,
  ) {
    return this.checkout.cancel(req.user.id, id);
  }

  @Post('preview')
  preview(
    @Req() req: AuthRequest,
    @Body() dto: PreviewDto,
  ) {
    return this.orders.preview(req.user.id, dto);
  }
}
