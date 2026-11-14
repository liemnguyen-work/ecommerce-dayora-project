import 'reflect-metadata';
import { ConflictException, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import type { Reflector } from '@nestjs/core';
import { describe, it, expect, vi } from 'vitest';
import type { PrismaService } from '../prisma/prisma.service.js';
import { hashPassword, verifyPassword } from './password.js';
import { AuthService } from './auth.service.js';
import { LoginDto } from './auth.dto.js';
import { JwtAuthGuard, RolesGuard } from './auth.guard.js';

const configGia = {
  get: vi.fn().mockReturnValue('khoa-gia-dung-cho-test'),
} as unknown as ConfigService;

describe('Auth', () => {
  it('hashes with random salt and verifies passwords safely', async () => {
    const password = 'MatKhau123';
    const hash1 = await hashPassword(password);
    const hash2 = await hashPassword(password);

    expect(hash1).not.toBe(hash2);
    expect(await verifyPassword(password, hash1)).toBe(true);
    expect(await verifyPassword('MatKhauSai', hash1)).toBe(false);
    expect(await verifyPassword(password, 'invalid')).toBe(false);
  });

  it('requires a secret and rejects expired or incorrectly signed tokens', async () => {
    const configKhongCoSecret = { get: vi.fn().mockReturnValue(undefined) };
    expect(() => new AuthService(
      {} as PrismaService,
      configKhongCoSecret as unknown as ConfigService,
    )).toThrow('JWT_SECRET is required');

    const auth = new AuthService({} as PrismaService, configGia);
    vi.useFakeTimers();
    try {
      vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
      const token = auth.signToken('user-test-1');
      vi.setSystemTime(new Date('2026-01-09T00:00:00Z'));
      expect(() => auth.verifyToken(token)).toThrow(UnauthorizedException);
    } finally {
      vi.useRealTimers();
    }

    const configKhoaKhac = {
      get: vi.fn().mockReturnValue('mot-khoa-gia-khac'),
    } as unknown as ConfigService;
    const authKhoaKhac = new AuthService({} as PrismaService, configKhoaKhac);
    expect(() => auth.verifyToken(authKhoaKhac.signToken('user-test-1')))
      .toThrow(UnauthorizedException);

    const token = auth.signToken('user-test-1');
    const [header, , signature] = token.split('.');
    const payloadDaSua = Buffer.from(
      JSON.stringify({ sub: 'user-khac', exp: 9999999999 }),
    ).toString('base64url');
    expect(() => auth.verifyToken(`${header}.${payloadDaSua}.${signature}`))
      .toThrow(UnauthorizedException);
  });

  it('normalizes email and rejects duplicates including concurrent creates', async () => {
    const prismaGia = { user: { findUnique: vi.fn(), create: vi.fn() } };
    const auth = new AuthService(prismaGia as unknown as PrismaService, configGia);
    const dto = { email: '  User@Example.com ', password: 'MatKhau123', fullName: 'Hoan' };

    // Email đã tồn tại, kể cả khi khác chữ hoa/chữ thường.
    prismaGia.user.findUnique.mockResolvedValue({ id: 'user-1' });
    await expect(auth.register(dto)).rejects.toBeInstanceOf(ConflictException);
    expect(prismaGia.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'user@example.com' },
    });
    expect(prismaGia.user.create).not.toHaveBeenCalled();

    // Mô phỏng yêu cầu khác vừa tạo email trước khi lệnh create hoàn thành.
    prismaGia.user.findUnique.mockResolvedValue(null);
    prismaGia.user.create.mockRejectedValue({ code: 'P2002' });
    await expect(auth.register(dto)).rejects.toBeInstanceOf(ConflictException);
    expect(prismaGia.user.create).toHaveBeenCalled();
  });

  it('validates DTO and lowercases email', async () => {
    const pipe = new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    const metadata = { type: 'body' as const, metatype: LoginDto };
    const dto = await pipe.transform(
      { email: '  User@Example.com ', password: 'MatKhau123' },
      metadata,
    ) as LoginDto;
    expect(dto.email).toBe('user@example.com');
    await expect(pipe.transform(
      { email: 'user@example.com', password: '1234567' },
      metadata,
    )).rejects.toMatchObject({ status: 400 });
  });

  it('rejects wrong credentials and locked users with the same message', async () => {
    const prismaGia = { user: { findUnique: vi.fn() } };
    const auth = new AuthService(prismaGia as unknown as PrismaService, configGia);
    const passwordHash = await hashPassword('MatKhau123');
    const dto = { email: 'user@example.com', password: 'MatKhau123' };
    const loiDangNhap = { message: 'Email hoặc mật khẩu không đúng', status: 401 };

    prismaGia.user.findUnique.mockResolvedValueOnce(null);
    await expect(auth.login(dto)).rejects.toMatchObject(loiDangNhap);

    prismaGia.user.findUnique.mockResolvedValueOnce({ isActive: true, passwordHash });
    await expect(auth.login({ ...dto, password: 'MatKhauSai' }))
      .rejects.toMatchObject(loiDangNhap);

    prismaGia.user.findUnique.mockResolvedValueOnce({ isActive: false, passwordHash });
    await expect(auth.login(dto)).rejects.toMatchObject(loiDangNhap);
  });

  it('authenticates cookie against active user and enforces admin roles', async () => {
    const user = { id: 'user-1', role: 'CUSTOMER', isActive: true };
    const authGia = {
      verifyToken: vi.fn().mockReturnValue(user.id),
      getUser: vi.fn().mockResolvedValue(user),
    };
    const jwtGuard = new JwtAuthGuard(authGia as unknown as AuthService);
    const request: { headers: { cookie?: string }; user?: typeof user } = {
      headers: { cookie: 'access_token=token-gia' },
    };
    const context = {
      switchToHttp: () => ({ getRequest: () => request }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as unknown as ExecutionContext;

    await expect(jwtGuard.canActivate(context)).resolves.toBe(true);
    expect(authGia.verifyToken).toHaveBeenCalledWith('token-gia');
    expect(authGia.getUser).toHaveBeenCalledWith(user.id);
    expect(request.user).toEqual(user);

    request.headers.cookie = undefined;
    await expect(jwtGuard.canActivate(context)).rejects.toBeInstanceOf(UnauthorizedException);

    const reflectorGia = {
      getAllAndOverride: vi.fn().mockReturnValue(['ADMIN']),
    } as unknown as Reflector;
    const rolesGuard = new RolesGuard(reflectorGia);
    expect(rolesGuard.canActivate(context)).toBe(false);
  });
});
