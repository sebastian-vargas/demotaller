import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private storage: SQLiteObject;
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  
  workshops_started = new BehaviorSubject([]);
  lessons_readed = new BehaviorSubject([]);


  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) { 
    this.platform.ready().then(() => {
      try {
        this.sqlite.create({
          name: 'magia_de_amor.db',
          location: 'default'
        })
        .then((db: SQLiteObject) => {
            this.storage = db;
            this.httpClient.get(
              'assets/SQLite_database.sql', 
              {responseType: 'text'}
            ).subscribe(data => {
              this.sqlPorter.importSqlToDb(this.storage, data)
                .then(_ => {
                  this.isDbReady.next(true);
                })
                .catch(error => console.error(error));
            });
            
        });
      } catch (error) {
        
      }
    });
  }

  fetchWorkshops() {
    return this.storage.executeSql('SELECT * FROM workshops_started ORDER BY started_at DESC ', []).then(res => {
      let workshops = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          workshops.push({ 
            id_workshop: res.rows.item(i).id_workshop,
            started_at: res.rows.item(i).started_at
           });
        }
      } 
      console.log(workshops)  
      return workshops;
    });
  }

  fetchLessons() {
    return this.storage.executeSql('SELECT * FROM lessons_readed', []).then(res => {
      let lessons = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          lessons.push({ 
            id_lesson: res.rows.item(i).id_lesson,
            started_at: res.rows.item(i).started_at
           });
        }
      }   
      console.log(lessons)

      return lessons;
    });
  }



  checkWorkshop(id_workshop){
    return this.storage.executeSql(`SELECT * FROM workshops_started where id_workshop = ${id_workshop}`, []).then(res => {
      if (res.rows.length > 0) {
        return true;
      }else {
        return false;
      }
    });
  }
  checkLesson(id_lesson){
    return this.storage.executeSql(`SELECT * FROM lessons_readed where id_lesson = ${id_lesson}`, []).then(res => {
      if (res.rows.length > 0) {
        return true;
      }else {
        return false;
      }
    });
  }
  startWorkshop(id_workshop) {
    let data = [id_workshop];
    return this.storage.executeSql('INSERT INTO workshops_started (id_workshop) VALUES (?)', data)
    .then(res => {
      return res.rowsAffected;
    });
  }

  startLesson(id_lesson) {
    let data = [id_lesson];
    return this.storage.executeSql('INSERT INTO lessons_readed (id_lesson) VALUES (?)', data)
    .then(res => {
      return res.rowsAffected;
    });
  }


  DeleteWorkshopsStarted() {
    return this.storage.executeSql('DELETE FROM workshops_started', [])
    .then(_ => {
      console.log("Database Restored")
    });
  }

  DeleteLessonsReaded() {
    return this.storage.executeSql('DELETE FROM lessons_readed', [])
    .then(_ => {
      console.log("Database Restored")
    });
  }


  getWorkshopsStarted(){
    //this.fetchWorkshops()
    return this.workshops_started.asObservable();
  }

  getLessonsReaded(){
    return this.lessons_readed.asObservable();
  }


}
