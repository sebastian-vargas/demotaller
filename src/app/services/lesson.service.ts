import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient) { }

  API_URL ="http://localhost:8080/api/lessons/";

  getLessons(id_lesson){
    let formData = new FormData()
    formData.append('id_lesson', id_lesson.toString());
    return this.http.post(`${this.API_URL}watch`, formData, {headers: new HttpHeaders()});
  }

  getComments(id_lesson,page, limit){
    let formData = new FormData()

    formData.append('page', page.toString());
    formData.append('limit', limit.toString());
    formData.append('id_lesson', limit.toString());

    return this.http.post(`${this.API_URL}comments`, formData, {headers: new HttpHeaders()});
  }
}
