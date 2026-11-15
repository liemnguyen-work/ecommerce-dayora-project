import { Controller, Get, Inject, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, type AuthRequest } from '../auth/auth.guard.js';
import { MeService } from './me.service.js';

@Controller('me')
@UseGuards(JwtAuthGuard)
export class MeController {
  constructor(@Inject(MeService) private readonly service: MeService) {}

  @Get('profile')
  profile(@Req() request: AuthRequest) {
    if (!request.user) {
      throw new UnauthorizedException('Phiên đăng nhập không hợp lệ');
    }
    return this.service.profile(request.user.id);
  }
}
