import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-ws',
  templateUrl: './modal-ws.page.html',
  styleUrls: ['./modal-ws.page.scss'],
})
export class ModalWsPage implements OnInit {
  @Input() titulo: string;
  @Input() descripcion: string;
  @Input() pdfUrl: string;
  @Input() vidUrl: string;
  constructor(
    private modalController:ModalController, 
  ) { }

  ngOnInit() {
  }

  async closeModal(){
    await this.modalController.dismiss();
  }

}
