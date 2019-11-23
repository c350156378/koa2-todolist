import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ValidateObjectId } from './shared/validate-object-id.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService:UserService){}
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get(':id')
  async getOne(@Param('id', new ValidateObjectId()) id) {
    return await this.userService.findById(id);
  }

  @Get()
 async findAll(){
    return await this.userService.findAll();
  }
}
