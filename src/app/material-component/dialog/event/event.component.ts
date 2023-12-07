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
  action = "Ajouter";
  responseMessage: any;

  natureActionList: Array<any> = [];
  medicalSpecialityList: Array<MedicalSpecialties> = [];
  doctorId: any;
  natureAction: any;
  nameNatureAction!: any;
  idEvent!: any;

  //piker
   dateValue: any
   minDate: any;
   maxDate: any;
   color: ThemePalette = 'accent';
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    public dialogRef: MatDialogRef<EventComponent>,
    private snackbarService: SnackbarService,
    private natureActionService: NatureActionService,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.getNatureEventListe();
    //preremplire les champs de la formulaire avec les données data
    if (this.dialogData.action === "Update") {
      this.dialogAction = "Update";
      this.action = "Modifier";
      if (this.dialogData.data) {
        this.eventForm.patchValue({ natureAction: this.dialogData.data.natureAction.id });
      } else { console.log("valeur natureAction vide") }
    }
    //parametrer mon DateTime Piker
    this.dateValue = new Date();
    this._setMaxDate();
    this._setMinDate();
  }
  initForm() {

    this.eventForm = this.formBuilder.group({
      natureAction: [1, Validators.required],
      date: [new Date(), Validators.required],
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
  //
  isNatureActionValue(expectedValue:number):boolean{
    const natureActionControl = this.eventForm.get('natureAction');
    const natureActionValue = natureActionControl?natureActionControl.value:null;
    //vérifier si la valeur de natureAction correspond à celle attendu
    if(natureActionValue === expectedValue){
      return true;
    }
    else if(this.dialogData?.data){
     if(this.dialogData?.data.natureAction?.id ===expectedValue){
      return true;
    }
  }
   return false;
}



  getNatureEventListe() {
    this.natureActionService.getAllNatureEvent().subscribe((response: any) => {
      this.natureActionList = response;
      console.log(response);
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

  //observer les changement de la valeur natureAction de ma formulaire
  //recupére le name de natureAction et execute des changement sur la liste 
  //des contrôle de ma formulaire.
  subscribeToNatureAction() {
    var natureAction: any;
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
  //liste des contôles de ma formulaire
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
    } else {
      this.eventForm.get('consultationDetails')?.disable();
      this.eventForm.get('traitementDetails')?.disable();
    }
  }
  //permet de recupére le name d'un natureAction
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




  update() {
    var formData = this.eventForm.value;
    var data: any;

    //préparer les variables
    var dateFromForm = formData.date
    var formatDate = moment(dateFromForm).format('YYYY-MM-DD HH:MM');
    var idNatureAction = parseInt(formData.natureAction, 10);

    if (this.nameNatureAction) {
      if (this.nameNatureAction === "Consultation") {
        data = {
          idEvent: this.dialogData.data.id,
          natureAction: idNatureAction,
          date: formatDate,
          doctor: parseInt(formData.consultationDetails.doctor, 10),
          medicalSpecialties: parseInt(formData.consultationDetails.medicalSpecialties, 10),

        }
      } else if (this.nameNatureAction === "Analyse") {
        data = {
          idEvent: this.dialogData.data.id,
          natureAction: idNatureAction,
          date: formatDate,

        }

      } else if (this.nameNatureAction === "Traitement") {
        const dateEndform = formData.dateEnd
        const formatDateEnd = moment(dateEndform).format('YYYY-MM-DD HH:MM');
    
        data = {
          idEvent: this.dialogData.data.id,
          natureAction: idNatureAction,
          date: formatDate,
          dateFin: formatDateEnd,
        }
      }

    }

    this.eventService.updateEvent(data).subscribe((response: any) => {
      this.idEvent = response.id;
      this.dialogRef.close();
      this.onEditEvent.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
      //redirection : editEvent
      if (this.idEvent) {
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

  //activer/désactiver le champ natureAction en fonction d'action Add = active update=désactive
  isAdd(): boolean {
    if (this.dialogData.action === "Add") {
      return true;
    }
    else
      return false;
  }


  //permet d'ajouter un Event
  add() {

    var formData = this.eventForm.value;

    var data: any;
    //préparer les variables
    const dateFromForm = formData.date
    const formatDate = moment(dateFromForm).format('YYYY-MM-DD HH:MM');
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
      //redirection : editEvent
      if (this.idEvent) {
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
  //préparer les variables de ma pikerDateTime
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
  //permer de comparer entre date de l'Event, et date de finEvent
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
  //validation de ma formulaire
  handleSubmit() {
    if (this.dialogAction === "Update") {
      this.update();
    } else {
      this.add();
    }
  }

}
