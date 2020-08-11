import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  constructor(private http: HttpClient) { }
  API_URL = environment.API_URL + "workshops/";
  //API_URL ="http://localhost:8080/api/workshops/";

  getWotkshops(page, limit, token?){
    let formData = new FormData()

    formData.append('page', page.toString());
    formData.append('limit', limit.toString());
    if(token){
      formData.append('token', token);
    }

    return this.http.post(`${this.API_URL}list`, formData, {headers: new HttpHeaders()});
  }

  getMyWorkshops(page, limit, token?){
    let formData = new FormData()

    formData.append('page', page.toString());
    formData.append('limit', limit.toString());
    if(token){
      formData.append('token', token);
    }

    return this.http.post(`${this.API_URL}list-started`, formData, {headers: new HttpHeaders()});
  }

  getWorkshopsForGuest(workshops: Array<any>){
    let formData = new FormData();
    let w = JSON.stringify(workshops)
    formData.append('workshops', w);

    
    return this.http.post(`${this.API_URL}list-for-guest`, formData, {headers: new HttpHeaders()});
  }

  getWorkshop(id, token?){
    let formData = new FormData();

    formData.append('id_workshop', id)
    if(token){
      formData.append('token', token);
    }
    return this.http.post(`${this.API_URL}watch`, formData, {headers: new HttpHeaders()});
  }

  startWorkshop(id,  token){
    let formData = new FormData();

    formData.append('id_workshop', id);
    formData.append('token', token);

    return this.http.post(`${this.API_URL}start-workshop`, formData, {headers: new HttpHeaders()});
  }
}
