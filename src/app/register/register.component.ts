import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
      name: [""],
      email: [""],
      password: [""],
      confpassword: [""]
    });
  }

  ngOnInit() {}

  registerUser() {
    this.authService.register(this.signupForm.value).subscribe(res => {
      if (res.result) {
        this.signupForm.reset();
        this.router.navigate(["login"]);
      }
    });
  }
}
