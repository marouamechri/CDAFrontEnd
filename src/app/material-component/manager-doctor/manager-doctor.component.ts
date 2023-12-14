import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DoctorService } from 'src/app/Services/doctor.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { DoctorComponent } from '../dialog/doctor/doctor.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manager-doctor',
  templateUrl: './manager-doctor.component.html',
  styleUrls: ['./manager-doctor.component.css']
})
export class ManagerDoctorComponent implements OnInit {
  displayedColumns: string[] = ['name', 'address', 'phone', 'medicalSpecialty', 'binders', 'action'];
  dataSource: any;
  responseMessage: any;
  constructor(
    private doctorService: DoctorService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,
    private location: Location
    ) { }
    ngOnInit(): void {
      this.ngxService.start();
      this.tableData();
    }
    tableData() {
      this.doctorService.getAllDoctorByUser().subscribe((response: any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
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
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    handleAddAction() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        action: "Add"
      };
      dialogConfig.width = "850px";
      const dialogRef = this.dialog.open(DoctorComponent, dialogConfig);
      this.router.events.subscribe(() => {
        dialogRef.close();
      });
      const sub = dialogRef.componentInstance.onAddDoctor.subscribe((response) => {
        window.location.reload();//rafraichir la page
        this.tableData();

      })
    }
    handleEditAction(values: any) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        action: "Edit",
        data: values
      };
      dialogConfig.width = "850px";
      const dialogRef = this.dialog.open(DoctorComponent, dialogConfig);
      this.router.events.subscribe(() => {
        dialogRef.close();
        window.location.reload();//rafraichir la page

      });
      const sub = dialogRef.componentInstance.onEditDoctor.subscribe((response) => {
        this.tableData();
      })
    }
    previous(){
      this.location.back()
    }
  

}
