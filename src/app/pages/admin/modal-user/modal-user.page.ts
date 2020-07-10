import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.page.html',
  styleUrls: ['./modal-user.page.scss'],
})
export class ModalUserPage implements OnInit {
  @Input() nombre: string;
  @Input() apellido: string;
  @Input() email: string;
  @Input() password: string;
  constructor(
    private modalController:ModalController, 
  ) { }

  ngOnInit() {
  }
  async closeModal(){
    await this.modalController.dismiss();
  }
}
