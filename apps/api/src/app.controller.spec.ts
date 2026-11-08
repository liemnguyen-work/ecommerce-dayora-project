import { describe, expect, it } from 'vitest';
import { AppController } from './app.controller';

describe('AppController', () => {
  it('returns the expected health response', () => {
    const controller = new AppController();

    expect(controller.health()).toEqual({
      status: 'wrong-status',
      service: 'dayora-api',
    });
  });
});