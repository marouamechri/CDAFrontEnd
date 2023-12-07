import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventApi } from '../Models/EventApi.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  url = environment.apiUrl
  constructor(private httpClient:HttpClient) {}
  getEventsByUser(data: any): Observable<Array<EventApi>>{
    //creation de l'objet HttpParams 
    let params = new HttpParams();
    // Ajout de paramétre de request
    params =params.append('isValidate', data.isValidate)
   
    return this.httpClient.get<Array<EventApi>>(this.url+"/user/event",{params:params});
  }
  getEventByBinder(data: any){
      //creation de l'objet HttpParams 
    let params = new HttpParams();
    // Ajout de paramétre de request
    params =params.append('isValidate', data.isValidate)
   
    return this.httpClient.get(this.url+`/user/spaces/${data.idSpace}/event`,{params:params});
  }
  getEventBySubject(data:any){
      //creation de l'objet HttpParams 
      let params = new HttpParams();
      // Ajout de paramétre de request
      params =params.append('isValidate', data.isValidate)
      return this.httpClient.get(this.url+`/user/spaces/${data.idSpace}/subject/${data.idSubject}/event`,{params:params});   
  }
  getEventBySuSubject(data:any):Observable<Array<Event>>{
      //creation de l'objet HttpParams 
      let params = new HttpParams();
      // Ajout de paramétre de request
      params =params.append('isValidate', data.isValidate)
      return this.httpClient.get<Array<Event>>(this.url+`/user/spaces/${data.idSpace}/subject/${data.idSubject}/subSubject/${data.idSubSubject}/event`,{params:params});   
    
  }
  saveEvent(data:any):Observable<Array<Event>>{

    return this.httpClient.post<Array<Event>>(this.url+`/user/spaces/${data.idSpace}/subject/${data.idSubject}/subSubject/${data.idSubSubject}/event`,data,{
      headers:new HttpHeaders().set('Content-Type','application/json')})
  }
  getEvent(data:any){
          //creation de l'objet HttpParams 
          let params = new HttpParams();
          // Ajout de paramétre de request
          params =params.append('isValidate', data.isValidate)
          return this.httpClient.get(this.url+`/user/event/${data.idEvent}`,{params:params});   
  }
 
  updateEvent(data: any):Observable<Array<Event>>{
    return this.httpClient.put<Array<Event>>(this.url+`/user/event/${data.idEvent}`,data,{
      headers:new HttpHeaders().set('Content-Type','application/json')
      })

  }
  forceValid(idEvent:number){
    return this.httpClient.put(this.url+`/user/event/${idEvent}/forceValid`, null);
  }
  deleteEvent(data:any){
    console.log(data.idSubSubject);
    return this.httpClient.delete(this.url+`/user/spaces/${data.idSpace}/subject/${data.idSubject}/subSubject/${data.idSubSubject}/event/${data.idEvent}`)
  }
}