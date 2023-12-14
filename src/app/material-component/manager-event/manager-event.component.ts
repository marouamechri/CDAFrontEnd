import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EventService } from 'src/app/Services/event.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { SubSubjectComponent } from '../dialog/sub-subject/sub-subject.component';
import { EventComponent } from '../dialog/event/event.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manager-event',
  templateUrl: './manager-event.component.html',
  styleUrls: ['./manager-event.component.css']
})
export class ManagerEventComponent implements OnInit{

  responseMessage: any;

  dataSourceTraitement: any[]=[];
  dataSourceConsultation:any[]=[];
  dataSourceAnalyse:any[]=[];

  stringIdSubject: any = localStorage.getItem('idSubject');
  idSubject: number = parseInt(this.stringIdSubject, 10) ;

  stringIdSpace: any = localStorage.getItem('idSpace');
  idSpace: number = parseInt(this.stringIdSpace, 10) ;

  stringIdSubSubject: any = localStorage.getItem('idSubSubject');
  idSubSubject: number = parseInt(this.stringIdSubSubject, 10) ;

  nameBinder:any=localStorage.getItem("nameBinder");

  constructor(
    private EventService:EventService,
    private ngxService:NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService:SnackbarService,
    private router:Router,
    private location :Location
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
        isValidate: false
      }
      this.EventService.getEventBySuSubject(data).subscribe((response:any) => {
        this.ngxService.stop();
        if(response){
          //initialiser les tableaux
          this.dataSourceAnalyse=[];
          this.dataSourceConsultation=[];
          this.dataSourceTraitement=[];

          response.forEach((element:any) => {
            switch(element.event.natureAction.title){
              case"Consultation":
              this.dataSourceConsultation.push(element);
              break;
              case "Traitement":
              this.dataSourceTraitement.push(element);
              break;
              case "Analyse":
                this.dataSourceAnalyse.push(element);
                break;
                default:
                  this.responseMessage="Liste est vide"
                break
            }
          });
        } 
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
        window.location.reload();//rafraichir la page

      })
    }
    handleUpdateEvent(values: any) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        action: "Update",
        data: values
      };
      console.log("valuesUpdate:"+ values);
      dialogConfig.width = "850px";
      const dialogRef = this.dialog.open(EventComponent, dialogConfig);
      this.router.events.subscribe(() => {
        dialogRef.close();
      });
      const sub = dialogRef.componentInstance.onEditEvent.subscribe((response) => {
        this.getEventsData();
        window.location.reload();//rafraichir la page

      })
    }
    handleDeleteEvent(value:any){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        message: 'supprimer cet événement!',
        confirmation: true
      }
      const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
      const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response) => {
        this.ngxService.start();
        this.deleteEvent(value);
        //window.location.reload();//rafraichir la page
        dialogRef.close();
      })
    }
    deleteEvent(id: any) {
      var data: any={
        idSpace:this.idSpace,
        idSubject :this.idSubject,
        idSubSubject:this.idSubSubject,
        idEvent: parseInt(id,10)
      }
      this.EventService.deleteEvent(data).subscribe((response:any)=>{
        this.ngxService.stop();
        this.getEventsData();
        this.responseMessage="L'événement a bien été supprimé!";
        this.snackbarService.openSnackBar(this.responseMessage,"success");
        window.location.reload();//rafraichir la page

      },(error)=>{
        this.ngxService.stop();
        console.log(error);
        this.responseMessage = GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      })
        }
      
  
    handleEdite(id: any){
      localStorage.setItem('idEvent',id);

      this.router.navigate(['/espacepersonnel/editEvent']);
    }
    previous() {
      this.location.back()
    }

}
