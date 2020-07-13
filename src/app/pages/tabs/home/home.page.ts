import { Component, OnInit } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";
import { AuthenticateService } from "src/app/services/authenticate.service";
import { workshops } from "../../../services/data";
import { AuthService } from "src/app/services/auth.service";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  constructor(
    public alertController: AlertController,
    private navCtrl: NavController,
    private auth: AuthenticateService,
    private auths: AuthService
  ) {}

  workshops = workshops;

  isLogged = false;


  ngOnInit(): void {
    /** With promises - AuthenticateService**/
    //this.auth.isLoggedIn().then((isLoggedIn) => this.isLogged = isLoggedIn);

    /** With observable - AuthService **/
    this.auths.getIsLoggedIn().subscribe(res => {
      this.isLogged = res;
    });
  }

  async alertLogin() {
    const alert = await this.alertController.create({
      header: "Inicia sesión para ver más",
      message:
        "Inicia sesión o registrate para acceder a todo nuestro contenido. ",
      buttons: [
        {
          text: "Cancelar",
          cssClass: "cancel",
        },
        {
          text: "Iniciar sesión",
          role: "accept",
          cssClass: "alert-button",
          handler: () => this.redirectToLogin(),
        },
      ],
    });
    await alert.present();
    let result = await alert.onDidDismiss();
  }

  workshopHandleCLick(index, workshopID) {
    if (index != 0 && !this.isLogged) {
      this.alertLogin();
    } else {
      this.navCtrl.navigateForward(`menu/tabs/workshop/${workshopID}`);
    }
  }

  redirectToLogin() {
    this.navCtrl.navigateForward(`login`);
  }
}
