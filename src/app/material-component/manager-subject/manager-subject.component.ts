import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'src/app/Models/subject.model';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { SubjectService } from 'src/app/Services/subject.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { SubjectCompenent } from '../dialog/subject-compenent/subject-compenent';

@Component({
  selector: 'app-manager-subject',
  templateUrl: './manager-subject.component.html',
  styleUrls: ['./manager-subject.component.css']
})
export class ManagerSubjectComponent implements OnInit {

  responseMessage: any;
  dataSource:    Subject[] =[];
  stringIdSpace: any = localStorage.getItem('idSpace');
  idSpace: number = parseInt(this.stringIdSpace, 10) ;
   constructor(
    private subjectService:SubjectService,
    private ngxService:NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService:SnackbarService,
    private router:Router,
    ){}
    ngOnInit(): void {
      this.ngxService.start();
      this.subjectData();
    }

    subjectData(){
      //console.log('localStorage manager Subject: '+localStorage.getItem('accessToken'));
      this.subjectService.getAllSubjectBySpace(this.idSpace).subscribe((response: any) => {
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
    handleAddSubject() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        action: "Add"
      };
      dialogConfig.width = "850px";
      const dialogRef = this.dialog.open(SubjectCompenent, dialogConfig);
      this.router.events.subscribe(() => {
        dialogRef.close();
      });
      const sub = dialogRef.componentInstance.onAddSubject.subscribe((response) => {
        this.subjectData();
      })
    }
    handleEditSubject(values: any) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        action: "Edit",
        data: values
      };
      dialogConfig.width = "850px";
      const dialogRef = this.dialog.open(SubjectCompenent, dialogConfig);
      this.router.events.subscribe(() => {
        dialogRef.close();
      });
      const sub = dialogRef.componentInstance.onEditSubject.subscribe((response) => {
        this.subjectData();
      })
    }
    redirectToManagerSubSubject(id:any){
      localStorage.setItem('idSubject',id);

      this.router.navigate(['/espacepersonnel/subSubject']);

    }
  }