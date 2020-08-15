import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertController, IonInfiniteScroll } from '@ionic/angular';
import { ModalUserPage } from '../modal-user/modal-user.page';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/models/user.model';
import { WorkshopService } from 'src/app/services/workshop.service';

@Component({
  selector: 'app-adminuser',
  templateUrl: './adminuser.page.html',
  styleUrls: ['./adminuser.page.scss'],
})
export class AdminuserPage implements OnInit {

  loading = true;
  refreshing = false;
  users:any= [];
  userlogued:Number;
  firstLoad = true;
  page = 1;
  constructor(
    private modalController:ModalController,
    private storage:Storage,
    private authS: AuthService,
    public alertController: AlertController,
    private workShopService: WorkshopService,
  ) { }

  userData: any = {
    isLoggedIn: false,
  };
  
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  userSubscription: Subscription;
  ngOnInit() {

  }

  ionViewWillEnter() {
    this.userSubscription = this.authS.userData.subscribe((userData) => {
      this.userData = userData;

      this.authS.getUsers(this.userData.user.token).subscribe((response:any) => {
        this.users = response.data;
        console.log(this.users);
      });

    });
  } 
  ionViewWillLeave() {
    this.userSubscription.unsubscribe();
  }

async editUser(user){
  const modal = await this.modalController.create({
    component: ModalUserPage,
    componentProps: {
      'id_user' : user.id_user,
    }
  });
  return await modal.present();
  }

  reset() {
    this.page = 1;
    this.loading = true;
    this.firstLoad = true;
    this.users = [];
    //this.infiniteScroll.disabled = true;
    this.searching = false;
  }

  searching = false;
  search(value){
    if(value !== ''){
      this.loading = true;
      this.searching = true;
      this.workShopService.searchUsers(value, this.userData.user.token).subscribe((res: any) => {
        if(res.status == 200){ 
          this.loading = false;
          this.users = res.users;
        }
      })
    }else {

      this.reset();
      this.ionViewWillEnter();
    }
  }

}