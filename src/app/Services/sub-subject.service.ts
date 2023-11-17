import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SubSubject } from '../Models/subSubjects.medel';

@Injectable({
  providedIn: 'root'
})
export class SubSubjectService {

  url= environment.apiUrl;
  constructor(private httpClient:HttpClient) { }
  save(data:any){
    idSubject :Number = data.idSubject;
    return this.httpClient.post(this.url+`/user/spaces/${data.idSpace}/subject/${data.idSubject}/subSubject`, data,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    });
  }
  get(data: any){
    return  this.httpClient.get(this.url+`/user/spaces/${data.idSpace}/subject/${data.idSubject}/subSubject/${data.idSubSubject}`)
  }
  getAllSubSubjectBySubject(data:any){
    return this.httpClient.get(this.url+`/user/spaces/${data.idSpace}/subject/${data.idSubject}/subSubject`)
  }
  update(data:any){
    return this.httpClient.put(this.url+`/user/spaces/${data.idSpace}/subject/${data.idSubject}/subSubject/${data.idSubSubject}`, data,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    });
  }
}
