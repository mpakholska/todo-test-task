import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './shared/config/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: config.common.origin, credentials: true });
  app.use(cookieParser());
  await app.listen(config.common.port ?? 3000);
}
bootstrap();
