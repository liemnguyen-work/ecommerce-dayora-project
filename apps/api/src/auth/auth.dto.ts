import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password!: string;
}

export class RegisterDto extends LoginDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  fullName!: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;
}
