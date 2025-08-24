import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HelpersModule } from 'src/helpers/helpers.module';

@Module({
  imports: [HelpersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
