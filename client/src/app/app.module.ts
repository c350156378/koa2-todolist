import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule }    from '@angular/http';

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

const routes: Routes  = [
  
  {path:'login', component: LoginComponent},
  {path:'todolist', canActivate:[AuthGuard], component: TodoListComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodoListComponent,
    PageNotFoundComponent,
    ListsPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    ButtonModule,
    InputTextModule,
    PasswordModule,
    PanelModule,
    TabViewModule,
    MessagesModule,
    ListboxModule,
    DataGridModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
