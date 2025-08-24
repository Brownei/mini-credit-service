import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './helpers/logger.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  const theme = new SwaggerTheme();

  // API input validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Mini Credit Insights Service')
    .setDescription('Mini Credit Insights Service is a backend microservice designed to analyze financial data and provide actionable insights for credit decisioning. It processes user transactions, statements, and bureau reports to generate metrics')
    .setVersion('v1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
