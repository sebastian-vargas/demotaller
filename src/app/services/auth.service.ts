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
}
