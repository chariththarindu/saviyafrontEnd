import { Product } from "./../model/product.model";
import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  formData: Product;
  readonly rootUrl = "http://localhost:8020/v1/saviya";

  constructor(private http: HttpClient) {}

  createProduct(formData: Product) {
    return this.http.post(this.rootUrl + "/business", formData);
  }
}
