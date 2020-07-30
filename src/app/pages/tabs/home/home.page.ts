import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertController, NavController, ModalController, IonInfiniteScroll, IonVirtualScroll } from "@ionic/angular";

import { AuthService } from "src/app/services/auth.service";
import { WorkshopService } from "src/app/services/workshop.service";
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Workshop} from '../../../models/workshop.model';
 
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  constructor(
    public alertController: AlertController,
    private navCtrl: NavController,
    private auths: AuthService,
    public modalController: ModalController,    
    private workShopService: WorkshopService
  ) {}

  workshops:Workshop[] = [];

  isLogged = false;
  loading = true;
  refreshing = false;
  page = 1;
  limit = Math.round(screen.height / 70);
  firstLoad = true;
  workshopsSubscription: Subscription;

  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  ngOnInit(): void {

    /** With observable - AuthService **/
    this.auths.getIsLoggedIn().subscribe(isLogged => this.isLogged = isLogged);
    this.auths.getUserData().subscribe(user => {
      this.isLogged = user.isLoggedIn;
      console.log(user)
    });
  } 

  ionViewWillEnter(){
    this.loadWorkshops();
  }

  ionViewWillLeave() {
    this.workshopsSubscription.unsubscribe();
    this.page = 1;
    this.loading = true;
    this.firstLoad = true;
    this.workshops = [];
    this.infiniteScroll.disabled = true;
  }

  loadWorkshops(scroll?, refresh?) {
    this.loading = true;
    this.workshopsSubscription = this.workShopService
      .getWotkshops(this.page, this.limit)
      .pipe(delay(1000))
      .subscribe(
        (response) => {
          console.log(response["workshops"]);
          this.page++;
          if (this.firstLoad && this.infiniteScroll.disabled) {
            this.firstLoad = false;
            this.toggleInfiniteScroll();
          }
          if (refresh) {
            this.workshops = response["workshops"];
            refresh.target.complete();
            this.refreshing = false;
            if (this.infiniteScroll.disabled) {
              this.toggleInfiniteScroll();
            }
          } else {
            if(this.workshops.length > 0){
              let workshops = response["workshops"];

              workshops.forEach(workshop => {
                let cont = 0;
                this.workshops.forEach(w => {
                  if(w.id_workshop === workshop.id_workshop){
                    cont++;
                  }
                });  
                if(cont == 0){
                  this.workshops.push(workshop);
                }
              });
            }
            else {
              this.workshops.push(...response["workshops"]);
            }
          }
          
          this.loading = false;
          //Rerender Virtual Scroll List After Adding New Data
          this.virtualScroll.checkEnd();

          if (scroll) this.infiniteScroll.complete();
          if (response["workshops"].length < this.limit && scroll)
            this.toggleInfiniteScroll();
        },
        (err) => {
          this.loading = false;
          this.firstLoad = false;
          refresh.target.complete();
        }
      );
  }

  loadMore(scroll) {
    this.loadWorkshops(scroll);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  doRefresh(refresh) {
    this.page = 1;
    this.limit = Math.round(screen.height / 70);
    this.refreshing = true;
    this.loadWorkshops(null, refresh);
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
