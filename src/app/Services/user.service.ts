import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthRequest } from '../Models/auth-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  signup(authRequest: AuthRequest) {
    return this.httpClient.post(this.url +
      "/signup", authRequest, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }
  login(data: any) {
    return this.httpClient.post(this.url +
      "/login", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }
  
  
}
