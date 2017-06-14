import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {};

  submitted = false;

  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
  }

  doLogin() { 
    this.submitted = true;
    this.http.post('/user', this.user).map(res => {let body = res.json();return body||body.data || {};}).subscribe(user => {
      console.log(user);
      if(user.success){
        sessionStorage.setItem('koa2-blog', JSON.stringify(user));
        alert('登陆成功');
        this.router.navigate(['/todolist']);
      }else{
        alert(user.info);
      }
    }, error => {
      console.log(error);
    });



    
   
   }

   private handleError (error: Response | any) {
  // In a real world app, you might use a remote logging infrastructure
  let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err =  JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Observable.throw(errMsg);
}

}
