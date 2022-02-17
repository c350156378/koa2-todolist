import { IsNotEmpty } from 'class-validator';

export class CreateListDto {
  @IsNotEmpty({ message: '用户Id必填' })
  uid: string;

  @IsNotEmpty({ message: '内容必填' })
  content: string;

  @IsNotEmpty({ message: '状态必填' })
  status: number;
}
