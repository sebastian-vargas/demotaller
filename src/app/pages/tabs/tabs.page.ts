import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
const { App } = Plugins;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private router: Router) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (this.router.url !== '/menu/tabs/home') {
        this.navCtrl.back()
      }else {
        App.exitApp();
      }
    });
   }

  ngOnInit() {
  }

  goToAboutUs() {
    this.navCtrl.navigateRoot('menu/tabs/about-us');
  }

}
