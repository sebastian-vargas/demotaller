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
import { AuthService } from 'src/app/services/auth.service';

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
    private previewAnyFile: PreviewAnyFile,
    private authS: AuthService
  ) {}

  loading: HTMLIonLoadingElement = null;

  loadingVideo = true;

  workshopId = this.route.snapshot.parent.paramMap.get("id");
  lessonId = this.route.snapshot.paramMap.get("lesson");

  lessonSubscription: Subscription;
  commentsSubscription: Subscription;
  userSubscription: Subscription;

  userData:any = {
    
    user: {

    }
  };
  lesson: any = {  };
  comments: any = [];
  totalComments = 0;

  ngOnInit() {
    this.vidUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
      "https://www.youtube.com/embed/J0G5mQyHGlI"
    );
  }

  ionViewWillEnter() {
    this.userSubscription = this.authS.userData.subscribe(user => {
      this.userData = user;
      console.log(user)
    });
    
    this.lessonSubscription = this.lessonService
      .getLessons(this.lessonId)
      .subscribe((response: any) => {
        if(response && response.status == 200){
          this.lesson = response.lesson;
          this.totalComments = response.total_comments;

          if(this.lesson.total_comments > 0){
            this.getComments();
          }
        }
        else {
          this.navCtrl.navigateRoot(`menu/tabs/home`);
        }

      });
  }

  getComments(){
    this.commentsSubscription = this.lessonService.getComments(this.lesson.id_lesson, 1, 5).subscribe((res:any) => {
      this.comments = res.comments;
      this.totalComments = res.total_comments;
    });
  }

  ionViewWillLeave(){
    this.lessonSubscription.unsubscribe();
    if(this.commentsSubscription) this.commentsSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
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
        'id_lesson': this.lesson.id_lesson,
        'token': this.userData.user.token
      },
    });
    
    modal.onDidDismiss().then(data => {
      if(data.data.newComments){
        this.getComments();
      }
    })
    
    return await modal.present();
  }

}
