import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguserPageRoutingModule } from './configuser-routing.module';

import { ConfiguserPage } from './configuser.page';
import { AvatarComponent } from './avatar/avatar.component';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguserPageRoutingModule,
    ReactiveFormsModule,
    ImageCropperModule
  ],
  declarations: [ConfiguserPage, AvatarComponent]
})
export class ConfiguserPageModule {}
