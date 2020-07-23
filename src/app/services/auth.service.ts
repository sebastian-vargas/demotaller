import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private storage: Storage) {}

  isLoggedIn$ = new BehaviorSubject(false);

  getIsLoggedIn(): Observable<boolean> {
    this.storage.get("isUserLoggedIn").then(res => {
    
      if (res && res != null) {
        this.isLoggedIn$.next(res);
      } else {
        this.storage.set("isUserLoggedIn", false);
        this.isLoggedIn$.next(false);
      }
    });

    return this.isLoggedIn$;
  }

  logOut() {
    this.storage.set("isUserLoggedIn", false);
    this.isLoggedIn$.next(false);
  }

  login(credentials) {
    this.storage.get('user').then(user => {
      if(user.email == credentials.email && user.password == credentials.password){
        this.storage.set("isUserLoggedIn", true);
        this.isLoggedIn$.next(true);
      }
    });
  }


  async loginUser(credential){
    const user = await this.storage.get("user");
    return new Promise((accept, reject)=>{
      if(
        user.email == credential.email &&
        user.password == credential.password
        ){
          this.storage.set("isUserLoggedIn", true);
        this.isLoggedIn$.next(true);
        accept("login correcto");
      }else{
        reject("login incorrecto");
      }
    });
  }

}
