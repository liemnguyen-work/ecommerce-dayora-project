import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';

const WINDOW_MS = 15 * 60 * 1000;
const BLOCK_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;
const MAX_ENTRIES = 10000;

type AttemptState = { failures: number; startedAt: number; blockedUntil?: number };

export class LoginRateLimitException extends HttpException {
  constructor(readonly retryAfterSeconds: number) {
    super('Quá nhiều lần thử đăng nhập. Vui lòng thử lại sau.', 429);
  }
}

@Injectable()
export class AuthRateLimit {
  private readonly attempts = new Map<string, AttemptState>();
  private readonly queues = new Map<string, Promise<void>>();

  // Xử lý tuần tự theo khóa IP và email để các yêu cầu đồng thời không vượt bộ đếm.
  async attempt<T>(identity: string, operation: () => Promise<T>): Promise<T> {
    const key = identity.trim().toLowerCase();
    const previous = this.queues.get(key) ?? Promise.resolve();
    let release!: () => void;
    const current = new Promise<void>((resolve) => { release = resolve; });
    const tail = previous.then(() => current);
    this.queues.set(key, tail);
    await previous;

    try {
      const now = Date.now();
      let state = this.attempts.get(key);
      if (state && (
        (state.blockedUntil !== undefined && state.blockedUntil <= now) ||
        (state.blockedUntil === undefined && state.startedAt + WINDOW_MS <= now)
      )) {
        this.attempts.delete(key);
        state = undefined;
      }
      if (state?.blockedUntil !== undefined) {
        throw new LoginRateLimitException(Math.ceil((state.blockedUntil - now) / 1000));
      }

      // Giới hạn bộ nhớ, ưu tiên xóa trạng thái hết hạn.
      if (!state && this.attempts.size >= MAX_ENTRIES) {
        for (const [storedKey, entry] of this.attempts) {
          const expiresAt = entry.blockedUntil ?? entry.startedAt + WINDOW_MS;
          if (expiresAt <= now) this.attempts.delete(storedKey);
        }
        if (this.attempts.size >= MAX_ENTRIES) {
          const oldestKey = this.attempts.keys().next().value;
          if (oldestKey !== undefined) this.attempts.delete(oldestKey);
        }
      }

      try {
        const result = await operation();
        this.attempts.delete(key);
        return result;
      } catch (error: unknown) {
        if (error instanceof UnauthorizedException) {
          const failedAt = Date.now();
          if (!state || state.startedAt + WINDOW_MS <= failedAt) {
            state = { failures: 0, startedAt: failedAt };
          }
          state.failures += 1;
          if (state.failures >= MAX_FAILURES) {
            state.blockedUntil = failedAt + BLOCK_MS;
          }
          this.attempts.set(key, state);
        }
        throw error;
      }
    } finally {
      release();
      if (this.queues.get(key) === tail) this.queues.delete(key);
    }
  }
}
