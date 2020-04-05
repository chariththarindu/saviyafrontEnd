import { catchError, map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PublicSearchService {
  readonly searchUrl = "http://localhost:8020/public/v1/saviya";

  constructor(private http: HttpClient) {}

  getAllproducts() {
    let options: any = {
      json: true,
    };
    return this.http.get(this.searchUrl + "/business/product", options).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError("Something went wrong!");
      })
    );
  }
}
