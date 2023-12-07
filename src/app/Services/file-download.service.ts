import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {
  url = environment.apiUrl
  constructor(private httpClient: HttpClient){}

  downloadFile(filename: string): Observable<Blob>{
    const headers = new HttpHeaders({
      'Accept': 'application/pdf',

    })
    
    return this.httpClient.get<Blob>(this.url+`/user/files/${filename}`, {headers: headers, responseType:'blob' as 'json'} 
    )}
  
}
