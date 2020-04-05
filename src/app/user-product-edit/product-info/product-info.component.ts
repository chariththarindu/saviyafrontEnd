import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Product } from "src/app/model/product.model";
import { ProductService } from "src/app/service/product.service";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { Category } from "src/app/model/category.model";

@Component({
  selector: "app-product-info",
  templateUrl: "./product-info.component.html",
  styleUrls: ["./product-info.component.css"],
})
export class ProductInfoComponent implements OnInit {
  form: FormGroup;
  progress: number = 0;
  product: Product;
  categories: Category[];
  @Input() productUUID: string;

  constructor(private productService: ProductService, public fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [""],
      categoryId: [""],
      description: [""],
    });
    console.log("calling product image info ...........on init33333333333333");
    this.productService
      .getProductByUUID(this.productUUID)
      .subscribe((res: Product) => {
        this.product = res;
        this.form.patchValue({
          name: this.product.name,
          categoryId: this.product.categoryId,
          description: this.product.description,
        });
      });

    this.productService.getProductCategories().subscribe((res: Category[]) => {
      console.log("category list:" + res);
      this.categories = res;
    });
  }

  changeCategory(e: { value: any; target: { value: any } }) {
    console.log(e.value);
    this.form.patchValue({
      categoryId: e.target.value,
    });
    this.form.get("categoryId").updateValueAndValidity();
  }

  onSubmit() {
    console.log(this.form);
    const p: Product = new Product();
    p.name = this.form.get("name").value;
    p.categoryId = this.form.get("categoryId").value;
    p.description = this.form.get("description").value;
    this.productService.updateProduct(p).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log("Request has been made!");
          break;
        case HttpEventType.ResponseHeader:
          console.log("Response header has been received!");
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round((event.loaded / event.total) * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log("User successfully created!", event.body);
          setTimeout(() => {
            this.progress = 0;
          }, 1500);
      }
    });
  }
}
