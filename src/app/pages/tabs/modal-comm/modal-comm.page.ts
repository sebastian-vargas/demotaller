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
  @Input() lessonId: Number;
  constructor(
    private modalController:ModalController,
    private lessonService: LessonService,
    private route: ActivatedRoute,
  ) { }

  //workshopId = Number(this.route.snapshot.parent.paramMap.get("id"));
  //lessonId = Number(this.route.snapshot.paramMap.get("lesson"));

  lessonSubscription: Subscription;
  lesson = {};

  ngOnInit() {
  }
  async closeModal(){
    await this.modalController.dismiss();
  }

  ionViewWillEnter() {
    this.lessonSubscription = this.lessonService
      .getLessons(this.lessonId)
      .pipe(delay(1000))
      .subscribe((response: any) => {
        if(response && response.status == 200){

          this.lesson = response.lesson;
        
          console.log(response);
        }
      });
  }
}
