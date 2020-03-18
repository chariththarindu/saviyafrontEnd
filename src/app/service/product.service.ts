import { Product } from "./../model/product.model";
import { Injectable } from "@angular/core";

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FileResponse } from "../model/fileResponse.model";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  formData: Product;
  readonly rootUrl = "http://localhost:8020/v1/saviya";

  constructor(private http: HttpClient) {}

  createProduct(formData: Product, imgMap: Map<string, FileResponse>) {
    const list = new Array<FileResponse>();

    for (let entry of imgMap.entries()) {
      console.log("test:- " + entry[0], entry[1]);
      const fileResponse = new FileResponse();
      fileResponse.uploadId = entry[1].uploadId;
      fileResponse.url = entry[1].url;
      //formData.productImageList.set(entry[0], fileResponse);
      list.push(fileResponse);
    }

    formData.imgList = list;
    return this.http.post(this.rootUrl + "/business", formData);
  }

  fileUpload(profileImage: File): Observable<any> {
    var formData: any = new FormData();
    // formData.append("name", name);
    formData.append("file", profileImage);

    return this.http
      .post(
        "http://localhost:8020/v1/saviya/upload/productImageUpload",
        formData,
        {
          reportProgress: true,
          observe: "events"
        }
      )
      .pipe(catchError(this.errorMgmt));
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
