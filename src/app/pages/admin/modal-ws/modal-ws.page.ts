import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ActionSheetController, NavController, Platform } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { WorkshopService } from 'src/app/services/workshop.service';
import { LessonService } from 'src/app/services/lesson.service';
import { AlertService } from 'src/app/services/shared/alert.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal-ws',
  templateUrl: './modal-ws.page.html',
  styleUrls: ['./modal-ws.page.scss'],
})
export class ModalWsPage implements OnInit {
  @Input() id_lesson: string;

  lessonSubscription : Subscription;
  userSubscription : Subscription;
  lesson: any = {};

  userData: any = {
    isLoggedIn: false,
  };
  contentForm: FormGroup;

  validation_messages = {
    title: [
      {type:"required", message:"El Titulo es requerido"},
      {type:"minlength", message:"El titulo debe contener al menos una palabra"}
    ],
    url:[
      {type:"required", message:"La url es requerida"},
    ]
  };

  constructor(
    private modalController:ModalController, 
    public actionSheetController: ActionSheetController,
    private navCtrl:NavController,
    private lessonService: LessonService,
    private alertService: AlertService,
    private auths: AuthService,
    private formBuilder: FormBuilder,
    
    private platform: Platform,
  ) { 
    this.platform.backButton.subscribe(() => {
      
      this.closeModal()
    });

    this.contentForm = this.formBuilder.group({
      title: new FormControl(
        "", 
        Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])
      ),
      url: new FormControl(
        "", 
        Validators.compose([
        Validators.required,
      ])
      ),
    });    
  }

  segmentValue = "edit";
  edited = false;
  ngOnInit() {

  }
  ionViewWillEnter(){
    this.userSubscription = this.auths.userData.subscribe((userData) => {
      this.userData = userData;
      this.loadLesson();
    });
  }

  ionViewWillLeave() {
    if(this.lessonSubscription) this.lessonSubscription.unsubscribe();
    if(this.userSubscription) this.userSubscription.unsubscribe();
  }

  segmentChanged(ev: any) {
    this.segmentValue = ev.detail.value;
    //this.navCtrl.navigateForward(`menu/admin/adminws/${workshop.id_workshop}`);
    //console.log("Segment changed", ev);
  }

  loadLesson(){
    this.lessonSubscription = this.lessonService
      .getLessons(this.id_lesson)
      .subscribe((response: any) => {
        if(response && response.status == 200){
          this.lesson = response.lesson;

          console.log(this.lesson)
          //this.totalComments = response.total_comments;

          if(this.lesson.total_comments > 0){
            //this.getComments();
          }
        }
        else {
          this.navCtrl.navigateRoot(`menu/tabs/home`);
        }

      });
  }

  saveLesson(event){
    if(!event.error){
      let lesson = {
        id_lesson: this.lesson.id_lesson,
        title: event.title,
        description: event.description
      }

      this.lessonService.editLesson(lesson, this.userData.user.token).subscribe((res : any) => {
        if(res.status == 200) {
          this.edited = true;
          this.loadLesson();
        }
      });
    }
    else {
      this.alertService.presentToast(event.message, 3000) 
    }
    
  }


  async closeModal(){
    await this.modalController.dismiss({
      'edited': this.edited
    });
  }
}
