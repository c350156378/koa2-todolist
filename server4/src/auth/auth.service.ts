/*
 * @Author: your name
 * @Date: 2019-10-31 13:29:51
 * @LastEditTime: 2019-11-28 10:12:45
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

  async validateUser(username, pass): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user) {
      const compare = await bcrypt.compare(pass, user.password);
      if(compare){
        const { password, ...result } = user.toJSON();
        return result;
      }
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
