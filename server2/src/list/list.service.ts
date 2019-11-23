/*
 * @Author: your name
 * @Date: 2019-11-09 16:42:45
 * @LastEditTime: 2019-11-22 10:34:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-todolist\server2\src\list\list.service.ts
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { List } from './interfaces/list.interface';
import { CreateListDto } from './dto/create-list.dto';

@Injectable()
export class ListService {
  constructor(@InjectModel('List') private readonly listModel:Model<List>){}

  async create(createListDto:CreateListDto):Promise<any>{
    const createList = new this.listModel(createListDto);
    return await createList.save();
  }

  async findAll(){
    return this.listModel.find().exec();
  }

  async findOne(id:string){
    return this.listModel.findById(id).exec();

  }

  async remove(id:string){
    return this.listModel.findByIdAndDelete(id).exec();
  }

  async update(id:string, status:number){
    return this.listModel.findByIdAndUpdate(id, {status:status}).exec();
  }
}
