/*
 * @Author: your name
 * @Date: 2019-10-31 10:57:42
 * @LastEditTime: 2019-11-22 10:41:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-todolist\server2\src\app.module.ts
 */
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    
    UserModule,
    ListModule,
    MongooseModule.forRoot(
      'mongodb://localhost/koa2-todolist',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
        useFindAndModify: false
      }),
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('')
  }
}
