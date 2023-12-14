import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MedicalSpecialties } from 'src/app/Models/medicalSpecialties.model';
import { MedicalSpecialtyService } from 'src/app/Services/medical-specialty.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { SubSubjectService } from 'src/app/Services/sub-subject.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-sub-subject',
  templateUrl: './sub-subject.component.html',
  styleUrls: ['./sub-subject.component.css']
})
export class SubSubjectComponent  implements OnInit{
  onAddSubSubject= new EventEmitter();
  onEditSubSubject = new EventEmitter();
  //recupérer les id dans le localStorage
  stringIdSpace: any = localStorage.getItem('idSpace');
  idSpace: number = parseInt(this.stringIdSpace, 10) ;

  stringIdSubject: any = localStorage.getItem('idSubject');
  idSubject:number = parseInt(this.stringIdSubject, 10) ;

  subSubjectForm:any = FormGroup;
  dialogueAction:any ="Add";
  action:any = "Ajouter";
  responseMessage:any;
  specialitie: Array<MedicalSpecialties>=[];
  constructor(
      //token spécial fourni par Angular pour obtenir les données passées au conposant de dialogue
      @Inject(MAT_DIALOG_DATA) public dialogData:any,
      // utiliser pour crée des instances FormGroup
      private formBuilder: FormBuilder,
      private subSubjectService :SubSubjectService,
      //une reference au composant de dialogue lui même
      public dialogRef:MatDialogRef<SubSubjectComponent>,
      private snackbarService:SnackbarService,
      private medicalSpecialtyService : MedicalSpecialtyService
  ){}

  ngOnInit(): void {
    this.subSubjectForm = this.formBuilder.group({
      title:[null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      medicalSpecialties:[null, [Validators.required]]
    })
    if (this.dialogData.action === "Edit"){
        this.dialogueAction ='Edit';
        this.action ="Modifier";
        this.subSubjectForm.patchValue(this.dialogData.data);
    }
    this.getmedicalSpecialties();
}
handleSubmit(){
  if(this.dialogueAction === "Edit"){
    this.edit();
  }else{
    this.add();
  }
}
add() {
  var formData = this.subSubjectForm.value;
  var data = {
    idSpace: this.idSpace,
    idSubject : this.idSubject,
    title: formData.title,
    medicalSpecialties:parseInt(formData.medicalSpecialties, 10) 
  }

  this.subSubjectService.save(data).subscribe((response: any) => {
    this.dialogRef.close();
    this.onAddSubSubject.emit();
    this.responseMessage ="la spécialité a bien étè ajouter";
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
edit() { 
  var formData = this.subSubjectForm.value;
  var data = {
    idSubject:this.idSubject,
    idSpace: this.idSpace,
    title: formData.title,
    medicalSpecialties:parseInt(formData.medicalSpecialties, 10),
    idSubSubject :this.dialogData.data.id

  }
  this.subSubjectService.update(data).subscribe((response: any) => {
    this.dialogRef.close();
    this.onEditSubSubject.emit();
    if(response!=null){
    this.responseMessage = "Modification valider";
    this.snackbarService.openSnackBar(this.responseMessage, "success");
  }else{
    this.responseMessage = "La spécialité existe déja";
    this.snackbarService.openSnackBar(this.responseMessage, "success");
  }
  }, (error) => {
    console.log(error);
    
    this.responseMessage = GlobalConstants.genericError;
    
    this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
  })
}
getmedicalSpecialties(){
  this.medicalSpecialtyService.getAllSpeciality().subscribe((response: any)=>{
    this.specialitie = response;
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


}
