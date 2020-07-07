import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  array = [1,2,3,4,5,6,7,8];
  constructor(public alertController:AlertController, private navCtrl:NavController) {}

  async alertConf() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      subHeader: 'Hola!',
      message: '¿Deseas Realizar el curso?',
      buttons: ['Cancelar', 'Aceptar']
    });
    await alert.present();
  }

  id = 1;

  goToWorkship(){
    this.navCtrl.navigateForward(`menu/workshop/${this.id}`);
  }



}
