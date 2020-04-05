import { PublicSearchService } from "./../service/public-search.service";
import { Component, OnInit } from "@angular/core";
import { Product } from "../model/product.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  productList: Product[];
  constructor(private searchservice: PublicSearchService) {}

  ngOnInit() {
    this.searchservice.getAllproducts().subscribe((data: Product[]) => {
      this.productList = data;
      console.log(data);
    });
  }
}
