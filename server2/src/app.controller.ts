/*
 * @Author: your name
 * @Date: 2019-10-31 10:57:42
 * @LastEditTime: 2019-11-30 14:17:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-todolist\server2\src\app.controller.ts
 */
import { Controller, Get, UseGuards, Post, Request, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { ApiBadRequestResponse, ApiUseTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiImplicitBody, ApiImplicitQuery } from '@nestjs/swagger';
import { sign } from './auth/dto/sign.dto';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @Post('authorize')
  @ApiImplicitBody({name:'authorize',type:sign})
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @ApiUseTags('profile')
  
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
