import { Type } from 'class-transformer';
import {
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsBoolean,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class AddressDto {
  @IsString()
  province!: string;

  @IsOptional()
  @IsString()
  district?: string;

  @IsOptional()
  @IsBoolean()
  isInnerHcm?: boolean;
}

export class ExpectedDto {
  @IsString()
  skuId!: string;

  @IsInt()
  @Min(0)
  unitPrice!: number;
}

export class RecipientDto extends AddressDto {
  @IsString()
  @Length(1, 100)
  name!: string;

  @IsString()
  @Matches(/^(0|\+84)\d{9}$/)
  phone!: string;

  @IsString()
  @Length(1, 300)
  address!: string;
}

export class CreateOrderDto {
  @IsObject()
  @ValidateNested()
  @Type(() => RecipientDto)
  recipient!: RecipientDto;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  @ValidateNested({ each: true })
  @Type(() => ExpectedDto)
  expected!: ExpectedDto[];

  @IsInt()
  @Min(0)
  expectedTotal!: number;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  voucherCode?: string;
}

export class PreviewDto {
  @IsOptional()
  @IsString()
  voucherCode?: string;

  @IsOptional()
@IsObject()
@ValidateNested()
@Type(() => AddressDto)
address?: AddressDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExpectedDto)
  expected?: ExpectedDto[];
}
