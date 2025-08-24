import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { InsightsModule } from './insights/insights.module';
import { StatementsModule } from './statements/statements.module';
import { BureauModule } from './bureau/bureau.module';
import { JwtModule } from '@nestjs/jwt';
import { HealthModule } from './health/health.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    AuthModule,
    InsightsModule,
    StatementsModule,
    BureauModule,
    PrometheusModule.register(),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    JwtModule.register({
      global: true,
      secret: "thisisthesecretneededtobebetteratwhatido",
      signOptions: { expiresIn: '60s' },
    }),
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
