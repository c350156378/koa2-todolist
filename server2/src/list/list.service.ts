import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List, ListDocument } from './schemas/list.schema';

@Injectable()
export class ListService {
  constructor(@InjectModel(List.name) private listModel: Model<ListDocument>) {}
  async create(createListDto: CreateListDto) {
    const createdList = new this.listModel(createListDto);
    return await createdList.save();
  }

  async findAll() {
    return await this.listModel.find().exec();
  }

  async findOne(id: number) {
    return await this.listModel.findById(id).exec();
  }
  async update(id: string, status: number) {
    return await this.listModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
  }

  async remove(id: number) {
    return await this.listModel.deleteOne({ id }).exec();
  }
}
