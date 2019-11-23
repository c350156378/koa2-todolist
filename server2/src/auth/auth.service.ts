/*
 * @Author: your name
 * @Date: 2019-10-31 13:29:51
 * @LastEditTime: 2019-11-16 15:12:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-todolist\server2\src\auth\auth.service.ts
 */
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(username, password): Promise<any> {
    
    const user = await this.userService.findOne(username);
    const compare = await bcrypt.compare(password, user.password);
    if (user && compare) {
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }


  async login(user): Promise<any> {
    const payload = { username: user.username, sub:user._id };
    return {
      access_token: this.jwtService.sign(payload)
    }

  }
}
