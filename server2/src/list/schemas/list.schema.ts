/*
 * @Author: your name
 * @Date: 2019-11-09 16:26:25
 * @LastEditTime: 2019-11-09 16:28:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-todolist\server2\src\list\schemas\list.schema.ts
 */
import * as mongoose from 'mongoose';

export const ListSchema = new mongoose.Schema({
  uid:String,
  content:String,
  status:Number
})