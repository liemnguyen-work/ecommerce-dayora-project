import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { ProfileDto } from './me.dto.js';

const profileSelect = {
  id: true,
  email: true,
  fullName: true,
  phone: true,
  createdAt: true,
} as const;

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
}
