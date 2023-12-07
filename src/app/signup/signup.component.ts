import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { SnackbarService } from '../Services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constants';
import { User } from '../Models/user.model';
import { AuthRequest } from '../Models/auth-request';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  password=true;
  confirmPassword=true;
  signupForm:any=FormGroup;
  responseMessage:any;
  authRequest! : AuthRequest;
  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private userService:UserService,
    private snackbarService:SnackbarService,
    private ngxService:NgxUiLoaderService) { }
    
  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      password:[null,[Validators.required]],
      confirmPassword:[null,[Validators.required]]
    })
    
  }
  validateSubmit(){
    if(this.signupForm.controls['password'].value != this.signupForm.controls['confirmPassword'].value){
  return true;
    }else{
      return false;
    }
  }
  handleSubmit(){
    this.ngxService.start();
    var formData=this.signupForm.value;
    this.authRequest={
      name: formData.name,
      username:formData.email,
      password:formData.password
    }
    this.userService.signup(this.authRequest).subscribe((response:any)=>{
      this.ngxService.stop();
      this.snackbarService.openSnackBar(this.responseMessage,"");
      this.router.navigate(['/espacepersonnel/binder']);
      localStorage.setItem("accessToken", response.accessToken);
    },(error)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }else{
        this.responseMessage=GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }
  
  

}
