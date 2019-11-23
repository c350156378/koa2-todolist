/*
 * @Author: your name
 * @Date: 2019-10-31 10:57:42
 * @LastEditTime: 2019-11-16 15:11:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-todolist\server2\src\app.controller.ts
 */
import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @Post('authorize')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
