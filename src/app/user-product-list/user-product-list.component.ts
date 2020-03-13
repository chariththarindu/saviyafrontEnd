import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user-product-list",
  templateUrl: "./user-product-list.component.html",
  styleUrls: ["./user-product-list.component.css"]
})
export class UserProductListComponent implements OnInit {
  products = [
    {
      id: 1,
      name: "Soap",
      description: " Items for selling",
      price: "170.00",
      quantity: 56840
    },
    {
      id: 2,
      name: "lunch box",
      description: "lunch box for sale",
      price: "302.00",
      quantity: 9358
    },
    {
      id: 3,
      name: "Pillow",
      description: "For sale in pillow",
      price: "279.00",
      quantity: 90316
    },
    {
      id: 4,
      name: "Gloves",
      description: "Out door gloves",
      price: "760.00",
      quantity: 5899
    }
  ];
  constructor() {}

  ngOnInit() {}
}
