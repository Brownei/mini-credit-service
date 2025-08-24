import { Module } from '@nestjs/common';
import { BureauService } from './bureau.service';
import { BureauController } from './bureau.controller';

@Module({
  controllers: [BureauController],
  providers: [BureauService],
})
export class BureauModule {}
