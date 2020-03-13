import { AuthService } from "./../service/auth.service";
import { ProductService } from "./../service/product.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient, HttpEventType, HttpHeaders } from "@angular/common/http";
import { ImageFilePickerAdapter } from "../image-file-picker.adapter";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user-product-edit",
  templateUrl: "./user-product-edit.component.html",
  styleUrls: ["./user-product-edit.component.css"]
})
export class UserProductEditComponent implements OnInit {
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  adapter = new ImageFilePickerAdapter(this.http);
  constructor(
    private productService: ProductService,
    private http: HttpClient,
    public authSerive: AuthService,
    private actRoute: ActivatedRoute
  ) {}

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
    const formData = new FormData();
    formData.append("file", this.fileData);

    this.fileUploadProgress = "0%";

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "multipart/form-data",
    //     Authorization:
    //       "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI3ODhlYjljNS1jZTU2LTRlNWEtODI1Ni0wNGM5NjE1ODgyYzMiLCJleHAiOjE1ODMxMjkzNTV9._RScADYjKGzhYJfgfpBpPBwMxbO5ywd1aeARkZQClZ9k9ldHuVdwbNWVLkeTq5y5NJvye1h49HxOXPDoE8jXUw"
    //   })
    // };

    this.http
      .post(
        "http://localhost:8020/v1/saviya/upload/productImageUpload",
        formData,
        {
          headers: new HttpHeaders({
            "Content-Type": "multipart/form-data",
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI3ODhlYjljNS1jZTU2LTRlNWEtODI1Ni0wNGM5NjE1ODgyYzMiLCJleHAiOjE1ODMxMjkzNTV9._RScADYjKGzhYJfgfpBpPBwMxbO5ywd1aeARkZQClZ9k9ldHuVdwbNWVLkeTq5y5NJvye1h49HxOXPDoE8jXUw"
          }),
          reportProgress: true,
          observe: "events"
        }
      )
      .subscribe(events => {
        if (events.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress =
            Math.round((events.loaded / events.total) * 100) + "%";
          console.log(this.fileUploadProgress);
        } else if (events.type === HttpEventType.Response) {
          this.fileUploadProgress = "";
          console.log(events.body);
          alert("SUCCESS !!");
        }
      });
  }

  insertProduct(form: NgForm) {
    this.productService.createProduct(form.value).subscribe(res => {
      this.resetForm(form);
    });
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = _event => {
      this.previewUrl = reader.result;
    };
  }
}
