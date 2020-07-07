import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser"
import { Platform } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/File/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';

@Component({
  selector: 'app-do-workshop',
  templateUrl: './do-workshop.page.html',
  styleUrls: ['./do-workshop.page.scss'],
})
export class DoWorkshopPage implements OnInit {
  vidUrl:SafeResourceUrl;
  constructor(
    private domSanitizer:DomSanitizer, 
    private platform:Platform, 
    private file:File, 
    private fileTransfer:FileTransfer, 
    private fileOpener:FileOpener,
    private documentViewer:DocumentViewer) { }

  ngOnInit() {
    this.vidUrl = this.domSanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/J0G5mQyHGlI");
  }
  
  openLocalPdf(){
    const options: DocumentViewerOptions = { 
      title: "My PDF TITLE"
    }
    this.documentViewer.viewDocument('assets/myFile.pdf', 'application/pdf', options)
  }

  dowloadAndOpenPdf(){
    let path = null;

    if(this.platform.is('ios')){
      path = this.file.documentsDirectory;
    }else{
      path = this.file.dataDirectory;
    }
    const transfer = this.fileTransfer.create();
    transfer.download('http://www.filosofia.org/rev/reu/1875/pdf/n069p621.pdf', path + 'myfile.pdf').then(entry =>{
      let url = entry.toURL();
      this.documentViewer.viewDocument('assets/myFile.pdf', 'application/pdf', {});
    });

  }

}

