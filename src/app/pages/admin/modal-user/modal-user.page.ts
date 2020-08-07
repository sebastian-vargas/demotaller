import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.page.html',
  styleUrls: ['./modal-user.page.scss'],
})
export class ModalUserPage implements OnInit {
  @Input() id_user: Number;
  @Input() full_name: string;
  @Input() email: string;
  @Input() role: Number;

  admin=true;
  constructor(
    private modalController:ModalController, 
    private storage:Storage,
    private authS: AuthService
  ) { }
  user: User[] = [];
  userData: any = {
    isLoggedIn: false,
  };

  userSubscription: Subscription;
  ngOnInit() {
    this.userRol();
  }

  ionViewWillEnter() {
    this.userSubscription = this.authS.userData.subscribe((userData) => {
      this.userData = userData;
      console.log("hola", this.userData.user.token);
      this.editRole(this.id_user,this.userData.user.token);
    });
  }

  async closeModal(){
    await this.modalController.dismiss();
  }
  editRole(id_user,token){
    this.authS.editRole(id_user,token).subscribe((response:any) => {
      this.user= response.data;
      console.log(this.user);
    });
  }
  userRol(){
    if(this.role == 1){
      this.admin = true;
    }else{this.admin = false;}
  }


}
