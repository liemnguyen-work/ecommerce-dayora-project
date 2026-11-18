import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { PromotionDto } from './admin-promotions.dto.js';

@Injectable()
export class AdminPromotionsService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async list() {
    const promotions = await this.prisma.promotion.findMany({ orderBy: [{ startsAt: 'desc' }, { id: 'asc' }] });
    return promotions.map((promotion) => ({ ...promotion, link: promotion.linkUrl }));
  }

  private resolveLink(dto: PromotionDto) {
    if (dto.link !== undefined && dto.linkUrl !== undefined && dto.link !== dto.linkUrl) {
      throw new BadRequestException('Liên kết không thống nhất');
    }
    return dto.link !== undefined ? dto.link : dto.linkUrl;
  }

  private validate(data: { title?: string; linkUrl?: string | null; startsAt?: string | Date | null; endsAt?: string | Date | null }) {
    if (!data.title?.trim()) throw new BadRequestException('Thiếu tiêu đề');
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
    const linkUrl = this.resolveLink(dto);
    this.validate({ ...dto, linkUrl });
    const promotion = await this.prisma.promotion.create({
      data: {
        title: dto.title!.trim(), subtitle: dto.subtitle, imageUrl: dto.imageUrl?.trim(), linkUrl,
        startsAt: dto.startsAt == null ? dto.startsAt : new Date(dto.startsAt),
        endsAt: dto.endsAt == null ? dto.endsAt : new Date(dto.endsAt),
        isActive: dto.isActive, sortOrder: dto.sortOrder,
      },
    });
    return { ...promotion, link: promotion.linkUrl };
  }

  async update(id: string, dto: PromotionDto) {
    const current = await this.prisma.promotion.findUnique({ where: { id } });
    if (!current) throw new NotFoundException('Không tìm thấy khuyến mãi');
    const linkUrl = this.resolveLink(dto);
    this.validate({
      title: dto.title === undefined ? current.title : dto.title,
      linkUrl: linkUrl === undefined ? current.linkUrl : linkUrl,
      startsAt: dto.startsAt === undefined ? current.startsAt : dto.startsAt,
      endsAt: dto.endsAt === undefined ? current.endsAt : dto.endsAt,
    });
    const promotion = await this.prisma.promotion.update({
      where: { id },
      data: {
        title: dto.title?.trim(), subtitle: dto.subtitle, imageUrl: dto.imageUrl === null ? null : dto.imageUrl?.trim(), linkUrl,
        startsAt: dto.startsAt == null ? dto.startsAt : new Date(dto.startsAt),
        endsAt: dto.endsAt == null ? dto.endsAt : new Date(dto.endsAt),
        isActive: dto.isActive, sortOrder: dto.sortOrder,
      },
    });
    return { ...promotion, link: promotion.linkUrl };
  }
}
