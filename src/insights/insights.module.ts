import { Module } from '@nestjs/common';
import { InsightsService } from './insights.service';
import { InsightsController } from './insights.controller';
import { HelpersModule } from 'src/helpers/helpers.module';

@Module({
  controllers: [InsightsController],
  providers: [InsightsService],
})
export class InsightsModule { }
