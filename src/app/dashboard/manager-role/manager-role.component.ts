import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { UserService } from 'src/app/Services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { RoleComponent } from '../role/role.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manager-role',
  templateUrl: './manager-role.component.html',
  styleUrls: ['./manager-role.component.css']
})
export class ManagerRoleComponent {
  displayedColumns: string[] = ['name', 'email', 'action'];
  dataSource: any;
  responseMessage: any;
  constructor(
    private userService: UserService,
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
      this.userService.getAllAdmin().subscribe((response: any) => {
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
  
    handleAttachAction() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        action: "Attach"
      };
      dialogConfig.width = "850px";
      const dialogRef = this.dialog.open(RoleComponent, dialogConfig);
      this.router.events.subscribe(() => {
        dialogRef.close();
      });
      const sub = dialogRef.componentInstance.onAttachRole.subscribe((response) => {
        this.tableData();
        window.location.reload();//rafraichir la page

      })
    }
    handleDetachAction(values: any) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        action: "Detach",
        data: values
      };
      dialogConfig.width = "850px";
      dialogConfig.minHeight= "250px";
      const dialogRef = this.dialog.open(RoleComponent, dialogConfig);
      this.router.events.subscribe(() => {
        dialogRef.close();
      });
      const sub = dialogRef.componentInstance.onDetachRole.subscribe((response) => {
        this.tableData();
        window.location.reload();//rafraichir la page

      })
    }


    previous(){
      this.location.back()
    }
  

}
