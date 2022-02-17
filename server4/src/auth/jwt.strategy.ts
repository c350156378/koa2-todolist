/*
 * @Author: your name
 * @Date: 2019-11-15 10:26:11
 * @LastEditTime: 2019-11-16 15:12:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-todolist\server2\src\auth\jwt.strategy.ts
 */
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt,Strategy } from "passport-jwt";
import { jwtConstants } from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(){
    super({
      jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration:false,
      secretOrKey:jwtConstants.secret
    });
  }
  
  async validate(payload:any){
    return {username:payload.username, userId:payload.sub}
  }

}