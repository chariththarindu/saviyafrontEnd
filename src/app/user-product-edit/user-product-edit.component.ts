import { FilePreviewModel } from "ngx-awesome-uploader";
import { FileResponse } from "../model/fileResponse.model";
import { AuthService } from "./../service/auth.service";
import { ProductService } from "./../service/product.service";
import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormBuilder } from "@angular/forms";
import { HttpClient, HttpEvent, HttpEventType } from "@angular/common/http";
import { ImageFilePickerAdapter } from "../image-file-picker.adapter";
import { ActivatedRoute } from "@angular/router";
import { Product } from "../model/product.model";

@Component({
  selector: "app-user-product-edit",
  templateUrl: "./user-product-edit.component.html",
  styleUrls: ["./user-product-edit.component.css"]
})
export class UserProductEditComponent implements OnInit {
  // fileData: File = null;
  // previewUrl: any = null;
  // fileUploadProgress: string = null;
  // uploadedFilePath: string = null;
  form: FormGroup;
  progress: number = 0;
  imgSet = new Set<FilePreviewModel>();
  imageMap = new Map<string, FileResponse>();
  adapter = new ImageFilePickerAdapter(this.http, this.imageMap, this.imgSet);
  constructor(
    private productService: ProductService,
    private http: HttpClient,
    public authSerive: AuthService,
    public fb: FormBuilder,
    private actRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: [""],
      categoryId: [""],
      description: [""],
      avatar: [null]
    });
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.productService.formData = new Product();
    this.adapter = new ImageFilePickerAdapter(
      this.http,
      this.imageMap,
      this.imgSet
    );
  }

  onSubmit(form: NgForm) {
    console.log("adding product....");
    console.log(form);
    this.insertProduct(form);
    const formData = new FormData();
    this.adapter = new ImageFilePickerAdapter(
      this.http,
      this.imageMap,
      this.imgSet
    );
  }

  insertProduct(form: NgForm) {
    console.log("map size before inserting :-" + this.imageMap.size);
    this.productService
      .createProduct(form.value, this.imageMap)
      .subscribe(res => {
        this.resetForm(form);
        for (let entry of this.imgSet.entries()) {
          this.adapter.removeFile(entry[0]);
        }
      });
  }
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];

    for (var item in (event.target as HTMLInputElement).files) {
      console.log((event.target as HTMLInputElement).files[item]);
    }
    this.form.patchValue({
      avatar: file
    });
    this.form.get("avatar").updateValueAndValidity();
  }

  submitUser() {
    console.log(this.form);
    this.productService
      .fileUpload(this.form.value.avatar)
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
