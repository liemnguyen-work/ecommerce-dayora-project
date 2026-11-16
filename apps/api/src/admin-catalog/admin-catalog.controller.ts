
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  JwtAuthGuard,
  Roles,
  RolesGuard,
} from '../auth/auth.guard.js';

import { AdminCatalogService } from './admin-catalog.service.js';

import {
  CreateCategoryDto,
  CreateProductDto,
  CreateSkuDto,
  UpdateCategoryDto,
  UpdateProductDto,
  UpdateSkuDto,
} from './admin-catalog.dto.js';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminCatalogController {
  constructor(
    private readonly service: AdminCatalogService,
  ) {}

  // CATEGORY

  @Get('categories')
  listCategories() {
    return this.service.listCategories();
  }

  @Post('categories')
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.service.createCategory(dto);
  }

  @Patch('categories/:id')
  updateCategory(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.service.updateCategory(id, dto);
  }

  // PRODUCT

  @Get('products')
  listProducts() {
    return this.service.listProducts();
  }

  @Post('products')
  createProduct(@Body() dto: CreateProductDto) {
    return this.service.createProduct(dto);
  }

  @Patch('products/:id')
  updateProduct(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.service.updateProduct(id, dto);
  }

  @Patch('products/:id/hide')
  hideProduct(@Param('id') id: string) {
    return this.service.hideProduct(id);
  }

  // SKU

  @Get('skus')
  listSkus() {
    return this.service.listSkus();
  }

  @Post('skus')
  createSku(@Body() dto: CreateSkuDto) {
    return this.service.createSku(dto);
  }

  @Patch('skus/:id')
  updateSku(
    @Param('id') id: string,
    @Body() dto: UpdateSkuDto,
  ) {
    return this.service.updateSku(id, dto);
  }

  @Patch('skus/:id/hide')
  hideSku(@Param('id') id: string) {
    return this.service.hideSku(id);
  }
}
