import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, ViewChild, ViewChildren, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedicalSpecialties } from 'src/app/Models/medicalSpecialties.model';
import { NatureAction } from 'src/app/Models/natureAction.model';
import { DoctorService } from 'src/app/Services/doctor.service';
import { EventService } from 'src/app/Services/event.service';
import { NatureActionService } from 'src/app/Services/nature-action.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';
import { Observable, Subscription, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  onAddEvent = new EventEmitter();
  onEditEvent = new EventEmitter();

  //variable recupérer de localStorage
  stringIdSpace: any = localStorage.getItem('idSpace');
  idSpace: number = parseInt(this.stringIdSpace, 10);

  stringIdSubject: any = localStorage.getItem('idSubject');
  idSubject: number = parseInt(this.stringIdSubject, 10);

  stringIdSubSubject: any = localStorage.getItem('idSubSubject');
  idSubSubject: number = parseInt(this.stringIdSubSubject, 10);
  //variables
  eventForm: any = FormGroup;
  dialogAction: any = "Add";
  action = "Add";
  responseMessage: any;

  natureActionList: Array<any> = [];
  medicalSpecialityList: Array<MedicalSpecialties> = [];
  doctorId: any;
  natureAction: any;
  nameNatureAction!: any;
  idEvent!:any;

  //piker
  public dateValue: any;
  public minDate: any;
  public maxDate: any;
  public color: ThemePalette = 'accent';
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    public dialogRef: MatDialogRef<EventComponent>,
    private snackbarService: SnackbarService,
    private natureActionService: NatureActionService,
    private router : Router
  ) {
    this.initForm();
  }

  ngOnInit(): void {

    if (this.dialogData.action === "Edit") {
      this.dialogAction = "Edit";
      this.action = "Edit";
      this.eventForm.patchValue(this.dialogData.data);
    }
    this.getNatureEventListe();
    //parametrer mon DateTime Piker
    this.dateValue = new Date();
    this._setMaxDate();
    this._setMinDate();
  }
  getNatureEventListe() {
    this.natureActionService.getAllNatureEvent().subscribe((response: any) => {
      this.natureActionList = response;
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

  initForm() {
    this.eventForm = this.formBuilder.group({
      natureAction: ['', Validators.required],
      date: ['', Validators.required],
      consultationDetails: this.formBuilder.group({
        doctor: ['', Validators.required],
        medicalSpecialties: ['', Validators.required],
      }),
      traitementDetails: this.formBuilder.group({
        dateEnd: ['', Validators.required],
      }, { Validators: this.dateComparisonValidator })
    });
    this.subscribeToNatureAction();
  }

  subscribeToNatureAction() {
    var natureAction: any;
    var nameNatureAction: any;
    this.eventForm.get('natureAction').valueChanges.subscribe((value: any) => {
      natureAction = parseInt(value, 10);
      if (natureAction) {
        this.getNameNatureAction(natureAction).subscribe((nameNatureAction: string) => {
        this.handleNatureActionChange(nameNatureAction);
        this.natureAction = natureAction;
        this.nameNatureAction = nameNatureAction;
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
    });
  }
  handleNatureActionChange(nameNatureAction: string) {
    if (nameNatureAction != null) {
      if (nameNatureAction === 'Consultation') {
        this.eventForm.get('traitementDetails')?.disable();
        this.eventForm.get('consultationDetails')?.enable();
      } else if (nameNatureAction === 'Traitement') {
        this.eventForm.get('consultationDetails')?.disable();
        this.eventForm.get('traitementDetails')?.enable();
      } else if (nameNatureAction === 'Analyse') {
        this.eventForm.get('consultationDetails')?.disable();
        this.eventForm.get('traitementDetails')?.disable();
      }
    }else{
        this.eventForm.get('consultationDetails')?.disable();
        this.eventForm.get('traitementDetails')?.disable();

      }
    
  }
  getNameNatureAction(id: number): Observable<string> {
    return this.natureActionService.getNatureAction(id).pipe(map((response: any) => {
      return response.title;

    }),
      catchError((error: any) => {
        console.log(error);
        let erroorMessage = error.error?.message || GlobalConstants.genericError;
        this.snackbarService.openSnackBar(erroorMessage, GlobalConstants.error);
        return throwError(erroorMessage);
      })
    );
  }




  edit() {
    var formData = this.eventForm.value;
    var data: any;

    if (this.natureAction == 2) {
      data = {
        idEvent: this.dialogData.data,
        natureAction: parseInt(formData.natureAction, 10),
        date: formData.date,
        doctor: parseInt(formData.consultationDetails.doctor.id, 10),
        medicalSpecialties: parseInt(formData.consultationDetails.medicalSpecialties, 10),
        idSpace: this.idSpace,
        idSubject: this.idSubject,
        idSubSubject: this.idSubSubject,

      }
    } else if (this.natureAction == 1) {
      data = {
        idEvent: this.dialogData.data,
        natureAction: parseInt(formData.natureAction, 10),
        date: formData.date,
        idSpace: this.idSpace,
        idSubject: this.idSubject,
        idSubSubject: this.idSubSubject,

      }

    } else if (this.natureAction == 3) {
      data = {
        idEvent: this.dialogData.data,
        natureAction: parseInt(formData.natureAction, 10),
        date: formData.date,
        dateFin: formData.traitementDetails.dateFin,
        idSpace: this.idSpace,
        idSubject: this.idSubject,
        idSubSubject: this.idSubSubject,
      }
    }
    this.eventService.updateEvent(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onEditEvent.emit();
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
    });
  }
  add() {

    var formData = this.eventForm.value;

    var data: any;
    //formater la date
    const dateFromForm = formData.date
    const formatDate = moment(dateFromForm).format('YYYY-MM-DD HH:MM');
    var nameNatureAction: any
    const idNatureAction = parseInt(formData.natureAction, 10);

    if (this.nameNatureAction) {
      if (this.nameNatureAction === "Consultation") {
        data = {
          natureAction: idNatureAction,
          date: formatDate,
          doctor: parseInt(formData.consultationDetails.doctor, 10),
          medicalSpecialties: parseInt(formData.consultationDetails.medicalSpecialties, 10),
          idSpace: this.idSpace,
          idSubject: this.idSubject,
          idSubSubject: this.idSubSubject,

        }
      } else if (this.nameNatureAction === "Analyse") {
        data = {
          natureAction: idNatureAction,
          date: formatDate,
          idSpace: this.idSpace,
          idSubject: this.idSubject,
          idSubSubject: this.idSubSubject,

        }

      } else if (this.nameNatureAction === "Traitement") {
        const dateEnd = formData.dateEnd
        const formatDateEnd = moment(dateEnd).format('YYYY-MM-DD HH:MM');
    
        data = {
          natureAction: idNatureAction,
          date: formatDate,
          dateFin: formatDateEnd,
          idSpace: this.idSpace,
          idSubject: this.idSubject,
          idSubSubject: this.idSubSubject,
        }
      }

    }

    this.eventService.saveEvent(data).subscribe((response: any) => {
      this.idEvent = response.id;
      this.dialogRef.close();
      this.onEditEvent.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");

      if(this.idEvent){
        localStorage.setItem('idEvent', this.idEvent)
        console.log 
        this.router.navigate(['/espacepersonnel/editEvent']);
      }
  
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
  private _setMinDate() {
    const now = new Date();
    this.minDate = new Date();
    this.minDate.setDate(now.getDate() - 1);
  }


  private _setMaxDate() {
    const now = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(now.getDate() + 360 * 5);
  }
  dateComparisonValidator(formGroup: FormGroup) {
    const dateStart = formGroup.get('date')?.value;
    const dateEnd = formGroup.get('traitementDetails.dateEnd')?.value;
    if (dateEnd && dateStart && new Date('dateEnd') < new Date('dateStart')) {
      formGroup.get('traitementDetails.dateEnd')?.setErrors({ dateFinAvantDateDebut: true });
      return { dateFinAvantDateDebut: true }
    } else
      formGroup.get('traitementDetails.dateEnd')?.setErrors(null);
    return null;

  }
  handleSubmit() {
    if (this.dialogAction === "Edit") {
      this.edit();
    } else {
      this.add();
    }
  }

}
