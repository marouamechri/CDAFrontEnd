import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { MedicalSpecialties } from '../Models/medicalSpecialties.model';

@Injectable({
  providedIn: 'root'
})
export class MedicalSpecialtyService {

  url = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  createSpeciality(specialtiy: MedicalSpecialties){
    return this.httpClient.post(this.url+`/admin/medicalSpecialties`, specialtiy, {
      headers:new HttpHeaders().set('Content-Type','application/json')

    });
  }
  getSpeciality(id:number){
    return this.httpClient.get(this.url+`/user/medicalSpecialties/${id}`);
  }
  getAllSpeciality(){
    return this.httpClient.get(this.url+`/user/medicalSpecialties`);
  }
  deleteSpeciality(id: number){
    return this.httpClient.delete(this.url+`/admin/medicalSpecialties/${id}`);
  }
  updateSpeciality(spesialty:MedicalSpecialties, id:number){
    return this.httpClient.put(this.url+`/admin/medicalSpecialties/${id}`, spesialty,{
      headers:new HttpHeaders().set('Content-Type','application/json')
    });
  }
}
