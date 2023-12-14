import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { ConfirmationComponent } from '../material-component/dialog/confirmation/confirmation.component';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  connected: boolean = true;

  constructor(
    private router:Router,
  private dialog:MatDialog
   
  ) {
  }
  ngOnInit(): void {
    console.log("accueilToken: "+localStorage.getItem('accessToken'));
    const token = localStorage.getItem('accessToken');
    if (!token) {
      this.connected = false;
    }
    console.log("connected: "+this.connected);
  }
 
  logout(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      message:'déconnecter',
      confirmation:true
    };
    dialogConfig.width = "850px";
    dialogConfig.height = "200px";

    const dialogRef=this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
      dialogRef.close();
      localStorage.clear();
      window.location.reload();//rafraichir la page
    });

}
}
