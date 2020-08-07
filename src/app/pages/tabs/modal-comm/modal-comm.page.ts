import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
    private modalController:ModalController,
    private lessonService: LessonService,
    private route: ActivatedRoute,
  ) { }

  commentsSubscription: Subscription;
  comments = [];
  loadMore = false;

  firstLoad = true;

  page = 1;
  limit = 5;

  ngOnInit() {
   
  }
  async closeModal(){
    await this.modalController.dismiss();
  }

  ionViewWillEnter() {
    this.getComments();
  }

  ionViewWillLeave(){
    this.page = 0;
    this.firstLoad = true;
    this.commentsSubscription.unsubscribe();
  }
  reloadComments(){
    this.firstLoad = true;
    this.page = 0;
    this.getComments();
  }

  getComments(){
    if(this.loadMore){
      this.page++;
    }
    this.commentsSubscription = this.lessonService
    .getComments(this.id_lesson,this.page, this.limit)
    .pipe(delay(1000))
    .subscribe((response: any) => {
      if(response && response.status == 200){
        if(this.firstLoad){
          this.comments = response.comments;
          this.firstLoad = false;
        }
        else {
          this.comments = this.comments.concat(response.comments);
        }

        if(response.comments.length < this.limit){
          this.loadMore = false;
        }
        else {
          this.loadMore = true;
        }
        console.log(response);
      }
    });
  }
}
