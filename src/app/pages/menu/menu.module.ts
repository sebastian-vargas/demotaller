import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    ShareButtonsModule,
    ShareIconsModule,
    //SocialSharing

  ],
  providers: [
    SocialSharing,
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
