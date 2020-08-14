import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, AlertController, IonToggle } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/models/user.model';
import { WorkshopService } from 'src/app/services/workshop.service';

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
    private workshopService: WorkshopService,
    public alertController: AlertController
  ) { }
  workshopsUser:any = [];
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
      this.getUser();
      
    });
  }

  getUser(){
    this.authS.getUserbyId(this.id_user).subscribe((res:any) =>{
      this.user = res.data;
      this.workshopsByUser(this.user.id_user,this.userData.user.token)//mostrando talleres por usuario
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
      backdropDismiss: false,
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

  workshopsByUser(id_user, token){
    this.workshopService.workshopsByUser(id_user,token).subscribe((response:any)=>{
      this.workshopsUser = response.workshops;
      if(response.status == "200"){
        console.log("listando", this.workshopsUser);
      }
    })
       
  }

  editRole(id_user,token){
    this.authS.editRole(id_user,token).subscribe((response:any) => {
      if(response.status == "200"){
        this.getUser();
      }
    });
  }
}
