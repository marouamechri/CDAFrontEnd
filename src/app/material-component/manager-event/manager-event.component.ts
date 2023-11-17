import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EventService } from 'src/app/Services/event.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { SubSubjectComponent } from '../dialog/sub-subject/sub-subject.component';
import { EventComponent } from '../dialog/event/event.component';

@Component({
  selector: 'app-manager-event',
  templateUrl: './manager-event.component.html',
  styleUrls: ['./manager-event.component.css']
})
export class ManagerEventComponent implements OnInit{

  responseMessage: any;
  dataSource:    Event[] =[];

  stringIdSubject: any = localStorage.getItem('idSubject');
  idSubject: number = parseInt(this.stringIdSubject, 10) ;

  stringIdSpace: any = localStorage.getItem('idSpace');
  idSpace: number = parseInt(this.stringIdSpace, 10) ;

  stringIdSubSubject: any = localStorage.getItem('idSubSubject');
  idSubSubject: number = parseInt(this.stringIdSubSubject, 10) ;


  constructor(
    private EventService:EventService,
    private ngxService:NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService:SnackbarService,
    private router:Router,
    ){}
    ngOnInit(): void {
      console.log(localStorage);
      this.ngxService.start();
      this.getEventsData();
    }
    getEventsData(){
      var data: any={
        idSpace:this.idSpace,
        idSubject :this.idSubject,
        idSubSubject:this.idSubSubject,
        isActive: true
      }
      this.EventService.getEventBySuSubject(data).subscribe((response: any) => {
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
    handleAddEvent() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        action: "Add"
      };
      dialogConfig.width = "850px";
      const dialogRef = this.dialog.open(EventComponent, dialogConfig);
      this.router.events.subscribe(() => {
        dialogRef.close();
      });
      const sub = dialogRef.componentInstance.onAddEvent.subscribe((response) => {
        this.getEventsData();
      })
    }
    handleEditAction(values: any) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        action: "Edit",
        data: values
      };
      dialogConfig.width = "850px";
      const dialogRef = this.dialog.open(EventComponent, dialogConfig);
      this.router.events.subscribe(() => {
        dialogRef.close();
      });
      const sub = dialogRef.componentInstance.onEditEvent.subscribe((response) => {
        this.getEventsData();
      })
    }
  


}
