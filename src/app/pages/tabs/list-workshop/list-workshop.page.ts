import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { switchMap, delay } from 'rxjs/operators';
import { workshops } from "../../../services/data";
import { WorkshopService } from 'src/app/services/workshop.service';
import { Subscription } from 'rxjs';
import { Workshop } from 'src/app/models/workshop.model';
import { AuthService } from 'src/app/services/auth.service';
import { LessonService } from 'src/app/services/lesson.service';
import { AlertService } from 'src/app/services/shared/alert.service';


@Component({
  selector: 'app-list-workshop',
  templateUrl: './list-workshop.page.html',
  styleUrls: ['./list-workshop.page.scss'],
})
export class ListWorkshopPage implements OnInit {

  constructor(
    private alertService: AlertService,
    private navCtrl:NavController,
    private route: ActivatedRoute,
    private auths: AuthService,
    private workShopService: WorkshopService,
    private lessonService: LessonService) { }

  workshop:any = {};
  userData: any = {
    isLoggedIn: false,
  };

  id = this.route.snapshot.paramMap.get("id");

  workshopSubscription: Subscription;
  userSubscription: Subscription;
  lessonSubscription: Subscription;
  
  ngOnInit() {  }
  
  ionViewWillEnter() {
    this.userSubscription =  this.auths.userData.subscribe((userData) => {
      this.userData = userData;
      this.getWorkshop();
    });    
  }

  ionViewWillLeave(){
    this.userSubscription.unsubscribe();
    this.workshopSubscription.unsubscribe();
    if(this.lessonSubscription) this.lessonSubscription.unsubscribe();
    this.workshop = {};
  }

  getWorkshop() {
    this.workshopSubscription = this.workShopService.getWorkshop(this.id, this.userData.user.token).subscribe((response: any) => {
      if(response && response.status == 200){
        let workshop = response.workshop;
        workshop.lessons.forEach((l, i) => {
          if(i > 0) {
            if(workshop.lessons[i-1].readed){
              l.disabled = false;
            }
            else {
              l.disabled = true;
            }
          }
        });

        this.workshop = workshop;
      }
      else {
        this.navCtrl.navigateRoot('menu/tabs/home');
      }
    });
  }


  startLesson(lesson){
    if(this.userData.isLoggedIn){
      if(!lesson.disabled){
        if(!lesson.readed){
          this.lessonSubscription = this.lessonService.startLesson(lesson.id_lesson, this.userData.user.token).subscribe((res: any) => {
            if(res && res.status == 200){
              this.navigate(lesson.id_lesson);
            }
            else {
              this.goBack();
            }
          });
        } 
        else {
          this.navigate(lesson.id_lesson);
        }
      }
      else {
        this.alertService.basicAlert("Las lecciones deben ser vistas en orden.", ['Aceptar'], "¡No es posible continuar!");
      }
    } 
    else {
      //AQUI EL SQLITE
    }
  }

  navigate(id){
    this.navCtrl.navigateForward(`menu/tabs/workshop/${this.id}/lesson/${id}`);
  }
  goBack(){
    this.navCtrl.navigateRoot('menu/tabs/home')
    //this.navCtrl.back()
  }
}

