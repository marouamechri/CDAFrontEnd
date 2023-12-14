import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from 'src/app/Services/role.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { UserService } from 'src/app/Services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  onAttachRole = new EventEmitter();
  onDetachRole = new EventEmitter();

  actionForm :any =FormGroup;
  dialogAction :any="Attache";
  action="Attacher";
  responseMessage:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    public dialogRef: MatDialogRef<RoleComponent>,
    private snackbarService: SnackbarService
  ){}

  ngOnInit(): void {
    this.actionForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],

    });
    if (this.dialogData.action === "Detach") {
      this.dialogAction = "Detach";
      this.action = "Détacher";
      this.actionForm.patchValue(this.dialogData.data);
    }

  }

  handleSubmit() {
    if (this.dialogAction === "Detach") {
      this.detach();
    } else {
      this.attach();
    }
  }
  detach(){
    var formData = this.actionForm.value;
     let email= formData.email;
  
    this.roleService.detach(email).subscribe((response: any) => {
      this.dialogRef.close();
      this.onDetachRole.emit();
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
  attach(){
    var formData = this.actionForm.value;
   
    let email = formData.email;
    this.roleService.attach(email).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAttachRole.emit();
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
