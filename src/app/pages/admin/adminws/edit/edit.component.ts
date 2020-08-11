import { Component, OnInit } from '@angular/core';
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
  workshopId = this.route.snapshot.parent.paramMap.get("id");
  workshop: any = {}
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
        this.workshop = workshop;
      }
      else {
        this.navCtrl.navigateRoot('menu/tabs/home');
      }
    });
  }
}
