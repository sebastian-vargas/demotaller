import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  constructor(private http: HttpClient) { }

  API_URL ="http://localhost:8080/api/workshops/";

  getWotkshops(page, limit, token?){
    let formData = new FormData()

    formData.append('page', page.toString());
    formData.append('limit', limit.toString());
    if(token){
      formData.append('token', token);
    }

    return this.http.post(`${this.API_URL}list`, formData, {headers: new HttpHeaders()});
  }

  getWorkshop(id, token?){
    let formData = new FormData();

    formData.append('id_workshop', id)
    if(token){
      formData.append('token', token);
    }
    return this.http.post(`${this.API_URL}watch`, formData, {headers: new HttpHeaders()});

  }
}
