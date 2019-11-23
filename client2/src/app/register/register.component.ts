/*
 * @Author: your name
 * @Date: 2019-11-23 15:13:58
 * @LastEditTime: 2019-11-23 15:37:21
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
      .pipe(
        tap((user) => console.log(user)),
        catchError(this.handleError<any>('/api/user'))
      ).subscribe(res => {
        if (res) {
          window.alert(res)
        }
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
