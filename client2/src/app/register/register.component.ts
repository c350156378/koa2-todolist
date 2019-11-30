/*
 * @Author: your name
 * @Date: 2019-11-23 15:13:58
 * @LastEditTime: 2019-11-25 14:45:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-todolist\client2\src\app\register\register.component.ts
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = {
    username: '123456789@qq.com',
    password: '123456'
  };

  submitted = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  doLogin() {
    this.submitted = true;
    this.http.post<any>('/api/user', this.user)
      .subscribe(res => {
        if (res && res._id) {
          window.alert('注册成功');
          this.router.navigate(['/login'])
        }
      });
  }
}
