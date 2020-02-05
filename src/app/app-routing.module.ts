import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserProductEditComponent } from "./user-product-edit/user-product-edit.component";
import { HomeComponent } from "./home/home.component";
import { UserProductListComponent } from "./user-product-list/user-product-list.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
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
    component: UserProductEditComponent
  },
  {
    path: "product/:id",
    component: UserProductEditComponent
  },
  {
    path: "products",
    component: UserProductListComponent
  },
  { path: "**", redirectTo: "/home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
