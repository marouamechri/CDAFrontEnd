import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NatureAction } from 'src/app/Models/natureAction.model';
import { NatureActionService } from 'src/app/Services/nature-action.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { TaskService } from 'src/app/Services/task.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  onAddTask= new EventEmitter();
  onEditTask = new EventEmitter();
  //variable recupérer de localStorage
  stringIdSpace: any = localStorage.getItem('idSpace');
  idSpace: number = parseInt(this.stringIdSpace, 10);

  stringIdSubject: any = localStorage.getItem('idSubject');
  idSubject: number = parseInt(this.stringIdSubject, 10);

  stringIdSubSubject: any = localStorage.getItem('idSubSubject');
  idSubSubject: number = parseInt(this.stringIdSubSubject, 10);

  stringIdEvent: any = localStorage.getItem('idEvent');
  idEvent: number = parseInt(this.stringIdEvent, 10);


  taskForm:any=FormGroup;
  dialogueAction:any ="Add";
  action:any = "Add";
  natureTaskList: Array<any> = [];
  responseMessage:any;
  constructor(
      //token spécial fourni par Angular pour obtenir les données passées au conposant de dialogue
      @Inject(MAT_DIALOG_DATA) public dialogData:any,
      // utiliser pour crée des instances FormGroup
      private formBuilder: FormBuilder,
      private taskService :TaskService,
      private natureActionService :NatureActionService,
      //une reference au composant de dialogue lui même
      public dialogRef:MatDialogRef<TaskComponent>,
      private snackbarService:SnackbarService
  ){
  }
  ngOnInit(): void {

    this.taskForm = this.formBuilder.group({
      natureActionF:["",Validators.required],
      descriptionF:["", [Validators.pattern(GlobalConstants.nameRegex)]]
    });
    if (this.dialogData.action === "Edit"){
        this.dialogueAction ='Edit';
        this.action ="Update";
        this.taskForm.patchValue(this.dialogData.data);
    }
    this.getNatureTaskListe();

}
handleSubmit() {
  if (this.dialogueAction === "Edit") {
    this.edit();
  } else {
    this.add();
  }
}

  getNatureTaskListe() {
    this.natureActionService.getAllNatureTask().subscribe((response: any) => {
      this.natureTaskList = response;
    }, (error: any) => {
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  
  edit(){
    var formData = this.taskForm.value;
    var data = {
      idTask:this.dialogData.data.id,
      idNatureAction: parseInt(formData.natureActionF,10) ,
      description : formData.descriptionF,
      idSpace : this.idSpace,
      idSubject :this.idSubject,
      idSubSubject:this.idSubSubject,
      idEvent:this.idEvent,
    }
    this.taskService.updateTask(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onEditTask.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error) => {
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }
  add(){   
    var formData = this.taskForm.value;
    console.log(this.taskForm.value);
    var data = {
      idNatureAction: parseInt(formData.natureActionF,10) ,
      description : formData.descriptionF,
      idSpace : this.idSpace,
      idSubject :this.idSubject,
      idSubSubject:this.idSubSubject,
      idEvent:this.idEvent,
    }
    this.taskService.save(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddTask.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error) => {
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })

}

}
