import { Product } from "./../model/product.model";
import { FormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ProductService } from "../service/product.service";

@Component({
  selector: "app-user-product-list",
  templateUrl: "./user-product-list.component.html",
  styleUrls: ["./user-product-list.component.css"]
})
export class UserProductListComponent implements OnInit {
  products: Product[];
  // products = [
  //   {
  //     id: 1,
  //     name: "Soap",
  //     description: " Items for selling",
  //     price: "170.00",
  //     quantity: 56840
  //   },
  //   {
  //     id: 2,
  //     name: "lunch box",
  //     description: "lunch box for sale",
  //     price: "302.00",
  //     quantity: 9358
  //   },
  //   {
  //     id: 3,
  //     name: "Pillow",
  //     description: "For sale in pillow",
  //     price: "279.00",
  //     quantity: 90316
  //   },
  //   {
  //     id: 4,
  //     name: "Gloves",
  //     description: "Out door gloves",
  //     price: "760.00",
  //     quantity: 5899
  //   }
  // ];
  constructor(private productService: ProductService, public fb: FormBuilder) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }
}
