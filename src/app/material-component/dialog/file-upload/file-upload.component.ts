import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { isPdfFile } from 'pdfjs-dist';
import { Observable } from 'rxjs';
import { FileDownloadService } from 'src/app/Services/file-download.service';
import { FileUploadService } from 'src/app/Services/file-upload.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { GlobalConstants } from 'src/app/shared/global-constants';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  currentFile?: File;
  progress = 0;
  message = '';

  fileName = 'Choisissez un fichier PDF ';
  fileInfos?: Observable<any>;
  listFiles: any[] = [];
  id!: number;
  isEventValue: Boolean|null= null;
  action:any = localStorage.getItem("action");
  constructor(private fileUploadService: FileUploadService,
    private snackbarService: SnackbarService,
    private fileDownloadService : FileDownloadService,
    private ngxService:NgxUiLoaderService,
    private dialog: MatDialog,

  ) { }
  isFileEvent(): boolean|null{
    var action:String|null ="";
    action= localStorage.getItem("action");
      if(action==="event"){
        return true;
      }else if(action==="task"){
        return false;
      }
      return null;
  }
  ngOnInit(): void {
    
    this.isEventValue= this.isFileEvent()
    if(this.isEventValue) {
        let idString: any = localStorage.getItem('idEvent');
        this.id = parseInt(idString, 10);
  
      } else if (!this.isEventValue) {
        let idString: any = localStorage.getItem('idTask');
        this.id = parseInt(idString, 10);
      }
      var data: any = {
        id: this.id,
        action: this.action
      }
      this.getlistFiles(data);
  }
  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Choisissez un fichier PDF';
    }
  }
  upload(): void {
    this.message = "";
    var data: any = {
      id: this.id ,
    }
    if (this.currentFile) {
      this.fileUploadService.upload(this.currentFile, this.action, this.id).subscribe(
        (event: any) => {
          this.message = "Le fichier a bien été envoyé";
          this.getlistFiles(data);
          this.snackbarService.openSnackBar(this.message, "success");
          window.location.reload();//rafraichir la page

        },
        (err: any) => {
          console.log(err);
          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Impossible de télécharger le fichier';
          }

          this.currentFile = undefined;
        });
    }

  }
  getlistFiles(data:any) {
    
    if(data.action ==="event"){
    
      this.fileUploadService.getEventFiles(data).subscribe((data: any[]) => {
        this.listFiles = data;
      },
        (err: any) => {
          console.log(err);

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = "Impossible d'afficher la liste des fichiers";
          }

        });

  }else if(data.action==="task"){
    this.fileUploadService.getTaskFiles(data).subscribe((data: any[]) => {
      this.listFiles = data;

    },
      (err: any) => {
        console.log(err);

        if (err.error && err.error.message) {
          this.message = err.error.message;
        } else {
          this.message = "Impossible d'afficher la liste des fichiers";
        }

      });

  }
}
 //download file
 downloadFile(file: any){
 
  this.fileDownloadService.downloadFile(file.name).subscribe((response: Blob)=>{
    if(response){
    this.saveFile(response, file);
    window.location.reload();//rafraichir la page

    }
  },(error)=>{
    console.log(error,'Impossible de télécharger le fichier!')
  })
 }
 saveFile(blob:Blob,file: any){
 
    const downloadLink=document.createElement('a');
    const url= window.URL.createObjectURL(blob);
    downloadLink.href=url;
    downloadLink.download= file.name;
    downloadLink.click();
    window.URL.revokeObjectURL(url);

 }

 //delete File
 handleDeleteFile(fileName: any) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.data = {
    message: 'supprimer cet fichier',
    confirmation: true
  }
  const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
  const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response) => {
    this.ngxService.start()
    this.deleteFile(fileName);
    dialogRef.close();
    window.location.reload();//rafraichir la page

  })
}
deleteFile(fileName:any){
  this.ngxService.start();
   var  fileName = fileName;
   var data: any={
    id:this.id,
    action:this.action
   }

  
  this.fileUploadService.delete(fileName).subscribe((response:any)=>{
    this.ngxService.stop();
    this.getlistFiles(data);
    this.message="Le fichier a bien été supprimé";
    this.snackbarService.openSnackBar(this.message,"success");
    window.location.reload();//rafraichir la page
  },(error)=>{
    this.ngxService.stop();
    console.log(error);
    this.message = GlobalConstants.genericError;
    this.snackbarService.openSnackBar(this.message, GlobalConstants.error);
  })
}



}
