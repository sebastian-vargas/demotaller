import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alert;

  constructor(private alertController: AlertController,
    private toastController: ToastController) { }
 
  async basicAlert(message, buttons, header?, subHeader?,) {
    this.alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons
    });

    this.alert.present();
  }

  async presentToast(message, duration) {
    const toast = await this.toastController.create({
      message,
      duration
    });
    toast.present();
  }
}
