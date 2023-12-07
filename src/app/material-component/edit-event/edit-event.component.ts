import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { NgxUiLoaderService, Task } from 'ngx-ui-loader';
import { Consultation } from 'src/app/Models/consultation.model';
import { BinderService } from 'src/app/Services/binder.service';
import { EventService } from 'src/app/Services/event.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { TaskService } from 'src/app/Services/task.service';
import { MatTableDataSource } from '@angular/material/table';
import { TaskComponent } from '../dialog/task/task.component';
import * as e from 'cors';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { Location } from '@angular/common';
import { FileUploadService } from 'src/app/Services/file-upload.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  displayedColumns: string[] = ['natureActionTab', 'descriptionTab','actionTab'];

  stringIdSubject: any = localStorage.getItem('idSubject');
  idSubject: number = parseInt(this.stringIdSubject, 10) ;

  stringIdSpace: any = localStorage.getItem('idSpace');
  idSpace: number = parseInt(this.stringIdSpace, 10) ;

  stringIdSubSubject: any = localStorage.getItem('idSubSubject');
  idSubSubject: number = parseInt(this.stringIdSubSubject, 10) ;

  stringIdEvent: any = localStorage.getItem('idEvent');
  idEvent: number = parseInt(this.stringIdEvent, 10) ;

  eventData: any;
  responseMessage:any;
  dataEvent : any;
  dataTasksBefor!:any;
  dataTaskAfter!: any;
  natureAction!:string;
  ;
  step = 0;
  constructor(
    private eventService:EventService,
    private taskService :TaskService,
    private ngxService:NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService:SnackbarService,
    private router:Router,
    private location: Location
    ){  }
  ngOnInit(): void {
    this.ngxService.start();
    this.getEvent(this.idEvent);
    //action permet de defenire la liéson entre le fichier et (Task ou Event)
    localStorage.setItem("action", "event");
    this.getTasksData();
  }
  getEvent(id :number){
    this.ngxService.start();

    var data:any ={
      idEvent : id,
      isValidate: false
    }

    this.eventService.getEvent(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.eventData = response;
      this.natureAction = response.event.natureAction.title;
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
  
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  previous(){
    this.location.back()
  }
  getTasksData(){
    var data={
      idSpace: this.idSpace,
      idSubject :this.idSubject,
      idSubSubject:this.idSubSubject,
      idEvent:this.idEvent
    }
    console.log(this.idEvent);
    this.taskService.getAllTaskByEvent(data).subscribe((response: any) => {
      this.ngxService.stop();
      console.log(response);
      var dataTasks = response;
      var dataBefor: any[]=[];
      var dataAfter: any[]=[];

      if(dataTasks){

        dataTasks.forEach((element: any)=> {
          if(element.typeTask==="avant")
        {
          dataBefor.push(element)
        }else{
          dataAfter.push(element)
        }
        });
      }
      this.dataTaskAfter = new MatTableDataSource(dataAfter);
      this.dataTasksBefor = new MatTableDataSource(dataBefor)
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
  handleAddTask() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: "Add"
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(TaskComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddTask.subscribe((response: any) => {
      this.getTasksData();
    })
  }
  getColorClass(row: any){
    if(row.state==2){
      return'bg-green';
    }else
    return 'bg-red';
  }

  handleEditTask(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: "Edit",
      data: values
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(TaskComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditTask.subscribe((response) => {
      this.getTasksData();
    })
  }
  handleDeleteTask(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'supprimer cet tache',
      confirmation: true
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response) => {
      this.ngxService.start()
      this.delete(values.id);
      dialogRef.close();
    })
  }
  delete(id:any){
    this.ngxService.start();

    var data={
      idSpace: this.idSpace,
      idSubject :this.idSubject,
      idSubSubject:this.idSubSubject,
      idEvent:this.idEvent,
      idTask : id
    }
    this.taskService.delete(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.getTasksData();
      this.responseMessage=response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error)=>{
      this.ngxService.stop();
      console.log(error);
      if (error.error?.messsage) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }
  onChangeTask(id: number){
    this.ngxService.start();
    var data: any={
      idSpace: this.idSpace,
      idSubject :this.idSubject,
      idSubSubject:this.idSubSubject,
      idEvent:this.idEvent,
      idTask : id
    }
    this.taskService.forceValid(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.getTasksData();
      this.responseMessage=response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error)=>{
      this.ngxService.stop();
      console.log(error);
      if (error.error?.messsage) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  onChangeEvent(event: any){
    this.ngxService.start();
   
    this.eventService.forceValid(this.idEvent).subscribe((response:any)=>{
      this.ngxService.stop();
      this.getEvent(this.idEvent);
      this.responseMessage=response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error)=>{
      this.ngxService.stop();
      console.log(error);
      if (error.error?.messsage) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })

  }

}
