import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguserPageRoutingModule } from './configuser-routing.module';

import { ConfiguserPage } from './configuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguserPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ConfiguserPage]
})
export class ConfiguserPageModule {}
