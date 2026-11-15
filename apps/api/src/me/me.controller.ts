import { Body, Controller, Get, Inject, Patch, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, type AuthRequest } from '../auth/auth.guard.js';
import { MeService } from './me.service.js';
import { PasswordDto, ProfileDto, ViewedDto } from './me.dto.js';

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

  @Patch('profile')
  updateProfile(@Req() request: AuthRequest, @Body() dto: ProfileDto) {
    if (!request.user) throw new UnauthorizedException('Phiên đăng nhập không hợp lệ');
    return this.service.updateProfile(request.user.id, dto);
  }

  @Post('password')
  password(@Req() request: AuthRequest, @Body() dto: PasswordDto) {
    if (!request.user) throw new UnauthorizedException('Phiên đăng nhập không hợp lệ');
    return this.service.password(request.user.id, dto);
  }

  @Post('viewed')
  recordViewed(@Req() request: AuthRequest, @Body() dto: ViewedDto) {
    if (!request.user) throw new UnauthorizedException('Phiên đăng nhập không hợp lệ');
    return this.service.recordViewed(request.user.id, dto.productId);
  }

  @Get('viewed')
  viewed(@Req() request: AuthRequest) {
    if (!request.user) throw new UnauthorizedException('Phiên đăng nhập không hợp lệ');
    return this.service.viewed(request.user.id);
  }
}
