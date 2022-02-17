/*
 * @Author: your name
 * @Date: 2019-11-09 16:31:50
 * @LastEditTime: 2019-11-09 16:45:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-todolist\server2\src\list\interfaces\list.interface.ts
 */
import {Document} from 'mongoose';
export interface List extends Document{
  readonly uid:string;
  readonly content:string;
  readonly status:number;
}