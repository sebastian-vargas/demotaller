import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, AlertController, IonToggle } from '@ionic/angular';
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

  constructor(
    private modalController:ModalController, 
    private storage:Storage,
    private authS: AuthService,
    public alertController: AlertController
  ) { }
  
  user:any = {};
  @ViewChild(IonToggle) rol : IonToggle;
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
      this.getUser();
    });
  }

  getUser(){
    this.authS.getUserbyId(this.id_user).subscribe((res:any) =>{
      this.user = res.data;
      console.log(this.user);
    })
  }
  async message(){
    let message = "";
    if(this.user.role == '1'){
      message = `¿Desea revocar los privilegios de administrador del usuario "${this.user.full_name}"?`;
    }
    else{
      message = `¿Desea conceder permisos de administrador al usuario "${this.user.full_name}"?`;
    }
    const alert = await this.alertController.create({
      header: "¿Administracion?",
      message,
      buttons: [
        {
          text: "Cancelar",
          cssClass: "cancel",
          handler: () => {this.rol.checked = !this.rol.checked},
          
        },
        {
          text: "Aceptar",
          role: "accept",
          cssClass: "alert-button",
          handler: () => this.editRole(this.user.id_user,this.userData.user.token),
        },
      ],
    });
    await alert.present();
    let result = await alert.onDidDismiss();
  }

  async closeModal(){
    await this.modalController.dismiss();
  }
  editRole(id_user,token){
    this.authS.editRole(id_user,token).subscribe((response:any) => {
      if(response.status == "200"){
        this.getUser();
      }
    });
  }
}
