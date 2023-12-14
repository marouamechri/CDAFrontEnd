import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NatureActionService } from 'src/app/Services/nature-action.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-nature-action',
  templateUrl: './nature-action.component.html',
  styleUrls: ['./nature-action.component.css']
})
export class NatureActionComponent implements OnInit {

  onAddNature = new EventEmitter();
  onEditNature = new EventEmitter();

  actionForm :any =FormGroup;
  dialogAction :any="Add";
  action="Ajouter";
  responseMessage:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private natureActionService: NatureActionService,
    public dialogRef: MatDialogRef<NatureActionComponent>,
    private snackbarService: SnackbarService
  ){}

  ngOnInit(): void {
    this.actionForm = this.formBuilder.group({
      natureAction: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],

    });
    if (this.dialogData.action === "Edit") {
      this.dialogAction = "Edit";
      this.action = "Modifier";
      this.actionForm.patchValue(this.dialogData.data);
    }

  }

  handleSubmit() {
    if (this.dialogAction === "Edit") {
      this.edit();
    } else {
      this.add();
    }
  }
  add(){
    var formData = this.actionForm.value;
    let data={
      title:formData.natureAction

    }
  
    this.natureActionService.createNatureAction(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddNature.emit();
      if(response!=null){
        this.responseMessage = "Opération valider";
        this.snackbarService.openSnackBar(this.responseMessage, "success");    
      }else{
        this.responseMessage = "Opération échouer";
        this.snackbarService.openSnackBar(this.responseMessage, "success");    

      }
     
    }, (error) => {
      console.log(error);
      
      this.responseMessage = GlobalConstants.genericError;
      
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })

  }
  edit(){
    var formData = this.actionForm.value;
    let data  ={
      title: formData.natureAction,
      id: this.dialogData.data.id,

    }
    let email = formData.email;
    this.natureActionService.updateNatureAction(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onEditNature.emit(); 
      if(response!=null){
        this.responseMessage = "Opération valider";
        this.snackbarService.openSnackBar(this.responseMessage, "success");    
      }else{
        this.responseMessage = "Opération échouer";
        this.snackbarService.openSnackBar(this.responseMessage, "success");    

      }
     
    }, (error) => {
      console.log(error);
      
      this.responseMessage = GlobalConstants.genericError;
      
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })

  }

}
