import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'src/app/Models/subject.model';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { SubjectService } from 'src/app/Services/subject.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { SubjectCompenent } from '../dialog/subject-compenent/subject-compenent';
import { BinderService } from 'src/app/Services/binder.service';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { EventService } from 'src/app/Services/event.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manager-subject',
  templateUrl: './manager-subject.component.html',
  styleUrls: ['./manager-subject.component.css']
})
export class ManagerSubjectComponent implements OnInit {

  responseMessage: any;
  dataSource: Subject[] = [];
  dataSourceTraitement: any[] = [];
  dataSourceConsultation: any[] = [];
  dataSourceAnalyse: any[] = [];

  stringIdSpace: any = localStorage.getItem('idSpace');
  idSpace: number = parseInt(this.stringIdSpace, 10);
  nameBinder!: any;
  constructor(
    private subjectService: SubjectService,
    private binderService: BinderService,
    private eventService: EventService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,
    private location: Location
  ) { }
  ngOnInit(): void {
    this.ngxService.start();
    this.subjectData();
    this.getEvents();
    this.getNameBinder(this.idSpace);
  }

  subjectData() {
    //console.log('localStorage manager Subject: '+localStorage.getItem('accessToken'));
    this.subjectService.getAllSubjectBySpace(this.idSpace).subscribe((response: any) => {
      this.ngxService.stop();
      this.dataSource = response;
    }, (error: any) => {
      this.ngxService.stop();
      console.log(error.error?.messsage);
      if (error.error?.messsage) {
        this.responseMessage = error.error?.messsage;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }
  getNameBinder(id: any) {
    this.binderService.getBinder(id).subscribe((data: any) => {
      this.nameBinder = data.name
    }, (error: any) => {
      this.ngxService.stop();
      console.log(error.error?.messsage);
      if (error.error?.messsage) {
        this.responseMessage = error.error?.messsage;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }
  handleAddSubject() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: "Add"
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(SubjectCompenent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddSubject.subscribe((response) => {
      this.subjectData();
     // window.location.reload();//rafraichir la page

    })
  }
  handleEditSubject(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: "Edit",
      data: values
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(SubjectCompenent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditSubject.subscribe((response) => {
      this.subjectData();
      window.location.reload();//rafraichir la page

    })
  }
  redirectToManagerSubSubject(id: any) {
    localStorage.setItem('idSubject', id);
    this.getNameBinder(this.idSpace);
    localStorage.setItem("nameBinder", this.nameBinder);

    this.router.navigate(['/espacepersonnel/subSubject']);

  }
  handleDeleteSubject(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'supprimer ce sujet de suivi!',
      confirmation: true
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response) => {
      this.ngxService.start();
      this.delete(id);
      window.location.reload();//rafraichir la page
      dialogRef.close();
    })
  }
  delete(id: any) {
    var data: any = {
      idSpace: this.idSpace,
      idSubject: id,
    }
    this.subjectService.delete(data).subscribe((response: any) => {
      this.ngxService.stop();
      this.subjectData();
      this.responseMessage = "Le sujet de maladie a bien été supprimé";
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error) => {
      this.ngxService.stop();
     
      this.responseMessage = GlobalConstants.genericError;
      
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }
  getEvents() {
    var data: any = {
      isValidate: false,
      idSpace: this.idSpace
    }

    this.eventService.getEventByBinder(data).subscribe((response: any) => {
      this.ngxService.stop();
      if (response) {
        //initialiser les tableaux
        this.dataSourceAnalyse = [];
        this.dataSourceConsultation = [];
        this.dataSourceTraitement = [];

        response.forEach((element: any) => {
          switch (element.event.natureAction.title) {
            case "Consultation":
              this.dataSourceConsultation.push(element);
              break;
            case "Traitement":
              this.dataSourceTraitement.push(element);
              break;
            case "Analyse":
              this.dataSourceAnalyse.push(element);
              break;
            default:
              this.responseMessage = "Liste est vide"
              break
          }
        });
      }

    }, (error: any) => {
      this.ngxService.stop();
      console.log(error.error?.message);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    }
    );
  }

  handleEditeEvent(value: any) {
    //préparer les localstorages
    if (value && value.subSubject.id && value.subSubject.subject.id) {
      var idSubsubject = value.subSubject.id;
      var idSubject = value.subSubject.subject.id;

      localStorage.setItem('idEvent', value.id);
      localStorage.setItem('idSubSubject', idSubsubject);
      localStorage.setItem('idSubject', idSubject);
      localStorage.setItem("action", 'event')


      this.router.navigate(['/espacepersonnel/editEvent']);
    } else {
      console.log("Certaines propriétes sont indéfinies ou n'existe pas.")
    }

  }
  previous(){
    this.location.back()
  }

}