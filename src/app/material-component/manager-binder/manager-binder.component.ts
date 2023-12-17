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
import { EventApi } from 'src/app/Models/EventApi.model';
import { EventService } from 'src/app/Services/event.service';
@Component({
  selector: 'app-manager-binder',
  templateUrl: './manager-binder.component.html',
  styleUrls: ['./manager-binder.component.css'],
})
export class ManagerBinderComponent implements OnInit {
  responseMessage: any;
  dataSource:    Binder[] =[];
  dataSourceTraitement: any[]=[];
  dataSourceConsultation:any[]=[];
  dataSourceAnalyse:any[]=[];

   constructor(
    private binderService:BinderService,
    private eventService : EventService,
    private ngxService:NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService:SnackbarService,
    private router:Router,
    ){
  }
  ngOnInit(): void {
      this.ngxService.start();
      this.getDataBinder();
      this.getEvents();
  }
  getDataBinder(){
    this.binderService.getListBinder().subscribe((reponse:Array<Binder>)=>{
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
    console.log(localStorage);
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
      window.location.reload();//rafraichir la page

    });
    const sub = dialogRef.componentInstance.onEditBinder.subscribe((response) => {
      this.getDataBinder();
    })
  }
  handleDeleteBinder(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'supprimer le classeur ' + values.name ,
      confirmation: true
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response) => {
      this.ngxService.start();
      this.deleteBinder(values.id);
      dialogRef.close();
     // window.location.reload();//rafraichir la page

    })
  }

  deleteBinder(id:number){
    this.binderService.deleteBinder(id).subscribe((reponse:any)=>{
      this.ngxService.stop();
      this.getDataBinder();
      this.responseMessage="Le classeur a bien été supprimer!";
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    },(error)=>{
      this.ngxService.stop();
      console.log(error)
       this.responseMessage = GlobalConstants.genericError;
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }
  redirectToManagerSubject(id:any){

      localStorage.setItem('idSpace',id);

      this.router.navigate(['/espacepersonnel/subject']);
  }
  getEvents(){
    var data: any={
      isValidate:false
    }
    
    this.eventService.getEventsByUser(data).subscribe((response:Array<EventApi>)=>{
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

  handleEditeEvent(value:any){
    //préparer les localstorages
    if(value && value.subSubject.id && value.subSubject.subject.id&& value.subSubject.subject.space.id){
      var idSubsubject = value.subSubject.id;
    var idSubject= value.subSubject.subject.id;
    var idSpace = value.subSubject.subject.space.id;

    localStorage.setItem('idEvent',value.id);
    localStorage.setItem('idSubSubject',idSubsubject);
    localStorage.setItem('idSubject',idSubject);
    localStorage.setItem('idSpace',idSpace);
    localStorage.setItem("action", 'event')

    this.router.navigate(['/espacepersonnel/editEvent']);
    }else{
      console.log("Certaines propriétes sont indéfinies ou n'existe pas.")
    }
    
  }
}
