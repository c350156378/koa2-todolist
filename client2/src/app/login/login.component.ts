/*
 * @Author: your name
 * @Date: 2019-10-31 09:41:38
 * @LastEditTime: 2019-11-25 14:42:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-todolist\client2\src\app\login\login.component.ts
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
    this.http.post<any>('/api/authorize', this.user).subscribe(res => {
        if (res) {
          sessionStorage.setItem('access_token', res.access_token);
          console.log('登陆成功');
          this.router.navigate(['/todolist']);
        } else {
          console.log(res.error);
        }
      }, error => {
        console.log(error);
      });
  }
}
