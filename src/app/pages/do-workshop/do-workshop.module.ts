import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoWorkshopPageRoutingModule } from './do-workshop-routing.module';

import { DoWorkshopPage } from './do-workshop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoWorkshopPageRoutingModule
  ],
  declarations: [DoWorkshopPage]
})
export class DoWorkshopPageModule {}
