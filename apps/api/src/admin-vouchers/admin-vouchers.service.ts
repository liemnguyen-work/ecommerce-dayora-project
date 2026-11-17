import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

export type CreateVoucherInput = {
  code: string;
  description: string;
  startsAt: Date | string;
  endsAt: Date | string;
  percentOff?: number | null;
  amountOff?: number | null;
  maxDiscount?: number | null;
  minOrderValue?: number | null;
  usageLimit?: number | null;
  perUserLimit?: number | null;
  isActive?: boolean;
};

@Injectable()
export class AdminVouchersService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  list() {
    throw new NotImplementedException('Chức năng đang được triển khai');
  }

  async update(id: string, dto: { usageLimit?: number | null }) {
    const limit = dto.usageLimit;
    if (limit != null && (!Number.isSafeInteger(limit) || limit < 0)) {
      throw new BadRequestException('Giới hạn không hợp lệ');
    }
    return this.prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT "id" FROM "Voucher" WHERE "id" = ${id} FOR UPDATE`;
      const voucher = await tx.voucher.findUnique({ where: { id } });
      if (!voucher) throw new NotFoundException('Không tìm thấy voucher');
      if (limit != null) {
        const usedCount = await tx.voucherUsage.count({ where: { voucherId: id } });
        if (limit < usedCount) {
          throw new BadRequestException('Giới hạn thấp hơn số lượt đã dùng');
        }
      }
      return tx.voucher.update({ where: { id }, data: { usageLimit: limit } });
    });
  }

  async create(dto: CreateVoucherInput) {
    const code = typeof dto.code === 'string' ? dto.code.trim() : '';
    const description = typeof dto.description === 'string' ? dto.description.trim() : '';
    if (!code || !description) throw new BadRequestException('Thiếu mã hoặc mô tả');
    const startsAt = new Date(dto.startsAt);
    const endsAt = new Date(dto.endsAt);
    if (!code || !Number.isFinite(startsAt.getTime()) || !Number.isFinite(endsAt.getTime()) || startsAt >= endsAt) {
      throw new BadRequestException('Mã hoặc thời gian voucher không hợp lệ');
    }
    if ((dto.percentOff == null) === (dto.amountOff == null)) {
      throw new BadRequestException('Chọn đúng một loại giảm giá');
    }
    for (const value of [dto.percentOff, dto.amountOff, dto.maxDiscount, dto.minOrderValue, dto.usageLimit, dto.perUserLimit]) {
      if (value != null && (!Number.isSafeInteger(value) || value < 0)) {
        throw new BadRequestException('Giá trị voucher không hợp lệ');
      }
    }
    if (dto.percentOff != null && dto.percentOff > 100) {
      throw new BadRequestException('Phần trăm giảm không hợp lệ');
    }
    try {
      return await this.prisma.voucher.create({
        data: {
          code, description, startsAt, endsAt,
          percentOff: dto.percentOff,
          amountOff: dto.amountOff,
          maxDiscount: dto.maxDiscount,
          minOrderValue: dto.minOrderValue,
          usageLimit: dto.usageLimit,
          perUserLimit: dto.perUserLimit,
          isActive: dto.isActive,
        },
      });
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
        throw new ConflictException('Mã voucher đã tồn tại');
      }
      throw error;
    }
  }
}
