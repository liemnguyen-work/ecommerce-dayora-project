import { Body, Controller, Get, Inject, Param, Patch, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, Roles, RolesGuard, type AuthRequest } from '../auth/auth.guard.js';
import { UserQueryDto, UserStatusDto } from './admin-users.dto.js';
import { AdminUsersService } from './admin-users.service.js';
@Controller('admin/users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminUsersController {
  constructor(@Inject(AdminUsersService) private readonly service: AdminUsersService) {}
  @Get() list(@Query() query: UserQueryDto) { return this.service.list(query); }
  @Patch(':id') update(
  @Req() req: AuthRequest,
  @Param('id') id: string,
  @Body() dto: UserStatusDto,
) {
  if (!req.user) {
    throw new UnauthorizedException('Phiên đăng nhập không hợp lệ');
  }
  return this.service.update(req.user.id, id, dto.isActive);
}}
