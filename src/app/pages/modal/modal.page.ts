import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  @ViewChild('slider')  slides: IonSlides;

  handleAction(action){
    switch(action){
      case 1:
        this.slides.slideTo(0);
      break;
      case 2:
        this.slides.slideTo(1);
      break;
      case 3:
        this.dismiss();
      break;
    }
  }
 
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  ionViewDidEnter(){
    this.slides.update();
  }

}
