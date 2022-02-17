import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  //字段验证
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
