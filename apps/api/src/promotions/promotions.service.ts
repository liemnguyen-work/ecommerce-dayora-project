import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class PromotionsService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  list() {
    const now = new Date();
    return this.prisma.promotion.findMany({
      where: {
        isActive: true,
        AND: [
          { OR: [{ startsAt: null }, { startsAt: { lte: now } }] },
          { OR: [{ endsAt: null }, { endsAt: { gt: now } }] },
        ],
      },
      select: {
        id: true,
        title: true,
        subtitle: true,
        imageUrl: true,
        linkUrl: true,
        startsAt: true,
        endsAt: true,
      },
      orderBy: [{ startsAt: 'desc' }, { id: 'asc' }],
    });
  }
}
