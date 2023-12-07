import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/Models/doctor.model';
import { MedicalSpecialties } from 'src/app/Models/medicalSpecialties.model';
import { DoctorService } from 'src/app/Services/doctor.service';
import { MedicalSpecialtyService } from 'src/app/Services/medical-specialty.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {

  @Input() parentForm: any = FormGroup;

  medicalSpecialityList: Array<MedicalSpecialties> = [];
  doctorList: Array<Doctor> = [];
  doctorId: any;
  stringIdSpace: any = localStorage.getItem('idSpace');
  idSpace = parseInt(this.stringIdSpace, 10);
  responseMessage: any;
  constructor(
    private doctorService: DoctorService,
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder,
    private router: Router) {

    this.parentForm = this.formBuilder.group({
      consultationDetails: this.formBuilder.group({
        doctor: ['', Validators.required],
        medicalSpecialties: [null]
      })
    });
  }

  ngOnInit(): void {
    console.log(this.parentForm.value);
    this.getAllDoctor();
    // Écoutez les changements dans le choix du médecin
    this.parentForm.get('consultationDetails.doctor').valueChanges.subscribe((response: any) => {
      // Mettez à jour les spécialités en fonction du médecin sélectionné
      this.parentForm.get('consultationDetails.medicalSpecialties').setValue(null); // Réinitialise la spécialité
      if (response) {
        this.doctorId = parseInt(response, 10);
        this.parentForm.get('consultationDetails.medicalSpecialties')?.enable(); // Active la sélection de la spécialité
      } else {
        this.parentForm.get('consultationDetails.medicalSpecialties')?.disable(); // Désactive la sélection de la spécialité
      }

      //Appeler `getAllSpecialityByDoctor` ici
      if (this.doctorId != null) {
        var data: any={
          idDoctor: this.doctorId,
             idSpace: this.idSpace 
        }
        this.getAllSpecialityByDoctor(data);
      }
    });

  }


  getAllDoctor() {
    this.doctorService.getAllDoctorByUser().subscribe((response: any) => {
      this.doctorList = response;
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
  getAllSpecialityByDoctor(data: any) {
    this.doctorService.getMedicalSpecialtiesByDoctor(data).subscribe((response: any) => {
      this.medicalSpecialityList = response;
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
  redirectDoctor(){
    this.router.navigate(['/espacepersonnel/doctor']);
  }

}
