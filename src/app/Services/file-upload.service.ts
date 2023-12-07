import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocumentApi } from '../Models/documentApi.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  url = environment.apiUrl
  constructor(private httpClient:HttpClient) {}

  upload(file:File, action:any, id:any):Observable<DocumentApi>{
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('action',action);
    formData.append('id', id);
    return this.httpClient.post<DocumentApi>(`${this.url}/user/files/upload`, formData);
  }
  getEventFiles(data:any): Observable<any[]> {  

      return this.httpClient.get<any[]>(`${this.url}/user/files/event/${data.id}`);
  }
  getTaskFiles(data:any){
      return this.httpClient.get<any[]>(`${this.url}/user/files/task/${data.id}`);
  } 
  delete(fileName: any): Observable<any>{
    return this.httpClient.delete<any>(`${this.url}/user/files/${fileName}`);

  }
}
