import { Module } from '@nestjs/common';
import { StatementsService } from './statements.service';
import { StatementsController } from './statements.controller';

@Module({
  controllers: [StatementsController],
  providers: [StatementsService],
})
export class StatementsModule {}
