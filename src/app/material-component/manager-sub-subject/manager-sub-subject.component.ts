import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SubSubject } from 'src/app/Models/subSubjects.medel';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { SubSubjectService } from 'src/app/Services/sub-subject.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { SubSubjectComponent } from '../dialog/sub-subject/sub-subject.component';

@Component({
  selector: 'app-manager-sub-subject',
  templateUrl: './manager-sub-subject.component.html',
  styleUrls: ['./manager-sub-subject.component.css']
})
export class ManagerSubSubjectComponent implements OnInit {
  responseMessage: any;
  dataSource:    SubSubject[] =[];
  stringIdSubject: any = localStorage.getItem('idSubject');
  idSubject: number = parseInt(this.stringIdSubject, 10) ;

  stringIdSpace: any = localStorage.getItem('idSpace');
  idSpace: number = parseInt(this.stringIdSpace, 10) ;

   constructor(
    private subSubjectService:SubSubjectService,
    private ngxService:NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService:SnackbarService,
    private router:Router,
    ){}
    ngOnInit(): void {
      console.log(localStorage);
      this.ngxService.start();
      this.subSubjectData();
    }
    subSubjectData(){
      var data: any={
        idSpace:this.idSpace,
        idSubject :this.idSubject
      }
      this.subSubjectService.getAllSubSubjectBySubject(data).subscribe((response: any) => {
        this.ngxService.stop();
        this.dataSource = response;
      }, (error: any) => {
        this.ngxService.stop();
        console.log(error.error?.messsage);
        if (error.error?.messsage) {
          this.responseMessage = error.error?.messsage;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      })
    }
    handleAddSubSubject() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        action: "Add"
      };
      dialogConfig.width = "850px";
      const dialogRef = this.dialog.open(SubSubjectComponent, dialogConfig);
      this.router.events.subscribe(() => {
        dialogRef.close();
      });
      const sub = dialogRef.componentInstance.onAddSubSubject.subscribe((response) => {
        this.subSubjectData();
      })
    }

    handleEditSubSubject(values: any) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        action: "Edit",
        data: values
      };
      dialogConfig.width = "850px";
      const dialogRef = this.dialog.open(SubSubjectComponent, dialogConfig);
      this.router.events.subscribe(() => {
        dialogRef.close();
      });
      const sub = dialogRef.componentInstance.onEditSubSubject.subscribe((response) => {
        this.subSubjectData();
      })
    }
    redirectToManagerSubSubject(id:any){
      localStorage.setItem('idSubSubject',id);

      this.router.navigate(['/espacepersonnel/event']);

    }

}
