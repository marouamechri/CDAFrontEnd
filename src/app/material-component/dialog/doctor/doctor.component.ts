import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Binder } from 'src/app/Models/binder.model';
import { MedicalSpecialties } from 'src/app/Models/medicalSpecialties.model';
import { BinderService } from 'src/app/Services/binder.service';
import { DoctorService } from 'src/app/Services/doctor.service';
import { MedicalSpecialtyService } from 'src/app/Services/medical-specialty.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  onAddDoctor = new EventEmitter();
  onEditDoctor = new EventEmitter();

  doctorForm :any =FormGroup;
  dialogAction :any="Add";
  action="Add";
  responseMessage:any;
  specialitie: Array<MedicalSpecialties>=[];
  binders : Array<Binder>=[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private doctorService: DoctorService,
    public dialogRef: MatDialogRef<DoctorComponent>,
    private snackbarService: SnackbarService,
    private medicalSpecialtyService: MedicalSpecialtyService,
    private binderService : BinderService) { }
  
    ngOnInit(): void {
      this.doctorForm = this.formBuilder.group({
        name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
        address: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
        phone:[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberdRegex)]],
        medicalSpecialty:[null, [Validators.required]],
        binderList:[null, [Validators.required]]

      });
      if (this.dialogData.action === "Edit") {
        this.dialogAction = "Edit";
        this.action = "Edit";
        this.doctorForm.patchValue(this.dialogData.data);
      }
      this.getmedicalSpecialties();
      this.getAllBinderByUser();

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
    getAllBinderByUser(){
      this.binderService.getListBinder().subscribe((reponse:Array<Binder>)=>{
        this.binders =reponse;
      },(error:any)=>{
        console.log(error.error?.message);
          if(error.error?.message){
            this.responseMessage = error.error?.message;
          }else{
            this.responseMessage=GlobalConstants.genericError;
          }
          this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
        });  
        }

    handleSubmit() {
      if (this.dialogAction === "Edit") {
        this.edit();
      } else {
        this.add();
      }
    }

    add() {
      var formData = this.doctorForm.value;
      const data: any  = { 
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        medicalSpecialty: formData.medicalSpecialty,
        idSpace : formData.binderList
         }
      this.doctorService.save(data).subscribe((response: any) => {
        this.dialogRef.close();
        this.onAddDoctor.emit();
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
      var formData = this.doctorForm.value;
      var data : any= {
        idDoctor:this.dialogData.data.id,
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        medicalSpecialty: formData.medicalSpecialty,
        idSpace : formData.binderList
      }
      this.doctorService.update(data).subscribe((response: any) => {
        this.dialogRef.close();
        this.onEditDoctor.emit();
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
