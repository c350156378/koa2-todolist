/*
 * @Author: your name
 * @Date: 2019-11-06 18:46:41
 * @LastEditTime: 2019-11-28 10:00:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-todolist\server2\src\auth\dto\sign.dto.ts
 */

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class sign {

  @ApiModelProperty()
  @IsNotEmpty({message:'用户名不能为空'})
  @IsString({message:'密码必须是字符串'})
  username:string;
  

  @ApiModelProperty()
  @IsNotEmpty({message:'密码不能为空'})
  @IsString({message:'密码必须是字符串'})
  password:string;
}