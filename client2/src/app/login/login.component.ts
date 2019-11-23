/*
 * @Author: your name
 * @Date: 2019-10-31 09:41:38
 * @LastEditTime: 2019-11-18 11:34:57
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
    this.http.post<any>('/api/authorize', this.user)
      .pipe(
        tap((user) => console.log(user)),
        catchError(this.handleError<any>('/api/authorize'))
      ).subscribe(res => {
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
