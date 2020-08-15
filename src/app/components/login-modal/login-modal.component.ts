import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AlertService } from 'src/app/services/shared/alert.service';


@Component({
  selector: "app-login-modal",
  templateUrl: "./login-modal.component.html",
  styleUrls: ["./login-modal.component.scss"],
})
export class LoginModalComponent implements OnInit {
  @Output("handleAction") action: EventEmitter<any> = new EventEmitter();

  loginSubscription: Subscription;
  loginForm: FormGroup;

  validation_messages = {
    email: [
      { type: "required", message: "El email es requerido" },
      { type: "pattern", message: "El email ingresado no es correcto" },
    ],
    password: [
      { type: "required", message: "El password es requerido" },
      { type: "minlength", message: "El password debe ser minimo de 5 letras" },
    ],
  };

  errorMessage: String = "";

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private storage: Storage,
    private authS: AuthService,
    public alertService: AlertService
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
    });
  }

  ngOnInit() {}

  loginUser(credentials) {
    this.loginSubscription = this.authS.login(credentials).subscribe((response) => {
      let res: any = response;
      if (res.status == 200) {
        let u = {
          isLoggedIn: true,
          user: {
            id_user: res.user.id_user,
            full_name: res.user.full_name,
            email: res.user.email,
            role: res.user.role,
            avatar: res.user.avatar || "assets/avatar.jpg",
            token: res.user.token,
          }, 
        };
        this.alertService.presentToast(res.message,1000);
        this.storage.set("token", res.user.token);
        this.authS.userData.next(u);
        this.action.emit(3);
      } else {
        console.log(res.message);
        this.alertService.presentToast(res.message,4000);
      }
    });
  }

  ionViewWillLeave() {
    if(this.loginSubscription) this.loginSubscription.unsubscribe();
  }


  goToRegister() {
    this.action.emit(2);
  }
}
