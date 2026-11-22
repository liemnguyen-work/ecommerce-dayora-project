import { Body, Controller, DefaultValuePipe, Delete, Get, Inject, Param, ParseIntPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, Roles, RolesGuard } from '../auth/auth.guard.js';
import { CreateReviewDto } from './reviews.dto.js';
import { ReviewsService } from './reviews.service.js';

type AuthRequest = { user: { id: string } };

@Controller()
export class ReviewsController {
  constructor(@Inject(ReviewsService) private readonly reviews: ReviewsService) {}

  @Get('products/:slug/reviews')
  list(@Param('slug') slug: string, @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number) {
    return this.reviews.list(slug, page);
  }

  @Get('reviews/reviewable')
  @UseGuards(JwtAuthGuard)
  reviewable(@Req() req: AuthRequest) { return this.reviews.reviewable(req.user.id); }

  @Post('reviews')
  @UseGuards(JwtAuthGuard)
  create(@Req() req: AuthRequest, @Body() dto: CreateReviewDto) { return this.reviews.create(req.user.id, dto); }

  @Get('admin/reviews')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  adminList() { return this.reviews.adminList(); }

  @Delete('admin/reviews/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  deleteReview(@Param('id') id: string) { return this.reviews.deleteReview(id); }
}
