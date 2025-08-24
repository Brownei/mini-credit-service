import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HelpersModule } from 'src/helpers/helpers.module';

@Module({
  imports: [TerminusModule, HelpersModule],
  controllers: [HealthController],
  providers: [],
})
export class HealthModule { }
