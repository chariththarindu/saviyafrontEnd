import { Product } from "./../model/product.model";
import { Injectable } from "@angular/core";

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FileResponse } from "../model/fileResponse.model";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { FormGroup } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  formData: Product;
  readonly rootUrl = "http://localhost:8020/v1/saviya";

  options: any = {
    json: true,
  };

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(this.rootUrl + "/business/product");
  }

  getProductByUUID(uuid: String) {
    console.log(" product uuid:-" + uuid);
    return this.http
      .get(`${this.rootUrl}/business/product/${uuid}`, this.options)
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError((error) => {
          return throwError("Something went wrong!");
        })
      );
  }

  createProduct(formData: FormData): Observable<any> {
    console.log("inside file upload servvice");
    return this.http
      .post(this.rootUrl + "/business/product", formData, {
        reportProgress: true,
        observe: "events",
      })
      .pipe(catchError(this.errorMgmt));
  }

  updateProduct(product: Product): Observable<any> {
    console.log("inside product update service");
    return this.http
      .put(this.rootUrl + "/business/product", product)
      .pipe(catchError(this.errorMgmt));
  }

  deleteProductByProductUUID(uuid: string) {
    return this.http
      .delete(`${this.rootUrl}/business/product/${uuid}`)
      .pipe(catchError(this.errorMgmt));
  }

  uploadSingleFile(formData: FormData, prodUID: string): Observable<any> {
    return this.http
      .post(
        `${this.rootUrl}/business/product/${prodUID}/productImage`,
        formData,
        {
          reportProgress: true,
          observe: "events",
        }
      )
      .pipe(catchError(this.errorMgmt));
  }

  deleteSingleFile(fileuid: string) {
    return this.http
      .delete(`${this.rootUrl}/business/productImage/${fileuid}`)
      .pipe(catchError(this.errorMgmt));
  }

  getProductImagesByProductUUID(uuid: String) {
    console.log(" product uuid:-" + uuid);

    return this.http
      .get(
        `${this.rootUrl}/business/product/${uuid}/productImage`,
        this.options
      )
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError((error) => {
          return throwError("Something went wrong!");
        })
      );
  }

  getProductCategories() {
    return this.http
      .get(`${this.rootUrl}/business/category`, this.options)
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError(this.errorMgmt)
      );
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
