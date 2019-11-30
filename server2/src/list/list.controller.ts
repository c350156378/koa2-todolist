/*
 * @Author: your name
 * @Date: 2019-11-09 16:20:28
 * @LastEditTime: 2019-11-30 15:17:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-todolist\server2\src\list\list.controller.ts
 */
import { Controller, Get, Param, Post, Body, UseGuards, Request, Put, Delete } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth, ApiImplicitQuery, ApiConsumes, ApiOperation, ApiImplicitBody, ApiImplicitParam } from '@nestjs/swagger';



@ApiUseTags('list')
@ApiBearerAuth()
@Controller('list')
@UseGuards(AuthGuard('jwt'))
export class ListController {

  constructor(private readonly listService: ListService) { }
  @Get()
  @ApiConsumes('x-www-form-urlencoded')
  @ApiOperation({ title: '根据当前身份获取所有列表' })
  async findAll(@Request() req) {
    return this.listService.findAll(req.user.userId);
  }

  @Post()
  async create(@Body() createListDto: CreateListDto) {
    return await this.listService.create(createListDto);
  }

  @Put(':id')
  @ApiImplicitParam({ name: 'id', type: String })
  @ApiImplicitBody({ name: 'status', type: Number })
  async update(@Param('id') id: string, @Body() body) {
    try {
      return await this.listService.update(id, body.status);
    } catch (error) {
      console.log(error)
    }
   
  }

  @Delete(':id')
  @ApiImplicitParam({ name: 'id', type: String })
  async remove(@Param('id') id: string) {
    console.log(id)
    return await this.listService.remove(id);
  }
}
