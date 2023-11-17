import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Binder } from '../Models/binder.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BinderService {

  url = environment.apiUrl;
  
  constructor(private httpClient:HttpClient) {}
  getBinder():Observable<Array<Binder>>{
    return this.httpClient.get<Array<Binder>>(this.url+"/user/spaces");
  }
  saveBinder(binder:any){
    return this.httpClient.post(this.url+`/user/spaces`, binder,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }
  updateBinder(binder:any){
    return this.httpClient.put(this.url+`/user/spaces/${binder.id}`, binder,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }
  deleteBinder(id: number){
    return this.httpClient.delete(this.url+`/user/spaces/${id}`)

  }
}
