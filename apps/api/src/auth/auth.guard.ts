import {
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Role } from '../generated/prisma/enums.js';
import { AuthService } from './auth.service.js';

// Thông tin user chỉ được gắn sau khi xác thực thành công.
export interface AuthRequest {
  headers: { cookie?: string };
  user?: Awaited<ReturnType<AuthService['getUser']>>;
}

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const cookie = request.headers.cookie ?? '';
    const token = cookie
      .split(';')
      .map((part) => part.trim())
      .find((part) => part.startsWith('access_token='))
      ?.slice('access_token='.length);

    if (!token) {
      throw new UnauthorizedException('Phiên đăng nhập không hợp lệ');
    }

    const userId = this.auth.verifyToken(token);
    request.user = await this.auth.getUser(userId);
    return true;
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthRequest>();
    return !!request.user && roles.includes(request.user.role);
  }
}
