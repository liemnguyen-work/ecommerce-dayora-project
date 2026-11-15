import { Controller, Get, Inject } from '@nestjs/common';
import { PromotionsService } from './promotions.service.js';

@Controller('promotions')
export class PromotionsController {
  constructor(@Inject(PromotionsService) private readonly promotions: PromotionsService) {}

  @Get()
  list() {
    return this.promotions.list();
  }
}
