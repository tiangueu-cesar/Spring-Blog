import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { JwtAuthResponse } from "./Jwt-auth-response";
import { AuthService } from "../auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { LoginPlayload } from "./login-playload";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginPlayload: LoginPlayload;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });

    this.loginPlayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {}

  public onSubmit() {
    this.loginPlayload.username = this.loginForm.controls['username'].value;
    this.loginPlayload.password = this.loginForm.controls['password'].value;

    this.authService.login(this.loginPlayload).subscribe(
      (response: boolean) => {
          console.log("Login successful");
          this.router.navigateByUrl('/welcome-page');
      }, (error: HttpErrorResponse) => {
          console.log("Login failed");
          alert(error.message);
      }
    );
  }

}
