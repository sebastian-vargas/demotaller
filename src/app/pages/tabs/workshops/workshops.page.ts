import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import {
  NavController,
  IonVirtualScroll,
  IonInfiniteScroll,
} from "@ionic/angular";

import { delay } from "rxjs/operators";
import { Workshop } from "src/app/models/workshop.model";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { WorkshopService } from "src/app/services/workshop.service";

@Component({
  selector: "app-workshops",
  templateUrl: "./workshops.page.html",
  styleUrls: ["./workshops.page.scss"],
})
export class WorkshopsPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private auths: AuthService,
    private workShopService: WorkshopService
  ) {}

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

  ngOnInit() {}

  ionViewWillEnter() {
    this.userSubscription = this.auths.userData.subscribe(userData => {
      this.userData = userData;
      if(userData.isLoggedIn) {

        this.loadWorkshops();
      }
    });
  }

  ionViewWillLeave() {
    this.workshopsSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.reset();
  }

  reset(){
    this.page = 1;
    this.loading = true;
    this.firstLoad = true;
    this.workshops = [];
    this.infiniteScroll.disabled = true;
  }

  loadWorkshops(scroll?, refresh?) {
    this.loading = true;
    this.workshopsSubscription = this.workShopService
      .getMyWorkshops(this.page, this.limit, this.userData.user.token)
      .pipe(delay(0))
      .subscribe(
        (response) => {
          console.log(response["workshops"]);
          this.page++;
          if (
            this.firstLoad &&
            this.infiniteScroll.disabled &&
            response["workshops"].length >= this.limit
          ) {
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
            if (this.workshops.length > 0) {
              let workshops = response["workshops"];

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

  workshopHandleCLick( workshopID) {
    this.navCtrl.navigateForward(`menu/tabs/workshop/${workshopID}`);
  }

}
