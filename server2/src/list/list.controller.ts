/*
 * @Author: your name
 * @Date: 2019-11-09 16:20:28
 * @LastEditTime: 2019-11-19 17:38:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-todolist\server2\src\list\list.controller.ts
 */
import { Controller, Get, Param, Post, Body, UseGuards, Request, Put, Delete } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('list')
@UseGuards(AuthGuard('jwt'))
export class ListController {

  constructor(private readonly listService:ListService){}
  @Get()
  
  async findAll(@Request() req) {
    return this.listService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return 'one';
  }

  @Post()
  async create(@Body() createListDto:CreateListDto){
    return await  this.listService.create(createListDto);
  }

  @Put()
  async update(@Body() body){
    return await this.listService.update(body.id, body.status);
  }

  @Delete(':id')
  async remove(@Param('id') id:string){
    console.log(id)
    return await this.listService.remove(id);
  }
}
