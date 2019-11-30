/*
 * @Author: your name
 * @Date: 2019-10-31 09:41:38
 * @LastEditTime: 2019-11-25 14:23:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-todolist\client2\src\app\app.module.ts
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';

import { AppComponent } from './app.component';

import {ButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {PasswordModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import {ListboxModule} from 'primeng/primeng';
import {DataGridModule} from 'primeng/primeng';

import { LoginComponent } from './login/login.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';
import { ListsPipe } from './lists.pipe';

import {JwtModule} from '@auth0/angular-jwt';
import { RegisterComponent } from './register/register.component';
import { HttpErrorInterceptor } from './http-error.interceptor';

const routes: Routes  = [
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'todolist', canActivate:[AuthGuard], component: TodoListComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
]

export function tokenGetter(){
  return sessionStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodoListComponent,
    PageNotFoundComponent,
    ListsPipe,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ButtonModule,
    InputTextModule,
    PasswordModule,
    PanelModule,
    TabViewModule,
    MessagesModule,
    ListboxModule,
    DataGridModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:tokenGetter,
        whitelistedDomains:['localhost:3000'],
        blacklistedRoutes:['localhost:3001/api/authorize/']
      }
    })
  ],
  providers: [
    AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
