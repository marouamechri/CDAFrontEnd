import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NatureActionService } from 'src/app/Services/nature-action.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { NatureActionComponent } from '../nature-action/nature-action.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manager-nature-action',
  templateUrl: './manager-nature-action.component.html',
  styleUrls: ['./manager-nature-action.component.css']
})
export class ManagerNatureActionComponent {
  displayedColumns: string[] = ['natureAction', 'action'];
  dataSource: any;
  responseMessage: any;
  constructor(
    private naturActionService: NatureActionService,
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
      this.naturActionService.getAllNatureTask().subscribe((response: any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
      }, (error: any) => {
        this.ngxService.stop();
        console.log(error.error?.messsage);
        this.responseMessage = GlobalConstants.genericError;
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
      const dialogRef = this.dialog.open(NatureActionComponent, dialogConfig);
      this.router.events.subscribe(() => {
        dialogRef.close();
      });
      const sub = dialogRef.componentInstance.onAddNature.subscribe((response) => {
        this.tableData();
        window.location.reload();//rafraichir la page

      })
    }
    
    handleEditeAction(values: any) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        action: "Edit",
        data: values
      };
      dialogConfig.width = "850px";
      dialogConfig.minHeight= "250px";
      const dialogRef = this.dialog.open(NatureActionComponent, dialogConfig);
      this.router.events.subscribe(() => {
        dialogRef.close();
      });
      const sub = dialogRef.componentInstance.onEditNature.subscribe((response) => {
        this.tableData();
        window.location.reload();//rafraichir la page

      })
    }


    previous(){
      this.location.back()
    }
  
}
