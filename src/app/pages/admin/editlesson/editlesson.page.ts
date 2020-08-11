import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editlesson',
  templateUrl: './editlesson.page.html',
  styleUrls: ['./editlesson.page.scss'],
})
export class EditlessonPage implements OnInit {

  constructor(
    public actionSheetController: ActionSheetController,
    private route: ActivatedRoute,

  ) {
   }
  
  
  workshop: any = {}  //no borrar
  segmentValue ="edit";

  ngOnInit() {

  }
    segmentChanged(ev: any) {
        this.segmentValue = ev.detail.value;
        console.log(this.segmentValue)
        //this.navCtrl.navigateForward(`menu/admin/adminws/${workshop.id_workshop}`);
        console.log('Segment changed', ev);
      }

}
