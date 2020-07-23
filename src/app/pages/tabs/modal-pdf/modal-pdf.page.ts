import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
/*
import { FileTransfer,FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import {File} from '@ionic-native/file/ngx'*/

@Component({
  selector: 'app-modal-pdf',
  templateUrl: './modal-pdf.page.html',
  styleUrls: ['./modal-pdf.page.scss'],
  providers: [File]
})
export class ModalPdfPage implements OnInit {
  @Input() title: string;
  @Input() url: string;
  pdfUrl: SafeResourceUrl;
  
  log ="";

  constructor(
    private modalController:ModalController, 
    private domSanitizer:DomSanitizer,
    //private documentViewer: DocumentViewer,
    //private fileTransfer: FileTransfer,
     private file: File
    ) { }

    
  ngOnInit() {
     
    this.pdfUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.url);
    //this.download()
  }

  /*download() {
    let path = this.file.dataDirectory;

    let transfer = this.fileTransfer.create();

    transfer.download(this.url, path + "file.pdf")
    .then(entry => {
      console.log('download complete: ' + entry.toURL());
      let url = entry.toURL();
      this.documentViewer.viewDocument(url, 'application/pdf', {});
    });
  }*/

  async closeModal(){
    await this.modalController.dismiss();
  }

}
