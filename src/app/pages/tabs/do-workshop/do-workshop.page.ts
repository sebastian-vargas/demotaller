import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser"
import { Platform, ModalController, LoadingController, NavController } from '@ionic/angular';
/*
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/File/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer, DocumentViewerOptions } 
from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';*/
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


  constructor(
    private domSanitizer:DomSanitizer, 
    //private documentViewer:DocumentViewer,
    private navCtrl:NavController,
    private modalController: ModalController,
    public loadingController: LoadingController,
    private route: ActivatedRoute) { }

    loading: HTMLIonLoadingElement = null;

    workshopId = Number(this.route.snapshot.parent.paramMap.get("id"));
    lessonId = Number(this.route.snapshot.paramMap.get("lesson"));

    lesson = {};
  ngOnInit() {


    this.vidUrl = this.domSanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/J0G5mQyHGlI");
  }

  ionViewWillEnter() {

    this.loadLesson();
  }

  loadLesson(){
    let workshop = workshops.find(w => w.id == this.workshopId);
    let lesson = workshop.lessons.find(l => l.id == this.lessonId);
    
    if(lesson != undefined){
      this.lesson = lesson;

      workshop.myWorkshop = true;

      if(!lesson.readed){
        lesson.readed = true;
        workshop.lessonsCount++;
      }
      //this.presentLoading();
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
 /* 
  openLocalPdf(){
    const options: DocumentViewerOptions = { 
      title: "My PDF TITLE"
    }
    this.documentViewer.viewDocument('assets/myFile.pdf', 'application/pdf', options)
  }*/
}

