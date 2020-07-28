import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { switchMap, delay } from 'rxjs/operators';
import { workshops } from "../../../services/data";
import { WorkshopService } from 'src/app/services/workshop.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-list-workshop',
  templateUrl: './list-workshop.page.html',
  styleUrls: ['./list-workshop.page.scss'],
})
export class ListWorkshopPage implements OnInit {

  constructor(public actionSheetController: ActionSheetController, 
    private navCtrl:NavController,
    private route: ActivatedRoute,
    private workShopService: WorkshopService) { }

  workshop = {};
  
  id = this.route.snapshot.paramMap.get("id");
  workshopSubscription: Subscription;
  
  ngOnInit() {
    
    /*let workshop = workshops.find(workshop => workshop.id == id);
    
    if(workshop != undefined){
      this.workshop = workshop;
    }else {
      this.navCtrl.navigateRoot('menu/tabs/home');
    }*/
  }
  ionViewWillEnter() {

    this.workshopSubscription = this.workShopService.getWorkshop(this.id).pipe(delay(1000)).subscribe((response: any) => {
      console.log(response);
      this.workshop = response.workshop;
    });
  }

  ionViewWillLeave(){
    this.workshopSubscription.unsubscribe();
  }

  navigate(id){
    this.navCtrl.navigateForward(`menu/tabs/workshop/${this.id}/lesson/${id}`);
    //this.navCtrl.navigateForward(`menu/tabs/workshop/1/lesson/1`);

  }
  goBack(){
    this.navCtrl.back()
  }
}

