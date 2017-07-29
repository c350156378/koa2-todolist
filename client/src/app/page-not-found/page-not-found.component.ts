import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  count: number = 4;

  constructor(public router: Router) { }

  ngOnInit() {
    let t = setInterval(() => {
      this.count--;
      if(this.count <=-1){
        clearInterval(t);
        this.router.navigate(['/todolist']);
      }
    }, 1000);
  }

}
