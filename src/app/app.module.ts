import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { LoginComponent } from './login/login.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { Ng2Webstorage } from 'ngx-webstorage';
import { AddPostComponent } from './add-post/add-post.component';
import { EditorModule } from "@tinymce/tinymce-angular";
import { HttpClientInterceptor } from "./http-client-interceptor";
import {CommonModule} from "@angular/common";
import { PostComponent } from './post/post.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    RegisterSuccessComponent,
    WelcomePageComponent,
    AddPostComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2Webstorage.forRoot(),
    RouterModule.forRoot([
      { path: '', component: WelcomePageComponent, pathMatch: 'full'},
      { path: 'register  ', component: RegisterComponent },
      { path: 'post/:id', component: PostComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register-success', component: RegisterSuccessComponent },
      { path: 'welcome-page', component: WelcomePageComponent },
      { path: 'add-post', component: AddPostComponent, canActivate: [AuthGuard]}
    ]),
    HttpClientModule,
    EditorModule,
    CommonModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {

}
