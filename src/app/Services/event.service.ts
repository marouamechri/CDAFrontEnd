import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  url = environment.apiUrl
  constructor(private httpClient:HttpClient) {}
  getEventsByUser(isActive : boolean){
    //creation de l'objet HttpParams 
    let params = new HttpParams();
    // Ajout de paramétre de request
    params =params.append('isActive', isActive)
   
    return this.httpClient.get(this.url+"/user/event",{params:params});
  }
  getEventByBinder(data: any){
      //creation de l'objet HttpParams 
    let params = new HttpParams();
    // Ajout de paramétre de request
    params =params.append('isActive', data.isActive)
   
    return this.httpClient.get(this.url+`/user/spaces/${data.idSpace}/event`,{params:params});
  }
  getEventBySubject(data:any){
      //creation de l'objet HttpParams 
      let params = new HttpParams();
      // Ajout de paramétre de request
      params =params.append('isActive', data.isActive)
      return this.httpClient.get(this.url+`/user/spaces/${data.idSpace}/subject/${data.idSubject}/event`,{params:params});   
  }
  getEventBySuSubject(data:any){
      //creation de l'objet HttpParams 
      let params = new HttpParams();
      // Ajout de paramétre de request
      params =params.append('isActive', data.isActive)
      return this.httpClient.get(this.url+`/user/spaces/${data.idSpace}/subject/${data.idSubject}/subSubject/${data.idSubSubject}/event`,{params:params});   
    
  }
  saveEvent(event:Event, data:any){
    return this.httpClient.post(this.url+`/user/spaces/${data.idSpace}/subject/${data.idSubject}/subSubject/${data.idSubSubject}/event`,event,{
      headers:new HttpHeaders().set('Content-Type','application/json')
          })
  }
  getEvent(data:any){
          //creation de l'objet HttpParams 
          let params = new HttpParams();
          // Ajout de paramétre de request
          params =params.append('isActive', data.isActive)
          return this.httpClient.get(this.url+`/user/event/${data.idEvent}`,{params:params});   
  }
  updateEvent(event:Event, idEvent:number){
    return this.httpClient.put(this.url+`/user/event/${idEvent}`,event,{
      headers:new HttpHeaders().set('Content-Type','application/json')
      })

  }
  validEvent(idEvent:number, event: Event){
    return this.httpClient.put(this.url+`/user/event/${idEvent}/valid`, event);
  }
  deleteEvent(data:any){
    return this.httpClient.delete(this.url+`spaces/${data.idSpace}/subject/${data.idSubject}/event/${data.idEvent}`)
  }
}