import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {


  text: string='Magia de Amor'
  imgurl:string= 'https://unsplash.com/photos/8IKf54pc3qk'
  link: string='https://ionicframework.com/docs/native/social-sharing'

  constructor(private menu:MenuController, 
    private navCtrl:NavController,
    private authS: AuthService,
    private socialSharing: SocialSharing,
    ) { }

    userData:any = {
      isLoggedIn: false
    };

  ngOnInit() {
    this.authS.userData.subscribe(userData => {
      this.userData = userData;
      console.log(userData)
    });
  }
  ShareGeneric(parameter){
    const url = this.link
    const text = parameter+'\n'
    this.socialSharing.share(text, 'MEDIUM', null, url)
  }
  
  ShareWhatsapp(){
    this.socialSharing.shareViaWhatsApp(this.text, this.imgurl, this.link)
  }

  ShareFacebook(){
    this.socialSharing.shareViaFacebookWithPasteMessageHint(this.text, this.imgurl, null /* url */, 'Copia Pega!')
  }

  SendEmail(){
    this.socialSharing.shareViaEmail('text', 'subject', ['email@address.com'])
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

  login() {
    this.menu.close();
    this.authS.presentLoginRegisterModal();
  }
}
