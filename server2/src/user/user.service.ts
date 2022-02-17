import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    const existUser = await this.userModel
      .findOne({ username: createdUser.username })
      .exec();
    if (existUser) {
      return { message: '用户名已使用' };
    }
    createdUser.password = bcrypt.hashSync(createdUser.password, 10);
    return await createdUser.save();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: number) {
    return await this.userModel.findById(id).exec();
  }

  async findByUsername(username: string) {
    return await this.userModel.findOne({ username }).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.userModel.deleteOne({ id }).exec();
  }
}
