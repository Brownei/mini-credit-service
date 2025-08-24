import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InsightsService } from './insights.service';
import { AuthGuard, CurrentUser } from 'src/auth/gaurd/auth.gaurd';
import { ApiOperation } from '@nestjs/swagger';

@Controller('insights')
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) { }

  @ApiOperation({ summary: "Compute insights (3-month avg income, inflow/outflow/net, spend buckets, risk flags, parsing success rate)" })
  @Post('run')
  @UseGuards(AuthGuard)
  create(@CurrentUser('id') id: number) {
    return this.insightsService.computeInsights(id);
  }

  @ApiOperation({ summary: "Retrieve computed insights" })
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string, @CurrentUser('id') userId: number) {
    return this.insightsService.getInsightById(+id, userId);
  }
}
