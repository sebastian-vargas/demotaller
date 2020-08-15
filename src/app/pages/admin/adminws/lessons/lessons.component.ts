import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalWsPage } from '../../modal-ws/modal-ws.page';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActionSheetController, NavController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { WorkshopService } from 'src/app/services/workshop.service';
import { LessonService } from 'src/app/services/lesson.service';
import { AlertService } from 'src/app/services/shared/alert.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss'],
})
export class LessonsComponent implements OnInit {
  lessonForm: FormGroup;
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

  constructor(
    public actionSheetController: ActionSheetController,
    private navCtrl:NavController,
    private route: ActivatedRoute,
    private modalController:ModalController,
    private workshopS: WorkshopService, 
    private lessonService: LessonService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
  ) {
    this.lessonForm = this.formBuilder.group({
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


   @Input()lesson :any;
   @Input()editing :boolean;
 
   @Output()saveLesson = new EventEmitter<{}>();
     

  ngOnInit() {
    if(this.editing){
      this.lessonForm.patchValue({
        title: this.lesson.title,
        description: this.lesson.description
      });
    }else {
      
    }
  }

  save(form){
    if(this.editing){
      if(form.title != this.lesson.title || form.description != this.lesson.description){
     
        this.saveLesson.emit(form);
      }
      else {
        
        this.saveLesson.emit({
          error: true,
          message: "Todos los campos son requeridos."
        });
      }
    }
    else {
      if(this.lessonForm.valid){
        this.saveLesson.emit(form);
        this.lessonForm.reset();
      }
      else {
        this.saveLesson.emit({
          error: true,
          message: "Todos los campos son requeridos."
        });
      }
    }
    
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
}
