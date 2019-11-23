import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import * as mongoose from 'mongoose';

@Injectable()
export class ValidateObjectId implements PipeTransform{
  transform(value:any,metadata:ArgumentMetadata){
    const isValid = mongoose.Types.ObjectId.isValid(value);
    if(!isValid) throw new BadRequestException('id 无效');
    return value;

  }
}