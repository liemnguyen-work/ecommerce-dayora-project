import { Controller, Get, Inject, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard.js';
import { PaymentsService } from './payments.service.js';

type AuthRequest = { user: { id: string }; ip?: string };

@Controller('payments/vnpay')
export class PaymentsController {
  constructor(@Inject(PaymentsService) private readonly service: PaymentsService) {}

  @Get('ipn')
  ipn(@Query() query: Record<string, unknown>) { return this.service.ipn(query); }

  @Get('return')
  returnUrl(@Query() query: Record<string, unknown>) { return this.service.returnUrl(query); }

  @Post(':orderId')
  @UseGuards(JwtAuthGuard)
  create(@Req() req: AuthRequest, @Param('orderId') id: string) {
    return this.service.create(req.user.id, id, req.ip ?? '');
  }
}
