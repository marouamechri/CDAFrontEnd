import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NatureAction } from '../Models/natureAction.model';
import { __param } from 'tslib';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NatureActionService {

  url = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }
  createNatureAction(natureAction: any){
    return this.httpClient.post(this.url+`/admin/natureAction`, natureAction,{
      headers: new HttpHeaders().set('Content-Type','application/json',
      
      )
    });
  }
  getNatureAction(id: number):Observable<NatureAction>{
   return this.httpClient.get<NatureAction>(this.url+`/user/natureAction/${id}`);
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
  updateNatureAction(data: any){
    return this.httpClient.put(this.url+`/admin/natureAction/${data.id}`, data,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    });
  }
}
