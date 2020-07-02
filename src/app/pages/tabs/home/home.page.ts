import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  workshops = [{}, {}];

  constructor(public alertController:AlertController) {}

  async alertConf() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      subHeader: 'Hola!',
      message: '¿Deseas Realizar el curso?',
      buttons: ['Cancelar', 'Aceptar']
    });
    await alert.present();
  }

}
