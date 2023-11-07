import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Doctor } from '../Models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  url= environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  save(doctor:Doctor, idSpace: number ){
    return this.httpClient.post(this.url+`/user/spaces/${idSpace}/doctor`,doctor,{
      headers:new HttpHeaders().set('Content-Type','application/json')
    });
  }
  get(data: any){
    return this.httpClient.get(this.url+`/user/spaces/${data.idSpace}/doctor/${data.idDoctor}`);
  }
  getAllDoctorBySpace(idSpace: number){
    return this.httpClient.get(this.url+`/user/spaces/${idSpace}/doctor`);
  }
  getAllDoctorByUser(){
    return this.httpClient.get(this.url+`/user/spaces/doctor`);
  }
  update(doctor: Doctor, data:any){
    return this.httpClient.put(this.url+`/user/spaces/${data.idSpace}/doctor/${data.idDoctor}`, data,{
      headers:new HttpHeaders().set('Content-Type','application/json')
    });
  }
  getMedicalSpecialtiesByDoctor(data:any){
    return this.httpClient.get(this.update+`/user/spaces/${data.idSpace}/doctor/${data.idDoctor}/medicalSpecialties`)
  }
}
