/*
 * @Author: your name
 * @Date: 2019-11-25 14:10:52
 * @LastEditTime: 2019-11-25 16:13:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-todolist\client2\src\app\http-error.interceptor.ts
 */
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error:HttpErrorResponse)=>{
          let errorMessage = '';
          if(error.error instanceof ErrorEvent){
            //client error
            errorMessage = `Intercept Error: ${error.error.message}`;
          }else{
            // server error
            switch(error.status){
              case 201:
                  errorMessage = '用户名已存在';
                break;
              case 504:
                  errorMessage = '请求服务器失败';
                break;
              default:
                  errorMessage = `Intercept Code:${error.status} \n message:${error.message}`;
            }
            
          }
          window.alert(errorMessage);
          return throwError(errorMessage);
        })
      )
  }
}
