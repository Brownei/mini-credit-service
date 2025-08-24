import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InsightsService } from './insights.service';
import { AuthGuard, CurrentUser } from 'src/auth/gaurd/auth.gaurd';

@Controller('insights')
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) { }

  @Post('run')
  @UseGuards(AuthGuard)
  create(@CurrentUser('id') id: number) {
    return this.insightsService.computeInsights(id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string, @CurrentUser('id') userId: number) {
    return this.insightsService.getInsightById(+id, userId);
  }
}
