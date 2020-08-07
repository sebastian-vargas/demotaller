import { Component, OnInit } from '@angular/core';
import { workshops } from "../../../services/data";
import { ActionSheetController, NavController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ModalWsPage } from '../modal-ws/modal-ws.page';
import { WorkshopService } from 'src/app/services/workshop.service';
import { AlertService } from 'src/app/services/shared/alert.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LessonService } from 'src/app/services/lesson.service';
@Component({
  selector: 'app-editlesson',
  templateUrl: './editlesson.page.html',
  styleUrls: ['./editlesson.page.scss'],
})
export class EditlessonPage implements OnInit {
  workshopForm: FormGroup;
  validation_messages = {
    title: [
      {type:"required", message:"El Titulo es requerido"},
      {type:"minlength", message:"El titulo debe contener al menos una palabra"}
    ],
    description: [
      {type:"required", message:"La descripcion es requerida"},
      {type:"minlength", message:"La descripcion debe contener al menos una palabra"}
    ],
  };

  workshopData:any = {
    workshop: {

    }
  };
  constructor(
    public actionSheetController: ActionSheetController,
    private navCtrl:NavController,
    private route: ActivatedRoute,
    private modalController:ModalController,
    private workshopS: WorkshopService, 
    private lessonService: LessonService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {
    this.workshopForm = this.formBuilder.group({
      title: new FormControl(
        "", 
        Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])
      ),
      description: new FormControl(
        "", 
        Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])
      ),
    });
   }
  workshopId = this.route.snapshot.parent.paramMap.get("id");
  
  workshop: any = {}
  lessonModal: any = {}


  ngOnInit() {
    this.workshopS.getWorkshop(this.workshopId).subscribe((res:any) =>{
      this.workshop = res.workshop;
      this.workshopForm.patchValue({
        title: this.workshop.title,
        description: this.workshop.description
      });
    })
  }

  getWorkshop() {
    this.workshopS.getWorkshop(this.workshopId).subscribe((response: any) => {
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

  getLesson(lesson){
    this.lessonService.getLessons(lesson.id_lesson).subscribe((response: any) => {
      this.lessonModal = response.lesson;
      this.editLS(this.lessonModal);
      console.log(this.lessonModal.contents);
    });
  }

  

  async editLS(lessonModal){
    const modal = await this.modalController.create({
      component: ModalWsPage,
      componentProps: {
        'title': lessonModal.title,
        'description': lessonModal.description,
        'workshop_title': lessonModal.workshop_title,
        'total_comments': lessonModal.total_comments,
        'contents' : lessonModal.contents
      }
    });
    return await modal.present();
    }

  navigate(id){
    this.navCtrl.navigateForward(`menu/admin/adminws/${this.workshop.id}/lesson/${id}`);
  }
}
