/*
 * @Author: your name
 * @Date: 2019-10-31 13:35:52
 * @LastEditTime: 2019-11-16 14:51:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-todolist\server2\src\auth\local.strategy.ts
 */
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username:string,password:string): Promise<any> {
    
    
    const user = await this.authService.validateUser(username, password);
    if (!user) {
     throw new UnauthorizedException();
    }
    return user;
  }
}