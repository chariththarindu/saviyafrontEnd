import { Category } from "./../model/category.model";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ProductService } from "../service/product.service";
import { HttpClient, HttpEvent, HttpEventType } from "@angular/common/http";
import { AuthService } from "../service/auth.service";
import { ActivatedRoute } from "@angular/router";
import { Product } from "../model/product.model";

@Component({
  selector: "app-user-product-add",
  templateUrl: "./user-product-add.component.html",
  styleUrls: ["./user-product-add.component.css"]
})
export class UserProductAddComponent implements OnInit {
  form: FormGroup;
  progress: number = 0;
  categories: Category[];

  constructor(
    private productService: ProductService,
    public fb: FormBuilder,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [""],
      categoryId: [""],
      description: [""],
      image: [null]
    });
    this.productService.getProductCategories().subscribe((res: Category[]) => {
      console.log("category list:" + res);
      this.categories = res;
    });
  }

  changeCategory(e: { value: any; target: { value: any } }) {
    console.log(e.value);
    this.form.patchValue({
      categoryId: e.target.value
    });
    this.form.get("categoryId").updateValueAndValidity();
    // this.categoryId.setValue(e.target.value, {
    //   onlySelf: true
    // })
  }

  uploadFile(event: { target: HTMLInputElement }) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image: file
    });
    this.form.get("image").updateValueAndValidity();
  }

  onSubmit() {
    console.log(this.form);
    alert(this.form.get("categoryId").value);
    const formData = new FormData();
    formData.append("name", this.form.get("name").value);
    formData.append("categoryId", this.form.get("categoryId").value);
    formData.append("description", this.form.get("description").value);
    formData.append("image", this.form.get("image").value);
    const p: Product = new Product();
    p.name = this.form.get("name").value;
    p.categoryId = this.form.get("categoryId").value;
    p.description = this.form.get("description").value;
    p.image = this.form.get("image").value;
    this.productService
      .createProduct(formData)
      .subscribe((event: HttpEvent<any>) => {
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
