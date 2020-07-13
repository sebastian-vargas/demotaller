import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private menu:MenuController, 
    private navCtrl:NavController,
    private auth: AuthenticateService,
    private authS: AuthService
    ) { }

  isLoggedIn = false;
  ngOnInit() {

    this.auth.isLoggedIn().then( isLoggedIn => this.isLoggedIn = isLoggedIn);

    //this.menu.open();
  }

  closeMenu(){
    this.menu.close();
  }

  navigate(url){
    this.menu.close();  
    this.navCtrl.navigateRoot(`${url}`);
  }

  navigateForward(url){
    this.menu.close();  
    this.navCtrl.navigateForward(`menu/${url}`);
  }

  logOut(){
    //this.auth.logOut();

    this.authS.logOut();    
    this.menu.close();
    window.location.reload();
    //this.navCtrl.navigateForward(`menu/tabs/home`);
  }
}
