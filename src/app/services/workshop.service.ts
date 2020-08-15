import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  constructor(private http: HttpClient) { }
  API_URL = environment.API_URL;
  //API_URL ="http://localhost:8080/api/workshops/";

  getWotkshops(page, limit, token?){
    let formData = new FormData()

    formData.append('page', page.toString());
    formData.append('limit', limit.toString());
    if(token){
      formData.append('token', token);
    }

    return this.http.post(`${this.API_URL}workshops/list`, formData, {headers: new HttpHeaders()});
  }

  getMyWorkshops(page, limit, token?){
    let formData = new FormData()

    formData.append('page', page.toString());
    formData.append('limit', limit.toString());
    if(token){
      formData.append('token', token);
    }

    return this.http.post(`${this.API_URL}workshops/list-started`, formData, {headers: new HttpHeaders()});
  }

  getWorkshopsForGuest(workshops: Array<any>){
    let formData = new FormData();
    let w = JSON.stringify(workshops)
    formData.append('workshops', w);

    
    return this.http.post(`${this.API_URL}workshops/list-for-guest`, formData, {headers: new HttpHeaders()});
  }

  getWorkshop(id, token?){
    let formData = new FormData();

    formData.append('id_workshop', id)
    if(token){
      formData.append('token', token);
    }
    return this.http.post(`${this.API_URL}workshops/watch`, formData, {headers: new HttpHeaders()});
  }

  startWorkshop(id,  token){
    let formData = new FormData();

    formData.append('id_workshop', id);
    formData.append('token', token);

    return this.http.post(`${this.API_URL}workshops/start-workshop`, formData, {headers: new HttpHeaders()});
  }

  editWorkshop(workshop,  token){
    let formData = new FormData();

    formData.append('id_workshop', workshop.id_workshop);
    formData.append('description', workshop.description);
    formData.append('title', workshop.title);
    formData.append('token', token);

    return this.http.post(`${this.API_URL}admin/edit-workshop`, formData, {headers: new HttpHeaders()});
  }

  addWorkshop(workshop,  token){
    let formData = new FormData();

    formData.append('description', workshop.description);
    formData.append('title', workshop.title);
    formData.append('token', token);

    return this.http.post(`${this.API_URL}admin/add-workshop`, formData, {headers: new HttpHeaders()});
  }
  workshopsByUser(id_user, token){
    let formData = new FormData();
    formData.append('id_user', id_user);
    formData.append('token', token);
     return this.http.post(`${this.API_URL}admin/workshops-list`, formData, {headers: new HttpHeaders()});
  }

  searchWorkshop(search,  token){
    let formData = new FormData();

    formData.append('search', search.toString().toLowerCase());
    formData.append('token', token);

    return this.http.post(`${this.API_URL}admin/search-workshops`, formData, {headers: new HttpHeaders()});
  }

  searchUsers(search, token){
    let formData = new FormData();

    formData.append('search', search.toString().toLowerCase());
    formData.append('token', token);

    return this.http.post(`${this.API_URL}admin/search-users`, formData, {headers: new HttpHeaders()});
  }

  getUsers(id_workshop, token){
    let formData = new FormData();

    formData.append('id_workshop', id_workshop);
    formData.append('token', token);

    return this.http.post(`${this.API_URL}admin/users-list`, formData, {headers: new HttpHeaders()});
  }
}
