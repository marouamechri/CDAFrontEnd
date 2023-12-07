import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../Models/subject.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  url= environment.apiUrl;
  constructor(private httpClient:HttpClient) { }
  save(subject: any){

    return this.httpClient.post(this.url+`/user/spaces/${subject.idSpace}/subject`, subject,{
      headers: new HttpHeaders().set('Content-Type','application/json')

    })
  }
  get(data:any){
    return this.httpClient.get(this.url+`/user/spaces/${data.idSpace}/subject/${data.idSubject}`);
  }
  getAllSubjectBySpace(idSpace:number):Observable<Array<Subject>>{
    return this.httpClient.get<Array<Subject>>(this.url+`/user/spaces/${idSpace}/subject`);
  }
  update(subject : any){
    return this.httpClient.put(this.url+`/user/spaces/${subject.idSpace}/subject/${subject.idSubject}`, subject,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    });
  }
  delete(data:any){
    return this.httpClient.delete(this.url+`/user/spaces/${data.idSpace}/subject/${data.idSubject}`);

  }
  
}
