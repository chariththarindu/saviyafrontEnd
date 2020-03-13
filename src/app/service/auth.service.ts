import { HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../model/user.model";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  endPoint: String = "http://localhost:8020/users";
  headers = new HttpHeaders().set("Content-Type", "application/json");
  currentUser = {};

  constructor(private http: HttpClient, public router: Router) {}

  register(user: User): Observable<any> {
    let api = `${this.endPoint}`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  login(user: User) {
    return this.http
      .post<any>(`${this.endPoint}/login`, user, { observe: "response" })
      .subscribe((res: any) => {
        console.log(res.headers.get("token"));
        localStorage.setItem("access_token", res.headers.get("token"));
        this.getUserProfile(res.headers.get("userId")).subscribe(res => {
          this.currentUser = res;
          this.router.navigate(["/product/add"]);
        });
      });
  }

  getUserProfile(id: String): Observable<any> {
    let api = `${this.endPoint}/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem("access_token");
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem("access_token");
    if (removeToken == null) {
      this.router.navigate(["login"]);
    }
  }

  getToken() {
    return localStorage.getItem("access_token");
  }

  handleError(error: HttpErrorResponse) {
    let msg = "";
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
