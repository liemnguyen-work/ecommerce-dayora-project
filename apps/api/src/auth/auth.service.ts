import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service.js';

// Thời hạn token tính bằng giây.
const TOKEN_LIFETIME = 7 * 24 * 60 * 60;

@Injectable()
export class AuthService {
  private readonly secret: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    const secret = this.config.get<string>('JWT_SECRET');
    if (!secret || !secret.trim()) {
      throw new Error('JWT_SECRET is required');
    }
    this.secret = secret;
  }

  signToken(id: string): string {
    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = {
      sub: id,
      exp: Math.floor(Date.now() / 1000) + TOKEN_LIFETIME,
    };
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const content = `${encodedHeader}.${encodedPayload}`;
    const signature = createHmac('sha256', this.secret)
      .update(content)
      .digest('base64url');

    return `${content}.${signature}`;
  }

  verifyToken(token: string): string {
    try {
      const parts = token.split('.');
      if (parts.length !== 3 || parts.some((part) => !/^[A-Za-z0-9_-]+$/.test(part))) {
        throw new Error('Invalid token format');
      }

      const [headerPart, payloadPart, signaturePart] = parts;
      const content = `${headerPart}.${payloadPart}`;
      const expected = createHmac('sha256', this.secret).update(content).digest();
      const received = Buffer.from(signaturePart, 'base64url');

      // Kiểm tra độ dài trước khi so sánh để timingSafeEqual không ném lỗi.
      if (
        received.length !== expected.length ||
        received.toString('base64url') !== signaturePart ||
        !timingSafeEqual(received, expected)
      ) {
        throw new Error('Invalid signature');
      }

      const header: unknown = JSON.parse(Buffer.from(headerPart, 'base64url').toString('utf8'));
      const payload: unknown = JSON.parse(Buffer.from(payloadPart, 'base64url').toString('utf8'));

      if (
        typeof header !== 'object' || header === null ||
        !('alg' in header) || header.alg !== 'HS256' ||
        typeof payload !== 'object' || payload === null ||
        !('sub' in payload) || typeof payload.sub !== 'string' || !payload.sub.trim() ||
        !('exp' in payload) || typeof payload.exp !== 'number' ||
        !Number.isFinite(payload.exp) || payload.exp <= Math.floor(Date.now() / 1000)
      ) {
        throw new Error('Invalid token claims');
      }

      return payload.sub;
    } catch {
      throw new UnauthorizedException('Phiên đăng nhập không hợp lệ');
    }
  }
}
