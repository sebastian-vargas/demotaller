import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListWorkshopPageRoutingModule } from './list-workshop-routing.module';

import { ListWorkshopPage } from './list-workshop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListWorkshopPageRoutingModule
  ],
  declarations: [ListWorkshopPage]
})
export class ListWorkshopPageModule {}
