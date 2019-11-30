/*
 * @Author: your name
 * @Date: 2019-10-31 11:14:08
 * @LastEditTime: 2019-11-30 14:15:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-todolist\server2\src\user\dto\create-user.dto.ts
 */
import { ApiModelProperty } from "@nestjs/swagger";
import {Expose} from 'class-transformer';
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @ApiModelProperty()
  @IsNotEmpty({message:'用户名不能为空'})
  readonly username:string;

  @ApiModelProperty()
  @IsNotEmpty({message:'密码不能为空'})
  readonly password:string;

  readonly createTime:Date;
  
  readonly updateTime:Date;
}