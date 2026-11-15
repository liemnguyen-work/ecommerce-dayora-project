
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';

import type {
  CreateCategoryDto,
  CreateProductDto,
  CreateSkuDto,
  UpdateCategoryDto,
  UpdateProductDto,
  UpdateSkuDto,
} from './admin-catalog.dto.js';

@Injectable()
export class AdminCatalogService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  // CATEGORY

  async listCategories() {
    return this.prisma.category.findMany({});
  }

  async createCategory(_dto: CreateCategoryDto) {
    void _dto;

    throw new NotImplementedException(
      'Create category is not implemented yet',
    );
  }

  async updateCategory(
    _id: string,
    _dto: UpdateCategoryDto,
  ) {
    void _id;
    void _dto;

    throw new NotImplementedException(
      'Update category is not implemented yet',
    );
  }

  // PRODUCT

  async listProducts() {
    // Admin xem cả ACTIVE và INACTIVE.
    return this.prisma.product.findMany({});
  }

  async createProduct(_dto: CreateProductDto) {
    void _dto;

    throw new NotImplementedException(
      'Create product is not implemented yet',
    );
  }

  async updateProduct(
    _id: string,
    _dto: UpdateProductDto,
  ) {
    void _id;
    void _dto;

    throw new NotImplementedException(
      'Update product is not implemented yet',
    );
  }

  // SKU

  async listSkus() {
    throw new NotImplementedException(
      'List SKU is not implemented yet',
    );
  }

  async createSku(_dto: CreateSkuDto) {
    void _dto;

    throw new NotImplementedException(
      'Create SKU is not implemented yet',
    );
  }

  async updateSku(id: string, dto: UpdateSkuDto) {
    // 1. Lay thong tin SKU hien tai.
    const current = await this.prisma.sku.findUnique({
      where: { id },
    });

    if (!current) {
      throw new NotFoundException('SKU not found');
    }

    // 2. Khong cho ton kho thap hon so luong dang giu.
    if (
      dto.stock !== undefined &&
      dto.stock < current.reserved
    ) {
      throw new BadRequestException(
        'Tồn kho không được nhỏ hơn số lượng đang giữ',
      );
    }

    // 3. Tinh gia sau khi cap nhat.
    const nextPrice =
      dto.price !== undefined
        ? dto.price
        : current.price;

    const nextSalePrice =
      dto.salePrice !== undefined
        ? dto.salePrice
        : current.salePrice;

    // Gia giam neu co phai nho hon gia niem yet.
    if (
      nextSalePrice !== null &&
      nextSalePrice !== undefined &&
      nextSalePrice >= nextPrice
    ) {
      throw new BadRequestException(
        'Giá giảm phải nhỏ hơn giá niêm yết',
      );
    }
    // 4. Optimistic locking:
    // Chi cap nhat neu du lieu chua thay doi.
   
const result = await this.prisma.sku.updateMany({
  where: {
    id,
    price: current.price,
    salePrice: current.salePrice,
    stock: current.stock,
    reserved: current.reserved,
  },
  data: {
    ...dto,
    color: dto.color ?? undefined,
    unit: dto.unit ?? undefined,
    useType: dto.useType ?? undefined,
    unitQty: dto.unitQty ?? undefined,
  },
});

    // 5. Khong cap nhat duoc -> HTTP 409.
    if (result.count !== 1) {
      throw new ConflictException(
        'SKU changed; retry',
      );
    }
    // 6. Tra ve SKU sau khi cap nhat.
    return this.prisma.sku.findUniqueOrThrow({
      where: { id },
    });
  }
}
