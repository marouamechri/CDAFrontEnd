import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocumentApi } from '../Models/documentApi.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  url = environment.apiUrl
  constructor(private httpClient:HttpClient) {}

  upload(file:File):Observable<DocumentApi>{
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<DocumentApi>(this.url+`/user/uploadFile`, formData);
  }
}
