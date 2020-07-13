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

  addWorkshop(wsData){
    return this.storage.set("ws",wsData);
  }

  async isLoggedIn(){
    const isUserLoggedIn = await this.storage.get("isUserLoggedIn");
    if(isUserLoggedIn){
      return true;
    }else{
      return false;
    }
  }

  logOut() {
    this.storage.remove("isUserLoggedIn");
  }
}


//return fetch("url delsuperserver (backend)")