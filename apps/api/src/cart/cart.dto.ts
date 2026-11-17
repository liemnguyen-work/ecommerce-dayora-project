import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class QuantityDto {
  @IsInt()
  @Min(1)
  @Max(99)
  quantity!: number;
}

export class AddItemDto extends QuantityDto {
  @IsString()
  skuId!: string;
}

export class BulkDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => AddItemDto)
  items!: AddItemDto[];

  @IsOptional()
  @IsString()
  kitId?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  ruleSetVersion?: number;
}
