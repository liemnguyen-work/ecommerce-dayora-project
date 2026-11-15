import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { hashPassword, verifyPassword } from '../auth/password.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { PasswordDto, ProfileDto } from './me.dto.js';

const profileSelect = {
  id: true,
  email: true,
  fullName: true,
  phone: true,
  createdAt: true,
} as const;

const visible = { status: 'ACTIVE', skus: { some: { status: 'ACTIVE' } } } as const;

@Injectable()
export class MeService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async profile(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id }, select: profileSelect });
    if (!user) throw new NotFoundException('Không tìm thấy tài khoản');
    return user;
  }

  updateProfile(id: string, dto: ProfileDto) {
    return this.prisma.user.update({
      where: { id },
      data: { fullName: dto.fullName, phone: dto.phone },
      select: profileSelect,
    });
  }

  async password(id: string, dto: PasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { passwordHash: true },
    });
    if (!user || !(await verifyPassword(dto.currentPassword, user.passwordHash))) {
      throw new BadRequestException('Mật khẩu hiện tại không đúng');
    }

    const passwordHash = await hashPassword(dto.newPassword);
    const result = await this.prisma.user.updateMany({
      where: { id, passwordHash: user.passwordHash },
      data: { passwordHash },
    });
    if (result.count === 0) {
      throw new BadRequestException('Mật khẩu hiện tại đã thay đổi');
    }
    return { message: 'Đã đổi mật khẩu' };
  }

  async recordViewed(userId: string, productId: string) {
    const product = await this.prisma.product.findFirst({
      where: { id: productId, ...visible },
      select: { id: true },
    });
    if (!product) return { recorded: false };
    await this.prisma.viewedProduct.upsert({
      where: { userId_productId: { userId, productId } },
      create: { userId, productId },
      update: { viewedAt: new Date() },
    });
    return { recorded: true };
  }

  async viewed(userId: string) {
    const records = await this.prisma.viewedProduct.findMany({
      where: { userId, product: visible },
      orderBy: [{ viewedAt: 'desc' }, { productId: 'asc' }],
      take: 12,
      select: {
        product: {
          select: {
            id: true, slug: true, name: true, description: true, guide: true,
            material: true, scenarios: true, isFeatured: true,
            category: { select: { id: true, code: true, name: true } },
            skus: {
              where: { status: 'ACTIVE' },
              orderBy: { code: 'asc' },
              select: {
                id: true, code: true, color: true, price: true, salePrice: true,
                stock: true, reserved: true, unit: true, unitQty: true,
                lengthCm: true, widthCm: true, heightCm: true, volumeMl: true,
                capacityPeople: true, useType: true, imageUrl: true, imageSource: true,
              },
            },
          },
        },
      },
    });
    return records.map(({ product }) => {
      const skus = product.skus.map(({ stock, reserved, ...sku }) => {
        const availableStock = Math.max(0, stock - reserved);
        return {
          ...sku,
          lengthCm: sku.lengthCm === null ? null : Number(sku.lengthCm),
          widthCm: sku.widthCm === null ? null : Number(sku.widthCm),
          heightCm: sku.heightCm === null ? null : Number(sku.heightCm),
          availableStock,
          inStock: availableStock > 0,
          effectivePrice: sku.salePrice ?? sku.price,
        };
      });
      return { ...product, skus, minPrice: Math.min(...skus.map((sku) => sku.effectivePrice)) };
    });
  }
}
