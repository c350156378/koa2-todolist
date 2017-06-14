import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  userEmail = '';
  user_id = '';
  todos: '';
  activeName: 'first';
  lists = [];
  count = 0;
  alerts: any = [];

  private apiUrl = '/api/todolist';

  constructor(private http: Http) { }

  ngOnInit() {
    this.userEmail = JSON.parse(sessionStorage.getItem('koa2-blog')).userEmail;
    this.user_id = JSON.parse(sessionStorage.getItem('koa2-blog')).userId;
    this.getTodos();
  }

  Done(): any {
    let count = 0;
    let length = this.lists.length;
    for (let i in this.lists) {
      this.lists[i].status == true ? count += 1 : '';
    }

    this.count = count;
    if (count == length || length == 0) {
      return true;
    } else {
      return false;
    }

  }

  addTodos(event) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let jwt = JSON.parse(sessionStorage.getItem('koa2-blog')).token;
    if (jwt) {
      headers.append('Authorization', 'Bear ' + jwt);
    }
    let options = new RequestOptions({ headers: headers });
    if (event.keyCode == 13) {
      if (this.todos == '')
        return;
      let obj = {
        user_id: this.user_id,
        status: false,
        content: this.todos
      };
      this.http.post(this.apiUrl, JSON.stringify(obj), options)
        .map(res => {
          let body = res.json();
          return body || body.data || {};
        })
        .subscribe(tdlist => {
          if (tdlist.status) {

            this.alerts = [];
            this.alerts.push({
              type: 'success',
              msg: `创建成功`,
              timeout: 2000
            });
            
          } else {
            this.alerts = [];
            this.alerts.push({
              type: 'danger',
              msg: `创建失败`,
              timeout: 2000
            });
          }
          

        }, err => {
          console.log(err);
        });
        this.getTodos();
      this.todos = '';

    }

  }
  getTodos() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let jwt = JSON.parse(sessionStorage.getItem('koa2-blog')).token;
    if (jwt) {
      headers.append('Authorization', 'Bear ' + jwt);
    }
    let options = new RequestOptions({ headers: headers });
    this.http.get(this.apiUrl, options).map(res => {
      let body = res.json();
      return body || body.data || {};
    }).subscribe(tdlist => {
      console.log(tdlist);
      if (tdlist.status == 200) {
        this.lists = tdlist.data;
      } else {
        this.alerts = [];
        this.alerts.push({
          type: 'danger',
          msg: `获取列表失败`,
          timeout: 2000
        });
      }

    }, err => {
      console.log(err);
    });
  }

  finished(index) {

    //this.lists[index].status = true;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let jwt = JSON.parse(sessionStorage.getItem('koa2-blog')).token;
    if (jwt) {
      headers.append('Authorization', 'Bear ' + jwt);
    }
    let options = new RequestOptions({ headers: headers });
    this.http
      .put('/api/todolist', JSON.stringify({ id: this.lists[index]._id, status: true }), options)
      .map(res => {
        let body = res.json();
        return body || body.data || {};
      })
      .subscribe(tdlist => {
        if (tdlist.success) {
          // this.lists[index].status = true;
          this.alerts = [];
          this.alerts.push({
            type: 'warning',
            msg: `已完成 ${(new Date()).toLocaleTimeString()}`,
            timeout: 2000
          });
        }
        this.getTodos();
      });


  }

  restore(index) {
    //this.lists[index].status = false;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let jwt = JSON.parse(sessionStorage.getItem('koa2-blog')).token;
    if (jwt) {
      headers.append('Authorization', 'Bear ' + jwt);
    }
    let options = new RequestOptions({ headers: headers });

    this.http
      .put('/api/todolist', JSON.stringify({ id: this.lists[index]._id, status: false }), options)
      .map(res => {
        let body = res.json();
        return body || body.data || {};
      })
      .subscribe(tdlist => {
        if (tdlist.success) {

          this.alerts = [];
          this.alerts.push({
            type: 'success',
            msg: `恢复成功 ${(new Date()).toLocaleTimeString()}`,
            timeout: 2000
          });
        }
        this.getTodos();
      });
  }

  remove(index) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let jwt = JSON.parse(sessionStorage.getItem('koa2-blog')).token;
    if (jwt) {
      headers.append('Authorization', 'Bear ' + jwt);
    }
    let options = new RequestOptions({ headers: headers });
    //this.lists.splice(index, 1);
    this.http.delete(`/api/todolist/${this.lists[index]._id}`, options)
      .map(res => {
        let body = res.json();
        return body || body.data || {};
      })
      .subscribe((tdlist) => {
        if (tdlist.success) {
          this.alerts = [];
          this.alerts.push({
            type: 'danger',
            msg: `删除成功 ${(new Date()).toLocaleTimeString()}`,
            timeout: 2000
          });
        }
        this.getTodos();
      });

  }

}
