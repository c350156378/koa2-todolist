/*
 * @Author: your name
 * @Date: 2019-11-09 16:31:29
 * @LastEditTime: 2019-11-09 16:33:03
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \koa2-todolist\server2\src\list\dto\create-list.dto.ts
 */
export class CreateListDto{
  readonly uid:string;
  readonly content:string;
  readonly status:number;
}