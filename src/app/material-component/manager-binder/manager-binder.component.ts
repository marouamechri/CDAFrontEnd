import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Binder } from 'src/app/Models/binder.model';
import { BinderService } from 'src/app/Services/binder.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { BinderComponent } from '../dialog/binder-component/binder-component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-manager-binder',
  templateUrl: './manager-binder.component.html',
  styleUrls: ['./manager-binder.component.css'],
})
export class ManagerBinderComponent implements OnInit {
  responseMessage: any;
  dataSource:    Binder[] =[];

   constructor(
    private binderService:BinderService,
    private ngxService:NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService:SnackbarService,
    private router:Router,
    ){
  }
  ngOnInit(): void {
      this.ngxService.start();
      this.getDataBinder();
  }
  getDataBinder(){
    this.binderService.getBinder().subscribe((reponse:Array<Binder>)=>{
      this.ngxService.stop();
      this.dataSource =reponse;
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error.error?.message);
        if(error.error?.message){
          this.responseMessage = error.error?.message;
        }else{
          this.responseMessage=GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }
  handleAddBinder(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      action:"Ajouter"
    };
    dialogConfig.minHeight= "250px";
    dialogConfig.width="850px";
    const dialogRef = this.dialog.open(BinderComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddBinder.subscribe((response)=>{
      this.getDataBinder();
    })
  }
  handleEditBinder(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: "Edit",
      data: values
    };
    dialogConfig.width = "850px";
    dialogConfig.minHeight= "250px";
    const dialogRef = this.dialog.open(BinderComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditBinder.subscribe((response) => {
      this.getDataBinder();
    })
  }
  handleDeleteBinder(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'delete' + values.title + ' Binder',
      confirmation: true
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response) => {
      this.ngxService.start();
      this.deleteBinder(values.id);
      dialogRef.close();
    })
  }

  deleteBinder(id:number){
    this.binderService.deleteBinder(id).subscribe((reponse:any)=>{
      this.ngxService.stop();
      this.getDataBinder();
      this.responseMessage= reponse?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    },(error)=>{
      this.ngxService.stop();
      console.log(error)
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }
  redirectToManagerSubject(id:any){

      localStorage.setItem('idSpace',id);

      this.router.navigate(['/espacepersonnel/subject']);
  }

}
