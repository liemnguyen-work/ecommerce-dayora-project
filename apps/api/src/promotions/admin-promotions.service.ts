import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { PromotionDto } from './admin-promotions.dto.js';

@Injectable()
export class AdminPromotionsService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.promotion.findMany({ orderBy: [{ startsAt: 'desc' }, { id: 'asc' }] });
  }

  private validate(data: { title?: string; imageUrl?: string; linkUrl?: string | null; startsAt?: string | Date | null; endsAt?: string | Date | null }) {
    if (!data.title?.trim() || !data.imageUrl?.trim()) throw new BadRequestException('Thiếu tiêu đề hoặc ảnh');
    if (data.linkUrl != null && !/^\/(?!\/)[^\\\s\p{Cc}]*$/u.test(data.linkUrl)) {
      throw new BadRequestException('Liên kết không hợp lệ');
    }
    const start = data.startsAt == null ? null : new Date(data.startsAt);
    const end = data.endsAt == null ? null : new Date(data.endsAt);
    if ((start && !Number.isFinite(start.getTime())) || (end && !Number.isFinite(end.getTime())) || (start && end && start >= end)) {
      throw new BadRequestException('Thời gian không hợp lệ');
    }
  }

  async create(dto: PromotionDto) {
    this.validate(dto);
    return this.prisma.promotion.create({
      data: {
        title: dto.title!.trim(), imageUrl: dto.imageUrl!.trim(), linkUrl: dto.linkUrl,
        startsAt: dto.startsAt == null ? dto.startsAt : new Date(dto.startsAt),
        endsAt: dto.endsAt == null ? dto.endsAt : new Date(dto.endsAt),
        isActive: dto.isActive, sortOrder: dto.sortOrder,
      },
    });
  }

  async update(id: string, dto: PromotionDto) {
    const current = await this.prisma.promotion.findUnique({ where: { id } });
    if (!current) throw new NotFoundException('Không tìm thấy khuyến mãi');
    this.validate({ ...current, ...dto });
    return this.prisma.promotion.update({
      where: { id },
      data: {
        title: dto.title?.trim(), imageUrl: dto.imageUrl?.trim(), linkUrl: dto.linkUrl,
        startsAt: dto.startsAt == null ? dto.startsAt : new Date(dto.startsAt),
        endsAt: dto.endsAt == null ? dto.endsAt : new Date(dto.endsAt),
        isActive: dto.isActive, sortOrder: dto.sortOrder,
      },
    });
  }
}
