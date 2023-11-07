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
  save(subSubject:SubSubject, data:any){
    return this.httpClient.post(this.url+`/user/spaces/${data.idSpace}/subject/${data.idSubject}/subSubject`, subSubject,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    });
  }
  get(data: any){
    return  this.httpClient.get(this.url+`/user/spaces/${data.idSpace}/subject/${data.idSubject}/subSubject/${data.idSubSubject}`)
  }
  getAllSubSubjectBySubject(data:any){
    return this.httpClient.get(this.url+`/user/spaces/${data.idSpace}/subject/${data.idSubject}/subSubject`)
  }
  update(subSubject:SubSubject, data:any){
    return this.httpClient.put(this.update+`/user/spaces/${data.idSpace}/subject/${data.idSubject}/subSubject/{data.idSubSubject}`, subSubject,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    });
  }
}
