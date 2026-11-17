import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/auth.guard.js';
import { CartService } from './cart.service.js';
import { AddItemDto, BulkDto, QuantityDto } from './cart.dto.js';

type AuthRequest = {
  user: {
    id: string;
  };
};

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cart: CartService) {}

  @Get()
  get(@Req() req: AuthRequest) {
    return this.cart.get(req.user.id);
  }

  @Post('items')
  addItem(
    @Req() req: AuthRequest,
    @Body() dto: AddItemDto,
  ) {
    return this.cart.add(req.user.id, {
      items: [
        {
          skuId: dto.skuId,
          quantity: dto.quantity,
        },
      ],
    });
  }

  @Post('items/bulk')
  addBulk(
    @Req() req: AuthRequest,
    @Body() dto: BulkDto,
  ) {
    return this.cart.add(req.user.id, dto);
  }

  @Patch('items/:id')
  update(
    @Req() req: AuthRequest,
    @Param('id') id: string,
    @Body() dto: QuantityDto,
  ) {
    return this.cart.update(
      req.user.id,
      id,
      dto.quantity,
    );
  }

  @Delete('items/:id')
  remove(
    @Req() req: AuthRequest,
    @Param('id') id: string,
  ) {
    return this.cart.remove(req.user.id, id);
  }

  @Delete()
  clear(@Req() req: AuthRequest) {
    return this.cart.clear(req.user.id);
  }
}
