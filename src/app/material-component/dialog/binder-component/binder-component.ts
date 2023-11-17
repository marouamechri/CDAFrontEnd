import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BinderService } from 'src/app/Services/binder.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-binder-component',
  templateUrl: './binder-component.component.html',
  styleUrls: ['./binder-component.component.css']
})
export class BinderComponent implements OnInit {
  onAddBinder = new EventEmitter();
  onEditBinder = new EventEmitter();
  binderForm :any =FormGroup;
  dialogAction :any="Add";
  action="Add";
  responseMessage:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private binderService: BinderService,
    public dialogRef: MatDialogRef<BinderComponent>,
    private snackbarService: SnackbarService) { }
  
  ngOnInit(): void {
      this.binderForm = this.formBuilder.group({
        name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      });
      if (this.dialogData.action === "Edit") {
        this.dialogAction = "Edit";
        this.action = "Update";
        this.binderForm.patchValue(this.dialogData.data);
      }
    }
    handleSubmit() {
      if (this.dialogAction === "Edit") {
        this.edit();
      } else {
        this.add();
      }
    }
    add() {
      var formData = this.binderForm.value;
      const data: any  = { 
        name: formData.name,
           }
      this.binderService.saveBinder(data).subscribe((response: any) => {
        this.dialogRef.close();
        this.onAddBinder.emit();
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
  
    edit() { 
      var formData = this.binderForm.value;
      var data : any= {
        id:this.dialogData.data.id,
        name: formData.name 
      }
      this.binderService.updateBinder(data).subscribe((response: any) => {
        this.dialogRef.close();
        this.onEditBinder.emit();
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
  


