import { AuthService } from "./../service/auth.service";
import { ProductService } from "./../service/product.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { HttpClient, HttpEvent, HttpEventType } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { Product } from "../model/product.model";

@Component({
  selector: "app-user-product-edit",
  templateUrl: "./user-product-edit.component.html",
  styleUrls: ["./user-product-edit.component.css"]
})
export class UserProductEditComponent implements OnInit {
  productId: String;
  constructor(private actRoute: ActivatedRoute) {}

  ngOnInit() {
    this.actRoute.params.subscribe(params => {
      this.productId = params["id"];
    });
  }
}
