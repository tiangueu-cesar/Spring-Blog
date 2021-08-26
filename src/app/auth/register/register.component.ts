import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import {RegistryDomSchemaChecker} from "@angular/compiler-cli/src/ngtsc/typecheck/src/dom";
import {RegisterPayload} from "./register.payload";
import {AuthService} from "../../auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerPayload: RegisterPayload;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    this.registerPayload = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  ngOnInit(): void {}

  public onSubmit() {
    this.registerPayload.username = this.registerForm.controls['username'].value;
    this.registerPayload.email = this.registerForm.controls['email'].value;
    this.registerPayload.password = this.registerForm.controls['password'].value;
    this.registerPayload.confirmPassword = this.registerForm.controls['confirmPassword'].value;

    this.authService.register(this.registerPayload).subscribe(
        (response: RegisterPayload) => {
          console.log('register-success');
          this.router.navigateByUrl('/register-success');
        }, (error: HttpErrorResponse) => {
          console.log('register-failed');
          alert(error.message);
        }
    );
  }

}
