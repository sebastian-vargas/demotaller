import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient) { }
  API_URL = environment.API_URL + "lessons/";
  //API_URL ="http://localhost:8080/api/lessons/";

  getLessons(id_lesson){
    let formData = new FormData()
    formData.append('id_lesson', id_lesson.toString());
    return this.http.post(`${this.API_URL}watch`, formData, {headers: new HttpHeaders()});
  }

  getComments(id_lesson,page, limit){
    let formData = new FormData()

    formData.append('page', page.toString());
    formData.append('limit', limit.toString());
    formData.append('id_lesson', id_lesson.toString());

    return this.http.post(`${this.API_URL}comments`, formData, {headers: new HttpHeaders()});
  }

  addComment(id_lesson, token, comment) {
    let formData = new FormData()

    formData.append('id_lesson', id_lesson.toString());
    formData.append('token', token.toString());
    formData.append('comment', comment.toString());

    return this.http.post(`${this.API_URL}add-comment`, formData, {headers: new HttpHeaders()});
  }


  startLesson(id_lesson, token) {
    let formData = new FormData()

    formData.append('id_lesson', id_lesson.toString());
    formData.append('token', token.toString());

    return this.http.post(`${this.API_URL}start-lesson`, formData, {headers: new HttpHeaders()});
    
  }
}
