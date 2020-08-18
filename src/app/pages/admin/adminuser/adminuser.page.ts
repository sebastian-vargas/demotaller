import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ModalController,
  AlertController,
  IonInfiniteScroll,
  IonVirtualScroll,
} from "@ionic/angular";
import { ModalUserPage } from "../modal-user/modal-user.page";
import { AuthService } from "src/app/services/auth.service";
import { Subscription } from "rxjs";
import { Storage } from "@ionic/storage";
import { User } from "src/app/models/user.model";
import { WorkshopService } from "src/app/services/workshop.service";

@Component({
  selector: "app-adminuser",
  templateUrl: "./adminuser.page.html",
  styleUrls: ["./adminuser.page.scss"],
})
export class AdminuserPage implements OnInit {
  loading = true;
  refreshing = false;
  users: any = [];
  firstLoad = true;
  page = 1;
  limit = 25;
  loadMore = false;

  constructor(
    private modalController: ModalController,
    private storage: Storage,
    private authS: AuthService,
    public alertController: AlertController,
    private workShopService: WorkshopService
  ) {}

  userData: any = {
    isLoggedIn: false,
  };

  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  userSubscription: Subscription;
  ngOnInit() {}

  ionViewWillEnter() {
    this.userSubscription = this.authS.userData.subscribe((userData) => {
      this.userData = userData;
      this.loadUsers();
    });
  }

  ionViewWillLeave() {
    this.userSubscription.unsubscribe();
    this.reset()
  }

  loadUsers(refresh?) {
    this.authS
      .getUsers(this.userData.user.token, this.page, this.limit)
      .subscribe((response: any) => {
        let users = response.data;
        console.log(users);

        if (this.loadMore) {
          users.forEach((user) => {
            let cont = 0;
            this.users.forEach((u) => {
              if (u.id_user === user.id_user) {
                cont++;
              }
            });
            if (cont == 0) {
              this.users.push(user);
            }
          });
        } else {
          this.users = users;
        }

        if(refresh){
          
          this.users = users;
          refresh.target.complete();
        }
        this.virtualScroll.checkEnd();
        this.loading = false;
        if (users.length == this.limit) {
          this.loadMore = true;
          this.page++;
        } else {
          this.page = 1;
          this.loadMore = false;
        }
      });
  }

  async editUser(user) {
    const modal = await this.modalController.create({
      component: ModalUserPage,
      componentProps: {
        id_user: user.id_user,
      },
    });
    return await modal.present();
  }

  reset() {
    this.page = 1;
    this.loading = true;
    this.firstLoad = true;
    this.users = [];
    this.loadMore = false;
    //this.infiniteScroll.disabled = true;
    this.searching = false;
  }

  doRefresh(refresh) {
    this.page = 1
    this.refreshing = true;
    this.loadUsers( refresh);
  }


  searching = false;
  search(value) {
    if (value !== "") {
      this.loading = true;
      this.searching = true;
      this.loadMore = false;
      this.users = [];
      this.workShopService
        .searchUsers(value, this.userData.user.token)
        .subscribe((res: any) => {
          if (res.status == 200) {
            this.loading = false;
            this.searching = false;
            this.users = res.users;
            this.virtualScroll.checkEnd();
          }
        }, (error) => {
          this.reset();
          this.loadUsers();
        });
    } else {
      this.reset();
      this.loadUsers();
    }
  }
}
