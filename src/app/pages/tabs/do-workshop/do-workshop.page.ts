import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser"
import { Platform, ModalController, LoadingController, NavController } from '@ionic/angular';
/*
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/File/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';*/
import { DocumentViewer, DocumentViewerOptions } 
from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ModalPdfPage } from '../modal-pdf/modal-pdf.page';
import { ActivatedRoute } from '@angular/router';


import { workshops } from "../../../services/data";

@Component({
  selector: 'app-do-workshop',
  templateUrl: './do-workshop.page.html',
  styleUrls: ['./do-workshop.page.scss'],
})
export class DoWorkshopPage implements OnInit {
  vidUrl:SafeResourceUrl;
  pdfUrl: SafeResourceUrl;

  url = "https://www.youtube.com/embed/J0G5mQyHGlI";

  pdfData = {
    title: "PDF de ejemplo",
    url: 'http://www.africau.edu/images/default/sample.pdf'
  }

  comments = [
    {
      avatar: this.domSanitizer.bypassSecurityTrustResourceUrl("https://m.media-amazon.com/images/M/MV5BNTczMzk1MjU1MV5BMl5BanBnXkFtZTcwNDk2MzAyMg@@._V1_.jpg"),
      name: "Will Smith",
      content: "Wow, amazing"
    },
    {
      avatar: this.domSanitizer.bypassSecurityTrustResourceUrl("https://m.media-amazon.com/images/M/MV5BMTQ3ODE2NTMxMV5BMl5BanBnXkFtZTgwOTIzOTQzMjE@._V1_UY317_CR21,0,214,317_AL_.jpg"),
      name: "Emma Watson",
      content: "OMG"
    }
  ]

  lesson = null;

  constructor(
    private domSanitizer:DomSanitizer, 
    private documentViewer:DocumentViewer,
    private navCtrl:NavController,
    private modalController: ModalController,
    public loadingController: LoadingController,
    private route: ActivatedRoute) { }

    loading: HTMLIonLoadingElement = null;

  workshopId = Number(this.route.snapshot.parent.paramMap.get("id"));
  lessonId = Number(this.route.snapshot.paramMap.get("lesson"));

  ngOnInit() {
    this.loadLesson();

    this.vidUrl = this.domSanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/J0G5mQyHGlI");
  }

  loadLesson(){
    let workshop = workshops.find(w => w.id == this.workshopId);
    let lesson = workshop.lessons.find(l => l.id == this.lessonId);
    
    if(lesson != undefined){
      this.lesson = lesson;
      lesson.readed = true;
      this.presentLoading();
    }
    else {
      this.navCtrl.navigateRoot(`menu/tabs/workshop/${workshop.id}`);
    }
  }
  
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'loader',
      message: 'Cargando...',
      backdropDismiss: false
    });
    
    document.getElementById('video').onload = (loader) => {
      this.loading.dismiss();
    };
    await this.loading.present();
  }

  async showPdf(){
    const modal = await this.modalController.create({
      component: ModalPdfPage,
      componentProps: {
        'title': this.pdfData.title,
        'url': this.pdfData.url
      }
    });
    return await modal.present();
  }
  
  openLocalPdf(){
    const options: DocumentViewerOptions = { 
      title: "My PDF TITLE"
    }
    this.documentViewer.viewDocument('assets/myFile.pdf', 'application/pdf', options)
  }
}

