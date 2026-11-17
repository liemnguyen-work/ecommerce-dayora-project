import { Type } from 'class-transformer';
import { IsBoolean, IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class ActiveDto {
  @IsBoolean()
  isActive!: boolean;
}

export class VoucherQueryDto {
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsIn(['disabled', 'expired', 'scheduled', 'active'])
  status?: 'disabled' | 'expired' | 'scheduled' | 'active';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;
}
