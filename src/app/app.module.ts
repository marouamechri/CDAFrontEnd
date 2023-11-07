import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { SharedModule } from './shared/shared.module';
import { TokenInterceptorService } from './Services/token-interceptor.interceptor';
import { BasMenusAcceuilComponent } from './bas-menus-acceuil/bas-menus-acceuil.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FullComponent } from './sidebar/full.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { RouterModule, Routes } from '@angular/router';
import { FullMaterialModule } from './material-component/full-material.module';
import { MaterialModule } from './shared/material-module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    BasMenusAcceuilComponent,
    FullComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxUiLoaderModule, 
    BrowserAnimationsModule,
    MaterialModule,
    DashboardModule,
    RouterModule,
    FullMaterialModule,
    AppRoutingModule,


  ],
  providers: [HttpClientModule,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
