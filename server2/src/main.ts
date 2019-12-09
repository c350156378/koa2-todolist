/*
 * @Author: your name
 * @Date: 2019-10-31 10:57:42
 * @LastEditTime: 2019-12-03 10:59:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-todolist\server2\src\main.ts
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/all-exceptions.filter';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
declare const module: any;



async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const options = new DocumentBuilder()
    .setTitle('koa2-todolist')
    .setDescription('Description')
    .setBasePath('/api')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('koa2') 
    .build();
  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  
  
  app.setGlobalPrefix('api');
  // app.useGlobalFilters(new AllExceptionsFilter());
  // app.useGlobalPipes(new ValidationPipe());
  app.userGlobalFilters(new HttpExecetionFilter())
  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
