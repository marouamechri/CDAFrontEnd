import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NatureAction } from '../Models/natureAction.model';

@Injectable({
  providedIn: 'root'
})
export class NatureActionService {

  url = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }
  createNatureAction(natureAction: NatureAction){
    return this.httpClient.post(this.url+`/admin/natureAction`, natureAction,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    });
  }
  getNatureAction(id: number){
   return this.httpClient.get(this.url+`/user/natureAction/${id}`);
  }
  getAllNatureEvent(){
   return this.httpClient.get(this.url+`/user/natureAction`);
  }
  getAllNatureTask(){
   return this.httpClient.get(this.url+`/user/natureTask`);
  }
  deleteNatureAction(id:number){
    return this.httpClient.delete(this.url+`/admin/natureAction/${id}`);
  }
  updateNatureAction(id:number, natureAction : NatureAction){
    return this.httpClient.put(this.url+`/admin/natureAction/${id}`, natureAction,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    });
  }
}
