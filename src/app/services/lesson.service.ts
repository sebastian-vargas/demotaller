import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient) { }
  API_URL = environment.API_URL;
  //API_URL ="http://localhost:8080/api/lessons/";

  getLessons(id_lesson){
    let formData = new FormData()
    formData.append('id_lesson', id_lesson.toString());
    return this.http.post(`${this.API_URL}lessons/watch`, formData, {headers: new HttpHeaders()});
  }

  getComments(id_lesson,page, limit){
    let formData = new FormData()

    formData.append('page', page.toString());
    formData.append('limit', limit.toString());
    formData.append('id_lesson', id_lesson.toString());

    return this.http.post(`${this.API_URL}lessons/comments`, formData, {headers: new HttpHeaders()});
  }

  addComment(id_lesson, token, comment) {
    let formData = new FormData()

    formData.append('id_lesson', id_lesson.toString());
    formData.append('token', token.toString());
    formData.append('comment', comment.toString());

    return this.http.post(`${this.API_URL}lessons/add-comment`, formData, {headers: new HttpHeaders()});
  }


  startLesson(id_lesson, token) {
    let formData = new FormData()

    formData.append('id_lesson', id_lesson.toString());
    formData.append('token', token.toString());

    return this.http.post(`${this.API_URL}lessons/start-lesson`, formData, {headers: new HttpHeaders()});
    
  }


  addLesson(lesson,  token){
    let formData = new FormData();

    formData.append('id_workshop', lesson.id_workshop);
    formData.append('description', lesson.description);
    formData.append('title', lesson.title);
    formData.append('token', token);

    return this.http.post(`${this.API_URL}admin/add-lesson`, formData, {headers: new HttpHeaders()});
  }

  editLesson(lesson, token){
    let formData = new FormData();

    formData.append('id_lesson', lesson.id_lesson);
    formData.append('description', lesson.description);
    formData.append('title', lesson.title);
    formData.append('token', token);

    return this.http.post(`${this.API_URL}admin/edit-lesson`, formData, {headers: new HttpHeaders()});
  }

  addLessonContent(token, id_lesson, content){
    let formData = new FormData();
    console.log(content.title)
  
    formData.append('id_lesson', id_lesson);
    formData.append('type', content.type);
    formData.append('token', token);
    formData.append('title', content.title);

    if(content.type !== '1'){
      formData.append('content_file', content.content_file);
    }else {
      formData.append('url', content.url);
    }

    return this.http.post(`${this.API_URL}admin/add-lesson-content`, formData, {headers: new HttpHeaders()});
  }

  editLessonContent(token, content){
    let formData = new FormData();
  
    formData.append('id_lesson_content', content.id_lesson_content);
    formData.append('type', content.type);
    formData.append('token', token);
    formData.append('title', content.title);

    if(content.type !== '1'){
      if(content.content_file && content.content_file != undefined){
        formData.append('content_file', content.content_file);
      }
    }else {
      formData.append('url', content.url);
    }

    return this.http.post(`${this.API_URL}admin/edit-lesson-content`, formData, {headers: new HttpHeaders()});
  }

}
