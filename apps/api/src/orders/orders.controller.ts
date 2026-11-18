import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/auth.guard.js';
import { PreviewDto } from './orders.dto.js';
import { OrdersService } from './orders.service.js';

type AuthRequest = {
  user: {
    id: string;
  };
};

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  @Post('preview')
  preview(
    @Req() req: AuthRequest,
    @Body() dto: PreviewDto,
  ) {
    return this.orders.preview(req.user.id, dto);
  }
}
