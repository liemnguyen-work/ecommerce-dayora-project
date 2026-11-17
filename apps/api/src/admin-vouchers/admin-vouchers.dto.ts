import { Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsIn, IsInt, IsOptional, IsString, Max, Min, MinLength } from 'class-validator';

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

export class CreateVoucherDto {
  @IsString() @MinLength(1) code!: string;
  @IsString() @MinLength(1) description!: string;
  @IsDateString() startsAt!: string;
  @IsDateString() endsAt!: string;
  @IsOptional() @IsInt() @Min(0) @Max(100) percentOff?: number | null;
  @IsOptional() @IsInt() @Min(0) amountOff?: number | null;
  @IsOptional() @IsInt() @Min(0) maxDiscount?: number | null;
  @IsOptional() @IsInt() @Min(0) minOrderValue?: number | null;
  @IsOptional() @IsInt() @Min(0) usageLimit?: number | null;
  @IsOptional() @IsInt() @Min(0) perUserLimit?: number | null;
  @IsOptional() @IsBoolean() isActive?: boolean;
}