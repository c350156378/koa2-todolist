/*
 * @Author: your name
 * @Date: 2019-10-31 11:10:04
 * @LastEditTime: 2019-11-09 16:53:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-todolist\server2\src\list\list.module.ts
 */
import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ListService } from './list.service';
import { ListSchema } from './schemas/list.schema';

@Module({
  imports:[ MongooseModule.forFeature([{name:'List', schema: ListSchema}])],
  controllers: [
    ListController
  ],
  providers: [ListService]
})
export class ListModule {}
