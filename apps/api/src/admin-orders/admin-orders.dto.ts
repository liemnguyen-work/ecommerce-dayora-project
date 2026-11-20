import { Type } from 'class-transformer';
import {
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

import {
  OrderStatus,
  PaymentStatus,
  ShippingStatus,
} from '../generated/prisma/enums.js';

export class OrdersQueryDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus?: PaymentStatus;

  @IsOptional()
  @IsEnum(ShippingStatus)
  shippingStatus?: ShippingStatus;

  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;
}

export class UpdateStatusDto {
  @IsIn(['status', 'shippingStatus'])
  field!: 'status' | 'shippingStatus';

  @IsString()
  @IsNotEmpty()
  to!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  note?: string;
}
