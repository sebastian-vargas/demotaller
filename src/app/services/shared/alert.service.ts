import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alert;

  constructor(public alertController: AlertController) { }
 
  async basicAlert(message, buttons, header?, subHeader?,) {
    this.alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons
    });

    this.alert.present();
  }
}
