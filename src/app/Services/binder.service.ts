import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Binder } from '../Models/binder.model';

@Injectable({
  providedIn: 'root'
})
export class BinderService {

  url = environment.apiUrl;
  
  constructor(private httpClient:HttpClient) {}
  getBinder(){
    return this.httpClient.get(this.url+"/user/spaces");
  }
  saveBinder(binder:Binder){
    return this.httpClient.post(this.url+`/user/spaces`, binder,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }
  updateBinder(binder:Binder, id:number){
    return this.httpClient.put(this.url+`/user/spaces/${id}`, binder,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }
  deleteBinder(id: number){
    return this.httpClient.delete(this.url+`/user/spaces/${id}`)

  }
}
