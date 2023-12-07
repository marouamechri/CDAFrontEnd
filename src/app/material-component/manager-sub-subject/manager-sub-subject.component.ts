import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SubSubject } from 'src/app/Models/subSubjects.medel';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { SubSubjectService } from 'src/app/Services/sub-subject.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { SubSubjectComponent } from '../dialog/sub-subject/sub-subject.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { EventService } from 'src/app/Services/event.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manager-sub-subject',
  templateUrl: './manager-sub-subject.component.html',
  styleUrls: ['./manager-sub-subject.component.css']
})
export class ManagerSubSubjectComponent implements OnInit {
  responseMessage: any;
  dataSource: SubSubject[] = [];
  dataSourceTraitement: any[] = [];
  dataSourceConsultation: any[] = [];
  dataSourceAnalyse: any[] = [];

  stringIdSubject: any = localStorage.getItem('idSubject');
  idSubject: number = parseInt(this.stringIdSubject, 10);

  stringIdSpace: any = localStorage.getItem('idSpace');
  idSpace: number = parseInt(this.stringIdSpace, 10);

  constructor(
    private subSubjectService: SubSubjectService,
    private eventService: EventService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,
    private location: Location
  ) { }
  ngOnInit(): void {
    console.log(localStorage);
    this.ngxService.start();
    this.subSubjectData();
    this.getEvents();
  }
  subSubjectData() {
    var data: any = {
      idSpace: this.idSpace,
      idSubject: this.idSubject
    }
    this.subSubjectService.getAllSubSubjectBySubject(data).subscribe((response: any) => {
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
  handleAddSubSubject() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: "Add"
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(SubSubjectComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddSubSubject.subscribe((response) => {
      this.subSubjectData();
    })
  }

  handleEditSubSubject(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: "Edit",
      data: values
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(SubSubjectComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditSubSubject.subscribe((response) => {
      this.subSubjectData();
    })
  }
  redirectToManagerSubSubject(id: any) {
    localStorage.setItem('idSubSubject', id);

    this.router.navigate(['/espacepersonnel/event']);

  }
  handleDeleteSubSubject(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'supprimer ce spécialite médical!',
      confirmation: true
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response) => {
      this.ngxService.start();
      this.delete(id);
      //window.location.reload();//rafraichir la page
      dialogRef.close();
    })
  }
  delete(id: any) {
    var data: any = {
      idSpace: this.idSpace,
      idSubject: this.idSubject,
      idSubSubject: id
    }
    this.subSubjectService.delete(data).subscribe((response: any) => {
      this.ngxService.stop();
      this.subSubjectData();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error) => {
      this.ngxService.stop();
      console.log(error);
      if (error.error?.messsage) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }
  getEvents() {
    var data: any = {
      isValidate: false,
      idSpace: this.idSpace,
      idSubject: this.idSubject
    }

    this.eventService.getEventBySubject(data).subscribe((response: any) => {
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
    if (value && value.subSubject.id) {
      var idSubsubject = value.subSubject.id;

      localStorage.setItem('idEvent', value.id);
      localStorage.setItem('idSubSubject', idSubsubject);
      localStorage.setItem("action", 'event')


      this.router.navigate(['/espacepersonnel/editEvent']);
    } else {
      console.log("Certaines propriétes sont indéfinies ou n'existe pas.")
    }

  }

  previous() {
    this.location.back()
  }
}
