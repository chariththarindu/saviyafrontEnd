import { FileResponse } from "./../../model/fileResponse.model";
import { Component, OnInit, Input } from "@angular/core";
import { ProductService } from "src/app/service/product.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Product } from "src/app/model/product.model";
import { HttpEvent, HttpEventType } from "@angular/common/http";

@Component({
  selector: "app-product-image",
  templateUrl: "./product-image.component.html",
  styleUrls: ["./product-image.component.css"],
})
export class ProductImageComponent implements OnInit {
  @Input() productUUID: string;
  imageForm: FormGroup;
  progress: number = 0;
  product: Product;
  images: FileResponse[];

  constructor(private productService: ProductService, public fb: FormBuilder) {}

  ngOnInit() {
    this.imageForm = this.fb.group({
      image: [null],
    });
    console.log(
      "calling product image form on init11111111111" + this.productUUID
    );
    this.productService
      .getProductImagesByProductUUID(this.productUUID)
      .subscribe((res: FileResponse[]) => {
        this.images = res;
      });
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.imageForm.patchValue({
      image: file,
    });
    this.imageForm.get("image").updateValueAndValidity();
  }

  onSubmit() {
    console.log(this.imageForm);
    const formData = new FormData();
    formData.append("image", this.imageForm.get("image").value);
    // formData.append("uuid", this.productUUID);
    formData.append("base", "0");
    const p: Product = new Product();
    p.image = this.imageForm.get("image").value;
    console.log("calling product image form....>>>>>>>>>>>>> ");
    this.productService
      .uploadSingleFile(formData, this.productUUID)
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
            this.productService
              .getProductImagesByProductUUID(this.productUUID)
              .subscribe((res: FileResponse[]) => {
                this.images = res;
              });
            setTimeout(() => {
              this.progress = 0;
            }, 1500);
        }
      });
  }
}
