import { AuthGuard } from "./service/auth.guard";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserProductEditComponent } from "./user-product-edit/user-product-edit.component";
import { HomeComponent } from "./home/home.component";
import { UserProductListComponent } from "./user-product-list/user-product-list.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { UserProductAddComponent } from "./user-product-add/user-product-add.component";

const routes: Routes = [
  {
    path: " ",
    component: HomeComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "product/add",
    component: UserProductAddComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "product/edit/:id",
    component: UserProductEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "products",
    component: UserProductListComponent
  },
  {
    path: "product-detail",
    component: ProductDetailComponent
  },

  { path: "**", redirectTo: "/home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
