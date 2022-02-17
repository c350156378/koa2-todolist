import { ApiModelProperty } from "@nestjs/swagger";

/*
 * @Author: your name
 * @Date: 2019-11-09 16:31:29
 * @LastEditTime: 2019-11-26 13:54:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-todolist\server2\src\list\dto\create-list.dto.ts
 */
export class CreateListDto{
  @ApiModelProperty()
  readonly uid:string;

  @ApiModelProperty()
  readonly content:string;

  @ApiModelProperty()
  readonly status:number;
}