import { Component, OnInit } from "@angular/core";
import { ActionSheetController, ModalController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { WorkshopService } from 'src/app/services/workshop.service';
import { LessonService } from 'src/app/services/lesson.service';
import { AlertService } from 'src/app/services/shared/alert.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ModalWsPage } from '../modal-ws/modal-ws.page';

@Component({
  selector: "app-editlesson",
  templateUrl: "./editlesson.page.html",
  styleUrls: ["./editlesson.page.scss"],
})
export class EditlessonPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private workshopS: WorkshopService,
    private lessonService: LessonService,
    private alertService: AlertService,
    private auths: AuthService,
    private modalController:ModalController,
  ) {}

  workshopId = this.route.snapshot.paramMap.get("id");
  workshop: any = {}; //no borrar
  segmentValue = "edit";
  userSubscription: Subscription;

  users: any = [];
  loading = true;
  userData: any = {
    isLoggedIn: false,
  };

  ionViewWillEnter() {
    this.userSubscription = this.auths.userData.subscribe((userData) => {
      this.userData = userData;
      this.getWorkshop(this.workshopId);
    });
    
  }

  ionViewWillLeave(){
    this.userSubscription.unsubscribe();
  }

  getWorkshop(id_workshop){
    this.loading = true;
    this.workshopS.getWorkshop(id_workshop).subscribe((res:any) =>{
      this.workshop = res.workshop;
      
      this.workshopS.getUsers(res.workshop.id_workshop, this.userData.user.token).subscribe((resp: any)=>{
        if(resp && resp.status == 200){
          this.users = resp.users;
          this.loading = false;
        }
      })
    })
  }
  ngOnInit() {}
  
  segmentChanged(ev: any) {
    this.segmentValue = ev.detail.value;
    //this.navCtrl.navigateForward(`menu/admin/adminws/${workshop.id_workshop}`);
  }

  async editLS(lessonModal){
    const modal = await this.modalController.create({
      component: ModalWsPage,
      componentProps: {
        'id_lesson': lessonModal.id_lesson,
      }
    });

    modal.onDidDismiss().then(data => {
      if(data.data.edited){
        this.getWorkshop(this.workshop.id_workshop);
      }
    })

    return await modal.present();
  }
  saveWorkshop(event){
    if(!event.error){
      this.loading = true;

      let workshop = {
        id_workshop: this.workshop.id_workshop,
        title: event.title,
        description: event.description
      }

      this.workshopS.editWorkshop(workshop, this.userData.user.token).subscribe((res: any) => {
        if(res.status == 200){
  
          this.alertService.presentToast("El taller ha sido actualizado correctamente.", 3000) 
          this.getWorkshop(this.workshop.id_workshop);
        } 
      });
    }
    else {
      this.alertService.presentToast("No hay cambios que guardar.", 3000) 
    }
    
  }

  saveLessonParent(event){
    console.log(event)
    if(!event.error){

      let lesson = {
        id_workshop: this.workshop.id_workshop,
        title: event.title,
        description: event.description
      }

      console.log(lesson);
      
      this.lessonService.addLesson(lesson, this.userData.user.token).subscribe((res: any) => {
        if(res.status == 200){
          
          this.alertService.presentToast("La lección ha sido guardada correctamente.", 3000);
          this.getWorkshop(this.workshop.id_workshop);
        } 
      });
    }
    else {
      this.alertService.presentToast(event.message, 3000) 
    }
  }
}
