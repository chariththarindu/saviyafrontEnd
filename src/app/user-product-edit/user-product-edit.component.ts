import { ProductService } from "./../service/product.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-user-product-edit",
  templateUrl: "./user-product-edit.component.html",
  styleUrls: ["./user-product-edit.component.css"]
})
export class UserProductEditComponent implements OnInit {
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.productService.formData = {
      businessId: null,
      description: null,
      categoryId: null,
      name: null,
      status: null
    };
  }

  onSubmit(form: NgForm) {
    this.insertProduct(form);
  }

  insertProduct(form: NgForm) {
    this.productService.createProduct(form.value).subscribe(res => {
      this.resetForm(form);
    });
  }
}
