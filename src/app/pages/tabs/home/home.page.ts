import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import {
  AlertController,
  NavController,
  ModalController,
  IonInfiniteScroll,
  IonVirtualScroll,
} from "@ionic/angular";

import { AuthService } from "src/app/services/auth.service";
import { WorkshopService } from "src/app/services/workshop.service";
import { delay } from "rxjs/operators";
import { Subscription } from "rxjs";
import { Workshop } from "../../../models/workshop.model";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit, OnDestroy {
  constructor(
    public alertController: AlertController,
    private navCtrl: NavController,
    private auths: AuthService,
    public modalController: ModalController,
    private workShopService: WorkshopService
  ) { }

  workshops: Workshop[] = [];

  userData: any = {
    isLoggedIn: false,
  };

  loading = true;
  refreshing = false;
  page = 1;
  limit = Math.round(screen.height / 70);
  firstLoad = true;

  workshopsSubscription: Subscription;
  userSubscription: Subscription;

  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  ngOnInit(): void { }

  ngOnDestroy() { }

  ionViewWillEnter() {
    this.userSubscription = this.auths.userData.subscribe((userData) => {
      this.userData = userData;
      if (this.workshops.length > 0 && !userData.isLoggedIn) {
        this.reset();
      }
      this.loadWorkshops();
    });
  }

  ionViewWillLeave() {
    this.workshopsSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.reset();
  }

  reset() {
    this.page = 1;
    this.loading = true;
    this.firstLoad = true;
    this.workshops = [];
    this.infiniteScroll.disabled = true;
  }

  loadWorkshops(scroll?, refresh?) {
    this.loading = true;
    this.workshopsSubscription = this.workShopService
      .getWotkshops(this.page, this.limit, this.userData.user.token)
      .pipe(delay(100))
      .subscribe(
        (response) => {
          console.log(response["workshops"]);
          this.page++;
          let workshops = response["workshops"];
          if(!this.userData.isLoggedIn){

          }

          if (
            this.firstLoad &&
            this.infiniteScroll.disabled &&
            workshops.length >= this.limit &&
            this.userData.isLoggedIn
          ) {
            this.firstLoad = false;
            this.toggleInfiniteScroll();
          }
          if (refresh) {
            this.workshops = workshops;
            refresh.target.complete();
            this.refreshing = false;
            if (
              this.infiniteScroll.disabled &&
              workshops.length >= this.limit &&
              this.userData.isLoggedIn
            ) {
              this.toggleInfiniteScroll();
            }
          } else {
            if (this.workshops.length > 0) {

              workshops.forEach((workshop) => {
                let cont = 0;
                this.workshops.forEach((w) => {
                  if (w.id_workshop === workshop.id_workshop) {
                    cont++;
                  }
                });
                if (cont == 0) {
                  this.workshops.push(workshop);
                }
              });
            } else {
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

  async alertStart(workshop) {
    const alert = await this.alertController.create({
      header: "¿Iniciar taller?",
      message: `¿Está seguro de que desea empezar "${workshop.title}"?`,
      buttons: [
        {
          text: "Cancelar",
          cssClass: "cancel",
        },
        {
          text: "Iniciar",
          role: "accept",
          cssClass: "alert-button",
          handler: () => this.redirectToWorkshop(workshop),
        },
      ],
    });
    await alert.present();
    let result = await alert.onDidDismiss();
  }
  workshopHandleCLick(index, workshop) {
    if (index != 0 && !this.userData.isLoggedIn) {
      this.alertLogin();
    } else {
      if (!workshop.readed) {
        this.alertStart(workshop);
      } else {
        this.redirectToWorkshop(workshop);
      }
    }
  }

  redirectToWorkshop(workshop) {
    if (!workshop.readed) {
      this.workShopService
        .startWorkshop(workshop.id_workshop, this.userData.user.token)
        .subscribe((res: any) => {
          if (res.status == 200) {
            this.navCtrl.navigateForward(
              `menu/tabs/workshop/${workshop.id_workshop}`
            );
          }
        });
    } else {
      this.navCtrl.navigateForward(
        `menu/tabs/workshop/${workshop.id_workshop}`
      );
    }
  }

  redirectToLogin() {
    this.navCtrl.navigateForward(`login`);
  }
}
