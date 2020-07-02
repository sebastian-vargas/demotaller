import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  constructor(private storage:Storage) { }
  async loginUser(credential){
    const user = await this.storage.get("user");
    return new Promise((accept, reject)=>{
      if(
        user.email == credential.email &&
        user.password == credential.password
        ){
        accept("login correcto");
      }else{
        reject("login incorrecto");
      }
    });
  }
  registerUser(userData){
    return this.storage.set("user",userData);
  }
}


//return fetch("url delsuperserver (backend)")