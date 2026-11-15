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
}
