import { PublicSearchService } from "./service/public-search.service";
import { AuthInterceptor } from "./service/authconfig.interceptor";
import { ProductService } from "./service/product.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { UserProductEditComponent } from "./user-product-edit/user-product-edit.component";
import { UserProductListComponent } from "./user-product-list/user-product-list.component";
import { HomeComponent } from "./home/home.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FooterComponent } from "./footer/footer.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { FilePickerModule } from "ngx-awesome-uploader";
import { UserProductAddComponent } from "./user-product-add/user-product-add.component";
import { ProductInfoComponent } from './user-product-edit/product-info/product-info.component';
import { ProductImageComponent } from './user-product-edit/product-image/product-image.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    UserProductEditComponent,
    UserProductListComponent,
    HomeComponent,
    FooterComponent,
    ProductDetailComponent,
    UserProductAddComponent,
    ProductInfoComponent,
    ProductImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FilePickerModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    PublicSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
