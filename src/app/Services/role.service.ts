import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Role } from '../Models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  listRole(){
    return this.httpClient.get(this.url+`/admin/roles`);
  }
  createRole(role: Role){
    return this.httpClient.post(this.url+`/admin/roles`, role, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    });
  }
  attach(email :String){
    return this.httpClient.post(this.url+`/admin/attach`, email ,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    });
  }
  detach(email :String){
    return this.httpClient.post(this.url+`/admin/detach`, email ,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    });
  }
  delete(id:number){
    return this.httpClient.delete(this.url+`/admin/roles/{id}`)
  }

}
