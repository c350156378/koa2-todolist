/*
 * @Author: your name
 * @Date: 2019-10-31 09:41:38
 * @LastEditTime: 2019-11-19 17:15:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-todolist\client2\src\app\auth.guard.ts
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      // return true;
      if(sessionStorage.getItem('access_token')){
        return true;
      }else{
        this.router.navigate(['/login']);
        return false;
      }
   
  }
}
