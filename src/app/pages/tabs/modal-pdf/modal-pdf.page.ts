import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-pdf',
  templateUrl: './modal-pdf.page.html',
  styleUrls: ['./modal-pdf.page.scss'],
})
export class ModalPdfPage implements OnInit {
  @Input() title: string;
  @Input() url: string;
  pdfUrl: SafeResourceUrl;
  

  constructor(
    private modalController:ModalController, 
    private domSanitizer:DomSanitizer
    ) { }

  ngOnInit() {
    this.pdfUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  async closeModal(){
    await this.modalController.dismiss();
  }

}
