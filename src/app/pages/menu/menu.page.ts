import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private menu:MenuController, 
    private navCtrl:NavController,
    private authS: AuthService
    ) { }

    userData:any = {
      isLoggedIn: false
    };

  ngOnInit() {
    //this.authS.getIsLoggedIn().subscribe(isLoggedin => this.isLoggedIn = isLoggedin);

    this.authS.userData.subscribe(userData => {
      this.userData = userData;
      console.log(userData)
  })
    //this.menu.open();
/*
    this.authS.getUserData().subscribe(user => {
      this.user = user;
      this.isLoggedIn = user.isLoggedIn;
    });*/
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
    //window.location.reload();
    this.navCtrl.navigateRoot(`menu/tabs/home`);
  }
}
