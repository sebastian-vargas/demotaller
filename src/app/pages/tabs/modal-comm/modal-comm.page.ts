import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { LessonService } from "src/app/services/lesson.service";
import { Subscription } from "rxjs";
import { ActivatedRoute } from '@angular/router';
import { switchMap, delay } from "rxjs/operators";
@Component({
  selector: 'app-modal-comm',
  templateUrl: './modal-comm.page.html',
  styleUrls: ['./modal-comm.page.scss'],
})
export class ModalCommPage implements OnInit {
  @Input() id_lesson: String;
  @Input() token: String;

  constructor(
    private platform: Platform,
    private modalController:ModalController,
    private lessonService: LessonService,
    private route: ActivatedRoute,
  ) { 
    this.platform.backButton.subscribe(() => {
      
      this.closeModal()
    });
  }

  commentsSubscription: Subscription;
  comments = [];
  loadMore = false;

  firstLoad = true;
  newComments = false;
  page = 1;
  limit = 5;

  ngOnInit() {
   
  }
  async closeModal(){
    await this.modalController.dismiss({
      'newComments': this.newComments
    });
  }

  ionViewWillEnter() {
    this.getComments();
  }

  ionViewWillLeave(){
    this.page = 1;
    this.firstLoad = true;
    this.commentsSubscription.unsubscribe();
  }
  reloadComments(){
    this.firstLoad = true;
    this.page = 1;
    this.loadMore= false;

    if(!this.newComments){
      this.newComments = true;
    }

    this.getComments();
  }

  getComments(){
    if(this.loadMore){
      this.page++;
    }
    this.commentsSubscription = this.lessonService
    .getComments(this.id_lesson,this.page, this.limit)
    .subscribe((response: any) => {
      if(response && response.status == 200){
        let comments = response.comments
        console.log(comments)
        if(this.firstLoad){
          this.comments = comments;
          this.firstLoad = false;
        }
        else {
          if (this.comments.length > 0) {
            comments.forEach((comment) => {
              let cont = 0;
              this.comments.forEach((c) => {
                if (c.id_lesson_comments === comment.id_lesson_comments) {
                  cont++;
                }
              });
              if (cont == 0) {
                this.comments.push(comment);
              }
            });
          } else {
            this.comments.push(...comments);
          }
        }

        if(comments.length < this.limit){
          this.loadMore = false;
        }
        else {
          this.loadMore = true;
        }
      }
    });
  }
}
