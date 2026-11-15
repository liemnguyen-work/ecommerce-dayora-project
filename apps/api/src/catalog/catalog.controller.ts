import { Controller, Get, Param, Query } from '@nestjs/common';
import { CatalogQueryPipe } from './catalog-query.pipe.js';
import type { CatalogQuery } from './catalog-query.pipe.js';
import { CatalogService } from './catalog.service.js';

@Controller()
export class CatalogController {
  constructor(private readonly catalog: CatalogService) {}

  @Get('products')
  list(@Query(CatalogQueryPipe) query: CatalogQuery) {
    return this.catalog.list(query);
  }

  @Get('products/:slug')
  detail(@Param('slug') slug: string) {
    return this.catalog.detail(slug);
  }

  @Get('categories')
  categories() {
    return this.catalog.categories();
  }
}
