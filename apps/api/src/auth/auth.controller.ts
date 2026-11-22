import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { LoginDto, RegisterDto } from './auth.dto.js';
import { JwtAuthGuard } from './auth.guard.js';
import type { AuthRequest } from './auth.guard.js';
import { AuthService } from './auth.service.js';
import { AuthRateLimit, LoginRateLimitException } from './auth-rate-limit.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly config: ConfigService,
    private readonly rateLimit: AuthRateLimit,
  ) {}

  private cookieOptions() {
    return {
      httpOnly: true,
      sameSite: 'lax' as const,
      secure: this.config.get<string>('NODE_ENV') === 'production',
      path: '/',
    };
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response, @Req() request: Request) {
    let user: Awaited<ReturnType<AuthService['login']>>;
    try {
      user = await this.rateLimit.attempt(`${request.ip ?? 'unknown'}|${dto.email.trim().toLowerCase()}`, () => this.auth.login(dto));
    } catch (error: unknown) {
      if (error instanceof LoginRateLimitException) {
        response.setHeader('Retry-After', String(error.retryAfterSeconds));
      }
      throw error;
    }
    response.cookie('access_token', this.auth.signToken(user.id), {
      ...this.cookieOptions(),
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return user;
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token', this.cookieOptions());
    return { message: 'Đã đăng xuất' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() request: AuthRequest) {
    return request.user;
  }
}
