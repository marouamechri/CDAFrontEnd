import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { SubjectService } from 'src/app/Services/subject.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-subject-compenent',
  templateUrl: './subject-compenent.component.html',
  styleUrls: ['./subject-compenent.component.css']
})
export class SubjectCompenent implements OnInit {
  onAddSubject= new EventEmitter();
  onEditSubject = new EventEmitter();
  stringIdSpace: any = localStorage.getItem('idSpace');
  idSpace = parseInt(this.stringIdSpace, 10) ;

  subjectForm:any = FormGroup;
  dialogueAction:any ="Add";
  action:any = "Ajouter";
  responseMessage:any;
  constructor(
      //token spécial fourni par Angular pour obtenir les données passées au conposant de dialogue
      @Inject(MAT_DIALOG_DATA) public dialogData:any,
      // utiliser pour crée des instances FormGroup
      private formBuilder: FormBuilder,
      private subjectService :SubjectService,
      //une reference au composant de dialogue lui même
      public dialogRef:MatDialogRef<SubjectCompenent>,
      private snackbarService:SnackbarService
  ){
  }
  ngOnInit(): void {
      this.subjectForm = this.formBuilder.group({
        title:[null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]]
      })
      if (this.dialogData.action === "Edit"){
          this.dialogueAction ='Edit';
          this.action ="Modifier";
          this.subjectForm.patchValue(this.dialogData.data);
      }
  }
  handleSubmit(){
    if(this.dialogueAction === "Edit"){
      this.edit();
    }else{
      this.add();
    }
  }
  add() {
    var formData = this.subjectForm.value;
    var data = {
      title: formData.title,
      idSpace : this.idSpace
    }
    this.subjectService.save(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddSubject.emit();
      if(response!=null){
        this.responseMessage = "Le Sujet de maladie a bien été ajouté";
        this.snackbarService.openSnackBar(this.responseMessage, "success");  
      }else{
        this.responseMessage = "Le Sujet de maladie exite déjà";
        this.snackbarService.openSnackBar(this.responseMessage, "success");  
      }
    }, (error) => {
      console.log(error);
      this.responseMessage = GlobalConstants.genericError;
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }
  edit() { 
    var formData = this.subjectForm.value;
    var data = {
      idSubject:this.dialogData.data.id,
      title: formData.title,
      idSpace: this.idSpace
    }
    this.subjectService.update(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onEditSubject.emit();
      if(response!=null){
        this.responseMessage = "Modification valider";
        this.snackbarService.openSnackBar(this.responseMessage, "success");  
      }else{
        this.responseMessage = "Le Sujet de maladie exite déjà";
        this.snackbarService.openSnackBar(this.responseMessage, "success");  
      }
    }, (error) => {
      console.log(error);
      this.responseMessage = GlobalConstants.genericError;
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }



}
