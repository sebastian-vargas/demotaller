import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-ws',
  templateUrl: './modal-ws.page.html',
  styleUrls: ['./modal-ws.page.scss'],
})
export class ModalWsPage implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() workshop_title: string;
  @Input() total_comments: Number;
  @Input() contents: any;

  constructor(
    private modalController:ModalController, 
  ) { }

  ngOnInit() {
  }

  async closeModal(){
    await this.modalController.dismiss();
  }

}
