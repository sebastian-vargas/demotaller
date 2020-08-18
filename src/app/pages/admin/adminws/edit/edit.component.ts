import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActionSheetController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { WorkshopService } from 'src/app/services/workshop.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  
  constructor(
    public actionSheetController: ActionSheetController,
    private navCtrl:NavController,
    private route: ActivatedRoute,
    private workshopS: WorkshopService, 
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


  @Input()workshop :any;
  @Input()editing :boolean;

  @Output()saveWorkshop = new EventEmitter<{}>();



  ngOnInit() {
    if(this.editing){

      this.workshopForm.patchValue({
        title: this.workshop.title,
        description: this.workshop.description
      });
    }else {
      
    }
  }

  save(form){
    if(this.editing){
      if(form.title != this.workshop.title || form.description != this.workshop.description){
     
        this.saveWorkshop.emit(form);
      }
      else {
        
        this.saveWorkshop.emit({
          error: true,
          message: "Todos los campos son requeridos."
        });
      }
    }
    else {
      if(this.workshopForm.valid){
        this.saveWorkshop.emit(form);
        this.workshopForm.reset();
      }
      else {
        this.saveWorkshop.emit({
          error: true,
          message: "Todos los campos son requeridos."
        });
      }
    }
    
  }


}
