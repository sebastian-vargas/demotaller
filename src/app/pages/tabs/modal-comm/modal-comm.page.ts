import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-modal-comm',
  templateUrl: './modal-comm.page.html',
  styleUrls: ['./modal-comm.page.scss'],
})
export class ModalCommPage implements OnInit {

  constructor(
    private modalController:ModalController,
  ) { }

  ngOnInit() {
  }
  async closeModal(){
    await this.modalController.dismiss();
  }
}
