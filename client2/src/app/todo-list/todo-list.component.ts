import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
})
export class TodoListComponent implements OnInit {
  headers = new HttpHeaders({ "Content-Type": "application/json" });
  options = { headers: this.headers };
  userEmail = "";
  user_id = "";
  todos: "";
  activeName: "first";
  lists = [];
  count = 0;
  alerts: any = [];
  currentId: number = 0;

  private apiUrl = "/api/list";

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http
      .get("/api/profile")
      .pipe(
        tap((user) => console.log(user)),
        catchError(this.handleError<any>("/api/profile"))
      )
      .subscribe((res) => {
        this.userEmail = res.username;
        this.user_id = res.userId;
      });
    this.getTodos();
  }

  Done(): any {
    let count = 0;
    let length = this.lists.length;
    for (let i in this.lists) {
      this.lists[i].status == true ? (count += 1) : "";
    }

    this.count = count;
    if (count == length || length == 0) {
      return true;
    } else {
      return false;
    }
  }

  addTodos(event) {
    if (event.keyCode == 13) {
      if (!this.todos.trim()) {
        return;
      }
      let obj = {
        uid: this.user_id,
        status: 0,
        content: this.todos,
      };
      this.http
        .post<any>(this.apiUrl, obj)
        .pipe(
          tap((list) => console.log(list)),
          catchError(this.handleError<any>("/api/list"))
        )
        .subscribe((list) => {
          // this.lists = [...this.lists, list];
          this.lists.push(list);
          this.todos = "";
        });
    }
  }
  getTodos() {
    this.http
      .get<any>(this.apiUrl)
      .pipe(
        tap((list) => console.log(list)),
        catchError(this.handleError<any>("api/list"))
      )
      .subscribe(
        (tdlist) => {
          this.lists = tdlist;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  finished(index) {
    this.http
      .patch<any>(`/api/list/${index}`, { status: 1 })
      .pipe(
        tap((list) => console.log(list)),
        catchError(this.handleError<any>("api/list"))
      )
      .subscribe((tdlist) => {
        // const idx = this.lists.findIndex(list=>list._id === index);

        // this.lists.splice(idx,1, tdlist);

        this.lists = this.lists.filter((list) => list._id !== index);
        this.getTodos();
      });
  }

  restore(index) {
    this.http
      .patch<any>(`/api/list/${index}`, { status: 0 })
      .pipe(
        tap((list) => console.log(list)),
        catchError(this.handleError<any>("api/list"))
      )
      .subscribe((tdlist) => {
        // const idx = this.lists.findIndex(list=>list._id == index);
        // this.lists.splice(idx,1, tdlist);
        this.lists = this.lists.filter((list) => list._id !== index);
        this.getTodos();
      });
  }

  remove(index) {
    this.lists = this.lists.filter((list) => list._id !== index);
    this.http
      .delete<any>(`/api/list/${index}`)
      .pipe(
        tap((_) => console.log(index)),
        catchError(this.handleError<any>("delete list"))
      )
      .subscribe();
  }

  showNum(event) {
    this.currentId = event.first;
  }

  logout() {
    sessionStorage.removeItem("access_token");
    this.router.navigate(["/login"]);
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      if (error.status !== 200) {
        sessionStorage.removeItem("access_token");
      }

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
