import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
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
