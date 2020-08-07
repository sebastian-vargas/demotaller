import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalUserPage } from '../modal-user/modal-user.page';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-adminuser',
  templateUrl: './adminuser.page.html',
  styleUrls: ['./adminuser.page.scss'],
})
export class AdminuserPage implements OnInit {

  users:any= [];
  constructor(
    private modalController:ModalController,
    private storage:Storage,
    private authS: AuthService
  ) { }

  userData: any = {
    isLoggedIn: false,
  };

  userSubscription: Subscription;
  ngOnInit() {

  }


  ionViewWillEnter() {
    this.userSubscription = this.authS.userData.subscribe((userData) => {
      this.userData = userData;
      console.log("hola", this.userData.user.token);
      this.getUser(this.userData.user.token);
    });
  }
  ionViewWillLeave() {
    this.userSubscription.unsubscribe();
  }

  getUser(token){
    this.authS.getUsers(token).subscribe((response:any) => {
      this.users = response.data;
      console.log(this.users);
    });
  }

async editUser(user){
  const modal = await this.modalController.create({
    component: ModalUserPage,
    componentProps: {
      'id_user' : user.id_user,
      'full_name': user.full_name,
      'email':user.email,
      'role':user.role
    }
  });
  return await modal.present();
  }

}
