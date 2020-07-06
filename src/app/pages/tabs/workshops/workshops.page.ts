import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.page.html',
  styleUrls: ['./workshops.page.scss'],
})
export class WorkshopsPage implements OnInit {
  workshops = [{}, {}, {},{},{},{},{}];
  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }

  goToWorkship(url){
    this.navCtrl.navigateRoot(`/menu/${url}`);
  }

}
