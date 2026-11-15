
import {
  Inject,
  Injectable,
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

  async listCategories() {
    return this.prisma.category.findMany({});
  }

  async listProducts() {
    // ADMIN xem cả ACTIVE và INACTIVE.
    return this.prisma.product.findMany({});
  }

  async listSkus() {
    throw new NotImplementedException(
      'List SKU is not implemented yet',
    );
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

  async createSku(_dto: CreateSkuDto) {
    void _dto;
    throw new NotImplementedException(
      'Create SKU is not implemented yet',
    );
  }

  async updateSku(
    _id: string,
    _dto: UpdateSkuDto,
  ) {
    void _id;
    void _dto;
    throw new NotImplementedException(
      'Update SKU is not implemented yet',
    );
  }
}
