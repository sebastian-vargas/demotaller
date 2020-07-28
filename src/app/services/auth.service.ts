import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Storage } from "@ionic/storage";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private storage: Storage, private http: HttpClient) {}
  API_URL ="http://localhost:8080/api/users/";

  isLoggedIn$ = new BehaviorSubject(false);

  defaulUser = {
    isLoggedIn: false,
    full_name: "Invitado",
    id_user: "0"
  }
  
  userData$ = new BehaviorSubject(this.defaulUser);

  login(credentials) {

    let formData = new FormData();

    formData.append('email', credentials.email.toString());
    formData.append('password', credentials.password.toString());

    return this.http.post(`${this.API_URL}login`, formData, {headers: new HttpHeaders()});
  }

  getIsLoggedIn(): Observable<boolean> {
    this.storage.get("userData").then(res => {
      if (res && res != null) {
        this.storage.set("userData", res);
        this.isLoggedIn$.next(res.isLoggedIn);
      } else {
        this.storage.set("userData", this.defaulUser);
        this.userData$.next(this.defaulUser);
        this.isLoggedIn$.next(false);
      }
    });
    return this.isLoggedIn$;
  }

  logOut() {
    this.storage.set("userData", this.defaulUser);
    //this.isLoggedIn$.next(false);
    this.userData$.next(this.defaulUser);
  }

  getUserData(): Observable<any>{
    this.storage.get("userData").then(res => {
      this.userData$.next(res);
    });

    return this.userData$;
  }
}
