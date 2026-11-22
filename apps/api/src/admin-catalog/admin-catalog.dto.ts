
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
  Validate,
  ValidatorConstraint,
} from 'class-validator';

import type {
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';

const MAX_INT = 2147483647;
const SKU_CODE_PATTERN = /^DAY-[A-Z]{2}-[0-9]{3}$/;
const STATUSES = ['ACTIVE', 'INACTIVE'] as const;

// Kiểm tra giá khuyến mãi khi đã có cả price và salePrice.
@ValidatorConstraint({ name: 'salePriceBelowPrice', async: false })
export class SalePriceBelowPrice
  implements ValidatorConstraintInterface
{
  validate(value: unknown, args: ValidationArguments): boolean {
    if (value === undefined || value === null) {
      return true;
    }

    if (typeof value !== 'number' || !Number.isInteger(value)) {
      return false;
    }

    const data = args.object as { price?: unknown };

    // Với PATCH chỉ gửi salePrice, Service phải lấy price hiện tại
    // từ database để kiểm tra.
    if (data.price === undefined) {
      return true;
    }

    return (
      typeof data.price === 'number' &&
      Number.isInteger(data.price) &&
      value < data.price
    );
  }

  defaultMessage(): string {
    return 'salePrice phải nhỏ hơn price';
  }
}

// =====================================================
// 1. CREATE CATEGORY
// =====================================================

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(MAX_INT)
  sortOrder?: number;
}

// =====================================================
// 2. UPDATE CATEGORY
// =====================================================

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  code?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(MAX_INT)
  sortOrder?: number;
}

// =====================================================
// 3. CREATE PRODUCT
// =====================================================

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  categoryId!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsOptional()
  @IsString()
  guide?: string | null;

  @IsOptional()
  @IsString()
  material?: string | null;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  scenarios?: string[];

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  @IsIn(STATUSES)
  status?: 'ACTIVE' | 'INACTIVE';
}

// =====================================================
// 4. UPDATE PRODUCT
// =====================================================

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  categoryId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  slug?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsOptional()
  @IsString()
  guide?: string | null;

  @IsOptional()
  @IsString()
  material?: string | null;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  scenarios?: string[];

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  @IsIn(STATUSES)
  status?: 'ACTIVE' | 'INACTIVE';
}

// =====================================================
// 5. CREATE SKU
// =====================================================

export class CreateSkuDto {
  @IsString()
  @Matches(SKU_CODE_PATTERN)
  code!: string;

  @IsString()
  @IsNotEmpty()
  productId!: string;

  @IsInt()
  @Min(0)
  @Max(MAX_INT)
  price!: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(MAX_INT)
  @Validate(SalePriceBelowPrice)
  salePrice?: number | null;

@IsString()
@IsNotEmpty()
color!: string;

@IsString()
@IsNotEmpty()
unit!: string;

@IsString()
@IsNotEmpty()
useType!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(MAX_INT)
  stock?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(MAX_INT)
  unitQty?: number | null;

@IsOptional()
@IsNumber({ maxDecimalPlaces: 1 })
@Min(0)
@Max(99999.9)
lengthCm?: number | null;

@IsOptional()
@IsNumber({ maxDecimalPlaces: 1 })
@Min(0)
@Max(99999.9)
widthCm?: number | null;

@IsOptional()
@IsNumber({ maxDecimalPlaces: 1 })
@Min(0)
@Max(99999.9)
heightCm?: number | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(MAX_INT)
  volumeMl?: number | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(MAX_INT)
  capacityPeople?: number | null;

  @IsOptional()
  @IsString()
  imageUrl?: string | null;

  @IsOptional()
  @IsString()
  imageSource?: string | null;

  @IsOptional()
  @IsIn(STATUSES)
  status?: 'ACTIVE' | 'INACTIVE';
}

// =====================================================
// 6. UPDATE SKU
// =====================================================

export class UpdateSkuDto {
  // KHÔNG khai báo code.
  // KHÔNG khai báo productId.
  // KHÔNG cho client cập nhật reserved.

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(MAX_INT)
  price?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(MAX_INT)
  @Validate(SalePriceBelowPrice)
  salePrice?: number | null;

  @IsOptional()
  @IsString()
  color?: string | null;

  @IsOptional()
  @IsString()
  unit?: string | null;

  @IsOptional()
  @IsString()
  useType?: string | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(MAX_INT)
  stock?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(MAX_INT)
  unitQty?: number | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(MAX_INT)
  lengthCm?: number | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(MAX_INT)
  widthCm?: number | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(MAX_INT)
  heightCm?: number | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(MAX_INT)
  volumeMl?: number | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(MAX_INT)
  capacityPeople?: number | null;

  @IsOptional()
  @IsString()
  imageUrl?: string | null;

  @IsOptional()
  @IsString()
  imageSource?: string | null;

  @IsOptional()
  @IsIn(STATUSES)
  status?: 'ACTIVE' | 'INACTIVE';
}
