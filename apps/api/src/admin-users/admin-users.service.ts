
import { Inject, Injectable } from '@nestjs/common';
import type { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { UserQueryDto } from './admin-users.dto.js';

const select = {
  id: true,
  email: true,
  fullName: true,
  role: true,
  isActive: true,
  createdAt: true,
  _count: {
    select: {
      orders: true,
    },
  },
} as const;

@Injectable()
export class AdminUsersService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async list(query: UserQueryDto) {
    const page = query.page ?? 1;

    const where: Prisma.UserWhereInput = query.q
      ? {
          OR: [
            {
              email: {
                contains: query.q,
                mode: 'insensitive',
              },
            },
            {
              fullName: {
                contains: query.q,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select,
        orderBy: [
          { createdAt: 'desc' },
          { id: 'asc' },
        ],
        skip: (page - 1) * 20,
        take: 20,
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      items: users.map(({ _count, ...user }) => ({
        ...user,
        orderCount: _count.orders,
      })),
      total,
      page,
    };
  }
}
