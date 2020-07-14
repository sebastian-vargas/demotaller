import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { workshops } from "../../../services/data";
import { find } from 'rxjs/operators';


@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.page.html',
  styleUrls: ['./workshops.page.scss'],
})
export class WorkshopsPage implements OnInit {
  workshops = [];
  constructor(private navCtrl:NavController) {
    console.log(this.workshops  )
   }

  ngOnInit()
  {
    
  }

  ionViewWillEnter() {
    
    this.workshops = workshops.filter(mWorkshop => mWorkshop.myWorkshop);
}

  goToWorkshop(id){
    this.navCtrl.navigateForward(`menu/tabs/workshop/${id}`);
  }

}
