import { IsBoolean, IsDateString, IsInt, IsOptional, IsString, Length, Matches, MaxLength, Min } from 'class-validator';

export class PromotionDto {
  @IsOptional() @IsString() @Length(1, 120) title?: string;
  @IsOptional() @IsString() @MaxLength(2000) subtitle?: string | null;
  @IsOptional() @IsString() @MaxLength(2000) imageUrl?: string | null;
  @IsOptional() @IsString() @MaxLength(2000) @Matches(/^\/(?!\/)[^\\\s\p{Cc}]*$/u) link?: string | null;
  @IsOptional() @IsString() @MaxLength(2000) @Matches(/^\/(?!\/)[^\\\s\p{Cc}]*$/u) linkUrl?: string | null;
  @IsOptional() @IsDateString() startsAt?: string | null;
  @IsOptional() @IsDateString() endsAt?: string | null;
  @IsOptional() @IsBoolean() isActive?: boolean;
  @IsOptional() @IsInt() @Min(0) sortOrder?: number;
}
