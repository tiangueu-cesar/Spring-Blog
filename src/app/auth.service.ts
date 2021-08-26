import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RegisterPayload } from "./auth/register/register.payload";
import { Observable } from 'rxjs';
import { environment } from "../environments/environment";
import { JwtAuthResponse } from "./login/Jwt-auth-response";
import { LoginPlayload } from "./login/login-playload";
import { LocalStorageService } from 'ngx-webstorage';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl: string = environment.apiServerUrl;

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { }

  public register(registerPayLoad: RegisterPayload): Observable<any> {
      return this.httpClient.post<any>(`${this.authUrl}/api/auth/signup`, registerPayLoad);
  }

  public login(loginPlayload: LoginPlayload): Observable<boolean> {
      return this.httpClient.post<JwtAuthResponse>(`${this.authUrl}/api/auth/login`, loginPlayload).pipe(map(data => {
        this.localStorageService.store('authentication', data.authenticationToken);
        this.localStorageService.store('username', data.username);
        return true;
      }));
  }

  public isAuthenticated(): boolean {
    return this.localStorageService.retrieve('username') !== null;
  }

  public logout() {
    this.localStorageService.clear('authentication');
    this.localStorageService.clear('username');
  }
}
