import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../Models/subject.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  url= environment.apiUrl;
  constructor(private httpClient:HttpClient) { }
  save(subject: Subject, idSpace:number){

    return this.httpClient.post(this.url+`/user/spaces/${idSpace}/subject`, subject,{
      headers: new HttpHeaders().set('Content-Type','application/json')

    });
  }
  get(data:any){
    return this.httpClient.get(this.url+`/user/spaces/${data.idSpace}/subject/${data.idSubject}`);
  }
  getAllSubjectBySpace(idSpace:number){
    return this.httpClient.get(this.url+`/user/spaces/{idSpace}/subject`);
  }
  update(subject : Subject, data:any){
    return this.httpClient.put(this.url+`/user/spaces/${data.idSpace}/subject/${data.idSubject}`, subject,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    });
  }
  
}
