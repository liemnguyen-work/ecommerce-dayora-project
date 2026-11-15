import { IsString, Length, Matches, MaxLength, MinLength, ValidateIf } from 'class-validator';

export class ProfileDto {
  @ValidateIf((_, value: unknown) => value !== undefined)
  @IsString()
  @Length(2, 100)
  fullName?: string;

  @ValidateIf((_, value: unknown) => value !== undefined)
  @IsString()
  @Matches(/^\d{9,11}$/)
  phone?: string;
}

export class PasswordDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  currentPassword!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(200)
  newPassword!: string;
}

export class ViewedDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  productId!: string;
}
