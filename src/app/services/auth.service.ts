import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Storage } from "@ionic/storage";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private storage: Storage, private http: HttpClient) {}
  API_URL = "http://localhost:8080/api/users/";

  default = {
    isLoggedIn: false,
    user: {
      id_user: '',
      full_name: "Invitado",
      email: "",
      role: "",
      avatar: "assets/avatar.jpg",
    },
  };

  userData = new BehaviorSubject(this.default);

  loadUser() {
    return new Promise((resolve, reject) => {
      this.storage.get("token").then((token) => {
        if (token) {
          let formData = new FormData();
          formData.append("token", token.toString());
          this.http
            .post(`${this.API_URL}watch`, formData, {
              headers: new HttpHeaders(),
            })
            .subscribe((res: any) => {
              if (res && res.status == 200) {
                let user = {
                  isLoggedIn: true,
                  user: {
                    id_user: res.data.id_user,
                    full_name: res.data.full_name,
                    email: res.data.email,
                    role: res.data.role,
                    avatar: res.data.avatar || "assets/avatar.jpg",
                    token: token
                  },
                };
                console.log(user)
                this.userData.next(user);
                resolve(true);
              } else {
                resolve(false);
              }
            });
        } else {
          resolve(false);
        }
      });
    });
  }

  logOut() {
    
    this.storage.remove('token');
    this.userData.next(this.default);
  }

  login(credentials) {
    let formData = new FormData();

    formData.append("email", credentials.email.toString());
    formData.append("password", credentials.password.toString());

    return this.http.post(`${this.API_URL}login`, formData, {
      headers: new HttpHeaders(),
    });
  }

  register(register){
    let formRegister = new FormData();
    formRegister.append("full_name", register.full_name.toString());
    formRegister.append("email", register.email.toString());
    formRegister.append("password", register.password.toString());

    return this.http.post(`${this.API_URL}register`,formRegister, {
      headers: new HttpHeaders(),
    });
  }

  /* VIEJO */
  /*
  isLoggedIn$ = new BehaviorSubject(false);

  defaulUser = {
    isLoggedIn: false,
    full_name: "Invitado",
    avatar: "assets/avatar.png",
    id_user: "0",
  };

  userData$ = new BehaviorSubject(this.defaulUser);

  login(credentials) {
    let formData = new FormData();

    formData.append("email", credentials.email.toString());
    formData.append("password", credentials.password.toString());

    return this.http.post(`${this.API_URL}login`, formData, {
      headers: new HttpHeaders(),
    });
  }

  getIsLoggedIn(): Observable<boolean> {
    this.storage.get("userData").then((res) => {
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
    
    this.storage.remove('token');
    this.userData.next(this.default);

    //old
    this.storage.set("userData", this.defaulUser);
    this.isLoggedIn$.next(false);
    this.userData$.next(this.defaulUser);
  }

  getUserData(): Observable<any> {
    this.storage.get("userData").then((res) => {
      this.userData$.next(res);
    });

    return this.userData$;
  }

  */
}
