/*
 * @Author: your name
 * @Date: 2019-10-31 11:22:37
 * @LastEditTime: 2019-11-30 14:20:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-todolist\server2\src\user\user.service.ts
 */
import { Injectable, Inject, BadRequestException, ForbiddenException, HttpException, NotAcceptableException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Model, Error } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {

  constructor(@Inject('User') private readonly userModel: Model<User>) {
  }

  async create(createUserDto: CreateUserDto) {
    const createUser = new this.userModel(createUserDto);
    const existUser = await this.findOne(createUser.username);
    if (existUser) {
      return '用户名已经使用';
    }
    createUser.password = await bcrypt.hash(createUser.password, 10);
    return await createUser.save();

  }

  async findOne(username: string) {
    return await this.userModel.findOne({ username: username }).exec();
  }

  async findById(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

}
