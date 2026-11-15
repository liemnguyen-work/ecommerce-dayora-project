import { UnauthorizedException } from '@nestjs/common';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AuthRateLimit, LoginRateLimitException } from './auth-rate-limit.js';
import { AuthController } from './auth.controller.js';
import type { AuthService } from './auth.service.js';
import type { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';

describe('AuthRateLimit', () => {
  afterEach(() => vi.useRealTimers());

  it('blocks after five failures, normalizes email and releases after 15 minutes', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
    const limiter = new AuthRateLimit();
    const failure = vi.fn(async () => { throw new UnauthorizedException(); });
    for (let i = 0; i < 5; i += 1) {
      await expect(limiter.attempt(' User@Example.com ', failure))
        .rejects.toBeInstanceOf(UnauthorizedException);
    }
    await expect(limiter.attempt('user@example.com', failure))
      .rejects.toMatchObject({ status: 429, retryAfterSeconds: 900 });
    expect(failure).toHaveBeenCalledTimes(5);
    vi.advanceTimersByTime(15 * 60 * 1000);
    await expect(limiter.attempt('user@example.com', async () => 'ok')).resolves.toBe('ok');
  });

  it('clears failures after a successful login and expires the observation window', async () => {
    vi.useFakeTimers();
    const limiter = new AuthRateLimit();
    const failure = async () => { throw new UnauthorizedException(); };
    for (let i = 0; i < 4; i += 1) {
      await expect(limiter.attempt('a@example.com', failure)).rejects.toBeInstanceOf(UnauthorizedException);
    }
    await expect(limiter.attempt('a@example.com', async () => 'ok')).resolves.toBe('ok');
    await expect(limiter.attempt('a@example.com', failure)).rejects.toBeInstanceOf(UnauthorizedException);
    vi.advanceTimersByTime(15 * 60 * 1000);
    await expect(limiter.attempt('a@example.com', failure)).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('serializes concurrent attempts so only five can reach login', async () => {
    const limiter = new AuthRateLimit();
    const failure = vi.fn(async () => { throw new UnauthorizedException(); });
    const results = await Promise.allSettled(
      Array.from({ length: 8 }, () => limiter.attempt('same@example.com', failure)),
    );
    expect(failure).toHaveBeenCalledTimes(5);
    expect(results.filter((r) => r.status === 'rejected' && r.reason instanceof LoginRateLimitException)).toHaveLength(3);
  });

  it('does not count other errors as failed credentials', async () => {
    const limiter = new AuthRateLimit();
    for (let i = 0; i < 6; i += 1) {
      await expect(limiter.attempt('a@example.com', async () => { throw new Error('database'); }))
        .rejects.toThrow('database');
    }
    await expect(limiter.attempt('a@example.com', async () => 'ok')).resolves.toBe('ok');
  });

  it('sets Retry-After when the controller rejects a blocked login', async () => {
    vi.useFakeTimers();
    const auth = { login: vi.fn(async () => { throw new UnauthorizedException(); }) };
    const response = { setHeader: vi.fn(), cookie: vi.fn() };
    const controller = new AuthController(
      auth as unknown as AuthService,
      {} as ConfigService,
      new AuthRateLimit(),
    );
    const dto = { email: 'a@example.com', password: 'wrongpass' };
    const request = { ip: '192.0.2.1' } as Request;
    for (let i = 0; i < 5; i += 1) {
      await expect(controller.login(dto, response as unknown as Response, request))
        .rejects.toBeInstanceOf(UnauthorizedException);
    }
    await expect(controller.login(dto, response as unknown as Response, request))
      .rejects.toMatchObject({ status: 429 });
    expect(response.setHeader).toHaveBeenCalledWith('Retry-After', '900');
    expect(response.cookie).not.toHaveBeenCalled();
  });

  it('allows a new key when the storage is full of unexpired entries', async () => {
    const limiter = new AuthRateLimit();
    const failure = async () => { throw new UnauthorizedException(); };
    for (let i = 0; i < 10000; i += 1) {
      try { await limiter.attempt(`192.0.2.1|user${i}@example.com`, failure); } catch (error) {
        if (!(error instanceof UnauthorizedException)) throw error;
      }
    }
    await expect(limiter.attempt('192.0.2.1|new@example.com', async () => 'ok')).resolves.toBe('ok');
  });

  it('keeps the same email separate for different IP addresses', async () => {
    const auth = { login: vi.fn().mockRejectedValue(new UnauthorizedException()), signToken: vi.fn().mockReturnValue('token') };
    const controller = new AuthController(auth as unknown as AuthService, { get: vi.fn() } as unknown as ConfigService, new AuthRateLimit());
    const response = { setHeader: vi.fn(), cookie: vi.fn() } as unknown as Response;
    const dto = { email: 'user@example.com', password: 'wrongpass' };
    const first = { ip: '192.0.2.1' } as Request;
    const second = { ip: '192.0.2.2' } as Request;
    for (let i = 0; i < 5; i += 1) {
      await expect(controller.login(dto, response, first)).rejects.toBeInstanceOf(UnauthorizedException);
    }
    await expect(controller.login(dto, response, first)).rejects.toBeInstanceOf(LoginRateLimitException);
    const user = { id: 'user-1' };
    auth.login.mockResolvedValueOnce(user);
    await expect(controller.login(dto, response, second)).resolves.toEqual(user);
  });
});
