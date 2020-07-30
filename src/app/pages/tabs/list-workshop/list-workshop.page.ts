import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { switchMap, delay } from 'rxjs/operators';
import { workshops } from "../../../services/data";
import { WorkshopService } from 'src/app/services/workshop.service';
import { Subscription } from 'rxjs';
import { Workshop } from 'src/app/models/workshop.model';


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
  
  ngOnInit() {  }
  
  ionViewWillEnter() {
    this.workshopSubscription = this.workShopService.getWorkshop(this.id).pipe(delay(1000)).subscribe((response: any) => {
      
      if(response && response.status == 200){

        this.workshop = response.workshop;
      }
      else {
        this.navCtrl.navigateRoot('menu/tabs/home');
      }
    });
  }

  ionViewWillLeave(){
    this.workshopSubscription.unsubscribe();
    this.workshop = {};
  }

  navigate(id){
    this.navCtrl.navigateForward(`menu/tabs/workshop/${this.id}/lesson/${id}`);
    //this.navCtrl.navigateForward(`menu/tabs/workshop/1/lesson/1`);

  }
  goBack(){
    this.navCtrl.navigateRoot('menu/tabs/home')
  }
}

