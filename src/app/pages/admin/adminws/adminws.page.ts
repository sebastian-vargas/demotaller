import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ModalController, NavController, AlertController, IonVirtualScroll, IonInfiniteScroll } from '@ionic/angular';
import { ModalWsPage } from '../modal-ws/modal-ws.page';
import { workshops } from "../../../services/data";
import { AuthService } from 'src/app/services/auth.service';
import { WorkshopService } from 'src/app/services/workshop.service';
import { Workshop } from 'src/app/models/workshop.model';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';



@Component({
  selector: 'app-adminws',
  templateUrl: './adminws.page.html',
  styleUrls: ['./adminws.page.scss'],
})
export class AdminwsPage  implements OnInit, OnDestroy {

  constructor(
    private modalController:ModalController,
    private navCtrl:NavController,
    public alertController: AlertController,
    private auths: AuthService,
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
    

  ngOnInit() {
  }
  ngOnDestroy(): void {
  }

  ionViewWillEnter() {
    this.userSubscription = this.auths.userData.subscribe((userData) => {
      this.userData = userData;
      /*
      if (this.workshops.length > 0 && !userData.isLoggedIn) {
        this.reset();
      }*/
      this.reset();
      
      this.loadWorkshops();
    });
  }

  navigate(url){
    this.navCtrl.navigateForward(`menu/admin/${url}`);
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

  /*workshopHandleCLick(index, workshop) {
    if (index != 0 && !this.userData.isLoggedIn) {
      this.auths.presentLoginRegisterModal();
      //this.alertLogin();
    } else {
      if (!workshop.readed) {
        this.alertStart(workshop);
      } else {
        this.redirectToWorkshop(workshop);
      }
    }
  }*/
  workshopHandleCLick(index, workshop) {
        this.navCtrl.navigateForward(`menu/admin/adminws/${workshop.id_workshop}`);   
    }

   /* async editWS(w){
      const modal = await this.modalController.create({
        component: ModalWsPage,
        componentProps: {
          'titulo': w.titulo,
          'descripcion':w.descripcion,
          'pdfUrl':w.pdfUrl,
          'vidUrl':w.vidUrl
        }
      });
      return await modal.present();
      }*/
}