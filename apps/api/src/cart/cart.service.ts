import { Injectable } from '@nestjs/common';
import type { PrismaService } from '../prisma/prisma.service.js';

type AddCartDto = {
  items: Array<{ skuId: string; quantity: number }>;
  kitId?: string;
  ruleSetVersion?: number;
};

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async get(userId: string) {
    void this.prisma;
    void userId;
    return {
      items: [],
      subtotal: 0,
      warnings: [],
    };
  }

  async add(userId: string, dto: AddCartDto) {
    void userId;
    void dto;
    return {
      items: [],
      subtotal: 0,
      warnings: [],
    };
  }

  async update(userId: string, id: string, quantity: number) {
    void userId;
    void id;
    void quantity;
    return {};
  }

  async remove(userId: string, id: string) {
    void userId;
    void id;
    return {};
  }

  async clear(userId: string) {
    void userId;
    return {};
  }
}
