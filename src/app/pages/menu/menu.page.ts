import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private menu:MenuController, private navCtrl:NavController) { }

  ngOnInit() {
    
    this.menu.open();
  }

  closeMenu(){
    this.menu.close();
  }
  goHome(){
    this.menu.close();  
    this.navCtrl.navigateRoot('/menu/tabs/home');
  }

  navigate(url){
    this.menu.close();  
    this.navCtrl.navigateRoot(`/menu/tabs/${url}`);
  }

}
