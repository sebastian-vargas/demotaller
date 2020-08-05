import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import {
  Platform,
  ModalController,
  LoadingController,
  NavController,
} from "@ionic/angular";
import { switchMap, delay } from "rxjs/operators";
import { LessonService } from "src/app/services/lesson.service";
/*
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/File/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer, DocumentViewerOptions } 
from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';*/
import { ModalPdfPage } from "../modal-pdf/modal-pdf.page";
import { ModalCommPage } from "../modal-comm/modal-comm.page";
import { ActivatedRoute } from "@angular/router";
import { WorkshopService } from "src/app/services/workshop.service";
import { Subscription } from "rxjs";
import { PreviewAnyFile } from "@ionic-native/preview-any-file/ngx";

import { workshops } from "../../../services/data";

@Component({
  selector: "app-do-workshop",
  templateUrl: "./do-workshop.page.html",
  styleUrls: ["./do-workshop.page.scss"],
})
export class DoWorkshopPage implements OnInit {
  vidUrl: SafeResourceUrl;
  pdfUrl: SafeResourceUrl;

  url = "https://www.youtube.com/embed/J0G5mQyHGlI";

  pdfData = {
    title: "PDF de ejemplo",
    url: "http://www.africau.edu/images/default/sample.pdf",
  };

  constructor(
    private domSanitizer: DomSanitizer,
    //private documentViewer:DocumentViewer,
    private navCtrl: NavController,
    private modalController: ModalController,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private previewAnyFile: PreviewAnyFile
  ) {}

  loading: HTMLIonLoadingElement = null;

  loadingVideo = true;

  workshopId = this.route.snapshot.parent.paramMap.get("id");
  lessonId = this.route.snapshot.paramMap.get("lesson");

  lessonSubscription: Subscription;

  lesson: any = {  };
  comments: any = [];

  ngOnInit() {
    this.vidUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
      "https://www.youtube.com/embed/J0G5mQyHGlI"
    );
  }

  ionViewWillEnter() {
    this.lessonSubscription = this.lessonService
      .getLessons(this.lessonId)
      .pipe(delay(0))
      .subscribe((response: any) => {
        if(response && response.status == 200){

          this.lesson = response.lesson;
        
          console.log(response);
        }
        else {
          this.navCtrl.navigateRoot(`menu/tabs/home`);
        }

      });
  }

  ionViewWillLeave(){
    this.lessonSubscription.unsubscribe();
    this.lesson = {};
  }

  openPDF(url) {
    this.previewAnyFile.preview(url).then(
      (_) => {},
      (err) => alert(JSON.stringify(err))
    );
  }

  goBack(){
    this.navCtrl.navigateRoot(`menu/tabs/workshop/${this.workshopId}`);
  }

  async showComments() {
    const modal = await this.modalController.create({
      component: ModalCommPage,
      componentProps: {
        'lessonId': Number(this.route.snapshot.paramMap.get("lesson"))
      },
    });
    return await modal.present();
  }

}
