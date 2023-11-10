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
import { FullComponent } from './layouts/full/full.component';
import { MaterialModule } from './shared/material-module';
import { AppRoutingModule } from './app-routing.module';
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/full/header/header.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: "Loading...",
  textColor: "#FFFFFF",
  textPosition: "center-center",
  fgsColor: "7b1fa2",
fgsType:SPINNER.squareJellyBox,
fgsSize:100,
hasProgressBar:false
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    BasMenusAcceuilComponent,
    FullComponent,
    SidebarComponent,
    HeaderComponent

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
    AppRoutingModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)

  ],
  providers: [HttpClientModule,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
