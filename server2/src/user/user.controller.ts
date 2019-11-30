/*
 * @Author: your name
 * @Date: 2019-10-31 11:10:48
 * @LastEditTime: 2019-11-30 14:38:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-todolist\server2\src\user\user.controller.ts
 */
import { Controller, Get, Post, Body, Param, SerializeOptions } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ValidateObjectId } from './shared/validate-object-id.pipe';
import { ApiUseTags, ApiBearerAuth, ApiImplicitParam } from '@nestjs/swagger';


@ApiUseTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get(':id')
  @ApiImplicitParam({name:'id', type:String})
  async getOne(@Param('id', new ValidateObjectId()) id) {
    return await this.userService.findById(id);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }
}
