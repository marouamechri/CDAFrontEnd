import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../Models/task.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url= environment.apiUrl;
  constructor(private httpClient :HttpClient) { }
  save(data:any){
    return this.httpClient.post(this.url+
      `/user/spaces/${data.idSpace}/subject/${data.idSubject}/subSubject/${data.idSubSubject}/event/${data.idEvent}/task`, data,{
        headers: new HttpHeaders().set('Content-Type','application/json')
      });
  }
  get(data: any){
    return this.httpClient.get(this.url+
      `/user/spaces/${data.idSpace}/subject/${data.idSubject}/subSubject/${data.idSubSubject}/event/${data.idEvent}/task/${data.idTask}`);
  }
  getAllTaskByEvent(data:any){
    return this.httpClient.get(this.url+
      `/user/spaces/${data.idSpace}/subject/${data.idSubject}/subSubject/${data.idSubSubject}/event/${data.idEvent}/task`);
  }
  delete(data:any){
    return this.httpClient.delete(this.url+
      `/user/spaces/${data.idSpace}/subject/${data.idSubject}/subSubject/${data.idSubSubject}/event/${data.idEvent}/task/${data.idTask}`);     
  }
  validTask(data:any){
    return this.httpClient.put(this.url+
      `/user/spaces/${data.idSpace}/subject/${data.idSubject}/subSubject/${data.idSubSubject}/event/${data.idEvent}/task/${data.idTask}/valid`, null);     

  }
  updateTask(data:any){
    return this.httpClient.put(this.url+
      `/user/spaces/${data.idSpace}/subject/${data.idSubject}/subSubject/${data.idSubSubject}/event/${data.idEvent}/task/${data.idTask}`, data,{
        headers: new HttpHeaders().set('Content-Type','application/json')
      });

    }
    forceValid(data: any){
   
      return this.httpClient.put(this.url+
        `/user/spaces/${data.idSpace}/subject/${data.idSubject}/subSubject/${data.idSubSubject}/event/${data.idEvent}/task/${data.idTask}/forceValid`,data,{    
        headers: new HttpHeaders().set('Content-Type','application/json')
      });

      }

}
